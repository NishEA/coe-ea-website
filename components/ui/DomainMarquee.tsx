import { DOMAINS as DOMAIN_DEFS } from '@/data/domain-provenance'

const HI = new Set(['Smart Manufacturing', 'Smart Water', 'Asset Monitoring', 'Smart Farming'])

/**
 * Concept D domain marquee — sits at the bottom of every page. Ten Industry
 * 4.0 domains scroll continuously; a subset is highlighted in cerulean. The
 * list is duplicated so the -50% translate loop is seamless.
 */
const DOMAINS = DOMAIN_DEFS.map(d => ({ label: d.name, hi: HI.has(d.name) }))

export function DomainMarquee() {
  const seq = [...DOMAINS, ...DOMAINS]
  return (
    <div className="marquee-bar relative z-10" aria-hidden="true">
      <div className="marquee-inner">
        {seq.map((d, i) => (
          <span key={i} className={d.hi ? 'hi' : undefined}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
