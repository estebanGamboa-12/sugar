"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

const portraits = [
  {
    name: "Mara Vives",
    role: "Head Pastry Chef",
    quote: "Cada capa debe romper con sonido, luego fundirse en silencio.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "Tomás Brea",
    role: "Chef de Cocina",
    quote: "El menú evoluciona con la estación, nunca con tendencia.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "Lucía Prado",
    role: "Creative Host",
    quote: "Nuestros clientes vuelven por la pausa, no por la prisa.",
    image: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function PortraitScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray("[data-portrait]") as HTMLElement[];
      blocks.forEach((block) => {
        const image = block.querySelector("[data-portrait-image]");
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-28 md:px-12">
      <div className="mb-10 max-w-4xl">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-white/55">Chef / Equipo / Clientes</p>
      </div>
      <div className="space-y-10">
        {portraits.map((portrait) => (
          <Reveal key={portrait.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 md:p-4">
            <article data-portrait className="relative h-[68vh] overflow-hidden rounded-[1.25rem]">
              <div data-portrait-image className="absolute inset-0 will-change-transform">
                <Image src={portrait.image} alt={portrait.name} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                <div className="mb-4 h-px w-44 origin-left rotate-[20deg] bg-white/70" />
                <p className="text-2xl font-semibold md:text-4xl">{portrait.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">{portrait.role}</p>
                <p className="mt-4 max-w-2xl text-sm text-white/85 md:text-base">{portrait.quote}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
