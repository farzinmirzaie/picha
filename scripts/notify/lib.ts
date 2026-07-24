/**
 * Shared helpers for the scheduled reminder sender (scripts/notify). Runs in
 * Node (via tsx) inside .github/workflows/notify.yml — never in the browser.
 * It talks to Supabase with the service_role key, so it can read the
 * push_subscriptions table (which is closed to the anon key).
 */
const rawUrl = process.env.SUPABASE_URL ?? '';
// The secret may or may not carry a /rest/v1 suffix; normalise to the origin.
export const SUPABASE_BASE = rawUrl.replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const authHeaders = { apikey: SERVICE_KEY, authorization: `Bearer ${SERVICE_KEY}` };

/** GET a PostgREST path (e.g. `picha_rounds?select=done&date=eq.2026-07-24`). */
export async function sbSelect<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_BASE}/rest/v1/${path}`, { headers: authHeaders });
  if (!res.ok) throw new Error(`GET ${path} -> HTTP ${res.status}`);
  return (await res.json()) as T;
}

export interface StoredSub {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export function getSubscriptions(): Promise<StoredSub[]> {
  return sbSelect<StoredSub[]>('push_subscriptions?select=endpoint,p256dh,auth');
}

/** Drop a dead subscription (the push service returned 404/410 Gone). */
export async function deleteSubscription(endpoint: string): Promise<void> {
  await fetch(
    `${SUPABASE_BASE}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(endpoint)}`,
    { method: 'DELETE', headers: authHeaders },
  );
}

// Picha runs on Malaysia time (UTC+8). Mirror the client's careDayKey
// (src/pages/care.astro): the rounds day rolls at midnight MYT, so add 8h and
// take the UTC date.
export function careDayKey(now: Date): string {
  return new Date(now.getTime() + 8 * 3_600_000).toISOString().slice(0, 10);
}

/** Hour of day (0-23) in MYT. */
export function mytHour(now: Date): number {
  return new Date(now.getTime() + 8 * 3_600_000).getUTCHours();
}

/** One notification, as the service worker's push handler expects it. */
export interface PushMessage {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  /** Also set the PWA app-icon badge (a dot) when this arrives. */
  setBadge?: boolean;
}

export interface ProviderCtx {
  now: Date;
  sbSelect: <T>(path: string) => Promise<T>;
  /** True on a manual workflow_dispatch run — lets once-a-day providers fire on demand for testing. */
  manual: boolean;
}

/**
 * A reminder source. Add a feature's reminders by writing one of these and
 * registering it in providers/index.ts — nothing else in the pipeline (or the
 * service worker) needs to change.
 */
export interface ReminderProvider {
  id: string;
  build(ctx: ProviderCtx): Promise<PushMessage[]>;
}
