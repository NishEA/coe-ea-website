'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CHAPTERS = [
  { label: 'Diagnose', id: 'diagnosis' },
  { label: 'Shift', id: 'resolve' },
  { label: 'Instrument', id: 'instrument' },
  { label: 'Ledger', id: 'ledger' },
  { label: 'Apply', id: 'apply' },
] as const

export function ChapterProgress() {
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    CHAPTERS.forEach(({ id }, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <nav
      aria-label="Chapter progress"
      className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 desktop:flex flex-col items-center gap-3"
    >
      {/* Connecting rail behind dots */}
      <div
        aria-hidden="true"
        className="absolute inset-x-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-brand-ice/10"
      />

      {CHAPTERS.map(({ label, id }, i) => {
        const isActive = i === activeIdx

        return (
          <Link
            key={label}
            href={`#${id}`}
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? 'step' : undefined}
            title={label}
            className="group relative flex items-center justify-center rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-1"
          >
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-brand-cerulean shadow-[0_0_8px_rgba(0,164,228,0.8)]'
                  : 'w-1.5 h-1.5 bg-brand-ice/20 group-hover:bg-brand-ice/40'
              }`}
            />

            {/* Hover label — appears to the left of the dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-brand-ice/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
