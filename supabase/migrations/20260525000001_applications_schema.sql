-- Migration: applications schema
-- Source: design-doc-v1.md §8.1 (form schema) + §17 (engineering review)
-- Region: ap-south-1 (Mumbai) — enforced at Supabase project level, not in SQL

begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

-- §8.1 status transitions: new → reviewing → interview → accepted | declined
create type public.application_status as enum (
  'new',
  'reviewing',
  'interview',
  'accepted',
  'declined'
);

-- §8.1 Domain: dropdown of the six locked pillars (project memory: portfolio mapping)
create type public.application_domain as enum (
  'smart_manufacturing',
  'smart_energy',
  'smart_water',
  'smart_farming',
  'intelligent_asset_monitoring',
  'connected_transportation'
);

-- §8.1 Stage: radio
create type public.application_stage as enum (
  'idea',
  'mvp',
  'pilot',
  'revenue'
);

-- §8.1 Karnataka-registered?
create type public.karnataka_status as enum (
  'yes',
  'no',
  'in_process'
);

-- §8.1 Referral source: dropdown
create type public.referral_source as enum (
  'web_search',
  'event',
  'referral',
  'partner',
  'other'
);

-- §8.1 Raised capital before? "yes / no / amount range" — bucketed for analytics
create type public.raised_capital_band as enum (
  'no',
  'yes_undisclosed',
  'yes_under_25l',
  'yes_25l_to_1cr',
  'yes_over_1cr'
);

create table public.applications (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  received_at         timestamptz not null default now(),
  status              public.application_status not null default 'new',

  -- ON DELETE RESTRICT: founder records must be archived explicitly, not
  -- silently cascaded when an auth user is removed (DPDP-aligned).
  founder_user_id     uuid not null references auth.users(id) on delete restrict,

  -- §8.1 fields
  founder_name        text   not null check (char_length(founder_name) between 1 and 200),
  founder_role        text   not null check (char_length(founder_role) between 1 and 100),
  email               citext not null,
  phone               text   not null check (char_length(phone) between 6 and 30),
  company_name        text   not null check (char_length(company_name) between 1 and 200),
  company_url         text            check (company_url is null or char_length(company_url) between 4 and 2000),
  domain              public.application_domain not null,
  stage               public.application_stage  not null,
  team_size           int    not null check (team_size between 1 and 10000),
  problem_statement   text   not null check (char_length(problem_statement) between 1 and 280),
  why_coe_ea          text   not null check (char_length(why_coe_ea) between 1 and 500),
  karnataka_status    public.karnataka_status not null,
  raised_capital      public.raised_capital_band,
  referral_source     public.referral_source,

  -- Path MUST belong to this founder. Regex pins it to exactly two folder
  -- segments and a .pdf filename, blocking path traversal and cross-founder
  -- aliasing (e.g. inserting a row pointing at applications/<victim>/deck.pdf).
  pitch_deck_path     text check (
    pitch_deck_path is null
    or pitch_deck_path ~ ('^applications/' || founder_user_id::text || '/[^/]+\.pdf$')
  )
);

-- §8.1 "Email: unique constraint" — case-insensitive via citext.
-- Accepted product risk: not tied to auth.jwt()->>'email', so a squatter
-- could pre-claim a real founder's email. Mitigation = PMG manual cleanup;
-- chosen over a hard JWT bind so founders can apply with a company email
-- distinct from their login (common Google-auth pattern).
create unique index applications_email_unique
  on public.applications (email);

create index applications_status_received_at_idx
  on public.applications (status, received_at desc);

create index applications_founder_user_id_idx
  on public.applications (founder_user_id);

create index applications_domain_status_idx
  on public.applications (domain, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

comment on table public.applications is
  'Founder applications to the CoE-EA incubator. PII; founder-data residency: India (ap-south-1). RLS-enforced; see migration 20260525000002.';

commit;
