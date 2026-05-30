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
