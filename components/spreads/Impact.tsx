/**
 * Spread 005 — Impact + Partners + The Centre.
 *
 * Upper dark zone: five dominant impact counters fetched from the Sanity
 * `impactMetrics` singleton (first 5 items in the array = dominant; the rest
 * render as a secondary band). Falls back to April 2026 KPI values if the
 * document has not yet been seeded in the Studio.
 *
 * Lower light zone: institutional identity, programme contact, selection
 * process, eligibility, and institutional links (previously ContactSpread —
 * merged here to preserve the 5-spread / 005-pagination structure).
 *
 * To seed metrics: open /studio → "Impact metrics" → create the singleton
 * and enter metrics in display order (first 5 become dominant counters).
 */

import Link from "next/link";

// Metrics numbers live in StatsBar (above the Diorama) — not repeated here.
// The impactMetrics Sanity singleton remains available for future use
// (e.g. a dedicated /impact page or the Governance page).

// ── Partners ─────────────────────────────────────────────────────────────────
// Typography-only until high-res SVG logos are collected from brand teams.

const PARTNERS = {
  government: ["MeitY", "KITS, Govt. of Karnataka", "STPI"],
  corporate: [
    "HPE",
    "Intel",
    "Bosch Global Software",
    "Schneider Electric",
    "Mathworks",
    "IESA",
  ],
  academic: ["RVCE", "BMS Institute", "IEEE / GIEEE", "VSS Trust", "Yuvaka Sangha"],
};

// ── Selection & terms (lower zone) ───────────────────────────────────────────

const SELECTION_STEPS = [
  {
    step: "01",
    title: "Application review",
    detail:
      "All submissions are reviewed by the Project Management Group (PMG) — a nine-member body of STPI, KITS, HPE, industry, and academic representatives. Rolling intake; you'll hear within two weeks of submission.",
  },
  {
    step: "02",
    title: "Shortlist & pitch",
    detail:
      "Shortlisted founders are invited to a 30-minute pitch session at the Centre. Remote presentations are available for outstation founders. Pitch day is typically within four weeks of shortlisting.",
  },
  {
    step: "03",
    title: "Due diligence",
    detail:
      "The committee reviews incorporation documents, team background, and prototype evidence. We do not conduct investor-style financial due diligence — this is a programme eligibility check.",
  },
  {
    step: "04",
    title: "Equity signing & onboarding",
    detail:
      "Selected startups receive a formal incubation offer letter within six weeks of submission. Onboarding is completed only after the equity agreement is signed. The Centre takes 1–3% equity, scaled to the startup's revenue generated, grants received, or valuation at time of signing.",
  },
];

const PROGRAMME_TERMS = [
  "Equity-based engagement — the Centre takes 1–3% equity (scaled to revenue, grants, or valuation). Onboarding is completed only after the equity agreement is signed.",
  "IP developed during incubation is founder-owned.",
  "Programme reporting obligations apply (quarterly milestone updates to STPI).",
  "Grant disbursement is milestone-gated at 3-month intervals per GoI financial norms.",
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ImpactSpread() {
  return (
    <>
      {/* ── Upper: dark impact zone ─────────────────────────────────────── */}
      <section
        id="impact"
        aria-label="Impact — spread 005"
        className="relative border-b border-ice/20 bg-bg-midnight px-6 py-20 tablet:px-12 tablet:py-24 desktop:px-20 desktop:py-32"
      >
        {/* Spread header */}
        <header className="mb-12 flex items-baseline justify-between tablet:mb-16">
          <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
            005 / 005
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg-paper/60">
            Impact
          </span>
        </header>

        {/* Section headline */}
        <div className="mb-16 grid grid-cols-1 gap-6 tablet:mb-20 tablet:grid-cols-12">
          <h2 className="font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-bg-paper tablet:col-span-7 tablet:text-[52px]">
            The institutions behind the Centre.
          </h2>
          <p className="font-body text-[17px] leading-[1.6] text-bg-paper/70 tablet:col-span-4 tablet:col-start-9 tablet:text-right">
            Government, corporate, and academic partners committed to
            India&rsquo;s Industry&nbsp;4.0 ecosystem.
          </p>
        </div>

        {/* Partner band */}
        <div className="border-t border-ice/20 pt-12 tablet:pt-16">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ice/50">
            The institutions behind the Centre
          </p>
          <div className="grid grid-cols-1 gap-10 tablet:grid-cols-3">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean/60">
                Government
              </p>
              <ul className="space-y-2">
                {PARTNERS.government.map((p) => (
                  <li
                    key={p}
                    className="font-body text-[15px] leading-[1.5] text-bg-paper/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean/60">
                Corporate
              </p>
              <ul className="space-y-2">
                {PARTNERS.corporate.map((p) => (
                  <li
                    key={p}
                    className="font-body text-[15px] leading-[1.5] text-bg-paper/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean/60">
                Academic
              </p>
              <ul className="space-y-2">
                {PARTNERS.academic.map((p) => (
                  <li
                    key={p}
                    className="font-body text-[15px] leading-[1.5] text-bg-paper/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 font-mono text-[11px] text-ice/30">
            Partner relationships as of April 2026
          </p>
        </div>
      </section>

      {/* ── Lower: institutional identity (light) ───────────────────────── */}
      <section
        id="contact"
        aria-label="About the Centre"
        className="border-b border-brand-navy/15 bg-bg-paper px-6 py-20 tablet:px-12 tablet:py-24 desktop:px-20 desktop:py-32"
      >
        {/* Institutional identity */}
        <div className="mb-16 border-b border-brand-navy/15 pb-16 tablet:mb-20 tablet:pb-20">
          <div className="grid grid-cols-1 items-start gap-12 tablet:grid-cols-12">
            <div className="tablet:col-span-7">
              <h2 className="font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[52px]">
                Who runs the Centre.
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.6] text-brand-navy/70">
                The Centre of Excellence on Efficiency Augmentation (CoE-EA) is
                jointly funded by{" "}
                <strong className="font-semibold text-brand-navy">
                  Karnataka Innovation &amp; Technology Society (KITS)
                </strong>
                , Government of Karnataka,{" "}
                <strong className="font-semibold text-brand-navy">
                  Software Technology Parks of India (STPI)
                </strong>
                , and{" "}
                <strong className="font-semibold text-brand-navy">
                  Hewlett Packard Enterprise (HPE)
                </strong>
                . STPI is the implementing agency and an autonomous society
                under the Ministry of Electronics and Information Technology
                (MeitY), Government of India.
              </p>
              <p className="mt-4 font-body text-[15px] leading-[1.6] text-brand-navy/60">
                The incubation programme supports early-stage
                Industry&nbsp;4.0 startups through a non-dilutive grant,
                shared laboratory infrastructure, domain mentorship, and access
                to STPI&rsquo;s national industry partner network.
              </p>
            </div>

            {/* Contact card */}
            <div className="tablet:col-span-5">
              <div className="border border-brand-navy/15 p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
                  Programme contact
                </p>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
                      Email
                    </dt>
                    <dd className="mt-1 font-body text-[15px] text-brand-navy">
                      <a
                        href="mailto:blr.coeea@stpi.in"
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                      >
                        blr.coeea@stpi.in
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
                      Address
                    </dt>
                    <dd className="mt-1 font-body text-[15px] leading-[1.6] text-brand-navy">
                      No. 4, 1st Floor, 31st Cross
                      <br />
                      11th Main Road, 4th T Block
                      <br />
                      Jayanagar, Bengaluru &ndash; 560&nbsp;011
                      <br />
                      Karnataka, India
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
                      Phone
                    </dt>
                    <dd className="mt-1 font-body text-[15px] text-brand-navy">
                      <a
                        href="tel:+918024411785"
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                      >
                        +91&ndash;80&ndash;2441&ndash;1785
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Selection process */}
        <div className="mb-16 border-b border-brand-navy/15 pb-16 tablet:mb-20 tablet:pb-20">
          <div className="mb-10 grid grid-cols-1 gap-6 tablet:grid-cols-12 tablet:mb-12">
            <h3 className="font-display text-[28px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:col-span-5 tablet:text-[36px]">
              How selection works.
            </h3>
            <p className="font-body text-[15px] leading-[1.6] text-brand-navy/60 tablet:col-span-6 tablet:col-start-7">
              Selection is conducted by the Project Management Group (PMG) — a
              nine-member body comprising STPI, KITS, HPE, industry, and
              academic representatives. Criteria are weighted across technical
              feasibility, market opportunity, team capability, and alignment
              with the Centre&rsquo;s ten priority domains. Incubation term is
              12 months, renewable for 6 months on demonstrated progress.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-4">
            {SELECTION_STEPS.map((s) => (
              <li key={s.step}>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
                  Step {s.step}
                </span>
                <h4 className="mt-2 font-display text-[20px] text-brand-navy">
                  {s.title}
                </h4>
                <p className="mt-2 font-body text-[14px] leading-[1.65] text-brand-navy/65">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-brand-navy/10 pt-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/50">
              Programme terms
            </p>
            <ul className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
              {PROGRAMME_TERMS.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 font-body text-[14px] leading-[1.6] text-brand-navy/70"
                >
                  <span aria-hidden className="font-mono text-brand-cerulean">
                    &#x2192;
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-[13px] leading-[1.6] text-brand-navy/50">
              The &#x20B9;10L seed grant is funded by KITS (Karnataka
              Innovation &amp; Technology Society), Government of Karnataka, in
              collaboration with STPI and HPE. Disbursement is subject to
              selection committee approval, equity agreement signing, and
              milestone gating at 3-month intervals per the terms of the
              incubation agreement.
            </p>
          </div>
        </div>

        {/* Full eligibility criteria */}
        <div className="mb-16 border-b border-brand-navy/15 pb-16 tablet:mb-20 tablet:pb-20">
          <h3 className="mb-6 font-display text-[28px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[36px]">
            Full eligibility criteria.
          </h3>
          <ul className="space-y-3">
            {[
              "Incorporated or registrable entity founded in the last 5 years.",
              "Working on a problem within one of the Centre's ten Industry 4.0 domains.",
              "Majority Indian shareholding. Foreign nationals may co-found but the lead founder must be an Indian citizen.",
              "No prior or current incubation at another STPI Centre of Excellence during the application period.",
              "Not receiving concurrent GoI incubation grants exceeding ₹5L at time of application.",
              "Karnataka registration is preferred but not mandatory. Outstation startups may be considered subject to willingness to operate from the Bengaluru Centre during the incubation term.",
              "DPIIT recognition is not required at application; it is encouraged before onboarding.",
            ].map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 font-body text-[15px] leading-[1.6] text-brand-navy/70"
              >
                <span aria-hidden className="font-mono text-brand-cerulean">
                  &#x2192;
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Institutional links */}
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/50">
            Institutional links
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "STPI India", href: "https://www.stpi.in" },
              { label: "MeitY", href: "https://www.meity.gov.in" },
              {
                label: "Karnataka IT/BT/ST",
                href: "https://itbt.karnataka.gov.in",
              },
              { label: "Privacy notice", href: "/privacy" },
              {
                label: "RTI / Grievance",
                href: "https://www.stpi.in/rti.html",
              },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {l.label} &#x2192;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
