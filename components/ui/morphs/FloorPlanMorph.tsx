'use client'

import { useEffect, useState } from 'react'

/**
 * Book hero visual — Cube → Floor Plan morph.
 *
 * Three-stage animation: (0) tilted cube → (1) container rotates face-on
 * (600ms) → (2) faces spread into floor plan (1200ms). Staging ensures faces
 * never animate across a 3D perspective transform, eliminating visual teleport.
 */

const FACE = 52
const TRANSLATE = 26
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`

type FaceStyle = React.CSSProperties

export function FloorPlanMorph({ className = '' }: { className?: string }) {
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

  const faceBase: FaceStyle = {
    position: 'absolute',
    border: '1px solid rgba(0, 164, 228, 0.4)',
    background: 'rgba(0, 164, 228, 0.04)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    transition: T,
    fontFamily: '"Space Mono", monospace',
    fontSize: '7px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(183, 207, 232, 0.7)',
    padding: '4px',
    boxSizing: 'border-box',
    width: FACE,
    height: FACE,
  }

  // Top face — becomes the building footprint.
  const top: FaceStyle = morphed
    ? { ...faceBase, width: 160, height: 120, transform: `translate(-54px, -34px) translateZ(0px)`, background: 'rgba(0, 164, 228, 0.06)' }
    : { ...faceBase, transform: `rotateX(90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'bottom center' }

  // Four walls — collapse to 2px tall, expand in width.
  const wall = (
    label: string,
    rest: FaceStyle,
    morphRest: FaceStyle,
    amber = false,
  ): { style: FaceStyle; label: string } => ({
    label,
    style: morphed
      ? {
          ...faceBase,
          ...morphRest,
          height: 2,
          background: amber ? 'rgba(212, 168, 83, 0.5)' : 'rgba(0, 164, 228, 0.5)',
          borderColor: amber ? 'rgba(212, 168, 83, 0.6)' : 'rgba(0, 164, 228, 0.5)',
        }
      : { ...faceBase, ...rest },
  })

  const front = wall('LAB',
    { transform: `translateZ(${TRANSLATE}px)`, transformOrigin: 'top center' },
    { width: 160, transform: `translate(-54px, 24px) translateZ(0px)` },
  )
  const back = wall('MEETING',
    { transform: `rotateY(180deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'top center' },
    { width: 160, transform: `translate(-54px, -56px) translateZ(0px)` },
  )
  const left = wall('DEMO',
    { transform: `rotateY(-90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'right center' },
    { width: 120, transform: `translate(-88px, -16px) rotate(90deg) translateZ(0px)` },
  )
  const right = wall('HARDWARE BAY',
    { transform: `rotateY(90deg) translateZ(${TRANSLATE}px)`, transformOrigin: 'left center' },
    { width: 120, transform: `translate(72px, -16px) rotate(90deg) translateZ(0px)` },
    true,
  )

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
          // Stage 1: rotate container face-on first so faces animate in flat 2D space.
          transition: 'transform 0.6s ease-out',
          transform: stage >= 1
            ? 'rotateX(0deg) rotateZ(0deg)'
            : 'rotateX(-52deg) rotateZ(-12deg)',
        }}
      >
        <div style={top} />
        <div style={front.style}>{front.label}</div>
        <div style={back.style}>{back.label}</div>
        <div style={left.style}>{left.label}</div>
        <div style={right.style}>{right.label}</div>
      </div>
    </div>
  )
}
