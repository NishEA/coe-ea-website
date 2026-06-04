import type { Metadata } from 'next'
import Link from 'next/link'
import { DarkHero } from '@/components/ui/DarkHero'
import { PortfolioMorph } from '@/components/ui/morphs/PortfolioMorph'

export const metadata: Metadata = {
  title: 'Startup Program',
  description:
    'The CoE-EA Startup Programme: ₹10L seed grant, 16,000 sq ft centre, domain mentors, and market support across 10 Industry 4.0 domains.',
}

const BENEFITS = [
  {
    id: 'grant',
    label: 'Seed capital',
    headline: '₹10L grant',
    body: 'Non-dilutive. No equity taken until a milestone trigger is reached — so you keep the cap table clean while you build.',
    accent: 'amber',
  },
  {
    id: 'lab',
    label: 'Infrastructure',
    headline: '16,000 sq ft centre',
    body: '10 domain modules covering smart water, energy, manufacturing, transport, healthcare, farming, security, weather, asset monitoring, and home automation. ICT infrastructure, co-working bays, meeting rooms, training rooms, and a cafeteria.',
    accent: 'cerulean',
  },
  {
    id: 'mentors',
    label: 'Expert access',
    headline: 'Domain mentors',
    body: 'Practitioners from HPE, Bosch, and Schneider — not generalist startup advisors. Engineers who have shipped in your exact domain.',
    accent: 'amber',
  },
  {
    id: 'market',
    label: 'Customer development',
    headline: 'Market support',
    body: '50% travel reimbursement for customer development visits, plus introductions to the partner network for pilot conversations.',
    accent: 'cerulean',
  },
  {
    id: 'ecosystem',
    label: 'Partner network',
    headline: 'HPE · Intel · Bosch · Schneider · MathWorks + 8 more',
    body: '13 industry partners providing hardware access, software licences, co-marketing, and pilot opportunities across their enterprise accounts.',
    accent: 'amber',
  },
] as const

const STARTUPS = [
  { name: 'Abhiyantrik Solutions', domain: 'Home Automation', stage: 'Growth' },
  { name: 'Ada Lovelace Software', domain: 'AssistiveTech', stage: 'Growth' },
  { name: 'Artitech Innovations', domain: 'Industry 4.0', stage: 'Growth' },
  { name: 'Atibha R&D', domain: 'AI / ML', stage: 'Growth' },
  { name: 'Avatarbot', domain: 'Smart Energy', stage: 'Growth' },
  { name: 'Dopamine Technology', domain: 'Smart Manufacturing', stage: 'Growth' },
  { name: 'Evoride Motors', domain: 'E-Mobility', stage: 'Growth' },
  { name: 'Ouranos Robotics', domain: 'AgriTech', stage: 'Growth' },
  { name: 'Prayogik Energy', domain: 'Smart Energy', stage: 'Growth' },
  { name: 'STG Labs India', domain: 'Smart Energy', stage: 'Growth' },
  { name: 'Suncharge Smartgrids India', domain: 'CleanTech', stage: 'Early' },
  { name: 'Ignomagine (Enlightened Machines)', domain: 'Robotics', stage: 'Early' },
  { name: 'Small Acts Technologies', domain: 'HealthTech', stage: 'Early' },
  { name: 'DSeT Consulting', domain: 'Industry 4.0', stage: 'Early' },
  { name: 'Ikshana Bin', domain: 'Sustainability', stage: 'Early' },
  { name: 'Kubar Protocol', domain: 'FinTech', stage: 'Early' },
  { name: 'Iqponics Technologies', domain: 'AgriTech', stage: 'Early' },
  { name: 'Stavar Systems', domain: 'IoT', stage: 'Early' },
  { name: 'Ecologia Designs', domain: 'IoT', stage: 'Early' },
  { name: 'Amlaan RiverCorp', domain: 'Sustainability', stage: 'Early' },
  { name: 'Enwinove Social Solutions', domain: 'Smart Water', stage: 'Early' },
  { name: 'ZeroMOQ', domain: 'Smart Manufacturing', stage: 'Early' },
  { name: 'Zenathom', domain: 'CleanTech', stage: 'Early' },
  { name: 'Bharat Dome Innovation', domain: 'SpaceTech', stage: 'Early' },
  { name: 'Green Junction Technologies', domain: 'E-Mobility', stage: 'Early' },
  { name: 'Augtual Reality Labs', domain: 'Extended Reality', stage: 'Early' },
  { name: 'YAPPES Technologies', domain: 'Enterprise SaaS', stage: 'Early' },
  { name: 'TechXEarthSpace', domain: 'ClimateTech', stage: 'Early' },
  { name: 'Trustadditive', domain: 'Smart Manufacturing', stage: 'Early' },
  { name: 'Drobots Tech', domain: 'DronesTech', stage: 'Early' },
  { name: 'Solitary Spaces', domain: 'DesignTech', stage: 'Early' },
  { name: 'PRIMESOC Technologies', domain: 'Semiconductor', stage: 'Early' },
  { name: 'Aavishkaara Electronics India', domain: 'Electronics', stage: 'Early' },
  { name: 'Bworth Technologies', domain: 'FashionTech', stage: 'Early' },
  { name: 'TEA Inntech Services', domain: 'AgriTech', stage: 'Early' },
  { name: 'Aarts Maestro', domain: 'CreativeTech', stage: 'Early' },
  { name: 'Source X', domain: 'MarketingTech', stage: 'Early' },
  { name: 'Billionloans Technology Services', domain: 'FinTech', stage: 'Early' },
  { name: 'Enectron Energy Storage Systems', domain: 'CleanTech', stage: 'Early' },
  { name: 'Zealdash Solutions', domain: 'Enterprise SaaS', stage: 'Early' },
  { name: 'Hypertechpreneurs', domain: 'AI / DeepTech', stage: 'Early' },
  { name: 'Trinav Spacetech', domain: 'SpaceTech', stage: 'Early' },
  { name: 'Calypsion Innovations', domain: 'Industry 4.0', stage: 'Early' },
  { name: 'Sunitech AI', domain: 'EdTech', stage: 'Early' },
  { name: 'Fiacre Telematics', domain: 'MobilityTech', stage: 'Early' },
  { name: 'Knovative Tech Labs', domain: 'IT Services', stage: 'Early' },
  { name: 'Eyres AI Solutions', domain: 'Industrial AI', stage: 'Early' },
  { name: 'MeetNotes', domain: 'ProductivityTech', stage: 'Early' },
]

export default function PortfolioPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <DarkHero
        label="Startup Program"
        title={
          <>
            Built inside <span className="text-amber">the machine.</span>
          </>
        }
        subhead="50 STARTUPS · 10 DOMAINS · 3 COHORTS"
        visual={<PortfolioMorph className="h-full w-auto max-w-[600px]" />}
        bridge={false}
      />

      {/* ── 2. What the programme gives you ── */}
      <section className="relative z-10 bg-bg-void px-6 py-24 tablet:px-12">
        {/* subtle grid dot background */}
        <div className="grid-bg" aria-hidden />

        <div className="relative mx-auto max-w-[1100px]">
          {/* section header */}
          <div className="mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
              What the programme gives you
            </p>
            <h2 className="mt-4 max-w-xl font-display text-[2rem] font-semibold leading-tight text-white tablet:text-[2.5rem]">
              Everything a hardware-first startup actually needs.
            </h2>
            <p className="mt-4 max-w-lg font-body text-[15px] leading-[1.65] text-brand-ice/70">
              12 months inside a joint STPI + KITS + HPE initiative — not a
              virtual incubator, a physical lab with real machines and real
              domain engineers.
            </p>
          </div>

          {/* benefit cards */}
          <ul
            aria-label="Programme benefits"
            className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3"
          >
            {BENEFITS.map(b => (
              <li
                key={b.id}
                className="flex flex-col gap-4 rounded-[6px] border border-white/[0.08] bg-bg-void p-8 transition hover:border-white/[0.14] hover:bg-white/[0.02]"
              >
                {/* accent marker */}
                <span
                  aria-hidden
                  className={
                    b.accent === 'amber'
                      ? 'inline-block h-[3px] w-8 bg-amber'
                      : 'inline-block h-[3px] w-8 bg-brand-cerulean'
                  }
                />
                {/* label */}
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
                  {b.label}
                </p>
                {/* headline */}
                <p className="font-display text-[1.3rem] font-semibold leading-snug text-white">
                  {b.headline}
                </p>
                {/* body */}
                <p className="mt-auto font-body text-[13px] leading-[1.65] text-brand-ice/60">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. The cohort ── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-bg-void px-6 py-24 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          {/* section header */}
          <div className="mb-10 flex flex-col gap-2 tablet:flex-row tablet:items-baseline tablet:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
              The cohort
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">
              13 partners · Bengaluru
            </p>
          </div>

          <h2 className="mb-10 font-display text-[1.6rem] font-semibold leading-tight text-white tablet:text-[2rem]">
            A selection from the cohort.
          </h2>

          {/* startup card grid */}
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

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-ice/40">
            Full cohort of 50+ startups spans all ten domains.
          </p>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-bg-void px-6 py-24 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
            Ready to apply
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[2rem] font-semibold leading-tight text-white tablet:text-[2.5rem]">
            Cohort 3 applications are open.
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] leading-[1.65] text-brand-ice/60">
            12 months. ₹10L. A 16,000 sq ft centre, a domain expert, and a
            partner ecosystem in your vertical. Based in Bengaluru.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="rounded-[5px] bg-amber px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg-void transition hover:bg-amber-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
            >
              Apply to Cohort 3 →
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
