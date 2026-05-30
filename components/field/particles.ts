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
