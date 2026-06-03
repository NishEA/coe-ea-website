'use client'

import { CountUp } from '@/components/ui/CountUp'

const ITEMS: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 3,   label: 'Cohorts run' },
  { value: 10,  label: 'Industry 4.0 domains' },
  { value: 13,  label: 'Partners & mentors' },
  { value: 127, label: 'Prototypes developed' },
]

/** Full-width credibility band — the first scroll reveal. Four numbers count
 *  up when the strip enters the viewport. */
export function CredibilityBand() {
  return (
    <section
      aria-label="Programme at a glance"
      className="relative z-10 border-y border-white/[0.06] px-6 py-14 tablet:px-12"
    >
      <ul className="mx-auto flex max-w-[1100px] flex-wrap items-baseline justify-between gap-y-8">
        {ITEMS.map((it, i) => (
          <li key={it.label} className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-display text-[2.4rem] font-bold leading-none tabular-nums text-white tablet:text-[3rem]">
                <CountUp value={it.value} prefix={it.prefix ?? ''} suffix={it.suffix ?? ''} />
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/45">
                {it.label}
              </span>
            </div>
            {i < ITEMS.length - 1 && (
              <span aria-hidden className="ml-4 hidden text-brand-ice/15 tablet:inline">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
