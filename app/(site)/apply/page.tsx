import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ApplyForm } from '@/components/forms/apply/ApplyForm'
import { APPLY_BENEFITS } from '@/data/apply-benefits'

export const metadata: Metadata = {
  title: 'Apply — Centre of Excellence on Efficiency Augmentation',
  description:
    'Apply to join the CoE-EA incubation programme. 16,000 sq ft Industry 4.0 centre, up to ₹25L seed funding, and a network of domain partners.',
}

export default function ApplyPage() {
  return (
    <>
      <section
        id="apply"
        aria-label="Apply"
        className="relative z-10 border-t border-brand-cerulean px-6 pb-20 pt-14 tablet:px-12"
      >
        <div className="mx-auto max-w-[1100px]">
          <header className="mb-16 border-b border-white/10 pb-12">
            <p className="fade-up font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean" style={{ animationDelay: '0.05s' }}>
              Cohort 3 · Applications open
            </p>
            <h1 className="fade-up mt-4 max-w-2xl font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.025em] text-white" style={{ animationDelay: '0.18s' }}>
              Apply to the next cohort.
            </h1>
            <p className="fade-up mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/55" style={{ animationDelay: '0.28s' }}>
              10 Industry 4.0 domains · 12-month programme · Bengaluru
            </p>
          </header>
          {/* Benefit strip — amber markers */}
          <ul
            aria-label="What you get"
            className="mb-20 grid grid-cols-1 gap-x-8 gap-y-8 border-y border-white/[0.08] py-10 tablet:grid-cols-3 desktop:grid-cols-5"
          >
            {APPLY_BENEFITS.map(b => (
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
