'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Events hero visual — Cube → Fourier harmonic ring.
 * Canvas fills the right-half visual column of DarkHero (440×440).
 */

const FACE = 52
const TRANSLATE = 26
const W = 440, H = 440
const CX = 220, CY = 220
const R = 155
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

      HARMONICS.forEach((r, i) => {
        const progress = Math.min(1, Math.max(0, (t - i * 0.2) / 0.5))
        if (progress === 0) return
        const alpha = (i === 0 ? 0.55 : Math.max(0, 0.2 - i * 0.025)) * progress
        ctx.beginPath()
        ctx.arc(CX, CY, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,164,228,${alpha})`
        ctx.lineWidth = i === 0 ? 1.5 : 0.75
        ctx.stroke()
        if (progress > 0.6) {
          const la = (progress - 0.6) / 0.4
          ctx.font = '8px "Space Mono", monospace'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(0,164,228,${la * (i === 0 ? 0.4 : 0.2)})`
          ctx.fillText(HARMONIC_LABELS[i], CX + r + 5, CY - 4)
        }
      })

      EVENTS.forEach((ev, i) => {
        const dotT = Math.min(1, Math.max(0, (t - 0.7 - i * 0.2) / 0.4))
        if (dotT === 0) return
        const x = CX + R * Math.cos(ev.angle)
        const y = CY + R * Math.sin(ev.angle)

        const glowR = 4 + (1 - dotT) * 12
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR + 8)
        grad.addColorStop(0, `rgba(${ev.amber ? '212,168,83' : '0,164,228'},${dotT * 0.4})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(x, y, glowR + 8, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        const pulse = 1 + 0.12 * Math.sin((t0Ref.current ? (performance.now() - t0Ref.current) / 1000 : t) * 2.5 + i)
        ctx.beginPath()
        ctx.arc(x, y, 3.5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = ev.amber ? `rgba(212,168,83,${dotT * 0.95})` : `rgba(0,164,228,${dotT * 0.9})`
        ctx.fill()

        if (dotT > 0.4) {
          const la = (dotT - 0.4) / 0.6
          const lx = CX + (R + 22) * Math.cos(ev.angle)
          const ly = CY + (R + 22) * Math.sin(ev.angle)
          const cosA = Math.cos(ev.angle)
          ctx.font = '9px "Space Mono", monospace'
          ctx.textBaseline = 'middle'
          ctx.textAlign = cosA > 0.15 ? 'left' : cosA < -0.15 ? 'right' : 'center'
          ctx.fillStyle = ev.amber ? `rgba(212,168,83,${la * 0.9})` : `rgba(183,207,232,${la * 0.7})`
          ev.label.forEach((line, li) => {
            ctx.fillText(line, lx, ly + li * 11 - (ev.label.length - 1) * 5.5)
          })
        }
      })

      if (t > 1.8) {
        const a = Math.min(1, (t - 1.8) / 0.6)
        ctx.font = '8px "Space Mono", monospace'
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
          transform: stage >= 1 ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(-16deg) rotateY(-10deg)',
        }}>
          <div style={face(`translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(180deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(-90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateX(90deg) translateZ(${TRANSLATE}px)`)} />
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
