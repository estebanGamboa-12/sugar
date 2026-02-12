"use client";

import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { setupGSAP } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  y = 36,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || reducedMotion) return;
    const { gsap } = setupGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          clipPath: "inset(0% 0% 100% 0% round 24px)",
          y,
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, once, reducedMotion, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
