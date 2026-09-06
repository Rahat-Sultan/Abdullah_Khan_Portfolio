"use client";

import { useActionState } from "react";
import { upsertRole } from "@/app/admin/experience/actions";
import type { ExperienceRow } from "@/lib/supabase/types";

type FormRole = Pick<
  ExperienceRow,
  "id" | "company" | "title" | "start_date" | "end_date" | "current" | "summary"
>;

const initial = { error: null as string | null };

export function ExperienceForm({
  role,
  onDone,
}: {
  role: FormRole | null;
  onDone?: () => void;
}) {
  const action = upsertRole.bind(null, role?.id ?? null);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="form admin-form">
      <div style={{ display: "grid", gap: "0.9rem", gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Company <span style={{ color: "var(--accent)" }}>*</span>
          <input name="company" required defaultValue={role?.company ?? ""} />
        </label>
        <label>
          Job title <span style={{ color: "var(--accent)" }}>*</span>
          <input name="title" required defaultValue={role?.title ?? ""} />
        </label>
        <label>
          Start date <span style={{ color: "var(--accent)" }}>*</span>
          <input
            name="start_date"
            required
            defaultValue={role?.start_date ?? ""}
            placeholder="January 2023"
          />
        </label>
        <label>
          End date <span className="muted">(leave blank if current)</span>
          <input
            name="end_date"
            defaultValue={role?.end_date ?? ""}
            placeholder="December 2024"
          />
        </label>
      </div>

      <label style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
        <input name="current" type="checkbox" defaultChecked={role?.current ?? false} />
        Currently working here
      </label>

      <label>
        Summary
        <textarea name="summary" defaultValue={role?.summary ?? ""} />
      </label>

      {state.error && (
        <p style={{ color: "var(--accent)", margin: 0 }}>{state.error}</p>
      )}

      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Saving…" : role ? "Save changes" : "Add role"}
        </button>
        {onDone && (
          <button type="button" className="btn" onClick={onDone}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
