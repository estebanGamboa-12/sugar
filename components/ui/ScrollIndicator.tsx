export function ScrollIndicator() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cream/70">
      <span>Scroll</span>
      <span className="h-8 w-px animate-pulse bg-cream/60" />
    </div>
  );
}
