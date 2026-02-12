"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const kineticY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const kineticX = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useLayoutEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !sectionRef.current) {
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    const timeline = (window.gsap as any).timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    timeline
      .to(
        zoomTargetRef.current,
        {
          scale: 1.95,
          borderRadius: 0,
          filter: "contrast(1.1) saturate(1.1)",
          ease: "none",
        },
        0,
      )
      .to(
        titleRef.current,
        {
          scale: 1.25,
          yPercent: -12,
          opacity: 0.1,
          ease: "none",
        },
        0,
      )
      .to(
        subtitleRef.current,
        {
          yPercent: 50,
          opacity: 0,
          ease: "none",
        },
        0,
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black px-6 py-10 text-white md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="relative z-20 flex h-full flex-col justify-between">
        <motion.h1
          ref={titleRef}
          className="font-syncopate text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-[0.04em]"
          style={{ y: kineticY }}
        >
          Sugar
          <br />
          Lab
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="max-w-xl text-sm uppercase tracking-[0.35em] text-white/70 md:text-base"
          style={{ x: kineticX }}
        >
          Scroll to taste the impossible · CGI-grade editorial landing crafted for modern luxury brands.
        </motion.p>
      </div>

      <div
        ref={zoomTargetRef}
        className="absolute inset-[18%_8%] z-10 overflow-hidden rounded-[2rem] will-change-transform md:inset-[14%_18%]"
      >
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
      </div>
    </section>
  );
}
