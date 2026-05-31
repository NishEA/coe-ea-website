'use client'

import { useEffect, useState } from 'react'

/**
 * Portfolio hero visual — Cube → Startup Network morph.
 *
 * Starts as the amber instrument cube, then after 600ms the faces fly out
 * into 6 startup-node cards in two arcing rows, with a central amber CoE-EA
 * hub and thin cerulean connecting spokes.
 *
 * Pure CSS 3D + inline styles. No Three.js, no GSAP. Honours
 * prefers-reduced-motion by skipping straight to end state.
 */

const FACE = 52
const TRANSLATE = 26
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`

type S = React.CSSProperties

const STARTUPS = ['WATER', 'MFG', 'ENERGY', 'HEALTH', 'TRANSPORT', 'ASSETS']

const POSITIONS: { dx: number; dy: number }[] = [
  { dx: -110, dy: -55 },
  { dx:    0, dy: -70 },
  { dx:  110, dy: -55 },
  { dx: -110, dy:  30 },
  { dx:    0, dy:  50 },
  { dx:  110, dy:  30 },
]

export function PortfolioMorph({ className = '' }: { className?: string }) {
  const [morphed, setMorphed] = useState(false)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setMorphed(true); return }
    const id = window.setTimeout(() => setMorphed(true), 600)
    return () => window.clearTimeout(id)
  }, [])

  const hub: S = {
    position: 'absolute',
    width: morphed ? 52 : FACE,
    height: morphed ? 36 : FACE,
    border: '1px solid rgba(212,168,83,0.65)',
    background: 'rgba(212,168,83,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Space Mono", monospace',
    fontSize: '8px', letterSpacing: '0.12em',
    color: 'rgba(212,168,83,0.95)',
    transform: morphed
      ? 'translate(-26px, -18px) translateZ(0px)'
      : `rotateX(90deg) translateZ(${TRANSLATE}px)`,
    transition: T,
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          width: FACE, height: FACE,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-14deg) rotateY(-10deg)',
        }}
      >
        {/* Connecting spokes — appear once morphed */}
        {POSITIONS.map((p, i) => {
          const angle = Math.atan2(p.dy, p.dx) * (180 / Math.PI)
          const dist = Math.sqrt(p.dx * p.dx + p.dy * p.dy)
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: dist, height: 1,
                background: 'rgba(0,164,228,0.25)',
                transformOrigin: '0 0',
                transform: `rotate(${angle}deg)`,
                opacity: morphed ? 1 : 0,
                transition: T,
                transitionDelay: `${0.3 + i * 0.05}s`,
              }}
            />
          )
        })}

        {/* Satellite nodes */}
        {STARTUPS.map((label, i) => {
          const p = POSITIONS[i]
          const node: S = morphed
            ? {
                position: 'absolute',
                width: 58, height: 28,
                border: '1px solid rgba(0,164,228,0.35)',
                background: 'rgba(0,164,228,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Space Mono", monospace',
                fontSize: '7px', letterSpacing: '0.1em',
                color: 'rgba(183,207,232,0.75)',
                transform: `translate(${p.dx - 29}px, ${p.dy - 14}px) translateZ(0px)`,
                transition: T,
                transitionDelay: `${i * 0.06}s`,
              }
            : {
                position: 'absolute',
                width: FACE, height: FACE,
                opacity: 0,
                transform: `rotateY(${i % 2 === 0 ? -90 : 90}deg) translateZ(${TRANSLATE}px)`,
                transition: T,
              }
          return (
            <div key={label} style={node}>
              {morphed ? label : ''}
            </div>
          )
        })}

        {/* Hub — amber CoE-EA centre node */}
        <div style={hub}>{morphed ? 'CoE-EA' : ''}</div>
      </div>
    </div>
  )
}
