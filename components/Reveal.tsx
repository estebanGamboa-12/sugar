"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { clipPath: "inset(0% 0% 100% 0% round 1.5rem)", opacity: 0.8, y: 20 },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
