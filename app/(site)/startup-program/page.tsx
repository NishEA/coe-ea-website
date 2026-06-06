import type { Metadata } from 'next'
import Link from 'next/link'

// Domain → visual cluster (amber=hardware/energy, cerulean=digital/AI, operational=sustainability/life)
const DOMAIN_CLUSTER: Record<string, 'amber' | 'cerulean' | 'operational'> = {
  'Smart Energy':        'amber',
  'Smart Manufacturing': 'amber',
  'Industry 4.0':        'amber',
  'IoT':                 'amber',
  'Electronics':         'amber',
  'Semiconductor':       'amber',
  'E-Mobility':          'amber',
  'Home Automation':     'amber',
  'Smart Water':         'amber',
  'MobilityTech':        'amber',
  'AI / ML':             'cerulean',
  'AI / DeepTech':       'cerulean',
  'Industrial AI':       'cerulean',
  'Enterprise SaaS':     'cerulean',
  'IT Services':         'cerulean',
  'FinTech':             'cerulean',
  'ProductivityTech':    'cerulean',
  'MarketingTech':       'cerulean',
  'EdTech':              'cerulean',
  'Extended Reality':    'cerulean',
  'FashionTech':         'cerulean',
  'DesignTech':          'cerulean',
  'CreativeTech':        'cerulean',
  'CleanTech':           'operational',
  'AgriTech':            'operational',
  'HealthTech':          'operational',
  'Sustainability':      'operational',
  'ClimateTech':         'operational',
  'AssistiveTech':       'operational',
  'Robotics':            'operational',
  'SpaceTech':           'operational',
  'DronesTech':          'operational',
}

const DOT_CLASS:  Record<string, string> = {
  amber:       'bg-amber',
  cerulean:    'bg-brand-cerulean',
  operational: 'bg-operational',
}
const TEXT_CLASS: Record<string, string> = {
  amber:       'text-amber',
  cerulean:    'text-brand-cerulean',
  operational: 'text-operational',
}

export const metadata: Metadata = {
  title: 'Startup Program',
  description:
    'The CoE-EA Startup Programme: up to ₹25L seed grant, 16,000 sq ft centre, domain mentors, and market support across 10 Industry 4.0 domains.',
}

const BENEFITS = [
  {
    id: 'grant',
    label: 'Seed capital',
    headline: 'up to ₹25L grant',
    body: 'Equity-based. The Centre takes 1–3% equity on signing, scaled to your revenue, grants received, or valuation at time of onboarding.',
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

// Doubled for seamless infinite loop
const STARTUPS_DOUBLED = [...STARTUPS, ...STARTUPS]

export default function PortfolioPage() {
  return (
    <>
      {/* ── 1. What the programme gives you — DARK ── */}
      <section className="relative z-10 border-t border-brand-cerulean bg-bg-void px-6 pb-24 pt-14 tablet:px-12">
        <div className="relative mx-auto max-w-[1100px]">
          <header className="mb-10 border-b border-white/10 pb-12">
            <p className="fade-up font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean" style={{ animationDelay: '0.05s' }}>
              Startup Program
            </p>
            <h1 className="fade-up mt-4 max-w-2xl font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.025em] text-white" style={{ animationDelay: '0.18s' }}>
              Built inside <span className="text-amber">the machine.</span>
            </h1>
            <p className="fade-up mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/55" style={{ animationDelay: '0.28s' }}>
              52 startups · 10 domains · 3 cohorts
            </p>
          </header>
        </div>
        <div className="grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-[1100px]">
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
          <ul
            aria-label="Programme benefits"
            className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3"
          >
            {BENEFITS.map(b => (
              <li
                key={b.id}
                className="flex flex-col gap-4 rounded-[6px] border border-white/[0.08] bg-bg-void p-8 transition hover:border-white/[0.14] hover:bg-white/[0.02]"
              >
                <span
                  aria-hidden
                  className={
                    b.accent === 'amber'
                      ? 'inline-block h-[3px] w-8 bg-amber'
                      : 'inline-block h-[3px] w-8 bg-brand-cerulean'
                  }
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
                  {b.label}
                </p>
                <p className="font-display text-[1.3rem] font-semibold leading-snug text-white">
                  {b.headline}
                </p>
                <p className="mt-auto font-body text-[13px] leading-[1.65] text-brand-ice/60">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. How selection works — DARK ── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-bg-void px-6 py-24 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-14 grid grid-cols-1 gap-6 tablet:grid-cols-12">
            <div className="tablet:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
                Selection process
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight text-white tablet:text-[2.5rem]">
                How selection works.
              </h2>
            </div>
            <p className="font-body text-[15px] leading-[1.65] text-brand-ice/65 tablet:col-span-6 tablet:col-start-7 tablet:pt-14">
              Selection is conducted by the Project Management Group (PMG) — a nine-member body comprising
              STPI, KITS, HPE, industry, and academic representatives. Criteria are weighted across technical
              feasibility, market opportunity, team capability, and alignment with the Centre&apos;s ten priority
              domains. Incubation term is 12 months, renewable for 6 months on demonstrated progress.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.06] tablet:grid-cols-2 desktop:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Application review',
                detail: 'All submissions are reviewed by the PMG — a nine-member body of STPI, KITS, HPE, industry, and academic representatives. Rolling intake; you\'ll hear within two weeks.',
              },
              {
                step: '02',
                title: 'Shortlist & pitch',
                detail: 'Shortlisted founders are invited to a 30-minute pitch session at the Centre. Remote presentations available. Pitch day is typically within four weeks of shortlisting.',
              },
              {
                step: '03',
                title: 'Due diligence',
                detail: 'The committee reviews incorporation documents, team background, and prototype evidence. This is a programme eligibility check, not investor-style financial due diligence.',
              },
              {
                step: '04',
                title: 'Equity signing & onboarding',
                detail: 'Selected startups receive an offer letter within six weeks of submission. Onboarding completes only after the equity agreement is signed. The Centre takes 1–3% equity, scaled to revenue, grants, or valuation at signing.',
              },
            ].map(s => (
              <li key={s.step} className="flex flex-col gap-4 bg-bg-void p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
                  Step {s.step}
                </span>
                <h3 className="font-display text-[1.15rem] font-semibold text-white">{s.title}</h3>
                <p className="mt-auto font-body text-[13px] leading-[1.65] text-brand-ice/60">{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 border-t border-white/[0.08] pt-10">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/40">
              Programme terms
            </p>
            <ul className="grid grid-cols-1 gap-3 tablet:grid-cols-2">
              {[
                'Equity-based engagement — the Centre takes 1–3% equity (scaled to revenue, grants, or valuation). Onboarding completes only after the equity agreement is signed.',
                'IP developed during incubation is founder-owned.',
                'Programme reporting obligations apply — quarterly milestone updates to STPI.',
                'Grant disbursement is milestone-gated at 3-month intervals per GoI financial norms.',
              ].map(t => (
                <li key={t} className="flex items-start gap-3 font-body text-[14px] leading-[1.6] text-brand-ice/70">
                  <span aria-hidden className="font-mono text-brand-cerulean">→</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Eligibility — LIGHT ── */}
      <section className="relative z-10 border-t border-brand-navy/10 bg-bg-paper px-6 py-20 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
            Eligibility
          </p>
          <h2 className="mb-10 font-display text-[1.75rem] font-semibold leading-tight text-brand-navy tablet:text-[2rem]">
            Full eligibility criteria.
          </h2>
          <ul className="max-w-2xl space-y-3">
            {[
              'Incorporated or registrable entity founded in the last 5 years.',
              "Working on a problem within one of the Centre's ten Industry 4.0 domains.",
              'Majority Indian shareholding. Foreign nationals may co-found but the lead founder must be an Indian citizen.',
              'No prior or current incubation at another STPI Centre of Excellence during the application period.',
              'Not receiving concurrent GoI incubation grants exceeding ₹5L at time of application.',
              'Karnataka registration is preferred but not mandatory. Outstation startups may be considered subject to willingness to operate from the Bengaluru Centre during the incubation term.',
              'DPIIT recognition is not required at application; it is encouraged before onboarding.',
            ].map(c => (
              <li key={c} className="flex items-start gap-3 font-body text-[15px] leading-[1.6] text-ink/75">
                <span aria-hidden className="font-mono text-brand-cerulean">→</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. The cohort carousel — LIGHT ── */}
      <section className="relative z-10 border-t border-brand-navy/10 bg-bg-paper px-6 py-24 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 flex flex-col gap-2 tablet:flex-row tablet:items-baseline tablet:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
              The cohort
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
              13 partners · Bengaluru
            </p>
          </div>
          <h2 className="mb-10 font-display text-[1.6rem] font-semibold leading-tight text-brand-navy tablet:text-[2rem]">
            A selection from the cohort.
          </h2>
        </div>

        {/* Full-width carousel — bleeds past the max-width container */}
        <div className="cohort-track" aria-label="Portfolio startups">
          <div className="cohort-track-inner" role="list">
            {STARTUPS_DOUBLED.map((s, i) => {
              const cluster = DOMAIN_CLUSTER[s.domain] ?? 'cerulean'
              return (
                <div
                  key={`${s.name}-${i}`}
                  role="listitem"
                  className="flex w-52 flex-shrink-0 flex-col gap-3 rounded-[5px] border border-brand-navy/10 bg-white p-5 shadow-sm"
                >
                  <span aria-hidden className={`inline-block h-2 w-2 rounded-sm ${DOT_CLASS[cluster]}`} />
                  <span className="font-display text-[0.95rem] font-semibold leading-tight text-brand-navy">
                    {s.name}
                  </span>
                  <div className="mt-auto flex items-baseline justify-between pt-3">
                    <span className={`font-mono text-[9px] uppercase tracking-[0.12em] ${TEXT_CLASS[cluster]}`}>
                      {s.domain}
                    </span>
                    <span className={`font-mono text-[9px] uppercase tracking-[0.1em] ${
                      s.stage === 'Growth' ? 'text-amber/70' : 'text-ink/35'
                    }`}>
                      {s.stage}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1100px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
            Full cohort of 52 startups spans all ten domains. Hover to pause.
          </p>
        </div>
      </section>

      {/* ── 6. CTA — DARK ── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-bg-void px-6 py-24 tablet:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
            Ready to apply
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[2rem] font-semibold leading-tight text-white tablet:text-[2.5rem]">
            Cohort 3 applications are open.
          </h2>
          <p className="mt-4 max-w-md font-body text-[15px] leading-[1.65] text-brand-ice/60">
            12 months. Up to ₹25L seed grant. A 16,000 sq ft centre, a domain
            expert, and a partner ecosystem in your vertical. Based in Bengaluru.
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
