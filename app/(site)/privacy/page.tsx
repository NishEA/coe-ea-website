import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice — CoE-EA",
  description:
    "Privacy notice for the Centre of Excellence on Efficiency Augmentation application process, compliant with the Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-[720px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Privacy notice
        </span>
        <h1 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[44px]">
          How we handle your data.
        </h1>
        <p className="mt-4 font-body text-[14px] text-brand-navy/60">
          Effective date: 27 May 2026 &middot; Version 1.0
        </p>

        <div className="mt-12 space-y-10 font-body text-[16px] leading-[1.7] text-brand-navy/80">
          <section aria-labelledby="who-we-are">
            <h2 id="who-we-are" className="mb-3 font-display text-[22px] text-brand-navy">
              1. Who we are
            </h2>
            <p>
              The Centre of Excellence on Efficiency Augmentation (CoE-EA) is
              operated by Software Technology Parks of India (STPI), an
              autonomous society under the Ministry of Electronics and
              Information Technology (MeitY), Government of India. For the
              purposes of the Digital Personal Data Protection Act, 2023
              (&ldquo;DPDP Act&rdquo;), STPI is the <strong>Data Fiduciary</strong>.
            </p>
            <p className="mt-3">
              Registered address: Software Technology Parks of India,
              Electronics Niketan, 6, CGO Complex, Lodhi Road,
              New Delhi &ndash; 110&nbsp;003.
            </p>
          </section>

          <section aria-labelledby="data-collected">
            <h2 id="data-collected" className="mb-3 font-display text-[22px] text-brand-navy">
              2. Data we collect
            </h2>
            <p>When you submit an incubation application, we collect:</p>
            <ul className="mt-3 space-y-1">
              {[
                "Name and email address",
                "Phone number",
                "Startup name and capability domain",
                "Current stage of the startup",
                "Incorporation and Karnataka registration status",
                "Problem statement and motivation for applying",
                "Capital raised (optional)",
                "How you heard about the programme (optional)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="font-mono text-brand-cerulean">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do not collect financial statements, investor information, or
              sensitive personal data at the application stage.
            </p>
          </section>

          <section aria-labelledby="purpose">
            <h2 id="purpose" className="mb-3 font-display text-[22px] text-brand-navy">
              3. Why we collect it
            </h2>
            <p>Your data is used solely for:</p>
            <ul className="mt-3 space-y-1">
              {[
                "Evaluating your incubation application",
                "Communicating with you about your application status",
                "Programme reporting to STPI and MeitY as required by the Centre's funding agreement",
                "Aggregate, anonymised analytics to improve the programme (no individual identification)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="font-mono text-brand-cerulean">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <strong>Legal basis:</strong> Consent under Section&nbsp;7(a) of the DPDP
              Act, 2023, provided via the consent checkbox on the application form.
            </p>
          </section>

          <section aria-labelledby="sharing">
            <h2 id="sharing" className="mb-3 font-display text-[22px] text-brand-navy">
              4. Who we share it with
            </h2>
            <ul className="mt-3 space-y-1">
              {[
                "Selection committee members (Centre Director, STPI Programme Officers, domain advisors) for application evaluation",
                "STPI internal teams for programme administration",
                "MeitY, for aggregate programme reporting (PII is not included in standard MeitY reports)",
                "Our cloud infrastructure provider (Supabase Inc.) — data stored in the ap-south-1 (Mumbai) region",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="font-mono text-brand-cerulean">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your data with industry partners,
              advertisers, or any third parties outside of the above.
            </p>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className="mb-3 font-display text-[22px] text-brand-navy">
              5. How long we keep it
            </h2>
            <ul className="mt-3 space-y-1">
              {[
                "Unsuccessful applicants: data retained for 36 months from submission, then deleted.",
                "Selected incubatees: data retained for the incubation term plus 24 months after graduation or exit.",
                "Aggregate statistics (no personal data): retained indefinitely.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="font-mono text-brand-cerulean">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className="mb-3 font-display text-[22px] text-brand-navy">
              6. Your rights
            </h2>
            <p>Under the DPDP Act, 2023, you have the right to:</p>
            <ul className="mt-3 space-y-1">
              {[
                "Access the personal data we hold about you",
                "Correct inaccurate or incomplete personal data",
                "Withdraw your consent (withdrawal before a decision is made will close your application)",
                "Request erasure of your data, subject to GoI regulatory retention requirements",
                "Nominate a representative to exercise rights on your behalf",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="font-mono text-brand-cerulean">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">To exercise any of these rights, contact the Grievance Officer below.</p>
          </section>

          <section aria-labelledby="no-overseas">
            <h2 id="no-overseas" className="mb-3 font-display text-[22px] text-brand-navy">
              7. Data location
            </h2>
            <p>
              All personal data is stored in India, in the AWS ap-south-1 (Mumbai)
              region. No personal data is transferred outside India.
            </p>
          </section>

          <section aria-labelledby="grievance">
            <h2 id="grievance" className="mb-3 font-display text-[22px] text-brand-navy">
              8. Grievance Officer
            </h2>
            <p>
              The designated Grievance Officer for CoE-EA data matters, as required
              under the DPDP Act, 2023:
            </p>
            <div className="mt-4 border border-brand-navy/15 p-6">
              <p className="font-semibold text-brand-navy">Programme Officer, CoE-EA</p>
              <p className="mt-1">Software Technology Parks of India &ndash; Bengaluru</p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:blr.coeea@stpi.in" className="text-brand-cerulean hover:underline">
                  blr.coeea@stpi.in
                </a>
              </p>
              <p className="mt-1 text-brand-navy/60">
                Grievances responded to within 30 days of receipt.
              </p>
            </div>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="mb-3 font-display text-[22px] text-brand-navy">
              9. Changes to this notice
            </h2>
            <p>
              Material changes will be communicated via email to applicants with active
              submissions. The effective date at the top of this page is updated on
              each revision.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-brand-navy/15 pt-8">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
