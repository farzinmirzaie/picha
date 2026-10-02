/**
 * Shared Supabase config — BUILD-TIME ONLY, never import from client scripts
 * (pages embed `supabaseClient` values into data attributes for their own
 * client code instead). The anon key is public by design: RLS allows reads
 * only, and all writes go through PIN-checked RPCs (supabase/schema.sql).
 */

// Accept the URL with or without a trailing /rest/v1/ — normalise to the bare
// project URL so path-building stays correct either way.
// NOTE: `import.meta.env?` (optional) — under Vite/Astro it's the env object;
// under plain Node (the `tsx` notify script, which imports this transitively
// via lib/health → data/care) `import.meta.env` is undefined, so fall through
// to process.env instead of throwing at module load.
const rawUrl = import.meta.env?.SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_URL = rawUrl?.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const SUPABASE_ANON_KEY =
  import.meta.env?.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

export const supabaseClient =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? { url: SUPABASE_URL, key: SUPABASE_ANON_KEY }
    : undefined;

/** GET a PostgREST path (e.g. `picha_weights?select=date,kg`). Throws on failure. */
export async function fetchRest<T>(path: string): Promise<T> {
  if (!supabaseClient) throw new Error('SUPABASE_URL/SUPABASE_ANON_KEY not set');
  const res = await fetch(`${supabaseClient.url}/rest/v1/${path}`, {
    headers: {
      apikey: supabaseClient.key,
      authorization: `Bearer ${supabaseClient.key}`,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}
