import type { Metadata } from "next";

export const metadata: Metadata = { title: "Governance" };

/** Governance & Reports — design-doc §18 (funder audience). Built W5. */
export default function GovernancePage() {
  return (
    <section className="px-6 py-24 desktop:px-20">
      <h1 className="font-display text-4xl text-brand-navy">
        Governance &amp; Reports
      </h1>
      <p className="mt-3 font-body text-brand-navy/60">
        PMG, funding bodies, audited impact figures, official reports —
        placeholder. Built in W5.
      </p>
    </section>
  );
}
