import type { ReactNode } from 'react'

/**
 * Shared dark hero for secondary pages (Concept D). Pure-black grid-dot field,
 * corner brackets, mono label + display headline + mono subhead, with an
 * optional `visual` slot rendered behind/around the copy.
 *
 * Centred layout by default; pass `align="left"` for left-weighted heroes.
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
  const centred = align === 'center'
  return (
    <section
      aria-label={typeof title === 'string' ? title : label}
      className="relative flex min-h-[55vh] w-full items-center overflow-hidden px-6 py-20 tablet:px-12"
    >
      <div className="grid-bg" />
      <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
      <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />
      <span aria-hidden className="corner-bracket bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="corner-bracket bottom-3 right-3 border-b border-r" />

      {/* Visual layer — right-anchored behind text, clearly decorative */}
      {visual && (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end pr-16 opacity-30">
          {visual}
        </div>
      )}

      {/* Gradient bridge: dark void → bg-paper. Disable when next section is dark. */}
      {bridge && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-b from-transparent to-[#f7f4ed]" />
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-[1100px] ${
          centred ? 'text-center' : ''
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean">
          {label}
        </p>
        <h1
          className={`mt-5 font-display font-bold leading-[1.04] tracking-[-0.025em] text-white ${
            centred ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          } text-[clamp(34px,5vw,64px)]`}
        >
          {title}
        </h1>
        {subhead && (
          <p
            className={`mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/55 ${
              centred ? 'mx-auto' : ''
            }`}
          >
            {subhead}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
