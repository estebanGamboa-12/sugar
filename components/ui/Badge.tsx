export function Badge({ text }: { text: string }) {
  return <span className="rounded-full border border-cream/25 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream/85">{text}</span>;
}
