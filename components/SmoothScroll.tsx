"use client";

import { ReactNode, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    Lenis: new (options: Record<string, unknown>) => {
      on: (event: "scroll", callback: () => void) => void;
      off: (event: "scroll", callback: () => void) => void;
      raf: (time: number) => void;
      scrollTo: (target: number | string | Element, options?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }) => void;
      destroy: () => void;
    };
    __lenis?: {
      scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }) => void;
    };
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const lenis = new window.Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
    });

    const refresh = () => ScrollTrigger.refresh();

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    requestAnimationFrame(() => ScrollTrigger.refresh());

    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
