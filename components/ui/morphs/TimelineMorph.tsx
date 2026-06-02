'use client'

import { useEffect, useState } from 'react'

/**
 * Events hero visual — Cube → Timeline morph.
 *
 * Starts as the 52px instrument cube, then after a 600ms mount delay the front
 * face stretches into a 200px × 4px horizontal track. Once stretched, four
 * labelled node dots pop in sequentially (staggered 200ms each):
 * HACKATHON · IDEATHON · WORKSHOP · INDUSTRIAL VISIT.
 *
 * Pure CSS 3D + inline styles. No Three.js, no GSAP. Honours
 * prefers-reduced-motion by skipping to the end state.
 */

const FACE = 52
const TRANSLATE = 26
const TRACK_W = 200
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const T = `all 1.2s ${EASE}`

const NODES = ['HACKATHON', 'IDEATHON', 'WORKSHOP', 'INDUSTRIAL VISIT']

type S = React.CSSProperties

export function TimelineMorph({ className = '' }: { className?: string }) {
  // 0 = cube · 1 = stretched track · 2 = nodes revealed
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStage(2)
      return
    }
    const t1 = window.setTimeout(() => setStage(1), 600)
    const t2 = window.setTimeout(() => setStage(2), 600 + 1200)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  const stretched = stage >= 1
  const nodesIn = stage >= 2

  // Front face → timeline track.
  const track: S = stretched
    ? {
        position: 'absolute',
        width: TRACK_W,
        height: 4,
        left: -(TRACK_W - FACE) / 2,
        top: FACE / 2 - 2,
        background:
          'linear-gradient(90deg, rgba(0,164,228,0.6), rgba(212,168,83,0.6))',
        border: 'none',
        transition: T,
        transform: 'translateZ(0px)',
      }
    : {
        position: 'absolute',
        width: FACE,
        height: FACE,
        left: 0,
        top: 0,
        border: '1px solid rgba(0,164,228,0.4)',
        background: 'rgba(0,164,228,0.04)',
        transition: T,
        transform: `translateZ(${TRANSLATE}px)`,
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
          width: FACE,
          height: FACE,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-16deg) rotateY(-10deg)',
        }}
      >
        <div style={track} />

        {/* Node dots along the track — staggered fade/scale in. */}
        {stretched &&
          NODES.map((label, i) => {
            const x = -(TRACK_W - FACE) / 2 + (TRACK_W / (NODES.length - 1)) * i
            const amber = i === NODES.length - 1
            return (
              <div
                key={label}
                style={{
                  position: 'absolute',
                  left: x,
                  top: FACE / 2,
                  transform: `translate(-50%, -50%) scale(${nodesIn ? 1 : 0})`,
                  opacity: nodesIn ? 1 : 0,
                  transition: `all 0.4s ${EASE} ${i * 0.2}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: amber
                      ? 'rgba(212,168,83,0.95)'
                      : 'rgba(0,164,228,0.9)',
                    boxShadow: `0 0 8px ${
                      amber ? 'rgba(212,168,83,0.6)' : 'rgba(0,164,228,0.6)'
                    }`,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    whiteSpace: 'nowrap',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '7px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: amber
                      ? 'rgba(212,168,83,0.9)'
                      : 'rgba(183,207,232,0.7)',
                    transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(10px)',
                  }}
                >
                  {label}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
