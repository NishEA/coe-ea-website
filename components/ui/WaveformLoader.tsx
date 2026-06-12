'use client'

import { useEffect, useState } from 'react'

/** Targeting-ring radius in viewBox units (SVG is 248×248, centre 124). */
const RING_R = 90
const RING_C = 2 * Math.PI * RING_R // ≈ 565.49 — keep in sync with splashArc keyframes

/**
 * Loading splash — "Lock-On". The CoE-EA logo sits at the centre of a
 * targeting ring: a slow-rotating graticule of minor ticks, four fixed
 * amber cardinal ticks, and a cerulean arc that sweeps closed over
 * `duration` ms (stroke-dashoffset). The logo idles dim (0.25 opacity)
 * until the arc nears closure at ~86%, when it snaps to full brightness —
 * signal acquired — followed by a brief cerulean flash on the ring, then
 * the whole overlay fades out. Pure CSS animation, no JS frames.
 *
 * After `duration` ms it fires `onComplete` and fades over 700ms;
 * reduced-motion users skip straight through (all splash-* classes are
 * paused via the reduced-motion block in globals.css, leaving a static
 * track ring + full-brightness logo).
 */
export function WaveformLoader({
  onComplete,
  duration = 2200,
  label = 'Initialising the Instrument',
}: {
  onComplete?: () => void
  duration?: number
  label?: string
}) {
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduced ? 250 : duration

    const t1 = setTimeout(() => {
      setOut(true)
      onComplete?.()
    }, hold)
    const t2 = setTimeout(() => setGone(true), hold + 700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [duration, onComplete])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-void transition-opacity duration-700 ${
        out ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ '--splash-duration': `${duration}ms` } as React.CSSProperties}
    >
      <div className="relative flex h-[248px] w-[248px] items-center justify-center">
        {/* Slow-rotating graticule — minor tick band, instrument bezel */}
        <svg
          className="splash-graticule absolute inset-0"
          width={248}
          height={248}
          viewBox="0 0 248 248"
          fill="none"
        >
          <circle
            cx="124"
            cy="124"
            r="112"
            stroke="rgba(183, 207, 232, 0.14)"
            strokeWidth="5"
            strokeDasharray="1.5 8.4"
          />
        </svg>

        {/* Main ring — track, sweeping arc, lock flash. Rotated -90° so the
            arc starts at 12 o'clock. */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={248}
          height={248}
          viewBox="0 0 248 248"
          fill="none"
        >
          <circle
            cx="124"
            cy="124"
            r={RING_R}
            stroke="rgba(183, 207, 232, 0.1)"
            strokeWidth="1.5"
          />
          <circle
            className="splash-arc"
            cx="124"
            cy="124"
            r={RING_R}
            stroke="var(--color-brand-cerulean)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
          />
          <circle
            className="splash-lock-flash"
            cx="124"
            cy="124"
            r={RING_R}
            stroke="#3ddcff"
            strokeWidth="2"
            opacity="0"
          />
        </svg>

        {/* Fixed amber cardinal ticks — N / S / W / E, just outside the ring */}
        <svg
          className="absolute inset-0"
          width={248}
          height={248}
          viewBox="0 0 248 248"
          fill="none"
          stroke="var(--color-amber)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        >
          <line x1="124" y1="20" x2="124" y2="30" />
          <line x1="124" y1="218" x2="124" y2="228" />
          <line x1="20" y1="124" x2="30" y2="124" />
          <line x1="218" y1="124" x2="228" y2="124" />
        </svg>

        {/* Logo — dim until the arc nears closure, then signal acquired */}
        <div className="splash-acquire relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/coe-ea.png"
            alt=""
            width={120}
            height={120}
            className="h-auto w-[120px]"
          />
        </div>
      </div>

      <div className="mt-7 font-mono text-[9px] uppercase tracking-[0.22em] text-brand-ice/40">
        {label}
        <span className="splash-caret ml-1.5 inline-block h-[9px] w-[5px] translate-y-px bg-brand-cerulean/70" />
      </div>
    </div>
  )
}
