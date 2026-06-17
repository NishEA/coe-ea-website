import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell } from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "About CoE-EA",
  description:
    "The Centre of Excellence on Efficiency Augmentation (CoE-EA) is a joint initiative of STPI and KITS, driving Industry 4.0 adoption across Karnataka's manufacturing sector.",
};

const PILLARS = [
  {
    title: "Mission",
    body: "Accelerate Industry 4.0 adoption across Karnataka's manufacturing ecosystem by bridging the gap between cutting-edge technology and operational excellence.",
  },
  {
    title: "Mandate",
    body: "Established under Software Technology Parks of India (STPI), an autonomous society under MeitY, Government of India, in partnership with the Karnataka Innovation & Technology Society (KITS).",
  },
  {
    title: "Focus Areas",
    body: "Smart Manufacturing, Smart Water Management, Asset Monitoring, Smart Farming, Predictive Maintenance, Energy Optimisation, Quality Assurance, and Supply Chain Intelligence.",
  },
  {
    title: "Approach",
    body: "Hands-on incubation with domain diagnosis, technology scouting, pilot deployment, and scale-out support — every claim is citation-bound and every domain is empirically measured.",
  },
];

const PARTNERS = [
  { name: "Software Technology Parks of India (STPI)", role: "Lead implementing agency under MeitY, GoI" },
  { name: "Karnataka Innovation & Technology Society (KITS)", role: "State nodal agency for technology adoption" },
  { name: "Hewlett Packard Enterprise (HPE)", role: "Technology partner and co-funder" },
];

export default function AboutPage() {
  return (
    <div>
      <HeroShell
        label="About CoE-EA"
        title="Centre of Excellence on Efficiency Augmentation"
        subhead="STPI · KITS · HPE — Government of India"
        layout="center"
      />

      <div className="mx-auto max-w-5xl px-6 py-16 tablet:px-9">

        <section aria-labelledby="overview-heading" className="mb-16">
          <h2 id="overview-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-6">
            Overview
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-ice/75 max-w-3xl">
            The CoE-EA is a joint initiative funded by STPI, KITS, and HPE. It provides
            startups and MSMEs with access to Industry 4.0 infrastructure, domain expertise,
            and a structured incubation pathway — from problem diagnosis through pilot deployment
            to commercial scale-out.
          </p>
          <p className="mt-4 font-body text-[15px] leading-[1.7] text-brand-ice/75 max-w-3xl">
            Headquartered at the STPI campus in Bengaluru, the Centre operates across ten
            Industry 4.0 verticals and maintains partnerships with national and international
            technology leaders.
          </p>
        </section>

        <section aria-labelledby="pillars-heading" className="mb-16">
          <h2 id="pillars-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-8">
            Our Pillars
          </h2>
          <div className="grid gap-6 tablet:grid-cols-2">
            {PILLARS.map(p => (
              <div key={p.title} className="glass-panel p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-[14px] leading-[1.65] text-brand-ice/75">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="partners-heading" className="mb-16">
          <h2 id="partners-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-8">
            Founding Partners
          </h2>
          <div className="flex flex-col gap-4">
            {PARTNERS.map(p => (
              <div key={p.name} className="glass-panel p-5 flex flex-col gap-1 tablet:flex-row tablet:items-baseline tablet:gap-6">
                <span className="font-mono text-[12px] font-bold text-white min-w-0 tablet:w-72 shrink-0">{p.name}</span>
                <span className="font-body text-[13px] text-brand-ice/65">{p.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="legal-heading" className="mb-16 border-t border-white/[0.06] pt-12">
          <h2 id="legal-heading" className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-4">
            Legal Status
          </h2>
          <p className="font-body text-[14px] leading-[1.65] text-brand-ice/65 max-w-3xl">
            Software Technology Parks of India is an autonomous society registered under
            the Societies Registration Act, 1860, functioning under the Ministry of Electronics
            and Information Technology (MeitY), Government of India.
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
