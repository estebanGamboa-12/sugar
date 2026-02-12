"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getGSAP } from "@/lib/gsap";
import StoryHUD from "@/components/StoryHUD";
import FXCanvas, { FXCanvasHandle } from "@/components/FXCanvas";

const TOTAL_SCENES = 8;
const SCENE_TITLES = [
  "Sugar Dust Intro",
  "Knife Slice Reveal",
  "Heat / Steam",
  "Chocolate Drip Mask",
  "Bento Highlights",
  "Gallery Strip Cinematic",
  "Testimonials / Press",
  "Final CTA",
];

const gallery = [
  "https://images.unsplash.com/photo-1514516345957-556ca7a5f11d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1600&q=80",
];

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }) => void;
    };
  }
}

export default function ScrollyRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<FXCanvasHandle>(null);

  const [hud, setHud] = useState({ current: 1, progress: 0, visible: false });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const fxDisabled = reduceMotion || isMobile;
    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(".story-scene") as HTMLElement[];
      const intensityProxy = { value: 0 };

      if (!reduceMotion) {
        gsap.set(scenes, { autoAlpha: 0, y: 14, pointerEvents: "none" });
        gsap.set(".scene-1", { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      }

      const showScene = (index: number) => {
        gsap.to(scenes, { autoAlpha: 0, y: 14, duration: 0.35, pointerEvents: "none", overwrite: "auto" });
        gsap.to(`.scene-${index + 1}`, { autoAlpha: 1, y: 0, duration: 0.45, pointerEvents: "auto", overwrite: "auto" });
      };

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      const setFX = (scene: number, target: number, duration = 0.7) => {
        if (fxDisabled) return;
        tl.to(intensityProxy, {
          value: target,
          duration,
          onStart: () => fxRef.current?.setScene(scene),
          onUpdate: () => fxRef.current?.setIntensity(intensityProxy.value),
        });
      };

      tl.to(frameRef.current, {
        scale: isMobile ? 1.06 : 1.16,
        clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 0% 0% round 0rem)",
        borderRadius: isMobile ? "1.2rem" : "0rem",
        duration: 1.1,
      })
        .to(".hero-copy", { yPercent: -14, opacity: 0.2, duration: 0.9 }, "<")
        .add(() => showScene(1))
        .fromTo(
          ".knife-mask",
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          { clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)", duration: 1 },
        )
        .fromTo(".knife-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.5 }, "<0.1")
        .add(() => showScene(2))
        .to(".steam-zone", { opacity: 0.62, y: -12, duration: 0.8 })
        .add(() => showScene(3))
        .fromTo(
          ".drip-mask",
          { clipPath: "polygon(0 0,100% 0,100% 0,0 0)" },
          { clipPath: "polygon(0 0,100% 0,100% 100%,0 86%)", duration: 0.9 },
        )
        .add(() => showScene(4))
        .fromTo(".bento-card", { y: 26, autoAlpha: 0, scale: 0.98 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.4 })
        .add(() => showScene(5))
        .to(
          horizontalRef.current,
          {
            x: () => {
              const totalWidth = horizontalRef.current?.scrollWidth ?? 0;
              const viewport = horizontalRef.current?.parentElement?.clientWidth ?? 0;
              return -(Math.max(0, totalWidth - viewport));
            },
            duration: 1,
          },
        )
        .add(() => showScene(6))
        .fromTo(".press-line", { width: "0%" }, { width: "100%", duration: 0.9 })
        .add(() => showScene(7))
        .fromTo(".frost-panel", { backdropFilter: "blur(22px)", opacity: 0.84 }, { backdropFilter: "blur(8px)", opacity: 1, duration: 1 })
        .fromTo(".cta-btn", { scale: 0.96, y: 16, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5 }, "<0.2");

      setFX(0, 0.8, 1);
      setFX(0, 0.15, 0.6);
      setFX(2, 0.6, 0.7);
      setFX(2, 0.15, 0.6);
      setFX(3, 0.72, 0.8);
      setFX(3, 0.1, 0.6);
      setFX(4, 0.66, 0.9);
      setFX(4, 0.1, 0.7);

      const snapStep = 1 / (TOTAL_SCENES - 1);
      let snapping = false;
      let snapTimer: number | null = null;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1200%",
        pin: true,
        scrub: reduceMotion ? false : 1,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self: { progress: number; isActive: boolean; start: number; end: number }) => {
          const p = self.progress;
          const current = Math.min(TOTAL_SCENES, Math.floor(p * TOTAL_SCENES) + 1);
          setHud({ current, progress: p * 100, visible: self.isActive });
        },
        onScrubComplete: (self: { progress: number; start: number; end: number }) => {
          if (reduceMotion || isMobile) return;
          if (snapping) return;
          if (snapTimer) window.clearTimeout(snapTimer);
          snapTimer = window.setTimeout(() => {
            const snapped = gsap.utils.snap(snapStep)(self.progress);
            const target = self.start + (self.end - self.start) * snapped;
            snapping = true;
            window.__lenis?.scrollTo(target, {
              duration: 0.85,
              easing: (t) => 1 - Math.pow(1 - t, 3),
            });
            window.setTimeout(() => {
              snapping = false;
            }, 560);
          }, 70);
        },
      });

      const pointerMove = (event: PointerEvent) => {
        fxRef.current?.setPointer(event.clientX / window.innerWidth, event.clientY / window.innerHeight);
      };

      window.addEventListener("pointermove", pointerMove);
      const fxTicker = (time: number) => fxRef.current?.tick(time * 1000);
      gsap.ticker.add(fxTicker);

      return () => {
        window.removeEventListener("pointermove", pointerMove);
        gsap.ticker.remove(fxTicker);
        if (snapTimer) window.clearTimeout(snapTimer);
        trigger.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.1),transparent_45%)]" />
      <FXCanvas ref={fxRef} disabled={reduced || mobile} />
      <StoryHUD current={hud.current} total={TOTAL_SCENES} title={SCENE_TITLES[hud.current - 1]} progress={hud.progress} visible={hud.visible} />

      <div ref={railRef} className="relative h-screen story-grain">
        <article className="story-scene scene-1 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div ref={frameRef} className="relative h-[78vh] overflow-hidden rounded-[2rem] border border-white/15">
            <img
              src="https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1800&q=80"
              alt="Pastry editorial"
              className="h-full w-full object-cover"
            />
            <div className="hero-copy absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/25 to-transparent p-6 md:p-10">
              <motion.p className="text-xs uppercase tracking-[0.28em] text-white/70" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Story 01 · Sugar Dust Intro
              </motion.p>
              <motion.h2 className="mt-4 font-display text-[clamp(3rem,9vw,9rem)] leading-[0.84]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
                Noir Atelier
              </motion.h2>
            </div>
          </div>
        </article>

        <article className="story-scene scene-2 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="knife-mask relative h-[68vh] overflow-hidden rounded-[1.8rem] border border-white/15">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80" alt="Signature kitchen" className="h-full w-full object-cover" />
                <div className="knife-line absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/70" />
              </div>
            </div>
            <div className="md:col-span-4 md:self-end md:pb-12">
              <p className="rounded-full border border-white/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-white/70" data-cursor="hover">
                Signature Cut
              </p>
              <h3 className="mt-4 font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.9]">Un corte limpio, un pase preciso.</h3>
            </div>
          </div>
        </article>

        <article className="story-scene scene-3 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="steam-zone relative h-[72vh] overflow-hidden rounded-[1.9rem] border border-white/15 bg-black/20 opacity-40">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=80" alt="Café caliente" className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
              <motion.h3 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.9]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                Calor en capas.
              </motion.h3>
            </div>
          </div>
        </article>

        <article className="story-scene scene-4 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-6">
              <h3 className="font-display text-[clamp(2.2rem,6vw,5.2rem)] leading-[0.88]">Chocolate Drip</h3>
              <p className="mt-4 max-w-md text-white/75">Una máscara líquida revela el plato con ritmo lento, como una mise en place nocturna.</p>
            </div>
            <div className="md:col-span-6">
              <div className="drip-mask h-[66vh] overflow-hidden rounded-[1.8rem] border border-white/15">
                <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1700&q=80" alt="Postre de chocolate" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </article>

        <article className="story-scene scene-5 absolute inset-0 px-6 py-14 md:px-10">
          <h3 className="font-display text-[clamp(2.4rem,6vw,5.8rem)] leading-[0.88]">Bento Highlights</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-12">
            {["Reservas", "Carta", "Chef Table", "Maridajes", "Eventos", "Gift Card"].map((item) => (
              <div key={item} className="bento-card rounded-[1.4rem] border border-white/14 bg-white/[0.04] p-5 md:col-span-4" data-magnet data-cursor="hover">
                <p className="text-[0.66rem] uppercase tracking-[0.23em] text-white/55">{item}</p>
                <p className="mt-3 text-xl text-white/90">{item === "Gift Card" ? "Experiencias privadas" : `Explorar ${item.toLowerCase()}`}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="story-scene scene-6 absolute inset-0 overflow-hidden px-6 py-12 md:px-10">
          <h3 className="font-display text-[clamp(2.3rem,6vw,5.7rem)] leading-[0.9]">Gallery Strip</h3>
          <div className="mt-8 overflow-hidden">
            <div ref={horizontalRef} className="flex w-max gap-4 will-change-transform">
              {gallery.map((image, idx) => (
                <div key={image} className="group relative h-[64vh] w-[70vw] overflow-hidden rounded-[1.6rem] border border-white/15 md:w-[36vw]">
                  <img src={image} alt="Galería cinemática" className="h-full w-full scale-[1.08] object-cover transition-transform duration-500 group-hover:scale-[1.12]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-[0.22em] text-white/75">Chapter 0{idx + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-7 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Testimonials / Press</p>
            <h3 className="mt-5 font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.9]">Voces que entienden el tempo.</h3>
            <div className="mt-10 space-y-4 text-left">
              {["MONOCLE", "Cereal", "AD España"].map((item) => (
                <button key={item} data-cursor="hover" className="group block w-full border-b border-white/10 pb-3 text-lg text-white/86">
                  {item}
                  <span className="press-line mt-2 block h-px w-0 bg-white/75 transition-all duration-500 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-8 absolute inset-0 grid items-center px-6 text-center md:px-10">
          <div className="frost-panel mx-auto max-w-4xl rounded-[2rem] border border-white/16 bg-white/[0.08] p-8 md:p-14">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">Final CTA</p>
            <h3 className="mt-5 font-display text-[clamp(2.8rem,8vw,8rem)] leading-[0.86]">Reserva tu noche en Noir Atelier.</h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/74">Dos rutas: mesa degustación o encargo de autor, ambas con aforo íntimo.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                ["Reservar mesa", "link"],
                ["Encargar boutique", "hover"],
              ].map(([label, cursor]) => (
                <button
                  key={label}
                  data-cursor={cursor}
                  data-magnet
                  className="cta-btn rounded-full border border-white/25 px-7 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
