'use client'

import { useEffect, useState } from 'react'
import { useField } from '@/components/field/FieldProvider'
import { WaveformLoader } from '@/components/ui/WaveformLoader'
import { OrbitCanvas } from '@/components/ui/OrbitCanvas'
import { InstrumentCubes } from '@/components/ui/InstrumentCubes'

/** Headline split into words for the staggered word-by-word rise. The key
 *  phrase ("measured signal.") is amber. */
const HEADLINE: { text: string; amber?: boolean; br?: boolean }[] = [
  { text: 'Industry' },
  { text: 'instinct,', br: true },
  { text: 'turned' },
  { text: 'into', br: true },
  { text: 'measured', amber: true },
  { text: 'signal.', amber: true },
]

export function TheDiagnosis() {
  const { setPointer, resolvedDomains } = useField()
  // `ready` flips when the loader finishes — it gates the staged reveal.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY })
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') setPointer({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [setPointer])

  const ctaActive = resolvedDomains.size >= 1

  // Hint block stays hidden until first scroll — keeps hero viewport clean on load.
  const [hintVisible, setHintVisible] = useState(false)
  useEffect(() => {
    const show = () => setHintVisible(true)
    window.addEventListener('scroll', show, { once: true, passive: true })
    return () => window.removeEventListener('scroll', show)
  }, [])

  // Animation-delay helper (seconds) for staged reveal after loader completes.
  const d = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` })

  return (
    <>
      <WaveformLoader onComplete={() => setReady(true)} />

      <section
        id="diagnosis"
        aria-label="The Diagnosis — CoE-EA hero"
        className="relative w-full overflow-hidden"
      >
        {/* Corner brackets */}
        <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
        <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />

        <div className="relative z-10 grid min-h-[calc(100dvh-150px)] grid-cols-1 items-center gap-10 px-6 pb-16 pt-8 tablet:px-12 desktop:grid-cols-[42%_58%] desktop:gap-8 desktop:px-12">
          {/* ── LEFT — badge + headline + body + CTAs ── */}
          <div className="z-10 flex flex-col gap-5">
            <p
              className="fade-up flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-operational"
              style={d(ready ? 1.0 : 99)}
            >
              <span className="op-dot" aria-hidden />
              System Operational · Centre Active · Cohort 3 Open
            </p>

            <h1 className="font-display text-[clamp(32px,3.8vw,54px)] font-bold leading-[1.06] tracking-[-0.025em] text-white">
              {HEADLINE.map((w, i) => (
                <span key={i}>
                  <span
                    className="word-rise"
                    style={d(ready ? 0.35 + i * 0.08 : 99)}
                  >
                    <span className={w.amber ? 'text-amber' : undefined}>{w.text}</span>
                  </span>
                  {w.br ? <br /> : ' '}
                </span>
              ))}
            </h1>

            <p
              className="fade-up max-w-[360px] font-body text-[14.5px] leading-[1.72] text-white/50"
              style={d(ready ? 0.9 : 99)}
            >
              CoE-EA instruments, diagnoses, and augments India&rsquo;s
              infrastructure across ten Industry&nbsp;4.0 domains. Every claim
              citation-bound.
            </p>

            <div className="fade-up mt-1 flex flex-wrap gap-2.5" style={d(ready ? 1.5 : 99)}>
              <a
                href="/apply"
                className="rounded-[5px] bg-amber px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-bg-void transition hover:bg-amber-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
              >
                Apply to Cohort 3 →
              </a>
              <a
                href="#resolve"
                className="rounded-[5px] border border-brand-ice/30 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ice transition hover:border-brand-cerulean hover:text-accent-spark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
              >
                See the Diagnostic ↓
              </a>
            </div>
          </div>

          {/* ── CENTRE — orbit canvas + cube cluster ── */}
          <div className="relative z-[5] mx-auto hidden h-[460px] w-full items-center justify-center desktop:flex">
            <OrbitCanvas
              animate={ready}
              className="absolute inset-0 h-full w-full"
            />
            <div className="cube-materialise" style={d(ready ? 1.2 : 99)}>
              <InstrumentCubes />
            </div>
            <div className="tagline-vertical absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
              measure · diagnose · augment
            </div>
          </div>
        </div>

        {/* Diagnostic hint + state CTA — hidden until first scroll */}
        <div className={`relative z-10 mx-auto -mt-6 mb-10 max-w-md px-6 text-center transition-opacity duration-700 ${hintVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/35">
            Tap · hold any node to resolve
          </p>
          <a
            href="#apply"
            className={`cursor-pointer font-mono text-[12px] uppercase tracking-[0.14em] outline-none ring-brand-cerulean ring-offset-2 transition-all duration-500 focus:ring-2 focus-visible:ring-2 ${
              ctaActive
                ? 'text-brand-cerulean underline underline-offset-4'
                : 'text-brand-ice/55 hover:text-brand-ice'
            }`}
            aria-label="Show us where it breaks — apply to CoE-EA"
          >
            Show us where it breaks →
          </a>
        </div>
      </section>
    </>
  )
}
