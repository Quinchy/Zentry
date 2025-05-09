"use server";

import { createSupabaseClient } from "@/lib/auth/server";

export async function login(formData: FormData) {
  const supabase = await createSupabaseClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error: error.message };
  }
  return { success: "User logged in successfully" };
}

export async function signOut() {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
}
