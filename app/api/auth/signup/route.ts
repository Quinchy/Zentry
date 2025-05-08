// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { email, password, firstName, lastName } = await request.json();
  // 1) Sign up with Supabase
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // 2) Create Admin record
  await prisma.admin.create({
    data: {
      user: { connect: { id: authData.user!.id } },
      adminNo: uuidv4(),
      firstName,
      lastName,
    },
  });

  // 3) Tell the client to redirect
  return NextResponse.json(
    { success: "Account created!", redirectTo: "/dashboard/hr" },
    { status: 201 },
  );
}
