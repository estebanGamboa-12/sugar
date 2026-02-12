"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Ingredient = {
  name: string;
  image: string;
  className: string;
  range: [number, number];
  rotate: [number, number];
};

const ingredients: Ingredient[] = [
  {
    name: "Fresas frescas",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=80",
    className: "left-[8%] top-[18%] w-36 md:w-48",
    range: [120, -120],
    rotate: [-8, 16],
  },
  {
    name: "Vainilla de Madagascar",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80",
    className: "right-[10%] top-[12%] w-32 md:w-44",
    range: [160, -160],
    rotate: [6, -10],
  },
  {
    name: "Harina de fuerza",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
    className: "left-[16%] bottom-[12%] w-40 md:w-56",
    range: [220, -90],
    rotate: [-4, 12],
  },
  {
    name: "Mantequilla noisette",
    image:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80",
    className: "right-[15%] bottom-[14%] w-36 md:w-52",
    range: [180, -140],
    rotate: [10, -12],
  },
];

function IngredientFloat({ item, progress }: { item: Ingredient; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], item.range);
  const rotate = useTransform(progress, [0, 1], item.rotate);

  return (
    <motion.figure
      style={{ y, rotate }}
      className={`absolute ${item.className} overflow-hidden rounded-[2rem] border border-[#d4b897]/45 shadow-[0_24px_50px_rgba(46,29,19,0.2)]`}
    >
      <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
    </motion.figure>
  );
}

export default function ParallaxIngredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.75], [0, 1, 0.35]);
  const textY = useTransform(scrollYProgress, [0.1, 0.45], [80, -30]);

  return (
    <section ref={sectionRef} className="relative min-h-[135vh] overflow-hidden bg-[#FDFBF7] px-6 py-24 text-[#2E1D13] md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(203,167,111,0.2),transparent_42%),radial-gradient(circle_at_78%_76%,rgba(80,46,29,0.18),transparent_38%)]" />

      {ingredients.map((item) => (
        <IngredientFloat key={item.name} item={item} progress={scrollYProgress} />
      ))}

      <motion.div style={{ opacity: textOpacity, y: textY }} className="relative mx-auto mt-[28vh] max-w-3xl text-center">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#7C5A43]">The Ingredients</p>
        <h2 className="mt-6 font-[family-name:var(--font-display-serif)] text-4xl leading-tight md:text-6xl">
          Cada bocado nace de ingredientes nobles, tratados con paciencia y precisión.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#5C4436] md:text-lg">
          Fresas maceradas al vacío, vainilla real infusionada en crema templada y mantequilla avellanada para una textura que se derrite sin pedir permiso.
        </p>
      </motion.div>
    </section>
  );
}
