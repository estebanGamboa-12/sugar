"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

type Ingredient = {
  emoji: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
};

const ingredients: Ingredient[] = [
  { emoji: "🍓", left: "8%", top: "25%", duration: 3.2, delay: 0 },
  { emoji: "🍫", left: "20%", top: "58%", duration: 3.6, delay: 0.3 },
  { emoji: "🍓", left: "80%", top: "30%", duration: 3.9, delay: 0.8 },
  { emoji: "🍦", left: "68%", top: "62%", duration: 4.4, delay: 0.2 },
  { emoji: "🍫", left: "86%", top: "50%", duration: 4.1, delay: 1 },
  { emoji: "🍦", left: "13%", top: "72%", duration: 3.7, delay: 0.5 },
];

type ProductCard = {
  title: string;
  description: string;
  accent: string;
  dark?: boolean;
};

const productCards: ProductCard[] = [
  {
    title: "Velvet Gold",
    description: "Bizcocho de vainilla de Madagascar, mousse de azafrán y hoja de oro.",
    accent: "from-[#fff4e5] to-[#ffe4f1]",
  },
  {
    title: "Noir Cacao 78%",
    description: "Ganache de origen único y praliné de avellana Piamonte.",
    accent: "from-[#2e1a13] to-[#583227]",
    dark: true,
  },
  {
    title: "Rose Cloud",
    description: "Crema chantilly de rosa, frambuesa fresca y vainilla Tahití.",
    accent: "from-[#ffe6ef] to-[#ffd4ea]",
  },
  {
    title: "Pistacho Imperial",
    description: "Pasta de pistacho siciliano y namelaka blanca al cardamomo.",
    accent: "from-[#eef6df] to-[#e2f4c7]",
  },
];

function AnimatedLetter({
  letter,
  index,
  smoothProgress,
}: {
  letter: string;
  index: number;
  smoothProgress: MotionValue<number>;
}) {
  const start = Math.min(0.12 + index * 0.03, 0.35);
  const end = Math.min(start + 0.25, 0.95);
  const spacing = useTransform(smoothProgress, [start, end], ["0em", "0.15em"]);
  const scale = useTransform(smoothProgress, [start, end], [1, 0.86]);

  return (
    <motion.span className="inline-block" style={{ letterSpacing: spacing, scale }}>
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}

function IngredientParticle({
  ingredient,
  smoothVelocity,
}: {
  ingredient: Ingredient;
  smoothVelocity: MotionValue<number>;
}) {
  const boost = useTransform(smoothVelocity, [-2500, 0, 2500], [-40, 0, -120]);

  return (
    <motion.span
      className="pointer-events-none absolute text-4xl md:text-5xl"
      style={{ left: ingredient.left, top: ingredient.top, y: boost }}
      animate={{ y: [0, -40, 0] }}
      transition={{ repeat: Infinity, ease: "easeInOut", duration: ingredient.duration, delay: ingredient.delay }}
    >
      {ingredient.emoji}
    </motion.span>
  );
}

function MainProduct3D({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glintX = useMotionValue(-140);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  const scrollLift = useTransform(scrollProgress, [0, 1], [0, -80]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (offsetX - centerX) / centerX;
    const percentY = (offsetY - centerY) / centerY;

    rotateX.set(percentY * -10);
    rotateY.set(percentX * 14);
    parallaxX.set(percentX * -18);
    parallaxY.set(percentY * -18);
    glintX.set((offsetX / rect.width) * 200 - 50);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    parallaxX.set(0);
    parallaxY.set(0);
    glintX.set(-140);
  };

  return (
    <motion.div
      ref={frameRef}
      className="relative mx-auto w-[min(88vw,520px)] rounded-[2.4rem] border border-white/70 bg-white/45 p-5 shadow-[0_30px_80px_rgba(141,87,112,0.2)] backdrop-blur-md"
      style={{ perspective: 1200, rotateX, rotateY, y: scrollLift }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="relative overflow-hidden rounded-[2rem]">
        <motion.img
          src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1400&q=80"
          alt="Pastel premium de Sugar Lab"
          className="h-[560px] w-full object-cover"
          style={{ x: parallaxX, y: parallaxY, scale: 1.1 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-white/0 via-white/70 to-white/0 mix-blend-screen"
          style={{ x: `${glintX}%`, skewX: -24 }}
        />
      </div>
    </motion.div>
  );
}

function MagneticCard({
  title,
  description,
  accent,
  dark,
}: {
  title: string;
  description: string;
  accent: string;
  dark?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance > 50) {
      rotateX.set(0);
      rotateY.set(0);
      return;
    }

    rotateX.set((-dy / 50) * 8);
    rotateY.set((dx / 50) * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl border border-white/70 bg-gradient-to-br ${accent} p-6 shadow-xl ${
        dark ? "text-white" : "text-[#382628]"
      }`}
      style={{ perspective: 1200, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <h3 className="text-2xl font-black tracking-tight">{title}</h3>
      <p className={`mt-3 text-sm ${dark ? "text-white/85" : "text-[#5f4347]"}`}>{description}</p>
    </motion.div>
  );
}

export default function Page() {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 30 });

  const topColor = useTransform(smoothProgress, [0, 1], ["#fffaf5", "#fdf1f9"]);
  const bottomColor = useTransform(smoothProgress, [0, 1], ["#fce4ec", "#ffe6d7"]);
  const gradient = useMotionTemplate`linear-gradient(170deg, ${topColor} 0%, ${bottomColor} 100%)`;

  const bannerScaleY = useTransform(smoothProgress, [0, 0.06], [1, 0.03]);
  const bannerOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);
  const sloganY = useTransform(smoothProgress, [0, 0.1], [160, 0]);
  const sloganOpacity = useTransform(smoothProgress, [0.01, 0.08], [0, 1]);

  return (
    <motion.main className="min-h-screen text-[#2f1b1f]" style={{ background: gradient }}>
      <section className="relative overflow-hidden px-6 pb-24 pt-10 md:px-14">
        <motion.div
          className="mx-auto max-w-6xl rounded-full border border-[#d9a6bd]/70 bg-white/70 px-8 py-3 text-center text-sm tracking-[0.25em] text-[#7e5263] shadow-lg backdrop-blur-sm"
          style={{ scaleY: bannerScaleY, opacity: bannerOpacity, transformOrigin: "top" }}
        >
          Client: My cousin does it cheaper.
        </motion.div>

        <motion.p
          className="pointer-events-none absolute inset-x-0 top-20 text-center text-4xl font-black uppercase tracking-[0.08em] text-[#5c1f39] md:text-6xl"
          style={{ y: sloganY, opacity: sloganOpacity }}
        >
          Quality is never an accident.
        </motion.p>

        <div className="relative z-10 mx-auto mt-20 max-w-6xl">
          <h1 className="text-center text-[clamp(3rem,11vw,8rem)] font-black leading-none">
            {"SUGAR LAB".split("").map((letter, index) => (
              <AnimatedLetter key={`${letter}-${index}`} letter={letter} index={index} smoothProgress={smoothProgress} />
            ))}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#6d4c57]">
            Pastelería artesanal de ultra-lujo. Diseñamos experiencias comestibles para marcas, bodas y celebraciones
            privadas.
          </p>
        </div>

        <div className="mt-16">
          <MainProduct3D scrollProgress={smoothProgress} />
        </div>

        {ingredients.map((ingredient) => (
          <IngredientParticle
            key={`${ingredient.emoji}-${ingredient.left}-${ingredient.top}`}
            ingredient={ingredient}
            smoothVelocity={smoothVelocity}
          />
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-14">
        <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.15em] text-[#663749]">Bento Luxury Collection</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {productCards.map((card) => (
            <MagneticCard
              key={card.title}
              title={card.title}
              description={card.description}
              accent={card.accent}
              dark={card.dark}
            />
          ))}
        </div>
      </section>
    </motion.main>
  );
}
