"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

/* ── Animation variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Floating orbs background ───────────────────────────────────────────── */
function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Large pink orb — top left */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #ff1a7c 0%, #ff1a7c00 70%)",
        }}
      />
      {/* Cyan orb — bottom right */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, #22d3ee 0%, #22d3ee00 70%)",
        }}
      />
      {/* Small accent orb — center */}
      <motion.div
        animate={{
          x: [0, 15, -15, 0],
          y: [0, -30, 10, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #ff1a7c 0%, #22d3ee 50%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* ── Stat badge ─────────────────────────────────────────────────────────── */
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-display text-2xl font-black text-text-primary sm:text-3xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}>
        {value}
      </span>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}

/* ── Tech pill ──────────────────────────────────────────────────────────── */
function TechPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-surface-600 bg-surface-800/60 px-3 py-1 text-xs font-medium text-text-secondary">
      {label}
    </span>
  );
}

/* ── Hero component ─────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pb-16 pt-32"
      aria-label="Hero section"
    >
      <BackgroundOrbs />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-brand-500" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 font-display text-5xl font-black leading-[1.05] text-text-primary sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hi, I&apos;m{" "}
            <span
              className="gradient-text"
              style={{
                background: "linear-gradient(135deg, #ff1a7c 0%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nafisur
            </span>
            <br />
            Rahman
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-xl font-semibold text-text-secondary sm:text-2xl"
          >
            Senior Software Engineer{" "}
            <span className="text-brand-400">@ WellDev</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I build real-time, event-driven .NET backends — gRPC and MQTT
            services, background data pipelines, and Azure CI/CD — shipping
            journey-planning and dispatch systems for Swiss public transport
            operators.
          </motion.p>

          {/* Tech pills */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-wrap gap-2"
            aria-label="Key technologies"
          >
            {[
              "C# / .NET",
              "gRPC",
              "MQTT",
              "Azure Pipelines",
              "OpenTelemetry",
              "Next.js",
            ].map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="group relative overflow-hidden rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:bg-brand-600 hover:shadow-brand-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 -translate-x-full bg-white/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
            <a
              href="/Nafisur_Rahman_CV.pdf"
              download
              className="rounded-xl border border-surface-600 bg-surface-800/50 px-6 py-3 text-sm font-bold text-text-primary transition-all duration-200 hover:border-brand-500/50 hover:bg-surface-700"
            >
              Download CV
            </a>
            <button
              onClick={() => scrollToSection("#contact")}
              className="text-sm font-medium text-text-secondary underline underline-offset-4 decoration-dotted hover:text-brand-400 transition-colors duration-200"
            >
              Get in touch →
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 border-t border-surface-700/50 pt-8"
            aria-label="Career highlights"
          >
            <StatBadge value="4+" label="Years Experience" />
            <div className="h-10 w-px bg-surface-700/50 self-center" aria-hidden="true" />
            <StatBadge value="50%" label="Faster Releases" />
            <div className="h-10 w-px bg-surface-700/50 self-center" aria-hidden="true" />
            <StatBadge value="32h" label="Manual Work Saved / Month" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-text-muted"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
