import type { Metadata } from "next";
import { SubmitForm } from "./submit-form";

export const metadata: Metadata = {
  title: "Submit a Site",
  description:
    "Submit a website to the gallery. Every submission is reviewed by a human curator — no fees, no pay-to-play placement. If it teaches something, it gets in.",
  alternates: { canonical: "/submit" },
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-xl pt-16 sm:pt-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Submit a site
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        Made something that isn&apos;t boring — or found one? Every submission
        is reviewed by hand. No fees, no favors: if it teaches something, it
        gets in.
      </p>
      <div className="mt-10">
        <SubmitForm />
      </div>
    </div>
  );
}
