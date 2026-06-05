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
  it('includes the named partners', () => {
    const names = PARTNERS.map(p => p.name)
    for (const expected of ['HPE', 'Intel', 'Bosch', 'Schneider', 'IEEE']) {
      expect(names).toContain(expected)
    }
  })

  it('has at least 6 partners', () => {
    expect(PARTNERS.length).toBeGreaterThanOrEqual(6)
  })
})
