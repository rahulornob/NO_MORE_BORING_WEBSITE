"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto max-w-sm pt-24">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the admin password to continue.
      </p>
      <form action={formAction} className="mt-8 space-y-4">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Password"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-ink"
        />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-85 disabled:opacity-60"
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
