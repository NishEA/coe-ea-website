'use client'

import { useEffect, useState } from 'react'

const DOT_DELAYS = [0, 0.16, 0.32]

/**
 * Loading splash — the CoE-EA logo as centrepiece, breathing via
 * `splashPulse`, with three staggered cerulean dots (`splashDot`) and a
 * thin calibration line that fills over `duration` ms. Feels like an
 * instrument powering up rather than a spinner. After `duration` ms it
 * fades out and fires `onComplete`; reduced-motion users skip straight
 * through (CSS animations are also paused via the reduced-motion block
 * in globals.css — .splash-logo / .splash-dot / .splash-line).
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
    >
      <div className="splash-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/coe-ea.png"
          alt=""
          width={120}
          height={120}
          className="h-auto w-[120px]"
        />
      </div>

      <div className="mt-6 flex items-center gap-2.5">
        {DOT_DELAYS.map((d) => (
          <span
            key={d}
            className="splash-dot"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-brand-ice/40">
        {label}
      </div>

      <div className="mt-5 h-px w-40 overflow-hidden bg-brand-ice/10">
        <div
          className="splash-line"
          style={{ '--splash-duration': `${duration}ms` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
