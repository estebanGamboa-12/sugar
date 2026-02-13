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
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const bookSceneRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([bookSceneRef.current, finalRef.current], { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3,
          scrub: true,
          anticipatePin: 1,
        },
      });

      tl.to(heroTextRef.current, { opacity: 0, y: -40, duration: 1 }, 0)
        .to(
          heroImageRef.current,
          {
            scale: 1.65,
            filter: "blur(2px) contrast(1.1)",
            duration: 1.1,
          },
          0,
        )
        .to(heroRef.current, { opacity: 0, duration: 0.45 }, 0.9)
        .to(bookSceneRef.current, { opacity: 1, duration: 0.55 }, 1.0)
        .fromTo(
          pageRefs.current,
          { rotateY: 0 },
          {
            rotateY: -180,
            stagger: 0.12,
            duration: 1.15,
            ease: "power1.inOut",
          },
          1.15,
        )
        .to(pageRefs.current, {
          rotateY: 0,
          stagger: { each: 0.1, from: "end" },
          duration: 0.85,
          ease: "power1.inOut",
        }, 2.2)
        .to(bookSceneRef.current, { opacity: 0.25, duration: 0.5 }, 2.5)
        .to(finalRef.current, { opacity: 1, duration: 0.65 }, 2.55)
        .fromTo(ctaRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, 2.65);
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
        <div ref={heroRef} className="absolute inset-0 flex items-center justify-center">
          <div ref={heroImageRef} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
              alt="Plato gourmet"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div ref={heroTextRef} className="relative z-10 px-6 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d7c7ad]">Maison Étoile</p>
            <h1 className="font-serif text-5xl leading-tight md:text-8xl">Una noche irrepetible</h1>
          </div>
        </div>

        <div
          ref={bookSceneRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(52,35,24,0.9)_0%,_#090909_72%)]"
        >
          <Book3D ref={bookRef} pageRefs={pageRefs.current} />
        </div>

        <div
          ref={finalRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#090909]/60 to-[#090909] text-center"
        >
          <h2 className="font-serif text-4xl md:text-6xl">La mesa te está esperando</h2>
          <MotionDiv
            ref={ctaRef}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <MotionButton
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="rounded-full border border-[#d7b98f] bg-[#d7b98f] px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#24180f]"
            >
              Reservar
            </MotionButton>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
