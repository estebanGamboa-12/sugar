"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const premiumEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

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

  const pointerOffset = useMemo(
    () => ({
      x: reducedMotion ? 0 : pointer.x * 10,
      y: reducedMotion ? 0 : pointer.y * 8,
    }),
    [pointer.x, pointer.y, reducedMotion],
  );

  return (
    <motion.article
      onHoverStart={() => onActivate(item.id)}
      onFocus={() => onActivate(item.id)}
      onTouchStart={() => onActivate(item.id)}
      className="group relative overflow-hidden py-7 md:py-9"
      variants={{
        hidden: { opacity: 0, y: 46 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.9,
            ease: premiumEase,
            delay: index * 0.08,
          },
        },
      }}
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left bg-white/30"
        initial={{ scaleX: 0, opacity: 0.45 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 0.9, ease: premiumEase, delay: index * 0.07 }}
      />

      <motion.div
        className="absolute inset-y-2 right-0 hidden aspect-[4/5] w-[220px] overflow-hidden rounded-2xl border border-white/15 md:block"
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.94,
          x: isActive ? pointerOffset.x : 22,
          y: isActive ? pointerOffset.y : 0,
        }}
        transition={{ duration: 0.55, ease: premiumEase }}
      >
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="220px" />
      </motion.div>

      <motion.div
        className="pointer-events-none mb-4 block overflow-hidden rounded-2xl border border-white/15 md:hidden"
        animate={{ opacity: isActive ? 1 : 0.25, y: isActive ? 0 : 8 }}
        transition={{ duration: 0.45, ease: premiumEase }}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="92vw" />
        </div>
      </motion.div>

      <motion.div
        className="overflow-hidden pr-0 md:pr-[250px]"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.85, ease: premiumEase, delay: index * 0.05 }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">{item.category}</p>
            <h3 className="mt-2 text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-[1.05]">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-base">{item.description}</p>
          </div>
          <p className="pt-1 text-lg font-medium md:text-2xl">{item.price}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}
