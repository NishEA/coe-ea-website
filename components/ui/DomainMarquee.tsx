/**
 * Concept D domain marquee — sits at the bottom of every page. Ten Industry
 * 4.0 domains scroll continuously; a subset is highlighted in cerulean. The
 * list is duplicated so the -50% translate loop is seamless.
 */
const DOMAINS: { label: string; hi?: boolean }[] = [
  { label: 'Smart Manufacturing', hi: true },
  { label: 'Smart Energy' },
  { label: 'Smart Water', hi: true },
  { label: 'Connected Transport' },
  { label: 'Smart Healthcare' },
  { label: 'Asset Monitoring', hi: true },
  { label: 'Smart Security' },
  { label: 'Weather Monitoring' },
  { label: 'Smart Farming', hi: true },
  { label: 'Home Automation' },
]

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
