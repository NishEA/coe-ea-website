import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application received — Centre of Excellence on Efficiency Augmentation",
  description: "We've received your application and will be in touch within two weeks.",
};

export default function ThankYouPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-bg-paper px-6 py-20 tablet:px-12 desktop:px-20"
      aria-label="Application received"
    >
      <div className="w-full max-w-[520px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
          Done
        </span>
        <h1 className="mt-6 font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[52px]">
          Application received.
        </h1>
        <p className="mt-6 font-body text-[17px] leading-[1.6] text-brand-navy/70">
          We&rsquo;ve received your application and will review it on a rolling
          basis. Shortlisted founders are contacted within two weeks.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline"
        >
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
