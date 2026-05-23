import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

/**
 * Privacy notice — built W8 from dpdp-privacy-scaffold-v1.md Part A, after the
 * legal review (TODOS.md #6). Placeholder until then.
 */
export default function PrivacyPage() {
  return (
    <section className="px-6 py-24 desktop:px-20">
      <h1 className="font-display text-4xl text-brand-navy">Privacy Notice</h1>
      <p className="mt-3 font-body text-brand-navy/60">
        DPDP-compliant privacy notice — placeholder. Built in W8 from the
        legally-reviewed scaffold.
      </p>
    </section>
  );
}
