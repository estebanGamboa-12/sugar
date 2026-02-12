"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

const heroImages = [
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1400&q=80",
];

export default function HeroZoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        {
          scale: 0.76,
          borderRadius: "2rem",
          clipPath: "inset(12% 10% 10% 10% round 2rem)",
        },
        {
          scale: 1,
          borderRadius: "0rem",
          clipPath: "inset(0% 0% 0% 0% round 0rem)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={frameRef} className="absolute inset-0">
        <div className="grid h-full grid-cols-12 gap-3 p-4 md:p-6">
          <div className="relative col-span-8 overflow-hidden rounded-3xl border border-white/10">
            <Image src={heroImages[0]} alt="Postre de autor" fill className="object-cover" priority sizes="66vw" />
          </div>
          <div className="col-span-4 grid gap-3">
            {heroImages.slice(1).map((src) => (
              <div key={src} className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image src={src} alt="Detalle gastronómico" fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-6 pb-20 pt-10 md:px-12 md:pb-28">
        <motion.h1
          style={{ y: titleY }}
          className="max-w-6xl text-[clamp(2.8rem,11vw,10rem)] font-[700] uppercase leading-[0.88] tracking-tight"
        >
          Pastelería editorial para noches memorables.
        </motion.h1>
        <motion.p style={{ y: subtitleY }} className="max-w-xl text-sm text-white/75 md:text-base">
          Atelier Sucre combina técnica francesa y producto local en una experiencia íntima, táctil y sensorial.
        </motion.p>
      </div>
    </section>
  );
}
