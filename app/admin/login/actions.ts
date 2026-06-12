"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

// In-memory brute force guard: 5 attempts per IP per 15 minutes.
// Replace with Upstash Redis when durable rate limiting is added.
const loginAttempts = new Map<string, number[]>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = (loginAttempts.get(ip) ?? []).filter(
    (t) => now - t < LOGIN_WINDOW_MS,
  );
  if (attempts.length >= MAX_LOGIN_ATTEMPTS) return true;
  loginAttempts.set(ip, [...attempts, now]);
  return false;
}

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-vercel-forwarded-for") ??
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isLoginRateLimited(ip)) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!email || !password) return { error: "Email and password are required." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: "Invalid email or password." };

  redirect("/admin/applications");
}
