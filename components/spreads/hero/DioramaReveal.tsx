"use client";

/**
 * Spread 001b — Diorama Reveal. Per hero-redesign-v1.md section 2.2.
 *
 * Full-bleed midnight section. The Glass Diorama video plays uncropped
 * via object-fit: contain (invisible midnight letterbox on sides because
 * the surrounding bg is also midnight).
 *
 * Mobile collapses to 70dvh + object-fit: cover so the cube stays
 * vertically uncropped on portrait viewports (the 100dvh + contain
 * approach would letterbox vertically, shrinking the cube). Per paired
 * AI review.
 *
 * Reduced motion: autoPlay is disabled; the video element shows its
 * poster attribute statically. No element-type swap (avoids SSR/CSR
 * hydration mismatch).
 *
 * IntersectionObserver triggers entrance overlay fade-in when the
 * section is 30% in view. Video itself uses native autoplay/loop.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function DioramaReveal() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });

  const overlayAnimate = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2 },
        }
      : {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — The Glass Diorama"
      className="relative h-[70dvh] snap-start overflow-hidden bg-bg-midnight tablet:h-[100dvh]"
    >
      <video
        aria-hidden="true"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero/diorama-hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover tablet:object-contain"
      >
        {/* Mobile: 1280x720 — smaller file, no thermal throttling on mid-range Android */}
        <source
          src="/hero/diorama-hero-mobile.webm"
          type="video/webm"
          media="(max-width: 768px)"
        />
        <source
          src="/hero/diorama-hero-mobile.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        />
        {/* Desktop: full 1920x1056 */}
        <source src="/hero/diorama-hero.webm" type="video/webm" />
        <source src="/hero/diorama-hero.mp4" type="video/mp4" />
      </video>

      {/* Radial ambient glow — boosts perceived saturation of the cube glow
          without altering the source. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,164,228,0.16), rgba(46,230,255,0.04) 40%, transparent 75%)",
        }}
      />

      {/* Editorial overlay — top bar, center spacer, bottom bar */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
        <motion.div
          {...overlayAnimate(0)}
          className="flex items-baseline justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.22em] tablet:px-12 desktop:px-20"
        >
          <span className="text-ice/80">
            <span className="font-semibold text-accent-spark">001 / 005</span>
            <span className="mx-2 opacity-60">·</span>
            The Glass Diorama
          </span>
          <span className="hidden text-ice/80 tablet:inline">
            A 1:32 industrial micro-scene
          </span>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          {...overlayAnimate(0.12)}
          className="flex items-end justify-between gap-4 px-6 pb-6 font-mono text-[11px] uppercase tracking-[0.22em] tablet:px-12 desktop:px-20"
        >
          <span className="tracking-[0.18em] text-ice/75">
            {/* TODO(W9): copy pass */}
            The systems we help build, in miniature
          </span>
          <span className="text-[10px] text-ice/65">Continue ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
