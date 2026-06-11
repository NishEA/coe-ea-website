"use client";

/**
 * DepthLayer — scroll-driven parallax depth separation.
 *
 * Wraps children in a motion.div whose vertical position is offset by a
 * scroll-rate multiplier, creating the illusion of depth layers.
 *
 * Bands:
 *   field  — rate 0.2  (moves slower; feels distant/deep)
 *   glass  — rate 0.85 (slight drag; glass-card layer)
 *   type   — rate 1.0  (natural scroll; headline layer)
 *
 * scrollRate contract:
 *   For every 100 px of page scroll, the element translates
 *   (scrollRate - 1) * scrollY px on the Y axis.
 *   rate < 1 → element moves up slower than the page (appears further away).
 *   rate = 1 → element moves at normal scroll speed (no parallax).
 *
 * Reduced-motion: renders children with no transform applied.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

type Band = 'field' | 'glass' | 'type'

interface DepthLayerProps {
  band: Band
  children: React.ReactNode
  className?: string
}

const SCROLL_RATES: Record<Band, number> = {
  field: 0.2,
  glass: 0.85,
  type: 1.0,
}

export function DepthLayer({ band, children, className }: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // useScroll / useTransform must be called unconditionally (Rules of Hooks).
  // We gate the output value below, but the hooks themselves always run.
  const { scrollY } = useScroll()

  // Derive the parallax offset from scrollY.
  // At scrollY = 0   → y = 0
  // At scrollY = 500 → y = (rate - 1) * 500
  //   field:  (0.2  - 1) * 500 = -400 px (moves up slower, net -400 relative)
  //   glass:  (0.85 - 1) * 500 =  -75 px
  //   type:   (1.0  - 1) * 500 =    0 px (no offset)
  const rate = SCROLL_RATES[band]
  const yValue = useTransform(scrollY, (latest: number) =>
    reduced ? 0 : (rate - 1) * latest,
  )

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: yValue }}
    >
      {children}
    </motion.div>
  )
}
