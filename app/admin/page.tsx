/**
 * /admin — Messages tab
 */
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MessagesTable } from "@/components/admin/messages-table";

export const metadata: Metadata = { title: "Admin — Messages" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, company, message, read, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="admin-section">
        <h1 className="admin-page-title">Messages</h1>
        <p className="muted">Could not load messages: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <h1 className="admin-page-title">
        Messages
        {messages && messages.filter((m) => !m.read).length > 0 && (
          <span className="badge" style={{ marginLeft: "0.6rem", background: "var(--accent)", color: "#fff", border: "none" }}>
            {messages.filter((m) => !m.read).length} unread
          </span>
        )}
      </h1>
      <MessagesTable messages={messages ?? []} />
    </section>
  );
}
