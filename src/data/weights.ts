/**
 * Weight ledger loader — BUILD-TIME ONLY, never import from client scripts.
 *
 * Source of truth: the Supabase table `picha_weights` (schema + seed in
 * supabase/schema.sql), read over PostgREST with the anon key. When the env
 * vars are missing (local dev) or the fetch fails, it falls back to the seed
 * ledger in picha.ts so the build always succeeds. The site is static, so new
 * rows appear on the next deploy (every push, the nightly rebuild, or a manual
 * "Run workflow" on the Deploy action).
 */
import { weightHistory as seedHistory, type WeightEntry } from './picha';
import { supabaseClient, fetchRest } from './supabase';
import { dateLabel } from '../lib/dates';

async function load(): Promise<{
  history: WeightEntry[];
  source: 'supabase' | 'seed';
}> {
  if (!supabaseClient) {
    console.warn('[weights] SUPABASE_URL/SUPABASE_ANON_KEY not set; using the seed ledger');
    return { history: seedHistory, source: 'seed' };
  }
  try {
    const rows = await fetchRest<Array<{ date: string; kg: number | string }>>(
      'picha_weights?select=date,kg&order=date.asc',
    );
    if (!Array.isArray(rows) || rows.length === 0) throw new Error('table is empty');
    const history = rows.map((r) => ({ date: r.date, kg: Number(r.kg) }));
    console.log(`[weights] loaded ${history.length} weigh-ins from Supabase`);
    return { history, source: 'supabase' };
  } catch (err) {
    console.warn(`[weights] Supabase fetch failed (${err}); using the seed ledger`);
    return { history: seedHistory, source: 'seed' };
  }
}

const data = await load();

/** Every weigh-in on the books, oldest first. */
export const weightHistory = data.history;

const last = weightHistory[weightHistory.length - 1];

/** Derived from the last ledger entry. */
export const currentWeight = {
  label: `${last.kg} kg`,
  measuredOn: dateLabel(last.date),
};
