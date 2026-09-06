/**
 * /admin/profile — edit bio, social links, upload avatar
 */
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/admin/profile-form";
import { AvatarUpload } from "@/components/admin/avatar-upload";

export const metadata: Metadata = { title: "Admin — Profile" };
export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, name, title, location, email, phone, greeting, intro, about, social_email, social_linkedin, social_instagram, resume_path, avatar_path",
    )
    .limit(1)
    .single();

  return (
    <section className="admin-section">
      <h1 className="admin-page-title">Profile</h1>

      <h2 style={{ fontSize: "1.05rem", margin: "0 0 0.9rem" }}>Avatar</h2>
      <AvatarUpload
        profileId={profile?.id ?? null}
        currentPath={profile?.avatar_path ?? null}
      />

      <hr className="admin-divider" />
      <h2 style={{ fontSize: "1.05rem", margin: "1.5rem 0 0.9rem" }}>Details</h2>
      <ProfileForm profile={profile ?? null} />
    </section>
  );
}
