/**
 * Recurring-care loader — BUILD-TIME ONLY, never import from client scripts.
 *
 * Source of truth for the repeating chores (cadence, copy, icons) is the repo
 * (`recurringCare` in picha.ts). Their *last done* date can be overridden from
 * the Supabase table `picha_care` (schema + RPC in supabase/schema.sql), so a
 * staff "mark done" tap resets the countdown without an edit + redeploy. This
 * merges the cloud dates over the seed at build time; when the env vars are
 * missing (local dev) or the fetch fails, the seed `lastDone` stands, so the
 * build always succeeds. The site is static, so a tapped date is baked in on
 * the next deploy (every push, the nightly rebuild, or a manual run) — between
 * rebuilds the Health page re-applies the same override on the client.
 */
import { recurringCare as seedCare, type RecurringItem } from './picha';
import { supabaseClient, fetchRest } from './supabase';

async function loadOverrides(): Promise<Record<string, string>> {
  if (!supabaseClient) {
    console.warn('[care] SUPABASE_URL/SUPABASE_ANON_KEY not set; using seed dates');
    return {};
  }
  try {
    const rows = await fetchRest<Array<{ id: string; last_done: string }>>(
      'picha_care?select=id,last_done',
    );
    if (!Array.isArray(rows)) throw new Error('unexpected response');
    const map = Object.fromEntries(rows.map((r) => [r.id, r.last_done]));
    console.log(`[care] loaded ${rows.length} care override(s) from Supabase`);
    return map;
  } catch (err) {
    console.warn(`[care] Supabase fetch failed (${err}); using seed dates`);
    return {};
  }
}

const overrides = await loadOverrides();

/**
 * recurringCare with cloud `lastDone` overrides merged in. A cloud date only
 * ever wins when it is newer than the seed, so a shipped seed bump is never
 * silently reverted by a stale row.
 */
export const recurringCare: RecurringItem[] = seedCare.map((item) => {
  const cloud = overrides[item.id];
  if (cloud && (!item.lastDone || cloud > item.lastDone)) {
    return { ...item, lastDone: cloud };
  }
  return item;
});
