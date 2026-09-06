"use client";

import { useActionState } from "react";
import { sendMagicLink } from "@/app/admin/login/actions";

const initial = { ok: false, error: null as string | null };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(sendMagicLink, initial);

  if (state.ok) {
    return (
      <p style={{ color: "var(--accent)" }}>
        Check your inbox — a sign-in link is on its way.
      </p>
    );
  }

  return (
    <form action={action} className="form">
      <label>
        Email address
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      {state.error && (
        <p style={{ color: "var(--accent)", margin: 0 }}>{state.error}</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send magic link"}
      </button>
    </form>
  );
}
