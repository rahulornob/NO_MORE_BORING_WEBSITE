import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "nmbw_admin";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Deterministic session token derived from the admin password. */
export function sessionToken(): string {
  return createHash("sha256")
    .update(`nmbw-session:${process.env.ADMIN_PASSWORD ?? ""}`)
    .digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const expected = sessionToken();
  if (cookie.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(cookie), Buffer.from(expected));
}

export function verifyPassword(input: string): boolean {
  if (!adminConfigured()) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(process.env.ADMIN_PASSWORD ?? "").digest();
  return timingSafeEqual(a, b);
}
