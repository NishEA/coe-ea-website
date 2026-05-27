-- Migration: application_leads — public (no-auth) application intake table
-- Rationale: public.applications requires auth.users FK (authenticated flow, W4+).
-- Founders submitting the public form are unauthenticated. This table captures
-- all form submissions via the service-role server action.
-- After W4 auth is wired, submissions here are promoted to public.applications.

begin;

create table public.application_leads (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  status                  text not null default 'new'
                            check (status in ('new','reviewing','shortlisted','declined','converted')),

  -- Founder identity
  founder_name            text   not null check (char_length(founder_name) between 1 and 200),
  founder_email           citext not null check (char_length(founder_email) between 5 and 320),
  founder_phone           text   check (founder_phone is null or char_length(founder_phone) between 6 and 30),

  -- Startup identity
  startup_name            text   not null check (char_length(startup_name) between 1 and 200),
  domain                  text   not null,
  stage                   text   not null check (stage in ('idea','mvp','pilot','revenue')),
  founded_in_last_5_years text   not null check (founded_in_last_5_years in ('yes','no')),
  karnataka_registered    text   not null check (karnataka_registered in ('yes','in_process','no')),

  -- Long-form answers
  problem_statement       text   not null check (char_length(problem_statement) between 30 and 280),
  why_coe_ea              text   not null check (char_length(why_coe_ea) between 30 and 500),

  -- Optional intake context
  raised_capital          text,
  referral_source         text,

  -- DPDP Act 2023 consent record
  privacy_consent         boolean not null default false,
  consent_recorded_at     timestamptz
);

-- Service-role only: public form submissions come in via the server action
-- which uses the admin client (service role). Anon/authenticated roles have
-- no access — read or write.
alter table public.application_leads enable row level security;
revoke all on public.application_leads from public, anon, authenticated;

comment on table public.application_leads is
  'Pre-auth application intake from the public form. PII; ap-south-1; service-role write only. DPDP consent recorded per row.';

create index application_leads_email_idx on public.application_leads (founder_email);
create index application_leads_status_created_idx on public.application_leads (status, created_at desc);
create index application_leads_domain_idx on public.application_leads (domain);

commit;
