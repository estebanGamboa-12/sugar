"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";

const menuCategories = [
  {
    name: "Bollería de Autor",
    items: [
      {
        name: "Croissant Isigny",
        price: "3.5€",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
        desc: "Mantequilla DOP, 48h fermentación",
      },
      {
        name: "Pain au Chocolat",
        price: "4.0€",
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
        desc: "Valrhona 70%",
      },
      {
        name: "Cruffin Frambuesa",
        price: "4.8€",
        img: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80",
        desc: "Crema ligera y glaseado cítrico",
      },
    ],
  },
  {
    name: "Tartas & Monoporciones",
    items: [
      {
        name: "Cheesecake de Yuzu",
        price: "6.5€",
        img: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=900&q=80",
        desc: "Base de speculoos, gelée cítrico",
      },
      {
        name: "Royal Chocolate",
        price: "7.0€",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
        desc: "Crujiente de avellana",
      },
      {
        name: "Saint Honoré Pistacho",
        price: "7.8€",
        img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
        desc: "Praliné tostado + chantilly vainilla",
      },
    ],
  },
];

export default function Page() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); 

  return (
    <>
      {/* Contenido principal por encima del footer fijo para reveal */}
      <main className="relative z-10 mb-[66svh] overflow-x-clip rounded-b-[2.4rem] bg-[#120d0a] text-[#f8f1e7] md:mb-[70vh] md:rounded-b-[3rem]">
        <section ref={heroRef} className="relative flex min-h-svh items-center justify-center overflow-hidden">
          {/* Mobile: imagen estática para performance */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1600&q=80"
              alt="Mesa de pastelería artesanal"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Desktop: video inmersivo */}
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            src="https://cdn.coverr.co/videos/coverr-pouring-melted-chocolate-1579/1080p.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/45" />

          <motion.div style={{ y: titleY }} className="relative px-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#e4c7a1]">Nurobi / Sugar Lab</p>
            <h1 className="mt-4 font-[family-name:var(--font-display-serif)] text-[15vw] uppercase leading-none md:text-[11vw]">
              Pâtisserie
            </h1>
          </motion.div>
        </section>

        <section className="px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d6b184]">Historia</p>
              <h2 className="mt-4 font-[family-name:var(--font-display-serif)] text-4xl leading-[0.95] md:text-6xl">
                Laboratorio dulce con alma editorial.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-[#f8f1e7]/80 md:col-span-7 md:text-lg">
              <p>
                Diseñamos una experiencia single-page donde cada bloque cuenta una narrativa sensorial: luz, materia y movimiento.
                Inspirado en la estética premium de estudios Awwwards, pero optimizado para interacción real en móvil.
              </p>
              <p>
                La web combina transición cinemática en desktop y lectura clara en pantallas pequeñas, priorizando accesibilidad táctil,
                tiempos de carga y consistencia visual.
              </p>
            </div>
          </div>
        </section>

        <MenuSection categories={menuCategories} />
      </main>

      <Footer />
    </>
  );
}
