# CoE-EA Homepage — Complete Design Specification
## "The Instrument" — One Canvas, Five Depth Layers

**Status:** Approved  
**Date:** 2026-05-30  
**Session:** Brainstorm → Opus 4.8 creative direction  
**Decision authority:** Opus 4.8 (senior web developer / creative director)

---

## The One Emotional Truth

> *"This place can see what's wrong with my system before I've explained it — and it already knows how to fix it."*

Every section exists to deliver that to a startup founder in the first eight seconds — felt with their own hand, not read in a paragraph.

---

## Core Design Principles (non-negotiable)

1. **One persistent canvas.** A single `<canvas position:fixed>` lives behind the entire page in `layout.tsx`. Sections are scroll-state inputs to one continuous field. The gear-shift problem is solved at the architectural level — there is no cut, no mount/unmount between sections.
2. **Living manifestation.** The page breathes before any input. Low-amplitude perlin drift keeps the field alive at all times.
3. **Narrative-visual fusion.** Text and visual transform together as one event. Copy lines are triggered by the visual's own state, not timers. Stats crystallize as the repair completes — text is the reward state of the visual, never a caption.
4. **Smart vs. legacy always present.** Witnessed, not asserted. Live entropy counters, named pathologies, hold-to-resolve repair.
5. **Show don't tell throughout.** Every section demonstrates competence. Nothing claims it.
6. **Luxury restraint.** One dominant visual per section, rendered with material quality. Nothing fights itself.
7. **Canvas 2D only.** No Three.js, no WebGL shaders, no MP4 on the critical path.

---

## Audience

**Primary:** Startup founders with a working product in one of 10 domains. They want validation, credibility, support. They can smell BS in 8 seconds.

**Secondary:** Government / PMG decision-makers controlling infrastructure budgets. They want diagnostic depth.

**Both need to feel competence before they read a word.**

---

## Brand Palette

| Token | Hex | Use |
|-------|-----|-----|
| Deep midnight | `#060b18` | Primary background |
| Brand navy | `#0E2D7A` | Structure, edges |
| Brand cerulean | `#00A4E4` | Active state, smart system |
| Electric spark | `#2EE6FF` | Resolution moment, CTAs |
| Ice secondary | `#B7CFE8` | Latent structure, legacy |
| Paper | `#F7F4ED` | Text on dark |

---

## The Five Sections

---

### Section 1 — The Diagnosis (Hero)

**Role:** Sets the covenant — this page is an instrument you operate.

**What the founder experiences:**
Near-black viewport. ~900 particles in low-amplitude perlin drift forming latent silhouettes of ten infrastructure schematics. The founder moves their cursor. A soft diagnostic light (radius ~220px) travels with it, raising local particle luminance and snapping nearby particles into their true schematic: a gear, a water lattice, a circuit. The instant a domain resolves, a live counter ticks beside it:
- `Legacy: −2,140 m³ ▼` in red-shifted amber
- `Smart: holding ▲` in cerulean

Three copy lines appear sequenced, triggered by the visual's own state:
1. *"Your infrastructure is already talking."* — on first cursor move
2. *"Most systems can't hear it."* — on first domain reveal  
3. *"The data was always there. Legacy was blind to it."* — after second domain reveal

CTA bottom-right: **"Show us where it breaks →"** — underweight until 2 domains uncovered, then gains ink.

Unlabelled 11th node: *"Your domain isn't here? Doesn't matter. We diagnose the inefficiency, then build the instrument."*

**Visual:** Dark diagnostic field. Reveal via radial alpha gradient mask, cursor-tracked. C3 entropy delta counters are canvas-drawn instrument readouts, not DOM tooltips.

**Mobile:** Autonomous scripted sweep through domains on a timed arc (12s). Tap-to-lock a domain.

**Reduced-motion:** Drift freezes, reveals become discrete fades, counters show final resolved values.

**Technical:**
- `components/spreads/TheDiagnosis.tsx` — `'use client'`, reads from `FieldProvider`
- `components/field/particles.ts` — particle array `{x, y, homeX, homeY, schematicId, lum}`, squared-distance reveal check
- `data/domain-provenance.ts` — 10 domain definitions with stat, source, sentence, pathology fn, repair fn

**What gets cut:** `Hero.tsx`, `hero/Cover.tsx`, `hero/DioramaReveal.tsx`, `public/hero/diorama-hero.*` (3.4MB video). The glass-and-light material language of the Diorama is preserved as the canvas rendering palette — six iterations inform the look; the file retires.

---

### Section 2 — The Resolve (replaces Work)

**Role:** The instrument teaches its second verb. Diagnosis → repair.

**What the founder experiences:**
Same field, same particles — they deepen, not restart. Ten domain stations organise along a vertical spine. A CoE-origin sweep pulses from a central point to a domain showing a **named pathology**. The founder **holds** (~700ms) to resolve it. Repair ripples outward. The sourced stat crystallizes *as the ripple completes*. Resolved domains accumulate as persistent cerulean glyphs — earned, visible progress.

**The 10 named pathologies + stats:**

| Domain | Pathology | Stat | Source |
|--------|-----------|------|--------|
| Smart Manufacturing | Gear missing tooth, juddering | 35% less unplanned downtime | McKinsey 2024 |
| Smart Energy | Grid node overloading, heat spike | 5–10% electricity reduction | IEA 2025 |
| Smart Water | Pipe eddy at dead junction | 33M m³ saved annually | SUEZ 2024 |
| Smart Farming | Sensor dropout in crop field | 20–30% yield improvement | Springer 2024 |
| Connected Transport | Flow bottleneck, cascade backup | 1M fewer vehicles monthly | NYC 2025 |
| Smart Healthcare | Diagnostic queue overflow | 53% reduction in radiologist workload | PMC 2025 |
| Weather Monitoring | Sensor blind spot, warning gap | 6× lower disaster mortality | WMO 2025 |
| Smart Security | False alarm cascade | 57–90% fewer false alarms | Security InfoWatch 2024 |
| Asset Monitoring | Unscheduled failure spike | 40% fewer maintenance interventions | Schneider 2025 |
| Home Automation | Standby waste accumulation | 22–28% energy savings | Springer 2025 |

**Interaction rules:**
- Hold 700ms / click / keyboard Enter resolves — no release-punishment
- Tap-to-resolve on mobile
- Stat text crystallizes only on resolve — never pre-visible
- Keyboard: Tab navigates domain nodes, Enter resolves

**Narrative-visual fusion:** The stat does not exist until the repair completes. Text is the reward state of the visual.

**Technical:**
- `components/spreads/TheResolve.tsx` — client, reads scroll zone from `FieldProvider`
- `components/field/schematics.ts` — `{ pathology: (ctx, t) => void, repair: (ctx, t, progress) => void }` per domain
- Resolved glyphs in `FieldProvider` React state — **persist per session, reset per visit** (approved 2026-05-30)

**What gets cut:** `Work.tsx` entirely — 2×5 static grid, `<details>` accordion, per-cell apply links, `circuit-texture.png`. Reason: inert, claim-based, brochure mode.

---

### Section 3 — The Ledger (replaces Portfolio + Impact metrics)

**Role:** The institution's track record as evidence, not assertion.

**What the founder experiences:**
The dispersed field contracts. Particles re-target to a single luminous vertical spine. Each metric is a node — numbers climb with the same repair-ripple grammar as domains. Partner nodes wire in as quadratic-curve connection edges. A slow upward light current travels the spine. Ghosted sector-average baseline figures sit dim behind CoE's — the delta reads as augmentation.

**Metrics:**
- 52 startups selected
- 336 jobs created  
- ₹10.35 Cr revenue generated
- ₹230 Cr portfolio valuation
- 23 patents filed
- 70 products and services
- 127 prototypes developed
- 13 partners (HPE · Intel · Bosch · Schneider · MathWorks)

**Narrative-visual fusion:** A bigger number = a brighter, more massive node. Figure and visual mass are the same object.

**Technical:**
- `components/spreads/TheLedger.tsx`
- Particles re-target on scroll zone entry via Lenis scroll value from `FieldProvider`
- Counter animation on resolve curve
- Data from `data/impact-metrics.ts` until Sanity GROQ in W5

**What gets cut:** Separate `Portfolio.tsx` and `Impact.tsx`. Reason: two "institution about itself" beats violates luxury restraint — one evidence column, stated once.

---

### Section 4 — The Instrument (replaces Contact + Impact identity)

**Role:** The breath before the ask. The institution names itself once.

**What the founder experiences:**
For the first and only time, the field **stills**. Particle velocity damps to a slow, stable lattice. No counter runs. No fault sweeps. The contrast of motion-everywhere → stillness is the luxury beat — earned because everything above moved. One restrained statement of identity on near-black. The cerulean diagnostic light is steady.

**Visual:** Resting field. Particles in stable lattice. Text leads, visual recedes to a held breath. This is the one section where restraint means the copy comes first.

**Technical:**
- `components/spreads/TheInstrument.tsx`
- Canvas damps particle velocity toward lattice coordinates — computationally the lightest section

**What gets cut:** `Contact.tsx` as standalone. `Impact.tsx` lower identity section. Reason: identity and contact were diluting each other; one section, one job.

---

### Section 5 — The Application (replaces Apply)

**Role:** The final resolve. The instrument's grammar closes the loop.

**What the founder experiences:**
The field returns gently — resolved domain glyphs from Section 2 reappear in the periphery. Five benefits as instrument outputs (not perks):

| Output | Detail |
|--------|--------|
| ₹10L | Non-dilutive seed grant |
| Hardware | IoT testbeds, instrumented bays, edge compute |
| Mentors | Domain practitioners, not generalist advisors |
| 50% | Market-support reimbursement on customer-development travel |
| Ecosystem | HPE · Intel · Bosch · Schneider · MathWorks |

The submit button carries the **hold-to-apply gesture** — the same ~700ms hold used to resolve infrastructure in Section 2. The founder held to fix a gear; now they hold to commit themselves. Standard click / keyboard always submits — hold is progressive enhancement.

Domain pre-filled from `?pillar=` URL param.

**Technical:**
- `components/spreads/TheApplication.tsx` — new spread chrome wrapping existing `ApplyForm`
- `components/forms/**` — kept entirely untouched
- `app/actions/apply.ts` — kept entirely untouched (Supabase write, Resend, RLS)

**What gets cut:** `Apply.tsx` spread chrome and static benefit token presentation. The form data layer is sacred — only skin and submit gesture change.

---

## Glyph Persistence Model

**Persist per session, reset per visit.** Resolved domain glyphs live in `FieldProvider` React state for the duration of the browser session. A new page load starts a fresh diagnostic. No localStorage, no cross-visit state.

---

## Complete Component Tree

```
app/
  (site)/
    layout.tsx                          # mounts FieldCanvas + LenisProvider
    page.tsx                            # composes 5 spreads (rewritten)

components/
  field/
    FieldCanvas.tsx                     # NEW — one persistent <canvas fixed>, single rAF loop
    FieldProvider.tsx                   # NEW — context: scroll value, resolved glyphs, reduced-motion
    particles.ts                        # NEW — particle system, perlin drift, reveal mask
    schematics.ts                       # NEW — 10 parametric pathology + repair draw fns
    counters.ts                         # NEW — C3 entropy delta + resolve-curve counters
  spreads/
    TheDiagnosis.tsx                    # NEW — Section 1
    TheResolve.tsx                      # NEW — Section 2
    TheLedger.tsx                       # NEW — Section 3
    TheInstrument.tsx                   # NEW — Section 4
    TheApplication.tsx                  # NEW — Section 5 (wraps existing ApplyForm)
  forms/                                # KEPT — ApplyForm + all field components
  motion/
    LenisProvider.tsx                   # KEPT

data/
  domain-provenance.ts                  # NEW — 10 domains with stat, source, sentence, pathology, repair
  impact-metrics.ts                     # NEW — CoE metrics + partners (until Sanity GROQ W5)

# DELETED:
components/spreads/hero/Cover.tsx
components/spreads/hero/DioramaReveal.tsx
components/spreads/Hero.tsx
components/spreads/Work.tsx
components/spreads/Portfolio.tsx
components/spreads/Impact.tsx
components/spreads/Contact.tsx
public/hero/diorama-hero.{mp4,webm,jpg}   # 3.4MB — no longer the instrument
```

---

## Scroll Model

**Free scroll with Lenis — not snap.** Snap reintroduces discrete document boundaries. Free smooth scroll lets the field deepen continuously. The shared Lenis scroll value (0→1) is the single input that re-targets particle field behaviour per zone.

---

## Performance Targets

| Metric | Target | Mechanism |
|--------|--------|-----------|
| LCP | Better than current | MP4 removed (~3.4MB saved from critical path) |
| Canvas fps | 60 desktop / 30 mobile | DPR capped at 2, particles ≤900 |
| Reduced-motion | Full legibility without animation | Drift off, reveals discrete, counters at final values |
| Background tab | rAF paused | IntersectionObserver on FieldCanvas |
| Mobile | Full experience | Scripted sweep + tap-to-lock/resolve |

---

## Accessibility

- `<canvas>` is `aria-hidden="true"` + `role="presentation"` — decorative
- All semantic content (H1, domain names, stats, benefits, CTA) in real DOM elements layered over canvas
- Keyboard: Tab navigates domain nodes → Enter resolves; Tab → Apply → Enter submits
- SSR: H1, CTA, stat list ship before canvas hydrates — zero JS-dependent content
- `prefers-reduced-motion`: full content visible in static layout

---

## Implementation Order

1. `data/domain-provenance.ts` — real sourced data **(ship-blocker)**
2. `components/field/FieldCanvas.tsx` + `FieldProvider.tsx` — the engine
3. `components/field/particles.ts` + `schematics.ts` + `counters.ts` — primitives
4. `components/spreads/TheDiagnosis.tsx` — Section 1, highest priority
5. `components/spreads/TheResolve.tsx` — Section 2, gear-shift fix
6. `components/spreads/TheLedger.tsx` — Section 3
7. `components/spreads/TheInstrument.tsx` — Section 4
8. `components/spreads/TheApplication.tsx` — Section 5
9. `app/(site)/page.tsx` — rewrite to compose all 5 spreads
10. Delete retired files + assets
