'use client';

type GsapContext = {
  revert: () => void;
};

export type ScrollTrigger = {
  kill: () => void;
};

const triggers: ScrollTrigger[] = [];

export const ScrollTrigger = {
  refresh: () => undefined,
  update: () => undefined,
  getAll: (): ScrollTrigger[] => triggers
};

export const gsap = {
  registerPlugin: (...plugins: unknown[]) => void plugins,
  context: (callback: () => void): GsapContext => {
    callback();
    return {
      revert: () => undefined
    };
  },
  fromTo: (...args: unknown[]) => void args
};

gsap.registerPlugin(ScrollTrigger);

export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
