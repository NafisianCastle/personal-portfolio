"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Education section ───────────────────────────────────────────────────── */
export default function Education() {
  return (
    <Section id="education">
      <SectionHeading label="Education" title="Academic Background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-2xl flex-wrap items-start justify-between gap-4 rounded-2xl border border-surface-700/50 bg-surface-800/60 p-6 backdrop-blur-sm sm:p-8"
      >
        <div>
          <h3
            className="font-display text-lg font-bold text-text-primary sm:text-xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            B.Sc. in Computer Science and Engineering
          </h3>
          <p className="mt-1 text-sm font-semibold text-brand-400">
            American International University-Bangladesh, Dhaka
          </p>
          <p className="mt-2 text-sm text-text-secondary">CGPA 3.69 / 4.00</p>
        </div>
        <div className="shrink-0 rounded-lg border border-surface-700/50 bg-surface-900/60 px-3 py-1.5">
          <p className="font-mono text-xs font-semibold text-text-secondary">2018 — 2022</p>
        </div>
      </motion.div>
    </Section>
  );
}
