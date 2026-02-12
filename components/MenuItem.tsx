"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import TextReveal from "@/components/TextReveal";

const premiumEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

export type MenuEntry = {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

type PointerPosition = {
  x: number;
  y: number;
};

type MenuItemProps = {
  item: MenuEntry;
  index: number;
  isActive: boolean;
  pointer: PointerPosition;
  onActivate: (id: string) => void;
};

export default function MenuItem({ item, index, isActive, pointer, onActivate }: MenuItemProps) {
  const reducedMotion = useReducedMotion();
  const itemRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [36, -36]);

  const pointerOffset = useMemo(
    () => ({
      x: reducedMotion ? 0 : pointer.x * 8,
      y: reducedMotion ? 0 : pointer.y * 6,
    }),
    [pointer.x, pointer.y, reducedMotion],
  );

  const editorialOffset = index % 3 === 0 ? "md:mt-0" : index % 3 === 1 ? "md:mt-6" : "md:-mt-4";

  return (
    <motion.article
      ref={itemRef}
      onHoverStart={() => onActivate(item.id)}
      onFocus={() => onActivate(item.id)}
      onTouchStart={() => onActivate(item.id)}
      className={`group relative overflow-hidden py-10 md:py-14 ${editorialOffset}`}
      initial={{ y: 64 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 1.05, ease: premiumEase, delay: index * 0.04 }}
      style={{ willChange: "transform" }}
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left bg-white/25"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.05, ease: premiumEase, delay: index * 0.06 }}
      />

      <motion.div
        className="absolute inset-y-4 right-0 hidden aspect-[4/5] w-[260px] overflow-hidden rounded-2xl border border-white/10 md:block"
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.94,
          x: isActive ? pointerOffset.x : 18,
          y: isActive ? pointerOffset.y : 0,
        }}
        transition={{ duration: 0.6, ease: premiumEase }}
        style={{ willChange: "transform" }}
      >
        <ParallaxImage src={item.image} alt={item.title} className="h-full w-full" sizes="260px" progress={scrollYProgress} />
      </motion.div>

      <motion.div className="mb-5 block overflow-hidden rounded-2xl border border-white/10 md:hidden" style={{ y: floatY }}>
        <ParallaxImage src={item.image} alt={item.title} className="aspect-[16/10] w-full" sizes="92vw" progress={scrollYProgress} />
      </motion.div>

      <div className="pr-0 md:pr-[310px]">
        <TextReveal className="text-[10px] uppercase tracking-[0.2em] text-white/45" delay={index * 0.05}>
          <p>{item.category}</p>
        </TextReveal>

        <TextReveal className="mt-2" delay={0.1 + index * 0.05}>
          <h3 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[0.96]">{item.title}</h3>
        </TextReveal>

        <TextReveal className="mt-4 max-w-2xl" delay={0.16 + index * 0.05}>
          <p className="text-sm text-white/65 md:text-base">{item.description}</p>
        </TextReveal>

        <TextReveal className="mt-6" delay={0.2 + index * 0.05}>
          <p className="text-lg font-medium md:text-2xl">{item.price}</p>
        </TextReveal>
      </div>
    </motion.article>
  );
}
