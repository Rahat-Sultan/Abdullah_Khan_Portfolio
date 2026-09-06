"use client";

import { useActionState } from "react";
import { upsertProject } from "@/app/admin/projects/actions";
import type { ProjectRow } from "@/lib/supabase/types";

type FormProject = Pick<
  ProjectRow,
  | "id"
  | "title"
  | "category"
  | "summary"
  | "highlights"
  | "cta_label"
  | "destination_url"
  | "featured"
  | "published"
>;

const initial = { error: null as string | null };

export function ProjectForm({ project }: { project: FormProject | null }) {
  const action = upsertProject.bind(null, project?.id ?? null);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="form admin-form">
      <label>
        Title <span style={{ color: "var(--accent)" }}>*</span>
        <input name="title" required defaultValue={project?.title ?? ""} />
      </label>

      <label>
        Category
        <input name="category" defaultValue={project?.category ?? ""} placeholder="e.g. Social & Ads" />
      </label>

      <label>
        Summary
        <textarea name="summary" defaultValue={project?.summary ?? ""} />
      </label>

      <label>
        Highlights <span className="muted">(one per line)</span>
        <textarea
          name="highlights"
          defaultValue={(project?.highlights ?? []).join("\n")}
          placeholder={"Increased brand visibility\nOptimized Meta Ads campaigns"}
        />
      </label>

      <label>
        CTA button label
        <input name="cta_label" defaultValue={project?.cta_label ?? ""} placeholder="View campaign" />
      </label>

      <label>
        Destination URL{" "}
        <span className="muted">(never shown to visitors — served via redirect)</span>
        <input
          name="destination_url"
          type="url"
          defaultValue={project?.destination_url ?? ""}
          placeholder="https://example.com"
        />
      </label>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <label style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
          <input name="featured" type="checkbox" defaultChecked={project?.featured ?? false} />
          Featured on home page
        </label>
        <label style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
          <input name="published" type="checkbox" defaultChecked={project?.published ?? true} />
          Published (visible to public)
        </label>
      </div>

      {state.error && (
        <p style={{ color: "var(--accent)", margin: 0 }}>{state.error}</p>
      )}

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Saving…" : project ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}
