"use client";

import { ReactNode, useEffect } from "react";

declare global {
  interface Window {
    Lenis?: new (options?: Record<string, unknown>) => {
      raf: (time: number) => void;
      on: (event: string, cb: () => void) => void;
      scrollTo: (value: number, options?: { immediate?: boolean }) => void;
      destroy: () => void;
      scroll: number;
    };
    gsap?: {
      registerPlugin: (plugin: unknown) => void;
      timeline: (vars: Record<string, unknown>) => {
        to: (target: unknown, vars: Record<string, unknown>, position?: number) => unknown;
        kill: () => void;
      };
    };
    ScrollTrigger?: {
      update: () => void;
      refresh: () => void;
      getAll: () => Array<{ kill: () => void }>;
      scrollerProxy: (target: Element | string, vars: Record<string, unknown>) => void;
    };
  }
}

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) {
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    const lenis = new window.Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.2,
      lerp: 0.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      window.ScrollTrigger?.update();
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", () => window.ScrollTrigger?.update());

    window.ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    window.ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
