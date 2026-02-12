"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

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

const easing = [0.22, 1, 0.36, 1];

export default function MenuTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = chapters[activeIndex];

  const chapterNumber = useMemo(() => String(activeIndex + 1).padStart(2, "0"), [activeIndex]);

  return (
    <section id="carta" className="relative px-5 py-20 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <nav className="mb-10 border-b border-cocoa/20 pb-4 md:mb-14">
          <ul className="flex flex-wrap gap-x-7 gap-y-4">
            {chapters.map((chapter, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative pb-2 text-xs uppercase tracking-[0.2em] text-cocoa/70 transition-colors hover:text-cocoa"
                  >
                    <span className={isActive ? "font-semibold text-cocoa" : ""}>{chapter.category}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-cocoa"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.08, delayChildren: 0.12, ease: easing as [number, number, number, number] },
                },
              }}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="text-xs uppercase tracking-[0.26em] text-cocoa/55"
              >
                Capítulo {chapterNumber}
              </motion.p>

              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-4 font-[family-name:var(--font-display-serif)] text-[clamp(2.5rem,6vw,5.4rem)] uppercase leading-[0.88] text-cocoa"
              >
                {active.category}
              </motion.h2>

              <motion.h3
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-5 text-2xl font-medium leading-tight text-cocoa md:text-3xl"
              >
                {active.name}
              </motion.h3>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-4 max-w-md text-pretty text-cocoa/70"
              >
                {active.description}
              </motion.p>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-6 text-sm tracking-[0.14em] text-cocoa/80"
              >
                {active.price}
              </motion.p>
            </motion.article>
          </AnimatePresence>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.image}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.85 }}
                animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0.85 }}
                transition={{ duration: 0.85, ease: easing as [number, number, number, number] }}
                className="relative ml-auto aspect-[3/4] w-full overflow-hidden rounded-2xl lg:max-h-[76vh]"
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
