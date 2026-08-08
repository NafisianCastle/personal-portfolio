"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Skip the fade-in-on-scroll animation */
  noAnimation?: boolean;
  /** Don't wrap content in a Container */
  fullWidth?: boolean;
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section wrapper with optional scroll-triggered fade-in animation.
 */
export default function Section({
  children,
  id,
  className,
  containerClassName,
  noAnimation = false,
  fullWidth = false,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const inner = fullWidth ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative py-20 lg:py-28", className)}
    >
      {noAnimation ? (
        inner
      ) : (
        <motion.div
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {inner}
        </motion.div>
      )}
    </section>
  );
}
