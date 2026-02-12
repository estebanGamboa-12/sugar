"use client";

import { ReactNode, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  asChild?: boolean;
};

export default function Magnetic({ children, className, strength = 28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = useMemo(
    () => ({
      stiffness: 280,
      damping: 24,
      mass: 0.35,
    }),
    [],
  );

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set((offsetX / rect.width) * strength);
    y.set((offsetY / rect.height) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      transition={{ ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
