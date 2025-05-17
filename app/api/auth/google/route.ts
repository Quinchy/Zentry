// app/api/auth/google/route.ts
import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/auth/server";

export async function GET() {
  const supabase = await createSupabaseClient();

  // Kick off OAuth & tell Supabase where to callback
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Supabase returns a URL for the consent screen
  return NextResponse.json({ url: data.url }, { status: 200 });
}
