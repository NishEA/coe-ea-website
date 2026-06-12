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

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isStudio = request.nextUrl.pathname.startsWith("/studio");
  response.headers.set(
    "Content-Security-Policy",
    isStudio ? STUDIO_CSP : SITE_CSP,
  );
  return response;
}

export const config = {
  // Skip static assets — CSP only applies to document/API responses.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
