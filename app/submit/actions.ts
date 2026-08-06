"use server";

import { revalidateTag } from "next/cache";
import { createSubmission } from "@/lib/data/mutations";

export type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitSiteAction(
  _prev: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  // Honeypot: real people never fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Got it — thanks!" };
  }

  const url = String(formData.get("url") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!title || !url) {
    return { status: "error", message: "The site name and URL are required." };
  }

  try {
    new URL(url);
  } catch {
    return {
      status: "error",
      message: "That URL doesn't look right — include https://",
    };
  }

  try {
    await createSubmission({ url, title, email, note });
  } catch (error) {
    console.error("Submission failed:", error);
    return {
      status: "error",
      message:
        "Submissions are having a moment — please try again in a bit.",
    };
  }

  revalidateTag("sites");
  return {
    status: "success",
    message:
      "Got it — thanks! Every submission is reviewed by hand. If it teaches something, it gets in.",
  };
}
