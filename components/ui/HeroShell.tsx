import type { ReactNode } from 'react'

export type HeroLayout = 'right-visual' | 'center' | 'left-visual' | 'fullbleed' | 'band'

function Brackets() {
  return (
    <>
      <span aria-hidden className="corner-bracket left-3 top-3 border-l border-t" />
      <span aria-hidden className="corner-bracket right-3 top-3 border-r border-t" />
      <span aria-hidden className="corner-bracket bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="corner-bracket bottom-3 right-3 border-b border-r" />
    </>
  )
}

function BridgeSeam() {
  return <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-brand-cerulean" />
}

function Eyebrow({ label, badge }: { label: string; badge?: string }) {
  return (
    <div className="fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '0.05s' }}>
      <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-cerulean">{label}</p>
      {badge && (
        <span className="glass-chip font-mono text-[10px] uppercase tracking-[0.16em] text-brand-cerulean">
          {badge}
        </span>
      )}
    </div>
  )
}

function HeroTitle({ title }: { title: ReactNode }) {
  return (
    <h1
      className="materialise mt-5 max-w-2xl font-display font-bold leading-[1.04] tracking-[-0.025em] text-white text-[clamp(44px,5.5vw,72px)]"
      style={{ animationDelay: '0.18s' }}
    >
      {title}
    </h1>
  )
}

interface HeroShellProps {
  label: string
  title: ReactNode
  subhead?: ReactNode
  children?: ReactNode
  visual?: ReactNode
  layout?: HeroLayout
  bridge?: boolean
  badge?: string
}

export function HeroShell({
  label,
  title,
  subhead,
  children,
  visual,
  layout = 'right-visual',
  bridge = true,
  badge,
}: HeroShellProps) {
  const base = 'dark-atmosphere grain relative flex w-full overflow-hidden'

  if (layout === 'center') {
    return (
      <section
        aria-label={typeof title === 'string' ? title : label}
        className={`${base} flex-col items-center px-6 pb-16 pt-14 tablet:px-12 desktop:min-h-[65vh] desktop:px-20 desktop:pb-20 desktop:pt-20`}
      >
        <Brackets />

        <div className="relative z-10 w-full max-w-[900px] text-center">
          <Eyebrow label={label} badge={badge} />
          <HeroTitle title={title} />
          {subhead && (
            <p
              className="fade-up mt-5 font-mono text-[15px] uppercase tracking-[0.16em] text-brand-ice/55"
              style={{ animationDelay: '0.32s' }}
            >
              {subhead}
            </p>
          )}
        </div>

        {visual && (
          <div className="relative z-10 mt-10 w-full">
            {visual}
          </div>
        )}

        {children && (
          <div className="fade-up relative z-10 mt-6 w-full" style={{ animationDelay: '0.45s' }}>
            {children}
          </div>
        )}

        {bridge && <BridgeSeam />}
      </section>
    )
  }

  if (layout === 'left-visual') {
    return (
      <section
        aria-label={typeof title === 'string' ? title : label}
        className={`${base} flex-col px-6 pb-16 pt-14 tablet:px-12 desktop:min-h-[65vh] desktop:flex-row-reverse desktop:items-center desktop:px-20 desktop:pb-20 desktop:pt-20`}
      >
        <Brackets />

        {visual && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[55%] desktop:block">
            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <div className="h-[480px] w-[480px] rounded-full bg-brand-cerulean opacity-20 blur-[120px]" />
            </div>
            {visual}
          </div>
        )}

        <div className={`relative z-10 ${visual ? 'w-full desktop:ml-auto desktop:w-[42%]' : 'mx-auto w-full max-w-[1100px]'}`}>
          <Eyebrow label={label} badge={badge} />
          <HeroTitle title={title} />
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

        {bridge && <BridgeSeam />}
      </section>
    )
  }

  if (layout === 'fullbleed') {
    return (
      <section
        aria-label={typeof title === 'string' ? title : label}
        className={`${base} flex-col px-6 pb-16 pt-14 tablet:px-12 desktop:min-h-[75vh] desktop:px-20 desktop:pb-20 desktop:pt-20`}
      >
        <Brackets />

        {visual && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {visual}
          </div>
        )}

        <div className="relative z-10 mt-auto w-full desktop:w-[45%]">
          <div className="glass-panel p-8">
            <Eyebrow label={label} badge={badge} />
            <HeroTitle title={title} />
            {subhead && (
              <p
                className="fade-up mt-5 font-mono text-[15px] uppercase tracking-[0.16em] text-brand-ice/55"
                style={{ animationDelay: '0.32s' }}
              >
                {subhead}
              </p>
            )}
            {children && (
              <div className="fade-up mt-4" style={{ animationDelay: '0.45s' }}>
                {children}
              </div>
            )}
          </div>
        </div>

        {bridge && <BridgeSeam />}
      </section>
    )
  }

  if (layout === 'band') {
    return (
      <section
        aria-label={typeof title === 'string' ? title : label}
        className={`${base} flex-col px-6 pb-12 pt-14 tablet:px-12 desktop:min-h-[65vh] desktop:px-20 desktop:pb-16 desktop:pt-20`}
      >
        <Brackets />

        <div className="relative z-10 w-full">
          <Eyebrow label={label} badge={badge} />
          <HeroTitle title={title} />
          {subhead && (
            <p
              className="fade-up mt-5 font-mono text-[15px] uppercase tracking-[0.16em] text-brand-ice/55"
              style={{ animationDelay: '0.32s' }}
            >
              {subhead}
            </p>
          )}
          {children && (
            <div className="fade-up mt-4" style={{ animationDelay: '0.45s' }}>
              {children}
            </div>
          )}
        </div>

        {visual && (
          <div className="relative z-10 mt-10 w-full flex-1">
            {visual}
          </div>
        )}

        {bridge && <BridgeSeam />}
      </section>
    )
  }

  // 'right-visual' — default, matches original DarkHero 2-col behavior
  return (
    <section
      aria-label={typeof title === 'string' ? title : label}
      className={`${base} flex-col px-6 pb-16 pt-14 tablet:px-12 desktop:min-h-[65vh] desktop:flex-row desktop:items-center desktop:px-20 desktop:pb-20 desktop:pt-20`}
    >
      <Brackets />

      {visual && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 desktop:block">
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <div className="glow-cerulean h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]" />
          </div>
          {visual}
        </div>
      )}

      <div
        className={`relative z-10 ${
          visual
            ? 'w-full desktop:w-1/2'
            : 'mx-auto w-full max-w-[1100px]'
        }`}
      >
        <Eyebrow label={label} badge={badge} />
        <HeroTitle title={title} />
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

      {bridge && <BridgeSeam />}
    </section>
  )
}
