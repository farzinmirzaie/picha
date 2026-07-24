/**
 * Web Push opt-in for background reminders — the notifications that arrive
 * while the PWA is closed (Android/Chrome mainly; installed iOS 16.4+). This is
 * the only client entry point for push; reuse it for any future opt-in UI.
 *
 * Flow: the device asks permission, subscribes through the service worker's
 * PushManager using the VAPID public key, and stores the subscription in
 * Supabase via the staff-gated `save_push_subscription` RPC. The scheduled
 * sender (scripts/notify, run by .github/workflows/notify.yml) reads those
 * subscriptions and pushes messages that the service worker renders. The SW is
 * generic — it shows whatever `{title, body, url, tag}` payload it receives —
 * so new reminder types need only a new provider in the sender, nothing here.
 *
 * PUBLIC_VAPID_KEY is injected at build time (see .env / the deploy workflow);
 * without it push reports as unsupported and the UI stays hidden/disabled.
 */
import { sbRpc } from './sb';

const VAPID_PUBLIC_KEY = import.meta.env.PUBLIC_VAPID_KEY as string | undefined;

export type PushState =
  | 'unsupported' // missing browser APIs, or no VAPID key configured
  | 'denied' // the user blocked notifications for the site
  | 'default' // supported, permission not yet requested
  | 'subscribed'
  | 'unsubscribed';

export function pushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window &&
    Boolean(VAPID_PUBLIC_KEY)
  );
}

async function currentSubscription(): Promise<PushSubscription | null> {
  const reg = await navigator.serviceWorker.ready;
  return reg.pushManager.getSubscription();
}

export async function getPushState(): Promise<PushState> {
  if (!pushSupported()) return 'unsupported';
  if (Notification.permission === 'denied') return 'denied';
  if (await currentSubscription()) return 'subscribed';
  return Notification.permission === 'granted' ? 'unsubscribed' : 'default';
}

// VAPID keys are base64url; PushManager wants the raw bytes.
function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
  return out;
}

/**
 * Ask permission, subscribe, and store the subscription (PIN-gated). Throws a
 * friendly Error on any failure; if the store write fails the local
 * subscription is rolled back so the two never drift apart.
 */
export async function enablePush(url: string, key: string, pin: string): Promise<void> {
  if (!pushSupported()) throw new Error('Reminders are not available on this device.');
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Notifications were not allowed.');

  const reg = await navigator.serviceWorker.ready;
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY as string) as BufferSource,
    }));

  const json = sub.toJSON();
  try {
    await sbRpc(url, key, 'save_push_subscription', {
      p_endpoint: sub.endpoint,
      p_p256dh: json.keys?.p256dh,
      p_auth: json.keys?.auth,
      p_pin: pin,
    });
  } catch (err) {
    await sub.unsubscribe().catch(() => {});
    throw err;
  }
}

/** Unsubscribe this device and drop it from the store. Safe to call when off. */
export async function disablePush(url: string, key: string): Promise<void> {
  const sub = await currentSubscription();
  if (!sub) return;
  const { endpoint } = sub;
  await sub.unsubscribe().catch(() => {});
  await sbRpc(url, key, 'delete_push_subscription', { p_endpoint: endpoint }).catch(() => {});
}
