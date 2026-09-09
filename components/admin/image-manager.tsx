"use client";

import { useRef, useState, useTransition } from "react";
import {
  uploadProjectImage,
  deleteProjectImage,
  reorderProjectImages,
} from "@/app/admin/projects/actions";

type ImageRow = { id: string; storage_path: string; sort_order: number };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function imageUrl(path: string) {
  if (!supabaseUrl || !path) return "";
  return `${supabaseUrl}/storage/v1/object/public/portfolio/${path}`;
}

export function ImageManager({
  projectId,
  images: initialImages,
}: {
  projectId: string;
  images: ImageRow[];
}) {
  // Local state drives the displayed order — reorder happens optimistically
  const [images, setImages] = useState<ImageRow[]>(
    [...initialImages].sort((a, b) => a.sort_order - b.sort_order),
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // ── drag state ────────────────────────────────────────────────
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragEnter(index: number) {
    setDragOver(index);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault(); // required to allow drop
  }

  function onDrop(dropIndex: number) {
    const from = dragIndex.current;
    if (from === null || from === dropIndex) {
      dragIndex.current = null;
      setDragOver(null);
      return;
    }

    // Reorder the local array
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(dropIndex, 0, moved!);

    // Assign clean sequential sort_order values
    const updated = reordered.map((img, i) => ({ ...img, sort_order: i + 1 }));
    setImages(updated);
    dragIndex.current = null;
    setDragOver(null);

    // Persist to Supabase
    setSaveMsg(null);
    startTransition(async () => {
      await reorderProjectImages(
        updated.map(({ id, sort_order }) => ({ id, sort_order })),
      );
      setSaveMsg("Order saved ✓");
      setTimeout(() => setSaveMsg(null), 2000);
    });
  }

  function onDragEnd() {
    dragIndex.current = null;
    setDragOver(null);
  }

  // ── upload ────────────────────────────────────────────────────
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const result = await uploadProjectImage(projectId, fd);
    setUploading(false);
    if (result?.error) {
      setUploadError(result.error);
    } else {
      // Reload page data via router refresh would happen via revalidatePath.
      // For instant UI, append a placeholder and let the page refetch.
      window.location.reload();
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  // ── delete ────────────────────────────────────────────────────
  function handleDelete(img: ImageRow) {
    if (!confirm("Delete this image?")) return;
    setImages((prev) => prev.filter((i) => i.id !== img.id));
    startTransition(() => deleteProjectImage(img.id, img.storage_path));
  }

  // ── render ────────────────────────────────────────────────────
  return (
    <div>
      {images.length > 1 && (
        <p className="muted" style={{ fontSize: "0.82rem", marginBottom: "0.75rem" }}>
          Drag images to reorder — the first image shows as the card thumbnail.
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        {images.map((img, index) => (
          <div
            key={img.id}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
            onDragEnd={onDragEnd}
            style={{
              position: "relative",
              width: 120,
              height: 90,
              borderRadius: "0.5rem",
              overflow: "hidden",
              border: dragOver === index
                ? "2px solid var(--accent)"
                : "1px solid var(--border)",
              cursor: "grab",
              opacity: dragIndex.current === index ? 0.45 : 1,
              transition: "border-color 0.15s, opacity 0.15s",
              userSelect: "none",
            }}
            title={`Image ${index + 1} — drag to reorder`}
          >
            {/* Order badge */}
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 6,
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                borderRadius: "0.3rem",
                fontSize: "0.68rem",
                padding: "1px 5px",
                lineHeight: 1.6,
                userSelect: "none",
              }}
            >
              {index + 1}
            </div>

            {/* Drag handle hint */}
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 5,
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.75rem",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              ⠿
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl(img.storage_path)}
              alt={`Project image ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />

            {/* Delete button */}
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={`Delete image ${index + 1}`}
              onClick={() => handleDelete(img)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <label className="btn" style={{ cursor: "pointer", display: "inline-flex" }}>
          {uploading || isPending ? "Saving…" : "Upload image"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
            disabled={uploading || isPending}
          />
        </label>

        {saveMsg && (
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
            {saveMsg}
          </span>
        )}
      </div>

      {uploadError && (
        <p role="alert" style={{ color: "var(--accent)", marginTop: "0.5rem" }}>
          {uploadError}
        </p>
      )}
      <p className="muted" style={{ fontSize: "0.8rem", marginTop: "0.4rem" }}>
        Max 5 MB per image. Supported: JPG, PNG, WebP, GIF.
      </p>
    </div>
  );
}
