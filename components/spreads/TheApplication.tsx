'use client'

import { useField } from '@/components/field/FieldProvider'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'

const BENEFITS = [
  { value: '₹10L',     label: 'Non-dilutive seed grant',    detail: 'No equity taken. Get moving.' },
  { value: 'Hardware', label: 'Lab access',                 detail: 'IoT testbeds, instrumented bays, edge compute.' },
  { value: 'Mentors',  label: 'Domain practitioners',       detail: 'Industry specialists, not generalist advisors.' },
  { value: '50%',      label: 'Market support',             detail: 'Reimbursement on qualifying customer-development travel.' },
  { value: 'Network',  label: 'Partner ecosystem',          detail: 'HPE · Intel · Bosch · Schneider · MathWorks.' },
]

export function TheApplication() {
  const { resolvedDomains } = useField()

  return (
    <section
      id="apply"
      aria-label="Apply — Section 5"
      className="relative min-h-dvh w-full bg-bg-paper px-8 py-24 tablet:px-16"
    >
      <header className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          005 / 005
        </span>
        <h2 className="mt-4 font-display text-[2rem] font-light leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[2.6rem]">
          Apply to the next cohort.
        </h2>
        {resolvedDomains.size > 0 && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-cerulean">
            {resolvedDomains.size} domain{resolvedDomains.size > 1 ? 's' : ''} diagnosed
          </p>
        )}
      </header>

      <ul
        aria-label="What you get"
        className="mb-16 grid grid-cols-1 gap-6 tablet:grid-cols-3 desktop:grid-cols-5"
      >
        {BENEFITS.map(b => (
          <li key={b.label} className="flex flex-col gap-1">
            <span className="font-display text-[1.8rem] font-light leading-none text-brand-navy">
              {b.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-navy/70">
              {b.label}
            </span>
            <span className="font-body text-[13px] leading-[1.5] text-brand-navy/50">
              {b.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="max-w-2xl">
        <ApplyForm />
      </div>
    </section>
  )
}
