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
 * Sizing — the entire hero fits in one screen:
 *   - Section height = 100dvh minus the masthead (`calc(100dvh - 3.5rem)`),
 *     so the user never has to scroll past the hero to see the Diorama or
 *     the microcopy band. `dvh` survives mobile-browser-chrome appearing.
 *   - CSS Grid `grid-rows-2` splits the section 50/50 deterministically —
 *     no flex-1 + min-content negotiation that previously collapsed the
 *     bottom panel.
 *   - Headline uses `clamp(40px, 5.5vw, 72px)` so on narrower desktops the
 *     display type can't push the top row past its allotted half.
 *
 * Composition: pagination at the very top; the headline + CTAs anchor to the
 * BOTTOM of the cream panel via `mt-auto`, so the title rests on the hairline
 * above the Diorama — magazine-cover editorial layout.
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
      className="grid h-[calc(100dvh-3.5rem)] grid-rows-2"
    >
      {/* Top panel — cream, type. Anchors title + CTAs to the hairline. */}
      <div className="flex flex-col gap-6 overflow-hidden border-b border-brand-navy/15 bg-bg-paper px-6 py-8 tablet:px-12 tablet:py-10 desktop:px-20 desktop:py-12">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
            001 / 005
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
            Center of Excellence — Efficiency Augmentation
          </span>
        </div>

        <div className="mt-auto grid grid-cols-1 items-end gap-6 tablet:grid-cols-12">
          <h1 className="font-display leading-[1.05] tracking-[-0.01em] text-brand-navy tablet:col-span-8 text-[clamp(40px,5.5vw,72px)]">
            Build the systems that move India next.
          </h1>
          <p className="font-body text-[15px] leading-[1.6] text-brand-navy/70 tablet:col-span-4 tablet:text-right">
            Six Industry&nbsp;4.0 capabilities. Founder-forward incubation,
            backed by STPI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="#apply"
            className="rounded-full bg-brand-navy px-5 py-2.5 font-body text-text-on-midnight transition hover:bg-brand-navy/90"
          >
            Apply for incubation
          </Link>
          <Link
            href="#work"
            className="rounded-full border border-brand-navy/30 px-5 py-2.5 font-body text-brand-navy transition hover:border-brand-cerulean hover:text-brand-cerulean"
          >
            Read the work
          </Link>
        </div>
      </div>

      {/* Bottom panel — midnight, cinematic media. */}
      <div className="relative overflow-hidden bg-bg-midnight">
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

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-5 tablet:px-12 tablet:pb-6 desktop:px-20 desktop:pb-8">
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
