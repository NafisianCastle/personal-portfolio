import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background orbs */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ff1a7c 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 404 */}
      <p
        className="mb-2 select-none font-display text-[10rem] font-black leading-none opacity-10 sm:text-[14rem]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          background: "linear-gradient(135deg, #ff1a7c, #22d3ee)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: 1,
        }}
        aria-hidden="true"
      >
        404
      </p>

      <h1
        className="mb-3 font-display text-2xl font-bold text-text-primary sm:text-3xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-base text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="rounded-xl border border-surface-600 bg-surface-800/50 px-6 py-3 text-sm font-bold text-text-primary transition-all duration-200 hover:border-brand-500/40"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
