"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const mainCakeImage = "https://placehold.co/1100x1400/2b1f1a/f6ead8?text=The+Signature+Cake";
const textureImage = "https://placehold.co/1200x1200/f4ddc2/e8b98a?text=Textura+Macro";

type Ingredient = {
  name: string;
  image: string;
  xRange: [number, number];
  yRange: [number, number];
  rotateRange: [number, number];
};

const floatingIngredients: Ingredient[] = [
  {
    name: "Fresas",
    image: "https://placehold.co/260x260/e64f5b/ffffff?text=FRESA",
    xRange: [-280, -30],
    yRange: [-220, -60],
    rotateRange: [-18, 8],
  },
  {
    name: "Chocolate",
    image: "https://placehold.co/280x220/3f2418/f9e7d2?text=CHOC",
    xRange: [300, 40],
    yRange: [-180, -20],
    rotateRange: [16, -6],
  },
  {
    name: "Harina",
    image: "https://placehold.co/240x220/f7f0df/8b7a61?text=HARINA",
    xRange: [-320, -40],
    yRange: [220, 50],
    rotateRange: [-24, 6],
  },
  {
    name: "Vainilla",
    image: "https://placehold.co/250x180/d7bf9c/3a2d21?text=VAINILLA",
    xRange: [280, 30],
    yRange: [220, 70],
    rotateRange: [22, -4],
  },
];

function IngredientParticle({ ingredient, progress, opacity }: { ingredient: Ingredient; progress: MotionValue<number>; opacity: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ingredient.xRange);
  const y = useTransform(progress, [0, 1], ingredient.yRange);
  const rotate = useTransform(progress, [0, 1], ingredient.rotateRange);

  return (
    <motion.img
      src={ingredient.image}
      alt={ingredient.name}
      style={{ x, y, rotate, opacity }}
      className="pointer-events-none absolute z-20 h-24 w-24 rounded-full border border-white/20 object-cover shadow-[0_20px_45px_rgba(0,0,0,0.35)] md:h-28 md:w-28"
    />
  );
}

export default function CakeStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const stageOneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.26], [1, 1, 0]);
  const stageOneScale = useTransform(scrollYProgress, [0, 0.25], [1, 50]);

  const cakeIntroOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.5], [0, 1, 0.95]);
  const cakeIntroScale = useTransform(scrollYProgress, [0.25, 0.5], [0.5, 1]);

  const stageThreeScale = useTransform(scrollYProgress, [0.5, 0.75], [1, 3]);
  const textureOpacity = useTransform(scrollYProgress, [0.55, 0.7, 0.78], [0, 1, 0]);
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], ["#030303", "#030303", "#f5ddbe", "#f5ddbe"]);

  const finalCakeX = useTransform(scrollYProgress, [0.75, 1], [0, 280]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.75, 0.88, 1], [0, 1, 1]);
  const finalTextX = useTransform(scrollYProgress, [0.75, 0.94], [-80, 0]);

  const ingredientProgress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const ingredientOpacity = useTransform(scrollYProgress, [0.22, 0.3, 0.5, 0.58], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[400vh]" aria-label="Historia interactiva de The Signature Cake">
      <motion.div style={{ backgroundColor }} className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full items-center justify-center px-6 md:px-12">
          <motion.h2
            style={{ opacity: stageOneOpacity, scale: stageOneScale }}
            className="pointer-events-none absolute text-center text-[clamp(2.25rem,11vw,11rem)] font-semibold uppercase tracking-[0.12em] text-white"
          >
            LA OBRA MAESTRA
          </motion.h2>

          <motion.div style={{ opacity: cakeIntroOpacity, scale: cakeIntroScale, x: finalCakeX }} className="relative z-10 h-[68vh] w-[min(88vw,540px)]">
            <motion.img
              src={mainCakeImage}
              alt="The Signature Cake"
              style={{ scale: stageThreeScale }}
              className="h-full w-full rounded-[2rem] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            />

            <motion.img
              src={textureImage}
              alt="Textura macro de la crema"
              style={{ opacity: textureOpacity }}
              className="absolute inset-0 h-full w-full rounded-[2rem] object-cover"
            />
          </motion.div>

          {floatingIngredients.map((ingredient) => (
            <IngredientParticle key={ingredient.name} ingredient={ingredient} progress={ingredientProgress} opacity={ingredientOpacity} />
          ))}

          <motion.div style={{ opacity: finalTextOpacity, x: finalTextX }} className="absolute left-8 z-30 max-w-md md:left-16">
            <p className="text-xs uppercase tracking-[0.24em] text-black/60">The Signature Cake</p>
            <h3 className="mt-4 text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-tight text-black">El deseo toma forma.</h3>
            <p className="mt-4 max-w-sm text-sm text-black/70 md:text-base">
              Crocante, crema sedosa y notas de vainilla tostada. Tu mesa, tu momento, tu ritmo.
            </p>
            <button className="mt-8 rounded-full bg-black px-7 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black/80">
              RESERVAR AHORA
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
