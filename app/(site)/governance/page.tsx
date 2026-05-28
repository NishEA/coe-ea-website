import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Governance & Reports · CoE-EA",
  description:
    "Programme governance, oversight structure, and official reports for the Centre of Excellence on Efficiency Augmentation.",
};

const OVERSIGHT = [
  {
    role: "Funding ministry",
    body: "Ministry of Electronics and Information Technology (MeitY), Government of India",
    detail:
      "Provides policy mandate and programme funding under the STPI Centre of Excellence Programme (CoE-P).",
  },
  {
    role: "Implementing agency",
    body: "Software Technology Parks of India (STPI)",
    detail:
      "Operates the Centre, manages grant disbursement, and submits quarterly milestone reports to MeitY.",
  },
  {
    role: "State partner",
    body: "Department of IT, BT & ST, Government of Karnataka",
    detail:
      "Co-sponsors the Centre's presence in Bengaluru and supports Karnataka-based startup intake.",
  },
  {
    role: "Technology partner",
    body: "Hewlett Packard Enterprise (HPE)",
    detail:
      "Provides laboratory infrastructure, hardware access, and technical mentorship to incubatees.",
  },
];

const REPORTING = [
  {
    cadence: "Quarterly",
    audience: "STPI HQ & MeitY",
    content:
      "Milestone progress, grant utilisation, startup KPIs, and cohort status.",
  },
  {
    cadence: "Annual",
    audience: "Public",
    content:
      "Programme impact report — cohort outcomes, aggregate metrics, partner activity.",
  },
  {
    cadence: "On demand",
    audience: "RTI / Audit",
    content:
      "RTI disclosures and audit-ready financial statements per GoI norms.",
  },
];

export default function GovernancePage() {
  return (
    <main className="bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-[900px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Governance
        </span>
        <h1 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[44px]">
          How the Centre is run.
        </h1>
        <p className="mt-4 max-w-[52ch] font-body text-[16px] leading-[1.7] text-brand-navy/60">
          CoE-EA operates under a formal governance framework defined by STPI
          and MeitY. This page is for funding bodies, programme managers, and
          RTI / audit stakeholders.
        </p>

        {/* Oversight structure */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Oversight structure
          </h2>
          <div className="space-y-6">
            {OVERSIGHT.map((o) => (
              <div
                key={o.role}
                className="grid grid-cols-1 gap-2 border-b border-brand-navy/10 pb-6 tablet:grid-cols-12 tablet:gap-8"
              >
                <div className="tablet:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                    {o.role}
                  </p>
                </div>
                <div className="tablet:col-span-9">
                  <p className="font-body text-[15px] font-medium text-brand-navy">
                    {o.body}
                  </p>
                  <p className="mt-1 font-body text-[14px] leading-[1.6] text-brand-navy/60">
                    {o.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting cadence */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Reporting cadence
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" aria-label="Reporting cadence">
              <thead>
                <tr className="border-b border-brand-navy/15">
                  {["Cadence", "Audience", "Content"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/10">
                {REPORTING.map((r) => (
                  <tr key={r.cadence}>
                    <td className="py-4 pr-6 font-mono text-[12px] uppercase tracking-[0.14em] text-brand-cerulean">
                      {r.cadence}
                    </td>
                    <td className="py-4 pr-6 font-body text-[14px] text-brand-navy">
                      {r.audience}
                    </td>
                    <td className="py-4 font-body text-[14px] leading-[1.6] text-brand-navy/60">
                      {r.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Published reports */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Published reports
          </h2>
          <div className="border border-brand-navy/10 px-8 py-14 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/40">
              No reports published yet
            </p>
            <p className="mt-2 font-body text-[13px] text-brand-navy/40">
              Annual and quarterly reports will appear here when released.
            </p>
          </div>
        </div>

        {/* RTI */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-4 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            RTI &amp; grievance
          </h2>
          <p className="mb-6 font-body text-[15px] leading-[1.7] text-brand-navy/70">
            RTI applications and grievances for CoE-EA matters are handled
            through STPI&rsquo;s established RTI machinery.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "RTI portal — STPI", href: "https://www.stpi.in/rti.html" },
              { label: "STPI India", href: "https://www.stpi.in" },
              { label: "Privacy notice", href: "/privacy" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-brand-navy/15 pt-8">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
