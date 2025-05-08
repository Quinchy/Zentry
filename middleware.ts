// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/features/auth/actions/getUser";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userOrError = await getUser();

  // 1) Already‐logged‐in users hitting /login or /register → go to HR dashboard
  if (
    (pathname === "/login" || pathname === "/register") &&
    !(userOrError && "error" in userOrError)
  ) {
    return NextResponse.redirect(new URL("/dashboard/hr", request.url));
  }

  // 2) Unauthenticated users hitting /dashboard/* → go to /login
  if (
    pathname.startsWith("/dashboard") &&
    userOrError &&
    "error" in userOrError
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};