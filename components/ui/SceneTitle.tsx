import type React from 'react';
export function SceneTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-4xl leading-tight md:text-6xl">{children}</h2>;
}
