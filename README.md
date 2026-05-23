# CoE-EA Website

Production website for the **Center of Excellence — Efficiency Augmentation** (CoE-EA), an STPI initiative. Public domain: `ea.stpi.in`.

This is the W1 scaffold — the foundation. The full design, architecture, and 12-week plan live in the planning repository at `C:\Users\Nishant\.gstack\projects\coe-ea-website\`:

- `design-doc-v1.md` — source of truth for IA, content, architecture, the 12-week timeline.
- `DESIGN.md` — the locked design system (colours, type, grid, spacing, motion, contrast matrix, slop blacklist).
- `dpdp-privacy-scaffold-v1.md` — DPDP privacy notice scaffold (W8 implementation).
- `data-residency-audit-v1.md` — vendor residency register and remediation actions.
- `TODOS.md` — open follow-ups.

## Stack

- **Next.js 16.2.6 LTS** (App Router, React 19, Turbopack dev)
- **Tailwind 4** — CSS-first `@theme`; tokens in `app/globals.css` derived from DESIGN.md
- **TypeScript** strict
- **Supabase** — Postgres + Auth + Storage, region `ap-south-1` (Mumbai) for founder-data residency
- **Sanity** — embedded Studio at `/studio`
- **Resend** — transactional email
- **Framer Motion + Lenis** — motion budget per DESIGN.md §7 (Three.js / GSAP deliberately cut)
- **Plausible** — privacy-first analytics (deferred)
- **Vercel** — hosting; functions pinned to `bom1` (Mumbai) via `vercel.json`

## Running

```bash
npm install
cp .env.example .env.local   # fill in values when cloud projects are provisioned
npm run dev                  # http://localhost:3000
```

The W1 scaffold creates **no cloud projects** — every env value is a placeholder until procurement (TODOS.md #8). The app builds and renders without them; integrations are skeletons.

## Repository layout

```
app/
  (site)/                   public site (home + apply / book / governance / events / privacy)
  admin/                    PMG admin — default-deny stub until W4 (Supabase Auth + RLS)
  studio/[[...tool]]/       embedded Sanity Studio (noindex, isolated layout)
components/
  forms/                    shared Field / SubmitButton / ErrorBanner (W3+)
  admin/                    AdminShell layout (W4)
  motion/                   LenisProvider, Reveal — respect prefers-reduced-motion
  analytics/                Plausible stub (no-op until configured)
lib/
  supabase/                 client (browser) + server (SSR) + admin (service-role, server-only)
  sanity/                   client
  resend/                   client
sanity/schemas/             schema types (empty placeholder; authoring follows W1)
public/hero/                diorama-hero.mp4 / .webm / poster
```

## Decisions baked in

- **Fonts.** `app/fonts.ts` ships fallbacks for the unprocured licensed faces (GT Sectra Display, PP Neue Montreal — TODOS.md #2). JetBrains Mono is the final mono. When the licences land, swap to `next/font/local`; keep the `--ff-*` variable names and nothing else has to change.
- **Cloud projects.** Not created here — Supabase, Sanity, and Vercel projects are procurement (TODOS.md #8).
- **Admin section.** Default-deny + `noindex` until W4 Auth.
- **Sanity.** Public / editorial content only — never founder PII or pitch decks (residency audit).
- **Resend.** Email bodies must not carry founder PII or deck contents (residency audit R3).
- **Vercel region** = `bom1` (Mumbai). This pins function execution; platform logs are US — full residency picture in `data-residency-audit-v1.md`.

## Notes

- **`.prettierrc` is not present** — the local config-protection hook blocked creating it. Prettier runs on defaults; the Tailwind class-sorting plugin is installed but inactive until a config file is added.
- Tailwind 4 default breakpoints are reset in `globals.css` so only `tablet` (768) and `desktop` (1200) exist — matches DESIGN.md §5.
- This repository's `AGENTS.md` carries a Next 16 reminder: APIs and conventions may differ from older training data; check `node_modules/next/dist/docs/` when in doubt.

## Status

W1 scaffold complete. W2 onward fills the editorial spreads (`app/(site)/page.tsx`), the apply backend and admin, the booking flow, content, SEO, and the rest of the 12-week build.
