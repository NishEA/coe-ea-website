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
