"use client";

/**
 * Materialise — MATERIALISE entrance animation.
 *
 * Wraps any child in a motion.div that fades, rises, unblurs, and scales
 * into view when the element enters the viewport.
 *
 * Physics: opacity 0→1, y 24→0, blur 12px→0, scale 0.97→1
 * Duration: 0.9 s, ease: EASE_CINEMA
 * Trigger:  useInView, once, margin -15% top
 *
 * Reduced-motion: renders children immediately, no animation.
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { EASE_CINEMA } from '@/lib/motion/primitives'

interface MaterialiseProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Materialise({
  children,
  delay = 0,
  className,
}: MaterialiseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 24,
        filter: 'blur(12px)',
        scale: 0.97,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
          : { opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.97 }
      }
      transition={{
        duration: 0.9,
        ease: EASE_CINEMA,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
