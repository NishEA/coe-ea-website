import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

/** Events calendar — design-doc §16 Pass 7 (standalone /events page). Built W7. */
export default function EventsPage() {
  return (
    <section className="px-6 py-24 desktop:px-20">
      <h1 className="font-display text-4xl text-brand-navy">Events</h1>
      <p className="mt-3 font-body text-brand-navy/60">
        Hackathons, ideathons, workshops, industrial visits — placeholder.
        Built in W7.
      </p>
    </section>
  );
}
