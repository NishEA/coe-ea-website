'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Events hero visual — Cube → Fourier harmonic ring.
 *
 * Three-stage: (0) tilted cube → (1) container rotates face-on (600ms) →
 * (2) cube fades, canvas reveals a Fourier frequency decomposition (1200ms+).
 *
 * The visual: concentric circles of radii r₁ (fundamental), r₁/3, r₁/5,
 * r₁/7, r₁/9 (the odd harmonics of a square wave) materialise in sequence.
 * Four event labels appear on the main circle at 0°/90°/180°/270° — the
 * positions where the Fourier ring would intersect a square boundary.
 * Dots pulse gently once placed to signal the instrument is active.
 */

const FACE = 52
const TRANSLATE = 26
const W = 180, H = 180
const CX = 90, CY = 90
const R = 56
const EZ = 'cubic-bezier(0.4,0,0.2,1)'

const HARMONICS = [R, R / 3, R / 5, R / 7, R / 9]
const HARMONIC_LABELS = ['f₁', 'f₃', 'f₅', 'f₇', 'f₉']

const EVENTS = [
  { angle: -Math.PI / 2, label: ['HACKATHON'],           amber: false },
  { angle:  0,           label: ['IDEATHON'],            amber: false },
  { angle:  Math.PI / 2, label: ['WORKSHOP'],            amber: false },
  { angle:  Math.PI,     label: ['INDUSTRIAL', 'VISIT'], amber: true  },
]

export function TimelineMorph({ className = '' }: { className?: string }) {
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

    const drawFrame = (now: number) => {
      const t = skipAnim ? 99 : (now - t0Ref.current) / 1000

      ctx.clearRect(0, 0, W, H)

      // Harmonic rings — staggered fade-in, fundamental first
      HARMONICS.forEach((r, i) => {
        const progress = Math.min(1, Math.max(0, (t - i * 0.2) / 0.5))
        if (progress === 0) return
        const baseAlpha = i === 0 ? 0.6 : Math.max(0, 0.22 - i * 0.03)
        ctx.beginPath()
        ctx.arc(CX, CY, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,164,228,${baseAlpha * progress})`
        ctx.lineWidth = i === 0 ? 1.5 : 0.5
        ctx.stroke()

        if (progress > 0.6) {
          const la = (progress - 0.6) / 0.4
          ctx.font = '5.5px "Space Mono", monospace'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(0,164,228,${la * (i === 0 ? 0.45 : 0.25)})`
          ctx.fillText(HARMONIC_LABELS[i], CX + r + 3, CY - 3)
        }
      })

      // Event dots + labels on the main circle
      EVENTS.forEach((ev, i) => {
        const dotT = Math.min(1, Math.max(0, (t - 0.7 - i * 0.2) / 0.4))
        if (dotT === 0) return

        const x = CX + R * Math.cos(ev.angle)
        const y = CY + R * Math.sin(ev.angle)

        // Glow halo materialises inward
        const glowR = 3 + (1 - dotT) * 10
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR + 6)
        grad.addColorStop(0, `rgba(${ev.amber ? '212,168,83' : '0,164,228'},${dotT * 0.35})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(x, y, glowR + 6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Dot with gentle ongoing pulse
        const pulse = 1 + 0.12 * Math.sin(t * 2.5 + i)
        ctx.beginPath()
        ctx.arc(x, y, 2.5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = ev.amber
          ? `rgba(212,168,83,${dotT * 0.95})`
          : `rgba(0,164,228,${dotT * 0.9})`
        ctx.fill()

        // Labels appear after the dot settles
        if (dotT > 0.4) {
          const la = (dotT - 0.4) / 0.6
          const lx = CX + (R + 16) * Math.cos(ev.angle)
          const ly = CY + (R + 16) * Math.sin(ev.angle)
          const cosA = Math.cos(ev.angle)
          ctx.font = '6px "Space Mono", monospace'
          ctx.textBaseline = 'middle'
          ctx.textAlign = cosA > 0.15 ? 'left' : cosA < -0.15 ? 'right' : 'center'
          ctx.fillStyle = ev.amber
            ? `rgba(212,168,83,${la * 0.9})`
            : `rgba(183,207,232,${la * 0.65})`
          ev.label.forEach((line, li) => {
            ctx.fillText(line, lx, ly + li * 8 - (ev.label.length - 1) * 4)
          })
        }
      })

      // Centre annotation
      if (t > 1.6) {
        const a = Math.min(1, (t - 1.6) / 0.5)
        ctx.font = '5.5px "Space Mono", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(0,164,228,${a * 0.3})`
        ctx.fillText('square-wave decomp', CX, CY)
      }

      rafId = requestAnimationFrame(drawFrame)
    }

    rafId = requestAnimationFrame(drawFrame)
    return () => cancelAnimationFrame(rafId)
  }, [stage])

  const T = `all 1.2s ${EZ}`
  const face = (transform: string): React.CSSProperties => ({
    position: 'absolute',
    width: FACE, height: FACE,
    border: '1px solid rgba(0,164,228,0.4)',
    background: 'rgba(0,164,228,0.04)',
    transition: `opacity 0.3s ease-out, ${T}`,
    transform,
    opacity: stage >= 2 ? 0 : 1,
  })

  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: W, height: H, position: 'relative' }}>
        {/* CSS cube — centered, fades out at stage 2 */}
        <div style={{
          position: 'absolute',
          left: (W - FACE) / 2, top: (H - FACE) / 2,
          width: FACE, height: FACE,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-out',
          transform: stage >= 1 ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(-16deg) rotateY(-10deg)',
        }}>
          <div style={face(`translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(180deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(-90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateX(90deg) translateZ(${TRANSLATE}px)`)} />
        </div>

        {/* Fourier ring canvas — covers full W×H, fades in at stage 2 */}
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
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
