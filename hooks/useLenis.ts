'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { createLenis } from '@/lib/lenis';

export const useLenis = () => {
  useEffect(() => {
    const lenis = createLenis();
    lenis.on('scroll', () => ScrollTrigger.update());

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('load', refresh);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);
};
