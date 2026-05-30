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

  // Expose refs for RAF reads (stale-closure-safe)
  const pointerRef = useRef(pointer)
  const resolvedRef = useRef(resolvedDomains)
  useEffect(() => { pointerRef.current = pointer }, [pointer])
  useEffect(() => { resolvedRef.current = resolvedDomains }, [resolvedDomains])

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
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

      const ptr = pointerRef.current
      const resolved = resolvedRef.current

      tickDrift(particles, t, W, H)
      for (const id of Object.keys(counters)) {
        counters[id] = tickCounter(counters[id], dt)
      }

      for (const p of particles) {
        const lum = computeRevealLuminance(p, ptr.x, ptr.y, REVEAL_RADIUS)
        ctx.fillStyle = `rgba(183,207,232,${lum})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1 + lum * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      let foundActive = false
      for (const d of DOMAINS) {
        const nx = d.fieldX * W, ny = d.fieldY * H
        const dx = ptr.x - nx, dy = ptr.y - ny
        const inLens = dx * dx + dy * dy < REVEAL_RADIUS * REVEAL_RADIUS
        const isResolved = resolved.has(d.id)

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

      const nx11 = DOMAIN_11.fieldX * W, ny11 = DOMAIN_11.fieldY * H
      const dx11 = ptr.x - nx11, dy11 = ptr.y - ny11
      if (dx11 * dx11 + dy11 * dy11 < REVEAL_RADIUS * REVEAL_RADIUS) {
        ctx.save(); ctx.globalAlpha = 0.65; ctx.fillStyle = '#B7CFE8'
        ctx.font = '11px Courier New'
        ctx.fillText(DOMAIN_11.sentence, Math.min(nx11 + 12, W - 340), ny11 - 8)
        ctx.restore()
      }
    }

    if (!prefersReducedMotion) {
      frame = requestAnimationFrame(draw)
    } else {
      draw(0)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, setActiveDomain])

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
