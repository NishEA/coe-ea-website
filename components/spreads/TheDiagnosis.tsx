'use client'

import { useEffect, useState } from 'react'
import { useField } from '@/components/field/FieldProvider'

const COPY = [
  'Your infrastructure is already talking.',
  "Most systems can't hear it.",
  'The data was always there. Legacy was blind to it.',
]

export function TheDiagnosis() {
  const { setPointer, resolvedDomains, unrevealedCount } = useField()
  const [lines, setLines] = useState(1)

  useEffect(() => {
    const revealed = 10 - unrevealedCount
    if (revealed >= 2) setLines(3)
    else if (revealed >= 1) setLines(2)
  }, [unrevealedCount])

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [setPointer])

  const ctaActive = resolvedDomains.size >= 2

  return (
    <section
      id="diagnosis"
      aria-label="The Diagnosis — interactive infrastructure diagnostic"
      className="relative flex h-dvh w-full flex-col items-start justify-end p-8 tablet:p-16"
    >
      <h1 className="sr-only">
        Centre of Excellence on Efficiency Augmentation — AI diagnostic intelligence for infrastructure
      </h1>

      <div className="mb-8 max-w-xl space-y-3" aria-live="polite">
        {COPY.slice(0, lines).map((line, i) => (
          <p key={i} className="font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
            {line}
          </p>
        ))}
      </div>

      <a
        href="#apply"
        className={`font-mono text-[13px] uppercase tracking-[0.14em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean ${
          ctaActive ? 'text-electric-spark underline underline-offset-4' : 'text-brand-ice/50'
        }`}
        aria-label="Show us where it breaks — apply to CoE-EA"
      >
        Show us where it breaks →
      </a>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-navy/40" aria-hidden="true">
        See the work ↓
      </p>
    </section>
  )
}
