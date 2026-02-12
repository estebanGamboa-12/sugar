"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const revealEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export default function TextReveal({ children, className, delay = 0, once = true }: TextRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: reducedMotion ? "0%" : "100%", rotate: reducedMotion ? 0 : 3 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once, amount: 0.75 }}
        transition={{ duration: 1.05, delay, ease: revealEase }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
