'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Portfolio hero visual — Cube → Concentric orbital rings.
 *
 * Five clean rings pulse gently around the CoE-EA hub.
 * No startup bodies, no trails, no initials.
 */

const FACE = 52
const TRANSLATE = 26
const W = 500, H = 480
const CX = 250, CY = 240
const EZ = 'cubic-bezier(0.4,0,0.2,1)'

// Five concentric rings: [semi-major radius, y-scale (isometric tilt), phase offset (seconds)]
const RINGS: [number, number, number][] = [
  [72,  0.38, 0.0],
  [108, 0.38, 0.7],
  [144, 0.38, 1.4],
  [180, 0.38, 2.1],
  [214, 0.38, 2.8],
]

export function PortfolioMorph({ className = '' }: { className?: string }) {
  const [stage, setStage] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const t0Ref = useRef(0)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setStage(2); return }
    const t1 = window.setTimeout(() => setStage(1), 600)
    const t2 = window.setTimeout(() => setStage(2), 1200)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (stage < 2) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const skipAnim =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    t0Ref.current = performance.now()
    let rafId: number

    const draw = (now: number) => {
      const elapsed = skipAnim ? 8 : (now - t0Ref.current) / 1000
      ctx.clearRect(0, 0, W, H)

      // Concentric pulsing rings
      RINGS.forEach(([r, ys, phaseOffset], i) => {
        // Fade ring in over first 2 s, staggered
        const appear = Math.min(1, Math.max(0, (elapsed - i * 0.2) / 0.8))
        if (appear <= 0) return

        // Pulse: opacity oscillates between 0.3 and 0.55, period ~3.5 s, offset per ring
        const pulse = skipAnim
          ? 0.42
          : 0.3 + 0.25 * (0.5 + 0.5 * Math.sin(((elapsed + phaseOffset) / 3.5) * Math.PI * 2))
        const alpha = appear * pulse

        ctx.save()
        ctx.translate(CX, CY)
        ctx.scale(1, ys)
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,164,228,${alpha.toFixed(3)})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()
      })

      // Hub glow + dot
      const hubGrow = Math.min(1, elapsed / 0.4)
      if (hubGrow > 0) {
        const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, 20 * hubGrow)
        grad.addColorStop(0, `rgba(212,168,83,${hubGrow * 0.35})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(CX, CY, 20 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(CX, CY, 5 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,168,83,${hubGrow * 0.95})`
        ctx.fill()

        // "CoE-EA" label (amber)
        const la = Math.min(1, Math.max(0, (elapsed - 0.5) / 0.4))
        if (la > 0) {
          ctx.font = '10px "Space Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = `rgba(212,168,83,${la * 0.9})`
          ctx.fillText('CoE-EA', CX, CY + 10)
        }

        // "STARTUPS" label (cerulean) below CoE-EA
        const lb = Math.min(1, Math.max(0, (elapsed - 0.9) / 0.5))
        if (lb > 0) {
          ctx.font = '7px "Space Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = `rgba(0,164,228,${lb * 0.9})`
          ctx.fillText('STARTUPS', CX, CY + 23)
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [stage])

  const T = `all 1.2s ${EZ}`
  const face = (transform: string): React.CSSProperties => ({
    position: 'absolute', width: FACE, height: FACE,
    border: '1px solid rgba(0,164,228,0.4)',
    background: 'rgba(0,164,228,0.04)',
    transition: `opacity 0.3s ease-out, ${T}`,
    transform, opacity: stage >= 2 ? 0 : 1,
  })

  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: W, height: H, position: 'relative' }}>
        <div style={{
          position: 'absolute', left: (W - FACE) / 2, top: (H - FACE) / 2,
          width: FACE, height: FACE,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-out',
          transform: stage >= 1 ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(-14deg) rotateY(-10deg)',
        }}>
          <div style={face(`rotateX(90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(180deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(-90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(90deg) translateZ(${TRANSLATE}px)`)} />
        </div>
        <canvas
          ref={canvasRef} width={W} height={H}
          style={{
            position: 'absolute', top: 0, left: 0,
            opacity: stage >= 2 ? 1 : 0,
            transition: 'opacity 0.4s ease-out 0.2s',
          }}
        />
      </div>
    </div>
  )
}
