import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell } from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Complete sitemap of the CoE-EA website — all pages, sections, and external links.",
};

const SITE_SECTIONS = [
  {
    heading: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About CoE-EA", href: "/about" },
      { label: "Startup Programme", href: "/startup-program" },
      { label: "Events", href: "/events" },
      { label: "Governance", href: "/governance" },
      { label: "Book", href: "/book" },
    ],
  },
  {
    heading: "Apply",
    links: [
      { label: "Apply to CoE-EA", href: "/apply" },
    ],
  },
  {
    heading: "Support & Information",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Feedback", href: "/feedback" },
      { label: "Help", href: "/help" },
      { label: "Privacy Notice", href: "/privacy" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    heading: "External Links",
    links: [
      { label: "National Portal of India (india.gov.in)", href: "https://www.india.gov.in/", external: true },
      { label: "Software Technology Parks of India (STPI)", href: "https://www.stpi.in", external: true },
      { label: "Right to Information (RTI)", href: "https://www.stpi.in/rti.html", external: true },
      { label: "Ministry of Electronics and IT (MeitY)", href: "https://www.meity.gov.in/", external: true },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div>
      <HeroShell
        label="Sitemap"
        title="Site Map"
        subhead="All pages on this website"
        layout="center"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 tablet:px-9">

        <nav aria-label="Sitemap navigation">
          <div className="grid gap-8 tablet:grid-cols-2">
            {SITE_SECTIONS.map(section => (
              <section
                key={section.heading}
                aria-labelledby={`section-${section.heading.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <h2
                  id={`section-${section.heading.replace(/\s+/g, '-').toLowerCase()}`}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean mb-4"
                >
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-2">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-body text-[14px] text-brand-ice/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                        {...('external' in link && link.external
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {link.label}
                        {'external' in link && link.external && (
                          <span aria-label="(opens in a new window)" className="ml-1 text-brand-ice/40">↗</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>

        <div className="mt-16 border-t border-white/[0.06] pt-8">
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
