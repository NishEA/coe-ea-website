'use client'

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; r: number; col: string }

const COLS = ['rgba(212,168,83,', 'rgba(0,164,228,', 'rgba(183,207,232,']

/**
 * Drifting startup-network graph for the Portfolio hero. Nodes wander slowly;
 * pairs within a threshold distance are joined by thin lines. Reduced-motion
 * users get a single static frame.
 */
export function NetworkCanvas({
  count = 34,
  className = '',
}: {
  count?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0, raf = 0
    let nodes: Node[] = []

    function build() {
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 2 + 1.5,
        col: COLS[i % 3],
      }))
    }

    function resize() {
      const rect = cv!.getBoundingClientRect()
      W = rect.width; H = rect.height
      cv!.width = W * dpr; cv!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            ctx!.strokeStyle = `rgba(183,207,232,${0.12 * (1 - dist / 130)})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > W) n.vx *= -1
          if (n.y < 0 || n.y > H) n.vy *= -1
        }
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
        g.addColorStop(0, n.col + '0.5)')
        g.addColorStop(1, n.col + '0)')
        ctx!.fillStyle = g
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2); ctx!.fill()
        ctx!.fillStyle = n.col + '0.9)'
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx!.fill()
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={`pointer-events-none ${className}`}
    />
  )
}
