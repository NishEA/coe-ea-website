"use client";

/**
 * DecodeText — scramble-then-resolve text animation for mono labels.
 *
 * On inView, scrambles the text through random characters 5 frames deep,
 * resolving left-to-right, 24 ms per character position.
 *
 * Scramble character set: '01<>/·—∙█▓░'
 * Only suitable for mono-spaced labels (not headings).
 *
 * Reduced-motion: displays text immediately, no scramble.
 */

import { useRef, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface DecodeTextProps {
  text: string
  className?: string
  delay?: number
}

const SCRAMBLE_CHARS = '01<>/·—∙█▓░'
const FRAMES_PER_CHAR = 5
const INTERVAL_MS = 24

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

export function DecodeText({ text, className, delay = 0 }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState<string>(
    reduced ? text : text.replace(/./g, randomChar()),
  )
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (reduced || !inView || hasAnimated.current) return
    hasAnimated.current = true

    // Total iterations: each resolved position takes FRAMES_PER_CHAR ticks;
    // the last character resolves at position (text.length - 1).
    // Overall: text.length * FRAMES_PER_CHAR ticks.
    const totalTicks = text.length * FRAMES_PER_CHAR
    let tick = 0

    const delayMs = delay * 1000

    const run = () => {
      const intervalId = setInterval(() => {
        tick++

        // How many characters have resolved so far
        const resolved = Math.floor(tick / FRAMES_PER_CHAR)

        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (i < resolved) return char
              // Keep spaces as spaces — don't scramble whitespace
              if (char === ' ') return ' '
              return randomChar()
            })
            .join(''),
        )

        if (tick >= totalTicks) {
          clearInterval(intervalId)
          setDisplayed(text)
        }
      }, INTERVAL_MS)

      return intervalId
    }

    if (delayMs > 0) {
      const timeoutId = setTimeout(run, delayMs)
      return () => clearTimeout(timeoutId)
    }

    const intervalId = run()
    return () => clearInterval(intervalId)
  }, [inView, reduced, text, delay])

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      aria-live="off"
    >
      {displayed}
    </span>
  )
}
