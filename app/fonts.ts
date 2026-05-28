/**
 * Typography — DESIGN.md §4.
 *
 * Display = Cormorant Garamond (free, SIL OFL) — editorial serif, closer to
 * GT Sectra Display than the Fraunces placeholder. Body = Plus Jakarta Sans
 * (free, SIL OFL) — geometric grotesque that tracks PP Neue Montreal.
 *
 * If the licensed faces (GT Sectra Display / PP Neue Montreal) are procured
 * later, swap these for `next/font/local` definitions — keep the same
 * `variable` names (--ff-display / --ff-body) and nothing else changes.
 *
 * Mono is NOT a placeholder — JetBrains Mono is the final choice (free, SIL OFL).
 */
import { Source_Serif_4, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/** Editorial serif — Source Serif 4 (SIL OFL). Structured, screen-optimised,
 *  stable numerals, proper black weight for display headlines. */
export const fontDisplay = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

/** Geometric grotesque — Plus Jakarta Sans (SIL OFL). */
export const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

/** FINAL — JetBrains Mono (DESIGN.md §4). */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  display: "swap",
});
