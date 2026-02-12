"use client";

import { ReactNode, useEffect } from "react";
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

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { ScrollTrigger } = setupGSAP();

    const lenis = new window.Lenis({
      duration: reducedMotion ? 0 : 1.5,
      lerp: reducedMotion ? 1 : 0.08,
      smoothWheel: !reducedMotion,
      smoothTouch: !reducedMotion,
      touchMultiplier: 1.08,
      wheelMultiplier: 0.88,
      infinite: false,
      autoRaf: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    window.__lenis = lenis;

    const syncScroll = () => ScrollTrigger.update();
    lenis.on("scroll", syncScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const onAnchorRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string }>;
      const selector = customEvent.detail?.target;
      if (!selector) return;
      const target = document.querySelector(selector);
      if (target) lenis.scrollTo(target, { duration: reducedMotion ? 0 : 1.3 });
    };

    window.addEventListener("lenis:scroll-to", onAnchorRequest as EventListener);

    return () => {
      window.removeEventListener("lenis:scroll-to", onAnchorRequest as EventListener);
      lenis.off("scroll", syncScroll);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
