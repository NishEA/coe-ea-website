'use client'

import { useEffect, useRef } from 'react'
import { useField } from './FieldProvider'
import { DOMAINS } from '@/data/domain-provenance'
import {
  createParticles, tickDrift,
  getDeviceTier, TIER_COUNTS, probeFrameTier,
} from './particles'
import type { Particle, DeviceTier } from './particles'

export function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { prefersReducedMotion, setCanvasReady } = useField()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) { setCanvasReady(false); return }
    const ctx = canvas.getContext('2d')
    if (!ctx) { setCanvasReady(false); return }

    setCanvasReady(true)

    let W = 0, H = 0
    let tier: DeviceTier = getDeviceTier()
    let particles: Particle[] = []
    let t = 0, lastTime = 0, frame = 0, frameCount = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.scale(dpr, dpr)
      particles = createParticles(TIER_COUNTS[tier], W, H)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      drawStatic(ctx, W, H)
      return () => window.removeEventListener('resize', resize)
    }

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      const frameMs = now - lastTime
      lastTime = now; t += dt; frameCount++

      if (frameCount % 60 === 0) {
        const newTier = probeFrameTier(frameMs, tier)
        if (newTier !== tier) {
          tier = newTier
          particles = createParticles(TIER_COUNTS[tier], W, H)
        }
      }

      frame = requestAnimationFrame(draw)

      ctx.clearRect(0, 0, W, H)
      tickDrift(particles, t, W, H)

      for (const p of particles) {
        ctx.fillStyle = `rgba(183,207,232,${p.baseLum})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const d of DOMAINS) {
        const nx = d.fieldX * W, ny = d.fieldY * H
        ctx.save()
        ctx.fillStyle = 'rgba(183,207,232,0.18)'
        ctx.beginPath()
        ctx.arc(nx, ny, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
      } else {
        lastTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    let idleId = 0
    const startLoop = () => { lastTime = performance.now(); frame = requestAnimationFrame(draw) }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if ('requestIdleCallback' in window) {
      idleId = w.requestIdleCallback(startLoop, { timeout: 1500 })
    } else {
      setTimeout(startLoop, 150)
    }

    return () => {
      cancelAnimationFrame(frame)
      if (idleId && 'cancelIdleCallback' in window) w.cancelIdleCallback(idleId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [prefersReducedMotion, setCanvasReady])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

function drawStatic(ctx: CanvasRenderingContext2D, W: number, H: number) {
  for (const d of DOMAINS) {
    const nx = d.fieldX * W, ny = d.fieldY * H
    ctx.save()
    ctx.fillStyle = 'rgba(183,207,232,0.18)'
    ctx.beginPath(); ctx.arc(nx, ny, 2, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }
}
