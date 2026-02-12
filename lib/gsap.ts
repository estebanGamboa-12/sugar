"use client";

type GSAPTimeline = {
  to: (target: unknown, vars?: Record<string, unknown>, position?: string | number) => GSAPTimeline;
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: string | number,
  ) => GSAPTimeline;
  addLabel: (label: string, position?: string | number) => GSAPTimeline;
  add: (callback: () => void, position?: string | number) => GSAPTimeline;
};

type ScrollTriggerInstance = {
  isActive: boolean;
  progress: number;
  start: number;
  end: number;
  kill: () => void;
};

type GSAPWindow = {
  registerPlugin: (...plugin: unknown[]) => void;
  ticker: {
    add: (callback: (time: number) => void) => void;
    remove: (callback: (time: number) => void) => void;
    lagSmoothing: (threshold: number, adjustedLag?: number) => void;
  };
  utils: { toArray: (selector: string) => Element[]; snap: (increment: number) => (value: number) => number };
  context: (fn: () => void | (() => void), scope?: unknown) => { revert: () => void };
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  timeline: (vars?: Record<string, unknown>) => GSAPTimeline;
  quickTo: (target: Element, prop: string, vars: Record<string, unknown>) => (value: number) => void;
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: string | number,
  ) => GSAPTimeline;
  to: (target: unknown, vars: Record<string, unknown>) => void;
};

type ScrollTriggerWindow = {
  update: () => void;
  refresh: () => void;
  create: (vars: Record<string, unknown>) => ScrollTriggerInstance;
  addEventListener: (event: "scrollEnd", callback: () => void) => void;
  removeEventListener: (event: "scrollEnd", callback: () => void) => void;
};

declare global {
  interface Window {
    gsap: GSAPWindow;
    ScrollTrigger: ScrollTriggerWindow;
  }
}

let pluginRegistered = false;

export function getGSAP() {
  if (!window.gsap || !window.ScrollTrigger) {
    throw new Error("GSAP/ScrollTrigger no están disponibles en window.");
  }

  if (!pluginRegistered) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    pluginRegistered = true;
  }

  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger };
}

export const setupGSAP = getGSAP;
