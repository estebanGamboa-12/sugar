"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import TextReveal from "@/components/TextReveal";

const chapters = [
  {
    id: "tartas",
    category: "Tartas",
    name: "Strawberry Cloud Cake",
    description: "Bizcocho vainilla, crema de yogur y fresas brillantes con acabado glaseado.",
    price: "€7.90",
    image:
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "croissants",
    category: "Croissants",
    name: "Pistachio Butter Croissant",
    description: "Laminado de mantequilla AOP relleno de crema de pistacho tostado.",
    price: "€4.80",
    image:
      "https://plus.unsplash.com/premium_photo-1715015439764-1e8d37d5c6c9?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "cookies",
    category: "Cookies",
    name: "Cookie Triple Chocolate",
    description: "Galleta chewy con chips 70%, cacao holandés y corazón fundente.",
    price: "€3.60",
    image:
      "https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "bebidas",
    category: "Bebidas",
    name: "Iced Rose Matcha Latte",
    description: "Matcha ceremonial con leche cremosa y espuma de rosa suave.",
    price: "€5.50",
    image:
      "https://plus.unsplash.com/premium_photo-1663133737289-448f4954f042?q=80&w=1400&auto=format&fit=crop",
  },
];

const easing: [number, number, number, number] = [0.33, 1, 0.68, 1];

export default function MenuTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = chapters[activeIndex];

  const chapterNumber = useMemo(() => String(activeIndex + 1).padStart(2, "0"), [activeIndex]);
  const editorialOffset = activeIndex % 2 === 0 ? "lg:mt-0" : "lg:mt-12";

  return (
    <section id="carta" className="relative px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <nav className="mb-12 border-b border-cocoa/20 pb-5 md:mb-16">
          <ul className="flex flex-wrap gap-x-8 gap-y-5">
            {chapters.map((chapter, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={chapter.id} className={index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-1"}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative pb-2 text-xs uppercase tracking-[0.24em] text-cocoa/70 transition-colors hover:text-cocoa"
                  >
                    <span className={isActive ? "font-semibold text-cocoa" : ""}>{chapter.category}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-cocoa"
                        transition={{ type: "spring", stiffness: 420, damping: 40 }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.article key={active.id} className={`order-2 lg:order-1 ${editorialOffset}`}>
              <TextReveal className="text-xs uppercase tracking-[0.26em] text-cocoa/55">
                <p>Capítulo {chapterNumber}</p>
              </TextReveal>

              <TextReveal className="mt-4" delay={0.08}>
                <h2 className="font-[family-name:var(--font-display-serif)] text-[clamp(2.8rem,7vw,6rem)] uppercase leading-[0.84] text-cocoa">
                  {active.category}
                </h2>
              </TextReveal>

              <TextReveal className="mt-6" delay={0.14}>
                <h3 className="text-2xl font-medium leading-tight text-cocoa md:text-3xl">{active.name}</h3>
              </TextReveal>

              <TextReveal className="mt-4" delay={0.18}>
                <p className="max-w-sm text-pretty text-cocoa/70">{active.description}</p>
              </TextReveal>

              <TextReveal className="mt-7" delay={0.24}>
                <p className="text-sm tracking-[0.14em] text-cocoa/80">{active.price}</p>
              </TextReveal>
            </motion.article>
          </AnimatePresence>

          <div className="order-1 lg:order-2 lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.image}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 1.1, ease: easing }}
                className="relative ml-auto aspect-[3/4] w-full overflow-hidden rounded-[1.7rem] lg:max-h-[78vh]"
              >
                <ParallaxImage
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
