import { ContactForm } from "@/components/contact/contact-form";

export function ContactSection({ name, email }: { name: string; email: string }) {
  return (
    <section className="section container" id="contact" style={{ textAlign: "center" }}>
      <h2 className="section-title">Get in touch</h2>
      <div
        className="panel"
        style={{
          padding: "1.5rem",
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <p className="muted">
          Reach {name} at {email} or leave a note below.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
