'use client'

import { useEffect } from 'react'
import { useField } from '@/components/field/FieldProvider'

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
      className="relative flex h-dvh w-full items-center"
    >
      {/* Status badge — centered below fixed nav */}
      <div className="absolute left-1/2 top-24 -translate-x-1/2 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-ice/50">
          <span className="text-operational">●</span>
          {' '}CENTRE ACTIVE · INSTRUMENTS DEPLOYED · 52 STARTUPS
        </p>
      </div>

      {/* LEFT column — problem statement */}
      <div className="absolute left-8 top-1/2 max-w-[30vw] -translate-y-1/2 space-y-2 tablet:left-16">
        <p className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-brand-ice desktop:text-5xl">
          Indian industry<br />runs on instinct
        </p>
        <p className="font-display text-3xl font-light leading-[1.1] tracking-tight text-brand-ice/50 desktop:text-5xl">
          where it could<br />run on signal.
        </p>
      </div>

      {/* RIGHT column — solution statement */}
      <div className="absolute right-8 top-1/2 max-w-[30vw] -translate-y-1/2 space-y-2 text-right tablet:right-16">
        <p className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-brand-ice desktop:text-5xl">
          CoE-EA is<br />the instrument
        </p>
        <p className="font-display text-3xl font-light leading-[1.1] tracking-tight text-brand-ice/50 desktop:text-5xl">
          that turns signal<br />into efficiency.
        </p>
      </div>

      {/* Bottom hint + CTA */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/35">
          Hold any node 700ms to resolve
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
      </div>

      {/* Scroll hint */}
      <p
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ice/25"
        aria-hidden="true"
      >
        Scroll to explore ↓
      </p>
    </section>
  )
}
