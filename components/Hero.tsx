"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";

const heroEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);


  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black text-[#F1F1F1]">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.5, ease: heroEase }}
        style={{ y: imageY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=2200&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-20 flex min-h-screen flex-col justify-between px-5 pb-10 pt-8 md:px-12 md:pb-14">
        <p className="mix-blend-difference text-[10px] uppercase tracking-[0.36em] text-[#F1F1F1]/80 md:text-xs">
          premium digital pâtisserie · motion crafted
        </p>

        <div className="space-y-2">
          <h1 className="max-w-[12ch] text-[clamp(3rem,14vw,14rem)] font-black uppercase tracking-tighter leading-none text-[#F1F1F1]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: reducedMotion ? 0 : "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 1.1, ease: heroEase, delay: 0.15 }}
              >
                IMMERSIVE
              </motion.span>
            </span>

            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: reducedMotion ? 0 : "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 1.1, ease: heroEase, delay: 0.28 }}
              >
                SUGAR LAB
              </motion.span>
            </span>
          </h1>

          <p className="max-w-md text-sm text-[#F1F1F1]/78 md:text-base">
            Scroll-driven storytelling, cinematic textures and interaction physics tuned for an Awwwards-grade first impression.
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <Magnetic strength={38} className="w-fit">
            <button
              data-cursor="hover"
              onClick={() => window.dispatchEvent(new CustomEvent("lenis:scroll-to", { detail: { target: "#carta" } }))}
              className="group relative inline-flex h-14 items-center overflow-hidden rounded-full border border-[#F1F1F1]/35 bg-[#F1F1F1]/10 px-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#F1F1F1] backdrop-blur-md"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#F1F1F1] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Start the Journey</span>
            </button>
          </Magnetic>

          <div className="hidden text-xs uppercase tracking-[0.28em] text-[#F1F1F1]/60 md:block">Scroll ↓</div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.18),transparent_40%),linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />
    </section>
  );
}
