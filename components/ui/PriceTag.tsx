export function PriceTag({ amount }: { amount: string }) {
  return <div className="rounded border border-ruby/50 px-3 py-1 text-xs tracking-[0.2em] text-ruby">{amount}</div>;
}
