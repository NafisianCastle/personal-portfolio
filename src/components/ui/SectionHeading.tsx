import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * Reusable section title block: eyebrow label + heading + optional description.
 */
export default function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {label && (
        <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
          {label}
        </span>
      )}
      <h2
        className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
