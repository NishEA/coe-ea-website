"use client";

/**
 * Lenis smooth-scroll provider — DESIGN.md §7.
 * Disabled when the user prefers reduced motion (DESIGN.md §7 / §10).
 */
import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // lerp mode (no duration): settles proportionally each frame.
      // duration:1.0 was worse — each inertia event restarts a 1s animation,
      // creating a freeze lock at the scroll boundary on trackpad.
      lerp: 0.12,
      smoothWheel: true,
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
