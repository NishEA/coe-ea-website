'use client'

import { useSearchParams } from 'next/navigation'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'
import { APPLY_BENEFITS } from '@/data/apply-benefits'
import type { SanityApplyBenefit } from '@/lib/sanity/fetchers'

// DB enum values from app/actions/apply.ts — duplicated here because that
// file uses 'use server' and cannot be imported by client components.
const VALID_PILLAR_VALUES = new Set([
  'smart_manufacturing', 'smart_energy', 'smart_water', 'smart_farming',
  'home_office_automation', 'connected_transportation', 'weather_monitoring',
  'smart_hospital', 'smart_security', 'intelligent_asset_monitoring',
])

// Bridges URL ?pillar= query param values to DB enum values.
const PROVENANCE_TO_PILLAR: Record<string, string> = {
  'smart-manufacturing':  'smart_manufacturing',
  'smart-energy':         'smart_energy',
  'smart-water':          'smart_water',
  'smart-farming':        'smart_farming',
  'connected-transport':  'connected_transportation',
  'smart-healthcare':     'smart_hospital',
  'weather-monitoring':   'weather_monitoring',
  'smart-security':       'smart_security',
  'asset-monitoring':     'intelligent_asset_monitoring',
  'home-automation':      'home_office_automation',
}

export function TheApplication({ benefits: propBenefits }: { benefits?: SanityApplyBenefit[] } = {}) {
  const benefits = propBenefits && propBenefits.length > 0 ? propBenefits : APPLY_BENEFITS
  const searchParams = useSearchParams()
  const rawPillar = searchParams.get('pillar') ?? ''
  const resolvedPillar = PROVENANCE_TO_PILLAR[rawPillar] ?? rawPillar
  const defaultDomain = VALID_PILLAR_VALUES.has(resolvedPillar) ? resolvedPillar : ''

  return (
    <section
      id="apply"
      aria-label="Apply — Section 5"
      className="relative w-full dark-atmosphere grain bg-bg-void px-6 py-24 tablet:px-12 desktop:px-20"
    >
      <header className="mb-16 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Application
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/50">
          Cohort 3 · Rolling basis
        </span>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h2 className="font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white tablet:text-[3.4rem]">
          Apply to the <span className="text-amber">next cohort</span>.
        </h2>
        {/* Status badge */}
        <span className="glass-chip px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-brand-cerulean inline-flex items-center">
          <span className="op-dot mr-2" aria-hidden /> Cohort 3 · Open
        </span>
      </div>

      {/* Benefit strip — amber markers */}
      <ul
        aria-label="What you get"
        className="mt-12 mb-20 grid grid-cols-1 gap-x-8 gap-y-8 border-y border-brand-ice/10 py-10 tablet:grid-cols-3 desktop:grid-cols-5"
      >
        {benefits.map(b => (
          <li key={b.label} className="flex flex-col gap-1.5">
            <span className="mb-1 flex items-center gap-2">
              <span aria-hidden className="inline-block h-2 w-2 bg-amber" />
              <span className="font-display text-[1.7rem] font-light leading-none text-brand-ice">
                {b.value}
              </span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-ice/75">
              {b.label}
            </span>
            <span className="font-body text-[13px] leading-[1.5] text-brand-ice/50">
              {b.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="desktop:grid desktop:grid-cols-[3fr_2fr] desktop:items-start desktop:gap-16">
        {/* Form wrapped in field-scan-wrap and form-dark scope */}
        <div className="field-scan-wrap form-dark">
          <ApplyForm defaultDomain={defaultDomain} />
        </div>

        {/* Process sidebar — desktop only, glass-panel wrapper */}
        <aside className="glass-panel mt-16 p-8 hidden desktop:block desktop:sticky desktop:top-24">
          <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
            What happens next
          </h3>
          <ol className="space-y-5 border-t border-brand-ice/10 pt-6">
            {[
              ['01', 'PMG review — you\'ll hear within two weeks of submission'],
              ['02', 'Shortlisted founders invited to a 30-minute pitch session'],
              ['03', 'Due diligence by the nine-member PMG committee'],
              ['04', 'Offer within six weeks; onboarding after equity signing'],
            ].map(([n, text]) => (
              <li key={n} className="flex items-start gap-4">
                <span className="font-mono text-[10px] text-brand-ice/25">{n}</span>
                <span className="font-body text-[14px] leading-[1.55] text-brand-ice/60">{text}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-t border-brand-ice/8 pt-6 font-body text-[13px] leading-[1.6] text-brand-ice/40">
            Questions? Write to{' '}
            <a href="mailto:blr.coeea@stpi.in" className="text-brand-cerulean underline underline-offset-2">
              blr.coeea@stpi.in
            </a>
          </p>
        </aside>
      </div>
    </section>
  )
}
