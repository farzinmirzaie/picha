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

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  import.meta.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

async function load(): Promise<{
  history: WeightEntry[];
  source: 'supabase' | 'seed';
}> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[weights] SUPABASE_URL/SUPABASE_ANON_KEY not set; using the seed ledger');
    return { history: seedHistory, source: 'seed' };
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/picha_weights?select=date,kg&order=date.asc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as Array<{ date: string; kg: number | string }>;
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

/** Where this build's ledger came from — 'seed' means the fallback was used. */
export const weightSource = data.source;

const last = weightHistory[weightHistory.length - 1];

/** Derived from the last ledger entry, like weight.current used to be. */
export const currentWeight = {
  label: `${last.kg} kg`,
  measuredOn: new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(last.date)),
};
