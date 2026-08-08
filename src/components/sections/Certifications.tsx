"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Placeholder cert card ───────────────────────────────────────────────── */
function PlaceholderCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 rounded-2xl border border-dashed border-surface-600/60 bg-surface-800/30 p-5"
      aria-hidden="true"
    >
      <div className="h-12 w-12 shrink-0 rounded-xl bg-surface-700/60" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3.5 w-3/4 rounded-full bg-surface-700/60" />
        <div className="h-2.5 w-1/2 rounded-full bg-surface-700/40" />
      </div>
      <div className="h-6 w-16 shrink-0 rounded-full bg-surface-700/40" />
    </motion.div>
  );
}

/* ── Coming soon badge ───────────────────────────────────────────────────── */
function ComingSoonBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mx-auto mb-10 w-fit rounded-full border border-brand-500/25 bg-brand-500/8 px-4 py-1.5"
    >
      <span className="flex items-center gap-2 text-xs font-semibold text-brand-400">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" aria-hidden="true" />
        Certifications coming soon
      </span>
    </motion.div>
  );
}

/* ── Certifications section ──────────────────────────────────────────────── */
export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        label="Certifications"
        title="Credentials & Badges"
        description="Microsoft and Azure certifications currently in progress. Check back soon."
      />

      <ComingSoonBadge />

      {/* Placeholder cards */}
      <div className="mx-auto max-w-2xl flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <PlaceholderCard key={i} delay={i * 0.08} />
        ))}
      </div>

      {/* Descriptive note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-center text-sm text-text-muted"
      >
        Working towards{" "}
        <span className="font-semibold text-text-secondary">AZ-204</span>,{" "}
        <span className="font-semibold text-text-secondary">PL-400</span>, and{" "}
        <span className="font-semibold text-text-secondary">AZ-400</span> certifications.
      </motion.p>
    </Section>
  );
}
