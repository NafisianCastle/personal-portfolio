"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, type SkillCategory } from "@/data/skills";

/* ── Level dot indicator ─────────────────────────────────────────────────── */
function LevelDots({ level }: { level: "expert" | "proficient" | "familiar" }) {
  const filled = level === "expert" ? 3 : level === "proficient" ? 2 : 1;
  return (
    <span className="flex gap-0.5" aria-label={level}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
            i < filled ? "bg-brand-500" : "bg-surface-600"
          }`}
        />
      ))}
    </span>
  );
}

/* ── Skill category card ─────────────────────────────────────────────────── */
function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-800/60 p-6 backdrop-blur-sm"
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${category.color}18 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {/* Top border accent */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
          style={{ background: `${category.color}18`, border: `1px solid ${category.color}30` }}
          aria-hidden="true"
        >
          {category.icon}
        </span>
        <h3
          className="font-display text-base font-bold text-text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {category.label}
        </h3>
      </div>

      {/* Skill list */}
      <ul className="flex flex-col gap-2.5">
        {category.skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-2">
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
              {skill.name}
            </span>
            <LevelDots level={skill.level} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Legend ──────────────────────────────────────────────────────────────── */
function Legend() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
      <span className="font-medium text-text-secondary">Proficiency:</span>
      {(["expert", "proficient", "familiar"] as const).map((level) => {
        const filled = level === "expert" ? 3 : level === "proficient" ? 2 : 1;
        return (
          <span key={level} className="flex items-center gap-2 capitalize">
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i < filled ? "bg-brand-500" : "bg-surface-600"}`}
                />
              ))}
            </span>
            {level}
          </span>
        );
      })}
    </div>
  );
}

/* ── Skills section ──────────────────────────────────────────────────────── */
export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        label="Skills"
        title="What I work with"
        description="A breadth of technologies spanning cloud, backend, frontend, automation, and DevOps — built through 4+ years of real-world engineering."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <SkillCard key={category.id} category={category} index={i} />
        ))}
      </div>

      <Legend />
    </Section>
  );
}
