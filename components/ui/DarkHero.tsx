import type { ReactNode } from 'react'

/**
 * Shared dark hero for secondary pages (Concept D — Observatory).
 *
 * When `visual` is provided the section splits into a clear 2-column layout:
 *   left 50% — label + headline + body + CTAs (no overlap)
 *   right 50% — full-height visual column (morph fills this area)
 *
 * When `visual` is absent text spans the full width (privacy, etc.).
 *
 * Observatory upgrades:
 * - dark-atmosphere grain on the section
 * - glass-chip status badge in the eyebrow (via `badge` prop)
 * - materialise CSS entrance animation on the heading
 * - ambient cerulean glow behind the visual column
 */
export function DarkHero({
  label,
  title,
  subhead,
  children,
  visual,
  align = 'center',
  bridge = true,
  badge,
}: {
  label: string
  title: ReactNode
  subhead?: ReactNode
  children?: ReactNode
  visual?: ReactNode
  align?: 'center' | 'left'
  bridge?: boolean
  /** Optional glass-chip badge rendered beside the eyebrow label */
  badge?: string
}) {
  return (
    <section
      aria-label={typeof title === 'string' ? title : label}
      className="dark-atmosphere grain relative flex w-full flex-col overflow-hidden px-6 pb-16 pt-14 tablet:px-12 desktop:px-20 desktop:min-h-[65vh] desktop:flex-row desktop:items-center desktop:pb-20 desktop:pt-20"
    >
      <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
      <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />
      <span aria-hidden className="corner-bracket bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="corner-bracket bottom-3 right-3 border-b border-r" />

      {/* Visual column — right half, full section height, behind text (z-0).
          Ambient glow disc sits behind the morph.
          Hidden on mobile: a half-width 25% opacity element reads as glitch debris. */}
      {visual && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 desktop:block">
          {/* Ambient glow behind the visual */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="glow-cerulean h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]" />
          </div>
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
        {/* Eyebrow: label + optional glass-chip badge */}
        <div className="fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '0.05s' }}>
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-cerulean">
            {label}
          </p>
          {badge && (
            <span className="glass-chip font-mono text-[10px] uppercase tracking-[0.16em] text-brand-cerulean">
              {badge}
            </span>
          )}
        </div>
        <h1
          className="materialise mt-5 max-w-2xl font-display font-bold leading-[1.04] tracking-[-0.025em] text-white text-[clamp(44px,5.5vw,72px)]"
          style={{ animationDelay: '0.18s' }}
        >
          {title}
        </h1>
        {subhead && (
          <p
            className="fade-up mt-5 font-mono text-[15px] uppercase tracking-[0.16em] text-brand-ice/55"
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
