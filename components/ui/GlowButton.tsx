import type React from 'react';
import clsx from 'clsx';

type GlowButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlowButton({ children, className }: GlowButtonProps) {
  return (
    <button
      className={clsx(
        'sheen-button group relative overflow-hidden rounded-full border border-ruby/60 px-8 py-3 text-sm tracking-[0.22em] uppercase text-cream shadow-glow transition hover:-translate-y-1 hover:border-ruby focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-noir',
        className
      )}
      type="button"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
