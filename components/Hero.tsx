"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { setupGSAP } from "@/lib/gsap";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleSpacing = useTransform(scrollYProgress, [0, 1], ["0.08em", "0.16em"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !frameRef.current || !overlayRef.current || reducedMotion) return;

    const { gsap } = setupGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        frameRef.current,
        {
          scale: 1.15,
          clipPath: "inset(0% 0% 0% 0%)",
          borderRadius: 0,
          ease: "none",
        },
        0,
      )
        .to(
          overlayRef.current,
          {
            opacity: 0.85,
            ease: "none",
          },
          0,
        )
        .to(
          sectionRef.current,
          {
            backgroundColor: "#f8f1ff",
            ease: "none",
          },
          0.3,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-cream px-5 pt-8 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,111,174,0.2),transparent_35%),radial-gradient(circle_at_75%_75%,rgba(167,230,198,0.22),transparent_32%)]" />
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F1FF] opacity-45" />

      <div className="relative z-20 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-between gap-10 pb-10 pt-8 md:pt-12">
        <motion.p style={{ y: badgeY }} className="font-display text-xs uppercase tracking-[0.32em] text-cocoa/70">
          pastel bakery experience · carta cinemática
        </motion.p>

        <div className="max-w-3xl">
          <motion.h1
            style={{ y: titleY, letterSpacing: titleSpacing }}
            className="font-display text-[clamp(2.8rem,9vw,7rem)] uppercase leading-[0.9] text-cocoa"
          >
            Miga de Nube
          </motion.h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cocoa/75 md:text-lg">
            Tartas suaves, croissants dorados y cookies recién horneadas. Haz scroll y siente cada capítulo de la carta.
          </p>
        </div>

        <Magnetic>
          <button
            data-cursor="hover"
            className="w-fit rounded-full bg-strawberry px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-soft"
            onClick={() => window.dispatchEvent(new CustomEvent("lenis:scroll-to", { detail: { target: "#carta" } }))}
          >
            ver la carta
          </button>
        </Magnetic>
      </div>

      <div
        ref={frameRef}
        className="relative z-10 mx-auto -mt-6 h-[58vh] w-[min(92vw,1200px)] overflow-hidden rounded-[38px] [clip-path:inset(4%_7%_6%_7%)] shadow-soft-xl will-change-transform md:h-[64vh]"
      >
        <Image
          src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=2200&q=80"
          alt="Tarta de fresa pastel en primer plano"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <motion.span
        style={{ y: badgeY }}
        className="absolute bottom-7 right-8 z-30 text-xs uppercase tracking-[0.3em] text-cocoa/60 md:bottom-10 md:right-14"
      >
        Scroll ✦ Scroll ✦ Scroll
      </motion.span>
    </section>
  );
}
