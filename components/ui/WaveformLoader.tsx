'use client'

import { useEffect, useState } from 'react'

const BAR_HEIGHTS = [16, 26, 38, 48, 52, 44, 32, 18, 10, 18, 32, 44, 52, 48, 38, 26, 16]
const DELAYS = [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.49, 0.42, 0.35, 0.28, 0.21, 0.14, 0.07, 0]

/**
 * Concept D waveform loader. Shows a symmetric audio-waveform animation for
 * `duration` ms, then fades out and fires `onComplete`. Reduced-motion users
 * skip straight through.
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg-void transition-opacity duration-700 ${
        out ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="waveform">
        {BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}px`, animationDelay: `${DELAYS[i]}s` }}
          />
        ))}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand-ice/40">
        {label}
      </div>
    </div>
  )
}
