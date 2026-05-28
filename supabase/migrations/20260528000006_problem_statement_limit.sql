-- Widen problem_statement limit from 280 to 400 characters.
-- Reason: 280 (tweet-length) is too tight for founders describing an industrial
-- IoT problem. PMG Gate 1 review flagged this as a barrier to quality submissions.
begin;

alter table public.application_leads
  drop constraint if exists application_leads_problem_statement_check;

alter table public.application_leads
  add constraint application_leads_problem_statement_check
  check (char_length(problem_statement) between 30 and 400);

commit;
