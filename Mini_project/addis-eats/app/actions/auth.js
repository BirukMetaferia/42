"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";
import { verifyCredentials } from "@/lib/users";

function safeNextPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost") return "/";
    if (!["/", "/checkout", "/orders", "/kitchen"].some(
      (path) => url.pathname === path || url.pathname.startsWith(path + "/")
    )) {
      return "/";
    }
    return url.pathname + url.search;
  } catch {
    return "/";
  }
}

export async function signIn(formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const nextPath = safeNextPath(formData.get("next"));

  const user = await verifyCredentials(username, password);

  if (!user) {
    redirect("/login?error=invalid-credentials");
  }

  const token = createSessionToken(user);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect(nextPath);
}

export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  redirect("/login");
}
