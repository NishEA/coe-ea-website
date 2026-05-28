"use client";
import { useActionState, useRef, useEffect } from "react";
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

const TEAM_SIZE_OPTIONS = [
  { value: "solo", label: "Solo founder" },
  { value: "2", label: "2 co-founders" },
  { value: "3", label: "3 co-founders" },
  { value: "4+", label: "4 or more" },
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
      <Field
        label="Phone number"
        id="founder_phone"
        name="founder_phone"
        type="tel"
        required
        autoComplete="tel"
        error={state.errors?.founder_phone}
      />

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
        maxLength={400}
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
          label="Team size (optional)"
          id="team_size"
          name="team_size"
          options={TEAM_SIZE_OPTIONS}
          placeholder="Select one"
        />
      </div>
      <SelectField
        label="How did you hear about us? (optional)"
        id="referral_source"
        name="referral_source"
        options={REFERRAL_OPTIONS}
        placeholder="Select one"
      />

      {/* — DPDP Act 2023 consent (§7(a)) ———————————— */}
      <div className="space-y-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacy_consent"
            id="privacy_consent"
            value="true"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-navy/30 text-brand-navy focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            aria-describedby="privacy_consent_desc"
          />
          <span
            id="privacy_consent_desc"
            className="font-body text-[14px] leading-[1.6] text-brand-navy/70"
          >
            I consent to Software Technology Parks of India (STPI) collecting
            and processing the personal data in this form for evaluating my
            incubation application, as described in the{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            >
              privacy notice
            </a>
            . I understand I may withdraw consent at any time by writing to
            nishant.peddagopu@stpi.in.
          </span>
        </label>
        {state.errors?.privacy_consent && (
          <p className="font-body text-[13px] text-red-600" role="alert">
            {state.errors.privacy_consent}
          </p>
        )}
      </div>

      <SubmitButton pending={pending}>Submit application</SubmitButton>
    </form>
  );
}
