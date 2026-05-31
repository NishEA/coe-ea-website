import type { Metadata } from 'next'
import Link from 'next/link'
import { DarkHero } from '@/components/ui/DarkHero'
import { PortfolioMorph } from '@/components/ui/morphs/PortfolioMorph'

export const metadata: Metadata = {
  title: 'Portfolio — CoE-EA',
  description:
    'Startups incubated by the Centre of Excellence on Efficiency Augmentation.',
}

const STARTUPS = [
  { name: 'WaterBot Online Solutions', domain: 'Smart Water', stage: 'Growth' },
  { name: 'Yappes Technologies', domain: 'Smart Manufacturing', stage: 'Early' },
  { name: 'Avatarbot', domain: 'Smart Healthcare', stage: 'Early' },
  { name: 'Ouranos Robotics', domain: 'Connected Transport', stage: 'Growth' },
  { name: 'Vaticinari Technologies', domain: 'Asset Monitoring', stage: 'Early' },
  { name: 'STG Labs India', domain: 'Smart Energy', stage: 'Early' },
]

export default function PortfolioPage() {
  return (
    <>
      <DarkHero
        label="Portfolio"
        title={
          <>
            Startups we&rsquo;ve <span className="text-amber">instrumented.</span>
          </>
        }
        subhead="52 STARTUPS · 10 DOMAINS · COHORT 1–3"
        visual={<PortfolioMorph className="h-full w-auto max-w-[600px]" />}
      />

      {/* Dark card grid */}
      <section className="relative z-10 px-6 py-20 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
              The cohort
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">
              13 partners
            </p>
          </div>

          <ul
            aria-label="Portfolio startups"
            className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.06] tablet:grid-cols-2 desktop:grid-cols-3"
          >
            {STARTUPS.map(s => (
              <li
                key={s.name}
                className="flex flex-col gap-3 bg-bg-void p-8 transition hover:bg-white/[0.03]"
              >
                <span aria-hidden className="inline-block h-2 w-2 bg-amber" />
                <span className="font-display text-[1.4rem] font-semibold leading-tight text-white">
                  {s.name}
                </span>
                <div className="mt-auto flex items-baseline justify-between pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-cerulean">
                    {s.domain}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-ice/40">
                    {s.stage}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-xl font-body text-[14px] leading-[1.6] text-brand-ice/40">
            A representative selection of the cohort. The full portfolio spans
            ten Industry&nbsp;4.0 domains across manufacturing, water, energy,
            transport, healthcare, and asset monitoring.
          </p>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="rounded-[5px] bg-amber px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg-void transition hover:bg-amber-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
            >
              Apply to the cohort →
            </Link>
            <Link
              href="/"
              className="rounded-[5px] border border-brand-ice/30 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-ice/70 transition hover:border-brand-cerulean hover:text-accent-spark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
