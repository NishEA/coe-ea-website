'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { WaveformLoader } from '@/components/ui/WaveformLoader'
import { OrbitCanvas } from '@/components/ui/OrbitCanvas'

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then(m => ({ default: m.ParticleField })),
  {
    ssr: false,
    loading: () => <OrbitCanvas animate={false} className="absolute inset-0 h-full w-full" />,
  },
)

const HEADLINE: { text: string; amber?: boolean; br?: boolean }[] = [
  { text: 'Industry' },
  { text: 'instinct,', br: true },
  { text: 'turned' },
  { text: 'into', br: true },
  { text: 'measured', amber: true },
  { text: 'signal.', amber: true },
]

// Pre-compute per-character stagger offsets across all headline words.
let _cumIdx = 0
const HEADLINE_CHARS = HEADLINE.map(w => {
  const chars = w.text.split('')
  const startIdx = _cumIdx
  _cumIdx += chars.length
  return { ...w, chars, startIdx }
})

export function TheDiagnosis() {
  const [ready, setReady] = useState(false)

  const d = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` })

  return (
    <>
      <style>{`
        .char-rise {
          display: inline-block;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          transform: translateY(0.4em);
          animation: char-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes char-rise {
          to { opacity: 1; clip-path: inset(0 0 0% 0); transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .char-rise { animation: none; opacity: 1; clip-path: none; transform: none; }
        }
      `}</style>

      <WaveformLoader onComplete={() => setReady(true)} />

      <section
        id="diagnosis"
        aria-label="The Diagnosis — CoE-EA hero"
        className="dark-atmosphere grain relative w-full overflow-hidden"
      >
        <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
        <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />

        <div className="relative z-10 grid min-h-dvh grid-cols-1 items-center gap-10 px-6 pb-16 pt-8 tablet:px-12 desktop:min-h-[calc(100dvh-150px)] desktop:grid-cols-[42%_58%] desktop:gap-8 desktop:px-12">
          {/* ── LEFT — badge + headline + body + CTAs ── */}
          <div className="z-10 flex flex-col gap-5">
            <p
              className="fade-up flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-operational"
              style={d(ready ? 1.0 : 99)}
            >
              <span className="op-dot" aria-hidden />
              System Operational · Centre Active · Cohort 3 Open
            </p>

            <h1 className="[text-wrap:balance] font-display text-[clamp(38px,4.5vw,64px)] font-bold leading-[1.06] tracking-[-0.025em] text-white">
              {HEADLINE_CHARS.map((w, wi) => (
                <span key={wi}>
                  {w.chars.map((ch, ci) => (
                    <span
                      key={ci}
                      className={`char-rise${w.amber ? ' text-amber' : ''}`}
                      style={{
                        ...d(ready ? 0.35 + (w.startIdx + ci) * 0.035 : 99),
                        ...(w.amber ? { textShadow: '0 0 28px rgba(212,168,83,0.45)' } : {}),
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                  {w.br ? <br /> : ' '}
                </span>
              ))}
            </h1>

            <p
              className="fade-up max-w-[360px] font-body text-[16px] leading-[1.72] text-white/50"
              style={d(ready ? 0.9 : 99)}
            >
              CoE-EA instruments, diagnoses, and augments India&rsquo;s
              infrastructure across ten Industry&nbsp;4.0 domains. Every claim
              citation-bound.
            </p>

            <div className="fade-up mt-1 flex flex-col gap-2.5 tablet:flex-row tablet:flex-wrap" style={d(ready ? 1.5 : 99)}>
              <a
                href="/apply"
                className="rounded-[5px] bg-amber px-6 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-bg-void transition shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_1px_3px_rgba(0,0,0,.35)] hover:bg-amber-hi hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_4px_16px_rgba(212,168,83,.4),0_1px_3px_rgba(0,0,0,.35)] active:translate-y-px active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void tablet:py-2.5 tablet:text-left"
              >
                Apply to Cohort 3 →
              </a>
              <a
                href="#resolve"
                className="rounded-[5px] border border-brand-ice/30 px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ice transition shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_1px_2px_rgba(0,0,0,.4)] hover:border-brand-cerulean hover:text-brand-cerulean hover:-translate-y-px active:translate-y-px active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean tablet:py-2.5 tablet:text-left"
              >
                See the shift ↓
              </a>
            </div>

            <ul
              className="fade-up flex flex-wrap gap-x-5 gap-y-2"
              style={d(ready ? 1.8 : 99)}
              aria-label="Programme highlights"
            >
              {[
                'up to ₹25L seed grant',
                '16,000 sq ft centre',
                '1–3% equity',
              ].map(item => (
                <li key={item} className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-ice/55">
                  <span aria-hidden className="h-1 w-1 flex-shrink-0 rounded-sm bg-amber" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — cinematic particle field ── */}
          <div
            className="relative z-[5] h-[340px] w-full desktop:h-full desktop:min-h-[540px]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 80% at 55% 50%, black 55%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 55% 50%, black 55%, transparent 100%)',
            }}
          >
            <ParticleField
              animate={ready}
              className="absolute inset-0 h-full w-full"
            />
            <div className="tagline-vertical pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
              measure · diagnose · augment
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
