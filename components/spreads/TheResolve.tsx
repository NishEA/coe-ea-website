'use client'

import { useCallback, useRef } from 'react'
import { track } from '@vercel/analytics'
import { useField } from '@/components/field/FieldProvider'
import { DOMAINS } from '@/data/domain-provenance'

const HOLD_MS = 700

export function TheResolve() {
  const { resolvedDomains, resolveDomain } = useField()
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const holdStart = useRef<Record<string, number>>({})

  const startHold = useCallback((id: string) => {
    holdStart.current[id] = Date.now()
    timers.current[id] = setTimeout(() => {
      resolveDomain(id)
      track('domain_resolved', {
        domain: id,
        timeToResolve: Date.now() - (holdStart.current[id] ?? 0),
        mobile: window.matchMedia('(pointer: coarse)').matches,
      })
    }, HOLD_MS)
  }, [resolveDomain])

  const cancelHold = useCallback((id: string) => {
    clearTimeout(timers.current[id])
  }, [])

  return (
    <section
      id="resolve"
      aria-label="The Resolve — hold to repair each infrastructure domain"
      className="relative min-h-dvh w-full px-8 py-24 tablet:px-16"
    >
      <ul aria-label="Infrastructure domains — hold or press Enter to resolve" className="sr-only">
        {DOMAINS.map(d => (
          <li key={d.id}>
            <button
              aria-label={`Resolve ${d.name}`}
              aria-pressed={resolvedDomains.has(d.id)}
              onPointerDown={() => startHold(d.id)}
              onPointerUp={() => cancelHold(d.id)}
              onPointerLeave={() => cancelHold(d.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') resolveDomain(d.id) }}
            >
              {resolvedDomains.has(d.id)
                ? `${d.name} — ${d.stat} — ${d.source}`
                : `Resolve ${d.name}`}
            </button>
          </li>
        ))}
      </ul>

      <p className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-navy/35" aria-hidden="true">
        Hold to resolve · Tab to navigate · Enter to repair
      </p>
    </section>
  )
}
