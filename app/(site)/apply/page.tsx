import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DarkHero } from '@/components/ui/DarkHero'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'

export const metadata: Metadata = {
  title: 'Apply — Centre of Excellence on Efficiency Augmentation',
  description:
    'Apply to join the CoE-EA incubation programme. Seed funding, hardware lab access, and a network of Industry 4.0 partners.',
}

const STATS = [
  { value: '₹10L', label: 'Seed grant' },
  { value: '12 mo', label: 'Programme' },
  { value: '16K', label: 'Sq ft lab' },
  { value: '13', label: 'Partners' },
]

const BENEFITS = [
  { value: '₹10L', label: 'Seed funding', detail: 'Non-dilutive grant to get you moving.' },
  { value: 'Lab', label: 'Hardware access', detail: 'IoT testbeds, instrumented bays, edge compute.' },
  { value: 'Mentors', label: 'Domain mentors', detail: 'Industry practitioners, not generalist advisors.' },
  { value: '50%', label: 'Market support', detail: 'Reimbursement on qualifying customer-development travel.' },
  { value: 'Network', label: 'Partner ecosystem', detail: 'HPE · Intel · Bosch · Schneider · MathWorks.' },
]

export default function ApplyPage() {
  return (
    <>
      <DarkHero
        label="Cohort 3 · Applications open · Rolling basis"
        title="Apply to the next cohort."
      >
        <ul className="mt-10 flex flex-wrap items-baseline justify-center gap-x-10 gap-y-6">
          {STATS.map(s => (
            <li key={s.label} className="flex flex-col items-center">
              <span className="font-display text-[1.8rem] font-bold leading-none text-white">
                {s.value}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ice/45">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </DarkHero>

      <section
        id="apply"
        aria-label="Apply"
        className="relative z-10 px-6 py-20 tablet:px-12"
      >
        <div className="mx-auto max-w-[1100px]">
          {/* Benefit strip — amber markers */}
          <ul
            aria-label="What you get"
            className="mb-20 grid grid-cols-1 gap-x-8 gap-y-8 border-y border-white/[0.08] py-10 tablet:grid-cols-3 desktop:grid-cols-5"
          >
            {BENEFITS.map(b => (
              <li key={b.label} className="flex flex-col gap-1.5">
                <span className="mb-1 flex items-center gap-2">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-sm bg-amber" />
                  <span className="font-display text-[1.15rem] font-bold leading-none text-white">
                    {b.value}
                  </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/60">
                  {b.label}
                </span>
                <span className="font-body text-[12.5px] leading-[1.5] text-brand-ice/35">
                  {b.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="form-dark max-w-2xl">
            <Suspense>
              <ApplyForm />
            </Suspense>
          </div>

          <p className="mt-12 max-w-xl font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/35">
            The ₹10L seed grant is funded by KITS · STPI · HPE. Disbursement is
            milestone-gated and subject to the equity agreement.
          </p>
        </div>
      </section>
    </>
  )
}
