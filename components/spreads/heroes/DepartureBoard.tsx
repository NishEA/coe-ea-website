'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ─────────────────────────────────────────────────────────────────────────────
   DEPARTURE BOARD — mechanical split-flap event manifest
   Airport-board hero: every character position flips through random glyphs
   before settling on its target value. Dark Industry 4.0, mono grid, amber
   highlight on the next upcoming event.
   ───────────────────────────────────────────────────────────────────────────── */

export interface BoardEvent {
  _id: string
  name: string
  date: string // ISO datetime
  type: 'hackathon' | 'ideathon' | 'workshop' | 'industrial visit'
  college?: string
  attendees?: number
}

interface DepartureBoardProps {
  events: BoardEvent[]
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-: '
const MAX_ROWS = 8
const MOBILE_BREAKPOINT = 768
const NBSP = ' '

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
] as const

const TYPE_LABELS: Record<BoardEvent['type'], string> = {
  hackathon: 'HACKATHON',
  ideathon: 'IDEATHON',
  workshop: 'WORKSHOP',
  'industrial visit': 'IND VISIT',
}

/* Shared column widths — 3 columns on mobile, 5 from tablet up */
const COL = {
  date: 'w-[30%] tablet:w-[16%]',
  event: 'min-w-0 flex-1 tablet:flex-none tablet:w-[38%]',
  type: 'hidden tablet:block tablet:w-[14%]',
  host: 'hidden tablet:block tablet:w-[18%]',
  status: 'w-[26%] tablet:w-[14%]',
} as const

interface DisplayRow {
  id: string
  date: string
  name: string
  type: string
  host: string
  status: 'OPEN' | 'LOGGED'
  isNext: boolean
  dateMs: number
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

function formatBoardDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0')
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

/* Non-breaking space so blank flaps keep their box */
function glyph(char: string): string {
  return char === ' ' ? NBSP : char
}

/* ── Per-character split-flap cell ────────────────────────────────────────── */

function FlipCell({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`whitespace-nowrap ${className ?? ''}`}>
      {value.split('').map((char, i) => (
        <span
          key={i}
          data-flap-char
          data-target={char}
          style={{
            display: 'inline-block',
            width: '1ch',
            minWidth: '0.6rem',
            position: 'relative',
            textAlign: 'center',
            willChange: 'transform',
          }}
        >
          {glyph(char)}
        </span>
      ))}
    </span>
  )
}

/* ── Status chip ──────────────────────────────────────────────────────────── */

function StatusChip({ status }: { status: 'OPEN' | 'LOGGED' }) {
  const tone =
    status === 'OPEN' ? 'text-brand-cerulean' : 'text-brand-ice/30'
  return (
    <span
      className={`glass-chip inline-flex items-center px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${tone}`}
    >
      <FlipCell value={status} />
    </span>
  )
}

/* ── Component ────────────────────────────────────────────────────────────── */

export function DepartureBoard({ events }: DepartureBoardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState('')

  const rows = useMemo<DisplayRow[]>(() => {
    const now = Date.now()
    const upcoming = events
      .filter((e) => new Date(e.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const past = events
      .filter((e) => new Date(e.date).getTime() <= now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return [...upcoming, ...past].slice(0, MAX_ROWS).map((e, i) => {
      const dateMs = new Date(e.date).getTime()
      return {
        id: e._id,
        date: formatBoardDate(new Date(e.date)),
        name: truncate(e.name.toUpperCase(), 28),
        type: TYPE_LABELS[e.type],
        host: e.college ? truncate(e.college.toUpperCase(), 18) : '—',
        status: dateMs > now ? 'OPEN' : 'LOGGED',
        isNext: i === 0 && upcoming.length > 0,
        dateMs,
      }
    })
  }, [events])

  const nextDateMs = useMemo(
    () => rows.find((r) => r.isNext)?.dateMs,
    [rows],
  )

  /* Live T-MINUS countdown for the next event */
  useEffect(() => {
    if (nextDateMs === undefined) return
    const tick = () => {
      const diff = nextDateMs - Date.now()
      if (diff <= 0) {
        setCountdown('T-MINUS 00D 00H')
        return
      }
      const d = String(Math.floor(diff / 86_400_000)).padStart(2, '0')
      const h = String(Math.floor((diff % 86_400_000) / 3_600_000)).padStart(2, '0')
      setCountdown(`T-MINUS ${d}D ${h}H`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [nextDateMs])

  /* Split-flap animation. Server renders final characters; on mount the
     client scrambles every flap to a random glyph, then mechanically flips
     each one (fold away → swap glyph → unfold) 6–9 times before settling
     on its target. Skipped entirely on mobile and for reduced motion. */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < MOBILE_BREAKPOINT) return

    const ctx = gsap.context(() => {
      const flaps = Array.from(
        root.querySelectorAll<HTMLElement>('[data-flap-char]'),
      )

      flaps.forEach((el, globalIdx) => {
        const target = el.getAttribute('data-target') ?? ' '
        const cycles = 6 + Math.floor(Math.random() * 4) // 6–9 flips
        const delay = globalIdx * 0.018 // stagger left→right, row by row

        gsap.set(el, {
          transformPerspective: 320,
          transformOrigin: '50% 50%',
          backfaceVisibility: 'hidden',
        })

        // Pre-animation scramble (client only — avoids hydration mismatch)
        el.textContent = glyph(randomChar())

        const tl = gsap.timeline({ delay })
        for (let i = 0; i <= cycles; i++) {
          const isFinal = i === cycles
          tl.to(el, { rotateX: -90, duration: 0.05, ease: 'power1.in' })
            .call(() => {
              el.textContent = glyph(isFinal ? target : randomChar())
            })
            .to(el, { rotateX: 0, duration: 0.07, ease: 'power1.out' })
        }
      })
    }, root)

    return () => ctx.revert()
  }, [rows])

  return (
    <div
      ref={rootRef}
      className="glass-panel relative w-full overflow-hidden pb-0"
    >
      {/* Corner brackets */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-brand-cerulean/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-brand-cerulean/40"
      />

      <div className="px-4 pt-4 tablet:px-8 tablet:pt-5">
        {/* Header row */}
        <div className="flex items-center gap-3 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-ice/30">
          <span className={COL.date}>Date</span>
          <span className={`${COL.event} truncate`}>Event</span>
          <span className={COL.type}>Type</span>
          <span className={COL.host}>Host</span>
          <span className={COL.status}>Status</span>
        </div>

        {/* Header / body divider */}
        <div className="border-t border-white/[0.08]">
          {rows.length === 0 ? (
            /* Empty state — dim, static, no animation */
            <div className="flex h-[40px] items-center gap-3 border-b border-white/[0.06] font-mono text-[13px] text-brand-ice/30 tablet:h-[44px]">
              <span className={COL.date}>--</span>
              <span className={`${COL.event} truncate tracking-[0.08em]`}>
                SIGNAL AWAITED
              </span>
              <span className={COL.type}>--</span>
              <span className={COL.host}>--</span>
              <span className={COL.status}>--</span>
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row.id}
                className={`flex h-[40px] items-center gap-3 border-b border-white/[0.06] font-mono text-[13px] tablet:h-[44px] ${
                  row.isNext
                    ? 'border-l-2 border-l-amber bg-amber/[0.04] pl-2 text-amber'
                    : 'text-brand-ice/75'
                }`}
              >
                <div className={`${COL.date} truncate`}>
                  <FlipCell value={row.date} />
                </div>
                <div className={`${COL.event} truncate`}>
                  <FlipCell value={row.name} />
                </div>
                <div className={`${COL.type} truncate`}>
                  <FlipCell value={row.type} />
                </div>
                <div
                  className={`${COL.host} truncate ${
                    row.host === '—' ? 'text-brand-ice/25' : ''
                  }`}
                >
                  {row.host === '—' ? (
                    <span>—</span>
                  ) : (
                    <FlipCell value={row.host} />
                  )}
                </div>
                <div className={`${COL.status} min-w-0`}>
                  <div className="flex flex-col items-start gap-0.5">
                    <StatusChip status={row.status} />
                    {row.isNext && countdown !== '' && (
                      <span className="font-mono text-[8px] leading-none tracking-[0.14em] text-amber/60">
                        {countdown}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
