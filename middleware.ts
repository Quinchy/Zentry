// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check once per request
  const auth = await isAuthenticated();

  // 1) If an already-logged-in user hits /login or /register → /dashboard
  if ((pathname === "/login" || pathname === "/register") && auth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2) If an unauthenticated user hits any /dashboard route → /login
  if (pathname.startsWith("/dashboard") && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3) Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
