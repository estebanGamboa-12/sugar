"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type MenuItem = {
  name: string;
  price: string;
  img: string;
  desc: string;
};

type MenuCategory = {
  name: string;
  items: MenuItem[];
};

type MenuSectionProps = {
  categories: MenuCategory[];
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MenuSection({ categories }: MenuSectionProps) {
  const [preview, setPreview] = useState<{ item: MenuItem; x: number; y: number } | null>(null);

  const allItems = useMemo(
    () => categories.flatMap((category) => category.items.map((item) => ({ ...item, category: category.name }))),
    [categories],
  );

  return (
    <section id="menu" className="relative bg-[#101010] px-5 py-20 text-[#f7f4ef] md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease }}
          className="text-xs uppercase tracking-[0.28em] text-[#d6b184]"
        >
          Carta Extensa
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
          className="mt-4 max-w-3xl font-[family-name:var(--font-display-serif)] text-4xl leading-[0.94] md:text-6xl"
        >
          Pastelería de autor con interacción editorial y sabor de laboratorio.
        </motion.h2>

        {/* Mobile: sticky categories + image thumb visible */}
        <motion.div layoutScroll className="mt-12 md:hidden">
          {categories.map((category) => (
            <div key={category.name} className="relative">
              <div className="sticky top-0 z-20 border-y border-white/10 bg-[#101010]/95 px-1 py-4 backdrop-blur">
                <h3 className="font-[family-name:var(--font-display-serif)] text-xl uppercase tracking-[0.14em] text-[#e9d3b2]">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-5 py-5">
                {category.items.map((item, index) => (
                  <motion.article
                    key={`${category.name}-${item.name}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: index * 0.04, ease }}
                    className="flex min-h-24 items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="mt-1 text-sm text-[#f7f4ef]/70">{item.desc}</p>
                      <span className="mt-2 inline-block text-sm font-semibold text-[#e9d3b2]">{item.price}</span>
                    </div>

                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/15">
                      <Image src={item.img} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Desktop: hover driven list with floating preview */}
        <div className="relative mt-14 hidden min-h-[580px] md:block">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {allItems.map((item, index) => (
                  <motion.li
                    key={`${item.category}-${item.name}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.5, delay: index * 0.03, ease }}
                    onMouseMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      setPreview({
                        item,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                      });
                    }}
                    onMouseEnter={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      setPreview({
                        item,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                      });
                    }}
                    onMouseLeave={() => setPreview(null)}
                    className="group relative flex cursor-none items-center justify-between py-5"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/50">{item.category}</p>
                      <h3 className="mt-1 text-3xl font-semibold leading-tight transition-colors duration-300 group-hover:text-[#e9d3b2]">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-xl text-[#f0d9bb]">{item.price}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="col-span-5">
              <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-white/55">Hover preview</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Pasa el cursor por cada creación para explorar la textura visual del producto.
                </p>
              </div>
            </div>
          </div>

          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute left-0 top-0 z-30"
              style={{ transform: `translate(${preview.x + 30}px, ${preview.y - 140}px)` }}
            >
              <div className="relative h-52 w-80 overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/50">
                <Image src={preview.item.img} alt={preview.item.name} fill sizes="320px" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                  <p className="text-lg font-semibold">{preview.item.name}</p>
                  <p className="text-sm text-white/75">{preview.item.desc}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
