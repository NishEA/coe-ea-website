import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-bg-void px-6 text-center font-body antialiased">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-cerulean">
          404 — Not Found
        </p>
        <h1 className="mt-4 font-display text-[clamp(48px,8vw,96px)] font-bold leading-none tracking-tight text-white">
          Lost in space.
        </h1>
        <p className="mt-5 max-w-[36ch] font-body text-[15px] leading-[1.7] text-brand-ice/55">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand-cerulean/30 bg-brand-cerulean/10 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean transition hover:bg-brand-cerulean/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          ← Back to home
        </Link>
      </body>
    </html>
  );
}
