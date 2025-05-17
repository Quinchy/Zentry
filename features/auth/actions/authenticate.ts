"use server";

import { createSupabaseClient } from "@/lib/auth/server";
import { routes } from "@/routes";
import { redirect } from "next/navigation";

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

export async function googleLogin() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
}
