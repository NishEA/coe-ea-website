'use client'

import { useCallback, useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import { useField } from '@/components/field/FieldProvider'
import { DOMAINS } from '@/data/domain-provenance'

const HOLD_MS = 700

export function TheResolve() {
  const { resolvedDomains, resolveDomain, activeDomainId } = useField()
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const holdStart = useRef<Record<string, number>>({})

  // Keyboard / screen-reader: sr-only buttons
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

  // Mouse: document-level pointerdown resolves whichever domain node is active
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const holdTs = { current: 0 }

    const onDown = (e: PointerEvent) => {
      let id = activeDomainId
      if (!id && e.pointerType === 'touch') {
        const W = window.innerWidth, H = window.innerHeight
        const R2 = 220 * 220
        for (const d of DOMAINS) {
          const dx = e.clientX - d.fieldX * W
          const dy = e.clientY - d.fieldY * H
          if (dx * dx + dy * dy < R2) { id = d.id; break }
        }
      }
      if (!id || resolvedDomains.has(id)) return
      const capturedId = id
      holdTs.current = Date.now()
      timer = setTimeout(() => {
        resolveDomain(capturedId)
        track('domain_resolved', {
          domain: capturedId,
          timeToResolve: Date.now() - holdTs.current,
          mobile: e.pointerType === 'touch',
        })
      }, HOLD_MS)
    }

    const onUp = () => {
      if (timer) { clearTimeout(timer); timer = null }
    }

    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      if (timer) clearTimeout(timer)
    }
  }, [activeDomainId, resolvedDomains, resolveDomain])

  const resolved = resolvedDomains.size
  const remaining = DOMAINS.length - resolved

  return (
    <section
      id="resolve"
      aria-label="The Resolve — hold to repair each infrastructure domain"
      className="relative min-h-dvh w-full px-8 pb-12 pt-24 tablet:px-16"
    >
      {/* Visible affordance */}
      <div className="mb-12 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          The Diagnostic Field
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">
          Hold to resolve
        </p>
      </div>

      <p className="mb-3 font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
        {resolved === 0
          ? 'Ten domains. Each one is broken in a specific way.'
          : resolved < 10
          ? `${remaining} domain${remaining !== 1 ? 's' : ''} still failing.`
          : 'All ten domains resolved.'}
      </p>
      <p className="mb-12 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ice/40">
        Tap or hover a node · Hold to resolve · Tab + Enter for keyboard
      </p>

      {/* Before / After split — legacy amber vs instrumented cerulean */}
      <div className="mb-16 grid grid-cols-1 gap-px border border-brand-ice/10 bg-brand-ice/10 tablet:grid-cols-[1fr_1px_1fr]">
        <div className="bg-bg-midnight p-8 [background:radial-gradient(120%_120%_at_0_50%,rgba(224,137,74,.08),transparent_60%)]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-legacy">
            Before — Legacy state
          </p>
          <p className="font-display text-[1.5rem] font-light leading-[1.15] text-[#f3d8c2] tablet:text-[1.85rem]">
            Indian industry runs on instinct: fixed-schedule maintenance,
            blind grids, 38% water lost to leaks no one can see.
          </p>
        </div>
        <div aria-hidden className="hidden bg-gradient-to-b from-transparent via-brand-cerulean/40 to-transparent tablet:block" />
        <div className="bg-bg-midnight p-8 text-right [background:radial-gradient(120%_120%_at_100%_50%,rgba(0,164,228,.10),transparent_60%)]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean">
            After — Instrumented
          </p>
          <p className="font-display text-[1.5rem] font-light leading-[1.15] text-[#cfeefb] tablet:text-[1.85rem]">
            CoE-EA turns that signal into measured efficiency — every claim
            bound to a citation, every domain diagnosed.
          </p>
        </div>
      </div>

      {/* Resolved domain list — visible when any are resolved */}
      {resolved > 0 && (
        <ul className="mb-8 space-y-2" aria-label="Resolved domains">
          {DOMAINS.filter(d => resolvedDomains.has(d.id)).map(d => (
            <li key={d.id} className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-brand-cerulean">✓</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-ice/60">
                {d.name}
              </span>
              <span className="font-mono text-[11px] text-brand-cerulean/70">
                {d.stat}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Screen-reader / keyboard: sr-only buttons */}
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
    </section>
  )
}
