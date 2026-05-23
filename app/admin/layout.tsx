import type { Metadata } from "next";

/** Admin section is never indexed (Codex review — admin-route exposure). */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin shell — W1 scaffold.
 * No real authentication yet: Supabase Auth + RLS land in W4 (design-doc §17).
 * Until then this is a default-deny boundary — the routes exist for structure
 * but ship only restricted stubs, and the section is noindex.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 py-16 desktop:px-20">
      <p className="mb-10 font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean">
        Restricted · authentication added in W4
      </p>
      {children}
    </div>
  );
}
