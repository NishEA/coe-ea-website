"use server";
import { redirect } from "next/navigation";

export type ApplyState = {
  errors: Record<string, string>;
  message?: string;
};

// Allowlists match the DB enum values (underscores) and radio options.
const VALID_DOMAINS = new Set([
  "smart_manufacturing", "smart_energy", "smart_water", "smart_farming",
  "home_office_automation", "connected_transportation", "weather_monitoring",
  "smart_hospital", "smart_security", "intelligent_asset_monitoring",
]);
const VALID_STAGES = new Set(["idea", "mvp", "pilot", "revenue"]);
const VALID_KARNATAKA = new Set(["yes", "in_process", "no"]);
const VALID_FOUNDED = new Set(["yes", "no"]);

function str(formData: FormData, key: string): string {
  const val = formData.get(key);
  return typeof val === "string" ? val.trim() : "";
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const errors: Record<string, string> = {};

  const founderName = str(formData, "founder_name");
  const founderEmail = str(formData, "founder_email");
  const startupName = str(formData, "startup_name");
  const domain = str(formData, "domain");
  const stage = str(formData, "stage");
  const problemStatement = str(formData, "problem_statement");
  const whyCoeEa = str(formData, "why_coe_ea");
  const karnatakaRegistered = str(formData, "karnataka_registered");
  const foundedInLast5Years = str(formData, "founded_in_last_5_years");

  if (!founderName) errors.founder_name = "Your name is required.";
  if (!founderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(founderEmail))
    errors.founder_email = "A valid email address is required.";
  if (!startupName) errors.startup_name = "Startup name is required.";
  if (!VALID_DOMAINS.has(domain)) errors.domain = "Select a capability domain.";
  if (!VALID_STAGES.has(stage)) errors.stage = "Select your current stage.";
  if (!problemStatement || problemStatement.length < 30)
    errors.problem_statement = "Describe the problem in at least 30 characters.";
  if (problemStatement.length > 280)
    errors.problem_statement = "Problem statement must be 280 characters or fewer.";
  if (!whyCoeEa || whyCoeEa.length < 30)
    errors.why_coe_ea = "Tell us why in at least 30 characters.";
  if (whyCoeEa.length > 500)
    errors.why_coe_ea = "Response must be 500 characters or fewer.";
  if (!VALID_KARNATAKA.has(karnatakaRegistered))
    errors.karnataka_registered = "Please answer the Karnataka registration question.";
  if (!VALID_FOUNDED.has(foundedInLast5Years))
    errors.founded_in_last_5_years = "Please answer the founding date question.";

  if (Object.keys(errors).length > 0) return { errors };

  // W4: replace with Supabase write + Resend notification.
  redirect("/apply/thank-you");
}
