import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'

export function TheLedger() {
  return (
    <section
      id="ledger"
      aria-label="The Ledger — CoE-EA outcomes and partnerships"
      className="relative min-h-dvh w-full bg-bg-midnight/90 px-8 py-24 backdrop-blur-sm tablet:px-16"
    >
      <header className="mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          003 / 005
        </span>
      </header>

      <div className="grid grid-cols-2 gap-8 tablet:grid-cols-3 desktop:grid-cols-4">
        {IMPACT_METRICS.map(m => (
          <div key={m.label} className="flex flex-col gap-1">
            <span
              className="font-display text-[2.8rem] font-light leading-none tracking-tight text-brand-cerulean"
              aria-label={`${m.label}: ${m.value}`}
            >
              {m.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-ice/70">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-20" aria-label="Partner organisations">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/40">
          Partners
        </p>
        <ul className="flex flex-wrap gap-6" role="list">
          {PARTNERS.map(p => (
            <li key={p.name} className="font-mono text-[13px] tracking-[0.06em] text-brand-ice/60">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
