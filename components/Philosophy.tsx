"use client";

import { MotionValue, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const statements = ["Ciencia precisa.", "Arte comestible.", "Sabor absoluto."];

type PhraseProps = {
  text: string;
  index: number;
  progress: MotionValue<number>;
};

function PhraseLayer({ text, index, progress }: PhraseProps) {
  const start = index / statements.length;
  const peak = Math.min(start + 0.18, 1);
  const end = Math.min(start + 0.34, 1);

  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const blur = useTransform(progress, [start, peak, end], [18, 0, 18]);
  const y = useTransform(progress, [start, peak, end], [50, 0, -40]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.h2
      style={{ opacity, filter, y }}
      className="absolute inset-0 text-center font-[family-name:var(--font-display-serif)] text-[clamp(2.8rem,7vw,7rem)] leading-[0.95]"
    >
      {text}
    </motion.h2>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[170vh] bg-gradient-to-b from-[#f5efe6] via-[#efe7da] to-[#e6ddcd] px-5 text-cocoa md:min-h-[240vh] md:px-10"
    >
      <div className="mx-auto max-w-6xl py-14 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.34em] text-[#8e6f51]">The Philosophy</p>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-cocoa/70 md:text-base">
          Diseñamos cada pieza como una experiencia limpia y elegante: ingredientes nobles, técnica precisa y una estética
          minimalista en cada detalle.
        </p>
      </div>

      <div className="hidden md:block">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative h-44 w-full">
            {statements.map((text, index) => (
              <PhraseLayer key={text} text={text} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-6 pb-20 pt-6 md:hidden">
        {statements.map((text) => (
          <motion.article
            key={text}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.8rem] border border-[#cab79f] bg-[#f9f4ea] px-6 py-9 text-center shadow-soft"
          >
            <h2 className="font-[family-name:var(--font-display-serif)] text-[clamp(2.2rem,11vw,3.2rem)] leading-[0.95] text-[#2f2319]">
              {text}
            </h2>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
