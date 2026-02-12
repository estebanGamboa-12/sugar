"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  rounded?: string;
  from?: "bottom" | "left" | "right";
};

export default function Reveal({ children, className = "", rounded = "1.5rem", from = "bottom" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = getGSAP();
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const fromVars =
      from === "left"
        ? { x: -36, clipPath: `inset(0% 0% 0% 100% round ${rounded})` }
        : from === "right"
          ? { x: 36, clipPath: `inset(0% 100% 0% 0% round ${rounded})` }
          : {
              y: 34,
              clipPath: isMobile ? `inset(0% 0% 0% 0% round ${rounded})` : `inset(0% 0% 100% 0% round ${rounded})`,
            };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        {
          opacity: 0,
          scale: 0.985,
          ...fromVars,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: `inset(0% 0% 0% 0% round ${rounded})`,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 84%",
            invalidateOnRefresh: true,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [rounded, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
