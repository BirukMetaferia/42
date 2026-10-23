import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 bytes.");
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(user) {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + SESSION_MAX_AGE,
  };

  const encodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString("base64url");

  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token) {
  try {
    if (
      typeof token !== "string" ||
      token.length > 4096
    ) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [encodedPayload, suppliedSignature] = parts;

    if (
      !/^[A-Za-z0-9_-]+$/.test(encodedPayload) ||
      !/^[A-Za-z0-9_-]+$/.test(suppliedSignature)
    ) {
      return null;
    }

    const expectedSignature = sign(encodedPayload);
    const expectedBuffer = Buffer.from(expectedSignature);
    const suppliedBuffer = Buffer.from(suppliedSignature);

    if (
      expectedBuffer.length !== suppliedBuffer.length ||
      !timingSafeEqual(expectedBuffer, suppliedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    const now = Math.floor(Date.now() / 1000);

    if (
      !payload ||
      typeof payload.id !== "string" ||
      typeof payload.name !== "string" ||
      !["customer", "staff"].includes(payload.role) ||
      !Number.isInteger(payload.iat) ||
      !Number.isInteger(payload.exp) ||
      payload.iat > now + 60 ||
      payload.exp <= now ||
      payload.exp <= payload.iat ||
      payload.exp - payload.iat > SESSION_MAX_AGE
    ) {
      return null;
    }

    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
