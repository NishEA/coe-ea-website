'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'
import { CountUp } from '@/components/ui/CountUp'
import type { SanityImpactMetric, SanityPartner } from '@/lib/sanity/fetchers'

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

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const cellVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 20 } },
}

const breathClasses = ['idle-breath-a', 'idle-breath-b', 'idle-breath-c', 'idle-breath-d'] as const

interface PartnerLogoProps {
  name: string
  src: string
}

function PartnerLogo({ name, src }: PartnerLogoProps) {
  return (
    <div className="group flex h-[72px] w-[160px] items-center justify-center rounded-xl bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      <Image
        src={src}
        alt={name}
        width={120}
        height={44}
        className="max-h-[44px] w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
      />
    </div>
  )
}

export function TheLedger({ metrics, partners }: TheLedgerProps) {
  const displayMetrics = metrics && metrics.length > 0 ? metrics : IMPACT_METRICS

  // Normalise Sanity and static partner shapes into one render-ready list
  const partnerItems = partners?.some(p => p.logoUrl)
    ? partners.map(p => ({ key: p._id, name: p.name, src: p.logoUrl }))
    : PARTNERS.map(p => ({ key: p.name, name: p.name, src: p.logoSrc }))

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

      <h2 className="[text-wrap:balance] mb-14 max-w-2xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white tablet:text-[2.75rem]">
        What the instrument <span className="text-amber">measured</span>.
      </h2>

      <motion.div
        className="grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        variants={gridVariants}
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
            <motion.div
              key={m.label}
              variants={cellVariants}
              className={`${isLead ? 'glass-panel-lead holo-sheen' : 'glass-panel'} ${breathClass} flex flex-col gap-2 rounded-xl p-5`}
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
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-20 border-t border-brand-ice/10 pt-10" aria-label="Partner organisations">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/40">
          Partners
        </p>
        <div className="glass-shelf rounded-lg px-5 py-6 tablet:px-10 tablet:py-8">
          <ul
            className="flex flex-wrap items-center justify-center gap-4 tablet:gap-6"
            role="list"
          >
            {partnerItems.map(p => (
              <li key={p.key} className="flex items-center justify-center">
                {p.src ? (
                  <PartnerLogo name={p.name} src={p.src} />
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
    </section>
  )
}
