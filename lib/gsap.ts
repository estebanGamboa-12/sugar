'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
};
