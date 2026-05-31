'use client'

import { useEffect, useRef } from 'react'

const DOMAINS = ['MFG', 'ENERGY', 'WATER', 'TRNSPRT', 'HEALTH', 'SECURITY', 'FARMING', 'WEATHER', 'ASSETS', 'HOME']
const DCOLS = ['rgba(212,168,83,', 'rgba(0,164,228,', 'rgba(183,207,232,']

type Dot = { ring: 1 | 2; a: number; j: number; spd: number; sz: number }

/**
 * Concept D orbital field. Two elliptical rings of drifting particles plus a
 * slowly-rotating outer ring of labelled domain nodes. Extracted from the
 * approved concept-d.html canvas.
 *
 * Props let secondary pages run a lighter version: fewer domains, no labels,
 * or a frozen single frame (`animate={false}`) for reduced-motion-friendly
 * dark heroes.
 */
export function OrbitCanvas({
  domainCount = 10,
  showLabels = true,
  animate = true,
  className = '',
}: {
  domainCount?: number
  showLabels?: boolean
  animate?: boolean
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    // Mocked canvas contexts (jsdom/tests) lack ellipse — skip rendering there.
    if (typeof ctx.ellipse !== 'function') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = animate && !reduced

    let W = 0, H = 0, ox = 0, oy = 0, R1 = 0, R2 = 0, t = 0
    let dots: Dot[] = []
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const domains = DOMAINS.slice(0, Math.max(0, Math.min(domainCount, DOMAINS.length)))

    function makeDots() {
      dots = []
      for (let i = 0; i < 200; i++) {
        const a = (i / 200) * Math.PI * 2
        dots.push({ ring: 1, a, j: (Math.random() - 0.5) * 16, spd: 0.00025 + Math.random() * 0.00015, sz: Math.random() * 1.3 + 0.3 })
      }
      for (let i = 0; i < 150; i++) {
        const a = (i / 150) * Math.PI * 2
        dots.push({ ring: 2, a, j: (Math.random() - 0.5) * 11, spd: -(0.00035 + Math.random() * 0.00025), sz: Math.random() * 1.0 + 0.25 })
      }
    }

    function resize() {
      const p = cv!.getBoundingClientRect()
      W = p.width; H = p.height
      cv!.width = W * dpr; cv!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ox = W / 2; oy = H / 2
      R1 = Math.min(W, H) * 0.37
      R2 = Math.min(W, H) * 0.27
      makeDots()
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H)
      t++

      // ring guides
      ctx!.strokeStyle = 'rgba(0,164,228,0.07)'
      ctx!.lineWidth = 0.5
      ctx!.beginPath(); ctx!.ellipse(ox, oy, R1, R1 * 0.4, 0, 0, Math.PI * 2); ctx!.stroke()
      ctx!.beginPath(); ctx!.ellipse(ox, oy, R2, R2 * 0.4, 0, 0, Math.PI * 2); ctx!.stroke()

      // particles
      for (const d of dots) {
        const a = d.a + t * d.spd
        const rad = (d.ring === 1 ? R1 : R2) + d.j
        const x = ox + Math.cos(a) * rad
        const y = oy + Math.sin(a) * rad * 0.4
        const alpha = 0.18 + Math.sin(a * 4 + t * 0.008) * 0.1
        ctx!.fillStyle = d.ring === 1 ? `rgba(183,207,232,${alpha})` : `rgba(0,164,228,${alpha})`
        ctx!.beginPath(); ctx!.arc(x, y, d.sz, 0, Math.PI * 2); ctx!.fill()
      }

      // domain nodes (outer ring)
      const nr = R1 + 38
      domains.forEach((name, i) => {
        const a = (i / domains.length) * Math.PI * 2 + t * 0.00018
        const x = ox + Math.cos(a) * nr
        const y = oy + Math.sin(a) * nr * 0.4
        const col = DCOLS[i % 3]
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 14)
        g.addColorStop(0, col + '0.22)')
        g.addColorStop(1, col + '0)')
        ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(x, y, 14, 0, Math.PI * 2); ctx!.fill()
        ctx!.fillStyle = col + '0.9)'; ctx!.beginPath(); ctx!.arc(x, y, 4, 0, Math.PI * 2); ctx!.fill()
        if (showLabels) {
          ctx!.fillStyle = 'rgba(183,207,232,0.4)'
          ctx!.font = '7px "Space Mono", monospace'
          ctx!.textAlign = 'center'
          // Flip label below node when in bottom half so it clears the glow circle (r=14)
          ctx!.fillText(name, x, y < oy ? y - 22 : y + 22)
        }
      })

      if (run) raf = requestAnimationFrame(frame)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [domainCount, showLabels, animate])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={`pointer-events-none ${className}`}
    />
  )
}
