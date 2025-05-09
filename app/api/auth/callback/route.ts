// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { routes } from "@/routes";
import { createSupabaseClient } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? routes.dashboard;

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createSupabaseClient();
  // 1) Exchange the OAuth code for a session
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    console.error("OAuth code exchange failed:", exchangeError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // 2) Retrieve the signed-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Could not fetch Supabase user:", userError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // 3) Ensure there’s an Admin row for this user
  const existing = await prisma.app_user.findUnique({
    where: { userId: user.id },
  });

  if (!existing) {
    // pull names from Google metadata if available
    const meta = user.user_metadata as Record<string, string>;
    const firstName = meta.given_name || meta.full_name?.split(" ")[0] || "";
    const lastName =
      meta.family_name || meta.full_name?.split(" ").slice(1).join(" ") || "";

    await prisma.app_user.create({
      data: {
        userId: user.id,
        userNo: uuidv4(),
        firstName,
        lastName,
        role: "ADMIN",
      },
    });
  }

  // 4) Perform your original redirect (handles local vs. forwarded host)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
