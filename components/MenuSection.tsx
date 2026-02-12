"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MenuItem, { type MenuEntry } from "@/components/MenuItem";

const premiumEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

const menuItems: MenuEntry[] = [
  {
    id: "immersive-branding",
    category: "Brand Experience",
    title: "Immersive Branding System",
    description: "Dirección creativa líquida con motion language, guidelines interactivos y storytelling para campañas premium.",
    price: "Desde €4.800",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "mobile-commerce",
    category: "Mobile Commerce",
    title: "Mobile-First Commerce Flow",
    description: "Arquitectura UX enfocada en conversión con microinteracciones hápticas y transiciones de alta fidelidad.",
    price: "Desde €3.900",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "launch-content",
    category: "Content + Motion",
    title: "Launch Content Engine",
    description: "Sistema modular para lanzar piezas visuales, reels y assets web con una misma gramática cinemática.",
    price: "Desde €2.950",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "retainer",
    category: "Creative Retainer",
    title: "Awwwards Growth Retainer",
    description: "Acompañamiento mensual para optimizar performance visual, iterar UI y elevar la percepción de marca.",
    price: "€1.750 / mes",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuItems[0].id);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <section
      id="menu-section"
      className="relative overflow-hidden bg-[#080808] px-5 py-20 md:px-10 md:py-28"
      onPointerMove={(event) => {
        const { clientX, clientY, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        setPointer({ x, y });
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.08),transparent_52%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="mb-3 text-xs uppercase tracking-[0.3em] text-white/55"
        >
          Carta / Menú
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.95, ease: premiumEase }}
          className="max-w-3xl text-[clamp(2rem,6vw,4.6rem)] font-semibold leading-[0.92] tracking-tight"
        >
          Servicios con presencia líquida y animación editorial.
        </motion.h2>

        <motion.div
          className="mt-12"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              isActive={activeId === item.id}
              pointer={pointer}
              onActivate={setActiveId}
            />
          ))}

          <motion.span
            aria-hidden
            className="mt-2 block h-px w-full origin-left bg-white/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.9, ease: premiumEase }}
          />
        </motion.div>
      </div>
    </section>
  );
}
