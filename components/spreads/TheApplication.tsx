'use client'

import { useSearchParams } from 'next/navigation'
import { useField } from '@/components/field/FieldProvider'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'

// DB enum values from app/actions/apply.ts — duplicated here because that
// file uses 'use server' and cannot be imported by client components.
const VALID_PILLAR_VALUES = new Set([
  'smart_manufacturing', 'smart_energy', 'smart_water', 'smart_farming',
  'home_office_automation', 'connected_transportation', 'weather_monitoring',
  'smart_hospital', 'smart_security', 'intelligent_asset_monitoring',
])

const BENEFITS = [
  { value: '₹10L',     label: 'Seed grant',            detail: 'Equity-based; Centre takes 1–3% on signing.' },
  { value: 'Hardware', label: 'Lab access',             detail: 'IoT testbeds, instrumented bays, edge compute.' },
  { value: 'Mentors',  label: 'Domain practitioners',   detail: 'Industry specialists, not generalist advisors.' },
  { value: '50%',      label: 'Market support',         detail: 'Reimbursement on qualifying customer-development travel.' },
  { value: 'Network',  label: 'Partner ecosystem',      detail: 'Anchor industry and research partners.' },
]

export function TheApplication() {
  const { resolvedDomains } = useField()
  const searchParams = useSearchParams()
  const rawPillar = searchParams.get('pillar') ?? ''
  const defaultDomain = VALID_PILLAR_VALUES.has(rawPillar) ? rawPillar : ''

  return (
    <section
      id="apply"
      aria-label="Apply — Section 5"
      className="relative min-h-dvh w-full bg-bg-paper px-8 py-24 tablet:px-16"
    >
      <header className="mb-16 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Application
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
          Cohort 3 · Rolling basis
        </span>
      </header>

      <h2 className="font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-navy tablet:text-[3.4rem]">
        Apply to the <span className="text-amber">next cohort</span>.
      </h2>
      {resolvedDomains.size > 0 && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-cerulean">
          {resolvedDomains.size} domain{resolvedDomains.size > 1 ? 's' : ''} diagnosed
        </p>
      )}

      {/* Benefit strip — amber markers */}
      <ul
        aria-label="What you get"
        className="mt-12 mb-20 grid grid-cols-1 gap-x-8 gap-y-8 border-y border-brand-navy/15 py-10 tablet:grid-cols-3 desktop:grid-cols-5"
      >
        {BENEFITS.map(b => (
          <li key={b.label} className="flex flex-col gap-1.5">
            <span className="mb-1 flex items-center gap-2">
              <span aria-hidden className="inline-block h-2 w-2 bg-amber" />
              <span className="font-display text-[1.7rem] font-light leading-none text-brand-navy">
                {b.value}
              </span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/85">
              {b.label}
            </span>
            <span className="font-body text-[13px] leading-[1.5] text-ink/60">
              {b.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="desktop:grid desktop:grid-cols-[3fr_2fr] desktop:items-start desktop:gap-16">
        <ApplyForm defaultDomain={defaultDomain} />

        {/* Eligibility sidebar — desktop only */}
        <aside className="mt-16 hidden desktop:block desktop:sticky desktop:top-24">
          <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
            Eligibility
          </h3>
          <ul className="space-y-4 border-t border-brand-navy/15 pt-6">
            {[
              'Incorporated or registrable entity founded in the last 5 years',
              'Working on one of the Centre\'s ten Industry 4.0 domains',
              'Majority Indian shareholding; lead founder must be Indian',
              'Not currently incubated at another STPI Centre of Excellence',
              'Karnataka registration preferred; outstation founders must operate from the Centre',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 bg-amber" />
                <span className="font-body text-[14px] leading-[1.55] text-ink/75">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-6 mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
            What happens next
          </h3>
          <ol className="space-y-5 border-t border-brand-navy/15 pt-6">
            {[
              ['01', 'PMG review — you\'ll hear within two weeks of submission'],
              ['02', 'Shortlisted founders invited to a 30-minute pitch session'],
              ['03', 'Due diligence by the nine-member PMG committee'],
              ['04', 'Offer within six weeks; onboarding after equity signing'],
            ].map(([n, text]) => (
              <li key={n} className="flex items-start gap-4">
                <span className="font-mono text-[10px] text-ink/35">{n}</span>
                <span className="font-body text-[14px] leading-[1.55] text-ink/75">{text}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-t border-brand-navy/10 pt-6 font-body text-[13px] leading-[1.6] text-ink/50">
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
