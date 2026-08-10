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

-- ---------------------------------------------------------------------------
-- Writes from the site: the anon key stays read-only; the weight page's entry
-- form calls this SECURITY DEFINER function instead, which checks a staff PIN
-- stored in a private schema (not exposed over the API). Same-date entries
-- update the existing row so a mistyped audit can be corrected.
--
-- AFTER running this file, set the PIN once (pick your own):
--   insert into private.staff_secrets (name, value) values ('weight_pin', '1234')
--   on conflict (name) do update set value = excluded.value;
-- ---------------------------------------------------------------------------

create schema if not exists private;

create table if not exists private.staff_secrets (
  name  text primary key,
  value text not null
);

-- One place that checks the shared staff PIN. Every write RPC and the Staff
-- tool's gate call this instead of repeating the lookup; it raises 'wrong pin'
-- on a mismatch. It lives in the private schema (never exposed over the API);
-- the SECURITY DEFINER functions below reach it because they run as the owner.
create or replace function private.verify_staff_pin(p_pin text)
returns void
language plpgsql
security definer
set search_path = private
as $$
begin
  if not exists (
    select 1 from private.staff_secrets
    where name = 'weight_pin' and value = p_pin
  ) then
    raise exception 'wrong pin';
  end if;
end;
$$;

create or replace function public.log_weight(p_date date, p_kg numeric, p_pin text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  perform private.verify_staff_pin(p_pin);
  if p_kg <= 0 or p_kg >= 20 then
    raise exception 'implausible weight';
  end if;
  insert into public.picha_weights (date, kg)
  values (p_date, p_kg)
  on conflict (date) do update set kg = excluded.kg;
end;
$$;

revoke all on function public.log_weight(date, numeric, text) from public;
grant execute on function public.log_weight(date, numeric, text) to anon;

-- ---------------------------------------------------------------------------
-- Training progress (the Royal Academy). Course content lives in the repo
-- (src/data/picha.ts); only PROGRESS lives here, keyed by course slug. Rows
-- are created lazily on the first write, so future courses need no schema
-- change. Same registrar PIN as log_weight.
-- ---------------------------------------------------------------------------

create table if not exists public.picha_training (
  slug       text primary key check (slug ~ '^[a-z0-9-]{1,40}$'),
  steps_done int  not null default 0 check (steps_done between 0 and 50),
  started_on date,
  updated_at timestamptz not null default now()
);

alter table public.picha_training enable row level security;

drop policy if exists "anon read" on public.picha_training;
create policy "anon read" on public.picha_training
  for select to anon using (true);

create or replace function public.log_training(
  p_slug text,
  p_steps_done int,
  p_started_on date,
  p_pin text
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  perform private.verify_staff_pin(p_pin);
  insert into public.picha_training (slug, steps_done, started_on, updated_at)
  values (p_slug, p_steps_done, p_started_on, now())
  on conflict (slug) do update
    set steps_done = excluded.steps_done,
        started_on = excluded.started_on,
        updated_at = now();
end;
$$;

revoke all on function public.log_training(text, int, date, text) from public;
grant execute on function public.log_training(text, int, date, text) to anon;

-- ---------------------------------------------------------------------------
-- Daily rounds (the Care checklist), shared across the staff's devices. One
-- row per day holding just the completed item ids; the item definitions live
-- in the repo (dailyChecklist in src/data/picha.ts), so adding/removing a
-- checklist item never touches the DB. Same registrar PIN as the others.
-- ---------------------------------------------------------------------------

create table if not exists public.picha_rounds (
  date       date primary key,
  done       text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.picha_rounds enable row level security;

drop policy if exists "anon read" on public.picha_rounds;
create policy "anon read" on public.picha_rounds
  for select to anon using (true);

-- Toggle a single item for a day (atomic per item, so two devices don't clash).
-- Returns the resulting done[] so the caller can sync exactly.
create or replace function public.set_round(
  p_date date,
  p_item text,
  p_done boolean,
  p_pin text
)
returns text[]
language plpgsql
security definer
set search_path = public, private
as $$
declare
  cur text[];
begin
  perform private.verify_staff_pin(p_pin);
  -- read-modify-write in plpgsql (no self-referential ON CONFLICT expression,
  -- which Postgres rejects when schema-qualified)
  select done into cur from public.picha_rounds where date = p_date;
  cur := coalesce(cur, array[]::text[]);
  if p_done then
    if not (cur @> array[p_item]) then
      cur := cur || p_item;
    end if;
  else
    cur := array_remove(cur, p_item);
  end if;
  insert into public.picha_rounds (date, done, updated_at)
    values (p_date, cur, now())
  on conflict (date) do update set done = excluded.done, updated_at = now();
  return cur;
end;
$$;

revoke all on function public.set_round(date, text, boolean, text) from public;
grant execute on function public.set_round(date, text, boolean, text) to anon;

-- ---------------------------------------------------------------------------
-- PIN gate for the Staff tool (/tools/staff/). Verifies the registrar PIN
-- without touching any data: raises 'wrong pin' on a mismatch (same message
-- the write RPCs use) so the client can reuse the shared sbRpc helper. The PIN
-- itself never leaves the private schema.
-- ---------------------------------------------------------------------------

create or replace function public.check_pin(p_pin text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  perform private.verify_staff_pin(p_pin);
end;
$$;

revoke all on function public.check_pin(text) from public;
grant execute on function public.check_pin(text) to anon;

-- ---------------------------------------------------------------------------
-- Web Push subscriptions (background reminders — scripts/notify). One row per
-- browser/device push endpoint. These rows are device secrets, so the table is
-- deliberately NOT readable over the anon API (no select/insert/delete policy).
-- The client writes through the SECURITY DEFINER RPCs below; the scheduled
-- sender reads it with the service_role key (which bypasses RLS). Subscribing
-- is staff-gated (same registrar PIN); unsubscribing only needs the endpoint
-- (an unguessable URL), so a device can always turn itself off even if the PIN
-- was forgotten.
-- ---------------------------------------------------------------------------

create table if not exists public.push_subscriptions (
  endpoint   text primary key,
  p256dh     text not null,
  auth       text not null,
  locale     text not null default 'en',
  created_at timestamptz not null default now()
);
-- Existing installs: add the locale column if the table predates it.
alter table public.push_subscriptions add column if not exists locale text not null default 'en';

alter table public.push_subscriptions enable row level security;
-- No policies on purpose: anon can neither read nor write directly. All access
-- goes through the RPCs (definer) or the service_role key (the sender).

-- The sender reads each device's locale to pick which language to push, so the
-- reminder arrives in the language that device chose on the site. Defaults to
-- 'en'; devices subscribed before this column existed stay English until they
-- toggle reminders again.
create or replace function public.save_push_subscription(
  p_endpoint text,
  p_p256dh text,
  p_auth text,
  p_pin text,
  p_locale text default 'en'
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  perform private.verify_staff_pin(p_pin);
  insert into public.push_subscriptions (endpoint, p256dh, auth, locale)
    values (p_endpoint, p_p256dh, p_auth, coalesce(nullif(p_locale, ''), 'en'))
  on conflict (endpoint) do update
    set p256dh = excluded.p256dh, auth = excluded.auth, locale = excluded.locale;
end;
$$;

revoke all on function public.save_push_subscription(text, text, text, text, text) from public;
grant execute on function public.save_push_subscription(text, text, text, text, text) to anon;

create or replace function public.delete_push_subscription(p_endpoint text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.push_subscriptions where endpoint = p_endpoint;
end;
$$;

revoke all on function public.delete_push_subscription(text) from public;
grant execute on function public.delete_push_subscription(text) to anon;

-- Tell PostgREST to refresh its schema cache so any function added/changed
-- above is callable immediately (otherwise a new RPC can 404 with
-- "Could not find the function ... in the schema cache" until the next reload).
notify pgrst, 'reload schema';
