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
  "Final CTA — Glass / Frost",
];

const GALLERY = [
  "https://images.unsplash.com/photo-1514516345957-556ca7a5f11d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1600&q=80",
];

export default function ScrollyRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<FXCanvasHandle>(null);

  const [hud, setHud] = useState({ current: 1, progress: 0, visible: false });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const fxDisabled = reduceMotion || isMobile;
    const { gsap, ScrollTrigger } = getGSAP();

    const moveSpotlight = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      section.style.setProperty("--spot-x", `${x}%`);
      section.style.setProperty("--spot-y", `${y}%`);
      if (!fxDisabled) {
        fxRef.current?.setPointer(event.clientX / window.innerWidth, event.clientY / window.innerHeight);
      }
    };

    window.addEventListener("pointermove", moveSpotlight, { passive: true });

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(".story-scene") as HTMLElement[];
      const intensity = { value: 0 };

      if (!reduceMotion) {
        gsap.set(scenes, { autoAlpha: 0, y: 20, pointerEvents: "none" });
        gsap.set(".scene-1", { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      }

      const revealScene = (index: number) => {
        gsap.to(scenes, { autoAlpha: 0, y: 20, duration: 0.4, pointerEvents: "none", overwrite: "auto" });
        gsap.to(`.scene-${index + 1}`, { autoAlpha: 1, y: 0, duration: 0.45, pointerEvents: "auto", overwrite: "auto" });
      };

      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      const fxStep = (scene: number, target: number, duration = 0.75) => {
        if (fxDisabled) return;
        timeline.to(intensity, {
          value: target,
          duration,
          onStart: () => fxRef.current?.setScene(scene),
          onUpdate: () => fxRef.current?.setIntensity(intensity.value),
        });
      };

      timeline
        .to(frameRef.current, {
          scale: isMobile ? 1.06 : 1.16,
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 0% 0% round 0rem)",
          borderRadius: isMobile ? "1.2rem" : "0rem",
          duration: 1.1,
        })
        .to(".hero-copy", { yPercent: -16, opacity: 0.14, duration: 0.92 }, "<")
        .to(".hero-kicker", { opacity: 0, y: -18, duration: 0.8 }, "<0.1")
        .add(() => revealScene(1))
        .fromTo(".knife-mask", { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 100% 0, 84% 100%, 0 100%)", duration: 0.95 })
        .fromTo(".knife-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.5 }, "<0.12")
        .add(() => revealScene(2))
        .to(".steam-fallback", { opacity: 0.6, y: -12, duration: 0.8 })
        .add(() => revealScene(3))
        .fromTo(".drip-mask", { clipPath: "polygon(0 0,100% 0,100% 0,0 0)" }, { clipPath: "polygon(0 0,100% 0,100% 100%,0 84%)", duration: 1 })
        .add(() => revealScene(4))
        .fromTo(".bento-card", { autoAlpha: 0, y: 26, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.42 })
        .add(() => revealScene(5))
        .to(horizontalRef.current, {
          x: () => {
            const total = horizontalRef.current?.scrollWidth ?? 0;
            const view = horizontalRef.current?.parentElement?.clientWidth ?? 0;
            return -Math.max(0, total - view);
          },
          duration: 1,
        })
        .fromTo(".gallery-mask", { clipPath: "inset(18% 6% 18% 6% round 1.2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.2rem)", stagger: 0.1, duration: 0.7 }, "<0.1")
        .add(() => revealScene(6))
        .to(".testi-shimmer", { letterSpacing: "0.11em", opacity: 0.95, duration: 0.9 })
        .add(() => revealScene(7))
        .fromTo(".frost-panel", { opacity: 0.8, backdropFilter: "blur(24px)" }, { opacity: 1, backdropFilter: "blur(8px)", duration: 1.05 })
        .fromTo(".cta-btn", { autoAlpha: 0, y: 16, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.46, stagger: 0.1 }, "<0.2");

      fxStep(0, 0.82, 0.95);
      fxStep(0, 0.14, 0.6);
      fxStep(2, 0.64, 0.72);
      fxStep(2, 0.12, 0.55);
      fxStep(3, 0.7, 0.9);
      fxStep(3, 0.15, 0.65);
      fxStep(4, 0.7, 0.9);
      fxStep(4, 0.1, 0.65);

      const snapStep = 1 / (TOTAL_SCENES - 1);
      let snapDelay: number | null = null;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1100%",
        pin: true,
        scrub: reduceMotion ? false : 1,
        animation: timeline,
        invalidateOnRefresh: true,
        onUpdate: (self: { progress: number; isActive: boolean }) => {
          const progress = self.progress;
          const current = Math.min(TOTAL_SCENES, Math.floor(progress * TOTAL_SCENES) + 1);
          setHud({ current, progress: progress * 100, visible: self.isActive });
        },
        onScrubComplete: (self: { progress: number; start: number; end: number }) => {
          if (reduceMotion || isMobile) return;
          if (snapDelay) window.clearTimeout(snapDelay);
          snapDelay = window.setTimeout(() => {
            const snapped = Math.round(self.progress / snapStep) * snapStep;
            const targetY = self.start + (self.end - self.start) * snapped;
            if (window.__lenis) {
              window.__lenis.scrollTo(targetY, { duration: 0.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
            } else {
              window.scrollTo({ top: targetY, behavior: "smooth" });
            }
          }, 70);
        },
      });

      const knifeLabel = document.querySelector<HTMLElement>(".knife-label");
      const vibrate = () => gsap.fromTo(".knife-line", { x: -1 }, { x: 1, duration: 0.05, repeat: 5, yoyo: true, clearProps: "x" });
      knifeLabel?.addEventListener("mouseenter", vibrate);

      const pressButtons = gsap.utils.toArray(".press-entry") as HTMLElement[];
      pressButtons.forEach((button) => {
        const line = button.querySelector<HTMLElement>(".press-line");
        if (!line) return;
        button.addEventListener("mouseenter", () => gsap.to(line, { width: "100%", duration: 0.32, ease: "power2.out" }));
        button.addEventListener("mouseleave", () => gsap.to(line, { width: "0%", duration: 0.28, ease: "power2.out" }));
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        trigger.kill();
        knifeLabel?.removeEventListener("mouseenter", vibrate);
      };
    }, section);

    return () => {
      window.removeEventListener("pointermove", moveSpotlight);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="story-grain relative h-screen overflow-hidden bg-black [--spot-x:50%] [--spot-y:50%]">
      <StoryHUD current={hud.current} total={TOTAL_SCENES} title={SCENE_TITLES[hud.current - 1]} progress={hud.progress} visible={hud.visible} />
      <FXCanvas ref={fxRef} disabled={false} />

      <div className="relative h-full w-full overflow-hidden border border-white/10 bg-black" ref={frameRef}>
        <article className="story-scene scene-1 absolute inset-0 px-6 py-10 md:px-10">
          <div className="grid h-full items-end gap-8 md:grid-cols-12">
            <div className="hero-copy z-10 md:col-span-5">
              <p className="hero-kicker text-xs uppercase tracking-[0.26em] text-white/55">Noir Atelier — Storycrolling Landing</p>
              <motion.h1
                className="mt-5 font-display text-[clamp(2.8rem,8.8vw,9.2rem)] leading-[0.82]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              >
                Sugar Dust Intro
              </motion.h1>
              <motion.p className="mt-4 max-w-md text-white/72" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                Un primer acercamiento editorial: volumen, sombra y una llovizna de azúcar que reacciona al gesto del cursor.
              </motion.p>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 md:col-span-7">
              <img src="https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1900&q=80" alt="Pastelería de autor" className="h-[74vh] w-full object-cover" />
            </div>
          </div>
        </article>

        <article className="story-scene scene-2 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="knife-mask relative h-[72vh] overflow-hidden rounded-[1.8rem] border border-white/15">
                <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1800&q=80" alt="Knife slice signature" className="h-full w-full object-cover" />
                <span className="knife-line absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#ecdabb]/80 via-white/45 to-transparent" />
              </div>
            </div>
            <div className="flex items-end md:col-span-5">
              <div>
                <p className="knife-label inline-block border-b border-white/30 pb-1 text-xs uppercase tracking-[0.22em] text-[#e8d4b4]" data-cursor="link">
                  Signature Pass
                </p>
                <h3 className="mt-4 font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[0.9]">Un corte limpio, un pase preciso.</h3>
              </div>
            </div>
          </div>
        </article>

        <article className="story-scene scene-3 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="steam-fallback relative h-[72vh] overflow-hidden rounded-[1.9rem] border border-white/15 bg-black/30 opacity-35">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1900&q=80" alt="Café y vapor" className="h-full w-full object-cover" />
            <div className="steam-haze absolute inset-x-0 top-0 h-1/2 bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-7 md:p-9">
              <motion.h3 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.9]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Heat / Steam
              </motion.h3>
            </div>
          </div>
        </article>

        <article className="story-scene scene-4 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-6">
              <h3 className="font-display text-[clamp(2.2rem,6vw,5.2rem)] leading-[0.88]">Chocolate Drip Mask</h3>
              <p className="mt-4 max-w-md text-white/75">La revelación se estira lentamente para mantener tensión visual y dejar respirar la composición.</p>
            </div>
            <div className="md:col-span-6">
              <div className="drip-mask h-[66vh] overflow-hidden rounded-[1.8rem] border border-white/15">
                <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1700&q=80" alt="Postre chocolate" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </article>

        <article className="story-scene scene-5 absolute inset-0 px-6 py-14 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(246,225,190,0.2),transparent_45%)] mix-blend-soft-light" />
          <h3 className="relative font-display text-[clamp(2.4rem,6vw,5.8rem)] leading-[0.88]">Bento Highlights</h3>
          <div className="relative mt-8 grid gap-4 md:grid-cols-12">
            {["Reservas", "Carta", "Chef Table", "Maridajes", "Eventos", "Gift Card"].map((item) => (
              <div key={item} className="bento-card rounded-[1.4rem] border border-white/14 bg-white/[0.04] p-5 transition-transform duration-300 hover:-translate-y-1" data-magnet data-cursor="hover">
                <p className="text-[0.66rem] uppercase tracking-[0.23em] text-white/55">{item}</p>
                <p className="mt-3 text-xl text-white/90">{item === "Gift Card" ? "Experiencias privadas" : `Explorar ${item.toLowerCase()}`}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="story-scene scene-6 absolute inset-0 overflow-hidden px-6 py-12 md:px-10">
          <h3 className="font-display text-[clamp(2.3rem,6vw,5.7rem)] leading-[0.9]">Gallery Strip Cinematic</h3>
          <div className="mt-8 overflow-hidden">
            <div ref={horizontalRef} className="flex w-max gap-4 will-change-transform">
              {GALLERY.map((image, index) => (
                <div key={image} className="gallery-mask group relative h-[64vh] w-[70vw] overflow-hidden rounded-[1.6rem] border border-white/15 md:w-[36vw]">
                  <img src={image} alt="Galería cinemática" className="h-full w-full scale-[1.08] object-cover transition-transform duration-700 group-hover:scale-[1.12]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-[0.64rem] uppercase tracking-[0.24em] text-white/80">Chapter 0{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-7 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Testimonials / Press</p>
            <h3 className="testi-shimmer mt-5 font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.9]">Voces que entienden el tempo.</h3>
            <div className="mt-10 space-y-4 text-left">
              {["MONOCLE", "Cereal", "AD España"].map((item) => (
                <button key={item} data-cursor="hover" className="press-entry group block w-full border-b border-white/12 pb-3 text-lg text-white/86">
                  {item}
                  <span className="press-line mt-2 block h-px w-0 bg-white/75" />
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-8 absolute inset-0 grid items-center px-6 text-center md:px-10">
          <div className="frost-panel mx-auto max-w-4xl rounded-[2rem] border border-white/16 bg-white/[0.08] p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)", backgroundSize: "2px 2px" }} />
            <p className="relative text-xs uppercase tracking-[0.24em] text-white/55">Final CTA</p>
            <h3 className="relative mt-5 font-display text-[clamp(2.8rem,8vw,8rem)] leading-[0.86]">Reserva tu noche en Noir Atelier.</h3>
            <p className="relative mx-auto mt-4 max-w-2xl text-white/74">Dos rutas: mesa degustación o encargo de autor, ambas con aforo íntimo.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              {[
                ["Reservar mesa", "link"],
                ["Encargar boutique", "hover"],
              ].map(([label, cursor]) => (
                <button key={label} data-cursor={cursor} data-magnet className="cta-btn rounded-full border border-white/25 px-7 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
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
