export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface-950"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-surface-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500" />
        </div>
        <span className="font-mono text-xs text-text-muted">Loading…</span>
      </div>
    </div>
  );
}
