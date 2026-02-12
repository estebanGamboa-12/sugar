"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HorizontalGallery from "@/components/HorizontalGallery";
import ParallaxIngredients from "@/components/ParallaxIngredients";

const craftPanels = [
  {
    title: "Fermentación y calma",
    text: "Cada masa descansa con tiempos medidos para construir capas de sabor profundas y un crujido frágil.",
  },
  {
    title: "Precisión térmica",
    text: "Temperaturas controladas al grado para preservar aroma, brillo y estructura en cada crema.",
  },
  {
    title: "Acabado de autor",
    text: "El emplatado final es quirúrgico: brillo, altura y contraste para un impacto sensorial total.",
  },
];

export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  return (
    <main className="overflow-x-clip bg-[#120d0a] text-[#F6EFE7]">
      <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-pouring-melted-chocolate-1579/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/35" />
        <motion.h1
          style={{ y: heroY }}
          className="relative px-4 text-center font-[family-name:var(--font-display-serif)] text-[16vw] uppercase leading-none tracking-[0.08em] mix-blend-difference md:text-[11vw]"
        >
          Artisan Pastry
        </motion.h1>
      </section>

      <ParallaxIngredients />
      <HorizontalGallery />

      <section className="relative min-h-[210vh] bg-[#1A120D]">
        <div
          className="sticky top-0 h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18,13,10,0.35), rgba(18,13,10,0.45)), url('https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="relative z-10 -mt-[180vh] space-y-24 px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#cfaf84]">The Craft</p>
            <h2 className="mt-6 font-[family-name:var(--font-display-serif)] text-4xl md:text-6xl">Técnica visible, emoción inevitable.</h2>
          </div>

          {craftPanels.map((panel, index) => (
            <motion.article
              key={panel.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="mx-auto max-w-3xl rounded-[2rem] border border-[#c6a77f]/30 bg-[#f8f1e7] p-8 text-[#2e1d13] shadow-[0_28px_50px_rgba(0,0,0,0.35)] md:p-12"
            >
              <h3 className="font-[family-name:var(--font-display-serif)] text-3xl md:text-4xl">{panel.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#5A4233] md:text-lg">{panel.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
