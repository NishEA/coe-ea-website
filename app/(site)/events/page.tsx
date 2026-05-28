import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events · CoE-EA",
  description:
    "Hackathons, ideathons, workshops, and industrial visits organised by the Centre of Excellence on Efficiency Augmentation.",
};

const EVENT_TYPES = [
  {
    id: "hackathon",
    label: "Hackathon",
    tagline: "48-hour problem sprints.",
    description:
      "Intensive build events focused on real industrial problems. Teams compete to ship working prototypes; winners get fast-tracked into the incubation pipeline.",
    who: "Open to engineers, designers, and domain experts. Teams of 2 – 5.",
  },
  {
    id: "ideathon",
    label: "Ideathon",
    tagline: "Structured idea validation.",
    description:
      "One-day idea marathons where founders and researchers pressure-test concepts against domain experts from manufacturing, logistics, and energy sectors.",
    who: "Open to founders, researchers, and final-year students.",
  },
  {
    id: "workshop",
    label: "Workshop",
    tagline: "Deep-dive skill sessions.",
    description:
      "Hands-on technical workshops covering edge AI deployment, industrial IoT protocols, regulatory pathways, and go-to-market strategy for deep-tech startups.",
    who: "Invited cohorts and registered participants.",
  },
  {
    id: "visit",
    label: "Industrial Visit",
    tagline: "Real facilities, real problems.",
    description:
      "Facilitated visits to partner manufacturing and logistics sites, connecting incubatees with the operating context their solutions need to address.",
    who: "CoE-EA incubatees and shortlisted cohort applicants.",
  },
];

export default function EventsPage() {
  return (
    <main className="bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-[900px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Events
        </span>
        <h1 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[44px]">
          Where ideas meet industry.
        </h1>
        <p className="mt-4 max-w-[52ch] font-body text-[16px] leading-[1.7] text-brand-navy/60">
          CoE-EA runs hackathons, ideathons, workshops, and industrial visits
          throughout the year — connecting founders with domain problems and
          partner infrastructure.
        </p>

        {/* Event types */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            What we run
          </h2>
          <div className="grid grid-cols-1 gap-px border border-brand-navy/10 bg-brand-navy/10 tablet:grid-cols-2">
            {EVENT_TYPES.map((e) => (
              <div key={e.id} className="bg-bg-paper p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
                  {e.label}
                </p>
                <p className="mt-2 font-display text-[18px] text-brand-navy">
                  {e.tagline}
                </p>
                <p className="mt-2 font-body text-[14px] leading-[1.6] text-brand-navy/60">
                  {e.description}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-brand-navy/40">
                  {e.who}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current schedule — empty state */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Upcoming events
          </h2>
          <div className="overflow-hidden border border-brand-navy/10">
            <div className="relative flex h-56 w-full items-center justify-center bg-bg-midnight">
              <Image
                src="/images/events-illustration.png"
                alt=""
                fill
                className="object-cover opacity-70"
                sizes="100vw"
              />
              <div className="relative z-10 px-8 py-10 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg-paper/50">
                  No events scheduled yet
                </p>
                <p className="mt-2 font-body text-[13px] text-bg-paper/40">
                  Events for the current cohort cycle will appear here when announced.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stay informed */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-2 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Stay informed
          </h2>
          <p className="mb-6 max-w-[48ch] font-body text-[15px] leading-[1.7] text-brand-navy/60">
            Events are announced through STPI's official channels. To express
            interest in participating or hosting an event at the Centre, reach
            out directly.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Apply to the programme", href: "/apply", external: false },
              { label: "Contact the Centre", href: "/#contact", external: false },
              { label: "STPI India", href: "https://www.stpi.in", external: true },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
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
