"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const highlights = [
  { value: "4+", label: "Years of Experience" },
  { value: "2", label: "Countries Deployed" },
  { value: "10+", label: "Technologies Mastered" },
  { value: "∞", label: "Workflows Automated" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <Section id="about" className="bg-surface-900/40">
      <SectionHeading
        label="About Me"
        title="Building the future, one system at a time"
        align="left"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        {/* Left — photo + highlight stats */}
        <div className="flex flex-col gap-8">
          {/* Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-fit lg:mx-0"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl sm:h-72 sm:w-72">
              {/* Gradient placeholder — swap for <Image> when photo is available */}
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(135deg, #1e1e3f 0%, #2a2a52 50%, #1e1e3f 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-8xl font-black text-brand-500/20 select-none"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  aria-hidden="true"
                >
                  NR
                </span>
              </div>
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-3xl"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, #ff1a7c22 100%)",
                }}
                aria-hidden="true"
              />
            </div>
            {/* Gradient border ring */}
            <div
              className="absolute -inset-0.5 -z-10 rounded-2xl opacity-60"
              style={{
                background: "linear-gradient(135deg, #ff1a7c, #22d3ee)",
              }}
              aria-hidden="true"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-surface-600 bg-surface-800 px-3 py-2 shadow-xl">
              <p className="text-xs font-semibold text-text-secondary">Currently at</p>
              <p className="text-sm font-bold text-text-primary">WellDev</p>
            </div>
          </motion.div>

          {/* Highlight stats */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 text-center"
              >
                <p
                  className="text-2xl font-black text-text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {h.value}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — bio text */}
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I&apos;m a{" "}
            <span className="font-semibold text-text-primary">
              Senior Software Engineer at WellDev
            </span>{" "}
            with over 4 years of hands-on experience building enterprise-grade
            applications across the full stack — from robust .NET Core APIs and
            Azure cloud infrastructure to modern Next.js frontends and
            Power Platform automations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            My core expertise lies in{" "}
            <span className="font-semibold text-brand-400">workflow automation</span> —
            designing and implementing complex business processes using Azure Logic Apps
            and Power Automate that turn manual, error-prone operations into
            reliable, scalable systems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            I also have deep experience in{" "}
            <span className="font-semibold text-accent-400">
              cross-tenant Azure Pipeline deployments
            </span>
            , Shopify theme and plugin development, and integrating
            Azure AI services into real-world products.
          </motion.p>

          {/* Specialisation tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {[
              "Workflow Automation",
              "Cloud Architecture",
              "API Design",
              "CI/CD Pipelines",
              "Cross-Tenant Deployments",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400 border border-brand-500/20"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
