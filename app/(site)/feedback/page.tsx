import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell } from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your feedback about the CoE-EA website and programme. Help us improve our services for India's Industry 4.0 ecosystem.",
};

export default function FeedbackPage() {
  return (
    <div>
      <HeroShell
        label="Feedback"
        title="Share Your Feedback"
        subhead="Help us improve our services"
        layout="center"
      />

      <div className="mx-auto max-w-3xl px-6 py-16 tablet:px-9">

        <section aria-labelledby="feedback-intro" className="mb-12">
          <h2 id="feedback-intro" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-6">
            We Value Your Input
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-brand-ice/75 mb-8">
            Your feedback helps us continuously improve the CoE-EA programme and website.
            Please share your experience, suggestions, or concerns using the form below or
            by writing to us directly.
          </p>

          <div className="glass-panel p-8">
            <form
              action="https://formsubmit.co/coe-ea@stpi.in"
              method="POST"
              className="flex flex-col gap-6"
              aria-label="Feedback form"
            >
              <input type="hidden" name="_subject" value="CoE-EA Website Feedback" />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label htmlFor="fb-name" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/75 mb-2">
                  Your Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  className="w-full rounded border border-brand-ice/30 bg-brand-ice/5 px-4 py-3 font-body text-[14px] text-white placeholder:text-brand-ice/40 focus:border-brand-cerulean focus:outline-none focus:ring-2 focus:ring-brand-cerulean/30"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label htmlFor="fb-email" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/75 mb-2">
                  Email Address <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                </label>
                <input
                  id="fb-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  className="w-full rounded border border-brand-ice/30 bg-brand-ice/5 px-4 py-3 font-body text-[14px] text-white placeholder:text-brand-ice/40 focus:border-brand-cerulean focus:outline-none focus:ring-2 focus:ring-brand-cerulean/30"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="fb-category" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/75 mb-2">
                  Feedback Category <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                </label>
                <select
                  id="fb-category"
                  name="category"
                  required
                  aria-required="true"
                  className="w-full rounded border border-brand-ice/30 bg-[#060d2e] px-4 py-3 font-body text-[14px] text-white focus:border-brand-cerulean focus:outline-none focus:ring-2 focus:ring-brand-cerulean/30"
                >
                  <option value="">Select a category</option>
                  <option value="website">Website Experience</option>
                  <option value="programme">Programme Content</option>
                  <option value="accessibility">Accessibility Issue</option>
                  <option value="suggestion">Suggestion / Improvement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="fb-message" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ice/75 mb-2">
                  Your Feedback <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                </label>
                <textarea
                  id="fb-message"
                  name="message"
                  required
                  aria-required="true"
                  rows={5}
                  className="w-full rounded border border-brand-ice/30 bg-brand-ice/5 px-4 py-3 font-body text-[14px] text-white placeholder:text-brand-ice/40 focus:border-brand-cerulean focus:outline-none focus:ring-2 focus:ring-brand-cerulean/30 resize-y"
                  placeholder="Please describe your feedback in detail…"
                />
              </div>

              <button
                type="submit"
                className="rounded bg-brand-cerulean px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </section>

        <section aria-labelledby="alt-contact-heading" className="mb-12 border-t border-white/[0.06] pt-10">
          <h2 id="alt-contact-heading" className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-4">
            Write to Us Directly
          </h2>
          <p className="font-body text-[14px] leading-[1.65] text-brand-ice/65">
            You may also email your feedback to{" "}
            <a
              href="mailto:coe-ea@stpi.in"
              className="text-brand-cerulean transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            >
              coe-ea@stpi.in
            </a>
            . We aim to respond to all feedback within 5 working days.
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
