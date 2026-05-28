/**
 * Spread 004 — Apply. Design-doc §8 + §16 Pass 3.
 *
 * "What you get" strip (5 benefit tokens) — editorial ledger, paper background.
 * Eligibility signal — two quick criteria, no gate-keeping language.
 * The form itself — ApplyForm (client component, useActionState).
 * Cohort footer — "Next cohort opens [TBD]" placeholder.
 */
import Link from "next/link";
import { ApplyForm } from "@/components/forms/apply/ApplyForm";

const BENEFITS = [
  {
    value: "₹10L",
    label: "Seed funding",
    detail: "Non-dilutive grant to get you moving.",
  },
  {
    value: "Lab",
    label: "Hardware access",
    detail: "IoT testbeds, instrumented bays, edge compute.",
  },
  {
    value: "Mentors",
    label: "Domain mentors",
    detail: "Industry practitioners, not generalist advisors.",
  },
  {
    value: "50%",
    label: "Market support",
    detail: "Reimbursement on qualifying customer-development travel.",
  },
  {
    value: "Network",
    label: "Partner ecosystem",
    detail: "HPE · Intel · Bosch · Schneider · MathWorks.",
  },
];

export function ApplySpread() {
  return (
    <section
      id="apply"
      aria-label="Apply — spread 004"
      className="border-b border-brand-navy/15 bg-bg-paper px-6 py-20 tablet:px-12 tablet:py-24 desktop:px-20 desktop:py-32"
    >
      {/* Spread header */}
      <header className="mb-12 flex items-baseline justify-between tablet:mb-16">
        <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
          004 / 005
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
          Apply
        </span>
      </header>

      {/* Section headline */}
      <div className="mb-16 grid grid-cols-1 items-end gap-8 tablet:mb-20 tablet:grid-cols-12">
        <h2 className="font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:col-span-8 tablet:text-[52px]">
          Apply to join the next cohort.
        </h2>
        <p className="font-body text-[17px] leading-[1.6] text-brand-navy/70 tablet:col-span-4 tablet:text-right">
          Applications are reviewed on a rolling basis. Shortlisted founders are
          contacted within two weeks.
        </p>
      </div>

      {/* What you get — 5 benefit tokens */}
      <div className="mb-16 border-t border-brand-navy/15 pt-12 tablet:mb-20 tablet:pt-16">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
          What you get
        </p>
        <ul className="grid grid-cols-1 gap-6 tablet:grid-cols-5">
          {BENEFITS.map((b) => (
            <li key={b.label}>
              <span className="font-display text-[40px] leading-none tracking-[-0.02em] text-brand-cerulean tablet:text-[48px]">
                {b.value}
              </span>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
                {b.label}
              </p>
              <p className="mt-1 font-body text-[15px] leading-[1.6] text-brand-navy/60">
                {b.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Eligibility signal */}
      <div className="mb-16 border-t border-brand-navy/15 pt-12 tablet:mb-20 tablet:pt-16">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
          Eligibility
        </p>
        <ul className="space-y-3">
          <li className="flex items-baseline gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
            <span aria-hidden className="font-mono text-brand-cerulean">&#x2192;</span>
            Incorporated or registrable entity founded in the last 5 years.
          </li>
          <li className="flex items-baseline gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
            <span aria-hidden className="font-mono text-brand-cerulean">&#x2192;</span>
            Working on a problem in one of the Centre&rsquo;s ten Industry&nbsp;4.0 domains.
          </li>
          <li className="flex items-baseline gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
            <span aria-hidden className="font-mono text-brand-cerulean">&#x2192;</span>
            Majority Indian shareholding; lead founder must be an Indian citizen.
          </li>
          <li className="flex items-baseline gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
            <span aria-hidden className="font-mono text-brand-cerulean">&#x2192;</span>
            Not currently incubated at another STPI Centre of Excellence.
          </li>
          <li className="flex items-baseline gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
            <span aria-hidden className="font-mono text-brand-cerulean">&#x2192;</span>
            Outstation startups welcome — must be willing to operate from the Bengaluru Centre during the incubation term.
          </li>
        </ul>
        <p className="mt-4 font-body text-[13px] text-brand-navy/50">
          Full eligibility criteria and selection process are described in the{" "}
          <Link href="#contact" className="text-brand-cerulean hover:underline">
            Centre section
          </Link>
          .
        </p>
      </div>

      {/* Application form */}
      <div className="border-t border-brand-navy/15 pt-12 tablet:pt-16">
        <div className="desktop:grid desktop:grid-cols-12 desktop:gap-x-16">
          <div className="desktop:col-span-8">
            <ApplyForm />
          </div>
        </div>
      </div>

      {/* Scheme citation + cohort footer */}
      <div className="mt-16 space-y-3 tablet:mt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/40">
          Next cohort opens — TBD. Applications reviewed on a rolling basis.
        </p>
        <p className="font-body text-[13px] leading-[1.6] text-brand-navy/40">
          The &#x20B9;10L seed grant is disbursed under the STPI Centre of Excellence
          Programme (CoE-P), an initiative of Software Technology Parks of India
          under the Ministry of Electronics and Information Technology (MeitY),
          Government of India. Disbursement is milestone-gated per GoI financial norms.
          By submitting, you agree to our{" "}
          <Link href="/privacy" className="text-brand-cerulean hover:underline">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
