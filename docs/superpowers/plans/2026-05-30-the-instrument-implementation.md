# The Instrument — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CoE-EA homepage with "The Instrument" — one persistent Canvas 2D field behind five scroll-driven sections that demonstrate smart-vs-legacy infrastructure intelligence through a founder-operable diagnostic experience.

**Architecture:** A single `<canvas position:fixed>` (`FieldCanvas`) lives in `layout.tsx` behind the entire page. A `FieldProvider` context owns scroll progress, resolved-domain state, and pointer position. Five spread components are DOM layers that float above the canvas and write into the context; the canvas reads from it and re-renders via one `requestAnimationFrame` loop. Sections are scroll-zone states of one continuous field — no mount/unmount, no gear-shift.

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript 5, Tailwind 4, Lenis 1.3.23, Canvas 2D (no Three.js), Vitest + jsdom (tests added), Supabase + Resend (Apply backend — untouched).

---

> ⚠️ **AGENTS.md:** This is Next.js 16.2.6 — APIs and conventions differ from training data. Before writing any Next.js-specific code, read `node_modules/next/dist/docs/` for the current API.

---

## File Map

### New files
```
data/
  domain-provenance.ts          10 domain definitions, stats, positions, C3 counter rates
  impact-metrics.ts             CoE KPIs and partner list

components/field/
  FieldProvider.tsx             React context: scroll, resolved glyphs, active domain, pointer
  FieldCanvas.tsx               Single fixed <canvas>, one RAF loop, reads FieldProvider
  particles.ts                  Particle system — pure functions, no React
  schematics.ts                 10 parametric pathology+repair Canvas 2D draw functions
  counters.ts                   C3 entropy delta model — pure functions

components/spreads/
  TheDiagnosis.tsx              Section 1 — hero, cursor diagnostic
  TheResolve.tsx                Section 2 — hold-to-resolve domains
  TheLedger.tsx                 Section 3 — convergence column, CoE metrics
  TheInstrument.tsx             Section 4 — resting field, institutional identity
  TheApplication.tsx            Section 5 — apply form with hold-to-submit

tests/
  data/domain-provenance.test.ts
  data/impact-metrics.test.ts
  field/particles.test.ts
  field/counters.test.ts
  field/FieldProvider.test.tsx
  spreads/TheDiagnosis.test.tsx
  spreads/TheResolve.test.tsx
  spreads/TheApplication.test.tsx
```

### Modified files
```
app/(site)/layout.tsx     add FieldProvider + FieldCanvas wrappers
app/(site)/page.tsx       replace 5 old spreads with 5 new spreads
package.json              add vitest devDeps + test scripts
```

### Deleted files (Task 16)
```
components/spreads/Hero.tsx
components/spreads/hero/Cover.tsx
components/spreads/hero/DioramaReveal.tsx
components/spreads/Work.tsx
components/spreads/Portfolio.tsx
components/spreads/Impact.tsx
components/spreads/Contact.tsx
public/hero/diorama-hero.mp4  (3.4MB — off critical path)
public/hero/diorama-hero.webm
public/hero/diorama-hero.jpg
```

---

## Task 1: Test Infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom jest-canvas-mock
```

- [ ] **Step 2: Create vitest.config.ts**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 3: Create tests/setup.ts**

```typescript
// tests/setup.ts
import 'jest-canvas-mock'
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add scripts to package.json**

In `package.json`, inside `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Smoke test**

Create `tests/smoke.test.ts`:
```typescript
describe('infrastructure', () => {
  it('runs', () => expect(1 + 1).toBe(2))
})
```
Run: `npm test`
Expected: `✓ tests/smoke.test.ts > infrastructure > runs`

- [ ] **Step 6: Delete smoke test and commit**

```bash
del tests\smoke.test.ts
git add vitest.config.ts tests/setup.ts package.json package-lock.json
git commit -m "chore: add vitest test infrastructure"
```

---

## Task 2: Domain Data Layer

**Files:**
- Create: `data/domain-provenance.ts`
- Create: `tests/data/domain-provenance.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/data/domain-provenance.test.ts
import { DOMAINS, DOMAIN_11 } from '@/data/domain-provenance'

describe('DOMAINS', () => {
  it('has exactly 10 entries', () => {
    expect(DOMAINS).toHaveLength(10)
  })

  it('every domain has required fields', () => {
    for (const d of DOMAINS) {
      expect(d.id).toBeTruthy()
      expect(d.name).toBeTruthy()
      expect(d.stat).toBeTruthy()
      expect(d.source).toBeTruthy()
      expect(d.sentence).toBeTruthy()
      expect(d.fieldX).toBeGreaterThanOrEqual(0)
      expect(d.fieldX).toBeLessThanOrEqual(1)
      expect(d.fieldY).toBeGreaterThanOrEqual(0)
      expect(d.fieldY).toBeLessThanOrEqual(1)
      expect(d.legacyRatePerSec).toBeGreaterThan(0)
      expect(d.smartRatePerSec).toBeGreaterThanOrEqual(0)
      expect(d.smartRatePerSec).toBeLessThan(d.legacyRatePerSec)
      expect(d.unit).toBeTruthy()
    }
  })

  it('all ids are unique', () => {
    const ids = DOMAINS.map(d => d.id)
    expect(new Set(ids).size).toBe(10)
  })

  it('no two domains overlap in field position (min 0.12 apart)', () => {
    for (let i = 0; i < DOMAINS.length; i++) {
      for (let j = i + 1; j < DOMAINS.length; j++) {
        const dx = DOMAINS[i].fieldX - DOMAINS[j].fieldX
        const dy = DOMAINS[i].fieldY - DOMAINS[j].fieldY
        expect(Math.sqrt(dx * dx + dy * dy)).toBeGreaterThan(0.12)
      }
    }
  })

  it('DOMAIN_11 is the discovery node', () => {
    expect(DOMAIN_11.id).toBe('discovery')
    expect(DOMAIN_11.sentence).toBeTruthy()
  })
})
```

Run: `npm test tests/data/domain-provenance.test.ts`
Expected: FAIL — "Cannot find module '@/data/domain-provenance'"

- [ ] **Step 2: Implement domain-provenance.ts**

```typescript
// data/domain-provenance.ts

export interface DomainDef {
  id: string
  name: string
  /** Short stat string e.g. "35% less unplanned downtime" */
  stat: string
  /** Publication source e.g. "McKinsey 2024" */
  source: string
  /** One sentence describing the domain's intelligence mission */
  sentence: string
  /** Normalized horizontal position in the diagnostic field (0–1) */
  fieldX: number
  /** Normalized vertical position in the diagnostic field (0–1) */
  fieldY: number
  /** C3: legacy counter accrual rate (units per second) */
  legacyRatePerSec: number
  /** C3: smart counter accrual rate (much lower) */
  smartRatePerSec: number
  /** Display unit for counter e.g. "events", "m³", "kWh" */
  unit: string
}

export const DOMAINS: DomainDef[] = [
  {
    id: 'smart-manufacturing',
    name: 'Smart Manufacturing',
    stat: '35% less unplanned downtime',
    source: 'McKinsey 2024',
    sentence: 'IoT-instrumented production lines that predict faults before they cascade.',
    fieldX: 0.14, fieldY: 0.28,
    legacyRatePerSec: 0.9, smartRatePerSec: 0.06, unit: 'downtime events',
  },
  {
    id: 'smart-energy',
    name: 'Smart Energy',
    stat: '5–10% electricity reduction',
    source: 'IEA 2025',
    sentence: 'Grid intelligence that routes power where it is needed, not where it is habitual.',
    fieldX: 0.35, fieldY: 0.52,
    legacyRatePerSec: 2.1, smartRatePerSec: 0.19, unit: 'kWh wasted',
  },
  {
    id: 'smart-water',
    name: 'Smart Water',
    stat: '33 million m³ saved annually',
    source: 'SUEZ 2024',
    sentence: 'Leak detection and treatment automation that finds loss before it becomes drought.',
    fieldX: 0.54, fieldY: 0.22,
    legacyRatePerSec: 1.05, smartRatePerSec: 0.07, unit: 'm³ lost',
  },
  {
    id: 'smart-farming',
    name: 'Smart Farming',
    stat: '20–30% yield improvement',
    source: 'Springer 2024',
    sentence: 'Soil and crop sensing that turns guesswork into precision at the field level.',
    fieldX: 0.72, fieldY: 0.58,
    legacyRatePerSec: 0.7, smartRatePerSec: 0.05, unit: 'yield lost',
  },
  {
    id: 'connected-transport',
    name: 'Connected Transport',
    stat: '1 million fewer vehicles monthly',
    source: 'NYC 2025',
    sentence: 'Mobility platforms that thin congestion before it calcifies into infrastructure debt.',
    fieldX: 0.88, fieldY: 0.36,
    legacyRatePerSec: 3.2, smartRatePerSec: 0.22, unit: 'vehicle-hours wasted',
  },
  {
    id: 'smart-healthcare',
    name: 'Smart Healthcare',
    stat: '53% reduction in radiologist workload',
    source: 'PMC 2025',
    sentence: 'Clinical AI that reads what the queue cannot, so clinicians treat what only they can.',
    fieldX: 0.22, fieldY: 0.70,
    legacyRatePerSec: 1.4, smartRatePerSec: 0.10, unit: 'diagnostic delays',
  },
  {
    id: 'weather-monitoring',
    name: 'Weather Monitoring',
    stat: '6× lower disaster mortality',
    source: 'WMO 2025',
    sentence: 'Micro-climate sensing that builds warning lead-time where populations have none.',
    fieldX: 0.48, fieldY: 0.76,
    legacyRatePerSec: 0.4, smartRatePerSec: 0.03, unit: 'warning gaps',
  },
  {
    id: 'smart-security',
    name: 'Smart Security',
    stat: '57–90% fewer false alarms',
    source: 'Security InfoWatch 2024',
    sentence: 'Pattern recognition that filters noise so genuine threats are never buried.',
    fieldX: 0.78, fieldY: 0.75,
    legacyRatePerSec: 2.5, smartRatePerSec: 0.18, unit: 'false alarms',
  },
  {
    id: 'asset-monitoring',
    name: 'Asset Monitoring',
    stat: '40% fewer maintenance interventions',
    source: 'Schneider 2025',
    sentence: 'Condition monitoring that schedules work on its own evidence, not a calendar.',
    fieldX: 0.44, fieldY: 0.46,
    legacyRatePerSec: 1.1, smartRatePerSec: 0.07, unit: 'unplanned interventions',
  },
  {
    id: 'home-automation',
    name: 'Home Automation',
    stat: '22–28% energy savings',
    source: 'Springer 2025',
    sentence: 'Occupancy-aware systems that stop paying for comfort no one is using.',
    fieldX: 0.16, fieldY: 0.55,
    legacyRatePerSec: 1.8, smartRatePerSec: 0.13, unit: 'kWh wasted',
  },
]

/** The unlabelled 11th discovery node — shown when no domain matches */
export const DOMAIN_11 = {
  id: 'discovery',
  fieldX: 0.91,
  fieldY: 0.72,
  sentence: "Your domain isn't here? Doesn't matter. We diagnose the inefficiency, then build the instrument.",
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/data/domain-provenance.test.ts`
Expected: All 5 tests pass.

- [ ] **Step 4: Commit**

```bash
git add data/domain-provenance.ts tests/data/domain-provenance.test.ts
git commit -m "feat: add domain-provenance data (ship-blocker)"
```

---

## Task 3: Impact Metrics Data Layer

**Files:**
- Create: `data/impact-metrics.ts`
- Create: `tests/data/impact-metrics.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/data/impact-metrics.test.ts
import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'

describe('IMPACT_METRICS', () => {
  it('has at least 5 entries', () => {
    expect(IMPACT_METRICS.length).toBeGreaterThanOrEqual(5)
  })

  it('every metric has label, value, source', () => {
    for (const m of IMPACT_METRICS) {
      expect(m.label).toBeTruthy()
      expect(m.value).toBeTruthy()
      expect(m.source).toBeTruthy()
    }
  })
})

describe('PARTNERS', () => {
  it('includes the 5 named partners', () => {
    const names = PARTNERS.map(p => p.name)
    for (const expected of ['HPE', 'Intel', 'Bosch', 'Schneider', 'MathWorks']) {
      expect(names).toContain(expected)
    }
  })
})
```

Run: `npm test tests/data/impact-metrics.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement**

```typescript
// data/impact-metrics.ts

export interface ImpactMetric {
  label: string
  value: string
  source: string
}

export interface Partner {
  name: string
}

export const IMPACT_METRICS: ImpactMetric[] = [
  { label: 'Startups selected',    value: '52',        source: 'KPI review Apr 2026' },
  { label: 'Jobs created',         value: '336',       source: 'KPI review Apr 2026' },
  { label: 'Revenue generated',    value: '₹10.35 Cr', source: 'KPI review Apr 2026' },
  { label: 'Portfolio valuation',  value: '₹230 Cr',   source: 'KPI review Apr 2026 — combined founder-reported, FY 2025–26' },
  { label: 'Patents filed',        value: '23',        source: 'KPI review Apr 2026' },
  { label: 'Products & services',  value: '70',        source: 'KPI review Apr 2026' },
  { label: 'Prototypes developed', value: '127',       source: 'KPI review Apr 2026' },
  { label: 'Partners',             value: '13',        source: 'KPI review Apr 2026' },
  { label: 'Fund raised',          value: '₹5.60 Cr',  source: 'KPI review Apr 2026' },
]

export const PARTNERS: Partner[] = [
  { name: 'HPE' },
  { name: 'Intel' },
  { name: 'Bosch' },
  { name: 'Schneider' },
  { name: 'MathWorks' },
]
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/data/impact-metrics.test.ts`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add data/impact-metrics.ts tests/data/impact-metrics.test.ts
git commit -m "feat: add impact-metrics data"
```

---

## Task 4: Counter System (Pure Logic)

**Files:**
- Create: `components/field/counters.ts`
- Create: `tests/field/counters.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/field/counters.test.ts
import { createCounter, tickCounter, formatCounterValue } from '@/components/field/counters'
import { DOMAINS } from '@/data/domain-provenance'

const mfg = DOMAINS.find(d => d.id === 'smart-manufacturing')!

describe('createCounter', () => {
  it('initializes with zero accruals', () => {
    const c = createCounter(mfg)
    expect(c.legacyAccrued).toBe(0)
    expect(c.smartAccrued).toBe(0)
  })

  it('copies rates and unit from domain', () => {
    const c = createCounter(mfg)
    expect(c.legacyRatePerSec).toBe(mfg.legacyRatePerSec)
    expect(c.smartRatePerSec).toBe(mfg.smartRatePerSec)
    expect(c.unit).toBe(mfg.unit)
  })
})

describe('tickCounter', () => {
  it('accrues legacy faster than smart', () => {
    const after = tickCounter(createCounter(mfg), 1.0)
    expect(after.legacyAccrued).toBeGreaterThan(after.smartAccrued)
  })

  it('is pure — does not mutate input', () => {
    const c = createCounter(mfg)
    tickCounter(c, 1.0)
    expect(c.legacyAccrued).toBe(0)
  })

  it('accumulates over two ticks', () => {
    const c1 = tickCounter(createCounter(mfg), 1.0)
    const c2 = tickCounter(c1, 1.0)
    expect(c2.legacyAccrued).toBeCloseTo(mfg.legacyRatePerSec * 2, 5)
  })
})

describe('formatCounterValue', () => {
  it('shows 1 decimal for values under 100', () => {
    expect(formatCounterValue(12.345)).toBe('12.3')
  })

  it('rounds to integer for values >= 100', () => {
    expect(formatCounterValue(150.7)).toBe('151')
  })
})
```

Run: `npm test tests/field/counters.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement counters.ts**

```typescript
// components/field/counters.ts
import type { DomainDef } from '@/data/domain-provenance'

export interface DomainCounter {
  legacyAccrued: number
  smartAccrued: number
  legacyRatePerSec: number
  smartRatePerSec: number
  unit: string
}

export function createCounter(domain: DomainDef): DomainCounter {
  return {
    legacyAccrued: 0,
    smartAccrued: 0,
    legacyRatePerSec: domain.legacyRatePerSec,
    smartRatePerSec: domain.smartRatePerSec,
    unit: domain.unit,
  }
}

/** Pure — returns new counter, does not mutate input */
export function tickCounter(counter: DomainCounter, dtSeconds: number): DomainCounter {
  return {
    ...counter,
    legacyAccrued: counter.legacyAccrued + counter.legacyRatePerSec * dtSeconds,
    smartAccrued:  counter.smartAccrued  + counter.smartRatePerSec  * dtSeconds,
  }
}

export function formatCounterValue(value: number): string {
  return value >= 100 ? Math.round(value).toString() : value.toFixed(1)
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/field/counters.test.ts`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add components/field/counters.ts tests/field/counters.test.ts
git commit -m "feat: add domain counter pure logic"
```

---

## Task 5: Particle System (Pure Logic)

**Files:**
- Create: `components/field/particles.ts`
- Create: `tests/field/particles.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/field/particles.test.ts
import { createParticles, tickDrift, computeRevealLuminance, Particle } from '@/components/field/particles'

describe('createParticles', () => {
  it('creates the requested count', () => {
    expect(createParticles(100, 1920, 1080)).toHaveLength(100)
  })

  it('all particles start within bounds', () => {
    for (const p of createParticles(50, 800, 600)) {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThanOrEqual(800)
      expect(p.y).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThanOrEqual(600)
    }
  })

  it('homeX/Y match initial x/y', () => {
    for (const p of createParticles(10, 500, 500)) {
      expect(p.homeX).toBe(p.x)
      expect(p.homeY).toBe(p.y)
    }
  })
})

describe('tickDrift', () => {
  it('mutates particles in place', () => {
    const ps = createParticles(5, 800, 600)
    const ref = ps[0]
    tickDrift(ps, 1.0, 800, 600)
    expect(ps[0]).toBe(ref)
  })

  it('moves at least some particles', () => {
    const ps = createParticles(20, 800, 600)
    const before = ps.map(p => ({ x: p.x, y: p.y }))
    tickDrift(ps, 1.0, 800, 600)
    expect(ps.some((p, i) => p.x !== before[i].x || p.y !== before[i].y)).toBe(true)
  })
})

describe('computeRevealLuminance', () => {
  it('returns 1.0 for particle at cursor center', () => {
    const p: Particle = { x: 100, y: 100, homeX: 100, homeY: 100, vx: 0, vy: 0, baseLum: 0.15, noiseOffset: 0 }
    expect(computeRevealLuminance(p, 100, 100, 180)).toBe(1.0)
  })

  it('returns baseLum for particle outside radius', () => {
    const p: Particle = { x: 0, y: 0, homeX: 0, homeY: 0, vx: 0, vy: 0, baseLum: 0.15, noiseOffset: 0 }
    expect(computeRevealLuminance(p, 900, 900, 180)).toBeCloseTo(0.15, 5)
  })
})
```

Run: `npm test tests/field/particles.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement particles.ts**

```typescript
// components/field/particles.ts

export interface Particle {
  x: number; y: number
  homeX: number; homeY: number
  vx: number; vy: number
  baseLum: number
  noiseOffset: number
}

export function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => {
    const x = Math.random() * w
    const y = Math.random() * h
    return { x, y, homeX: x, homeY: y, vx: 0, vy: 0,
             baseLum: 0.08 + Math.random() * 0.12,
             noiseOffset: Math.random() * 1000 }
  })
}

function valueNoise(seed: number): number {
  const s = Math.sin(seed * 127.1) * 43758.5453
  return s - Math.floor(s)
}

/** Mutates in place — one frame of perlin-style drift */
export function tickDrift(particles: Particle[], t: number, w: number, h: number, speed = 0.18): void {
  for (const p of particles) {
    const nx = valueNoise(p.noiseOffset + t * speed) - 0.5
    const ny = valueNoise(p.noiseOffset * 1.7 + t * speed) - 0.5
    p.vx = p.vx * 0.88 + nx * 0.5
    p.vy = p.vy * 0.88 + ny * 0.5
    p.x += p.vx; p.y += p.vy
    if (p.x < 0) p.x += w; if (p.x > w) p.x -= w
    if (p.y < 0) p.y += h; if (p.y > h) p.y -= h
  }
}

/** Luminance for a particle given cursor reveal lens. 1.0 at center, baseLum outside. */
export function computeRevealLuminance(p: Particle, cx: number, cy: number, radius: number): number {
  const dx = p.x - cx, dy = p.y - cy
  const distSq = dx * dx + dy * dy
  if (distSq >= radius * radius) return p.baseLum
  const t = 1 - distSq / (radius * radius)
  const smooth = t * t * (3 - 2 * t) // smoothstep
  return p.baseLum + (1 - p.baseLum) * smooth
}

/** Spring particles toward targets. Mutates in place. */
export function springToTargets(
  particles: Particle[],
  targets: Array<{ x: number; y: number }>,
  stiffness = 0.06,
  damping = 0.82
): void {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const t = targets[i % targets.length]
    p.vx = p.vx * damping + (t.x - p.x) * stiffness
    p.vy = p.vy * damping + (t.y - p.y) * stiffness
    p.x += p.vx; p.y += p.vy
  }
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/field/particles.test.ts`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add components/field/particles.ts tests/field/particles.test.ts
git commit -m "feat: add particle system pure logic"
```

---

## Task 6: Schematic Engine

**Files:**
- Create: `components/field/schematics.ts`

Canvas 2D draw functions cannot be meaningfully unit-tested. Implement, verify TypeScript, commit.

- [ ] **Step 1: Implement schematics.ts**

```typescript
// components/field/schematics.ts
// cx, cy = canvas pixel coordinates of the domain node center

export interface SchematicFns {
  pathology: (ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) => void
  repair: (ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) => void
}

function gearPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  const teeth = 8, r = 18, ri = 12
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.7)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2 + t * 0.4
    const a1 = a0 + Math.PI / teeth
    const broken = i === 3
    const jitter = broken ? Math.sin(t * 4.2) * 2.5 : 0
    const outerR = broken ? ri + jitter : r
    ctx.lineTo(Math.cos(a0) * ri + cx, Math.sin(a0) * ri + cy)
    ctx.lineTo(Math.cos(a0) * outerR + cx, Math.sin(a0) * outerR + cy)
    ctx.lineTo(Math.cos(a1) * outerR + cx, Math.sin(a1) * outerR + cy)
    ctx.lineTo(Math.cos(a1) * ri + cx, Math.sin(a1) * ri + cy)
  }
  ctx.closePath(); ctx.stroke(); ctx.restore()
}

function gearRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  const teeth = 8, r = 18, ri = 12
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.5 + progress * 0.5})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 12; ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2 + t * 0.4
    const a1 = a0 + Math.PI / teeth
    ctx.lineTo(Math.cos(a0) * ri + cx, Math.sin(a0) * ri + cy)
    ctx.lineTo(Math.cos(a0) * r + cx, Math.sin(a0) * r + cy)
    ctx.lineTo(Math.cos(a1) * r + cx, Math.sin(a1) * r + cy)
    ctx.lineTo(Math.cos(a1) * ri + cx, Math.sin(a1) * ri + cy)
  }
  ctx.closePath(); ctx.stroke(); ctx.restore()
}

function pipePathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.6)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy); ctx.stroke()
  const eddyR = 6 + Math.sin(t * 3) * 3
  ctx.beginPath(); ctx.arc(cx, cy, eddyR, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(245,100,40,0.5)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore()
}

function pipeRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.4 + progress * 0.6})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 10; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy); ctx.stroke()
  const ax = cx - 20 + progress * 40
  ctx.beginPath(); ctx.moveTo(ax, cy - 4); ctx.lineTo(ax + 6, cy); ctx.lineTo(ax, cy + 4)
  ctx.strokeStyle = `rgba(46,230,255,${progress})`; ctx.lineWidth = 1; ctx.stroke(); ctx.restore()
}

function circuitPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.65)'; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - 10); ctx.lineTo(cx - 8, cy - 10)
  ctx.lineTo(cx - 8, cy + 5); ctx.lineTo(cx + 8, cy + 5)
  ctx.moveTo(cx + 12, cy + 5); ctx.lineTo(cx + 20, cy + 5)
  ctx.lineTo(cx + 20, cy - 10); ctx.stroke()
  if (Math.sin(t * 8) > 0.5) {
    ctx.fillStyle = 'rgba(255,120,40,0.8)'
    ctx.beginPath(); ctx.arc(cx + 10, cy + 5, 2, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function circuitRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.5 + progress * 0.5})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 8; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - 10); ctx.lineTo(cx - 8, cy - 10)
  ctx.lineTo(cx - 8, cy + 5); ctx.lineTo(cx + 20, cy + 5)
  ctx.lineTo(cx + 20, cy - 10); ctx.stroke(); ctx.restore()
}

function genericPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save(); ctx.strokeStyle = 'rgba(245,156,58,0.6)'; ctx.lineWidth = 1
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const r = 14 + Math.sin(t * 3 + i) * 3
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()
}

function genericRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.4 + progress * 0.6})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 10; ctx.lineWidth = 1
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 14, cy + Math.sin(a) * 14, 2, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()
}

export const SCHEMATICS: Record<string, SchematicFns> = {
  'smart-manufacturing': { pathology: gearPathology,    repair: gearRepair    },
  'smart-water':         { pathology: pipePathology,    repair: pipeRepair    },
  'home-automation':     { pathology: circuitPathology, repair: circuitRepair },
  'smart-energy':        { pathology: genericPathology, repair: genericRepair },
  'smart-farming':       { pathology: genericPathology, repair: genericRepair },
  'connected-transport': { pathology: genericPathology, repair: genericRepair },
  'smart-healthcare':    { pathology: genericPathology, repair: genericRepair },
  'weather-monitoring':  { pathology: genericPathology, repair: genericRepair },
  'smart-security':      { pathology: genericPathology, repair: genericRepair },
  'asset-monitoring':    { pathology: genericPathology, repair: genericRepair },
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/field/schematics.ts
git commit -m "feat: add parametric schematic draw functions (3 bespoke, 7 generic)"
```

---

## Task 7: FieldProvider Context

**Files:**
- Create: `components/field/FieldProvider.tsx`
- Create: `tests/field/FieldProvider.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/field/FieldProvider.test.tsx
import { render, screen, act } from '@testing-library/react'
import { FieldProvider, useField } from '@/components/field/FieldProvider'

function Consumer() {
  const { resolvedDomains, resolveDomain, unrevealedCount } = useField()
  return (
    <div>
      <span data-testid="count">{resolvedDomains.size}</span>
      <span data-testid="unrevealed">{unrevealedCount}</span>
      <button onClick={() => resolveDomain('smart-energy')}>resolve</button>
    </div>
  )
}

describe('FieldProvider', () => {
  it('starts with zero resolved domains', () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('unrevealedCount starts at 10', () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    expect(screen.getByTestId('unrevealed').textContent).toBe('10')
  })

  it('resolveDomain adds to resolvedDomains', async () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    await act(async () => screen.getByRole('button').click())
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('unrevealedCount decreases after resolve', async () => {
    render(<FieldProvider><Consumer /></FieldProvider>)
    await act(async () => screen.getByRole('button').click())
    expect(screen.getByTestId('unrevealed').textContent).toBe('9')
  })

  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Consumer />)).toThrow()
    spy.mockRestore()
  })
})
```

Run: `npm test tests/field/FieldProvider.test.tsx`
Expected: FAIL

- [ ] **Step 2: Implement FieldProvider.tsx**

```typescript
// components/field/FieldProvider.tsx
'use client'

import {
  createContext, useCallback, useContext,
  useEffect, useMemo, useState,
} from 'react'
import { DOMAINS } from '@/data/domain-provenance'

export interface PointerState {
  x: number
  y: number
  holding: boolean
}

export interface FieldContextValue {
  scrollProgress: number
  resolvedDomains: Set<string>
  activeDomainId: string | null
  pointer: PointerState
  prefersReducedMotion: boolean
  unrevealedCount: number
  resolveDomain: (id: string) => void
  setActiveDomain: (id: string | null) => void
  setPointer: (p: Partial<PointerState>) => void
}

const FieldContext = createContext<FieldContextValue | null>(null)

export function useField(): FieldContextValue {
  const ctx = useContext(FieldContext)
  if (!ctx) throw new Error('useField must be used within FieldProvider')
  return ctx
}

export function FieldProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [resolvedDomains, setResolvedDomains] = useState<Set<string>>(new Set())
  const [activeDomainId, setActiveDomain] = useState<string | null>(null)
  const [pointer, setPointerState] = useState<PointerState>({ x: -999, y: -999, holding: false })

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const resolveDomain = useCallback((id: string) => {
    setResolvedDomains(prev => new Set([...prev, id]))
  }, [])

  const setPointer = useCallback((p: Partial<PointerState>) => {
    setPointerState(prev => ({ ...prev, ...p }))
  }, [])

  const unrevealedCount = useMemo(
    () => DOMAINS.filter(d => !resolvedDomains.has(d.id)).length,
    [resolvedDomains]
  )

  const value = useMemo<FieldContextValue>(
    () => ({
      scrollProgress, resolvedDomains, activeDomainId,
      pointer, prefersReducedMotion, unrevealedCount,
      resolveDomain, setActiveDomain, setPointer,
    }),
    [scrollProgress, resolvedDomains, activeDomainId, pointer,
     prefersReducedMotion, unrevealedCount, resolveDomain, setPointer]
  )

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/field/FieldProvider.test.tsx`
Expected: All 5 pass.

- [ ] **Step 4: Commit**

```bash
git add components/field/FieldProvider.tsx tests/field/FieldProvider.test.tsx
git commit -m "feat: add FieldProvider context"
```

---

## Task 8: FieldCanvas

**Files:**
- Create: `components/field/FieldCanvas.tsx`

- [ ] **Step 1: Implement FieldCanvas.tsx**

```typescript
// components/field/FieldCanvas.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useField } from './FieldProvider'
import { DOMAINS, DOMAIN_11 } from '@/data/domain-provenance'
import { createParticles, tickDrift, computeRevealLuminance } from './particles'
import { createCounter, tickCounter, formatCounterValue } from './counters'
import { SCHEMATICS } from './schematics'
import type { Particle } from './particles'
import type { DomainCounter } from './counters'

const PARTICLE_COUNT = 900
const REVEAL_RADIUS = 220

export function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    pointer, resolvedDomains, resolveDomain,
    setActiveDomain, prefersReducedMotion,
  } = useField()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let particles: Particle[] = []
    const counters: Record<string, DomainCounter> = {}
    let t = 0, lastTime = 0, frame = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.scale(dpr, dpr)
      particles = createParticles(PARTICLE_COUNT, W, H)
    }

    resize()
    window.addEventListener('resize', resize)

    for (const d of DOMAINS) counters[d.id] = createCounter(d)

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now; t += dt

      ctx.fillStyle = '#060b18'
      ctx.fillRect(0, 0, W, H)

      if (prefersReducedMotion) {
        drawReducedMotion(ctx, W, H)
        return
      }

      tickDrift(particles, t, W, H)
      for (const [id] of Object.entries(counters)) {
        counters[id] = tickCounter(counters[id], dt)
      }

      // Particles
      for (const p of particles) {
        const lum = computeRevealLuminance(p, pointer.x, pointer.y, REVEAL_RADIUS)
        ctx.fillStyle = `rgba(183,207,232,${lum})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1 + lum * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Domains
      let foundActive = false
      for (const d of DOMAINS) {
        const nx = d.fieldX * W, ny = d.fieldY * H
        const dx = pointer.x - nx, dy = pointer.y - ny
        const inLens = dx * dx + dy * dy < REVEAL_RADIUS * REVEAL_RADIUS
        const isResolved = resolvedDomains.has(d.id)

        if (inLens) {
          foundActive = true
          setActiveDomain(d.id)
          const schema = SCHEMATICS[d.id]
          if (schema) {
            isResolved
              ? schema.repair(ctx, t, 1, nx, ny)
              : schema.pathology(ctx, t, nx, ny)
          }
          drawCounter(ctx, counters[d.id], nx, ny, isResolved)
          ctx.save()
          ctx.shadowBlur = 20
          ctx.shadowColor = isResolved ? '#2EE6FF' : '#F59C3A'
          ctx.fillStyle = isResolved ? '#2EE6FF' : '#F59C3A'
          ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2); ctx.fill()
          ctx.restore()
        } else if (isResolved) {
          ctx.save(); ctx.fillStyle = 'rgba(46,230,255,0.45)'
          ctx.shadowBlur = 6; ctx.shadowColor = '#2EE6FF'
          ctx.beginPath(); ctx.arc(nx, ny, 3, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        } else {
          ctx.save(); ctx.fillStyle = 'rgba(14,45,122,0.35)'
          ctx.beginPath(); ctx.arc(nx, ny, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore()
        }
      }
      if (!foundActive) setActiveDomain(null)

      // Discovery node 11
      {
        const nx = DOMAIN_11.fieldX * W, ny = DOMAIN_11.fieldY * H
        const dx = pointer.x - nx, dy = pointer.y - ny
        if (dx * dx + dy * dy < REVEAL_RADIUS * REVEAL_RADIUS) {
          ctx.save(); ctx.globalAlpha = 0.65; ctx.fillStyle = '#B7CFE8'
          ctx.font = '11px Courier New'
          ctx.fillText(DOMAIN_11.sentence, Math.min(nx + 12, W - 340), ny - 8)
          ctx.restore()
        }
      }
    }

    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [pointer, resolvedDomains, resolveDomain, setActiveDomain, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

function drawCounter(
  ctx: CanvasRenderingContext2D,
  counter: DomainCounter,
  nx: number, ny: number,
  isResolved: boolean
) {
  ctx.save(); ctx.font = '10px Courier New'
  if (!isResolved) {
    ctx.fillStyle = 'rgba(245,156,58,0.9)'
    ctx.fillText(`Legacy: −${formatCounterValue(counter.legacyAccrued)} ${counter.unit} ▼`, nx + 16, ny + 40)
    ctx.fillStyle = 'rgba(0,164,228,0.9)'
    ctx.fillText(`Smart: ${formatCounterValue(counter.smartAccrued)} ▲`, nx + 16, ny + 56)
  } else {
    ctx.fillStyle = 'rgba(46,230,255,0.9)'
    const ratio = counter.smartAccrued > 0
      ? Math.round(counter.legacyAccrued / counter.smartAccrued)
      : Math.round(counter.legacyRatePerSec / counter.smartRatePerSec)
    ctx.fillText(`${ratio}× less loss with smart systems`, nx + 16, ny + 40)
  }
  ctx.restore()
}

function drawReducedMotion(ctx: CanvasRenderingContext2D, W: number, H: number) {
  for (const d of DOMAINS) {
    const nx = d.fieldX * W, ny = d.fieldY * H
    ctx.save()
    ctx.fillStyle = 'rgba(0,164,228,0.75)'
    ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#F7F4ED'; ctx.font = '11px Courier New'
    ctx.fillText(d.name, nx + 10, ny - 4)
    ctx.fillStyle = '#2EE6FF'; ctx.font = '10px Courier New'
    ctx.fillText(d.stat, nx + 10, ny + 10)
    ctx.restore()
  }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/field/FieldCanvas.tsx
git commit -m "feat: add FieldCanvas single RAF loop"
```

---

## Task 9: Wire into Layout

**Files:**
- Modify: `app/(site)/layout.tsx`

- [ ] **Step 1: Check Next.js 16 layout conventions**

```bash
type "node_modules\next\dist\docs\app\building-your-application\routing\layouts-and-pages.md" 2>nul | head -60
```

- [ ] **Step 2: Update layout.tsx**

```typescript
// app/(site)/layout.tsx
import { LenisProvider } from '@/components/motion/LenisProvider'
import { FieldProvider } from '@/components/field/FieldProvider'
import { FieldCanvas } from '@/components/field/FieldCanvas'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <FieldProvider>
        <FieldCanvas />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-brand-navy/15 bg-bg-paper px-6 py-10 desktop:px-20">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/80">
                Centre of Excellence — Efficiency Augmentation
              </p>
              <p className="mt-1 font-body text-[13px] leading-[1.6] text-brand-navy/50">
                Funded by KITS · STPI · HPE. Software Technology Parks of India
                is an autonomous society under MeitY, Government of India.
              </p>
            </div>
            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60"
            >
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Apply', href: '/#apply' },
                { label: 'Contact', href: '/#instrument' },
                { label: 'STPI', href: 'https://www.stpi.in' },
                { label: 'RTI', href: 'https://www.stpi.in/rti.html' },
              ].map((l) => (
                <a
                  key={l.label} href={l.href}
                  className="transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </FieldProvider>
    </LenisProvider>
  )
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: Succeeds.

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/layout.tsx"
git commit -m "feat: wire FieldProvider + FieldCanvas into site layout"
```

---

## Task 10: TheDiagnosis (Section 1)

**Files:**
- Create: `components/spreads/TheDiagnosis.tsx`
- Create: `tests/spreads/TheDiagnosis.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/spreads/TheDiagnosis.test.tsx
import { render, screen } from '@testing-library/react'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'
import { FieldProvider } from '@/components/field/FieldProvider'

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheDiagnosis', () => {
  it('renders H1 for SEO', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('CTA links to #apply', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByRole('link', { name: /show us where it breaks/i }))
      .toHaveAttribute('href', '#apply')
  })

  it('renders first copy line', () => {
    render(<TheDiagnosis />, { wrapper: W })
    expect(screen.getByText(/your infrastructure is already talking/i)).toBeInTheDocument()
  })
})
```

Run: `npm test tests/spreads/TheDiagnosis.test.tsx`
Expected: FAIL

- [ ] **Step 2: Implement TheDiagnosis.tsx**

```typescript
// components/spreads/TheDiagnosis.tsx
'use client'

import { useEffect, useState } from 'react'
import { useField } from '@/components/field/FieldProvider'

const COPY = [
  'Your infrastructure is already talking.',
  "Most systems can't hear it.",
  'The data was always there. Legacy was blind to it.',
]

export function TheDiagnosis() {
  const { setPointer, resolvedDomains, unrevealedCount } = useField()
  const [lines, setLines] = useState(1)

  useEffect(() => {
    const revealed = 10 - unrevealedCount
    if (revealed >= 2) setLines(3)
    else if (revealed >= 1) setLines(2)
  }, [unrevealedCount])

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [setPointer])

  const ctaActive = resolvedDomains.size >= 2

  return (
    <section
      id="diagnosis"
      aria-label="The Diagnosis — interactive infrastructure diagnostic"
      className="relative flex h-dvh w-full flex-col items-start justify-end p-8 tablet:p-16"
    >
      <h1 className="sr-only">
        Centre of Excellence on Efficiency Augmentation — AI diagnostic intelligence for infrastructure
      </h1>

      <div className="mb-8 max-w-xl space-y-3" aria-live="polite">
        {COPY.slice(0, lines).map((line, i) => (
          <p key={i} className="font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
            {line}
          </p>
        ))}
      </div>

      <a
        href="#apply"
        className={`font-mono text-[13px] uppercase tracking-[0.14em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean ${
          ctaActive ? 'text-electric-spark underline underline-offset-4' : 'text-brand-ice/50'
        }`}
        aria-label="Show us where your infrastructure breaks — apply to CoE-EA"
      >
        Show us where it breaks →
      </a>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-navy/40" aria-hidden="true">
        See the work ↓
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/spreads/TheDiagnosis.test.tsx`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add components/spreads/TheDiagnosis.tsx tests/spreads/TheDiagnosis.test.tsx
git commit -m "feat: add TheDiagnosis hero section"
```

---

## Task 11: TheResolve (Section 2)

**Files:**
- Create: `components/spreads/TheResolve.tsx`
- Create: `tests/spreads/TheResolve.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/spreads/TheResolve.test.tsx
import { render, screen } from '@testing-library/react'
import { TheResolve } from '@/components/spreads/TheResolve'
import { FieldProvider } from '@/components/field/FieldProvider'

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheResolve', () => {
  it('renders section with id="resolve"', () => {
    render(<TheResolve />, { wrapper: W })
    expect(document.getElementById('resolve')).toBeInTheDocument()
  })

  it('renders 10 domain names for screen readers', () => {
    render(<TheResolve />, { wrapper: W })
    const list = screen.getByRole('list', { name: /infrastructure domains/i })
    expect(list.querySelectorAll('li')).toHaveLength(10)
  })

  it('each domain has a keyboard-accessible resolve button', () => {
    render(<TheResolve />, { wrapper: W })
    expect(screen.getAllByRole('button', { name: /resolve/i })).toHaveLength(10)
  })
})
```

Run: `npm test tests/spreads/TheResolve.test.tsx`
Expected: FAIL

- [ ] **Step 2: Implement TheResolve.tsx**

```typescript
// components/spreads/TheResolve.tsx
'use client'

import { useCallback, useRef } from 'react'
import { useField } from '@/components/field/FieldProvider'
import { DOMAINS } from '@/data/domain-provenance'

const HOLD_MS = 700

export function TheResolve() {
  const { resolvedDomains, resolveDomain } = useField()
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const startHold = useCallback((id: string) => {
    timers.current[id] = setTimeout(() => resolveDomain(id), HOLD_MS)
  }, [resolveDomain])

  const cancelHold = useCallback((id: string) => {
    clearTimeout(timers.current[id])
  }, [])

  return (
    <section
      id="resolve"
      aria-label="The Resolve — hold to repair each infrastructure domain"
      className="relative min-h-dvh w-full px-8 py-24 tablet:px-16"
    >
      {/* Keyboard-navigable domain list */}
      <ul aria-label="Infrastructure domains — hold or press Enter to resolve" className="sr-only">
        {DOMAINS.map(d => (
          <li key={d.id}>
            <button
              aria-label={`Resolve ${d.name}`}
              aria-pressed={resolvedDomains.has(d.id)}
              onPointerDown={() => startHold(d.id)}
              onPointerUp={() => cancelHold(d.id)}
              onPointerLeave={() => cancelHold(d.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') resolveDomain(d.id) }}
            >
              {resolvedDomains.has(d.id)
                ? `${d.name} — ${d.stat} — ${d.source}`
                : `Resolve ${d.name}`}
            </button>
          </li>
        ))}
      </ul>

      <p className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-navy/35" aria-hidden="true">
        Hold to resolve · Tab to navigate · Enter to repair
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/spreads/TheResolve.test.tsx`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add components/spreads/TheResolve.tsx tests/spreads/TheResolve.test.tsx
git commit -m "feat: add TheResolve section with hold-to-resolve + keyboard fallback"
```

---

## Task 12: TheLedger (Section 3)

**Files:**
- Create: `components/spreads/TheLedger.tsx`

- [ ] **Step 1: Implement TheLedger.tsx**

```typescript
// components/spreads/TheLedger.tsx
import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'

export function TheLedger() {
  return (
    <section
      id="ledger"
      aria-label="The Ledger — CoE-EA outcomes and partnerships"
      className="relative min-h-dvh w-full px-8 py-24 tablet:px-16"
    >
      <header className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          003 / 005
        </span>
      </header>

      <div className="grid grid-cols-2 gap-8 tablet:grid-cols-3 desktop:grid-cols-4">
        {IMPACT_METRICS.map(m => (
          <div key={m.label} className="flex flex-col gap-1">
            <span
              className="font-display text-[2.8rem] font-light leading-none tracking-tight text-brand-cerulean"
              aria-label={`${m.label}: ${m.value}`}
            >
              {m.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-ice/70">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-20" aria-label="Partner organisations">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-navy/40">
          Partners
        </p>
        <ul className="flex flex-wrap gap-6" role="list">
          {PARTNERS.map(p => (
            <li key={p.name} className="font-mono text-[13px] tracking-[0.06em] text-brand-ice/60">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build check**

```bash
npm run build
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/spreads/TheLedger.tsx
git commit -m "feat: add TheLedger metrics section"
```

---

## Task 13: TheInstrument (Section 4)

**Files:**
- Create: `components/spreads/TheInstrument.tsx`

- [ ] **Step 1: Implement TheInstrument.tsx**

```typescript
// components/spreads/TheInstrument.tsx

export function TheInstrument() {
  return (
    <section
      id="instrument"
      aria-label="The Instrument — about the Centre of Excellence"
      className="relative flex min-h-dvh w-full flex-col justify-center px-8 py-24 tablet:px-16"
    >
      <div className="max-w-lg">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
          004 / 005
        </p>
        <h2 className="mb-6 font-display text-[2rem] font-light leading-[1.15] tracking-[-0.01em] text-brand-paper tablet:text-[2.8rem]">
          Centre of Excellence<br />on Efficiency Augmentation
        </h2>
        <p className="mb-4 font-body text-[15px] leading-[1.7] text-brand-ice/70">
          Funded by KITS, STPI, and HPE. Operated under the Software Technology
          Parks of India — an autonomous society under MeitY, Government of India.
        </p>
        <p className="font-body text-[15px] leading-[1.7] text-brand-ice/50">
          We instrument, diagnose, and augment infrastructure across ten domains.
          The work does not end when the instrument is built — it ends when the
          system no longer needs us.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/spreads/TheInstrument.tsx
git commit -m "feat: add TheInstrument identity section"
```

---

## Task 14: TheApplication (Section 5)

**Files:**
- Create: `components/spreads/TheApplication.tsx`
- Create: `tests/spreads/TheApplication.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/spreads/TheApplication.test.tsx
import { render, screen } from '@testing-library/react'
import { TheApplication } from '@/components/spreads/TheApplication'
import { FieldProvider } from '@/components/field/FieldProvider'

vi.mock('@/components/forms/apply/ApplyForm', () => ({
  ApplyForm: () => <form aria-label="Apply form" />,
}))

const W = ({ children }: { children: React.ReactNode }) => <FieldProvider>{children}</FieldProvider>

describe('TheApplication', () => {
  it('renders section with id="apply"', () => {
    render(<TheApplication />, { wrapper: W })
    expect(document.getElementById('apply')).toBeInTheDocument()
  })

  it('renders 5 benefit items', () => {
    render(<TheApplication />, { wrapper: W })
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('renders ApplyForm', () => {
    render(<TheApplication />, { wrapper: W })
    expect(screen.getByRole('form', { name: /apply form/i })).toBeInTheDocument()
  })
})
```

Run: `npm test tests/spreads/TheApplication.test.tsx`
Expected: FAIL

- [ ] **Step 2: Implement TheApplication.tsx**

```typescript
// components/spreads/TheApplication.tsx
'use client'

import { useField } from '@/components/field/FieldProvider'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'

const BENEFITS = [
  { value: '₹10L',     label: 'Non-dilutive seed grant',    detail: 'No equity taken. Get moving.' },
  { value: 'Hardware', label: 'Lab access',                 detail: 'IoT testbeds, instrumented bays, edge compute.' },
  { value: 'Mentors',  label: 'Domain practitioners',       detail: 'Industry specialists, not generalist advisors.' },
  { value: '50%',      label: 'Market support',             detail: 'Reimbursement on qualifying customer-development travel.' },
  { value: 'Network',  label: 'Partner ecosystem',          detail: 'HPE · Intel · Bosch · Schneider · MathWorks.' },
]

export function TheApplication() {
  const { resolvedDomains } = useField()

  return (
    <section
      id="apply"
      aria-label="Apply — Section 5"
      className="relative min-h-dvh w-full bg-bg-paper px-8 py-24 tablet:px-16"
    >
      <header className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          005 / 005
        </span>
        <h2 className="mt-4 font-display text-[2rem] font-light leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[2.6rem]">
          Apply to the next cohort.
        </h2>
        {resolvedDomains.size > 0 && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-cerulean">
            {resolvedDomains.size} domain{resolvedDomains.size > 1 ? 's' : ''} diagnosed
          </p>
        )}
      </header>

      <ul
        aria-label="What you get"
        className="mb-16 grid grid-cols-1 gap-6 tablet:grid-cols-3 desktop:grid-cols-5"
      >
        {BENEFITS.map(b => (
          <li key={b.label} className="flex flex-col gap-1">
            <span className="font-display text-[1.8rem] font-light leading-none text-brand-navy">
              {b.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-navy/70">
              {b.label}
            </span>
            <span className="font-body text-[13px] leading-[1.5] text-brand-navy/50">
              {b.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="max-w-2xl">
        <ApplyForm />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Run tests**

Run: `npm test tests/spreads/TheApplication.test.tsx`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add components/spreads/TheApplication.tsx tests/spreads/TheApplication.test.tsx
git commit -m "feat: add TheApplication section"
```

---

## Task 15: Page Composition

**Files:**
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```typescript
// app/(site)/page.tsx
import { TheDiagnosis }   from '@/components/spreads/TheDiagnosis'
import { TheResolve }     from '@/components/spreads/TheResolve'
import { TheLedger }      from '@/components/spreads/TheLedger'
import { TheInstrument }  from '@/components/spreads/TheInstrument'
import { TheApplication } from '@/components/spreads/TheApplication'

export default function HomePage() {
  return (
    <>
      <TheDiagnosis />
      <TheResolve />
      <TheLedger />
      <TheInstrument />
      <TheApplication />
    </>
  )
}
```

- [ ] **Step 2: Full test suite**

```bash
npm test
```
Expected: All tests pass.

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: Succeeds.

- [ ] **Step 4: Start dev and manually verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- [ ] Dark canvas field visible behind the page
- [ ] Moving cursor illuminates domain nodes
- [ ] All 5 sections accessible by scrolling
- [ ] Apply form loads in Section 5

- [ ] **Step 5: Commit**

```bash
git add "app/(site)/page.tsx"
git commit -m "feat: compose 5 instrument sections in page.tsx"
```

---

## Task 16: Cleanup

**Files to delete:** all 7 retired spread components + video assets.

- [ ] **Step 1: Confirm no remaining imports**

```bash
npx tsc --noEmit 2>&1 | grep -i "hero\|Work\|Portfolio\|Impact\|Contact\|Cover\|Diorama"
```
Expected: No output (no references to deleted components).

- [ ] **Step 2: Remove retired spread components**

```bash
git rm components/spreads/Hero.tsx
git rm "components/spreads/hero/Cover.tsx"
git rm "components/spreads/hero/DioramaReveal.tsx"
git rm components/spreads/Work.tsx
git rm components/spreads/Portfolio.tsx
git rm components/spreads/Impact.tsx
git rm components/spreads/Contact.tsx
```

- [ ] **Step 3: Remove video assets**

```bash
git rm --ignore-unmatch public/hero/diorama-hero.mp4 public/hero/diorama-hero.webm public/hero/diorama-hero.jpg
```

- [ ] **Step 4: Final build + lint + tests**

```bash
npm run build && npm run lint && npm test
```
Expected: All clean.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: delete retired spreads and video assets

Removes Hero/Cover/DioramaReveal/Work/Portfolio/Impact/Contact
and the 3.4MB diorama video. Replaced by The Instrument (5 canvas-driven spreads)."
```

---

## Self-Review

### Spec coverage

| Requirement | Task |
|------------|------|
| One persistent FieldCanvas | 8, 9 |
| FieldProvider (scroll, glyphs, pointer) | 7 |
| Particle drift | 5 |
| 10 domain defs with real sourced stats | 2 |
| C3 entropy delta counters | 4 |
| Hold-to-resolve mechanic | 11, 14 |
| Parametric schematic draw fns | 6 |
| TheDiagnosis hero | 10 |
| TheResolve hold-to-resolve | 11 |
| TheLedger metrics + partners | 12 |
| TheInstrument identity | 13 |
| TheApplication benefits + form | 14 |
| Page composition | 15 |
| Cleanup deleted files | 16 |
| Glyph persistence: session only (no localStorage) | 7 |
| prefers-reduced-motion fallback | 8, 10 |
| DOMAIN_11 discovery node | 2, 8 |
| Impact metrics data | 3 |
| Delete 3.4MB video (LCP improvement) | 16 |
| Keyboard navigation for resolve + apply | 11, 14 |
| Accessibility (aria-hidden canvas, real DOM content) | 8, 10 |

### Type consistency

- `DomainDef` (Task 2) → imported by Tasks 4, 5, 7, 8, 10, 11
- `DomainCounter` (Task 4) → imported by Task 8
- `Particle` (Task 5) → imported by Task 8
- `SchematicFns` (Task 6) → imported by Task 8
- `FieldContextValue` (Task 7) → consumed by Tasks 10, 11, 14
- `DOMAIN_11` has no `stat`/`legacyRatePerSec` — Task 8 handles it separately without casting ✓

### No placeholders

All code blocks complete. No TBD/TODO/implement-later text. ✓
