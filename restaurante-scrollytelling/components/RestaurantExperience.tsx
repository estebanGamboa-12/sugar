"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import BottomBar from "./ui/BottomBar";
import HeroCollage from "./scenes/HeroCollage";
import PrismCarousel from "./scenes/PrismCarousel";
import ManifestoSplit from "./scenes/ManifestoSplit";
import MenuCollectionHeader from "./scenes/MenuCollectionHeader";
import MasonryMenuGrid from "./scenes/MasonryMenuGrid";
import Interlude from "./scenes/Interlude";
import DiscoverMode from "./scenes/DiscoverMode";
import FinalMinimal from "./scenes/FinalMinimal";
import ContactReservation from "./scenes/ContactReservation";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISCOVER_CATEGORIES = ["brasa", "huerta", "mar", "postres", "bodega"] as const;

export default function RestaurantExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (typeof window !== "undefined" && (window as { lenis?: { scrollTo: (t: Element) => void } }).lenis) {
      (window as { lenis: { scrollTo: (t: Element) => void } }).lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Hero: collage dispersa, escala, blur al hacer scroll
      const hero = container.querySelector("[data-hero]");
      if (hero) {
        gsap.set("[data-collage-img]", { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.to("[data-collage-img]", {
              scale: 0.92 + p * 0.08,
              y: p * 30,
              filter: `blur(${p * 2}px)`,
              duration: 0.1,
            });
          },
        });
      }

      // Manifesto: scroll vertical → movimiento horizontal (scrollytelling)
      const manifesto = container.querySelector("[data-manifesto]");
      const manifestoPin = container.querySelector("[data-manifesto-pin]");
      const manifestoTrack = container.querySelector("[data-manifesto-track]");
      if (manifesto && manifestoPin && manifestoTrack) {
        gsap.set("[data-manifesto-word]", { opacity: 1 });
        gsap.set("[data-manifesto-cards]", { opacity: 1 });

        ScrollTrigger.create({
          trigger: manifesto,
          start: "top top",
          end: "+=220vh",
          scrub: 1,
          pin: manifestoPin,
          onUpdate: (self) => {
            const p = self.progress;
            // scroll vertical → movimiento horizontal: 5 paneles de 100vw
            gsap.set(manifestoTrack, { x: `-${p * 400}vw` });
          },
        });
      }

      // Discover: pinned 200vh, backgrounds + items
      const discover = container.querySelector("[data-discover]");
      if (discover) {
        gsap.set("[data-discover-bg]", { opacity: 0 });
        gsap.set("[data-discover-bg][data-index='0']", { opacity: 1 });
        gsap.set("[data-discover-item]", { opacity: 0.4 });
        gsap.set("[data-discover-item][data-index='0']", { opacity: 1 });
        gsap.set("[data-discover-thumb-group]", { opacity: 0 });
        gsap.set("[data-discover-thumb-group][data-index='0']", { opacity: 1 });

        ScrollTrigger.create({
          trigger: discover,
          start: "top top",
          end: "+=350vh",
          scrub: 1,
          pin: discover.querySelector("[data-discover-pin]"),
          onUpdate: (self) => {
            const p = self.progress;
            const step = 1 / 5;
            const active = Math.min(Math.floor(p / step), 4);
            gsap.set("[data-discover-bg]", { opacity: 0 });
            gsap.set(`[data-discover-bg][data-index='${active}']`, { opacity: 1 });
            gsap.set("[data-discover-item]", { opacity: 0.4 });
            gsap.set(`[data-discover-item][data-index='${active}']`, { opacity: 1 });
            gsap.set("[data-discover-thumb-group]", { opacity: 0 });
            gsap.set(`[data-discover-thumb-group][data-index='${active}']`, { opacity: 1 });
          },
        });
      }

      // Masonry cards stagger
      gsap.set("[data-masonry-card]", { opacity: 0, y: 40 });
      ScrollTrigger.batch("[data-masonry-card]", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <HeroCollage />
      <PrismCarousel />
      <ManifestoSplit />
      <MenuCollectionHeader />
      <MasonryMenuGrid />
      <Interlude />
      <DiscoverMode />
      <FinalMinimal />
      <ContactReservation />

      <BottomBar
        onVerCarta={() => scrollToSection("[data-menu-header]")}
        onReservar={() => scrollToSection("#reservar")}
      />
    </div>
  );
}
