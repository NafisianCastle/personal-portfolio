import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Top-level page wrapper. Sits between <body> and page content.
 */
export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("relative overflow-x-hidden", className)}>
      {children}
    </div>
  );
}
