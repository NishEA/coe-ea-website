'use client'

import {
  createContext, useCallback, useContext,
  useEffect, useMemo, useRef, useState,
} from 'react'
import { DOMAINS } from '@/data/domain-provenance'

export interface PointerState {
  x: number
  y: number
  holding: boolean
}

export interface ScrollZone {
  top: number
  bottom: number
}

export interface FieldContextValue {
  scrollProgress: number
  scrollZones: ScrollZone[]
  activeSection: number   // 0-4 index into the 5 spreads, -1 = none
  resolvedDomains: Set<string>
  activeDomainId: string | null
  pointer: PointerState
  prefersReducedMotion: boolean
  canvasReady: boolean
  unrevealedCount: number
  resolveDomain: (id: string) => void
  setActiveDomain: (id: string | null) => void
  setPointer: (p: Partial<PointerState>) => void
  setCanvasReady: (ready: boolean) => void
}

const FieldContext = createContext<FieldContextValue | null>(null)

export function useField(): FieldContextValue {
  const ctx = useContext(FieldContext)
  if (!ctx) throw new Error('useField must be used within FieldProvider')
  return ctx
}

const SECTION_IDS = ['diagnosis', 'resolve', 'ledger', 'instrument', 'apply'] as const

export function FieldProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollZones, setScrollZones] = useState<ScrollZone[]>([])
  const [activeSection, setActiveSection] = useState(-1)
  const [resolvedDomains, setResolvedDomains] = useState<Set<string>>(new Set())
  const [activeDomainId, setActiveDomainState] = useState<string | null>(null)
  const [pointer, setPointerState] = useState<PointerState>({ x: -999, y: -999, holding: false })
  const [canvasReady, setCanvasReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // resolvedDomainsRef kept in sync for stale-closure-safe RAF reads
  const resolvedDomainsRef = useRef(resolvedDomains)
  useEffect(() => { resolvedDomainsRef.current = resolvedDomains }, [resolvedDomains])

  // prefersReducedMotion — read once and listen for OS-level changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Scroll progress + active section tracking
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      setScrollProgress(progress)

      const midY = window.scrollY + window.innerHeight / 2
      const idx = scrollZones.findIndex(z => midY >= z.top && midY < z.bottom)
      setActiveSection(idx)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [scrollZones])

  // ResizeObserver zone map — queries sections by known ids after mount
  useEffect(() => {
    const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const buildZones = () => {
      const zones = els.map(el => ({
        top: el.offsetTop,
        bottom: el.offsetTop + el.offsetHeight,
      }))
      setScrollZones(zones)
    }

    buildZones()
    const ro = new ResizeObserver(buildZones)
    els.forEach(el => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  const resolveDomain = useCallback((id: string) => {
    setResolvedDomains(prev => new Set([...prev, id]))
  }, [])

  // Guard: only write state when value actually changes (prevents 60fps state writes from RAF)
  const activeDomainIdRef = useRef<string | null>(null)
  const setActiveDomain = useCallback((id: string | null) => {
    if (activeDomainIdRef.current !== id) {
      activeDomainIdRef.current = id
      setActiveDomainState(id)
    }
  }, [])

  const setPointer = useCallback((p: Partial<PointerState>) => {
    setPointerState(prev => ({ ...prev, ...p }))
  }, [])

  const unrevealedCount = useMemo(
    () => DOMAINS.filter(d => !resolvedDomains.has(d.id)).length,
    [resolvedDomains]
  )

  const value = useMemo<FieldContextValue>(
    () => ({
      scrollProgress, scrollZones, activeSection,
      resolvedDomains, activeDomainId, pointer,
      prefersReducedMotion, canvasReady, unrevealedCount,
      resolveDomain, setActiveDomain, setPointer, setCanvasReady,
    }),
    [scrollProgress, scrollZones, activeSection, resolvedDomains, activeDomainId,
     pointer, prefersReducedMotion, canvasReady, unrevealedCount,
     resolveDomain, setActiveDomain, setPointer, setCanvasReady]
  )

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}
