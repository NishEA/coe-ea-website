import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { updateApplicationStatus } from "./actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  status: string;
  founder_name: string;
  founder_email: string;
  founder_phone: string | null;
  startup_name: string;
  domain: string;
  stage: string;
  founded_in_last_5_years: string;
  karnataka_registered: string;
  problem_statement: string;
  why_coe_ea: string;
  raised_capital: string | null;
  referral_source: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  new:         "bg-brand-cerulean/10 text-brand-cerulean",
  reviewing:   "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-green-100 text-green-800",
  declined:    "bg-red-100 text-red-700",
  converted:   "bg-brand-navy/10 text-brand-navy",
};

const NEXT_STATUS: Record<string, { label: string; value: string }[]> = {
  new:         [{ label: "Mark reviewing", value: "reviewing" }, { label: "Decline", value: "declined" }],
  reviewing:   [{ label: "Shortlist", value: "shortlisted" }, { label: "Decline", value: "declined" }],
  shortlisted: [{ label: "Convert", value: "converted" }, { label: "Decline", value: "declined" }],
  declined:    [{ label: "Reopen", value: "new" }],
  converted:   [],
};

function formatDomain(slug: string) {
  return slug.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminApplicationsPage() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("application_leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads: Lead[] = data ?? [];

  return (
    <div>
      {/* Page header */}
      <div className="mb-10 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-[32px] text-brand-navy">Applications</h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/50">
            {leads.length} submission{leads.length !== 1 ? "s" : ""} · application_leads
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/40">
          Auth in W4
        </span>
      </div>

      {error && (
        <div className="mb-8 border border-red-200 bg-red-50 px-6 py-4 font-body text-[14px] text-red-700">
          Failed to load applications: {error.message}
        </div>
      )}

      {leads.length === 0 && !error && (
        <div className="border border-brand-navy/10 px-8 py-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/40">
            No applications yet
          </p>
        </div>
      )}

      {/* Application cards */}
      <div className="space-y-6">
        {leads.map((lead) => (
          <details
            key={lead.id}
            className="group border border-brand-navy/15 bg-bg-paper"
          >
            {/* Summary row — always visible */}
            <summary className="flex cursor-pointer list-none items-start gap-6 px-6 py-5 hover:bg-brand-navy/[0.02]">
              {/* Status badge */}
              <span
                className={`mt-0.5 shrink-0 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                  STATUS_STYLES[lead.status] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {lead.status}
              </span>

              {/* Main info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-[18px] text-brand-navy">
                    {lead.startup_name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cerulean">
                    {formatDomain(lead.domain)}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-navy/50">
                    {lead.stage}
                  </span>
                </div>
                <p className="mt-1 font-body text-[13px] text-brand-navy/60">
                  {lead.founder_name} · {lead.founder_email}
                  {lead.founder_phone ? ` · ${lead.founder_phone}` : ""}
                </p>
              </div>

              {/* Date + ref */}
              <div className="shrink-0 text-right">
                <p className="font-mono text-[11px] text-brand-navy/50">
                  {formatDate(lead.created_at)}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-navy/30">
                  {lead.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </summary>

            {/* Expanded detail */}
            <div className="border-t border-brand-navy/10 px-6 py-6">
              <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2">
                {/* Left: answers */}
                <div className="space-y-6">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                      Problem statement
                    </p>
                    <p className="font-body text-[14px] leading-[1.65] text-brand-navy/80">
                      {lead.problem_statement}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-navy/50">
                      Why CoE-EA
                    </p>
                    <p className="font-body text-[14px] leading-[1.65] text-brand-navy/80">
                      {lead.why_coe_ea}
                    </p>
                  </div>
                </div>

                {/* Right: metadata */}
                <div className="space-y-3">
                  {(
                    [
                      ["Founded ≤5 years", lead.founded_in_last_5_years],
                      ["Karnataka registered", lead.karnataka_registered],
                      ["Capital raised", lead.raised_capital ?? "—"],
                      ["Referral source", lead.referral_source ?? "—"],
                    ] as [string, string][]
                  ).map(([label, value]) => (
                    <div key={label} className="flex gap-4">
                      <span className="w-40 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-navy/50">
                        {label}
                      </span>
                      <span className="font-body text-[13px] capitalize text-brand-navy/80">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status actions */}
              {(NEXT_STATUS[lead.status] ?? []).length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3 border-t border-brand-navy/10 pt-6">
                  {(NEXT_STATUS[lead.status] ?? []).map((action) => (
                    <form
                      key={action.value}
                      action={updateApplicationStatus.bind(null, lead.id, action.value)}
                    >
                      <button
                        type="submit"
                        className={`px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                          action.value === "declined"
                            ? "border border-red-200 text-red-600 hover:bg-red-50"
                            : action.value === "shortlisted"
                            ? "bg-green-700 text-white hover:bg-green-800"
                            : "bg-brand-navy text-bg-paper hover:bg-brand-navy/90"
                        }`}
                      >
                        {action.label}
                      </button>
                    </form>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
