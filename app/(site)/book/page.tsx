import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Facility · CoE-EA",
  description:
    "Reserve lab space, meeting rooms, or demo infrastructure at CoE-EA's Bengaluru facility.",
};

const FACILITIES = [
  {
    id: "lab",
    name: "Prototype & Testing Lab",
    area: "~1,200 sq ft",
    capacity: "Up to 8 workstations",
    image: "/images/facilities/lab-hero.png",
    imageAlt: "CoE-EA prototype and testing lab — deep-tech hardware workbenches",
    description:
      "Equipped workbenches, oscilloscopes, soldering stations, and access to HPE compute nodes for hardware-software integration work.",
    useCases: ["Prototype assembly", "Hardware-in-the-loop testing", "PCB debugging", "Edge AI inference"],
    availability: "Mon – Sat, 9 am – 7 pm",
  },
  {
    id: "boardroom",
    name: "Boardroom",
    area: "~400 sq ft",
    capacity: "12 seats",
    image: "/images/facilities/boardroom.png",
    imageAlt: "CoE-EA boardroom — walnut table, 12 seats, 4K display",
    description:
      "Fully equipped for investor meetings, partner reviews, and formal presentations. 4K display, video conferencing, and whiteboard wall.",
    useCases: ["Investor pitches", "Partner meetings", "Board reviews", "Regulatory demos"],
    availability: "Mon – Sat, 9 am – 6 pm",
  },
  {
    id: "demo",
    name: "Demo Suite",
    area: "~600 sq ft",
    capacity: "20 attendees",
    image: "/images/facilities/demo-suite.png",
    imageAlt: "CoE-EA demo suite — open-plan presentation space with audience seating",
    description:
      "Open-plan space designed for product demonstrations, proof-of-concept presentations, and small group workshops.",
    useCases: ["Customer demos", "POC presentations", "Workshops", "Industrial visits"],
    availability: "Mon – Fri, 10 am – 5 pm",
  },
  {
    id: "cowork",
    name: "Co-working Bay",
    area: "~800 sq ft",
    capacity: "16 hot desks",
    image: "/images/facilities/coworking.png",
    imageAlt: "CoE-EA co-working bay — 16 hot desks with monitors",
    description:
      "Day-use desks with high-speed fibre, lockers, and access to the Centre's common areas. Available to cohort members and invited guests.",
    useCases: ["Sprint weeks", "Remote team offsites", "Partner team embeds"],
    availability: "Mon – Sat, 8 am – 8 pm",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Submit an enquiry",
    body: "Send us your requirement — facility type, preferred dates, purpose, and team size. Use the email below.",
  },
  {
    n: "02",
    title: "Availability check",
    body: "The CoE-EA team confirms availability and shares any applicable usage terms within two working days.",
  },
  {
    n: "03",
    title: "Confirm booking",
    body: "You receive a confirmation with access instructions, parking details, and any preparation checklist.",
  },
];

export default function BookPage() {
  return (
    <main className="bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-[900px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Facilities
        </span>
        <h1 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[44px]">
          Book a facility.
        </h1>
        <p className="mt-4 max-w-[52ch] font-body text-[16px] leading-[1.7] text-brand-navy/60">
          CoE-EA&rsquo;s Bengaluru facility is available to incubatees, partners, and
          invited teams. Lab space, meeting infrastructure, and demo suites —
          all under one roof.
        </p>

        {/* Facility cards */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Available spaces
          </h2>
          <div className="space-y-0">
            {FACILITIES.map((f) => (
              <div
                key={f.id}
                className="border-b border-brand-navy/10 py-8 first:border-t"
              >
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-12 tablet:gap-8">
                  <div className="tablet:col-span-4">
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={f.image}
                        alt={f.imageAlt}
                        fill
                        className={`object-cover ${f.id === "lab" ? "object-bottom" : "object-center"}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="font-display text-[18px] text-brand-navy">
                      {f.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-navy/50">
                        {f.area}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-navy/50">
                        {f.capacity}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-cerulean">
                      {f.availability}
                    </p>
                  </div>
                  <div className="tablet:col-span-8">
                    <p className="font-body text-[15px] leading-[1.7] text-brand-navy/70">
                      {f.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {f.useCases.map((u) => (
                        <span
                          key={u}
                          className="border border-brand-navy/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-navy/50"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to book */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-8 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            How to book
          </h2>
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
                  {s.n}
                </p>
                <p className="mt-2 font-display text-[16px] text-brand-navy">
                  {s.title}
                </p>
                <p className="mt-1 font-body text-[14px] leading-[1.6] text-brand-navy/60">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 border-t border-brand-navy/15 pt-12">
          <h2 className="mb-2 font-display text-[24px] text-brand-navy tablet:text-[30px]">
            Make an enquiry
          </h2>
          <p className="mb-6 max-w-[48ch] font-body text-[15px] leading-[1.7] text-brand-navy/60">
            Online booking is coming soon. Until then, email the Centre directly
            with your requirement and preferred dates.
          </p>
          <a
            href="mailto:blr.coeea@stpi.in?subject=Facility%20Booking%20Enquiry"
            className="inline-block bg-brand-navy px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-bg-paper transition hover:bg-brand-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2"
          >
            Email blr.coeea@stpi.in →
          </a>
          <p className="mt-4 font-body text-[13px] text-brand-navy/40">
            Include: facility name, preferred dates, number of attendees, and
            purpose. We respond within two working days.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 tablet:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                Location
              </p>
              <p className="mt-2 font-body text-[14px] leading-[1.6] text-brand-navy/70">
                No. 4, 1st Floor, 31st Cross<br />
                11th Main Road, 4th T Block<br />
                Jayanagar, Bengaluru – 560 011<br />
                Karnataka, India
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                Pricing
              </p>
              <p className="mt-2 font-body text-[14px] leading-[1.6] text-brand-navy/70">
                Facility use is included for CoE-EA incubatees. Pricing for
                external and partner bookings is available on request.
              </p>
            </div>
          </div>
        </div>

        {/* Access policy note */}
        <div className="mt-12 border border-brand-navy/10 px-6 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/40">
            Access policy
          </p>
          <p className="mt-2 font-body text-[13px] leading-[1.6] text-brand-navy/50">
            Facilities are primarily reserved for CoE-EA incubatees. External
            bookings are considered for partner organisations and invited teams
            at the discretion of the Centre management. All visitors must sign
            in at reception.
          </p>
        </div>

        <div className="mt-12 border-t border-brand-navy/15 pt-8">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
