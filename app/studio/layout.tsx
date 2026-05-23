import type { Metadata } from "next";

/** The embedded Sanity Studio is never indexed. */
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

/** Studio runs full-viewport — no site chrome (isolated route, Codex review). */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
