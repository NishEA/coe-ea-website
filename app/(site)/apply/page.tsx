import type { Metadata } from "next";

export const metadata: Metadata = { title: "Apply" };

/** Incubation application — design-doc §8. Placeholder; built W3–W4. */
export default function ApplyPage() {
  return (
    <section className="px-6 py-24 desktop:px-20">
      <h1 className="font-display text-4xl text-brand-navy">Apply</h1>
      <p className="mt-3 font-body text-brand-navy/60">
        Incubation application form — placeholder. Built in W3–W4.
      </p>
    </section>
  );
}
