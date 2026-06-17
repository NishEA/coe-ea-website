'use client'

import { useEffect, useRef, useState } from 'react'

const BEFORE_ITEMS = [
  { text: 'OEE 43.7%',         top: '8%',  left: '7%',  delay: '0s'    },
  { text: '??:?? downtime',    top: '19%', left: '53%', delay: '0.13s' },
  { text: 'defect 6.8%',       top: '32%', left: '16%', delay: '0.27s' },
  { text: '₹14.2/unit',        top: '28%', left: '67%', delay: '0.41s' },
  { text: 'unlogged',          top: '47%', left: '39%', delay: '0.08s' },
  { text: '11.4 hrs/wk lost',  top: '56%', left: '8%',  delay: '0.34s' },
  { text: 'batch drift +3.1σ', top: '64%', left: '57%', delay: '0.19s' },
  { text: 'manual readout',    top: '75%', left: '21%', delay: '0.45s' },
  { text: 'NO SIGNAL',         top: '85%', left: '50%', delay: '0.02s' },
  { text: '±??',               top: '41%', left: '75%', delay: '0.29s' },
]

const AFTER_ROWS = [
  { metric: 'OEE',             value: '87.2%',  delay: '0.05s' },
  { metric: 'Downtime / wk',  value: '1.2 hrs', delay: '0.15s' },
  { metric: 'Defect rate',    value: '0.4%',    delay: '0.25s' },
  { metric: 'Energy / unit',  value: '₹8.1',    delay: '0.35s' },
  { metric: 'Signal quality', value: '99.6%',   delay: '0.45s' },
]

export function TheResolve() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onMQ)
    return () => mq.removeEventListener('change', onMQ)
  }, [])

  useEffect(() => {
    if (isMobile) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(0.5)
      return
    }
    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      if (sectionHeight <= 0) return
      const scrolled = Math.max(0, -rect.top)
      setProgress(Math.min(1, scrolled / sectionHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const scanX = progress * 50
  const afterRevealed = progress >= 0.5
  const scanPct = Math.round(progress * 100).toString().padStart(3, '0')

  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="resolve"
        aria-label="The Shift — Indian industry before and after instrumentation"
        className="dark-atmosphere grain relative w-full px-6 pb-20 pt-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Resolve · Calibration Sequence
        </p>
        <h2 className="mt-4 font-display text-[clamp(28px,7vw,44px)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
          The Shift
        </h2>
        <p className="mt-4 max-w-xs font-mono text-[12px] leading-relaxed tracking-[0.06em] text-brand-ice/65">
          Two states of the same infrastructure — instinct, then instrumentation.
        </p>

        <div role="group" aria-label="Toggle before and after" className="mt-8 inline-flex rounded-full border border-brand-ice/15 p-0.5">
          <button
            type="button"
            aria-pressed={!showAfter}
            onClick={() => setShowAfter(false)}
            className={`rounded-full px-5 py-2 font-mono text-[12px] uppercase tracking-[0.16em] transition ${!showAfter ? 'bg-amber/20 text-amber' : 'text-brand-ice/65 hover:text-white'}`}
          >
            Before
          </button>
          <button
            type="button"
            aria-pressed={showAfter}
            onClick={() => setShowAfter(true)}
            className={`rounded-full px-5 py-2 font-mono text-[12px] uppercase tracking-[0.16em] transition ${showAfter ? 'bg-brand-cerulean/20 text-brand-cerulean' : 'text-brand-ice/65 hover:text-white'}`}
          >
            After
          </button>
        </div>

        {!showAfter ? (
          <div className="mt-6 rounded-xl border border-amber/20 bg-gradient-to-br from-amber/10 via-transparent to-transparent p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Before Instrumentation</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {BEFORE_ITEMS.map(item => (
                <span key={item.text} className="font-mono text-[12px] text-amber/60">{item.text}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-brand-cerulean/20 bg-gradient-to-br from-brand-cerulean/10 via-transparent to-transparent p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-cerulean-hot)]">After CoE-EA</p>
            <div className="flex flex-col gap-4">
              {AFTER_ROWS.map(row => (
                <div key={row.metric} className="grid items-baseline gap-4 border-b border-brand-cerulean/10 pb-3" style={{ gridTemplateColumns: '1fr auto 20px' }}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ice/65">{row.metric}</span>
                  <span className="font-display text-[18px] font-bold text-white">{row.value}</span>
                  <span className="font-mono text-[13px]" style={{ color: 'var(--color-cerulean-hot)', textShadow: '0 0 10px rgba(61,220,255,0.7)' }}>✓</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <>
      <style>{`
        @keyframes cal-jitter {
          0%,100% { transform: translate(0px,  0px); }
          25%      { transform: translate(2px, -2px); }
          50%      { transform: translate(-2px, 1px); }
          75%      { transform: translate(1px,  2px); }
        }
        .cal-scatter-item { animation: cal-jitter 0.9s steps(2) infinite; }
        @media (prefers-reduced-motion: reduce) { .cal-scatter-item { animation: none; } }
      `}</style>

      <section
        ref={sectionRef}
        id="resolve"
        aria-label="The Shift — Indian industry before and after instrumentation"
        className="dark-atmosphere grain relative w-full tablet:min-h-[200vh]"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center px-8 tablet:px-16">

          <div className="mb-6 flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
              The Resolve · Calibration Sequence
            </p>
            <p aria-hidden className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/30">
              SCAN {scanPct}%
            </p>
          </div>

          <h2 className="mb-2 font-display text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
            The Shift
          </h2>
          <p className="mb-8 max-w-md font-mono text-[12px] leading-relaxed tracking-[0.06em] text-brand-ice/65">
            Two states of the same infrastructure — instinct, then instrumentation.
          </p>

          {/* Stage */}
          <div className="relative h-[380px] max-h-[48vh] overflow-hidden rounded-xl border border-brand-ice/[0.08]">

            {/* Before half — amber scattered chaos */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 overflow-hidden px-10 py-8"
              style={{ background: 'linear-gradient(135deg,rgba(212,168,83,.12),rgba(212,168,83,.03) 60%),rgba(3,6,28,.5)' }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">Before Instrumentation</p>
              <p className="sr-only">Before instrumentation data: OEE 43.7%, unknown downtime, defect rate 6.8%, ₹14.2 per unit energy cost, 11.4 hours per week lost, batch drift +3.1 sigma, manual readouts, no signal.</p>
              <div aria-hidden className="relative mt-3 h-[calc(100%-32px)]">
                {BEFORE_ITEMS.map(item => (
                  <span
                    key={item.text}
                    className="cal-scatter-item absolute whitespace-nowrap font-mono text-[13px] text-amber/60"
                    style={{
                      top: item.top,
                      left: item.left,
                      animationDelay: item.delay,
                      opacity: progress > 0.7 ? Math.max(0.05, 1 - (progress - 0.7) * 3) : 0.6,
                      transition: 'opacity 0.5s',
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* After half — cerulean clean rows, clip-reveals as scan crosses */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 overflow-hidden px-10 py-8"
              style={{
                background: 'linear-gradient(225deg,rgba(0,164,228,.13),rgba(0,164,228,.03) 60%),rgba(3,6,28,.5)',
                clipPath: `inset(0 ${afterRevealed ? '0%' : '100%'} 0 0)`,
                transition: 'clip-path 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--color-cerulean-hot)' }}>
                After CoE-EA
              </p>
              <div className="mt-4 flex flex-col gap-[14px]">
                {AFTER_ROWS.map(row => (
                  <div
                    key={row.metric}
                    className="grid items-baseline gap-4 border-b pb-3"
                    style={{ gridTemplateColumns: '1fr auto 26px', borderColor: 'rgba(0,164,228,0.14)' }}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-ice/65">
                      {row.metric}
                    </span>
                    <span className="font-display text-[20px] font-bold text-white">
                      {row.value}
                    </span>
                    <span
                      className="font-mono text-[15px]"
                      style={{
                        color: 'var(--color-cerulean-hot)',
                        textShadow: '0 0 10px rgba(61,220,255,0.7)',
                        display: 'inline-block',
                        transform: afterRevealed ? 'scale(1)' : 'scale(0)',
                        opacity: afterRevealed ? 1 : 0,
                        transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${row.delay}, opacity 0.4s ${row.delay}`,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cerulean scan line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 z-20 w-[2px]"
              style={{
                left: `${scanX}%`,
                background: 'var(--color-cerulean-hot)',
                boxShadow: '0 0 12px rgba(61,220,255,0.8),0 0 40px rgba(61,220,255,0.3)',
              }}
            >
              <span
                className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-cerulean-hot)' }}
              >
                {scanPct}%
              </span>
            </div>

            {/* Centre divider */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-brand-ice/10" />
          </div>

          {/* Bottom copy — fades in at scan complete */}
          <p
            className="mt-6 max-w-lg font-mono text-[11px] leading-relaxed tracking-[0.05em] text-brand-ice/65 transition-opacity duration-700"
            style={{ opacity: progress > 0.9 ? 1 : 0 }}
          >
            CoE-EA turns instinct into measured efficiency — every claim citation-bound,
            every domain diagnosed across ten Industry&nbsp;4.0 verticals.
          </p>
        </div>
      </section>
    </>
  )
}
