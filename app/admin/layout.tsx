/**
 * Admin layout — session-gated.
 * Middleware already redirects unauthenticated users to /admin/login.
 * This layout adds the admin chrome (nav + sign-out) for all /admin/* routes
 * except /admin/login itself.
 */
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Fetch the current user to pass email to the nav bar
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-layout">
      {user && <AdminNav email={user.email ?? ""} />}
      <main className="admin-main">{children}</main>
    </div>
  );
}
