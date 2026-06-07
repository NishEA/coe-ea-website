"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const VALID_STATUSES = new Set([
  "new", "reviewing", "shortlisted", "declined", "converted",
]);

export async function updateApplicationStatus(
  id: string,
  status: string,
): Promise<void> {
  if (!VALID_STATUSES.has(status)) return;

  const supabaseAuth = await createSupabaseServerClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) return;

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("application_leads")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/applications");
}
