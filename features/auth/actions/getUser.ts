// features/auth/actions/getUser.ts
"use server";
import { createClient } from "@/lib/auth";

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { error: error.message };
  return data;
}
