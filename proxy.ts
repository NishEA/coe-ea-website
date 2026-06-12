import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Strict CSP for all public site routes.
// Three.js r184 and GSAP 3.15 don't use eval — no unsafe-eval needed.
// next/font/google self-hosts at build time — no external font CDN needed.
const SITE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://cdn.sanity.io",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.api.sanity.io",
    "https://cdn.sanity.io",
    "https://eeuqnsfscufdjaelcdbr.supabase.co",
    "wss://eeuqnsfscufdjaelcdbr.supabase.co",
    "https://vitals.vercel-insights.com",
  ].join(" "),
  "worker-src blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Permissive CSP for the embedded Sanity Studio (/studio).
// Studio v3 (sanity ^5) requires unsafe-eval and unsafe-inline for its bundled editor.
const STUDIO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://cdn.sanity.io https://*.sanity.io",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.api.sanity.io",
    "https://cdn.sanity.io",
    "wss://*.api.sanity.io",
  ].join(" "),
  "worker-src blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const csp = pathname.startsWith("/studio") ? STUDIO_CSP : SITE_CSP;

  // Non-admin routes: attach CSP and pass through (no Supabase call needed).
  if (!pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  // Admin routes: Supabase auth gate.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Must call getUser() not getSession() — getUser() validates the JWT
  // server-side on every request, getSession() trusts the cookie blindly.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = pathname === "/admin/login";

  // Restrict to explicitly allowed admin emails. If ADMIN_EMAIL is unset
  // the check passes through (backwards-compatible), but any configured
  // value is enforced — prevents a non-admin Supabase account from reaching
  // the service-role–backed dashboard.
  const allowedEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const isAuthorized =
    !!user &&
    (allowedEmails.length === 0 || allowedEmails.includes(user.email ?? ""));

  // Unauthenticated or unauthorised on any admin route → login
  if (!isLoginPage && !isAuthorized) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Already authenticated on login page → dashboard
  if (isLoginPage && isAuthorized) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/applications";
    return NextResponse.redirect(url);
  }

  supabaseResponse.headers.set("Content-Security-Policy", csp);
  return supabaseResponse;
}

export const config = {
  // Skip static assets — CSP only applies to document/API responses.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
