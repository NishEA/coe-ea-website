'use client'

import { useEffect, useRef, useState } from 'react'

const JITTER_CSS = `
@keyframes jitter { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-1px)} 75%{transform:translateX(1px)} }
.metric-jitter { animation: jitter 0.12s linear infinite; }
@media (max-width: 767px) { .metric-jitter { animation: none; } }
@media (prefers-reduced-motion: reduce) { .metric-jitter { animation: none; } }
`

const BEFORE_METRICS = [
  { label: 'MAINT CYCLE', value: 'SCHEDULED', struck: true },
  { label: 'GRID LOSS', value: '38%', struck: true },
  { label: 'SIGNAL', value: 'UNKNOWN', struck: false },
]

const AFTER_METRICS = [
  { label: 'MAINT CYCLE', value: 'PREDICTIVE' },
  { label: 'EFFICIENCY', value: '+47%' },
  { label: 'SIGNAL', value: 'MEASURED' },
]

export function TheResolve() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMobile = () => setIsMobile(mqMobile.matches)
    syncMobile()
    mqMobile.addEventListener('change', syncMobile)

    if (mqReduce.matches) {
      // Reduced motion: show both panels fully, no scroll listener.
      setReducedMotion(true)
      setProgress(0.5)
      return () => mqMobile.removeEventListener('change', syncMobile)
    }

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      if (sectionHeight <= 0) return
      const scrolled = Math.max(0, -rect.top)
      setProgress(Math.min(1, scrolled / sectionHeight))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      mqMobile.removeEventListener('change', syncMobile)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scanActive = !isMobile
  const locked = isMobile ? showAfter : progress >= 0.5
  const jittering = scanActive && !reducedMotion && progress < 0.8
  const scanLabel = `SCAN ${Math.round(progress * 100)
    .toString()
    .padStart(3, '0')}%`
  const afterClip = scanActive
    ? { clipPath: `inset(0 ${Math.max(0, (0.5 - progress) * 200)}% 0 0)` }
    : undefined

  return (
    <section
      ref={sectionRef}
      id="resolve"
      aria-label="The Shift — Indian industry before and after instrumentation"
      className="dark-atmosphere grain relative w-full tablet:min-h-[180vh]"
    >
      <style>{JITTER_CSS}</style>

      {/* Sticky inner panel — pins for the full 180vh scroll on desktop */}
      <div className="relative z-[2] px-8 py-24 tablet:sticky tablet:top-0 tablet:flex tablet:h-screen tablet:flex-col tablet:justify-center tablet:px-16 tablet:py-0">
        <div className="mb-12 flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">The Shift</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">Before · After</p>
        </div>

        <p className="mb-12 font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
          Two states of the same infrastructure — instinct, then instrumentation.
        </p>

        {/* Mobile: static before/after toggle — no scroll mechanic */}
        <div className="mb-8 flex gap-px border border-brand-ice/10 bg-brand-ice/10 tablet:hidden" role="group" aria-label="Toggle between before and after states">
          <button
            type="button"
            onClick={() => setShowAfter(false)}
            aria-pressed={!showAfter}
            className={`flex-1 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
              !showAfter ? 'bg-bg-midnight text-legacy' : 'bg-transparent text-brand-ice/40'
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setShowAfter(true)}
            aria-pressed={showAfter}
            className={`flex-1 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
              showAfter ? 'bg-bg-midnight text-brand-cerulean' : 'bg-transparent text-brand-ice/40'
            }`}
          >
            After
          </button>
        </div>

        {/* Split panel */}
        <div className="relative grid grid-cols-1 gap-px border border-brand-ice/10 bg-brand-ice/10 tablet:grid-cols-[1fr_1px_1fr]">
          {/* Before panel — legacy */}
          <div
            className={`bg-bg-midnight p-8 [background:radial-gradient(120%_120%_at_0_50%,rgba(224,137,74,.12),transparent_60%)] ${
              showAfter ? 'hidden tablet:block' : ''
            }`}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-legacy">Before — Legacy state</p>
            <p className="font-display text-[1.5rem] font-light leading-[1.15] text-legacy-warm tablet:text-[1.85rem]">
              Indian industry runs on instinct: fixed-schedule maintenance, blind grids, 38% water lost to leaks no one can see.
            </p>
            <ul className="mt-8 space-y-2">
              {BEFORE_METRICS.map((m) => (
                <li
                  key={m.label}
                  className={`font-mono text-[11px] tracking-[0.08em] text-legacy/60 ${jittering ? 'metric-jitter' : ''}`}
                >
                  {m.label}: {m.struck ? <s>{m.value}</s> : m.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Center divider */}
          <div aria-hidden className="hidden bg-gradient-to-b from-transparent via-brand-cerulean/40 to-transparent tablet:block" />

          {/* After panel — instrumented, clip-path reveals as the scan reaches it */}
          <div
            style={afterClip}
            className={`bg-bg-midnight p-8 text-right [background:radial-gradient(120%_120%_at_100%_50%,rgba(0,164,228,.12),transparent_60%)] ${
              !showAfter ? 'hidden tablet:block' : ''
            }`}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean">After — Instrumented</p>
            <p className="font-display text-[1.5rem] font-light leading-[1.15] text-resolve-cool tablet:text-[1.85rem]">
              CoE-EA turns that signal into measured efficiency — every claim bound to a citation, every domain diagnosed.
            </p>
            <ul className="mt-8 space-y-2">
              {AFTER_METRICS.map((m) => (
                <li key={m.label} className="font-mono text-[11px] tracking-[0.08em] text-resolve-cool/70">
                  {m.label}: {m.value}{' '}
                  <span
                    aria-hidden
                    className={`inline-block text-brand-cerulean ${locked ? 'scan-reveal' : 'opacity-0'}`}
                  >
                    ✓
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scan line — desktop only, driven by scroll progress (0% → 50% = left edge → center) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-[3] hidden tablet:block"
            style={{ left: `${progress * 50}%` }}
          >
            <p className="absolute -top-6 left-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-cerulean-hot">
              {scanLabel}
            </p>
            <div
              className="h-full w-[2px]"
              style={{
                background: '#3ddcff',
                boxShadow: '0 0 12px rgba(61,220,255,0.8), 0 0 40px rgba(61,220,255,0.3)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
