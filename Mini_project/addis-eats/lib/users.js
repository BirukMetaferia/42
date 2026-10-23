import "server-only";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

// Demo users for this learning project.
// Password hashes are generated from environment variables on first setup.
const users = [
  {
    id: "customer-001",
    name: "Demo Customer",
    username: "customer",
    role: "customer",
    salt: process.env.CUSTOMER_PASSWORD_SALT,
    passwordHash: process.env.CUSTOMER_PASSWORD_HASH,
  },
  {
    id: "staff-001",
    name: "Demo Staff",
    username: "staff",
    role: "staff",
    salt: process.env.STAFF_PASSWORD_SALT,
    passwordHash: process.env.STAFF_PASSWORD_HASH,
  },
];

export async function verifyCredentials(username, password) {
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 100 ||
    password.length > 256
  ) {
    return null;
  }

  const user = users.find(
    (candidate) => candidate.username === username.trim().toLowerCase()
  );

  if (!user || !user.salt || !user.passwordHash) return null;

  try {
    const actual = await scrypt(password, Buffer.from(user.salt, "hex"), KEY_LENGTH);
    const expected = Buffer.from(user.passwordHash, "hex");

    if (
      expected.length !== KEY_LENGTH ||
      !timingSafeEqual(actual, expected)
    ) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}
