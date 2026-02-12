"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HorizontalGallery from "@/components/HorizontalGallery";
import MenuTabs from "@/components/MenuTabs";
import Philosophy from "@/components/Philosophy";

export default function Page() {
  const mainRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.26, 0.55, 1],
    ["#f8f3eb", "#f5efe6", "#eee7db", "#e7dece"],
  );

  return (
    <>
      <motion.main
        ref={mainRef}
        style={{ backgroundColor: background }}
        className="relative z-10 mb-[72vh] overflow-x-clip rounded-b-[2.6rem] text-cocoa md:mb-[78vh] md:rounded-b-[3rem]"
      >
        <Hero />

        <Philosophy />

        <HorizontalGallery />

        <section aria-hidden className="relative h-24 overflow-hidden md:h-32">
          <div className="absolute inset-0 translate-y-10 rounded-t-[100%] bg-lavender md:translate-y-12" />
        </section>

        <section id="collection" className="relative bg-lavender text-cocoa">
          <MenuTabs />
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
