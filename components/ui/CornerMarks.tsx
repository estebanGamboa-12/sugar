export function CornerMarks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4 border border-cream/15">
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cream/70" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cream/70" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cream/70" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cream/70" />
    </div>
  );
}
