"use client";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

let registered = false;

export function getGSAP() {
  if (!window.gsap || !window.ScrollTrigger) {
    throw new Error("GSAP no está disponible en window.");
  }

  if (!registered) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    registered = true;
  }

  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger };
}

export const setupGSAP = getGSAP;
