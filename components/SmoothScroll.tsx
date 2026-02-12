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

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !window.Lenis || !window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const lenis = new window.Lenis({
      autoRaf: false,
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
