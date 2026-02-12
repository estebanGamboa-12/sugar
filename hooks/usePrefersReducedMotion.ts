'use client';

import { useEffect, useState } from 'react';

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    setMotion();
    mediaQuery.addEventListener('change', setMotion);
    return () => mediaQuery.removeEventListener('change', setMotion);
  }, []);

  return prefersReducedMotion;
};
