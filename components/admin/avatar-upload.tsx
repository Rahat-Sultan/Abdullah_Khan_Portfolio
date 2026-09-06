"use client";

import { useRef, useState, useTransition } from "react";
import { uploadAvatar } from "@/app/admin/profile/actions";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function avatarUrl(path: string) {
  if (!supabaseUrl || !path) return "";
  return `${supabaseUrl}/storage/v1/object/public/portfolio/${path}`;
}

export function AvatarUpload({
  profileId,
  currentPath,
}: {
  profileId: string | null;
  currentPath: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profileId) return;
    setError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    startTransition(async () => {
      const result = await uploadAvatar(profileId, fd);
      setUploading(false);
      if (result?.error) setError(result.error);
    });
    if (inputRef.current) inputRef.current.value = "";
  }

  const previewSrc = currentPath ? avatarUrl(currentPath) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
      <div
        className="avatar"
        style={{
          width: 96,
          height: 96,
          fontSize: "1.8rem",
          flexShrink: 0,
          ...(previewSrc
            ? {
                backgroundImage: `url(${previewSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}),
        }}
        aria-label="Current avatar"
      >
        {!previewSrc && "AK"}
      </div>

      <div>
        {!profileId ? (
          <p className="muted">Save the profile below first, then upload an avatar.</p>
        ) : (
          <>
            <label className="btn" style={{ cursor: "pointer", display: "inline-flex" }}>
              {uploading ? "Uploading…" : "Upload photo"}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleUpload}
                disabled={uploading}
                aria-label="Upload avatar image"
              />
            </label>
            <p className="muted" style={{ fontSize: "0.8rem", marginTop: "0.4rem" }}>
              Max 3 MB. JPG, PNG, or WebP. Square crop recommended.
            </p>
            {error && (
              <p role="alert" style={{ color: "var(--accent)", marginTop: "0.4rem" }}>{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
