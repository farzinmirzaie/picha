/**
 * Measurement ledger loader — BUILD-TIME ONLY, never import from client scripts.
 *
 * Source of truth: the Supabase table `picha_measurements` (schema in
 * supabase/schema.sql), read over PostgREST with the anon key. Falls back to the
 * seed in picha.ts when the env vars are missing or the fetch fails, so the
 * build always succeeds. New rows appear on the next deploy; between rebuilds the
 * Measurements page re-fetches on the client. Values are centimetres.
 */
import {
  measurementHistory as seedHistory,
  measurementDims,
  type MeasureEntry,
  type MeasureDimId,
} from './picha';
import { supabaseClient, fetchRest } from './supabase';

const num = (v: unknown): number | undefined =>
  v === null || v === undefined || v === '' ? undefined : Number(v);

async function load(): Promise<MeasureEntry[]> {
  if (!supabaseClient) {
    console.warn('[measurements] SUPABASE_URL/SUPABASE_ANON_KEY not set; using seed');
    return seedHistory;
  }
  try {
    const rows = await fetchRest<Array<Record<string, unknown>>>(
      'picha_measurements?select=date,back_cm,chest_cm,neck_cm,belly_cm,leg_cm&order=date.asc',
    );
    if (!Array.isArray(rows)) throw new Error('unexpected response');
    const history: MeasureEntry[] = rows.map((r) => ({
      date: String(r.date),
      back: num(r.back_cm),
      chest: num(r.chest_cm),
      neck: num(r.neck_cm),
      belly: num(r.belly_cm),
      leg: num(r.leg_cm),
    }));
    console.log(`[measurements] loaded ${history.length} session(s) from Supabase`);
    return history;
  } catch (err) {
    console.warn(`[measurements] Supabase fetch failed (${err}); using seed`);
    return seedHistory;
  }
}

/** Every measurement session on the books, oldest first. */
export const measurementHistory: MeasureEntry[] = await load();

/**
 * The current value for each dimension: the most recent session that recorded
 * it (dimensions can be measured on different days). `{ cm, date }` or null.
 */
export const currentMeasurements: Record<MeasureDimId, { cm: number; date: string } | null> =
  Object.fromEntries(
    measurementDims.map((d) => {
      for (let i = measurementHistory.length - 1; i >= 0; i--) {
        const v = measurementHistory[i][d.id];
        if (v !== undefined && v !== null) return [d.id, { cm: v, date: measurementHistory[i].date }];
      }
      return [d.id, null];
    }),
  ) as Record<MeasureDimId, { cm: number; date: string } | null>;

/** True once at least one dimension has ever been recorded. */
export const hasMeasurements = Object.values(currentMeasurements).some(Boolean);
