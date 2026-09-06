"use client";

import { useRef, useState, useTransition } from "react";
import { uploadProjectImage, deleteProjectImage } from "@/app/admin/projects/actions";

type ImageRow = { id: string; storage_path: string; sort_order: number };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function imageUrl(path: string) {
  if (!supabaseUrl || !path) return "";
  return `${supabaseUrl}/storage/v1/object/public/portfolio/${path}`;
}

export function ImageManager({
  projectId,
  images,
}: {
  projectId: string;
  images: ImageRow[];
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const result = await uploadProjectImage(projectId, fd);
    setUploading(false);
    if (result?.error) setUploadError(result.error);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
        {images.map((img) => (
          <div
            key={img.id}
            style={{ position: "relative", width: 120, height: 90, borderRadius: "0.5rem", overflow: "hidden", border: "1px solid var(--border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl(img.storage_path)}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
              aria-label="Delete image"
              onClick={() => {
                if (confirm("Delete this image?")) {
                  startTransition(() => deleteProjectImage(img.id, img.storage_path));
                }
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <label className="btn" style={{ cursor: "pointer", display: "inline-flex" }}>
        {uploading || isPending ? "Uploading…" : "Upload image"}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
          disabled={uploading || isPending}
        />
      </label>

      {uploadError && (
        <p style={{ color: "var(--accent)", marginTop: "0.5rem" }}>{uploadError}</p>
      )}
      <p className="muted" style={{ fontSize: "0.8rem", marginTop: "0.4rem" }}>
        Max 5 MB per image. Supported: JPG, PNG, WebP, GIF.
      </p>
    </div>
  );
}
