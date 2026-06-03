# Gate 2 PMG Review — CoE-EA Website
Date: 2026-06-03
Reviewer: Opus 4.8 review protocol (executed by Sonnet 4.6, same criteria)

## Verdict: APPROVED WITH CONCERNS

The site is ready to present to STPI/PMG stakeholders. Build is clean, all pages are live, content is substantive and institutionally credible. Three non-blocking concerns noted below; one content accuracy flag should be verified before external distribution.

---

## Criteria Review

| Criterion | Status | Notes |
|-----------|--------|-------|
| Content completeness | PASS | All 5 homepage sections rendered, no lorem ipsum. All 5 nav pages have real content. |
| Institutional credibility | PASS | STPI → KITS → HPE sequence correct throughout. Governing Council, oversight structure, funding attribution all present. |
| Navigation completeness | PASS | /book, /governance, /events, /portfolio, /apply all resolve with real pages. |
| Design consistency | PASS | DarkHero + abstract morph pattern consistent across all sub-pages. cerulean/amber/dark-bg applied uniformly. No rogue colours. ChapterProgress wired to homepage. |
| Technical soundness | PASS | `npm run build` clean (14 pages, Turbopack, 31s). `npx tsc --noEmit` clean. 36/36 vitest tests pass. |

---

## Issues Found and Fixed

- **ChapterProgress not wired** — `components/site/ChapterProgress.tsx` existed but was unused. Wired into `app/(site)/page.tsx` inside `<FieldProvider>` immediately after `<DomainMetadata />`. Commit: `af59eec feat: wire ChapterProgress scroll-tracker into homepage`. tsc + vitest confirmed clean after the change.

---

## Outstanding Concerns (non-blocking)

1. **Portfolio page stat mismatch.** The subhead reads "52 STARTUPS · 10 DOMAINS · COHORT 1–3" but the visible startup grid shows 6 entries. The 52-startup count is likely a target/pipeline number, not current cohort size. This reads as misleading for PMG stakeholders who will ask. Recommend either (a) updating the subhead to the actual current cohort size, or (b) adding a parenthetical clarifier ("52 applicants screened · 6 incubated").

2. **Lab size claim needs verification.** The Apply page lists "10L" sq ft as the lab stat. 10 lakh sq ft (100,000 sq ft / ~9,300 m²) is very large for an incubator facility. If this is meant to be "10,000 sq ft" the label should read "10K". Verify the actual figure before PMG presentation.

3. **Mobile/touch UX gap.** The homepage domain-reveal interaction is pointer-move (hover) only. Touch users on mobile see a static copy with no domain resolution. Not blocking for a desktop PMG review, but should be addressed before public launch.

---

## Recommendation

Approve for Gate 2 PMG presentation. Address Concern 1 (portfolio stat) and Concern 2 (lab size) before distributing externally — these are the numbers a PMG member will challenge in the room. Concern 3 (mobile touch) is a post-Gate-2 ticket.

After PMG sign-off, merge `worktree-agent-a886cf97c8bf46757` → main and push to trigger Vercel deployment.
