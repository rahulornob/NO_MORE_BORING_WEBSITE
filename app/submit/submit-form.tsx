"use client";

import { useActionState } from "react";
import clsx from "clsx";
import { submitSiteAction, type SubmitState } from "./actions";

const initialState: SubmitState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-ink";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState(submitSiteAction, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-accent-soft/60 p-8 text-sm leading-relaxed">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="url" className="mb-1.5 block text-sm font-medium">
          Site URL <span className="text-muted">*</span>
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Site name <span className="text-muted">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="What's it called?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Your email <span className="text-muted">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="So we can tell you if it's in"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm font-medium">
          Why is it not boring? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          placeholder="What should we look at first?"
          className={inputClass}
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={clsx(
          "rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition",
          pending ? "opacity-60" : "hover:opacity-85"
        )}
      >
        {pending ? "Sending…" : "Submit for review"}
      </button>
    </form>
  );
}
