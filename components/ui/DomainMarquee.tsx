'use client'

import { useState } from 'react'
import { DOMAINS as DOMAIN_DEFS } from '@/data/domain-provenance'

const HI = new Set(['Smart Manufacturing', 'Smart Water', 'Asset Monitoring', 'Smart Farming'])

const DOMAINS = DOMAIN_DEFS.map(d => ({ label: d.name, hi: HI.has(d.name) }))

export function DomainMarquee() {
  const [paused, setPaused] = useState(false)
  const seq = [...DOMAINS, ...DOMAINS]

  return (
    <div className="marquee-bar relative z-10">
      <button
        type="button"
        onClick={() => setPaused(p => !p)}
        aria-label={paused ? 'Resume scrolling domains' : 'Pause scrolling domains'}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-ice/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
      >
        {paused ? '▶' : '⏸'}
      </button>
      <div className={`marquee-inner${paused ? ' paused' : ''}`} aria-hidden="true">
        {seq.map((d, i) => (
          <span key={i} className={d.hi ? 'hi' : undefined}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
