"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences, type ExperienceItem } from "@/data/experience";

/* ── Type badge ──────────────────────────────────────────────────────────── */
const typeBadge: Record<ExperienceItem["type"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
  "part-time": "Part-time",
};

/* ── Timeline dot ────────────────────────────────────────────────────────── */
function TimelineDot({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <div
        className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isActive
            ? "border-brand-500 bg-brand-500 shadow-lg shadow-brand-500/40"
            : "border-surface-600 bg-surface-800"
        }`}
      >
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute h-full w-full rounded-full bg-brand-500"
          />
        )}
      </div>
    </div>
  );
}

/* ── Single timeline entry ───────────────────────────────────────────────── */
function TimelineEntry({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isActive = item.endDate === "Present";

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* Timeline spine */}
      <div className="flex flex-col items-center pt-1">
        <TimelineDot isActive={isActive} />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 w-px flex-1 origin-top bg-gradient-to-b from-brand-500/40 to-surface-700/20"
            style={{ minHeight: "3rem" }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`mb-10 flex-1 overflow-hidden rounded-2xl border bg-surface-800/60 p-6 backdrop-blur-sm transition-all duration-300 sm:p-8 ${
          isActive
            ? "border-brand-500/30 shadow-lg shadow-brand-500/5"
            : "border-surface-700/50"
        }`}
      >
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className="font-display text-lg font-bold text-text-primary sm:text-xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.role}
              </h3>
              {isActive && (
                <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-brand-400 border border-brand-500/25">
                  Current
                </span>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  {item.company}
                </a>
              ) : (
                <span className="font-semibold text-brand-400">{item.company}</span>
              )}
              <span className="text-surface-600" aria-hidden="true">·</span>
              <span className="text-text-muted">{item.location}</span>
              <span className="text-surface-600" aria-hidden="true">·</span>
              <span className="text-text-muted">{typeBadge[item.type]}</span>
            </div>
          </div>

          {/* Date range */}
          <div className="shrink-0 rounded-lg border border-surface-700/50 bg-surface-900/60 px-3 py-1.5 text-center">
            <p className="font-mono text-xs font-semibold text-text-secondary">
              {item.startDate} — {item.endDate}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p className="mb-5 text-sm leading-relaxed text-text-secondary sm:text-base">
          {item.summary}
        </p>

        {/* Highlights */}
        <ul className="mb-5 flex flex-col gap-2.5" aria-label="Key highlights">
          {item.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: index * 0.15 + i * 0.06 + 0.3, duration: 0.4 }}
              className="flex gap-3 text-sm text-text-secondary"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                aria-hidden="true"
              />
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2" aria-label="Technologies used">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-surface-600/60 bg-surface-900/60 px-2.5 py-0.5 text-xs font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Experience section ──────────────────────────────────────────────────── */
export default function Experience() {
  return (
    <Section id="experience" className="bg-surface-900/40">
      <SectionHeading
        label="Experience"
        title="Where I've worked"
        description="My professional journey — the roles, companies, and projects that have shaped my engineering approach."
        align="left"
      />

      <div className="relative max-w-3xl">
        {experiences.map((item, i) => (
          <TimelineEntry
            key={item.id}
            item={item}
            index={i}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
