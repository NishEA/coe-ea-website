"use client";

/**
 * Error banner — preserves entered values; DESIGN.md §9.
 * Used as the "server-error banner above submit" pattern.
 */
export function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mb-4 border-l-2 border-red-600 bg-red-50 px-4 py-3 font-body text-sm text-red-900"
    >
      {message}
    </div>
  );
}
