import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DarkHero } from '@/components/ui/DarkHero'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'
import { OrbitCanvas } from '@/components/ui/OrbitCanvas'

export const metadata: Metadata = {
  title: 'Apply — Centre of Excellence on Efficiency Augmentation',
  description:
    'Apply to join the CoE-EA incubation programme. 16,000 sq ft Industry 4.0 centre, up to ₹25L seed funding, and a network of domain partners.',
}

const BENEFITS = [
  { value: 'up to ₹25L', label: 'Seed grant', detail: 'Equity-based; Centre takes 1–3% on signing.' },
  { value: 'Centre', label: '16,000 sq ft', detail: 'Industry 4.0 facility — IoT bays, edge compute, demo infrastructure.' },
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
        subhead="10 Industry 4.0 domains · 12-month programme · Bengaluru"
        align="left"
        visual={<OrbitCanvas className="h-full w-full" showLabels animate />}
      />

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

          <div className="form-dark mx-auto max-w-2xl">
            <Suspense>
              <ApplyForm />
            </Suspense>
          </div>

          <p className="mt-12 max-w-xl font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/35">
            The up to ₹25L seed grant is funded by STPI · KITS · HPE. Disbursement is
            milestone-gated and subject to the equity agreement.
          </p>
        </div>
      </section>
    </>
  )
}
