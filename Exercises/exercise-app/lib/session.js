import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (!payload.userId) return null;

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
