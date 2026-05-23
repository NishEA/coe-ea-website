/**
 * Typography — DESIGN.md §4.
 *
 * Display and body are PLACEHOLDERS. The licensed faces are not yet procured
 * (TODOS.md #2): Display = GT Sectra Display, Body = PP Neue Montreal. When the
 * licences land, swap these for `next/font/local` definitions pointing at the
 * font files — keep the same `variable` names (--ff-display / --ff-body) and
 * nothing else in the codebase has to change.
 *
 * Mono is NOT a placeholder — JetBrains Mono is the final choice (free, SIL OFL).
 */
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/** PLACEHOLDER for GT Sectra Display (editorial serif). */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

/** PLACEHOLDER for PP Neue Montreal (grotesque). */
export const fontBody = Inter({
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
