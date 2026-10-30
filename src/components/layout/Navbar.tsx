"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group flex items-center gap-2 font-display text-lg font-bold"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
      aria-label="Nafisur Rahman — home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-black text-white transition-transform duration-200 group-hover:scale-110">
        NR
      </span>
      <span className="hidden text-text-primary sm:block">
        Nafisur<span className="text-brand-500">.</span>
      </span>
    </a>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const isExternal = !href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-surface-950/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-surface-700/50"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://docs.google.com/document/d/14KmkjN-5SV3HFiou4ZYKA2eMr0R4vvSRrFijoG1Kcr8/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-brand-500/60 px-4 py-1.5 text-sm font-semibold text-brand-400 transition-all duration-200 hover:bg-brand-500/10 hover:border-brand-400 md:block"
          >
            See Resume
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors duration-200 hover:bg-surface-700 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-5 bg-text-primary origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-5 bg-text-primary origin-center"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-5 bg-text-primary origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-surface-900/95 backdrop-blur-lg border-l border-surface-700/50 pt-20 md:hidden"
          >
            <nav
              className="flex flex-col gap-2 px-6 py-4"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onClick={() => setMobileOpen(false)}
                  />
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                href="https://docs.google.com/document/d/14KmkjN-5SV3HFiou4ZYKA2eMr0R4vvSRrFijoG1Kcr8/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-lg border border-brand-500/60 px-4 py-2 text-center text-sm font-semibold text-brand-400 hover:bg-brand-500/10"
                onClick={() => setMobileOpen(false)}
              >
                See Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
