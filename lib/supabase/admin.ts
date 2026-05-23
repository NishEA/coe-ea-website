import "server-only";

/**
 * Admin Supabase client — uses the SERVICE-ROLE key. Bypasses RLS.
 *
 * Rules (Codex review):
 *  - NEVER import this from a client component / "use client" boundary.
 *  - NEVER expose the key via a NEXT_PUBLIC_* env var.
 *  - Use only for trusted server-side admin operations (PMG review actions,
 *    monthly invoice export, etc.).
 */
import { createClient } from "@supabase/supabase-js";

export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
