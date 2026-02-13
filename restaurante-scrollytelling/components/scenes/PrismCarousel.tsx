"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TEAM } from "../../data/team";

const SLIDES = TEAM;

const prismWipe = {
  initial: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
  animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  exit: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
};

export default function PrismCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-prism
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#faf8f5]"
    >
      <div
        ref={containerRef}
        className="relative h-full w-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={prismWipe}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 2 }}
          >
            <div
              data-prism-slide
              data-index={activeIndex}
              className="flex h-full w-full items-center justify-center"
            >
              <div className="flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:gap-16">
                <div className="relative h-[50vh] w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl md:h-[60vh]">
                <img
                  src={SLIDES[activeIndex].imageUrl}
                  alt={SLIDES[activeIndex].name}
                  className="h-full w-full object-cover"
                />
                </div>
                <div className="text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.4em] text-[#0a0a0a]/50">
                  {SLIDES[activeIndex].role}
                </p>
                <h2 className="mt-2 font-serif text-4xl font-semibold text-[#0a0a0a] md:text-5xl">
                  {SLIDES[activeIndex].name}
                </h2>
                <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-[#0a0a0a]/70">
                  {SLIDES[activeIndex].caption}
                </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute left-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "h-2 w-8 bg-[#0a0a0a]" : "bg-[#0a0a0a]/30"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setActiveIndex((i) => (i + 1) % SLIDES.length)}
        className="absolute right-8 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-transparent text-[#0a0a0a] transition hover:bg-[#0a0a0a] hover:text-[#faf8f5]"
        aria-label="Siguiente slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
