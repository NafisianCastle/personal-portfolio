"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast, { type ToastType } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

/* ── Social links data ───────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nafisiancastle/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0ea5e9",
  },
  {
    label: "GitHub",
    href: "https://github.com/NafisianCastle",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#a855f7",
  },
  {
    label: "Email",
    href: "mailto:rahman.mdnafisur1@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "#ff1a7c",
  },
];

/* ── Form field ──────────────────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, id, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-text-secondary">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-surface-600/60 bg-surface-800/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted backdrop-blur-sm transition-all duration-200 outline-none focus:border-brand-500/70 focus:ring-2 focus:ring-brand-500/20";

/* ── Form state types ────────────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

/* ── Contact section ─────────────────────────────────────────────────────── */
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; type: ToastType; message: string }>({
    visible: false,
    type: "success",
    message: "",
  });

  const dismissToast = useCallback(
    () => setToast((t) => ({ ...t, visible: false })),
    [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );

      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setToast({
        visible: true,
        type: "success",
        message: "Message sent! I'll get back to you soon.",
      });
    } catch {
      setToast({
        visible: true,
        type: "error",
        message: "Something went wrong. Please try emailing me directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Section id="contact">
        <SectionHeading
          label="Contact"
          title="Let's work together"
          description="Open to new opportunities, freelance projects, and interesting conversations. Drop me a message and I'll get back to you."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — social links + info */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="mb-3 font-display text-xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Get in touch
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Whether you have a project in mind, want to discuss a role, or
                just want to connect — my inbox is open.
              </p>
            </motion.div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition-all duration-200 hover:border-opacity-60"
                  style={
                    { "--hover-color": link.color } as React.CSSProperties
                  }
                  aria-label={`Visit ${link.label}`}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
                    style={{
                      background: `${link.color}18`,
                      border: `1px solid ${link.color}30`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {link.label}
                    </p>
                    <p className="text-xs text-text-muted">
                      {link.href.replace("mailto:", "").replace("https://", "")}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ml-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: link.color }}
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 7h9M8.5 4l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm font-medium text-emerald-400">
                Available for new opportunities
              </p>
            </motion.div>
          </div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 rounded-2xl border border-surface-700/50 bg-surface-800/40 p-6 backdrop-blur-sm sm:p-8"
              aria-label="Contact form"
            >
              <Field label="Name" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={cn(
                    inputClass,
                    errors.name && "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20",
                  )}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </Field>

              <Field label="Email" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={cn(
                    inputClass,
                    errors.email && "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20",
                  )}
                  aria-invalid={!!errors.email}
                />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className={cn(
                    inputClass,
                    "resize-none",
                    errors.message && "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20",
                  )}
                  aria-invalid={!!errors.message}
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="group relative overflow-hidden rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-600 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M1.5 7h11M8.5 3.5L12 7l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </form>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-surface-700/40 py-8 text-center">
        <p className="text-sm text-text-muted">
          Built with Next.js · Designed & developed by{" "}
          <span className="font-semibold text-text-secondary">Nafisur Rahman</span>
        </p>
      </footer>

      <Toast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onDismiss={dismissToast}
      />
    </>
  );
}
