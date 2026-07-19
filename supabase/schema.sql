-- Picha's weight ledger — the cloud source of truth read by the site at build
-- time (src/data/weights.ts). Run this once in the Supabase SQL editor (or via
-- the Supabase MCP). Idempotent: safe to re-run.

create table if not exists public.picha_weights (
  id         bigint generated always as identity primary key,
  date       date not null unique,     -- one weigh-in per day
  kg         numeric(4, 2) not null check (kg > 0 and kg < 20),
  created_at timestamptz not null default now()
);

alter table public.picha_weights enable row level security;

-- The site only ever READS, at build time, with the anon key. Writes happen
-- through the Supabase dashboard (Table Editor) or the service role — so no
-- anon insert/update/delete policies on purpose.
drop policy if exists "anon read" on public.picha_weights;
create policy "anon read" on public.picha_weights
  for select to anon using (true);

-- Seed: the ledger as recorded in the repo up to the migration.
insert into public.picha_weights (date, kg) values
  ('2026-07-18', 2.85),
  ('2026-07-19', 2.70)
on conflict (date) do nothing;
