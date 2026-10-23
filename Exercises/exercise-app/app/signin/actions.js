"use server";

import { redirect } from "next/navigation";
import { createSession } from "../../lib/create-session.js";
import { getSafeRedirect } from "../../lib/redirect.js";

export async function signIn(formData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "CUSTOMER");
  const next = getSafeRedirect(String(formData.get("next") ?? "/"));

  // Exercise-only mock authentication. Not for production use.
  if (
    username !== "student" ||
    password !== "exercise123" ||
    !["CUSTOMER", "STAFF"].includes(role)
  ) {
    redirect("/signin?error=invalid");
  }

  await createSession({
    id: "exercise-user-1",
    role,
  });

  redirect(next);
}
