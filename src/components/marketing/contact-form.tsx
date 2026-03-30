"use client";

import { useState } from "react";
import { CONTACT_REASONS } from "@/lib/config/constants";

type ContactReason = (typeof CONTACT_REASONS)[number];

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialValues = {
  email: "",
  name: "",
  reason: CONTACT_REASONS[0] as ContactReason,
  message: "",
  link1: "",
  link2: "",
  honeypot: "",
  turnstileToken: "local-dev-token",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(formData: FormData) {
    setStatus({ type: "submitting" });

    const payload = {
      email: String(formData.get("email") || ""),
      name: String(formData.get("name") || ""),
      reason: String(formData.get("reason") || CONTACT_REASONS[0]),
      message: String(formData.get("message") || ""),
      links: [formData.get("link1"), formData.get("link2")].filter(Boolean),
      honeypot: String(formData.get("company") || ""),
      turnstileToken: String(formData.get("turnstileToken") || "local-dev-token"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; message?: string; error?: string }
      | null;

    if (!response.ok || !result?.ok) {
      setStatus({
        type: "error",
        message: result?.error || "Submission failed. Please try again or reach out via GitHub.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: result.message || "Message received. I will respond within the stated contact window.",
    });
    setValues(initialValues);
  }

  return (
    <form
      action={onSubmit}
      className="section-frame hard-shadow flex flex-col gap-5 p-6 md:p-8"
      aria-describedby="contact-status"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Email</span>
          <input
            className="field"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Name</span>
          <input
            className="field"
            name="name"
            type="text"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Reason</span>
        <select
          className="field"
          name="reason"
          value={values.reason}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, reason: event.target.value as ContactReason }))
          }
        >
          {CONTACT_REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Message</span>
        <textarea
          className="field textarea"
          name="message"
          required
          minLength={30}
          maxLength={2000}
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Optional link 1</span>
          <input
            className="field"
            name="link1"
            type="url"
            value={values.link1}
            onChange={(event) => setValues((prev) => ({ ...prev, link1: event.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Optional link 2</span>
          <input
            className="field"
            name="link2"
            type="url"
            value={values.link2}
            onChange={(event) => setValues((prev) => ({ ...prev, link2: event.target.value }))}
          />
        </label>
      </div>

      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={values.honeypot}
        onChange={(event) => setValues((prev) => ({ ...prev, honeypot: event.target.value }))}
      />
      <input name="turnstileToken" type="hidden" value={values.turnstileToken} readOnly />

      <div className="section-frame border-dashed p-4 text-sm text-text-muted">
        Turnstile placeholder: wire the Cloudflare widget with `NEXT_PUBLIC_TURNSTILE_SITE_KEY` before production.
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className="action-button" disabled={status.type === "submitting"} type="submit">
          {status.type === "submitting" ? "Sending..." : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-text-muted" id="contact-status" role="status">
          {status.type === "success" || status.type === "error"
            ? status.message
            : "Response SLA: 3 business days."}
        </p>
      </div>
    </form>
  );
}
