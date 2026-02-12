"use client";

import Image from "next/image";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  progress?: MotionValue<number>;
};

export default function ParallaxImage({ src, alt, className, sizes = "100vw", progress }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const timeline = progress ?? scrollYProgress;
  const y = useTransform(timeline, [0, 1], reducedMotion ? ["0%", "0%"] : ["-15%", "15%"]);
  const scale = useTransform(timeline, [0, 1], reducedMotion ? [1, 1] : [1.15, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale, willChange: "transform" }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
