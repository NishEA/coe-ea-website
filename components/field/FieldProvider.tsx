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

export interface FieldContextValue {
  scrollProgress: number
  resolvedDomains: Set<string>
  activeDomainId: string | null
  pointer: PointerState
  prefersReducedMotion: boolean
  unrevealedCount: number
  resolveDomain: (id: string) => void
  setActiveDomain: (id: string | null) => void
  setPointer: (p: Partial<PointerState>) => void
}

const FieldContext = createContext<FieldContextValue | null>(null)

export function useField(): FieldContextValue {
  const ctx = useContext(FieldContext)
  if (!ctx) throw new Error('useField must be used within FieldProvider')
  return ctx
}

export function FieldProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [resolvedDomains, setResolvedDomains] = useState<Set<string>>(new Set())
  const [activeDomainId, setActiveDomain] = useState<string | null>(null)
  const [pointer, setPointerState] = useState<PointerState>({ x: -999, y: -999, holding: false })

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // resolvedDomainsRef kept in sync for stale-closure-safe RAF reads
  const resolvedDomainsRef = useRef(resolvedDomains)
  useEffect(() => { resolvedDomainsRef.current = resolvedDomains }, [resolvedDomains])

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const resolveDomain = useCallback((id: string) => {
    setResolvedDomains(prev => new Set([...prev, id]))
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
      scrollProgress, resolvedDomains, activeDomainId,
      pointer, prefersReducedMotion, unrevealedCount,
      resolveDomain, setActiveDomain, setPointer,
    }),
    [scrollProgress, resolvedDomains, activeDomainId, pointer,
     prefersReducedMotion, unrevealedCount, resolveDomain, setPointer]
  )

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}
