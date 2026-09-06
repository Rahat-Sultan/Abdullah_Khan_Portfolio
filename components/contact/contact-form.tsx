"use client";

import { FormEvent, useId, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const statusId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg((body as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div role="status" aria-live="polite" style={{ padding: "1rem 0" }}>
        <p style={{ color: "var(--accent)", margin: 0, fontWeight: 600 }}>
          ✓ Message sent!
        </p>
        <p className="muted" style={{ margin: "0.4rem 0 0" }}>
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={statusId}>
      <label htmlFor="cf-name">
        Name <span aria-hidden="true" style={{ color: "var(--accent)" }}>*</span>
      </label>
      <input
        id="cf-name"
        name="name"
        required
        autoComplete="name"
        aria-required="true"
        disabled={status === "sending"}
      />

      <label htmlFor="cf-email">
        Email <span aria-hidden="true" style={{ color: "var(--accent)" }}>*</span>
      </label>
      <input
        id="cf-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        aria-required="true"
        disabled={status === "sending"}
      />

      <label htmlFor="cf-company">
        Company <span className="muted">(optional)</span>
      </label>
      <input
        id="cf-company"
        name="company"
        autoComplete="organization"
        disabled={status === "sending"}
      />

      <label htmlFor="cf-message">
        Message <span className="muted">(optional)</span>
      </label>
      <textarea
        id="cf-message"
        name="message"
        disabled={status === "sending"}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p
          id={statusId}
          role="alert"
          aria-live="assertive"
          style={{ color: "var(--accent)", margin: 0 }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
