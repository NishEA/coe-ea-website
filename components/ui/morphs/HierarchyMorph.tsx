'use client'

import { useEffect, useState } from 'react'

/**
 * Governance hero visual — Cube → Org Chart morph.
 *
 * Starts as the 52px instrument cube, then after a 600ms mount delay the faces
 * fly apart into a diamond of four nodes: the top face rises to become the
 * CoE-EA node (amber), the left and right faces slide out to KITS and STPI
 * (ice), and the bottom face drops to HPE. Thin connecting lines expand via
 * scaleX/scaleY between them.
 *
 * Pure CSS 3D + inline styles. No Three.js, no GSAP. Honours
 * prefers-reduced-motion by skipping to the end state.
 */

const FACE = 52
const TRANSLATE = 26
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`
const SPREAD = 78

type S = React.CSSProperties

export function HierarchyMorph({ className = '' }: { className?: string }) {
  const [morphed, setMorphed] = useState(false)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setMorphed(true)
      return
    }
    const id = window.setTimeout(() => setMorphed(true), 600)
    return () => window.clearTimeout(id)
  }, [])

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

  // Faces in cube state vs. node state.
  const top: S = morphed
    ? { ...node(true), transform: `translate(-28px, -${SPREAD}px) rotateX(0deg) translateZ(0px)` }
    : { ...node(true), width: FACE, height: FACE, transform: `rotateX(90deg) translateZ(${TRANSLATE}px)` }

  const left: S = morphed
    ? { ...node(), transform: `translate(-${SPREAD + 28}px, -20px) rotateY(0deg) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateY(-90deg) translateZ(${TRANSLATE}px)` }

  const right: S = morphed
    ? { ...node(), transform: `translate(${SPREAD - 28}px, -20px) rotateY(0deg) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateY(90deg) translateZ(${TRANSLATE}px)` }

  const bottom: S = morphed
    ? { ...node(), transform: `translate(-28px, ${SPREAD - 40}px) rotateX(0deg) translateZ(0px)` }
    : { ...node(), width: FACE, height: FACE, transform: `rotateX(-90deg) translateZ(${TRANSLATE}px)` }

  // Connecting lines — fade + scale in once morphed.
  const line = (extra: S): S => ({
    position: 'absolute',
    background: 'rgba(183,207,232,0.3)',
    transition: T,
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
          transform: 'rotateX(-18deg) rotateY(-14deg)',
        }}
      >
        {/* vertical spine: top → bottom */}
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
        {/* horizontal bar: left → right */}
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
