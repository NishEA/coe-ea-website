'use client'

import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const SIZE = 640
const CX = 320
const CY = 320
// Band layout gives the radar full width — R restored to 220 with
// SIZE 640 so labels have horizontal room without clipping the edges.
const R = 220
const NODE_RADIUS_FRACTION = 0.8
const SWEEP_PERIOD_MS = 12_000
const SWEEP_FAN_RAD = (35 * Math.PI) / 180
const PING_DURATION_MS = 800
const PING_MAX_RADIUS = 28
const DOT_PULSE_MS = 400
const MAX_PINGS = 20
const TWO_PI = Math.PI * 2
const LABEL_LINE_HEIGHT = 13

const NODES: readonly { label: string; angle: number }[] = [
  { label: 'SMART MANUFACTURING', angle: 0 },
  { label: 'SMART CITY ENERGY', angle: 36 },
  { label: 'SMART CITY WATER', angle: 72 },
  { label: 'INTELLIGENT ASSET MONITORING', angle: 108 },
  { label: 'HOME AND OFFICE AUTOMATION', angle: 144 },
  { label: 'SMART SECURITY', angle: 180 },
  { label: 'WEATHER MONITORING', angle: 216 },
  { label: 'CONNECTED TRANSPORTATION', angle: 252 },
  { label: 'SMART HOSPITALS', angle: 288 },
  { label: 'SMART FARMING', angle: 324 },
]

const RING_FRACTIONS = [0.25, 0.5, 0.75, 1] as const

interface Ping {
  x: number
  y: number
  startTime: number
}

interface RadarNode {
  label: string
  /** Angle in radians, normalized to [0, 2π), with 0° at 12 o'clock. */
  rad: number
  x: number
  y: number
}

/** Normalize an angle to [0, 2π). */
function norm(angle: number): number {
  return ((angle % TWO_PI) + TWO_PI) % TWO_PI
}

/** Split a multi-word label into two lines at the midpoint word. */
function splitLabel(label: string): [string, string] {
  const words = label.split(' ')
  if (words.length <= 1) return [label, '']
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

/** Precompute node positions (0° at top, clockwise). */
const RADAR_NODES: readonly RadarNode[] = NODES.map((node) => {
  const rad = ((node.angle - 90) * Math.PI) / 180
  return {
    label: node.label.toUpperCase(),
    rad: norm(rad),
    x: CX + NODE_RADIUS_FRACTION * R * Math.cos(rad),
    y: CY + NODE_RADIUS_FRACTION * R * Math.sin(rad),
  }
})

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function CapabilityRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const prevSweepRef = useRef<number>(0)
  const pingsRef = useRef<Ping[]>([])
  const lastPingAtRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // DPR setup for sharp rendering on Retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    ctx.scale(dpr, dpr)

    startTimeRef.current = performance.now()
    prevSweepRef.current = norm(-Math.PI / 2)
    pingsRef.current = []
    lastPingAtRef.current = RADAR_NODES.map(() => -Infinity)

    /* ---------------- static layers ---------------- */

    const drawRings = () => {
      for (const fraction of RING_FRACTIONS) {
        const isOuter = fraction === 1
        ctx.beginPath()
        ctx.arc(CX, CY, R * fraction, 0, TWO_PI)
        ctx.strokeStyle = isOuter
          ? 'rgba(0, 164, 228, 0.25)'
          : 'rgba(0, 164, 228, 0.15)'
        ctx.lineWidth = isOuter ? 1 : 0.8
        ctx.stroke()
      }
    }

    const drawSpokes = () => {
      ctx.strokeStyle = 'rgba(0, 164, 228, 0.08)'
      ctx.lineWidth = 0.6
      for (const node of RADAR_NODES) {
        ctx.beginPath()
        ctx.moveTo(CX, CY)
        ctx.lineTo(CX + R * Math.cos(node.rad), CY + R * Math.sin(node.rad))
        ctx.stroke()
      }
    }

    const drawRingLabels = () => {
      ctx.font = '8px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(0, 164, 228, 0.45)'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'bottom'
      for (const fraction of RING_FRACTIONS) {
        const label = `${Math.round(fraction * 100)}%`
        ctx.fillText(label, CX + 4, CY - R * fraction - 2)
      }
    }

    /* ---------------- sweep ---------------- */

    const drawSweepFan = (sweepAngle: number) => {
      const fan = ctx.createRadialGradient(CX, CY, 0, CX, CY, R)
      fan.addColorStop(0, 'rgba(0, 164, 228, 0.0)')
      fan.addColorStop(1, 'rgba(0, 164, 228, 0.08)')
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.arc(CX, CY, R, sweepAngle - SWEEP_FAN_RAD, sweepAngle)
      ctx.closePath()
      ctx.fillStyle = fan
      ctx.fill()
    }

    const drawSweepLine = (sweepAngle: number) => {
      const tipX = CX + R * Math.cos(sweepAngle)
      const tipY = CY + R * Math.sin(sweepAngle)
      const gradient = ctx.createLinearGradient(CX, CY, tipX, tipY)
      gradient.addColorStop(0, 'rgba(0, 164, 228, 0.0)')
      gradient.addColorStop(1, 'rgba(0, 164, 228, 0.9)')
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.lineTo(tipX, tipY)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    /* ---------------- pings ---------------- */

    const detectPings = (sweepAngle: number, now: number) => {
      const prev = prevSweepRef.current
      const curr = norm(sweepAngle)

      RADAR_NODES.forEach((node, i) => {
        // The sweep crossed the node if the node angle lies in the
        // half-open interval (prev, curr], handling the 2π wraparound.
        const crossed =
          curr >= prev
            ? node.rad > prev && node.rad <= curr
            : node.rad > prev || node.rad <= curr

        if (crossed) {
          lastPingAtRef.current[i] = now
          const pings = pingsRef.current
          if (pings.length >= MAX_PINGS) pings.shift()
          pings.push({ x: node.x, y: node.y, startTime: now })
        }
      })

      prevSweepRef.current = curr
    }

    const drawPings = (now: number) => {
      const pings = pingsRef.current
      // Expire old pings
      pingsRef.current = pings.filter(
        (ping) => now - ping.startTime < PING_DURATION_MS
      )
      ctx.lineWidth = 1.2
      for (const ping of pingsRef.current) {
        const age = now - ping.startTime
        const progress = age / PING_DURATION_MS
        const radius = progress * PING_MAX_RADIUS
        const opacity = 1 - progress
        ctx.beginPath()
        ctx.arc(ping.x, ping.y, radius, 0, TWO_PI)
        ctx.strokeStyle = `rgba(212, 168, 83, ${opacity.toFixed(3)})`
        ctx.stroke()
      }
    }

    /* ---------------- nodes + labels ---------------- */

    const drawNodes = (now: number) => {
      RADAR_NODES.forEach((node, i) => {
        // Faint cerulean halo
        ctx.beginPath()
        ctx.arc(node.x, node.y, 10, 0, TWO_PI)
        ctx.fillStyle = 'rgba(0, 164, 228, 0.15)'
        ctx.fill()

        // Pulse the dot 4 → 8 → 4 over 400ms after a ping
        const sincePing = now - lastPingAtRef.current[i]
        let dotRadius = 4
        if (sincePing >= 0 && sincePing < DOT_PULSE_MS) {
          dotRadius = 4 + 4 * Math.sin((sincePing / DOT_PULSE_MS) * Math.PI)
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, dotRadius, 0, TWO_PI)
        ctx.fillStyle = '#d4a853'
        ctx.fill()
      })
    }

    const drawLabels = () => {
      ctx.font = '10px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      for (const node of RADAR_NODES) {
        const cos = Math.cos(node.rad)
        const sin = Math.sin(node.rad)
        const labelX = node.x + 16 * cos
        const labelY = node.y + 16 * sin

        if (cos > 0.25) {
          ctx.textAlign = 'left'
        } else if (cos < -0.25) {
          ctx.textAlign = 'right'
        } else {
          ctx.textAlign = 'center'
        }

        const [line1, line2] = splitLabel(node.label)

        if (!line2) {
          // Single word — original baseline logic
          ctx.textBaseline = sin < -0.25 ? 'bottom' : sin > 0.25 ? 'top' : 'middle'
          ctx.fillText(line1, labelX, labelY)
        } else if (sin < -0.25) {
          // Label is above the node: line1 on top, line2 below it
          ctx.textBaseline = 'bottom'
          ctx.fillText(line2, labelX, labelY)
          ctx.fillText(line1, labelX, labelY - LABEL_LINE_HEIGHT)
        } else if (sin > 0.25) {
          // Label is below the node: line1 on top, line2 below it
          ctx.textBaseline = 'top'
          ctx.fillText(line1, labelX, labelY)
          ctx.fillText(line2, labelX, labelY + LABEL_LINE_HEIGHT)
        } else {
          // Side (cos dominant): center two lines on the label point
          ctx.textBaseline = 'bottom'
          ctx.fillText(line1, labelX, labelY)
          ctx.textBaseline = 'top'
          ctx.fillText(line2, labelX, labelY)
        }
      }
    }

    /* ---------------- frame ---------------- */

    const drawFrame = (sweepAngle: number, now: number, animate: boolean) => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      drawRings()
      drawSpokes()
      drawRingLabels()
      if (animate) {
        drawSweepFan(sweepAngle)
      }
      drawSweepLine(sweepAngle)
      if (animate) {
        detectPings(sweepAngle, now)
        drawPings(now)
      }
      drawNodes(now)
      drawLabels()
    }

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current
      const sweepAngle =
        ((elapsed % SWEEP_PERIOD_MS) / SWEEP_PERIOD_MS) * TWO_PI - Math.PI / 2
      drawFrame(sweepAngle, timestamp, true)
      rafRef.current = requestAnimationFrame(draw)
    }

    if (reduced) {
      // Static frame: sweep line at 12 o'clock, no animation loop
      drawFrame(-Math.PI / 2, startTimeRef.current, false)
    } else {
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', maxWidth: SIZE, aspectRatio: '1 / 1' }}
        aria-hidden
      />
    </div>
  )
}
