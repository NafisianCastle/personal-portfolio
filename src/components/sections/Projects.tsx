"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  projects,
  categoryLabels,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const CATEGORIES: ProjectCategory[] = ["all", "work", "personal"];

/* ── External link icon ──────────────────────────────────────────────────── */
function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.25 2.625H2.625A1.125 1.125 0 001.5 3.75v7.625A1.125 1.125 0 002.625 12.5H10.25a1.125 1.125 0 001.125-1.125V8.75M8.375 1.5H12.5m0 0v4.125M12.5 1.5L6.5 7.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ── Filter tabs ─────────────────────────────────────────────────────────── */
function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: ProjectCategory;
  onChange: (c: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
}) {
  return (
    <div
      className="mb-10 flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`relative rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
            active === cat
              ? "text-white"
              : "border border-surface-700/50 bg-surface-800/50 text-text-secondary hover:border-brand-500/40 hover:text-text-primary"
          }`}
        >
          {active === cat && (
            <motion.span
              layoutId="active-tab"
              className="absolute inset-0 rounded-xl bg-brand-500"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              aria-hidden="true"
            />
          )}
          <span className="relative z-10">
            {categoryLabels[cat]}{" "}
            <span
              className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                active === cat
                  ? "bg-white/20 text-white"
                  : "bg-surface-700 text-text-muted"
              }`}
            >
              {counts[cat]}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── Project card ────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-800/60 backdrop-blur-sm"
      aria-label={`Project: ${project.title}`}
    >
      {/* Top glow bar */}
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Icon + featured badge */}
        <div className="mb-4 flex items-start justify-between">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
            style={{
              background: `${project.accentColor}18`,
              border: `1px solid ${project.accentColor}30`,
            }}
            aria-hidden="true"
          >
            {project.icon}
          </span>
          {project.featured && (
            <span className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-400">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="mb-2 font-display text-base font-bold leading-snug text-text-primary group-hover:text-white transition-colors duration-200 sm:text-lg"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-surface-600/50 bg-surface-900/60 px-2 py-0.5 text-[11px] font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex items-center gap-3 border-t border-surface-700/40 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary transition-colors duration-200 hover:text-text-primary"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GithubIcon />
                Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                style={{ color: project.accentColor }}
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalIcon />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ── Projects section ────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    work: projects.filter((p) => p.category === "work").length,
    personal: projects.filter((p) => p.category === "personal").length,
  };

  return (
    <Section id="projects">
      <SectionHeading
        label="Projects"
        title="Things I've built"
        description="A selection of work and personal projects — from enterprise automation platforms to open-source tools."
      />

      <FilterTabs
        active={activeCategory}
        onChange={setActiveCategory}
        counts={counts}
      />

      <motion.div
        layout
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-text-muted"
        >
          No projects in this category yet.
        </motion.p>
      )}
    </Section>
  );
}
