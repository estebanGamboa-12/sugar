"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.78]);

  return (
    <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=2200&q=80')",
        }}
      />

      <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-black" />

      <motion.div style={{ scale: titleScale, opacity: titleOpacity, y: titleY }} className="relative px-6 text-center">
        <p className="text-xs uppercase tracking-[0.44em] text-[#d9b58a]">The Sugar Lab</p>
        <h1 className="mt-5 font-[family-name:var(--font-display-serif)] text-[14.5vw] leading-[0.9] tracking-[0.06em] text-[#fff5ea] md:text-[10vw]">
          ALCHEMY &amp; SUGAR
        </h1>
      </motion.div>
    </section>
  );
}
