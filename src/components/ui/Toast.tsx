"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, type, visible, onDismiss }: ToastProps) {
  // Auto-dismiss after 5s
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl backdrop-blur-md max-w-sm",
            type === "success"
              ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-300"
              : "border-red-500/30 bg-red-950/90 text-red-300",
          )}
        >
          {/* Icon */}
          <span className="shrink-0 text-lg" aria-hidden="true">
            {type === "success" ? "✓" : "✕"}
          </span>
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onDismiss}
            className="ml-auto shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
            aria-label="Dismiss notification"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
