"use client";

import { ReactNode, useEffect } from "react";
import { getGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    Lenis: new (options: Record<string, unknown>) => {
      on: (event: "scroll", callback: () => void) => void;
      off: (event: "scroll", callback: () => void) => void;
      raf: (time: number) => void;
      destroy: () => void;
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

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    const refresh = () => ScrollTrigger.refresh();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
