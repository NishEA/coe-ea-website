'use client'

import { useEffect, useState } from 'react'

/**
 * Governance hero visual — Cube → Org Chart morph.
 *
 * Three-stage animation: (0) tilted cube → (1) container rotates face-on
 * (600ms) → (2) faces fly out into org chart nodes (1200ms). Connectors
 * grow after nodes land via scaleX/scaleY with delay.
 */

const FACE = 52
const TRANSLATE = 26
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`
const SPREAD = 78

type S = React.CSSProperties

export function HierarchyMorph({ className = '' }: { className?: string }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setStage(2); return }
    const t1 = window.setTimeout(() => setStage(1), 600)
    const t2 = window.setTimeout(() => setStage(2), 1200)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [])

  const morphed = stage >= 2

  const node = (amber = false): S => ({
    position: 'absolute',
    width: 56,
    height: 40,
    border: `1px solid ${amber ? 'rgba(212,168,83,0.6)' : 'rgba(0,164,228,0.45)'}`,
    background: amber ? 'rgba(212,168,83,0.08)' : 'rgba(0,164,228,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Space Mono", monospace',
    fontSize: '8px',
    letterSpacing: '0.12em',
    color: amber ? 'rgba(212,168,83,0.95)' : 'rgba(183,207,232,0.85)',
    transition: T,
  })

  const top: S = morphed
    ? { ...node(true), transform: `translate(-28px, -${SPREAD}px) translateZ(0px)` }
    : { ...node(true), width: FACE, height: FACE, transform: `rotateX(90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'bottom center' }

  const left: S = morphed
    ? { ...node(), transform: `translate(-${SPREAD + 28}px, -20px) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateY(-90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'right center' }

  const right: S = morphed
    ? { ...node(), transform: `translate(${SPREAD - 28}px, -20px) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateY(90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'left center' }

  const bottom: S = morphed
    ? { ...node(), transform: `translate(-28px, ${SPREAD - 40}px) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateX(-90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'top center' }

  // Connectors grow after nodes land (0.4s delay so nodes are already in place).
  const line = (extra: S): S => ({
    position: 'absolute',
    background: 'rgba(183,207,232,0.3)',
    transition: `all 0.6s ${EASE} 0.4s`,
    opacity: morphed ? 1 : 0,
    ...extra,
  })

  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          width: FACE,
          height: FACE,
          position: 'relative',
          transformStyle: 'preserve-3d',
          // Stage 1: rotate container face-on first so nodes animate in flat 2D space.
          transition: 'transform 0.6s ease-out',
          transform: stage >= 1
            ? 'rotateX(0deg) rotateY(0deg)'
            : 'rotateX(-18deg) rotateY(-14deg)',
        }}
      >
        {/* vertical spine — grows down from top node */}
        <div
          style={line({
            left: 0,
            top: -SPREAD + 40,
            width: 1,
            height: SPREAD * 2 - 60,
            transform: morphed ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
          })}
        />
        {/* horizontal bar — grows from center outward */}
        <div
          style={line({
            left: -SPREAD,
            top: 0,
            width: SPREAD * 2,
            height: 1,
            transform: morphed ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
          })}
        />
        <div style={top}>CoE-EA</div>
        <div style={left}>KITS</div>
        <div style={right}>STPI</div>
        <div style={bottom}>HPE</div>
      </div>
    </div>
  )
}
