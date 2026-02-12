"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const labShots = [
  {
    title: "Mise en Place",
    description: "Pesajes exactos, termómetro digital y masa madre activa en reposo controlado.",
    image:
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cacao Temperado",
    description: "Curva térmica perfecta para lograr brillo espejo y snap nítido en cada tableta.",
    image:
      "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Sketch & Structure",
    description: "Bocetos de volumen, capas aromáticas y geometría de emplatado al milímetro.",
    image:
      "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Final Glaze",
    description: "Último acabado: glaseado espejo, microbrotes y texturas que despiertan el paladar.",
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Signature Finish",
    description: "Capas aireadas, frutas frescas y detalles finales para una vitrina irresistible.",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <section ref={sectionRef} className="relative bg-[#0b0908] py-20 text-[#f8f3ec] md:h-[360vh] md:py-0">
      <div className="mx-auto mb-10 max-w-6xl px-6 md:mb-0 md:px-10 md:pt-24">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c6a77f]">The Lab</p>
        <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display-serif)] text-4xl leading-tight md:text-6xl">
          Del concepto al bocado: un proceso vivo que se desplaza contigo.
        </h2>
      </div>

      <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-10 will-change-transform">
          {labShots.map((item) => (
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
          {labShots.map((item) => (
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
