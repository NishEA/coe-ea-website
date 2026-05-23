"use client";

/**
 * Spread 001 — Hero. Design-doc §4 (Two-Panel Editorial Hero / Cognitra DNA)
 * + §5 (The Glass Diorama). The six locked devices:
 *   (1) Two-panel composition: cream type panel TOP, midnight media panel BOTTOM
 *   (2) Editorial nav — provided by the (site) layout
 *   (3) Asymmetric type — massive left-aligned display + smaller right-aligned support
 *   (4) 001 / 005 pagination
 *   (5) Pill CTA pair — one filled (primary), one outlined (secondary)
 *   (6) Cinematic media + microcopy — caption bottom-left, scroll cue centred,
 *       mini-microcopy bottom-right. Only the 3D moves.
 *
 * Reduced motion (DESIGN.md §7/§10): Diorama → static poster image.
 *
 * Copy is PLACEHOLDER — final pass in W9 (re-baselined Section 11).
 */
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSpread() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      aria-label="Hero — spread 001"
      className="flex min-h-screen flex-col"
    >
      {/* Top panel — cream, type */}
      <div className="flex flex-1 flex-col justify-between gap-12 border-b border-brand-navy/15 bg-bg-paper px-6 py-10 tablet:px-12 tablet:py-14 desktop:px-20 desktop:py-16">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
            001 / 005
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
            Center of Excellence — Efficiency Augmentation
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 tablet:grid-cols-12">
          <h1 className="font-display text-[42px] leading-[1.05] tracking-[-0.01em] text-brand-navy tablet:col-span-8 tablet:text-[64px] desktop:text-[80px]">
            Build the systems that move India next.
          </h1>
          <p className="font-body text-[17px] leading-[1.6] text-brand-navy/70 tablet:col-span-4 tablet:text-right">
            Six Industry&nbsp;4.0 capabilities. Founder-forward incubation,
            backed by STPI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="#apply"
            className="rounded-full bg-brand-navy px-6 py-3 font-body text-text-on-midnight transition hover:bg-brand-navy/90"
          >
            Apply for incubation
          </Link>
          <Link
            href="#work"
            className="rounded-full border border-brand-navy/30 px-6 py-3 font-body text-brand-navy transition hover:border-brand-cerulean hover:text-brand-cerulean"
          >
            Read the work
          </Link>
        </div>
      </div>

      {/* Bottom panel — midnight, cinematic media */}
      <div className="relative flex flex-1 items-end overflow-hidden bg-bg-midnight">
        {reduceMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/hero/diorama-hero-poster.jpg"
            alt="The Glass Diorama — a transparent glass cube on a midnight studio plinth, containing a 1:32 industrial micro-scene with a robotic arm, conveyor, and sensor LEDs."
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            aria-label="The Glass Diorama — a 12-second loop of a glass cube on a midnight studio plinth containing a 1:32 industrial micro-scene."
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/diorama-hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero/diorama-hero.webm" type="video/webm" />
            <source src="/hero/diorama-hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Microcopy band — caption (BL), scroll cue (centre), mini-microcopy (BR). */}
        <div className="relative z-10 flex w-full items-end justify-between px-6 pb-6 tablet:px-12 tablet:pb-8 desktop:px-20 desktop:pb-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-on-midnight/80">
            The Glass Diorama
          </span>
          <span
            aria-hidden
            className="hidden font-mono text-[12px] uppercase tracking-[0.18em] text-text-on-midnight/70 tablet:inline"
          >
            Scroll&nbsp;↓
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-on-midnight/60">
            001 / 005
          </span>
        </div>
      </div>
    </section>
  );
}
