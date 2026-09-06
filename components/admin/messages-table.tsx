"use client";

import { useState } from "react";
import { toggleRead, deleteMessage } from "@/app/admin/messages/actions";
import type { ContactMessage } from "@/lib/supabase/types";

export function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!messages.length) {
    return <p className="muted">No messages yet.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <>
              <tr
                key={msg.id}
                className={msg.read ? "" : "admin-row--unread"}
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              >
                <td>
                  <span
                    className="badge"
                    style={
                      msg.read
                        ? {}
                        : { background: "var(--accent)", color: "#fff", border: "none" }
                    }
                  >
                    {msg.read ? "Read" : "Unread"}
                  </span>
                </td>
                <td>{msg.name}</td>
                <td>
                  <a href={`mailto:${msg.email}`} onClick={(e) => e.stopPropagation()}>
                    {msg.email}
                  </a>
                </td>
                <td>{msg.company ?? "—"}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(msg.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      className="btn"
                      style={{ padding: "0.25rem 0.6rem", fontSize: "0.78rem" }}
                      onClick={() => toggleRead(msg.id, !msg.read)}
                    >
                      Mark {msg.read ? "unread" : "read"}
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
                        if (confirm("Delete this message permanently?")) {
                          deleteMessage(msg.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {expanded === msg.id && (
                <tr key={`${msg.id}-body`}>
                  <td colSpan={6} style={{ padding: "0.75rem 1rem" }}>
                    <div className="panel" style={{ padding: "0.9rem 1rem" }}>
                      <p className="muted" style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                        {msg.message ?? "(no message)"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
