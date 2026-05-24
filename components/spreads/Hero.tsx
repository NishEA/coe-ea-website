/**
 * Spread 001 — Hero. Composed of two stacked 100dvh sub-spreads:
 *
 *   001a — Cover (editorial typographic cover on cream)
 *   001b — DioramaReveal (full-bleed Diorama on midnight)
 *
 * Both sub-spreads have scroll-snap-align: start; the snap container is
 * <body> per app/globals.css.
 *
 * Architecture + visual reference: hero-redesign-v1.md (Option Z).
 *
 * Replaces the failed cd2b62c attempt (90e05a8 → 9e6c0d1 → 3155079 → cd2b62c).
 */

import { Cover } from "./hero/Cover";
import { DioramaReveal } from "./hero/DioramaReveal";

export function HeroSpread() {
  return (
    <>
      <Cover />
      <DioramaReveal />
    </>
  );
}
