/**
 * Scheduled reminder sender. Run every few hours by .github/workflows/notify.yml
 * (and via workflow_dispatch for a manual test). It reads the stored push
 * subscriptions, asks every provider what to send right now, and Web-Pushes the
 * results, pruning any dead subscriptions along the way.
 *
 * It fails soft: if the required secrets aren't set yet it logs and exits 0, so
 * scheduled runs stay green until reminders are fully configured.
 *
 * Local test:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *   VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:you@x.com \
 *   pnpm notify
 */
import webpush from 'web-push';
import {
  getSubscriptions,
  deleteSubscription,
  sbSelect,
  mytHour,
  type ProviderCtx,
  type PushMessage,
} from './lib';
import { providers } from './providers';

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
  VAPID_SUBJECT = 'mailto:picha@example.com',
} = process.env;

// Active window in MYT — no overnight buzzing. The cron fires only inside this
// range too; the guard is a belt-and-braces backstop.
const ACTIVE_FROM = 9;
const ACTIVE_TO = 21;

async function main(): Promise<void> {
  const missing = Object.entries({
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    console.log(`[notify] Skipping: missing ${missing.join(', ')}. Set these secrets to enable reminders.`);
    return;
  }

  const now = new Date();
  const hour = mytHour(now);
  if (hour < ACTIVE_FROM || hour > ACTIVE_TO) {
    console.log(`[notify] Quiet hours (MYT ${hour}:00); nothing sent.`);
    return;
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY as string, VAPID_PRIVATE_KEY as string);

  const subs = await getSubscriptions();
  if (!subs.length) {
    console.log('[notify] No subscribers; nothing to send.');
    return;
  }

  const ctx: ProviderCtx = {
    now,
    sbSelect,
    manual: process.env.GITHUB_EVENT_NAME === 'workflow_dispatch',
  };
  const messages: PushMessage[] = [];
  for (const provider of providers) {
    try {
      const msgs = await provider.build(ctx);
      if (msgs.length) console.log(`[notify] ${provider.id}: ${msgs.length} message(s).`);
      messages.push(...msgs);
    } catch (err) {
      console.error(`[notify] provider "${provider.id}" failed:`, err);
    }
  }
  if (!messages.length) {
    console.log('[notify] Nothing pending; no reminders due.');
    return;
  }

  let sent = 0;
  let pruned = 0;
  for (const sub of subs) {
    const target = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } };
    for (const msg of messages) {
      try {
        await webpush.sendNotification(target, JSON.stringify(msg));
        sent += 1;
      } catch (err) {
        const code = (err as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) {
          await deleteSubscription(sub.endpoint);
          pruned += 1;
          break; // this endpoint is gone; skip its remaining messages
        }
        console.error(`[notify] send failed (HTTP ${code ?? '?'}):`, (err as Error).message);
      }
    }
  }
  console.log(`[notify] Sent ${sent} notification(s); pruned ${pruned} dead subscription(s).`);
}

main().catch((err) => {
  console.error('[notify] Fatal:', err);
  process.exit(1);
});
