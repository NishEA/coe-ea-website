import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DarkHero } from '@/components/ui/DarkHero'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'
import { OrbitCanvas } from '@/components/ui/OrbitCanvas'
import { APPLY_BENEFITS } from '@/data/apply-benefits'

export const metadata: Metadata = {
  title: 'Apply — Centre of Excellence on Efficiency Augmentation',
  description:
    'Apply to join the CoE-EA incubation programme. 16,000 sq ft Industry 4.0 centre, up to ₹25L seed funding, and a network of domain partners.',
}

export default function ApplyPage() {
  return (
    <>
      <DarkHero
        label="Cohort 3 · Applications open"
        title="Apply to the next cohort."
        subhead="10 Industry 4.0 domains · 12-month programme · Bengaluru"
        align="left"
        visual={<OrbitCanvas className="h-full w-full" showLabels animate />}
      />

      <section
        id="apply"
        aria-label="Apply"
        className="relative z-10 bg-bg-paper px-6 py-24 tablet:px-12 desktop:px-20"
      >
        <div className="mx-auto max-w-[1100px]">
          {/* Benefit strip — amber markers */}
          <ul
            aria-label="What you get"
            className="mb-20 grid grid-cols-1 gap-x-8 gap-y-8 border-y border-brand-navy/15 py-10 tablet:grid-cols-3 desktop:grid-cols-5"
          >
            {APPLY_BENEFITS.map(b => (
              <li key={b.label} className="flex flex-col gap-1.5">
                <span className="mb-1 flex items-center gap-2">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-sm bg-amber" />
                  <span className="font-display text-[1.15rem] font-bold leading-none text-brand-navy">
                    {b.value}
                  </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                  {b.label}
                </span>
                <span className="font-body text-[12.5px] leading-[1.5] text-ink/50">
                  {b.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="mx-auto max-w-2xl">
            <Suspense>
              <ApplyForm />
            </Suspense>
          </div>

          <p className="mt-12 max-w-xl font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
            The up to ₹25L seed grant is funded by STPI · KITS · HPE. Disbursement is
            milestone-gated and subject to the equity agreement.
          </p>
        </div>
      </section>
    </>
  )
}
