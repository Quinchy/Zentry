// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { email, password, firstName, lastName } = await request.json();
  // 1) Sign up with Supabase
  const supabase = await createSupabaseClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // 2) Create User record
  await prisma.app_user.create({
    data: {
      userId: authData.user!.id,
      userNo: uuidv4(),
      firstName,
      lastName,
      role: "ADMIN",
    },
  });

  // 3) Tell the client to redirect
  return NextResponse.json(
    { success: "Account created!", redirectTo: "/dashboard" },
    { status: 201 },
  );
}
