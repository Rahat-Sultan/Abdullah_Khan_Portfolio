"use client";

import { useActionState } from "react";
import { upsertProfile } from "@/app/admin/profile/actions";

type FormProfile = {
  id: string;
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  phone: string | null;
  greeting: string | null;
  intro: string | null;
  about: string[] | null;
  social_email: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
};

const initial = { error: null as string | null };

export function ProfileForm({ profile }: { profile: FormProfile | null }) {
  const action = upsertProfile.bind(null, profile?.id ?? null);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="form admin-form">
      <div style={{ display: "grid", gap: "0.9rem", gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Full name <span style={{ color: "var(--accent)" }}>*</span>
          <input name="name" required defaultValue={profile?.name ?? ""} />
        </label>
        <label>
          Title <span style={{ color: "var(--accent)" }}>*</span>
          <input name="title" required defaultValue={profile?.title ?? ""} />
        </label>
        <label>
          Location
          <input name="location" defaultValue={profile?.location ?? ""} placeholder="Gulberg, Islamabad" />
        </label>
        <label>
          Email
          <input name="email" type="email" defaultValue={profile?.email ?? ""} />
        </label>
        <label>
          Phone
          <input name="phone" defaultValue={profile?.phone ?? ""} />
        </label>
      </div>

      <label>
        Hero greeting
        <input
          name="greeting"
          defaultValue={profile?.greeting ?? ""}
          placeholder="Hi, I'm Abdullah Khan – Digital Marketing Specialist"
        />
      </label>

      <label>
        Hero intro (1–2 sentences)
        <textarea name="intro" defaultValue={profile?.intro ?? ""} style={{ minHeight: "5rem" }} />
      </label>

      <label>
        About paragraphs{" "}
        <span className="muted">(separate paragraphs with a blank line)</span>
        <textarea
          name="about"
          defaultValue={(profile?.about ?? []).join("\n\n")}
          style={{ minHeight: "10rem" }}
        />
      </label>

      <fieldset style={{ border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem" }}>
        <legend style={{ padding: "0 0.5rem" }}>Social links</legend>
        <div style={{ display: "grid", gap: "0.9rem" }}>
          <label>
            Email href
            <input
              name="social_email"
              defaultValue={profile?.social_email ?? ""}
              placeholder="mailto:you@example.com"
            />
          </label>
          <label>
            LinkedIn URL
            <input
              name="social_linkedin"
              type="url"
              defaultValue={profile?.social_linkedin ?? ""}
              placeholder="https://linkedin.com/in/yourhandle"
            />
          </label>
          <label>
            Instagram URL
            <input
              name="social_instagram"
              type="url"
              defaultValue={profile?.social_instagram ?? ""}
              placeholder="https://instagram.com/yourhandle"
            />
          </label>
        </div>
      </fieldset>

      {state.error && (
        <p role="alert" style={{ color: "var(--accent)", margin: 0 }}>{state.error}</p>
      )}
      {!state.error && !pending && (
        <p aria-live="polite" style={{ color: "var(--accent)", margin: 0, minHeight: "1.2em" }} />
      )}

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
