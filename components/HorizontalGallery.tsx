"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const desserts = [
  {
    title: "Velvet Cacao",
    description: "Mousse de chocolate 70%, avellana caramelizada y espejo de cacao tibio.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Berry Silk",
    description: "Biscuit de almendra, ganache montée de vainilla y coulis rojo brillante.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Noisette Opera",
    description: "Capas finas de praliné, café suave y crema ligera de mantequilla tostada.",
    image:
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Golden Citrus",
    description: "Yuzu curd, merengue suizo bronceado y sablé crujiente con sal marina.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-56%"]);

  return (
    <section ref={sectionRef} className="relative bg-[#0E0B09] py-20 text-[#F8F3EC] md:h-[300vh] md:py-0">
      <div className="mx-auto mb-10 max-w-6xl px-6 md:mb-0 md:px-10 md:pt-24">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c6a77f]">The Showcase</p>
        <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display-serif)] text-4xl leading-tight md:text-6xl">
          Un desfile de piezas diseñadas para moverse contigo.
        </h2>
      </div>

      <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-10 will-change-transform">
          {desserts.map((item) => (
            <article
              key={item.title}
              className="relative h-[72vh] w-[58vw] max-w-[760px] overflow-hidden rounded-[2.25rem] border border-[#c6a77f]/20 bg-[#1f1612]"
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-8">
                <h3 className="font-[family-name:var(--font-display-serif)] text-3xl">{item.title}</h3>
                <p className="mt-3 max-w-lg text-[#f5ebdf]/85">{item.description}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {desserts.map((item) => (
            <article
              key={item.title}
              className="relative h-[65vh] min-w-[82vw] snap-center overflow-hidden rounded-[2rem] border border-[#c6a77f]/25"
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-6">
                <h3 className="font-[family-name:var(--font-display-serif)] text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-[#f5ebdf]/90">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
