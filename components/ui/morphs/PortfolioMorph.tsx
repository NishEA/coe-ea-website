'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Portfolio hero visual — Cube → Orrery (solar-system model).
 *
 * CoE-EA sits at the hub. Five rings orbit at different inclinations and
 * angular speeds (outer = slower, Kepler-style). Small planet dots travel
 * each ring. Cube fades out after the morph; the orrery runs continuously.
 */

const W = 500, H = 480
const CX = 250, CY = 240
const FACE = 52, TRANSLATE = 26
const EZ = 'cubic-bezier(0.4,0,0.2,1)'

const C = '0,164,228'   // cerulean
const A = '212,168,83'  // amber

// Each ring: radius, y-scale (inclination/tilt), XY-plane tilt (deg),
// orbital speed (rad/s, outer slower), dot initial angles (rad), dot colour
type Ring = {
  r: number; ys: number; tiltDeg: number
  speed: number; dots: number[]; rgb: string
}

const RINGS: Ring[] = [
  { r: 72,  ys: 0.35, tiltDeg:  0,  speed: 0.72, dots: [0, Math.PI],                rgb: C },
  { r: 108, ys: 0.44, tiltDeg:  18, speed: 0.50, dots: [1.2],                       rgb: A },
  { r: 144, ys: 0.30, tiltDeg: -12, speed: 0.36, dots: [0.5, 0.5 + Math.PI],        rgb: C },
  { r: 180, ys: 0.46, tiltDeg:  24, speed: 0.24, dots: [2.1],                       rgb: A },
  { r: 214, ys: 0.38, tiltDeg:  -5, speed: 0.15, dots: [0.8, 0.8 + Math.PI],        rgb: C },
]

/** Map a point on a ring at angle `a` to screen coords. */
function dotXY(ring: Ring, a: number): [number, number] {
  const t = (ring.tiltDeg * Math.PI) / 180
  const lx = ring.r * Math.cos(a)
  const ly = ring.r * ring.ys * Math.sin(a)
  return [
    CX + lx * Math.cos(t) - ly * Math.sin(t),
    CY + lx * Math.sin(t) + ly * Math.cos(t),
  ]
}

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

      // ── orbital paths + planet dots ───────────────────────────────────
      RINGS.forEach((ring, i) => {
        const appear = Math.min(1, Math.max(0, (elapsed - i * 0.22) / 0.7))
        if (appear <= 0) return
        const t = (ring.tiltDeg * Math.PI) / 180

        // orbital path ellipse
        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(t)
        ctx.scale(1, ring.ys)
        ctx.beginPath()
        ctx.ellipse(0, 0, ring.r, ring.r, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${ring.rgb},${appear * 0.5})`
        ctx.lineWidth = 1.4
        ctx.stroke()
        ctx.restore()

        // planet dots
        const dotAppear = Math.min(1, Math.max(0, (elapsed - i * 0.22 - 0.35) / 0.5))
        if (dotAppear <= 0) return

        ring.dots.forEach(init => {
          const a = init + (skipAnim ? 0 : elapsed * ring.speed)
          const [dx, dy] = dotXY(ring, a)

          // trailing arc (~30° behind dot)
          const trailSteps = 18
          for (let s = 1; s <= trailSteps; s++) {
            const ta = a - (s / trailSteps) * (Math.PI / 6)
            const [tx, ty] = dotXY(ring, ta)
            ctx.beginPath()
            ctx.arc(tx, ty, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${ring.rgb},${dotAppear * (1 - s / trailSteps) * 0.35})`
            ctx.fill()
          }

          // glow halo
          const grd = ctx.createRadialGradient(dx, dy, 0, dx, dy, 9)
          grd.addColorStop(0, `rgba(${ring.rgb},${dotAppear * 0.55})`)
          grd.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.beginPath()
          ctx.arc(dx, dy, 9, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          // dot core
          ctx.beginPath()
          ctx.arc(dx, dy, 2.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ring.rgb},${dotAppear * 0.95})`
          ctx.fill()
        })
      })

      // ── hub ───────────────────────────────────────────────────────────
      const hubGrow = Math.min(1, elapsed / 0.4)
      if (hubGrow > 0) {
        const g2 = ctx.createRadialGradient(CX, CY, 0, CX, CY, 34 * hubGrow)
        g2.addColorStop(0, `rgba(212,168,83,${hubGrow * 0.45})`)
        g2.addColorStop(0.45, `rgba(212,168,83,${hubGrow * 0.15})`)
        g2.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(CX, CY, 34 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = g2
        ctx.fill()

        ctx.beginPath()
        ctx.arc(CX, CY, 7 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,168,83,${hubGrow * 0.96})`
        ctx.fill()

        const la = Math.min(1, Math.max(0, (elapsed - 0.5) / 0.4))
        if (la > 0) {
          ctx.font = '10px "Space Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = `rgba(212,168,83,${la * 0.9})`
          ctx.fillText('CoE-EA', CX, CY + 13)
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [stage])

  // cube faces (stage 0 → 1; fade out at stage 2)
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
        {/* cube (morphs away) */}
        <div style={{
          position: 'absolute', left: (W - FACE) / 2, top: (H - FACE) / 2,
          width: FACE, height: FACE, transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-out',
          transform: stage >= 1 ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(-14deg) rotateY(-10deg)',
        }}>
          <div style={face(`rotateX(90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(180deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(-90deg) translateZ(${TRANSLATE}px)`)} />
          <div style={face(`rotateY(90deg) translateZ(${TRANSLATE}px)`)} />
        </div>

        {/* orrery canvas */}
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
