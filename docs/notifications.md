# Notifications (Web Push)

Background reminders that reach the phone **while the PWA is closed** (Android /
Chrome mainly; installed iOS 16.4+). A closed app can't schedule its own alerts,
so this uses **Web Push**: a device subscribes, and a scheduled sender pushes
messages that the service worker renders.

## How it fits together

```
Device (PWA)                 Supabase                   GitHub Actions (cron)
────────────                 ────────                   ─────────────────────
Staff room toggle ─subscribe─▶ push_subscriptions ◀─read (service_role)─ scripts/notify
service worker  ◀──────────── Web Push ◀──────────────── providers[] → messages
  push → showNotification()
```

- **Client**: `src/lib/push.ts` (subscribe/unsubscribe/state) + the Reminders
  toggle in the Staff room (`src/pages/tools/staff.astro`). Subscribing is
  gated by the registrar PIN, so only staff devices get reminders.
- **Service worker**: `public/sw.js` `push` + `notificationclick` handlers. The
  payload is generic JSON `{ title, body, url, tag }`; the SW renders whatever
  it's sent, so **new reminder types need no SW change**.
- **Store**: `push_subscriptions` table + `save_push_subscription` /
  `delete_push_subscription` RPCs (`supabase/schema.sql`). The table is closed
  to the anon key; the sender reads it with the `service_role` key.
- **Sender**: `scripts/notify/` run by `.github/workflows/notify.yml` every 3h
  during 09:00–21:00 MYT. It asks each provider what to send now, pushes it, and
  prunes dead subscriptions. Fails soft (exits green) until the secrets exist.

## Current reminders

| Provider | Fires | Sends when | Title / body | Extras |
| --- | --- | --- | --- | --- |
| `daily-checklist` | every 3h, 09:00–21:00 MYT | any Care round still pending today | "Picha has filed N complaints" / "Picha has noticed some rounds are still undone. She is disappointed but not surprised." → `/care/` | — |
| `due-soon` | once a day (09:00 MYT slot); manual dispatch any time | soonest health item within `DUE_SOON_DAYS` (2) or overdue | "Due today/tomorrow/in N days/Overdue: &lt;item&gt;" / the item's own detail → `/health/` | sets the app-icon badge (`setBadge`) |

The app-icon badge set by `due-soon` clears itself the next time the app is
opened (Layout's `applyDueSoon` re-decides against the live clock); a closed app
keeps it until then.

## Adding a new reminder (the extension point)

1. Write a provider in `scripts/notify/providers/`:

   ```ts
   import { type ReminderProvider } from '../lib';
   export const weighInDueProvider: ReminderProvider = {
     id: 'weigh-in-due',
     async build({ now, sbSelect }) {
       // ...decide; return [] to send nothing, or [{ title, body, url, tag }]
     },
   };
   ```

2. Register it in `scripts/notify/providers/index.ts`.

That's it — the sender loops all providers, and the SW already renders any
payload. No client or service-worker edits. (If a reminder needs its own
schedule, give it its own cron entry / workflow later; today all providers run
on the shared 3-hour tick.)

## One-time setup (owner)

1. **Generate VAPID keys** (the Web Push identity):

   ```bash
   npx web-push generate-vapid-keys
   ```

2. **GitHub → repo Settings → Secrets and variables → Actions → New secret**:
   - `VAPID_PUBLIC_KEY` — the public key from step 1 (used by the build to bake
     the key into the client, and by the sender).
   - `VAPID_PRIVATE_KEY` — the private key. **Secret**; never commit it.
   - `VAPID_SUBJECT` — a contact URL, e.g. `mailto:you@example.com`.
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Settings → API → `service_role`
     key. **Secret**; server-only, never shipped to the client.
   - (`SUPABASE_URL` already exists.)

3. **Run the SQL** in `supabase/schema.sql` (the `push_subscriptions` block +
   the two RPCs) in the Supabase SQL editor. Safe to re-run.

4. **Deploy** (push to `master`) so the client build picks up `VAPID_PUBLIC_KEY`.

5. **Turn it on**: open the PWA → Tools → Staff room → sign in → **Reminders →
   tap to turn on**, and allow notifications when prompted. Do this on each
   device that should get reminders.

### Test it

- Manually run the **Reminders** workflow (Actions → Reminders → Run workflow),
  or `pnpm notify` locally with the env vars set. With items still pending on
  the current care day and at least one subscription, the device gets a push;
  once the list is clear it sends nothing.

## Notes / limits

- Timing is approximate (GitHub Actions cron can lag a few minutes) — fine for a
  3-hour reminder.
- iOS only delivers to an **installed** PWA on 16.4+, and permission is fussy.
  Android/Chrome is the reliable path.
- Local scheduled notifications (fire without a server) aren't possible — the
  Notification Triggers API was never shipped. Web Push is the only route for a
  closed app.
