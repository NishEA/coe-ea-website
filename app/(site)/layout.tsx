'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { DomainMarquee } from '@/components/ui/DomainMarquee'
import { FieldProvider } from '@/components/field/FieldProvider'
import { FieldCanvas } from '@/components/field/FieldCanvas'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/book', label: 'Book' },
  { href: '/governance', label: 'Governance' },
  { href: '/events', label: 'Events' },
]

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Frame draws in once after first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Close drawer on route change (back-button, Link navigation).
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // WCAG 2.1.2 — dismiss drawer with Escape key.
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <div className={`app-frame ${mounted ? 'frame-enter' : 'opacity-0'}`}>
      {/* Skip-to-content (WCAG 2.4.1) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 focus:rounded focus:bg-brand-cerulean focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
      >
        Skip to content
      </a>

      <div className="grid-bg" />
      {/* Ambient particle field on all sub-pages — homepage provides its own via FieldProvider in page.tsx */}
      {pathname !== '/' && (
        <FieldProvider>
          <FieldCanvas />
        </FieldProvider>
      )}

      {/* ── Pill nav ── */}
      <header className="relative z-30 flex items-center justify-between gap-4 px-6 py-5 tablet:px-9">
        <Link
          href="/"
          className="flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          <span className="flex items-center text-[20px] font-bold leading-none tracking-[0.03em] text-white">
            <span className="op-dot mr-1.5" aria-hidden />
            CoE-EA
          </span>
          <span aria-hidden className="hidden h-[22px] w-px bg-white/12 tablet:block" />
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 tablet:inline">
            Efficiency Augmentation · STPI Initiative
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1.5 tablet:flex">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`pill ${isActive(item.href) ? 'pill-active' : 'pill-ghost'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/apply"
            aria-current={isActive('/apply') ? 'page' : undefined}
            className="pill pill-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2"
          >
            Apply →
          </Link>
        </nav>

        {/* Mobile: Apply pill + hamburger */}
        <div className="flex items-center gap-2 tablet:hidden">
          <Link
            href="/apply"
            className="pill pill-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
          >
            Apply →
          </Link>
          <button
            type="button"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            onClick={() => setDrawerOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
          >
            {drawerOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile drawer — slides in below header, hidden on tablet+ */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
        className={`relative z-20 overflow-hidden border-b border-white/[0.06] bg-bg-void/95 backdrop-blur-sm transition-[max-height,opacity] duration-150 ease-out tablet:hidden ${
          drawerOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeDrawer}
            tabIndex={drawerOpen ? undefined : -1}
            aria-current={isActive(item.href) ? 'page' : undefined}
            className={`block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
              isActive(item.href)
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            } focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand-cerulean`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Page content */}
      <main id="main" className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10 tablet:px-9">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/70">
              Centre of Excellence — Efficiency Augmentation
            </p>
            <p className="mt-1 max-w-md font-body text-[13px] leading-[1.6] text-brand-ice/40">
              Funded by STPI · KITS · HPE. Software Technology Parks of India is
              an autonomous society under MeitY, Government of India.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/50"
          >
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Apply', href: '/apply' },
              { label: 'Governance', href: '/governance' },
              { label: 'STPI', href: 'https://www.stpi.in' },
              { label: 'RTI', href: 'https://www.stpi.in/rti.html' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                className="py-2 transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                {...(l.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* Domain marquee — every page */}
      <DomainMarquee />
    </div>
  )
}
