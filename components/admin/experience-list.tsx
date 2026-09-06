"use client";

import { useState } from "react";
import { deleteRole } from "@/app/admin/experience/actions";
import { ExperienceForm } from "./experience-form";
import type { ExperienceRow } from "@/lib/supabase/types";

type Row = Pick<
  ExperienceRow,
  "id" | "company" | "title" | "start_date" | "end_date" | "current" | "summary" | "sort_order"
>;

export function ExperienceList({ roles }: { roles: Row[] }) {
  const [editing, setEditing] = useState<string | null>(null);

  if (!roles.length) {
    return <p className="muted">No experience entries yet.</p>;
  }

  return (
    <div className="timeline">
      {roles.map((role) => (
        <div key={role.id} className="panel" style={{ padding: "1.25rem" }}>
          {editing === role.id ? (
            <>
              <ExperienceForm role={role} onDone={() => setEditing(null)} />
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 0.2rem" }}>{role.title}</h3>
                  <p style={{ margin: "0 0 0.2rem" }}>{role.company}</p>
                  <p className="muted" style={{ margin: 0, fontSize: "0.87rem" }}>
                    {role.start_date} — {role.current ? "Present" : (role.end_date ?? "—")}
                  </p>
                  {role.summary && (
                    <p className="muted" style={{ margin: "0.5rem 0 0", fontSize: "0.87rem" }}>
                      {role.summary}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                  {role.current && <span className="badge">Current</span>}
                  <button
                    className="btn"
                    style={{ padding: "0.25rem 0.6rem", fontSize: "0.78rem" }}
                    onClick={() => setEditing(role.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{
                      padding: "0.25rem 0.6rem",
                      fontSize: "0.78rem",
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                    onClick={() => {
                      if (confirm(`Delete "${role.title} at ${role.company}"?`)) {
                        deleteRole(role.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
