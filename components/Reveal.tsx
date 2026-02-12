"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y: 40, clipPath: "inset(0% 0% 100% 0% round 1.5rem)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
