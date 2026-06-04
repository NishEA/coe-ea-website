import Image from 'next/image'
import { IMPACT_METRICS, PARTNERS } from '@/data/impact-metrics'

/** Split a metric value like "₹10.35 Cr" or "52" into a numeric head and a
 *  trailing unit chip ("Cr", "%", etc.). The leading ₹ stays with the number. */
function splitValue(value: string): { num: string; unit: string | null } {
  const m = value.match(/^([₹$]?\s?[\d.,–-]+)\s*(.*)$/)
  if (!m) return { num: value, unit: null }
  const unit = m[2].trim()
  return { num: m[1].trim(), unit: unit.length > 0 ? unit : null }
}

export function TheLedger() {
  return (
    <section
      id="ledger"
      aria-label="The Ledger — CoE-EA outcomes and partnerships"
      className="relative min-h-dvh w-full overflow-hidden bg-bg-midnight px-8 py-24 tablet:px-16"
    >
      {/* Corner brackets — dark precision section */}
      <span aria-hidden className="pointer-events-none absolute left-5 top-24 h-6 w-6 border-l border-t border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute right-5 top-24 h-6 w-6 border-r border-t border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-brand-ice/15" />
      <span aria-hidden className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-brand-ice/15" />

      <header className="mb-12 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Ledger
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">
          KPI review · Apr 2026
        </span>
      </header>

      <h2 className="mb-14 max-w-2xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white tablet:text-[2.75rem]">
        What the instrument <span className="text-amber">measured</span>.
      </h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-12 tablet:grid-cols-3 desktop:grid-cols-4">
        {IMPACT_METRICS.map((m, i) => {
          const { num, unit } = splitValue(m.value)
          return (
            <div key={m.label} className="flex flex-col gap-2">
              <span
                className={`flex items-baseline gap-1.5 font-display text-[3rem] font-bold leading-none tracking-tight tabular-nums desktop:text-[3.6rem] ${
                  i === 0 ? 'text-white' : 'text-brand-ice/60'
                }`}
                aria-label={`${m.label}: ${m.value}`}
              >
                {num}
                {unit && (
                  <span className="font-mono text-[0.9rem] font-normal uppercase tracking-[0.08em] text-brand-ice/45">
                    {unit}
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/55">
                {m.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-20 border-t border-brand-ice/10 pt-10" aria-label="Partner organisations">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/40">
          Partners
        </p>
        <div className="rounded-sm border border-brand-ice/10 bg-brand-ice/5 px-10 py-8">
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-6" role="list">
            {PARTNERS.map(p => (
              <li key={p.name}>
                {p.logoSrc ? (
                  p.chip ? (
                    <div className="rounded bg-white px-3 py-2">
                      <Image
                        src={p.logoSrc}
                        alt={p.name}
                        width={120}
                        height={44}
                        className="h-11 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <Image
                      src={p.logoSrc}
                      alt={p.name}
                      width={120}
                      height={44}
                      className="h-11 w-auto object-contain"
                    />
                  )
                ) : (
                  <span className="font-mono text-[13px] tracking-[0.06em] text-brand-ice/60">
                    {p.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
