"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  rounded?: string;
};

export default function Reveal({ children, className = "", rounded = "1.5rem" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = getGSAP();
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        {
          opacity: 0,
          y: 36,
          scale: 0.99,
          clipPath: isMobile ? `inset(0% 0% 0% 0% round ${rounded})` : `inset(0% 0% 100% 0% round ${rounded})`,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: `inset(0% 0% 0% 0% round ${rounded})`,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [rounded]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
