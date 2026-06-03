'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Book hero visual — Cube → Voronoi crystal growth.
 * Canvas fills the right-half visual column of DarkHero (480×400).
 */

const FACE = 52
const TRANSLATE = 26
const W = 480, H = 400
const EZ = 'cubic-bezier(0.4,0,0.2,1)'

// Seeds positioned in a diamond — proportional to the larger canvas.
const SEEDS = [
  { x: 56,  y: 200, label: 'LAB',     r: 0,   g: 164, b: 228 },
  { x: 240, y: 72,  label: 'MEETING', r: 34,  g: 197, b: 94  },
  { x: 424, y: 200, label: 'H·BAY',   r: 212, g: 168, b: 83  },
  { x: 240, y: 328, label: 'DEMO',    r: 0,   g: 184, b: 210 },
]

export function FloorPlanMorph({ className = '' }: { className?: string }) {
  const [stage, setStage] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    const N = W * H
    const owner = new Uint8Array(N)
    const pdist = new Float32Array(N)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let minD = Infinity, minI = 0
        SEEDS.forEach((s, i) => {
          const d = Math.hypot(x - s.x, y - s.y)
          if (d < minD) { minD = d; minI = i }
        })
        const idx = y * W + x
        owner[idx] = minI
        pdist[idx] = minD
      }
    }
    const edge = new Uint8Array(N)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x, si = owner[i]
        if ((x > 0   && owner[i - 1] !== si) ||
            (x < W-1 && owner[i + 1] !== si) ||
            (y > 0   && owner[i - W] !== si) ||
            (y < H-1 && owner[i + W] !== si)) edge[i] = 1
      }
    }
    const maxDist = pdist.reduce((m, v) => (v > m ? v : m), 0)
    const skipAnim =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let radius = skipAnim ? maxDist + 1 : 0
    let rafId: number

    const drawFrame = () => {
      const img = ctx.createImageData(W, H)
      const px = img.data
      for (let i = 0; i < N; i++) {
        if (pdist[i] > radius) continue
        const s = SEEDS[owner[i]]
        const b = i << 2
        px[b] = s.r; px[b + 1] = s.g; px[b + 2] = s.b
        px[b + 3] = edge[i] ? 220 : 28
      }
      ctx.clearRect(0, 0, W, H)
      ctx.putImageData(img, 0, 0)

      SEEDS.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},0.95)`
        ctx.fill()
      })

      if (radius > 80) {
        ctx.font = '10px "Space Mono", monospace'
        ctx.letterSpacing = '0.08em'
        SEEDS.forEach(s => {
          const offX = s.x < 200 ? -14 : s.x > 280 ? 14 : 0
          const offY = s.y < 160 ? -14 : s.y > 240 ? 16 : 0
          ctx.textAlign   = s.x < 200 ? 'right' : s.x > 280 ? 'left' : 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle   = `rgba(${s.r},${s.g},${s.b},0.9)`
          ctx.fillText(s.label, s.x + offX, s.y + offY)
        })
      }

      radius += 4
      if (radius <= maxDist + 8) rafId = requestAnimationFrame(drawFrame)
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
          transform: stage >= 1 ? 'rotateX(0deg) rotateZ(0deg)' : 'rotateX(-52deg) rotateZ(-12deg)',
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
