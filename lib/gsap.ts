"use client";

declare global {
  interface Window {
    gsap: {
      registerPlugin: (...args: unknown[]) => void;
      context: (callback: () => void, scope?: Element | null) => { revert: () => void };
      timeline: (vars: Record<string, unknown>) => {
        to: (target: unknown, vars: Record<string, unknown>, position?: number) => unknown;
      };
      fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown;
      ticker: {
        add: (cb: (time: number) => void) => void;
        remove: (cb: (time: number) => void) => void;
        lagSmoothing: (threshold: number) => void;
      };
    };
    ScrollTrigger: {
      update: () => void;
      getAll: () => Array<{ kill: () => void }>;
    };
  }
}

let pluginRegistered = false;

export const setupGSAP = () => {
  if (!pluginRegistered && typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    pluginRegistered = true;
  }

  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger };
};
