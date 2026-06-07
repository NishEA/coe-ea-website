import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Admin · CoE-EA",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-bg-paper">
      {/* Admin top bar */}
      <header className="border-b border-brand-navy/10 bg-bg-paper px-6 py-4 desktop:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin/applications"
              className="font-display text-[17px] text-brand-navy"
            >
              CoE-EA
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                Admin
              </span>
            </Link>
            <nav className="hidden gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60 tablet:flex">
              <Link href="/admin/applications" className="transition hover:text-brand-navy">
                Applications
              </Link>
              <Link href="/admin/bookings" className="transition hover:text-brand-navy">
                Bookings
              </Link>
              <Link href="/admin/resources" className="transition hover:text-brand-navy">
                Resources
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-brand-navy/40 tablet:block">
                {user.email}
              </span>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60 transition hover:text-brand-navy"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="px-6 py-12 desktop:px-20">{children}</main>
    </div>
  );
}
