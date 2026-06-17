"use client";

/** Submit button — DESIGN.md §9 (primary CTA = brand-navy fill, cream label). */
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { pending?: boolean };

export function SubmitButton({
  pending,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <button
        type="submit"
        disabled={pending || disabled}
        className="bg-amber px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-bg-midnight transition hover:bg-amber-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean focus-visible:ring-offset-2 disabled:opacity-50"
        {...rest}
      >
        {pending ? "Sending…" : children}
      </button>
    </div>
  );
}
