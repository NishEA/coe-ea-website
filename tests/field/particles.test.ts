import { createParticles, tickDrift, computeRevealLuminance, type Particle } from '@/components/field/particles'

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
