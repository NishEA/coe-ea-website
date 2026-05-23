"use client";

/**
 * Field — shared form primitive (DESIGN.md §9; design-doc §17 "shared form layer").
 *
 * Skeleton for the apply + booking forms (W3+). The full form layer adds
 * on-blur validation, char counters, and integrates with the typed
 * server-action error model. Fleshed out in W3.
 */
import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: ReactNode;
};

export function Field({ label, error, hint, id, ...input }: Props) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy">
        {label}
      </span>
      <input
        id={id}
        aria-describedby={errorId}
        aria-invalid={!!error || undefined}
        className="mt-2 w-full border-b border-brand-navy/30 bg-transparent py-2 font-body text-brand-navy outline-none focus:border-brand-cerulean"
        {...input}
      />
      {hint && !error && (
        <span className="mt-1 block font-body text-xs text-brand-navy/60">
          {hint}
        </span>
      )}
      {error && (
        <span
          id={errorId}
          role="alert"
          className="mt-1 block font-body text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
}
