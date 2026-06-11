'use client'

import { useRef, useEffect, useState } from 'react'
import { CountUp } from '@/components/ui/CountUp'

const ITEMS = [
  { value: 3,   suffix: '',   label: 'Cohorts run',              sublabel: 'Since 2023' },
  { value: 10,  suffix: '',   label: 'Industry 4.0 domains',     sublabel: 'IoT to AI' },
  { value: 13,  suffix: '+',  label: 'Partners',                 sublabel: 'HPE · KITS · STPI' },
  { value: 127, suffix: '',   label: 'Prototypes developed',     sublabel: 'Cohort 1–2' },
]

/** Full-width credibility band — dark glass shelf that stays dark after the hero.
 *  Replaces the old cream break; uses glass-shelf + dark-atmosphere + grain. */
export function CredibilityBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Programme at a glance"
      className="glass-shelf dark-atmosphere grain relative z-10 border-b border-brand-cerulean/20 px-6 py-14 tablet:px-12 desktop:px-20"
    >
      <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-6 gap-y-10 tablet:grid-cols-4">
        {ITEMS.map((it, i) => (
          <li key={it.label} className="flex flex-col gap-1">
            {/* Number + suffix row */}
            <div className="flex items-baseline gap-1">
              <span
                className="font-display text-[2.4rem] font-bold leading-none tabular-nums text-brand-cerulean"
                style={{ textShadow: '0 0 18px rgba(0,164,228,0.55)' }}
              >
                <CountUp value={it.value} duration={1400} spring />
              </span>
              {it.suffix && (
                <span className="font-mono text-[1rem] leading-none text-brand-cerulean/60">
                  {it.suffix}
                </span>
              )}
            </div>

            {/* Sparkline — draws in on scroll */}
            <svg
              width="48"
              height="14"
              viewBox="0 0 48 14"
              fill="none"
              className="mt-1 opacity-40"
              aria-hidden="true"
            >
              <path
                d="M0 10 L12 6 L24 8 L36 3 L48 7"
                stroke="#00a4e4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 60,
                  strokeDashoffset: inView ? 0 : 60,
                  transition: `stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                }}
              />
            </svg>

            {/* Label */}
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/60">
              {it.label}
            </span>

            {/* Sublabel */}
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-ice/30">
              {it.sublabel}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
