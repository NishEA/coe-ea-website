"use client";

/**
 * ScanReveal — cerulean scan-line wipe entrance.
 *
 * Reveals children via a clip-path wipe (right-side clip collapses to 0%).
 * A thin cerulean "hot line" div tracks the leading (right) edge of the
 * revealed region for the duration of the wipe, then fades out.
 *
 * Implementation uses CSS transitions driven by toggling inline styles on
 * inView, avoiding motion values on arbitrary children.
 *
 * Duration: 0.6 s, ease: EASE_CINEMA
 * Trigger:  useInView, once
 * Reduced-motion: renders children immediately, no animation.
 */

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface ScanRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const DURATION = 0.6 // seconds
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export function ScanReveal({ children, delay = 0, className }: ScanRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true })

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const transitionRule = (prop: string) =>
    inView ? `${prop} ${DURATION}s ${EASE} ${delay}s` : 'none'

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Content — clip wipe: inset right edge collapses from 100% to 0% */}
      <div
        style={{
          clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: transitionRule('clip-path'),
          willChange: 'clip-path',
        }}
      >
        {children}
      </div>

      {/*
       * Scan line — a 2 px cerulean vertical bar.
       * Positioned absolute, full height, 2 px wide.
       * left: 0% → 100% mirrors the advancing revealed-region right edge.
       * opacity fades out just after the wipe completes.
       */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: inView ? '100%' : '0%',
          width: 2,
          transform: 'translateX(-1px)', // keep it precisely on the leading edge
          background: 'var(--color-brand-cerulean, #00a4e4)',
          boxShadow: '0 0 8px 2px var(--color-brand-cerulean, #00a4e4)',
          opacity: inView ? 0 : 1,
          transition: [
            transitionRule('left'),
            // Fade the line out at the very end of the wipe
            inView
              ? `opacity 0.15s linear ${delay + DURATION - 0.1}s`
              : 'none',
          ]
            .filter(Boolean)
            .join(', '),
          willChange: 'left, opacity',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
