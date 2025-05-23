"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return encodedRedirect("error", "/signup", "Email and password are required.");
    }
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    encodedRedirect("error", "/signup", error.message);
  } else {
    return encodedRedirect("success", "/login", "Sign up successful.");
  }

  // URL to redirect to after sign up process completes
};

export const signInAction = async (formData: FormData) => {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    encodedRedirect("error", "/login", error.message);
  }

  // URL to redirect to after sign in process completes
  return redirect("/protected/home");
}
