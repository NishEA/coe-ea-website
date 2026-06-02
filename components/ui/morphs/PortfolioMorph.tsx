'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Portfolio hero visual — Cube → Orbital mechanics.
 *
 * Six portfolio startups orbit the CoE-EA hub. Angular velocities follow
 * Kepler's third law (ω ∝ r⁻³/²) so inner orbits complete faster.
 * Each body leaves a fading trail. Orbit ellipses appear as faint guides.
 */

const FACE = 52
const TRANSLATE = 26
const W = 500, H = 480
const CX = 250, CY = 240
const EZ = 'cubic-bezier(0.4,0,0.2,1)'
const TRAIL_LEN = 48

const ω0 = 0.6, r0 = 80

const ORBITS = [
  { r: 80,  ecc: 0.08, inc: 0,   θ0: 0,           short: 'WB',  amber: false },
  { r: 115, ecc: 0.12, inc: 15,  θ0: Math.PI/3,   short: 'YP',  amber: false },
  { r: 148, ecc: 0.10, inc: -20, θ0: Math.PI*0.8, short: 'AV',  amber: false },
  { r: 178, ecc: 0.15, inc: 10,  θ0: Math.PI*1.3, short: 'OR',  amber: true  },
  { r: 205, ecc: 0.08, inc: -8,  θ0: Math.PI*1.7, short: 'VC',  amber: false },
  { r: 228, ecc: 0.11, inc: 25,  θ0: Math.PI*0.4, short: 'STG', amber: false },
].map(o => ({ ...o, ω: ω0 * Math.pow(r0 / o.r, 1.5) }))

function bodyPos(o: typeof ORBITS[0], θ: number): [number, number] {
  const rr = o.r * (1 - o.ecc * Math.cos(θ))
  const incR = (o.inc * Math.PI) / 180
  const x = CX + rr * (Math.cos(θ) * Math.cos(incR) - Math.sin(θ) * Math.sin(incR))
  const y = CY + rr * (Math.cos(θ) * Math.sin(incR) + Math.sin(θ) * Math.cos(incR)) * 0.38
  return [x, y]
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

    const trails: [number, number][][] = ORBITS.map(() => [])

    const draw = (now: number) => {
      const elapsed = skipAnim ? 8 : (now - t0Ref.current) / 1000
      ctx.clearRect(0, 0, W, H)

      // Orbit guides
      const guideAlpha = Math.min(0.18, elapsed * 0.09)
      ORBITS.forEach(o => {
        const incR = (o.inc * Math.PI) / 180
        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(incR)
        ctx.scale(1, 0.38)
        ctx.beginPath()
        ctx.ellipse(0, 0, o.r, o.r * (1 - o.ecc), 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,164,228,${guideAlpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.restore()
      })

      // Hub glow + dot
      const hubGrow = Math.min(1, elapsed / 0.4)
      if (hubGrow > 0) {
        const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, 18 * hubGrow)
        grad.addColorStop(0, `rgba(212,168,83,${hubGrow * 0.3})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(CX, CY, 18 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.beginPath()
        ctx.arc(CX, CY, 5 * hubGrow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,168,83,${hubGrow * 0.95})`
        ctx.fill()
        if (elapsed > 0.5) {
          const la = Math.min(1, (elapsed - 0.5) / 0.4)
          ctx.font = '9px "Space Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillStyle = `rgba(212,168,83,${la * 0.85})`
          ctx.fillText('CoE-EA', CX, CY + 9)
        }
      }

      // Bodies + trails
      ORBITS.forEach((o, i) => {
        const appear = Math.max(0, elapsed - 0.3 - i * 0.15)
        if (appear <= 0) return
        const θ = o.θ0 + o.ω * elapsed
        const [bx, by] = bodyPos(o, θ)

        trails[i].push([bx, by])
        if (trails[i].length > TRAIL_LEN) trails[i].shift()

        const trail = trails[i]
        for (let j = 1; j < trail.length; j++) {
          const a = (j / trail.length) * Math.min(1, appear / 0.5) * (o.amber ? 0.5 : 0.35)
          ctx.beginPath()
          ctx.moveTo(trail[j - 1][0], trail[j - 1][1])
          ctx.lineTo(trail[j][0], trail[j][1])
          ctx.strokeStyle = o.amber ? `rgba(212,168,83,${a})` : `rgba(0,164,228,${a})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        const dotAlpha = Math.min(1, appear / 0.3)
        ctx.beginPath()
        ctx.arc(bx, by, 3, 0, Math.PI * 2)
        ctx.fillStyle = o.amber
          ? `rgba(212,168,83,${dotAlpha * 0.95})`
          : `rgba(0,164,228,${dotAlpha * 0.85})`
        ctx.fill()

        if (appear > 0.5) {
          const la = Math.min(1, (appear - 0.5) / 0.5)
          ctx.font = '8px "Space Mono", monospace'
          ctx.textAlign = bx > CX ? 'left' : 'right'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = o.amber
            ? `rgba(212,168,83,${la * 0.8})`
            : `rgba(183,207,232,${la * 0.65})`
          ctx.fillText(o.short, bx + (bx > CX ? 7 : -7), by)
        }
      })

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
