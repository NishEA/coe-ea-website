"use client";
import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-paper px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
            CoE-EA · Admin
          </p>
          <h1 className="mt-3 font-display text-[32px] leading-[1.1] text-brand-navy">
            Sign in
          </h1>
        </div>

        <form action={formAction} noValidate className="space-y-6">
          {state.error && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 font-body text-[13px] text-red-700"
            >
              {state.error}
            </div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="w-full border-b border-brand-navy/30 bg-transparent py-2.5 font-body text-[15px] text-brand-navy outline-none transition focus:border-brand-navy placeholder:text-brand-navy/30"
              placeholder="you@stpi.in"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border-b border-brand-navy/30 bg-transparent py-2.5 font-body text-[15px] text-brand-navy outline-none transition focus:border-brand-navy"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-navy px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-bg-paper transition hover:bg-brand-navy/90 disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
