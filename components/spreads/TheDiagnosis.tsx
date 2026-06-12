'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { WaveformLoader } from '@/components/ui/WaveformLoader'
import { OrbitCanvas } from '@/components/ui/OrbitCanvas'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

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

const TAGLINE_WORDS = ['measure', 'diagnose', 'augment'] as const

export function TheDiagnosis() {
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const particleWrapRef = useRef<HTMLDivElement>(null)

  // ── Post-loader GSAP sequence: instrument scan line + tagline decode ──
  // Gated on `ready` so nothing fires before WaveformLoader completes.
  useEffect(() => {
    if (!ready) return
    const section = sectionRef.current
    const scan = scanRef.current
    if (!section || !scan) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1 — oscilloscope calibration sweep: a bright streak races L→R once.
      gsap.fromTo(
        scan,
        { x: -280, opacity: 1 },
        {
          x: () => section.offsetWidth + 80,
          duration: 0.85,
          delay: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(scan, { opacity: 0 })
          },
        },
      )

      // 2 — matrix-decode scramble on the vertical tagline, word by word.
      const words = taglineRef.current?.querySelectorAll<HTMLElement>('[data-scramble]')
      words?.forEach((word, i) => {
        gsap.to(word, {
          duration: 0.45,
          delay: 0.9 + i * 0.22,
          ease: 'none',
          scrambleText: {
            text: TAGLINE_WORDS[i],
            chars: '01·/|—×+▪',
            speed: 0.4,
          },
        })
      })
    })
    return () => mm.revert()
  }, [ready])

  // ── Scroll-driven parallax: particle field recedes at ~70% scroll rate ──
  // Scroll-gated by nature (only acts once the user scrolls), so it can be
  // wired on mount without violating the WaveformLoader gate.
  useEffect(() => {
    const section = sectionRef.current
    const wrap = particleWrapRef.current
    if (!section || !wrap) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(wrap, {
        yPercent: 28,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

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
        ref={sectionRef}
        id="diagnosis"
        aria-label="The Diagnosis — CoE-EA hero"
        className="dark-atmosphere grain relative w-full overflow-hidden"
      >
        <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
        <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />

        {/* Instrument calibration scan line — GSAP sweeps it L→R once after
            the loader completes. opacity-0 at rest; GSAP raises it only
            inside the prefers-reduced-motion: no-preference context. */}
        <div
          ref={scanRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-[31%] z-20 h-px w-[280px] opacity-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,164,228,0.5) 55%, rgba(183,207,232,0.95) 88%, #ffffff 100%)',
            boxShadow:
              '0 0 14px rgba(0,164,228,0.75), 0 0 3px rgba(183,207,232,0.9)',
            willChange: 'transform',
          }}
        />

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
          <div className="relative z-[5] h-[340px] w-full desktop:h-full desktop:min-h-[540px]">
            {/* Mask sits on an inner wrapper (not the column) so the vertical
                tagline isn't masked away. Ellipse radii are 50%/50% with the
                fade completing at 92% — fully transparent at every edge of the
                box, so particles never hard-cut against the rectangular canvas
                boundary. */}
            <div
              ref={particleWrapRef}
              className="absolute inset-0"
              style={{
                maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 92%)',
              }}
            >
              <ParticleField
                animate={ready}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div
              ref={taglineRef}
              className="tagline-vertical pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/20"
            >
              {TAGLINE_WORDS.map((w, i) => (
                <span key={w}>
                  <span data-scramble>{w}</span>
                  {i < TAGLINE_WORDS.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
