'use client'

/**
 * Concept D — CSS-3D instrument cubes. No Three.js.
 *
 * Three spinning cubes: DIAGNOSE (cerulean) · INSTRUMENT (amber, centre) ·
 * MEASURE (cerulean), joined by connectors with animated data dots. Motion is
 * gated behind prefers-reduced-motion at render via the `motion-safe:` utility
 * on the spin animation.
 */

type CubeProps = {
  amber?: boolean
  delay?: number
  icon: React.ReactNode
}

function Cube({ amber, delay = 0, icon }: CubeProps) {
  return (
    <div
      className={`cube motion-safe:[animation:cube-spin_14s_linear_infinite] ${
        amber ? 'cube-amber' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="cube-face f">
        <span
          className={amber ? 'text-amber/70' : 'text-brand-cerulean/50'}
          aria-hidden
        >
          {icon}
        </span>
      </div>
      <div className="cube-face bk" />
      <div className="cube-face l" />
      <div className="cube-face r" />
      <div className="cube-face t" />
      <div className="cube-face bo" />
    </div>
  )
}

const IconDiagnose = (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
  </svg>
)
const IconInstrument = (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 12h6M12 9v6" />
  </svg>
)
const IconMeasure = (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

export function InstrumentCubes({ className = '' }: { className?: string }) {
  return (
    <div className={`relative z-[5] flex items-center ${className}`} aria-hidden="true">
      <div className="flex flex-col items-center gap-2.5">
        <Cube icon={IconDiagnose} />
        <span className="cube-tag font-mono text-[8px] uppercase tracking-[0.18em] text-brand-ice/45">
          Diagnose
        </span>
      </div>

      <div className="connector">
        <div className="dot-anim motion-safe:block hidden" />
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <Cube amber delay={-5} icon={IconInstrument} />
        <span className="cube-tag font-mono text-[8px] uppercase tracking-[0.18em] text-amber">
          Instrument
        </span>
      </div>

      <div className="connector">
        <div className="dot-anim rev motion-safe:block hidden" />
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <Cube delay={-10} icon={IconMeasure} />
        <span className="cube-tag font-mono text-[8px] uppercase tracking-[0.18em] text-brand-ice/45">
          Measure
        </span>
      </div>
    </div>
  )
}
