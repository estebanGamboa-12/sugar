"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Hero from "./components/Hero";

const cards = [
  {
    title: "Direction",
    description: "Concept + Art Direction for campaigns that demand attention.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Realtime",
    description: "WebGL-ready visuals, shader experiments, and immersive interactions.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Narrative",
    description: "Scroll stories blending editorial typography and cinematic reveals.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
  },
];

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 25, stiffness: 280 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 280 });

  const size = isHovering ? 86 : 26;
  const cursorX = useMotionTemplate`${smoothX}px`;
  const cursorY = useMotionTemplate`${smoothY}px`;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-white mix-blend-difference md:block"
        style={{
          width: size,
          height: size,
          translateX: cursorX,
          translateY: cursorY,
          x: `-${size / 2}px`,
          y: `-${size / 2}px`,
        }}
        transition={{ type: "spring", damping: 24, stiffness: 240 }}
      />

      <div
        className="contents"
        onPointerMove={(event) => {
          x.set(event.clientX);
          y.set(event.clientY);
        }}
        onPointerOver={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("[data-magnetic='true']")) {
            setIsHovering(true);
          }
        }}
        onPointerOut={(event) => {
          const relatedTarget = event.relatedTarget as HTMLElement | null;
          if (!relatedTarget?.closest("[data-magnetic='true']")) {
            setIsHovering(false);
          }
        }}
      />
    </>
  );
}

function BentoCard({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[1.5rem] bg-[#0f0f0f] p-6 ${className ?? ""}`}
      initial={{ clipPath: "inset(24% 0 0 0 round 1.5rem)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 1.5rem)", opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <p className="font-syncopate text-xs uppercase tracking-[0.25em] text-white/60">Studio Module</p>
        <h3 className="mt-3 font-syncopate text-2xl uppercase text-white">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/80">{description}</p>
      </div>
    </motion.article>
  );
}

export default function Page() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <main className="cursor-none bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Hero />

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-24 md:grid-cols-12 md:grid-rows-2 md:px-12">
        <BentoCard
          title={cards[0].title}
          description={cards[0].description}
          image={cards[0].image}
          className="md:col-span-7 md:row-span-2 min-h-[420px]"
        />
        <BentoCard
          title={cards[1].title}
          description={cards[1].description}
          image={cards[1].image}
          className="md:col-span-5 min-h-[200px]"
        />
        <BentoCard
          title={cards[2].title}
          description={cards[2].description}
          image={cards[2].image}
          className="md:col-span-5 min-h-[200px]"
        />
      </section>

      <section className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-6 pb-24 md:flex-row md:items-end md:px-12">
        <motion.h2
          className="font-syncopate text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-15%" }}
        >
          Crafted for 
          <br />
          Awwwards Energy
        </motion.h2>

        <motion.a
          ref={linkRef}
          href="#"
          data-magnetic="true"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.26em]"
          whileHover={{ x: 8 }}
          whileTap={{ scale: 0.96 }}
        >
          Start a project ↗
        </motion.a>
      </section>
    </main>
  );
}
