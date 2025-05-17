// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { registerSchema } from "@/features/auth/schema/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { email, password, firstName, lastName, organizationName } =
    result.data;
  // 1) Sign up with Supabase
  const supabase = await createSupabaseClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }
  // 2) Create Organization record
  const organization = await prisma.organization.create({
    data: {
      organizationNo: uuidv4(),
      name: organizationName,
    },
  });
  // 3) Create User record
  await prisma.app_user.create({
    data: {
      userId: authData.user!.id,
      organizationId: organization.id,
      userNo: uuidv4(),
      firstName,
      lastName,
      role: "ADMIN",
    },
  });
  // 4) Tell the client to redirect
  return NextResponse.json(
    { success: "Account created!", redirectTo: "/dashboard" },
    { status: 201 },
  );
}
