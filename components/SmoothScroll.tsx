"use client";

import { useEffect } from "react";
import { setupGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    Lenis: new (options: Record<string, unknown>) => {
      on: (event: "scroll", cb: () => void) => void;
      off: (event: "scroll", cb: () => void) => void;
      raf: (time: number) => void;
      scrollTo: (target: Element | string | number, options?: Record<string, unknown>) => void;
      destroy: () => void;
    };
    __lenis?: {
      scrollTo: (target: Element | string | number, options?: Record<string, unknown>) => void;
    };
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { gsap, ScrollTrigger } = setupGSAP();

    const lenis = new window.Lenis({
      duration: reduced ? 0 : 1.2,
      smoothWheel: !reduced,
      touchMultiplier: 1.1,
      lerp: reduced ? 1 : 0.1,
    });

    window.__lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string }>;
      const selector = customEvent.detail?.target;
      if (!selector) return;
      const el = document.querySelector(selector);
      if (el) lenis.scrollTo(el, { duration: reduced ? 0 : 1.2 });
    };

    window.addEventListener("lenis:scroll-to", onAnchorRequest as EventListener);

    return () => {
      window.removeEventListener("lenis:scroll-to", onAnchorRequest as EventListener);
      gsap.ticker.remove(tick);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
