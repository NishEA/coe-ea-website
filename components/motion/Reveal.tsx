"use client";

/**
 * Reveal — the one general-purpose scroll-reveal primitive.
 * Motion budget per DESIGN.md §7 = 2-3 motions site-wide. This is one of them.
 * Respects prefers-reduced-motion via Framer's useReducedMotion.
 */
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
