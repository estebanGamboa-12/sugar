import type React from 'react';
export function EditorialParagraph({ children }: { children: React.ReactNode }) {
  return <p className="max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">{children}</p>;
}
