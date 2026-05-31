'use client'

import type { CSSProperties } from 'react'
import { DOMAINS } from '@/data/domain-provenance'
import { useField } from '@/components/field/FieldProvider'

const DOMAIN_INDEX = new Map(DOMAINS.map((d, i) => [d.id, i + 1]))

export function DomainMetadata() {
  const { activeDomainId, resolvedDomains } = useField()

  if (!activeDomainId || !resolvedDomains.has(activeDomainId)) return null

  const d = DOMAINS.find(x => x.id === activeDomainId)
  if (!d) return null

  const idx = DOMAIN_INDEX.get(d.id)!
  // Nodes in the right half of the viewport sit over the orbit + cube cluster.
  // Pin their metadata to the left side so it never overlaps the diagram.
  const positionStyle: CSSProperties = d.fieldX >= 0.5
    ? { left: 'auto', right: '48%' }
    : { left: `calc(${d.fieldX * 100}vw + 20px)`, right: 'auto' }

  return (
    <div
      className="pointer-events-none fixed z-10 max-w-[220px] transition-opacity duration-300"
      style={{
        ...positionStyle,
        top: `calc(${d.fieldY * 100}vh + 14px)`,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-cerulean/80">
        DOMAIN.{String(idx).padStart(2, '0')} · {d.name.toUpperCase()} · {d.shortStat} · {d.source.toUpperCase()}
      </p>
      <a
        href={d.citationUrl}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto mt-0.5 block font-mono text-[8px] tracking-[0.08em] text-brand-ice/40 underline underline-offset-2 transition hover:text-brand-ice/70"
        aria-label={`Source: ${d.source}`}
      >
        {d.source}
      </a>
    </div>
  )
}
