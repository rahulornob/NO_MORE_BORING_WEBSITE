"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  isAdmin,
  sessionToken,
  verifyPassword,
} from "@/lib/admin-auth";
import { removeSite, setFeatured, setStatus } from "@/lib/data/mutations";
import type { SiteStatus } from "@/lib/types";

export type LoginState = { error: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { error: "Wrong password." };
  }

  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Not authorized.");
}

function refreshEverything(): void {
  revalidateTag("sites");
  revalidatePath("/", "layout");
}

export async function syncNowAction(): Promise<void> {
  await requireAdmin();
  refreshEverything();
}

export async function toggleFeaturedAction(
  id: string,
  featured: boolean
): Promise<void> {
  await requireAdmin();
  await setFeatured(id, featured);
  refreshEverything();
}

export async function setStatusAction(
  id: string,
  status: SiteStatus
): Promise<void> {
  await requireAdmin();
  await setStatus(id, status);
  refreshEverything();
}

export async function deleteSiteAction(id: string): Promise<void> {
  await requireAdmin();
  await removeSite(id);
  refreshEverything();
}
