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
  const peak = start + 0.18;
  const end = start + 0.34;

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
    <section ref={sectionRef} className="relative min-h-[185vh] bg-[#050505] px-6 text-[#efe7db] md:min-h-[260vh] md:px-10">
      <div className="mx-auto max-w-6xl py-16 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.34em] text-[#b99772]">The Philosophy</p>
      </div>

      <div className="hidden md:block">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative h-40 w-full">
            {statements.map((text, index) => (
              <PhraseLayer key={text} text={text} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-10 pb-20 pt-8 md:hidden">
        {statements.map((text) => (
          <motion.article
            key={text}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] px-6 py-10 text-center backdrop-blur"
          >
            <h2 className="font-[family-name:var(--font-display-serif)] text-5xl leading-[0.95]">{text}</h2>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
