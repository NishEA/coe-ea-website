"use client";
import { useActionState, useRef, useEffect, useState } from "react";
import { Field } from "@/components/forms/Field";
import { TextareaField } from "@/components/forms/TextareaField";
import { SelectField } from "@/components/forms/SelectField";
import { RadioGroupField } from "@/components/forms/RadioGroupField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { ErrorBanner } from "@/components/forms/ErrorBanner";
import type { ApplyState } from "@/app/actions/apply";
import { submitApplication } from "@/app/actions/apply";

const initialState: ApplyState = { errors: {} };

const DOMAINS = [
  { value: "smart_manufacturing", label: "Smart Manufacturing" },
  { value: "smart_energy", label: "Smart Energy" },
  { value: "smart_water", label: "Smart Water" },
  { value: "smart_farming", label: "Smart Farming" },
  { value: "home_office_automation", label: "Home & Office Automation" },
  { value: "connected_transportation", label: "Connected Transportation" },
  { value: "weather_monitoring", label: "Weather Monitoring" },
  { value: "smart_hospital", label: "Smart Hospital" },
  { value: "smart_security", label: "Smart Security" },
  { value: "intelligent_asset_monitoring", label: "Intelligent Asset Monitoring" },
];

const STAGES = [
  { value: "idea", label: "Idea" },
  { value: "mvp", label: "MVP" },
  { value: "pilot", label: "Pilot" },
  { value: "revenue", label: "Revenue" },
];

const KARNATAKA_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "in_process", label: "In process" },
  { value: "no", label: "No" },
];

const FOUNDED_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const RAISED_OPTIONS = [
  { value: "no", label: "None" },
  { value: "yes_undisclosed", label: "Yes — undisclosed" },
  { value: "yes_under_25l", label: "Yes — under ₹25L" },
  { value: "yes_25l_to_1cr", label: "Yes — ₹25L–₹1 Cr" },
  { value: "yes_over_1cr", label: "Yes — over ₹1 Cr" },
];

const REFERRAL_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "partner_event", label: "Partner event" },
  { value: "word_of_mouth", label: "Word of mouth" },
  { value: "college_university", label: "College / University" },
  { value: "social_media", label: "Social media" },
  { value: "other", label: "Other" },
];

export function ApplyForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus the first error field after a failed submission.
  useEffect(() => {
    const firstKey = Object.keys(state.errors ?? {})[0];
    if (!firstKey) return;
    const el = formRef.current?.querySelector<HTMLElement>(
      `[name="${firstKey}"], [id="${firstKey}"]`,
    );
    el?.focus();
  }, [state.errors]);

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-10">
      {state.message && <ErrorBanner message={state.message} />}

      {/* — Founder ——————————————————————————————————— */}
      <div className="grid gap-8 tablet:grid-cols-2">
        <Field
          label="Your name"
          id="founder_name"
          name="founder_name"
          type="text"
          required
          autoComplete="name"
          error={state.errors?.founder_name}
        />
        <Field
          label="Email"
          id="founder_email"
          name="founder_email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.founder_email}
        />
      </div>

      {/* — Startup ——————————————————————————————————— */}
      <div className="grid gap-8 tablet:grid-cols-2">
        <Field
          label="Startup name"
          id="startup_name"
          name="startup_name"
          type="text"
          required
          error={state.errors?.startup_name}
        />
        <SelectField
          label="Capability domain"
          id="domain"
          name="domain"
          options={DOMAINS}
          placeholder="Select a domain"
          required
          error={state.errors?.domain}
        />
      </div>

      {/* — Stage + eligibility ——————————————————————— */}
      <div className="grid gap-8 tablet:grid-cols-2">
        <RadioGroupField
          legend="Current stage"
          name="stage"
          options={STAGES}
          required
          error={state.errors?.stage}
        />
        <RadioGroupField
          legend="Founded in the last 5 years?"
          name="founded_in_last_5_years"
          options={FOUNDED_OPTIONS}
          required
          error={state.errors?.founded_in_last_5_years}
        />
      </div>

      <RadioGroupField
        legend="Karnataka-registered entity?"
        name="karnataka_registered"
        options={KARNATAKA_OPTIONS}
        required
        error={state.errors?.karnataka_registered}
      />

      {/* — Long-form answers ————————————————————————— */}
      <TextareaField
        label="Problem statement"
        id="problem_statement"
        name="problem_statement"
        maxLength={280}
        rows={4}
        required
        error={state.errors?.problem_statement}
      />
      <TextareaField
        label="Why this Centre?"
        id="why_coe_ea"
        name="why_coe_ea"
        maxLength={500}
        rows={5}
        required
        error={state.errors?.why_coe_ea}
      />

      {/* — Optional context —————————————————————————— */}
      <div className="grid gap-8 tablet:grid-cols-2">
        <SelectField
          label="Capital raised (optional)"
          id="raised_capital"
          name="raised_capital"
          options={RAISED_OPTIONS}
          defaultValue="no"
        />
        <SelectField
          label="How did you hear about us? (optional)"
          id="referral_source"
          name="referral_source"
          options={REFERRAL_OPTIONS}
          placeholder="Select one"
        />
      </div>

      {/* — Pitch deck drop-zone (W3: UI only, no upload) — */}
      <PitchDeckDropZone />

      <SubmitButton pending={pending}>Submit application</SubmitButton>
    </form>
  );
}

type DropState =
  | { type: "idle" }
  | { type: "selected"; name: string }
  | { type: "rejected"; reason: string };

function syncToInput(file: File, input: HTMLInputElement) {
  try {
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
  } catch {
    // DataTransfer not available in all environments; W4 upload handles the real path.
  }
}

function handleFile(
  file: File,
  set: (s: DropState) => void,
  input: HTMLInputElement | null,
) {
  if (file.type !== "application/pdf") {
    if (input) input.value = "";
    set({ type: "rejected", reason: "Only PDF files are accepted." });
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    if (input) input.value = "";
    set({ type: "rejected", reason: "File exceeds the 10 MB limit." });
    return;
  }
  if (input) syncToInput(file, input);
  set({ type: "selected", name: file.name });
}

function PitchDeckDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<DropState>({ type: "idle" });

  return (
    <div className="space-y-2">
      <span className="block font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy">
        Pitch deck (optional)
      </span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file, setStatus, inputRef.current);
        }}
        aria-label="Upload pitch deck — drag a PDF here or click to browse"
        className={`flex w-full flex-col items-center justify-center gap-2 border border-dashed py-8 text-center transition-colors ${
          status.type === "selected"
            ? "border-brand-cerulean bg-brand-cerulean/5"
            : status.type === "rejected"
            ? "border-red-400 bg-red-50"
            : "border-brand-navy/20 hover:border-brand-navy/40"
        }`}
      >
        {status.type === "idle" && (
          <>
            <span className="font-body text-[15px] text-brand-navy/60">
              Drag a PDF here, or click to browse
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/40">
              PDF &middot; max 10 MB
            </span>
          </>
        )}
        {status.type === "selected" && (
          <span className="font-body text-[15px] text-brand-navy">{status.name}</span>
        )}
        {status.type === "rejected" && (
          <span className="font-body text-[15px] text-red-600">{status.reason}</span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        name="pitch_deck"
        accept=".pdf,application/pdf"
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file, setStatus, inputRef.current);
        }}
      />
    </div>
  );
}
