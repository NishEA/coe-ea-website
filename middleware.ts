import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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

  const { pathname } = request.nextUrl;
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

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
