"use client";

type GSAPTimeline = {
  to: (target: unknown, vars?: Record<string, unknown>, position?: string | number) => GSAPTimeline;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>, position?: string | number) => GSAPTimeline;
  addLabel: (label: string, position?: string | number) => GSAPTimeline;
  add: (callback: () => void, position?: string | number) => GSAPTimeline;
};

type ScrollTriggerInstance = {
  isActive: boolean;
  progress: number;
  start: number;
  end: number;
  getVelocity: () => number;
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
  to: (target: unknown, vars: Record<string, unknown>) => void;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>, position?: string | number) => GSAPTimeline;
};

type ScrollTriggerWindow = {
  update: () => void;
  refresh: () => void;
  create: (vars: Record<string, unknown>) => ScrollTriggerInstance;
};

type FlipWindow = {
  getState: (target: Element | Element[] | NodeListOf<Element>) => unknown;
  from: (state: unknown, vars: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    gsap: GSAPWindow;
    ScrollTrigger: ScrollTriggerWindow;
    Flip: FlipWindow;
  }
}

let pluginRegistered = false;

export function getGSAP() {
  if (!window.gsap || !window.ScrollTrigger || !window.Flip) {
    throw new Error("GSAP/ScrollTrigger/Flip no están disponibles en window.");
  }

  if (!pluginRegistered) {
    window.gsap.registerPlugin(window.ScrollTrigger, window.Flip);
    pluginRegistered = true;
  }

  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger, Flip: window.Flip };
}

export const setupGSAP = getGSAP;
