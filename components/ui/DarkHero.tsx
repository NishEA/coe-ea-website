import type { ReactNode } from 'react'

/**
 * Shared dark hero for secondary pages (Concept D).
 *
 * When `visual` is provided the section splits into a clear 2-column layout:
 *   left 50% — label + headline + body + CTAs (no overlap)
 *   right 50% — full-height visual column (morph fills this area)
 *
 * When `visual` is absent text spans the full width (privacy, etc.).
 */
export function DarkHero({
  label,
  title,
  subhead,
  children,
  visual,
  align = 'center',
  bridge = true,
}: {
  label: string
  title: ReactNode
  subhead?: ReactNode
  children?: ReactNode
  visual?: ReactNode
  align?: 'center' | 'left'
  bridge?: boolean
}) {
  return (
    <section
      aria-label={typeof title === 'string' ? title : label}
      className="relative flex min-h-[65vh] w-full items-center overflow-hidden px-6 py-20 tablet:px-12"
    >
      <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
      <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />
      <span aria-hidden className="corner-bracket bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="corner-bracket bottom-3 right-3 border-b border-r" />

      {/* Visual column — right half, full section height, behind text (z-0).
          Visible at low opacity on mobile/tablet as decorative background. */}
      {visual && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/2 opacity-25 desktop:opacity-100">
          {visual}
        </div>
      )}

      {/* Seam hairline: 1px cerulean at the dark/cream boundary. */}
      {bridge && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-brand-cerulean" />
      )}

      {/* Text — explicit left half when visual present; prevents any spatial overlap */}
      <div
        className={`relative z-10 ${
          visual
            ? 'w-full desktop:w-1/2'
            : `mx-auto w-full max-w-[1100px] ${align === 'center' ? 'text-center' : ''}`
        }`}
      >
        <p
          className="fade-up font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean"
          style={{ animationDelay: '0.05s' }}
        >
          {label}
        </p>
        <h1
          className="fade-up mt-5 max-w-2xl font-display font-bold leading-[1.04] tracking-[-0.025em] text-white text-[clamp(34px,4.5vw,60px)]"
          style={{ animationDelay: '0.18s' }}
        >
          {title}
        </h1>
        {subhead && (
          <p
            className="fade-up mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/55"
            style={{ animationDelay: '0.32s' }}
          >
            {subhead}
          </p>
        )}
        {children && (
          <div className="fade-up" style={{ animationDelay: '0.45s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
