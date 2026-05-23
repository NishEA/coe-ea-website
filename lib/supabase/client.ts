"use client";

/**
 * Browser-side Supabase client (anon key only — RLS enforces security).
 * Use this in client components. Never expose the service-role key here.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
