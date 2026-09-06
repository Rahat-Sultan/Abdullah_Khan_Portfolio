/**
 * /admin/login
 * Magic-link auth via Supabase Auth (free tier).
 * No password stored — admin enters their email, gets a one-time link.
 */
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <div className="admin-login__card panel">
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Enter your email to receive a one-time sign-in link.
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
