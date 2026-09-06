import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Abdullah Khan for digital marketing work.",
};

export default function ContactPage() {
  return (
    <section className="section container">
      <h1 className="section-title">Contact</h1>
      <p className="muted">
        {profile.location} · {profile.phone} · {profile.email}
      </p>
      <div className="panel" style={{ padding: "1.5rem", maxWidth: "640px", marginTop: "1.25rem" }}>
        <ContactForm />
      </div>
    </section>
  );
}
