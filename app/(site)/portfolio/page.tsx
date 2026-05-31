import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — CoE-EA',
  description: 'Startups incubated by the Centre of Excellence on Efficiency Augmentation.',
}

const STARTUPS = [
  { name: 'WaterBot Online Solutions',  domain: 'Smart Water',         stage: 'Growth' },
  { name: 'Yappes Technologies',         domain: 'Smart Manufacturing', stage: 'Early'  },
  { name: 'Avatarbot',                   domain: 'Smart Healthcare',    stage: 'Early'  },
  { name: 'Ouranos Robotics',            domain: 'Connected Transport', stage: 'Growth' },
  { name: 'Vaticinari Technologies',     domain: 'Asset Monitoring',    stage: 'Early'  },
  { name: 'STG Labs India',              domain: 'Smart Energy',        stage: 'Early'  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-bg-midnight px-8 py-24 tablet:px-16">
      <header className="mb-16">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Portfolio
        </p>
        <h1 className="font-display text-[2.4rem] font-light leading-[1.1] tracking-[-0.01em] text-brand-paper tablet:text-[3.2rem]">
          Startups we&apos;ve incubated.
        </h1>
      </header>

      <ul
        aria-label="Portfolio startups"
        className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {STARTUPS.map(s => (
          <li
            key={s.name}
            className="flex flex-col gap-2 border border-brand-navy/20 p-6"
          >
            <span className="font-display text-[1.3rem] font-light leading-tight text-brand-paper">
              {s.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-cerulean">
              {s.domain}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-ice/40">
              {s.stage}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <a
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-ice/50 transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          ← Back to home
        </a>
      </div>
    </main>
  )
}
