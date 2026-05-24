-- Migration: RLS for applications + user_roles helper
-- Source: design-doc-v1.md §17 (Auth = Supabase Auth; RLS keys off JWT)

begin;

create type public.app_role as enum ('pmg_reviewer');

create table public.user_roles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       public.app_role not null,
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null
);

alter table public.user_roles enable row level security;
revoke all on public.user_roles from public, anon, authenticated;

-- SECURITY DEFINER bypasses RLS on user_roles so the policy can check the
-- caller's role. STABLE lets Postgres cache it within a query plan.
-- Hard-pin search_path to block function-resolution hijack via user schemas.
create or replace function public.is_pmg_reviewer()
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'pmg_reviewer'
  );
$$;

revoke all on function public.is_pmg_reviewer() from public, anon;
grant execute on function public.is_pmg_reviewer() to authenticated;

alter table public.applications enable row level security;
revoke all on public.applications from public, anon;
grant select, insert, update on public.applications to authenticated;

-- ===== Defence-in-depth triggers =====
-- RLS alone permits a malicious founder to self-insert with status='accepted'
-- or to forge created_at/received_at/founder_user_id; a malicious PMG reviewer
-- could rewrite founder_user_id, email, or pitch_deck_path during triage.
-- These triggers clobber server-owned fields on INSERT and freeze immutable
-- fields on UPDATE. Service-role (admin client) is allowed to bypass for
-- legitimate maintenance — explicit, named.

create or replace function public.applications_secure_insert()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  if auth.role() = 'service_role' then
    return new;
  end if;
  -- Server owns these. Any client-supplied value is overwritten.
  -- (gen_random_uuid() unconditionally; never trust a client-supplied id.)
  new.id              = gen_random_uuid();
  new.status          = 'new';
  new.created_at      = now();
  new.updated_at      = now();
  new.received_at     = now();
  -- Founder identity comes from the JWT, never the request body.
  new.founder_user_id = auth.uid();
  return new;
end;
$$;

create trigger applications_secure_insert
  before insert on public.applications
  for each row execute function public.applications_secure_insert();

create or replace function public.applications_secure_update()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  if auth.role() = 'service_role' then
    return new;
  end if;
  -- Immutable columns for any non-service-role update (including PMG).
  new.id              = old.id;
  new.founder_user_id = old.founder_user_id;
  new.email           = old.email;
  new.created_at      = old.created_at;
  new.received_at     = old.received_at;
  new.pitch_deck_path = old.pitch_deck_path;
  return new;
end;
$$;

-- Trigger names fire alphabetically; this MUST run before
-- applications_set_updated_at so the latter still gets to set updated_at = now().
create trigger applications_secure_update
  before update on public.applications
  for each row execute function public.applications_secure_update();
-- ===== /Defence-in-depth triggers =====

-- INSERT: founder may create only their own application row.
create policy "applications_insert_own"
  on public.applications
  for insert
  to authenticated
  with check (founder_user_id = auth.uid());

-- SELECT: founder sees own row; PMG reviewer sees all.
create policy "applications_select_own_or_pmg"
  on public.applications
  for select
  to authenticated
  using (
    founder_user_id = auth.uid()
    or public.is_pmg_reviewer()
  );

-- UPDATE: PMG reviewer only. Founders cannot edit post-submission.
-- WITH CHECK blocks privilege escalation via UPDATE re-targeting the row.
create policy "applications_update_pmg_only"
  on public.applications
  for update
  to authenticated
  using (public.is_pmg_reviewer())
  with check (public.is_pmg_reviewer());

-- DELETE: no policy ⇒ denied for all authenticated roles. Service role
-- (admin client) bypasses RLS for legitimate erasure (DPDP right-to-erasure).

comment on function public.is_pmg_reviewer() is
  'True when the current Supabase Auth user has the pmg_reviewer role. SECURITY DEFINER; safe to call from RLS policies.';

commit;
