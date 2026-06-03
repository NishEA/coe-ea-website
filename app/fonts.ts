/**
 * Typography — Concept D (approved build).
 *
 * Display + body = Space Grotesk (one load, --ff-display serves both roles).
 * Labels / mono = Space Mono.
 *
 * Variable names are kept stable (--ff-display / --ff-mono) so the
 * Tailwind @theme mapping in globals.css resolves without change.
 * globals.css maps --font-body to var(--ff-display) to avoid a duplicate load.
 */
import { Space_Grotesk, Space_Mono } from "next/font/google";

/** Display + body — Space Grotesk (SIL OFL). One load for both roles. */
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-display",
  display: "swap",
});

/** Labels + numerics — Space Mono (SIL OFL). */
export const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});
