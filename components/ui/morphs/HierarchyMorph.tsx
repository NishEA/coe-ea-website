'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Governance hero visual — Cube → Lissajous governance traces.
 *
 * Three interlocking Lissajous curves, one per institutional partner:
 *   STPI (cerulean) — a:b = 3:2  — 4 lobes, implementing agency
 *   KITS (amber)    — a:b = 4:3  — 6 lobes, Karnataka grant authority
 *   HPE  (ice)      — a:b = 5:4  — 8 lobes, industry co-funder
 *
 * All three draw simultaneously as t sweeps 0→2π over ~2.5s.
 */

const FACE = 52
const TRANSLATE = 26
const W = 500, H = 420
const CX = 250, CY = 210
const AX = 210, AY = 175
const EZ = 'cubic-bezier(0.4,0,0.2,1)'
const STEPS = 600

const TRACES = [
  { fa: 3, fb: 2, delta: Math.PI / 2, label: 'STPI', r: 0,   g: 164, b: 228, lw: 1.5 },
  { fa: 4, fb: 3, delta: Math.PI / 4, label: 'KITS', r: 212, g: 168, b: 83,  lw: 1.2 },
  { fa: 5, fb: 4, delta: Math.PI / 6, label: 'HPE',  r: 183, g: 207, b: 232, lw: 1.0 },
]

export function HierarchyMorph({ className = '' }: { className?: string }) {
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

    // Precompute trace points once.
    const allPts = TRACES.map(tr => {
      const pts: [number, number][] = []
      for (let i = 0; i <= STEPS; i++) {
        const t = (i / STEPS) * Math.PI * 2
        pts.push([
          CX + AX * Math.sin(tr.fa * t + tr.delta),
          CY + AY * Math.sin(tr.fb * t),
        ])
      }
      return pts
    })

    const draw = (now: number) => {
      const elapsed = skipAnim ? 99 : (now - t0Ref.current) / 1000
      const frac = Math.min(1, elapsed / 2.5)
      const vis = Math.floor(frac * STEPS)

      ctx.clearRect(0, 0, W, H)

      TRACES.forEach((tr, ti) => {
        const pts = allPts[ti]
        if (vis < 2) return

        // Soft glow
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i <= vis; i++) ctx.lineTo(pts[i][0], pts[i][1])
        ctx.strokeStyle = `rgba(${tr.r},${tr.g},${tr.b},0.07)`
        ctx.lineWidth = tr.lw * 6
        ctx.lineJoin = 'round'
        ctx.stroke()

        // Main trace
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i <= vis; i++) ctx.lineTo(pts[i][0], pts[i][1])
        ctx.strokeStyle = `rgba(${tr.r},${tr.g},${tr.b},0.72)`
        ctx.lineWidth = tr.lw
        ctx.lineJoin = 'round'
        ctx.stroke()

        // Leading dot while drawing
        if (frac < 1) {
          const [lx, ly] = pts[vis]
          ctx.beginPath()
          ctx.arc(lx, ly, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${tr.r},${tr.g},${tr.b},0.95)`
          ctx.fill()
        }
      })

      // Labels after traces complete
      if (frac > 0.9) {
        const la = (frac - 0.9) / 0.1
        TRACES.forEach((tr, ti) => {
          const pt = allPts[ti][Math.floor(STEPS * 0.25)]
          ctx.font = '10px "Space Mono", monospace'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(${tr.r},${tr.g},${tr.b},${la * 0.85})`
          ctx.fillText(tr.label, pt[0] + 10, pt[1] + (ti - 1) * 16)
        })
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
          transform: stage >= 1 ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(-18deg) rotateY(-14deg)',
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
