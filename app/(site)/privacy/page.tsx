import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice · CoE-EA",
  description:
    "How the Centre of Excellence on Efficiency Augmentation collects, uses, and protects your personal data under India's Digital Personal Data Protection Act, 2023.",
};

const RETENTION_ROWS = [
  {
    data: "Application — not selected",
    period: "12 months from decision",
    then: "Erase personal data and pitch deck; retain only anonymised domain/stage statistics",
  },
  {
    data: "Application — selected / incubated",
    period: "Duration of incubation + 3 years",
    then: "Review, then erase or fully anonymise",
  },
  {
    data: "Pitch deck (PDF)",
    period: "Within 30 days of any decision (rejection or acceptance)",
    then: "Permanent deletion from storage and backups",
  },
  {
    data: "Facility booking — completed",
    period: "5 years (government invoicing/audit)",
    then: "Erase personal data",
  },
  {
    data: "Facility booking — declined or cancelled",
    period: "6 months",
    then: "Erase",
  },
  {
    data: "Website analytics",
    period: "Indefinite (aggregate, non-identifying — no PII)",
    then: "n/a",
  },
  {
    data: "Administrator accounts",
    period: "Duration of the staff member's role",
    then: "Disable and erase on exit",
  },
];

const PROCESSORS = [
  {
    name: "Supabase",
    handles: "Application records, pitch decks, backups, admin login",
    location: "India (Mumbai)",
  },
  {
    name: "Vercel",
    handles: "Website hosting and request processing",
    location: "India (Mumbai) — platform logs in the United States",
  },
  {
    name: "Resend",
    handles: "Application confirmation emails",
    location: "United States",
  },
  {
    name: "Sanity",
    handles: "Website content management (portfolio, news, events)",
    location: "European Union",
  },
  {
    name: "Plausible",
    handles: "Cookie-free, non-identifying website analytics",
    location: "European Union",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-[860px]">

        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Legal
        </span>
        <h1 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[44px]">
          Privacy Notice.
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
            Version 1.0 &middot; May 2026
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
            Digital Personal Data Protection Act, 2023
          </p>
        </div>

        <div className="mt-8 border border-brand-cerulean/30 bg-brand-cerulean/5 px-6 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
            Pending legal finalisation
          </p>
          <p className="mt-2 font-body text-[14px] leading-[1.6] text-brand-navy/70">
            Fields marked{" "}
            <span className="font-mono text-[12px] text-brand-cerulean">[TBD]</span> are
            pending confirmation from legal counsel or programme management. This notice is
            substantially complete and must be reviewed by a qualified Indian
            data-protection lawyer before it governs live data collection.
          </p>
        </div>

        {/* 1. Who we are */}
        <section aria-labelledby="s-who" className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 id="s-who" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            1. Who we are
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            This website (<span className="font-mono text-[13px]">ea.stpi.in</span>) is
            operated by the{" "}
            <strong className="text-brand-navy">
              Centre of Excellence on Efficiency Augmentation (CoE-EA)
            </strong>
            , a programme of Software Technology Parks of India (STPI), Ministry of
            Electronics and Information Technology, Government of India. For the purpose of
            the DPDP Act, 2023, CoE-EA&nbsp;/&nbsp;STPI is the{" "}
            <strong className="text-brand-navy">Data Fiduciary</strong> for the personal
            data described in this notice.
          </p>
          <div className="mt-6 border border-brand-navy/10 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
              Grievance Officer
            </p>
            {/* TODO: GO-LIVE BLOCKER — replace with named Grievance Officer before publishing */}
            <p className="mt-2 font-body text-[15px] text-brand-navy">
              <span className="font-mono text-[13px] text-brand-cerulean">
                [TBD &mdash; name and designation]
              </span>
            </p>
            <p className="mt-1 font-body text-[14px] text-brand-navy/60">
              <a
                href="mailto:blr.coeea@stpi.in"
                className="font-mono text-[13px] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
              >
                blr.coeea@stpi.in
              </a>
              {" · "}CoE-EA, Jayanagar, Bengaluru, Karnataka
            </p>
          </div>
        </section>

        {/* 2. Scope */}
        <section aria-labelledby="s-scope" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-scope" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            2. What this notice covers
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            This notice explains what personal data we collect through this website, why
            we collect it, how long we keep it, who we share it with, where it is stored,
            and the rights you have as a Data Principal. It covers the incubation{" "}
            <strong className="text-brand-navy">application form</strong>, the{" "}
            <strong className="text-brand-navy">facility booking</strong> request, website{" "}
            <strong className="text-brand-navy">analytics</strong>, and{" "}
            <strong className="text-brand-navy">administrator accounts</strong>. It does
            not cover third-party sites we link to.
          </p>
        </section>

        {/* 3. What we collect */}
        <section aria-labelledby="s-collect" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-collect" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            3. What personal data we collect
          </h2>
          <div className="space-y-0">
            {[
              {
                point: "Incubation application (/apply)",
                data: "Founder name, email, phone number, startup name, capability domain, development stage, problem statement, motivation for applying, Karnataka registration status, founding date, optional prior-capital details, optional referral source, and an optional uploaded pitch deck (PDF).",
              },
              {
                point: "Facility booking (/book)",
                data: "Booker name, email, organisation, the facility and dates requested, number of attendees, and the stated purpose of use.",
              },
              {
                point: "Website analytics",
                data: "No personal data. We use a privacy-first, cookie-free analytics tool that records aggregate page views and does not store your IP address or build a profile of you.",
              },
              {
                point: "Administrator accounts",
                data: "For Centre / PMG staff only: name, official email address, and login credentials.",
              },
            ].map((item) => (
              <div
                key={item.point}
                className="grid grid-cols-1 gap-2 border-b border-brand-navy/10 py-5 tablet:grid-cols-12 tablet:gap-8"
              >
                <div className="tablet:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cerulean">
                    {item.point}
                  </p>
                </div>
                <div className="tablet:col-span-8">
                  <p className="font-body text-[14px] leading-[1.6] text-brand-navy/70">
                    {item.data}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-body text-[14px] leading-[1.6] text-brand-navy/60">
            We do <strong className="text-brand-navy">not</strong> collect special-category
            or sensitive personal data, and we do not use cookies for tracking or advertising.
          </p>
        </section>

        {/* 4. Why */}
        <section aria-labelledby="s-why" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-why" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            4. Why we collect it
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            We process application and booking data only to:
          </p>
          <ul className="mt-4 space-y-2 pl-2">
            {[
              "assess and respond to incubation applications;",
              "administer facility-booking requests and related government invoicing;",
              "contact you about your application or booking;",
              "maintain aggregate, non-identifying statistics about site usage.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-brand-cerulean" />
                <span className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-[15px] leading-[1.7] text-brand-navy/70">
            Our legal basis is your{" "}
            <strong className="text-brand-navy">consent</strong>, given by a clear
            affirmative action at each point of collection (DPDP Act ss.5–6). We will not
            use your data for any purpose not listed here without asking you again.
          </p>
        </section>

        {/* 5. Pitch decks */}
        <section aria-labelledby="s-decks" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-decks" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            5. Pitch decks and confidential information
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            A pitch deck you upload may contain confidential business information and
            intellectual property. We treat it as confidential: stored in a private,
            access-controlled location in India, visible only to authorised PMG reviewers
            through our secure admin dashboard,{" "}
            <strong className="text-brand-navy">never</strong> sent as an email attachment,
            and deleted on the schedule in Section&nbsp;6. No onward sharing occurs outside
            the review team without your separate, specific consent.
          </p>
        </section>

        {/* 6. Retention */}
        <section aria-labelledby="s-retention" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-retention" className="mb-2 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            6. How long we keep your data
          </h2>
          <p className="mb-8 font-body text-[15px] leading-[1.7] text-brand-navy/60">
            We keep personal data only for as long as needed, then erase it. Retention is
            enforced in the primary database, storage, database backups, and sent-email logs.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" aria-label="Data retention schedule">
              <thead>
                <tr className="border-b border-brand-navy/15">
                  {["Data", "Retention period", "Then"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-3 pr-6 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/10">
                {RETENTION_ROWS.map((r) => (
                  <tr key={r.data}>
                    <td className="py-4 pr-6 font-body text-[13px] font-medium text-brand-navy">
                      {r.data}
                    </td>
                    <td className="py-4 pr-6 font-body text-[13px] leading-[1.5] text-brand-navy/60">
                      {r.period}
                    </td>
                    <td className="py-4 font-body text-[13px] leading-[1.5] text-brand-navy/50">
                      {r.then}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Sharing */}
        <section aria-labelledby="s-share" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-share" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            7. Who we share it with
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            We do <strong className="text-brand-navy">not</strong> sell or rent your personal
            data. We share it with:
          </p>
          <ul className="mt-4 space-y-2 pl-2">
            {[
              "Authorised Centre / PMG staff who assess applications and bookings;",
              "STPI HQ as part of programme oversight reporting (aggregate data; personal data only where legally required);",
              "Service providers (Data Processors) listed in Section 8 — each bound by a written Data Processing Agreement.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-brand-cerulean" />
                <span className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Storage */}
        <section aria-labelledby="s-storage" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-storage" className="mb-2 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            8. Where your data is stored
          </h2>
          <p className="mb-8 font-body text-[15px] leading-[1.7] text-brand-navy/70">
            Your{" "}
            <strong className="text-brand-navy">
              application data and pitch deck are stored in India
            </strong>{" "}
            (Supabase, Mumbai region). Some service providers that send our emails, manage
            website content, or measure aggregate traffic operate outside India. Each is
            bound by a Data Processing Agreement; we limit the personal data that reaches
            them. The DPDP Act permits this transfer; no destination is on a
            DPDP-restricted list.
          </p>
          <p className="mb-6 font-body text-[13px] leading-[1.6] text-brand-navy/50">
            Sanity and Plausible receive <strong className="text-brand-navy/70">no personal data</strong> — Sanity
            holds only website content, and Plausible records only anonymous aggregate traffic.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" aria-label="Data processor locations">
              <thead>
                <tr className="border-b border-brand-navy/15">
                  {["Provider", "What it handles", "Location"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-3 pr-6 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/10">
                {PROCESSORS.map((p) => (
                  <tr key={p.name}>
                    <td className="py-4 pr-6 font-mono text-[12px] text-brand-cerulean">
                      {p.name}
                    </td>
                    <td className="py-4 pr-6 font-body text-[13px] leading-[1.5] text-brand-navy/70">
                      {p.handles}
                    </td>
                    <td className="py-4 font-body text-[13px] text-brand-navy/60">
                      {p.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. Security */}
        <section aria-labelledby="s-security" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-security" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            9. How we protect your data
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            We apply row-level database security, private access-controlled storage for
            pitch decks, encrypted connections (HTTPS throughout), role-based administrator
            access, and activity logging. In the event of a personal-data breach we will
            notify the Data Protection Board of India and affected Data Principals as
            required by the DPDP Act and Rules.
          </p>
        </section>

        {/* 10. Rights */}
        <section aria-labelledby="s-rights" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-rights" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            10. Your rights as a Data Principal
          </h2>
          <div className="space-y-0">
            {[
              {
                right: "Access",
                desc: "Request a summary of the personal data we hold about you and how it is processed.",
              },
              {
                right: "Correct",
                desc: "Ask us to fix inaccurate or incomplete personal data.",
              },
              {
                right: "Erase",
                desc: "Request deletion of your personal data where it is no longer needed and no law requires us to keep it.",
              },
              {
                right: "Withdraw consent",
                desc: "Withdraw consent at any time, as easily as you gave it. Withdrawal does not affect processing done before withdrawal.",
              },
              {
                right: "Grievance",
                desc: "Raise a concern with us. If unsatisfied, complain to the Data Protection Board of India under DPDP Act s.27.",
              },
              {
                right: "Nominate",
                desc: "Nominate another individual to exercise these rights on your behalf.",
              },
            ].map((item) => (
              <div
                key={item.right}
                className="flex items-start gap-6 border-b border-brand-navy/10 py-4"
              >
                <span className="w-36 flex-none font-display text-[15px] text-brand-navy">
                  {item.right}
                </span>
                <p className="font-body text-[14px] leading-[1.6] text-brand-navy/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-[14px] leading-[1.6] text-brand-navy/60">
            To exercise any right, email our Grievance Officer at{" "}
            <a
              href="mailto:blr.coeea@stpi.in"
              className="font-mono text-[13px] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            >
              blr.coeea@stpi.in
            </a>{" "}
            quoting your application or booking reference number.
          </p>
        </section>

        {/* 11. Cookies */}
        <section aria-labelledby="s-cookies" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-cookies" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            11. Cookies and analytics
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            This site does <strong className="text-brand-navy">not</strong> use cookies for
            tracking, profiling, or advertising — no cookie-consent banner is shown. We use
            Plausible, a privacy-first analytics tool that counts page views in aggregate
            without storing your IP address or identifying you. The administrator login uses
            a secure session cookie to keep staff signed in; it is not used for tracking.
          </p>
        </section>

        {/* 12. Age */}
        <section aria-labelledby="s-age" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-age" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            12. Age
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            This site is intended for adults. By submitting a form you confirm you are 18
            or older. We do not knowingly collect data from children. Under the DPDP Act,
            processing a child&rsquo;s data requires verifiable parental consent, which
            this site is not designed to obtain.
          </p>
        </section>

        {/* 13. Changes */}
        <section aria-labelledby="s-changes" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-changes" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            13. Changes to this notice
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
            We may update this notice. The version and date at the top reflect the current
            version. Material changes will be communicated where we hold your contact details.
          </p>
        </section>

        {/* 14. Contact */}
        <section aria-labelledby="s-contact" className="mt-12 border-t border-brand-navy/15 pt-10">
          <h2 id="s-contact" className="mb-6 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            14. Contact and grievance
          </h2>
          <p className="mb-6 font-body text-[15px] leading-[1.7] text-brand-navy/70">
            If you have a concern about how we handle your personal data, contact our
            Grievance Officer first. If unsatisfied, you may refer the matter to the{" "}
            <strong className="text-brand-navy">Data Protection Board of India</strong>.
          </p>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <div className="border border-brand-navy/10 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                Grievance Officer
              </p>
              {/* TODO: GO-LIVE BLOCKER — replace with named Grievance Officer before publishing */}
              <p className="mt-2 font-body text-[15px] text-brand-navy">
                <span className="font-mono text-[13px] text-brand-cerulean">
                  [TBD &mdash; name, designation]
                </span>
              </p>
              <a
                href="mailto:blr.coeea@stpi.in"
                className="mt-1 block font-mono text-[13px] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
              >
                blr.coeea@stpi.in
              </a>
              <p className="mt-1 font-body text-[13px] text-brand-navy/50">
                CoE-EA, Jayanagar, Bengaluru, Karnataka
              </p>
            </div>
            <div className="border border-brand-navy/10 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                Data Protection Board of India
              </p>
              <p className="mt-2 font-body text-[14px] leading-[1.6] text-brand-navy/60">
                Escalation body under the DPDP Act, 2023. File a complaint if your
                grievance is not resolved by the Grievance Officer.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 border-t border-brand-navy/15 pt-8">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
