'use client'

import { useEffect, useState } from 'react'

/**
 * Book hero visual — Cube → Floor Plan morph.
 *
 * Starts as the 52px instrument cube (same geometry as the hero), then after a
 * 600ms mount delay the top face expands into a flat building footprint and the
 * four side faces collapse to near-zero height while widening into the building
 * outline. The four side faces are labelled LAB · MEETING · DEMO · HARDWARE BAY.
 *
 * Pure CSS 3D + inline styles. No Three.js, no GSAP. Honours
 * prefers-reduced-motion by skipping straight to the end state.
 */

const FACE = 52
const TRANSLATE = 26
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`

type FaceStyle = React.CSSProperties

export function FloorPlanMorph({ className = '' }: { className?: string }) {
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

  // Top face — becomes the building footprint (the "floor").
  const top: FaceStyle = morphed
    ? {
        ...faceBase,
        width: 160,
        height: 120,
        transform: `translate(-54px, -34px) rotateX(90deg) translateZ(0px)`,
        background: 'rgba(0, 164, 228, 0.06)',
      }
    : { ...faceBase, transform: `rotateX(90deg) translateZ(${TRANSLATE}px)` }

  // Four walls — collapse to 2px tall, expand in width to form the outline.
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
          background: amber
            ? 'rgba(212, 168, 83, 0.5)'
            : 'rgba(0, 164, 228, 0.5)',
          borderColor: amber
            ? 'rgba(212, 168, 83, 0.6)'
            : 'rgba(0, 164, 228, 0.5)',
        }
      : { ...faceBase, ...rest },
  })

  const front = wall(
    'LAB',
    { transform: `translateZ(${TRANSLATE}px)` },
    { width: 160, transform: `translate(-54px, 24px) translateZ(0px)` },
  )
  const back = wall(
    'MEETING',
    { transform: `rotateY(180deg) translateZ(${TRANSLATE}px)` },
    { width: 160, transform: `translate(-54px, -56px) translateZ(0px)` },
  )
  const left = wall(
    'DEMO',
    { transform: `rotateY(-90deg) translateZ(${TRANSLATE}px)` },
    { width: 120, transform: `translate(-88px, -16px) rotate(90deg) translateZ(0px)` },
  )
  const right = wall(
    'HARDWARE BAY',
    { transform: `rotateY(90deg) translateZ(${TRANSLATE}px)` },
    { width: 120, transform: `translate(72px, -16px) rotate(90deg) translateZ(0px)` },
    true,
  )

  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: FACE,
          height: FACE,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-52deg) rotateZ(-12deg)',
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
