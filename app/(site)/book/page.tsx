import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book" };

/** Facility booking — design-doc §16 "New Scope — Facility Booking". Built W6–W7. */
export default function BookPage() {
  return (
    <section className="px-6 py-24 desktop:px-20">
      <h1 className="font-display text-4xl text-brand-navy">Book a facility</h1>
      <p className="mt-3 font-body text-brand-navy/60">
        Facility booking — placeholder. Built in W6–W7.
      </p>
    </section>
  );
}
