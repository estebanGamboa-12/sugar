'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[200] h-1 w-full bg-cream/10">
      <div className="h-full bg-gradient-to-r from-ruby to-steel transition-transform" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
