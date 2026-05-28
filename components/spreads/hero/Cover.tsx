"use client";

/**
 * Spread 001a — Editorial Cover. Per hero-redesign-v1.md section 2.1.
 *
 * Pure typographic cover on cream paper. Masthead at top, paging + subtitle
 * row, massive serif H1 with "move India" rendered at font-weight 600 (NOT
 * italic — per Gemini review feedback), support paragraph, two CTAs with
 * primary leading rightmost, pulsing scroll cue at bottom.
 *
 * Section height: 100dvh. Scroll-snap-align: start (snap container is body,
 * set in app/globals.css).
 *
 * Entrance motion via Framer Motion 12 — staggered fade + slide on first
 * paint. Respects prefers-reduced-motion via the useReducedMotion hook.
 *
 * Copy is PLACEHOLDER — TODO(W9) markers below — final pass in W9.
 */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Masthead } from "@/components/site/Masthead";

export function Cover() {
  const reduceMotion = useReducedMotion();

  // When reduced motion is requested, collapse the entire entrance to a
  // single 200ms opacity fade (per spec section 5.3).
  const animate = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2 },
        }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      aria-label="Hero — Cover"
      className="relative flex h-[100dvh] snap-start flex-col bg-bg-paper text-text-on-paper"
    >
      <Masthead />

      <main className="flex flex-1 flex-col justify-end px-6 pb-28 pt-12 tablet:px-12 tablet:pb-32 desktop:px-20">
        <motion.div
          {...animate(0)}
          className="mb-9 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          <span className="font-semibold text-brand-navy">001 / 005</span>
          <span className="text-text-on-paper/80">
            {/* TODO(W9): copy pass */}
            Centre of Excellence — Efficiency Augmentation
          </span>
        </motion.div>

        <motion.h1
          {...animate(0.06)}
          className="mb-7 max-w-[22ch] font-display text-[clamp(48px,6vw,104px)] font-normal leading-[0.95] tracking-[-0.028em] text-brand-navy"
        >
          {/* TODO(W9): copy pass */}
          <span className="block">Build the systems</span>
          <span className="block">
            that <span className="font-semibold">move India</span> next.
          </span>
        </motion.h1>

        <div className="grid items-end gap-8 tablet:grid-cols-[1.4fr_1fr] tablet:gap-14">
          <motion.p
            {...animate(0.18)}
            className="max-w-[42ch] font-body text-[clamp(16px,1.1vw,18px)] leading-[1.55] text-text-on-paper"
          >
            {/* TODO(W9): copy pass */}
            Ten Industry&nbsp;4.0 capabilities — manufacturing, energy, water,
            farming, automation, transport, weather, hospital, security, asset
            monitoring. Founder-forward incubation, backed by STPI.
          </motion.p>

          <motion.div
            {...animate(0.24)}
            className="flex flex-col-reverse gap-3 tablet:flex-row tablet:flex-wrap tablet:items-center tablet:justify-end"
          >
            {/* Outline FIRST in DOM so primary lands rightmost on desktop
                (tablet:justify-end pushes the last child rightmost). On
                mobile flex-col-reverse stacks primary on TOP. */}
            <Link
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/30 px-6 py-3.5 font-body text-sm font-medium text-brand-navy transition hover:border-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 focus-visible:ring-offset-bg-paper"
            >
              Read the work
            </Link>
            <Link
              href="/apply"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 font-body text-sm font-semibold text-text-on-midnight shadow-[0_14px_32px_rgba(14,45,122,0.25)] transition hover:-translate-y-px hover:shadow-[0_20px_40px_rgba(14,45,122,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-spark focus-visible:ring-offset-2 focus-visible:ring-offset-bg-paper"
            >
              Apply for incubation
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Proof strip — visible without scrolling; full breakdown in 005 */}
        <motion.div
          {...animate(0.34)}
          className="mt-10 border-t border-brand-navy/10 pt-7"
        >
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 tablet:gap-x-12">
            {(
              [
                { value: "52", label: "Startups incubated" },
                { value: "336", label: "Jobs created" },
                { value: "₹230 Cr", label: "Portfolio valuation" },
                { value: "23", label: "Patents filed" },
              ] as const
            ).map((s) => (
              <li key={s.label} className="flex items-baseline gap-2.5 whitespace-nowrap">
                <span className="font-display text-[26px] leading-none tracking-[-0.01em] text-brand-navy tablet:text-[30px]">
                  {s.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-navy/55">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>

      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.55, 1, 0.55],
            y: [0, 4, 0],
          }}
          transition={{
            opacity: {
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            },
            y: {
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            },
          }}
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-brand-navy/80"
        >
          <span>Scroll for the work</span>
          <span aria-hidden>↓</span>
        </motion.div>
      )}
    </section>
  );
}
