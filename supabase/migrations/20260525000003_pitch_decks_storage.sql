-- Migration: pitch-decks Storage bucket + policies
-- Source: design-doc-v1.md §8.1 (pitch deck, PDF, max 25MB),
--         §12 item 11 (private bucket in India, RLS + signed URLs),
--         dpdp-privacy-scaffold-v1.md Part D (deck handling).
-- Path convention: applications/<auth.uid()>/<filename>.pdf (exactly 2 folders).
-- Signed-URL TTL: <= 300 seconds, generated server-side by admin client.
--
-- Post-submission immutability: founders cannot UPDATE or DELETE their own
-- deck via the authenticated client. Replacements go through a server action
-- that uses the admin (service-role) client.
--
-- PMG access is admin-mediated (signed URLs, 5-min TTL) — there is no direct
-- PMG SELECT policy here. The admin client bypasses RLS by design.

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pitch-decks',
  'pitch-decks',
  false,
  26214400, -- 25 MiB
  array['application/pdf']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- INSERT: founder uploads only into their own folder, .pdf only, exactly two
-- folder segments (no traversal, no extra dirs).
create policy "pitch_decks_insert_own"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'pitch-decks'
    and storage.foldername(name) = array['applications', auth.uid()::text]
    and name ~ '\.pdf$'
  );

-- No SELECT policy: ALL reads go through admin-mediated signed URLs (5-min
-- TTL, server-side logged). Founders viewing their own deck post-submission
-- go through the same `/api/deck/:id/signed-url` route as PMG, just with a
-- different authorisation check upstream. This collapses the access model to
-- one path and one audit trail.
-- No UPDATE policy: post-submission immutability. Replacements go through the
-- admin client via a server action that records an audit trail.
-- No DELETE policy: same reasoning + DPDP erasure-runbook compliance.

commit;
