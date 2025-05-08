// app/api/auth/google/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/auth";
import { routes } from "@/routes";

export async function GET() {
  const supabase = await createClient();

  // Kick off OAuth & tell Supabase where to callback
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${routes.hrDashboard}`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Supabase returns a URL for the consent screen
  return NextResponse.json({ url: data.url }, { status: 200 });
}
