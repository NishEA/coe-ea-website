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
    <button
      type="submit"
      disabled={pending || disabled}
      className="rounded-full bg-brand-navy px-6 py-3 font-body text-text-on-midnight transition disabled:opacity-50"
      {...rest}
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
