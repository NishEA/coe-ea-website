'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const AMBER = '#d4a853'
const AMBER_DIM = 'rgba(212,168,83,0.6)'
const WALL = 'rgba(0,164,228,0.35)'
const WALL_OUTER = 'rgba(0,164,228,0.5)'
const FURNITURE = 'rgba(0,164,228,0.25)'
const FURNITURE_STRONG = 'rgba(0,164,228,0.3)'
const ANNOTATION = 'rgba(0,164,228,0.2)'
const MONO = "'Space Mono', monospace"

const SCAN_RADIUS = 220
const SCAN_VEIL = 'rgba(6,13,46,0.82)'
const IDLE_VEIL = 'rgba(6,13,46,0.72)'

/** Co-working bay hot desks: 4 rows x 4 columns of 20x14 desks. */
const HOT_DESKS: readonly { x: number; y: number }[] = Array.from(
  { length: 16 },
  (_, i) => ({
    x: 100 + (i % 4) * 60,
    y: 380 + Math.floor(i / 4) * 56,
  }),
)

/** Boardroom chairs: 3 above and 3 below the conference table (20x12 each). */
const BOARDROOM_CHAIRS: readonly { x: number; y: number }[] = [
  { x: 790, y: 112 },
  { x: 910, y: 112 },
  { x: 1030, y: 112 },
  { x: 790, y: 276 },
  { x: 910, y: 276 },
  { x: 1030, y: 276 },
]

/** Demo suite chairs: 8 squares in a semicircular arc facing the screen. */
const DEMO_CHAIRS: readonly { x: number; y: number }[] = Array.from(
  { length: 8 },
  (_, i) => {
    const t = Math.PI * ((i + 0.5) / 8)
    return {
      x: Math.round(960 - 140 * Math.cos(t)),
      y: Math.round(430 + 110 * Math.sin(t)),
    }
  },
)

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function Airlock() {
  const rootRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const doorTopRef = useRef<HTMLDivElement>(null)
  const doorBotRef = useRef<HTMLDivElement>(null)

  /* Airlock door reveal -------------------------------------------- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      if (doorTopRef.current) doorTopRef.current.style.transform = 'translateY(-100%)'
      if (doorBotRef.current) doorBotRef.current.style.transform = 'translateY(100%)'
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(doorTopRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power2.inOut',
      }).to(
        doorBotRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        '<',
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  /* Cursor scan / flashlight ---------------------------------------- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleMove = (e: MouseEvent) => {
      const root = rootRef.current
      const overlay = overlayRef.current
      if (!root || !overlay) return

      const rect = root.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      overlay.style.background = `radial-gradient(circle ${SCAN_RADIUS}px at ${x}px ${y}px, transparent 0%, ${SCAN_VEIL} 100%)`
    }

    // Initial state: solid dim veil until the cursor moves.
    if (overlayRef.current) {
      overlayRef.current.style.background = IDLE_VEIL
    }

    if (!reduced) {
      window.addEventListener('mousemove', handleMove)
    }

    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* 1. SVG floor plan */}
      <svg
        viewBox="0 0 1200 680"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        fill="none"
      >
        <defs>
          <pattern
            id="airlock-dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" fill="rgba(0,164,228,0.12)" />
          </pattern>
        </defs>

        {/* Blueprint dot grid inside the building */}
        <rect x="61" y="41" width="1078" height="598" fill="url(#airlock-dot-grid)" />

        {/* Outer wall */}
        <rect x="60" y="40" width="1080" height="600" stroke={WALL_OUTER} strokeWidth="1.5" />

        {/* Horizontal corridor wall (y=340) with door gaps */}
        <line x1="60" y1="340" x2="260" y2="340" stroke={WALL} strokeWidth="1" />
        <line x1="300" y1="340" x2="540" y2="340" stroke={WALL} strokeWidth="1" />
        <line x1="580" y1="340" x2="680" y2="340" stroke={WALL} strokeWidth="1" />
        <line x1="680" y1="340" x2="850" y2="340" stroke={WALL} strokeWidth="1" />
        <line x1="890" y1="340" x2="1140" y2="340" stroke={WALL} strokeWidth="1" />

        {/* Vertical divider, top (x=680) with door gap */}
        <line x1="680" y1="40" x2="680" y2="140" stroke={WALL} strokeWidth="1" />
        <line x1="680" y1="180" x2="680" y2="340" stroke={WALL} strokeWidth="1" />

        {/* Vertical divider, bottom (x=780) with door gap */}
        <line x1="780" y1="340" x2="780" y2="450" stroke={WALL} strokeWidth="1" />
        <line x1="780" y1="490" x2="780" y2="640" stroke={WALL} strokeWidth="1" />

        {/* ---- Prototype Lab (NW) ---- */}
        <rect x="80" y="80" width="160" height="50" stroke={FURNITURE} strokeWidth="0.8" />
        <rect x="80" y="160" width="160" height="50" stroke={FURNITURE} strokeWidth="0.8" />
        <rect x="80" y="240" width="160" height="50" stroke={FURNITURE} strokeWidth="0.8" />
        {/* HPE server rack */}
        <rect x="560" y="80" width="40" height="120" stroke={FURNITURE_STRONG} strokeWidth="1" />
        <line x1="560" y1="104" x2="600" y2="104" stroke={FURNITURE} strokeWidth="0.8" />
        <line x1="560" y1="128" x2="600" y2="128" stroke={FURNITURE} strokeWidth="0.8" />
        <line x1="560" y1="152" x2="600" y2="152" stroke={FURNITURE} strokeWidth="0.8" />
        <line x1="560" y1="176" x2="600" y2="176" stroke={FURNITURE} strokeWidth="0.8" />

        {/* ---- Boardroom (NE) ---- */}
        <rect x="740" y="130" width="360" height="140" rx="20" stroke={FURNITURE_STRONG} strokeWidth="1" />
        {BOARDROOM_CHAIRS.map((c) => (
          <rect
            key={`br-${c.x}-${c.y}`}
            x={c.x}
            y={c.y}
            width="20"
            height="12"
            stroke={FURNITURE}
            strokeWidth="0.8"
          />
        ))}

        {/* ---- Co-working Bay (SW): hot desks ---- */}
        {HOT_DESKS.map((d) => (
          <rect
            key={`hd-${d.x}-${d.y}`}
            x={d.x}
            y={d.y}
            width="20"
            height="14"
            stroke={FURNITURE}
            strokeWidth="0.8"
          />
        ))}

        {/* ---- Demo Suite (SE) ---- */}
        <rect x="820" y="370" width="280" height="20" stroke={FURNITURE_STRONG} strokeWidth="1" />
        {DEMO_CHAIRS.map((c) => (
          <rect
            key={`dc-${c.x}-${c.y}`}
            x={c.x - 6}
            y={c.y - 6}
            width="12"
            height="12"
            stroke={FURNITURE}
            strokeWidth="0.8"
          />
        ))}

        {/* ---- Room labels ---- */}
        <text x="370" y="195" textAnchor="middle" fill={AMBER} fontSize="11" fontFamily={MONO} letterSpacing="0.16em">
          PROTOTYPE LAB
        </text>
        <text x="370" y="212" textAnchor="middle" fill={AMBER_DIM} fontSize="8" fontFamily={MONO}>
          ~1,200 SQ FT
        </text>

        <text x="910" y="195" textAnchor="middle" fill={AMBER} fontSize="11" fontFamily={MONO} letterSpacing="0.16em">
          BOARDROOM
        </text>
        <text x="910" y="212" textAnchor="middle" fill={AMBER_DIM} fontSize="8" fontFamily={MONO}>
          ~400 SQ FT
        </text>

        <text x="420" y="490" textAnchor="middle" fill={AMBER} fontSize="11" fontFamily={MONO} letterSpacing="0.16em">
          CO-WORKING BAY
        </text>
        <text x="420" y="507" textAnchor="middle" fill={AMBER_DIM} fontSize="8" fontFamily={MONO}>
          ~800 SQ FT
        </text>

        <text x="960" y="490" textAnchor="middle" fill={AMBER} fontSize="11" fontFamily={MONO} letterSpacing="0.16em">
          DEMO SUITE
        </text>
        <text x="960" y="507" textAnchor="middle" fill={AMBER_DIM} fontSize="8" fontFamily={MONO}>
          ~600 SQ FT
        </text>

        {/* ---- Dimension annotation, top ---- */}
        <line x1="60" y1="20" x2="1140" y2="20" stroke={ANNOTATION} strokeWidth="0.8" />
        {/* arrow tips */}
        <line x1="60" y1="20" x2="68" y2="16" stroke={ANNOTATION} strokeWidth="0.8" />
        <line x1="60" y1="20" x2="68" y2="24" stroke={ANNOTATION} strokeWidth="0.8" />
        <line x1="1140" y1="20" x2="1132" y2="16" stroke={ANNOTATION} strokeWidth="0.8" />
        <line x1="1140" y1="20" x2="1132" y2="24" stroke={ANNOTATION} strokeWidth="0.8" />
        <text x="600" y="15" textAnchor="middle" fill={ANNOTATION} fontSize="7" fontFamily={MONO} letterSpacing="0.12em">
          ~16,000 SQ FT
        </text>

        {/* ---- Right-side tick marks at room divisions ---- */}
        <line x1="1146" y1="40" x2="1154" y2="40" stroke={ANNOTATION} strokeWidth="0.8" />
        <line x1="1146" y1="340" x2="1154" y2="340" stroke={ANNOTATION} strokeWidth="0.8" />
        <line x1="1146" y1="640" x2="1154" y2="640" stroke={ANNOTATION} strokeWidth="0.8" />

        {/* ---- Compass rose, bottom-left ---- */}
        <line x1="30" y1="630" x2="30" y2="650" stroke={FURNITURE_STRONG} strokeWidth="0.8" />
        <line x1="20" y1="640" x2="40" y2="640" stroke={FURNITURE_STRONG} strokeWidth="0.8" />
        <text x="30" y="624" textAnchor="middle" fill={FURNITURE_STRONG} fontSize="7" fontFamily={MONO}>
          N
        </text>
        <text x="30" y="662" textAnchor="middle" fill={FURNITURE_STRONG} fontSize="7" fontFamily={MONO}>
          S
        </text>
        <text x="48" y="643" textAnchor="middle" fill={FURNITURE_STRONG} fontSize="7" fontFamily={MONO}>
          E
        </text>
        <text x="12" y="643" textAnchor="middle" fill={FURNITURE_STRONG} fontSize="7" fontFamily={MONO}>
          W
        </text>
      </svg>

      {/* 2. Scan overlay — dark veil with radial hole at cursor */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none" />

      {/* 3. Airlock doors */}
      <div ref={doorTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-[#060d2e]" />
      <div ref={doorBotRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060d2e]" />
    </div>
  )
}
