/**
 * Typography — Concept D (approved build).
 *
 * Display + body = Space Grotesk. Labels / mono = Space Mono.
 * These are the two faces used throughout the approved concept-d mockup.
 *
 * Variable names are kept stable (--ff-display / --ff-body / --ff-mono) so the
 * Tailwind @theme mapping in globals.css and every `font-*` utility resolve
 * without change.
 */
import { Space_Grotesk, Space_Mono } from "next/font/google";

/** Display + body — Space Grotesk (SIL OFL). */
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-display",
  display: "swap",
});

/** Body shares Space Grotesk — one geometric grotesque across the build. */
export const fontBody = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-body",
  display: "swap",
});

/** Labels + numerics — Space Mono (SIL OFL). */
export const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});
