'use client';

import type React from 'react';
import { useEffect } from 'react';

export const useSplitText = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const text = element.textContent || '';
    const words = text.split(/\s+/);
    element.innerHTML = words
      .map(
        (word) =>
          `<span class="split-word"><span class="split-word-inner">${word.replace(/</g, '&lt;')}</span></span>`
      )
      .join(' ');
  }, [ref]);
};
