'use client'

import { useEffect, useState } from 'react'

const CHAPTERS = [
  { label: 'DIAGNOSE', id: 'diagnosis' },
  { label: 'SHIFT', id: 'resolve' },
  { label: 'INSTRUMENT', id: 'instrument' },
  { label: 'LEDGER', id: 'ledger' },
  { label: 'APPLY', id: 'apply' },
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
      className="pointer-events-none fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center tablet:flex"
    >
      {CHAPTERS.map(({ label }, i) => {
        const isActive = i === activeIdx
        const isPast = activeIdx >= 0 && i < activeIdx
        const num = String(i + 1).padStart(2, '0')

        return (
          <div key={label} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span
                className={`font-mono text-[8px] tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'text-brand-cerulean'
                    : isPast
                    ? 'text-brand-ice/35'
                    : 'text-brand-ice/15'
                }`}
              >
                {num}
              </span>
              <div
                aria-current={isActive ? 'step' : undefined}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2 w-2 bg-brand-cerulean shadow-[0_0_6px_rgba(0,164,228,0.7)]'
                    : isPast
                    ? 'h-1.5 w-1.5 bg-brand-ice/35'
                    : 'h-1.5 w-1.5 bg-brand-ice/15'
                }`}
              />
            </div>
            {i < CHAPTERS.length - 1 && (
              <div
                className={`my-0.5 w-px transition-all duration-500 ${
                  isPast ? 'h-6 bg-brand-ice/25' : 'h-6 bg-brand-ice/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
