'use client';

import Lenis from 'lenis';

export const createLenis = () =>
  new Lenis({
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2
  });
