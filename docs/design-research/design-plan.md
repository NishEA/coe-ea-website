# CoE-EA Website — Design Enhancement Plan
**Based on:** 13-site reference scan (2026-05-31)  
**Current state:** The Instrument homepage — 5 scroll spreads, particle field, all 18 tasks complete  
**Purpose:** Identify upgrades from reference sites that raise the quality ceiling without a full rebuild

---

## Executive Summary

The 13 reference sites collectively validate our dark particle field approach and reveal 8 specific patterns we have not implemented yet. The highest-priority additions are: a **live impact counter**, a **"SYSTEM OPERATIONAL" status badge**, **chapter progress navigation**, and a **split headline** on TheDiagnosis. These are all additive — no existing work needs to be dismantled.

---

## Pattern Library from Reference Scan

### Tier 1 — High impact, directly applicable

| # | Pattern | From | CoE-EA Application |
|---|---------|------|--------------------|
| 1 | Live counter | melboucierayane.com | "₹X crore portfolio value" incrementing in real-time in nav or TheLedger |
| 2 | "SYSTEM OPERATIONAL" status badge | ausdata.ai | "CENTRE ACTIVE · INSTRUMENTS DEPLOYED" above headline in TheDiagnosis |
| 3 | Chapter progress track | mazehq.com, fade.run, lightweight.info | 01/05 through 05/05 dot-indicator on fixed sidebar as user scrolls through spreads |
| 4 | Split headline | dirac.com | "India's infrastructure is bleeding efficiency." (left) + "We built the instrument to stop it." (right) — particle field between them |
| 5 | Two-weight headline | nfinitepaper.com, ausdata.ai | Bold claim (white) + lighter descriptor (muted gray) in same type size |
| 6 | Technical domain metadata | melboucierayane.com | "DOMAIN.01 · SMART MANUFACTURING · ACTIVE" shown when a domain is resolved in TheResolve |
| 7 | Entry ritual | aboutluca.com, fade.run | Loading screen → "ENTER" gate before particle field activates |
| 8 | Colored domain nodes | ausdata.ai, mazehq.com | Each of the 10 domains gets an individual hue in the particle field, not all white |

### Tier 2 — Valuable, plan for Phase 2

| # | Pattern | From | CoE-EA Application |
|---|---------|------|--------------------|
| 9 | Sound design | aboutluca.com, fade.run | Ambient industrial/data soundscape, toggleable, reacts to domain resolution |
| 10 | Before/after wireframe | dirac.com | Legacy state (red) vs IoT-optimized state (teal) for domain diagnostic — animated on resolve |
| 11 | Dual-screen QR | fade.run | STPI presentation: QR opens mobile companion with live CoE-EA metrics |
| 12 | Animated KPI bars | meteo.ashwyn.studio | KPI metrics animate as rising 3D bars (₹10.35 Cr growing from ₹0) on scroll into view |

---

## What the 13 Sites Validate (Keep As-Is)

- **Particle field as hero** — aboutluca, maze, infracorp all do this. We are in the right league.
- **Dark midnight background** — 10 of 13 sites are dark. We are not outliers.
- **Hold-to-resolve interaction** — Not seen in any reference site. It is unique. Keep it.
- **Cream sections for TheInstrument/TheApplication** — nfinitepaper validates warm editorial bg.
- **Fixed dark nav with CTA** — Dirac and Luca Nardi both use minimal fixed nav. Right call.
- **Pill CTA style** — aboutluca, rishabh-upadhyay, infracorp all use pill CTAs.

---

## Proposed Upgrades — Spread by Spread

### TheDiagnosis (Section 1)

**Currently:** cursor reveals 10 nodes, hold 700ms to resolve

**Add:**
- `CENTRE ACTIVE · INSTRUMENTS DEPLOYED` status badge above the headline — small spaced caps, green dot prefix, teal color
- Split the hero copy into a left column (problem) and right column (resolution) with the particle field between
- Two-weight headline: bold white for the core claim, muted gray for the descriptor
- Colored domain nodes: each of 10 domains gets a distinct hue (see color table below)

**Split headline direction:**
```
[LEFT COLUMN]                      [RIGHT COLUMN]
India's industries                  The CoE-EA
lose ₹2,400 crore                   Instrument maps
to preventable                      every loss node.
inefficiency annually.              Resolve one now.
             [PARTICLE FIELD CENTER]
```

---

### TheResolve (Section 2)

**Currently:** live resolved domain list, mouse + keyboard hold-to-resolve

**Add:**
- Technical metadata per resolved domain: `DOMAIN.03 · SMART WATER · 33M m³ SAVED · PMC CITED`
- Chapter progress indicator: `02 / 05` shown subtly in fixed sidebar
- Optional: before-state (red muted) vs after-state (teal bright) color shift on the domain node at resolve moment

---

### TheLedger (Section 3)

**Currently:** 9 KPIs + 5 partners, dark backdrop

**Add:**
- Live counter: ₹230 Cr portfolio valuation incrementing based on actual growth rate per second
- KPI stat tile format upgrade to monospace large number + unit chip + small label

**KPI tile format upgrade:**
```
Current:   "₹10.35 Cr   Revenue generated"
Upgraded:   10.35  Cr                      ← large monospace number + unit chip
            Revenue generated              ← small muted label below
```

- Chapter progress: `03 / 05`

---

### TheInstrument (Section 4)

**Currently:** institutional identity, contact, selection, eligibility on cream bg

**Add:**
- Section label in spaced teal caps: `THE INSTRUMENT` above the heading (like ausdata.ai's "PRODUCT SUITE")
- Two-outline CTA pair side by side: `APPLY NOW →` + `DOWNLOAD BROCHURE →`
- Chapter progress: `04 / 05`

---

### TheApplication (Section 5)

**Currently:** 5 benefit tokens + full apply form on cream bg

**Add:**
- Chapter progress: `05 / 05`
- Form submit label: `TRANSMIT APPLICATION` instead of "Submit" — carries the instrument metaphor through

---

## Navigation Upgrades

**Currently:** fixed dark nav with 5 routes + Apply CTA

**Add:**
1. **Green operational dot** next to the CoE-EA logo — small, subtle pulse animation
2. **Live portfolio counter** (if space permits): `₹230 Cr · 52 startups` in small text in center of nav
3. **Active section highlight**: nav items highlight as user scrolls past each spread

---

## Visual System Additions

### New Color Tokens
```css
--color-operational: #22c55e;   /* green dot, ACTIVE badges */
--color-amber:       #d4a853;   /* warm premium accent, from fade.run */
--color-legacy:      #ef4444;   /* red wireframe for "before" state */
```

### Domain Node Colors
Each domain gets one hue — consistent across field, resolved list, and metadata label:

| Domain | Color Token | Hex |
|--------|-------------|-----|
| Smart Manufacturing | blue | `#60a5fa` |
| Smart Energy | amber | `#fbbf24` |
| Smart Water | sky | `#38bdf8` |
| Smart Farming | green | `#4ade80` |
| Connected Transport | orange | `#f97316` |
| Smart Healthcare | fuchsia | `#e879f9` |
| Weather Monitoring | violet | `#a78bfa` |
| Smart Security | rose | `#f43f5e` |
| Asset Monitoring | orange-warm | `#fb923c` |
| Home Automation | emerald | `#34d399` |

### Typography Hierarchy Additions
```
Section label:   spaced caps, 0.75rem, --color-brand-ice, letter-spacing: 0.2em
Split hero:      7–8rem display, left col bold, right col thin weight
KPI numbers:     font-variant-numeric: tabular-nums, monospace stack
Domain metadata: 0.65rem, spaced caps, domain-color at 80% opacity
```

---

## Implementation Sequence

| Step | Task | Est. Time |
|------|------|-----------|
| 1 | Status badge + green dot (TheDiagnosis + nav) | 1 hr |
| 2 | Domain node colors in DOMAINS array + particle renderer | 2 hr |
| 3 | Technical metadata on resolved domain in TheResolve | 1.5 hr |
| 4 | KPI stat tile redesign in TheLedger | 1.5 hr |
| 5 | Chapter progress sidebar (fixed, 01–05) | 2 hr |
| 6 | Split headline restructure in TheDiagnosis | 1 hr |
| 7 | Live counter (nav or TheLedger) | 2 hr |
| 8 | Entry ritual loading screen (optional, last) | 2 hr |

**Total estimate: ~13 hours**

---

## Questions to Resolve Before Implementing

1. **Entry ritual** — Loading screen + ENTER gate, or straight into the particle field? (fade.run and aboutluca both use it — signals "this is an experience, not a brochure." Your call.)
2. **Live counter placement** — In the nav bar center (like melboucierayane) or only inside TheLedger? What is the actual growth rate (₹ per day) we should use?
3. **Sound design** — Phase 1 or defer? Even a subtle toggle would elevate significantly.
4. **Split headline copy** — Approve the direction above or want 3 options drafted before touching code?
5. **Domain colors** — Use the 10 suggested above, or constrain to brand palette only (midnight/ice/sage/paper)?
6. **"TRANSMIT APPLICATION"** — Keep? Or does this feel off-brand for the institutional audience?

---

## Highest Reference Sites (bookmark these)

1. **fade.run** — Chapter narrative, dual-screen, gold on amber, entry ritual, sound
2. **ausdata.ai** — Status badge, knowledge graph nodes, section labels, italic serif headings
3. **melboucierayane.com** — Live counter, technical metadata, waveform sidebar
4. **dirac.com** — Split headline, before/after visualization, minimal nav done right
5. **mazehq.com** — Chapter progress track, stat tiles, text-through-sphere
