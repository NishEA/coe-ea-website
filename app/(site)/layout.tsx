'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DomainMarquee } from '@/components/ui/DomainMarquee'
import { LenisProvider } from '@/components/motion/LenisProvider'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/startup-program', label: 'Startup Program' },
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
  // showSplash is ONLY for route transitions — never on first load.
  // The app-frame is visible immediately via CSS frame-draw animation.
  const [showSplash, setShowSplash] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mountedRef = useRef(false)
  const prevPathname = useRef<string | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerFirstLinkRef = useRef<HTMLAnchorElement>(null)
  const prevDrawerOpen = useRef(false)

  // Mark mounted and record initial path for route-change detection.
  useEffect(() => {
    mountedRef.current = true
    prevPathname.current = pathname
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Route change: briefly show splash so navigation feels instant.
  useEffect(() => {
    if (!mountedRef.current || prevPathname.current === pathname) return
    prevPathname.current = pathname
    setShowSplash(true)
    const id = setTimeout(() => setShowSplash(false), 150)
    return () => clearTimeout(id)
  }, [pathname])

  // Close drawer on route change (back-button, Link navigation).
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Drawer is position:fixed full-screen — no body overflow lock needed.
  // Removed: body.style.overflow race caused persistent scroll lock on route changes.
  // iOS scroll-through is prevented by overscroll-contain on the drawer <nav>.

  // WCAG 2.4.3 — move focus into drawer on open; return to trigger on close.
  useEffect(() => {
    if (drawerOpen && !prevDrawerOpen.current) {
      drawerFirstLinkRef.current?.focus()
    } else if (!drawerOpen && prevDrawerOpen.current) {
      hamburgerRef.current?.focus()
    }
    prevDrawerOpen.current = drawerOpen
  }, [drawerOpen])

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
    <LenisProvider>
    {/* Splash — visible on initial hydration and on each route change */}
    {showSplash && (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-bg-void"
      >
        <Image
          src="/logos/coe-ea.png"
          alt=""
          width={140}
          height={52}
          className="splash-logo h-16 w-auto object-contain brightness-0 invert"
          style={{ animation: 'splashPulse 1.8s ease-in-out infinite' }}
          priority
        />
        <div className="flex gap-2">
          <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out infinite' }} />
          <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out 0.2s infinite' }} />
          <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out 0.4s infinite' }} />
        </div>
      </div>
    )}
    <div className="app-frame frame-enter">
      {/* Skip-to-content (WCAG 2.4.1) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 focus:rounded focus:bg-brand-cerulean focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
      >
        Skip to content
      </a>

      <div className="grid-bg" />

      {/* ── Pill nav ── */}
      <header className={`z-30 flex items-center justify-between gap-4 px-6 tablet:px-9 transition-all duration-300 ${scrolled ? 'sticky top-0 backdrop-blur-sm bg-bg-void/90 border-b border-white/[0.08] py-4' : 'relative py-5'}`}>
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          {/* Frosted glass frame — matches partner strip */}
          <div className="flex items-center gap-3 rounded-sm border border-brand-ice/10 bg-brand-ice/5 px-4 py-2.5">
            <Image
              src="/logos/coe-ea.png"
              alt="CoE-EA — Centre of Excellence on Efficiency Augmentation"
              width={150}
              height={44}
              className="h-9 w-auto object-contain brightness-0 invert"
              priority
            />
            <span aria-hidden className="hidden h-6 w-px bg-brand-ice/15 tablet:block" />
            <div aria-hidden className="hidden rounded bg-white px-2 py-1 tablet:block">
              <Image
                src="/logos/stpi.png"
                alt="STPI"
                width={70}
                height={26}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>
            <span aria-hidden className="hidden h-6 w-px bg-brand-ice/15 tablet:block" />
            <div aria-hidden className="hidden rounded bg-white px-2 py-1 tablet:block">
              <Image
                src="/logos/kits.jpeg"
                alt="KITS — Karnataka Innovation & Technology Society"
                width={70}
                height={26}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>
          </div>
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
            ref={hamburgerRef}
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
        className={`fixed inset-x-0 top-0 bottom-0 z-[29] overflow-y-auto overscroll-contain bg-bg-void pt-20 backdrop-blur-md tablet:hidden transition-[opacity,visibility] duration-200 ease-out ${
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            ref={i === 0 ? drawerFirstLinkRef : undefined}
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
      <main id="main" className="relative z-10" {...(drawerOpen ? { inert: true } : {})}>{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10 tablet:px-9" {...(drawerOpen ? { inert: true } : {})}>
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            {/* Institution logos — frosted glass frame */}
            <div className="mb-4 inline-flex items-center gap-3 rounded-sm border border-brand-ice/10 bg-brand-ice/5 px-5 py-3">
              <Image
                src="/logos/coe-ea.png"
                alt="CoE-EA"
                width={130}
                height={38}
                className="h-9 w-auto object-contain brightness-0 invert opacity-80"
              />
              <span aria-hidden className="h-6 w-px bg-brand-ice/15" />
              <div className="rounded bg-white px-2 py-1">
                <Image
                  src="/logos/stpi.png"
                  alt="STPI"
                  width={66}
                  height={26}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span aria-hidden className="h-6 w-px bg-brand-ice/15" />
              <div className="rounded bg-white px-2 py-1">
                <Image
                  src="/logos/kits.jpeg"
                  alt="KITS — Karnataka Innovation & Technology Society"
                  width={66}
                  height={26}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
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
              { label: 'Startup Program', href: '/startup-program' },
              { label: 'Events', href: '/events' },
              { label: 'Governance', href: '/governance' },
              { label: 'Apply', href: '/apply' },
              { label: 'Privacy', href: '/privacy' },
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
    </LenisProvider>
  )
}
