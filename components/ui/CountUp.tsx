'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `value` using requestAnimationFrame. Starts when the
 * element scrolls into view (IntersectionObserver), or immediately if
 * `start` is true. Honours prefers-reduced-motion by jumping to the final
 * value. `format` lets callers add thousands separators etc.
 */
export function CountUp({
  value,
  duration = 1400,
  start,
  prefix = '',
  suffix = '',
  format,
  className = '',
}: {
  value: number
  duration?: number
  start?: boolean
  prefix?: string
  suffix?: string
  format?: (n: number) => string
  className?: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = () => {
      if (ran.current) return
      ran.current = true
      if (reduced) {
        setDisplay(value)
        return
      }
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(value * eased)
        if (p < 1) requestAnimationFrame(tick)
        else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }

    if (start) {
      animate()
      return
    }

    const el = ref.current
    // Environments without IntersectionObserver (e.g. jsdom in tests) just
    // resolve to the final value immediately.
    if (!el || typeof IntersectionObserver === 'undefined') {
      animate()
      return
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration, start])

  const rounded = Math.round(display)
  const text = format ? format(rounded) : String(rounded)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
