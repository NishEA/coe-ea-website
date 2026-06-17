import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell } from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Centre of Excellence on Efficiency Augmentation. Contact details for the CoE-EA team at STPI Bengaluru.",
};

const CONTACTS = [
  {
    role: "General Enquiries",
    email: "coe-ea@stpi.in",
    note: "For programme information, partnership proposals, and general questions.",
  },
  {
    role: "Startup Applications",
    email: "apply@coe-ea.stpi.in",
    note: "For application status, eligibility, and incubation queries.",
  },
  {
    role: "Media & Communications",
    email: "media@coe-ea.stpi.in",
    note: "For press releases, interviews, and event coverage requests.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <HeroShell
        label="Contact Us"
        title="Get in Touch"
        subhead="CoE-EA · STPI Bengaluru"
        layout="center"
      />

      <div className="mx-auto max-w-5xl px-6 py-16 tablet:px-9">

        <section aria-labelledby="contacts-heading" className="mb-16">
          <h2 id="contacts-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-8">
            Contact Details
          </h2>
          <div className="grid gap-6 tablet:grid-cols-3">
            {CONTACTS.map(c => (
              <div key={c.role} className="glass-panel p-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cerulean mb-3">
                  {c.role}
                </h3>
                <a
                  href={`mailto:${c.email}`}
                  className="font-mono text-[13px] text-white transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                >
                  {c.email}
                </a>
                <p className="mt-3 font-body text-[13px] leading-[1.6] text-brand-ice/65">{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="address-heading" className="mb-16">
          <h2 id="address-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-6">
            Office Address
          </h2>
          <div className="glass-panel p-6 max-w-md">
            <address className="not-italic font-body text-[14px] leading-[1.8] text-brand-ice/75">
              Centre of Excellence on Efficiency Augmentation<br />
              Software Technology Parks of India<br />
              STPI Bengaluru, Domlur Layout<br />
              Bengaluru — 560 071, Karnataka, India
            </address>
          </div>
        </section>

        <section aria-labelledby="hours-heading" className="mb-16 border-t border-white/[0.06] pt-12">
          <h2 id="hours-heading" className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-4">
            Working Hours
          </h2>
          <p className="font-body text-[14px] leading-[1.65] text-brand-ice/65">
            Monday to Friday: 9:30 AM – 6:00 PM IST<br />
            Closed on public holidays as per Government of India calendar.
          </p>
        </section>

        <div className="border-t border-white/[0.06] pt-8">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cerulean transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
