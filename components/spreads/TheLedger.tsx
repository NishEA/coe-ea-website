'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'
import { CountUp } from '@/components/ui/CountUp'
import type { SanityImpactMetric, SanityPartner } from '@/lib/sanity/fetchers'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TheLedgerProps {
  metrics?: SanityImpactMetric[]
  partners?: SanityPartner[]
}

function splitValue(value: string): { num: string; unit: string | null } {
  const m = value.match(/^([₹$]?\s?[\d.,–-]+)\s*(.*)$/)
  if (!m) return { num: value, unit: null }
  const unit = m[2].trim()
  return { num: m[1].trim(), unit: unit.length > 0 ? unit : null }
}

const breathClasses = ['idle-breath-a', 'idle-breath-b', 'idle-breath-c', 'idle-breath-d'] as const

export function TheLedger({ metrics, partners }: TheLedgerProps) {
  const displayMetrics = metrics && metrics.length > 0 ? metrics : IMPACT_METRICS
  const displayPartners = partners && partners.some(p => p.logoUrl) ? partners : null

  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // ── GSAP ScrollTrigger reveal: heading wipe + clip-path card stagger ──
  // Cells are wrapper divs (data-ledger-cell) so the GSAP transform never
  // fights the inner glass-panel's mouse-tilt inline transform.
  useEffect(() => {
    const grid = gridRef.current
    const heading = headingRef.current
    if (!grid) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (heading) {
        gsap.fromTo(
          heading,
          { clipPath: 'inset(0% 0% 100% 0%)', y: 18, opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
            onComplete: () => {
              gsap.set(heading, { clearProps: 'all' })
            },
          },
        )
      }

      const cells = gsap.utils.toArray<HTMLElement>('[data-ledger-cell]', grid)
      if (cells.length === 0) return
      gsap.fromTo(
        cells,
        { clipPath: 'inset(0% 0% 100% 0%)', y: 26, opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
          onComplete: () => {
            gsap.set(cells, { clearProps: 'clipPath,transform,opacity' })
          },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="ledger"
      aria-label="The Ledger — CoE-EA outcomes and partnerships"
      className="dark-atmosphere grain relative w-full px-6 py-24 tablet:px-12 desktop:px-20"
    >
      {/* Corner brackets */}
      <span aria-hidden className="pointer-events-none absolute left-5 top-24 h-6 w-6 border-l border-t border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute right-5 top-24 h-6 w-6 border-r border-t border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-brand-ice/15" />

      <header className="mb-12 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Ledger
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">
          KPI review · Apr 2026
        </span>
      </header>

      <h2
        ref={headingRef}
        className="[text-wrap:balance] mb-14 max-w-2xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white tablet:text-[2.75rem]"
      >
        What the instrument <span className="text-amber">measured</span>.
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-4"
      >
        {displayMetrics.map((m, i) => {
          const { num, unit } = splitValue(m.value)
          const isLead = i === 0
          const breathClass = breathClasses[i % breathClasses.length]
          // Parse a numeric value for CountUp; fall back to rendering raw string
          const numericValue = parseFloat(num.replace(/[^0-9.]/g, ''))
          const numPrefix = num.match(/^([₹$])/) ? num.match(/^([₹$])/)?.[1] ?? '' : ''
          const hasNumeric = !isNaN(numericValue)

          return (
            <div key={m.label} data-ledger-cell>
            <div
              className={`${isLead ? 'glass-panel-lead holo-sheen' : 'glass-panel'} ${breathClass} flex h-full flex-col gap-2 rounded-xl p-5`}
              style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
              }}
            >
              <span
                className={`flex items-baseline gap-1.5 font-display text-[1.75rem] font-bold leading-none tracking-tight tabular-nums tablet:text-[3rem] desktop:text-[3.6rem] ${
                  isLead
                    ? 'text-amber text-glow-amber'
                    : 'text-brand-ice/60'
                }`}
                aria-label={`${m.label}: ${m.value}`}
              >
                {hasNumeric ? (
                  <CountUp
                    value={numericValue}
                    prefix={numPrefix}
                    duration={1600}
                    spring
                  />
                ) : (
                  num
                )}
                {unit && (
                  <span className="font-mono text-[0.9rem] font-normal uppercase tracking-[0.08em] text-brand-ice/45">
                    {unit}
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/55">
                {m.label}
              </span>
            </div>
            </div>
          )
        })}
      </div>

      <div className="mt-20 border-t border-brand-ice/10 pt-10" aria-label="Partner organisations">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/40">
          Partners
        </p>
        <div className="glass-shelf rounded-lg px-5 py-6 tablet:px-10 tablet:py-8">
          <div className="overflow-x-auto pb-1 tablet:overflow-visible">
            <ul
              className="flex min-w-max items-center gap-6 tablet:min-w-0 tablet:flex-wrap tablet:justify-center tablet:gap-x-8 tablet:gap-y-6"
              role="list"
            >
              {displayPartners
                ? displayPartners.map(p => (
                    <li key={p._id} className="flex flex-shrink-0 items-center justify-center tablet:flex-shrink">
                      {p.logoUrl ? (
                        p.useWhiteChip ? (
                          <div className="rounded bg-white px-2.5 py-2">
                            <Image
                              src={p.logoUrl}
                              alt={p.name}
                              width={140}
                              height={56}
                              className="h-10 w-auto max-w-[100px] object-contain tablet:h-12 tablet:max-w-[120px]"
                            />
                          </div>
                        ) : (
                          <Image
                            src={p.logoUrl}
                            alt={p.name}
                            width={160}
                            height={56}
                            className="h-10 w-auto max-w-[110px] object-contain tablet:h-12 tablet:max-w-[140px]"
                          />
                        )
                      ) : (
                        <span className="font-mono text-[13px] tracking-[0.06em] text-brand-ice/60">
                          {p.name}
                        </span>
                      )}
                    </li>
                  ))
                : PARTNERS.map(p => (
                    <li key={p.name} className="flex flex-shrink-0 items-center justify-center tablet:flex-shrink">
                      {p.logoSrc ? (
                        p.chip ? (
                          <div className="rounded bg-white px-2.5 py-2">
                            <Image
                              src={p.logoSrc}
                              alt={p.name}
                              width={140}
                              height={56}
                              className="h-10 w-auto max-w-[100px] object-contain tablet:h-12 tablet:max-w-[120px]"
                            />
                          </div>
                        ) : (
                          <Image
                            src={p.logoSrc}
                            alt={p.name}
                            width={160}
                            height={56}
                            className="h-10 w-auto max-w-[110px] object-contain tablet:h-12 tablet:max-w-[140px]"
                          />
                        )
                      ) : (
                        <span className="font-mono text-[13px] tracking-[0.06em] text-brand-ice/60">
                          {p.name}
                        </span>
                      )}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
