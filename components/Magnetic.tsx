"use client";

import { useRef } from "react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 2;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      data-magnetic="true"
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
