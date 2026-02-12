"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { setupGSAP } from "@/lib/gsap";

const chapters = [
  {
    id: "tartas",
    category: "Tartas",
    name: "Strawberry Cloud Cake",
    description: "Bizcocho vainilla, crema de yogur y fresas brillantes con acabado glaseado.",
    price: "€7.90",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "croissants",
    category: "Croissants",
    name: "Pistachio Butter Croissant",
    description: "Laminado de mantequilla AOP relleno de crema de pistacho tostado.",
    price: "€4.80",
    image:
      "https://images.unsplash.com/photo-1549903072-7e6e14f8cf2d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "cookies",
    category: "Cookies",
    name: "Cookie Triple Chocolate",
    description: "Galleta chewy con chips 70%, cacao holandés y corazón fundente.",
    price: "€3.60",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bebidas",
    category: "Bebidas",
    name: "Iced Rose Matcha Latte",
    description: "Matcha ceremonial con leche cremosa y espuma de rosa suave.",
    price: "€5.50",
    image:
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function MenuChapters() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = chapters[activeIndex];

  const progressHeight = useMemo(() => `${((activeIndex + 1) / chapters.length) * 100}%`, [activeIndex]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !panelRef.current || reducedMotion) return;
    const { gsap } = setupGSAP();

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=620%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self: any) => {
            const nextIndex = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
            setActiveIndex(nextIndex);
          },
        },
      });

      gsap.fromTo(
        panelRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=620%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToCategory = (id: string) => {
    window.dispatchEvent(new CustomEvent("lenis:scroll-to", { detail: { target: `#category-${id}` } }));
  };

  return (
    <section id="carta" ref={sectionRef} className="relative min-h-screen bg-lavender px-5 py-20 md:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div ref={panelRef} className="space-y-8 rounded-[34px] bg-cream/75 p-6 shadow-soft-xl backdrop-blur lg:p-8">
          <div className="sticky top-5 z-20 flex flex-wrap gap-2 rounded-full bg-white/75 p-2 backdrop-blur">
            {chapters.map((chapter, index) => (
              <Magnetic key={chapter.id}>
                <button
                  id={`category-${chapter.id}`}
                  data-cursor="hover"
                  onClick={() => scrollToCategory(chapter.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    activeIndex === index ? "bg-strawberry text-white" : "bg-white text-cocoa/80"
                  }`}
                >
                  {chapter.category}
                </button>
              </Magnetic>
            ))}
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-5 pt-3">
            <div className="relative mt-1 h-40 w-3 rounded-full bg-cocoa/10">
              <span className="absolute bottom-0 left-0 w-full rounded-full bg-strawberry transition-all duration-500" style={{ height: progressHeight }} />
            </div>

            <div className="min-h-[270px]">
              <p className="font-display text-xs uppercase tracking-[0.26em] text-cocoa/60">Capítulo {activeIndex + 1}</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.h2
                    className="mt-3 font-display text-[clamp(2rem,5vw,4.2rem)] uppercase leading-[0.95] text-cocoa"
                    animate={{ letterSpacing: ["0.04em", "0.08em", "0.06em"], y: [4, -2, 0] }}
                    transition={{ duration: 0.7 }}
                  >
                    {active.category}
                  </motion.h2>
                  <h3 className="mt-3 text-2xl font-semibold text-cocoa">{active.name}</h3>
                  <p className="mt-3 max-w-lg text-cocoa/75">{active.description}</p>
                  <p className="mt-5 text-lg font-semibold text-cocoa">{active.price}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal className="rounded-[34px] bg-white/70 p-4 shadow-soft-xl backdrop-blur md:p-6">
          <div ref={mediaRef} className="relative h-[420px] overflow-hidden rounded-[28px] md:h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.image}
                initial={{ opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0"
              >
                <Image src={active.image} alt={active.name} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 90vw" />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
