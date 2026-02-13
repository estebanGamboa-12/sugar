"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import Book3D from "./Book3D";

gsap.registerPlugin(ScrollTrigger);

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);

  const bookSceneRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const finalRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([bookSceneRef.current, finalRef.current], { opacity: 0, pointerEvents: "none" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          pin: pinRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(heroTitleRef.current, { opacity: 0, y: -24, duration: 1.05 }, 0)
        .to(
          heroImageWrapRef.current,
          {
            scale: 1.72,
            filter: "blur(2px) contrast(1.12)",
            duration: 1.2,
          },
          0,
        )
        .to(heroRef.current, { opacity: 0, duration: 0.4 }, 0.95)

        .set(bookSceneRef.current, { pointerEvents: "auto" }, 1.0)
        .to(bookSceneRef.current, { opacity: 1, duration: 0.55 }, 1.0)

        .fromTo(
          pageRefs.current,
          { rotateY: 0 },
          {
            rotateY: -180,
            stagger: 0.13,
            ease: "power2.inOut",
            duration: 1.2,
          },
          1.2,
        )

        .to(
          pageRefs.current,
          {
            rotateY: 0,
            stagger: { each: 0.11, from: "end" },
            ease: "power2.inOut",
            duration: 0.95,
          },
          2.25,
        )

        .to(bookSceneRef.current, { opacity: 0.24, duration: 0.45 }, 2.55)
        .set(finalRef.current, { pointerEvents: "auto" }, 2.58)
        .to(finalRef.current, { opacity: 1, duration: 0.65 }, 2.58)
        .fromTo(ctaWrapRef.current, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.7 }, 2.66);
    }, rootRef);

    return () => {
      ctx.revert();
      const withGetAll = ScrollTrigger as unknown as { getAll?: () => { kill: () => void }[] };
      withGetAll.getAll?.().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="relative h-[400vh]">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 z-10">
          <div ref={heroImageWrapRef} className="absolute inset-0 will-change-transform">
            <Image src="/hero-dish.svg" alt="Plato de alta cocina" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div ref={heroTitleRef} className="relative flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#dac6aa]">Maison Étoile</p>
              <h1 className="font-serif text-5xl leading-tight md:text-8xl">Luxury Dining Experience</h1>
            </div>
          </div>
        </div>

        <div
          ref={bookSceneRef}
          className="absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(62,37,24,0.94)_0%,_#070707_74%)]"
        >
          <Book3D ref={bookRef} pageRefs={pageRefs.current} />
        </div>

        <div
          ref={finalRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#070707]/55 to-[#070707] px-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a676]">Última escena</p>
          <h2 className="font-serif text-4xl md:text-6xl">Reserva una mesa inolvidable</h2>

          <MotionDiv
            ref={ctaWrapRef}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <MotionButton
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="rounded-full border border-[#d7b98f] bg-[#d7b98f] px-9 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#24170f]"
            >
              Reservar
            </MotionButton>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
