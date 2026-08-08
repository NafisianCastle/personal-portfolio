"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// Dynamically import to avoid SSR issues
const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

/* ── Skeleton while calendar loads ──────────────────────────────────────── */
function CalendarSkeleton() {
  return (
    <div className="h-32 w-full animate-pulse rounded-xl bg-surface-800/60" />
  );
}

/* ── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-surface-700/50 bg-surface-800/60 p-5 text-center"
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span
        className="font-display text-2xl font-black text-text-primary"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {value}
      </span>
      <span className="text-xs text-text-secondary">{label}</span>
    </motion.div>
  );
}

/* ── GitHub Activity section ─────────────────────────────────────────────── */
export default function GitHubActivity() {
  // Replace with your actual GitHub username
  const GITHUB_USERNAME = "nafisurrahman";

  const theme = {
    light: [
      "#0d0d1a",
      "#2a0018",
      "#5c0033",
      "#99004f",
      "#ff1a7c",
    ],
    dark: [
      "#0d0d1a",
      "#2a0018",
      "#5c0033",
      "#99004f",
      "#ff1a7c",
    ],
  };

  return (
    <Section id="github" className="bg-surface-900/40">
      <SectionHeading
        label="Open Source"
        title="GitHub Activity"
        description="A snapshot of my contribution history — commits, pull requests, and code reviews across personal and work projects."
      />

      {/* Stats row */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon="💻" label="Public Repos" value="20+" delay={0} />
        <StatCard icon="⭐" label="Total Stars" value="10+" delay={0.07} />
        <StatCard icon="🔀" label="Pull Requests" value="100+" delay={0.14} />
        <StatCard icon="🐛" label="Issues Closed" value="50+" delay={0.21} />
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-x-auto rounded-2xl border border-surface-700/50 bg-surface-800/60 p-6 sm:p-8"
      >
        <div className="min-w-[600px]">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme="dark"
            theme={theme}
            blockSize={13}
            blockMargin={4}
            fontSize={12}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      </motion.div>

      {/* GitHub profile link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-surface-700/50 bg-surface-800/50 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-brand-500/40 hover:text-text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          View full profile on GitHub
        </a>
      </motion.div>
    </Section>
  );
}
