"use client";
import { useState, type FocusEventHandler, type ChangeEventHandler } from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  maxLength: number;
  required?: boolean;
  rows?: number;
  error?: string;
  defaultValue?: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function TextareaField({
  label,
  id,
  name,
  maxLength,
  required,
  rows = 4,
  error,
  defaultValue = "",
  onBlur,
  onChange,
}: Props) {
  const [length, setLength] = useState(defaultValue.length);
  const errorId = error ? `${id}-error` : undefined;
  const counterId = `${id}-counter`;
  const remaining = maxLength - length;
  const nearLimit = length > maxLength * 0.9;
  const atLimit = length >= maxLength;

  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-navy">
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        required={required}
        maxLength={maxLength}
        rows={rows}
        defaultValue={defaultValue}
        aria-describedby={[errorId, counterId].filter(Boolean).join(" ")}
        aria-invalid={!!error || undefined}
        className="mt-2 w-full resize-none border-b border-brand-navy/30 bg-transparent py-2 font-body text-brand-navy outline-none focus:border-brand-cerulean"
        onChange={(e) => {
          setLength(e.target.value.length);
          onChange?.(e);
        }}
        onBlur={onBlur}
      />
      <div className="mt-1 flex items-start justify-between gap-4">
        {error ? (
          <span id={errorId} role="alert" className="font-body text-xs text-red-600">
            {error}
          </span>
        ) : (
          <span />
        )}
        <span
          id={counterId}
          aria-live="polite"
          aria-atomic="true"
          className={`shrink-0 font-mono text-[11px] tabular-nums ${
            atLimit
              ? "text-red-600"
              : nearLimit
              ? "text-orange-500"
              : "text-brand-navy/40"
          }`}
        >
          {remaining}
        </span>
      </div>
    </label>
  );
}
