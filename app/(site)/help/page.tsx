import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell } from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Help and guidance for navigating the CoE-EA website. Find answers about the Startup Programme, how to apply, document formats, and accessibility features.",
};

const FAQS = [
  {
    q: "How do I apply to the CoE-EA Startup Programme?",
    a: "Visit the Apply page and complete the online application form. Applications are reviewed on a rolling basis. You will receive an acknowledgement by email within 2 working days.",
  },
  {
    q: "What documents are required for the application?",
    a: "You will need your company registration certificate, a brief product/solution pitch (PDF, max 5 MB), and contact details of at least one technical founder.",
  },
  {
    q: "How do I open PDF documents on this website?",
    a: "PDF files require a PDF viewer. Most modern browsers (Chrome, Firefox, Edge, Safari) open PDFs natively. Alternatively, download Adobe Acrobat Reader (free) from adobe.com.",
  },
  {
    q: "The website is not displaying correctly. What should I do?",
    a: "This website is optimised for current versions of Chrome, Firefox, Edge, and Safari. Please update your browser to the latest version. If the issue persists, contact us at coe-ea@stpi.in.",
  },
  {
    q: "How do I use this website with a screen reader?",
    a: "The website is built to WCAG 2.1 AA standards. Use your screen reader's navigation commands as normal. A 'Skip to content' link is available at the top of every page for keyboard users.",
  },
  {
    q: "How do I report an accessibility problem?",
    a: "Please use the Feedback form or email coe-ea@stpi.in with the subject line 'Accessibility Issue'. Describe the page, the problem, and the assistive technology you are using. We aim to resolve reported issues within 10 working days.",
  },
  {
    q: "What is STPI?",
    a: "Software Technology Parks of India (STPI) is an autonomous society under the Ministry of Electronics and Information Technology (MeitY), Government of India, established in 1991 to promote software exports and IT entrepreneurship.",
  },
  {
    q: "What is the National Portal of India?",
    a: "The National Portal of India (india.gov.in) is a single-window source for access to information and services provided by the Indian Government. It is maintained by the National Informatics Centre (NIC).",
  },
];

export default function HelpPage() {
  return (
    <div>
      <HeroShell
        label="Help"
        title="Help & Guidance"
        subhead="Frequently asked questions and navigation tips"
        layout="center"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 tablet:px-9">

        <section aria-labelledby="faq-heading" className="mb-16">
          <h2 id="faq-heading" className="font-display text-[clamp(24px,3vw,36px)] font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((item, i) => (
              <details key={i} className="glass-panel group p-6">
                <summary className="cursor-pointer list-none font-mono text-[13px] uppercase tracking-[0.12em] text-white hover:text-brand-cerulean transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean rounded">
                  {item.q}
                </summary>
                <p className="mt-4 font-body text-[14px] leading-[1.65] text-brand-ice/75 border-t border-white/[0.06] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="nav-help-heading" className="mb-16 border-t border-white/[0.06] pt-12">
          <h2 id="nav-help-heading" className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-6">
            Navigating This Website
          </h2>
          <div className="grid gap-4 tablet:grid-cols-2">
            <div className="glass-panel p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cerulean mb-2">Keyboard Navigation</h3>
              <p className="font-body text-[13px] leading-[1.6] text-brand-ice/65">
                Use <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">Tab</kbd> to move between links,{" "}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> to activate,
                and <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd> to close the mobile menu.
                A Skip to content link appears at the top when you press Tab.
              </p>
            </div>
            <div className="glass-panel p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cerulean mb-2">Text Size</h3>
              <p className="font-body text-[13px] leading-[1.6] text-brand-ice/65">
                Increase text size using your browser zoom:{" "}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">Ctrl +</kbd> on Windows or{" "}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">⌘ +</kbd> on Mac. The layout reflows correctly up to 400% zoom.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="still-need-help" className="mb-12 border-t border-white/[0.06] pt-10">
          <h2 id="still-need-help" className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="font-body text-[14px] leading-[1.65] text-brand-ice/65">
            If you cannot find the answer here, please{" "}
            <Link href="/contact" className="text-brand-cerulean transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean">
              contact us
            </Link>{" "}
            or submit a{" "}
            <Link href="/feedback" className="text-brand-cerulean transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean">
              feedback form
            </Link>
            .
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
