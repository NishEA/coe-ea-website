'use client'

import { useEffect, useState } from 'react'
import { useField } from '@/components/field/FieldProvider'

const COPY = [
  'Your infrastructure is already talking.',
  "Most systems can't hear it.",
  'The data was always there. Legacy was blind to it.',
]

export function TheDiagnosis() {
  const { setPointer, resolvedDomains } = useField()

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [setPointer])

  const ctaActive = resolvedDomains.size >= 1

  return (
    <section
      id="diagnosis"
      aria-label="The Diagnosis — interactive infrastructure diagnostic"
      className="relative flex h-dvh w-full flex-col items-start justify-end p-8 tablet:p-16"
    >
      <h1 className="mb-2 font-display text-[11px] uppercase tracking-[0.22em] text-brand-cerulean">
        Centre of Excellence on Efficiency Augmentation
      </h1>

      <div className="mb-8 max-w-xl space-y-3">
        {COPY.map((line, i) => (
          <p key={i} className="font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
            {line}
          </p>
        ))}
      </div>

      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/40">
        Move your cursor across the field to diagnose the ten domains
      </p>

      <a
        href="#apply"
        className={`cursor-pointer font-mono text-[13px] uppercase tracking-[0.14em] transition-all duration-500 outline-none ring-brand-cerulean ring-offset-2 focus:ring-2 focus-visible:ring-2 ${
          ctaActive
            ? 'text-brand-cerulean underline underline-offset-4'
            : 'text-brand-ice/60 hover:text-brand-ice'
        }`}
        aria-label="Show us where it breaks — apply to CoE-EA"
      >
        Show us where it breaks →
      </a>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ice/25" aria-hidden="true">
        Scroll to explore ↓
      </p>
    </section>
  )
}
