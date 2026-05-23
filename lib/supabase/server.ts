import "server-only";

/**
 * Server-side Supabase client (SSR-cookie-aware). Use from Server Components,
 * Server Actions, and route handlers. Auth + RLS key off the user's JWT in
 * cookies, so admin identity reaches every founder-data query (design-doc §17).
 */
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot set cookies; the middleware refresh
            // path is where the session is rotated. Safe to ignore here.
          }
        },
      },
    },
  );
}
