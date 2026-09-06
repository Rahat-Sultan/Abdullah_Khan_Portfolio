"use client";

import Link from "next/link";
import { deleteProject } from "@/app/admin/projects/actions";
import type { ProjectRow } from "@/lib/supabase/types";

type Row = Pick<
  ProjectRow,
  "id" | "title" | "category" | "featured" | "published" | "updated_at"
>;

export function ProjectsTable({ projects }: { projects: Row[] }) {
  if (!projects.length) {
    return <p className="muted">No projects yet. Click &ldquo;+ New project&rdquo; to add one.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Published</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.category ?? "—"}</td>
              <td>{p.featured ? "✓" : "—"}</td>
              <td>
                <span
                  className="badge"
                  style={
                    p.published
                      ? { background: "var(--accent)", color: "#fff", border: "none" }
                      : {}
                  }
                >
                  {p.published ? "Live" : "Draft"}
                </span>
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {new Date(p.updated_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="btn"
                    style={{ padding: "0.25rem 0.6rem", fontSize: "0.78rem" }}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn"
                    style={{
                      padding: "0.25rem 0.6rem",
                      fontSize: "0.78rem",
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                    onClick={() => {
                      if (confirm(`Delete ${p.title}? This cannot be undone.`)) {
                        deleteProject(p.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
