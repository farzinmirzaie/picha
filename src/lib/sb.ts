/**
 * Tiny Supabase REST helpers for CLIENT scripts (url + key come from data
 * attributes the pages embed at build time). Build-time code uses
 * src/data/supabase.ts instead.
 */

const headers = (key: string) => ({
  apikey: key,
  authorization: `Bearer ${key}`,
});

/** GET a PostgREST path (e.g. `picha_weights?select=date,kg`). Throws on failure. */
export async function sbSelect<T>(url: string, key: string, path: string): Promise<T> {
  const res = await fetch(`${url}/rest/v1/${path}`, { headers: headers(key) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

/** Call an RPC; throws an Error carrying the server's message (e.g. "wrong pin"). */
export async function sbRpc(
  url: string,
  key: string,
  fn: string,
  args: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { ...headers(key), 'content-type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }
}
