"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getGSAP } from "@/lib/gsap";
import StoryHUD from "@/components/StoryHUD";

const SHOW_MARKERS = false;
const TOTAL_SCENES = 8;

const gallery = [
  "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
];

const bentoItems = ["Reservas", "Carta", "Horarios", "Ubicación", "Reseñas", "Instagram"];
const processSteps = ["Fermentar", "Hornear", "Atemperar", "Emplatar"];
const ingredientTokens = ["Cacao 72%", "Pistacho verde", "Azahar", "Sal marina", "Vainilla bourbon"];
const tastingNotes = ["Crujiente", "Untuoso", "Cítrico", "Final seco"];
type RailState = { isActive: boolean; progress: number; start: number; end: number };

const sceneTitles = [
  "Hero Zoom",
  "Portrait Editorial",
  "Proceso",
  "Ingredientes / Estación",
  "Signature Dish",
  "Bento Highlights",
  "Gallery Strip",
  "Final CTA",
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
  const frameRef = useRef<HTMLDivElement>(null);
  const portraitRevealRef = useRef<HTMLDivElement>(null);
  const processRevealRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const [hudState, setHudState] = useState({ current: 1, progress: 0, visible: false });

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".scene", { clearProps: "all", autoAlpha: 1, pointerEvents: "auto" });
        return;
      }

      gsap.set(".scene", { autoAlpha: 0, pointerEvents: "none", y: 12, scale: 1 });
      gsap.set(".scene-1", { autoAlpha: 1, pointerEvents: "auto", y: 0, scale: 1 });

      const transitionTo = (timeline: ReturnType<typeof gsap.timeline>, outgoing: string, incoming: string, at: string) => {
        timeline
          .to(outgoing, { autoAlpha: 0, scale: 1.02, pointerEvents: "none", duration: 0.5 }, at)
          .fromTo(
            incoming,
            { autoAlpha: 0, y: 12, pointerEvents: "none" },
            { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.55 },
            "<",
          );
      };

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      tl.addLabel("scene-1")
        .to(frameRef.current, {
          scale: isMobile ? 1.08 : 1.2,
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.1rem)" : "inset(0% 0% 0% 0% round 0rem)",
          borderRadius: isMobile ? "1.1rem" : 0,
          duration: 1,
        })
        .to(".hero-vignette", { opacity: 0.2, duration: 0.75 }, "<");

      tl.addLabel("scene-2", "+=0.45");
      transitionTo(tl, ".scene-1", ".scene-2", "scene-2");
      tl.fromTo(
        portraitRevealRef.current,
        { clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.4rem)" : "inset(100% 0% 0% 0%)", yPercent: isMobile ? 0 : 8 },
        { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.9 },
        "<0.08",
      ).fromTo(".diagonal-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6 }, "<0.08");

      tl.addLabel("scene-3", "+=0.62");
      transitionTo(tl, ".scene-2", ".scene-3", "scene-3");
      tl.fromTo(
        processRevealRef.current,
        { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 0.85 },
        "<0.06",
      );

      tl.addLabel("scene-4", "+=0.62");
      transitionTo(tl, ".scene-3", ".scene-4", "scene-4");
      tl.fromTo(".kinetic-line", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.08 }, "<0.08");

      tl.addLabel("scene-5", "+=0.62");
      transitionTo(tl, ".scene-4", ".scene-5", "scene-5");
      tl.fromTo(signatureRef.current, { scale: 1.05 }, { scale: 1, duration: 1 }, "<").fromTo(
        ".dish-caption",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.58 },
        "<0.14",
      );

      tl.addLabel("scene-6", "+=0.62");
      transitionTo(tl, ".scene-5", ".scene-6", "scene-6");
      tl.fromTo(
        ".bento-card",
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.97,
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 100% 0% round 1.2rem)",
        },
        { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1.2rem)", stagger: 0.08, duration: 0.52 },
        "<0.08",
      );

      tl.addLabel("scene-7", "+=0.6");
      transitionTo(tl, ".scene-6", ".scene-7", "scene-7");
      tl.fromTo(
        ".gallery-item",
        { clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 100% 0% round 1.2rem)", y: 30, autoAlpha: 0 },
        { clipPath: "inset(0% 0% 0% 0% round 1.2rem)", y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
        "<",
      );

      tl.addLabel("scene-8", "+=0.65");
      transitionTo(tl, ".scene-7", ".scene-8", "scene-8");
      tl.fromTo(".cta-item", { y: 20, autoAlpha: 0, scale: 0.99 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.52, stagger: 0.08 }, "<0.1");

      let isSnapping = false;
      let snapTimeout: number | null = null;
      const snapStep = 1 / (TOTAL_SCENES - 1);
      const snapFn = gsap.utils.snap(snapStep);

      const railTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=1000%",
        animation: tl,
        pin: true,
        scrub: 1,
        markers: SHOW_MARKERS,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onToggle: (self: RailState) => {
          setHudState((prev) => ({ ...prev, visible: self.isActive }));
          window.dispatchEvent(new CustomEvent("rail-active", { detail: { active: self.isActive } }));
        },
        onUpdate: (self: RailState) => {
          const sceneFloat = self.progress * (TOTAL_SCENES - 1) + 1;
          const current = Math.max(1, Math.min(TOTAL_SCENES, Math.round(sceneFloat)));
          setHudState({ current, progress: self.progress * 100, visible: self.isActive });
          window.dispatchEvent(new CustomEvent("rail-scene-change", { detail: { scene: current, progress: self.progress } }));
        },
      });

      const doSnap = () => {
        if (reduceMotion || isSnapping || !railTrigger.isActive) return;
        const targetProgress = snapFn(railTrigger.progress);
        const currentScroll = railTrigger.start + railTrigger.progress * (railTrigger.end - railTrigger.start);
        const targetScroll = railTrigger.start + targetProgress * (railTrigger.end - railTrigger.start);

        if (Math.abs(targetScroll - currentScroll) < 8) return;
        isSnapping = true;

        const done = () => {
          isSnapping = false;
        };

        if (window.__lenis?.scrollTo) {
          window.__lenis.scrollTo(targetScroll, {
            duration: 0.7,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
          window.setTimeout(done, 760);
        } else {
          gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: false },
            duration: 0.7,
            ease: "power3.out",
            onComplete: done,
          });
        }
      };

      const queueSnap = () => {
        if (snapTimeout) window.clearTimeout(snapTimeout);
        snapTimeout = window.setTimeout(doSnap, 150);
      };

      window.addEventListener("wheel", queueSnap, { passive: true });
      window.addEventListener("touchend", queueSnap, { passive: true });

      ScrollTrigger.addEventListener("scrollEnd", doSnap);

      return () => {
        if (snapTimeout) window.clearTimeout(snapTimeout);
        window.removeEventListener("wheel", queueSnap);
        window.removeEventListener("touchend", queueSnap);
        ScrollTrigger.removeEventListener("scrollEnd", doSnap);
        railTrigger.kill();
      };
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    root.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    return () => {
      window.removeEventListener("load", refresh);
      root.querySelectorAll("img").forEach((img) => img.removeEventListener("load", refresh));
      ctx.revert();
    };
  }, []);

  return (
    <section id="story-rail" ref={sectionRef} className="story-grain relative h-screen overflow-hidden bg-black text-white" aria-label="Scrolly rail">
      <StoryHUD
        current={hudState.current}
        total={TOTAL_SCENES}
        title={sceneTitles[hudState.current - 1]}
        progress={hudState.progress}
        visible={hudState.visible}
      />
      <div className="relative h-screen">
        <article className="scene scene-1 absolute inset-0">
          <div
            ref={frameRef}
            className="relative h-full overflow-hidden rounded-[2rem] border border-white/20 bg-neutral-950"
            style={{ clipPath: "inset(8% 7% 10% 7% round 2rem)" }}
          >
            <img src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1800&q=80" alt="Postres de autor" className="h-full w-full object-cover" />
            <div className="hero-vignette absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.14),transparent_58%)]" />
            <div className="absolute inset-x-0 top-[16%] px-6 md:px-12">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Story 01</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,14vw,14rem)] uppercase leading-[0.82]">Noir Atelier</h1>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-2 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80">Menú en vivo · 18 cubiertos</span>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-[12%] right-[8%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,230,180,0.35),transparent_68%)] blur-xl" />
          </div>
        </article>

        <article className="scene scene-2 absolute inset-0 grid items-center px-6 py-10 md:px-12">
          <div className="relative grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div ref={portraitRevealRef} className="h-[70vh] overflow-hidden rounded-[2rem] border border-white/20">
                <img src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=1400&q=80" alt="Chef portrait" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-5 md:self-end">
              <div className="diagonal-line mb-8 h-px w-full rotate-[-18deg] bg-white/40" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Story 02</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/52">Lucía Ferrer · Creative Chef</p>
              <p className="mt-3 max-w-md text-2xl leading-tight text-white/88">“Cada plato es un encuadre. Cada textura, una línea en la narrativa.”</p>
              <div className="mt-6 grid max-w-sm gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-3 text-xs uppercase tracking-[0.18em] text-white/65">Best New Table 2026</div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-3 text-xs uppercase tracking-[0.18em] text-white/65">Gourmet Index 9.4</div>
              </div>
            </div>
          </div>
        </article>

        <article className="scene scene-3 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div ref={processRevealRef} className="h-[70vh] overflow-hidden rounded-[2rem] border border-white/20">
                <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1600&q=80" alt="Proceso de cocina" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-5 md:pb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Story 03 — Proceso</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">Masa, horno, emplatado.</h2>
              <p className="mt-4 max-w-md text-white/75">Ritmo de taller: fermentación lenta, fuego preciso y acabado en pase corto.</p>
              <div className="mt-7 space-y-2">
                {processSteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-white/60">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[0.65rem]">{idx + 1}</span>
                    <span>{step}</span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="scene scene-4 absolute inset-0 grid items-center px-6 py-12 md:px-10">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.02] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_52%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Story 04 — Ingredientes / estación</p>
              <motion.p className="kinetic-line mt-6 font-display text-[clamp(2rem,6vw,5.4rem)] leading-[0.9]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                mantequilla noisette
              </motion.p>
              <motion.p className="kinetic-line text-[clamp(1.5rem,4vw,3.2rem)] uppercase tracking-[0.16em] text-white/76" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                cacao de origen · cítricos de costa
              </motion.p>
              <motion.p className="kinetic-line mt-4 max-w-xl text-base text-white/72" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.18 }}>
                Mise en place de estación: cada lote entra cuando su aroma está en pico y desaparece antes de repetirse.
              </motion.p>
              <div className="mt-7 flex flex-wrap gap-2">
                {ingredientTokens.map((token, idx) => (
                  <motion.span
                    key={token}
                    className="kinetic-line rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/75"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.06 }}
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="scene scene-5 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div ref={signatureRef} className="h-[70vh] overflow-hidden rounded-[2rem] border border-white/20">
                <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80" alt="Signature dish" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="dish-caption md:col-span-5 md:pb-12">
              <div className="rounded-2xl bg-gradient-to-t from-black/55 to-transparent p-4 md:p-0">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">Story 05 — Signature Dish</p>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">Caramelo negro, cacao y flor de sal.</h2>
                <p className="mt-4 max-w-md text-white/72">Texturas en capas, temperatura medida y un final seco para prolongar el recuerdo.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tastingNotes.map((note) => (
                    <span key={note} className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/75">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="scene scene-6 absolute inset-0 px-6 py-14 md:px-10">
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.88]">Bento Highlights</h2>
          <div className="pointer-events-none absolute right-16 top-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(143,210,255,0.25),transparent_65%)] blur-2xl" />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
            {bentoItems.map((item) => (
              <div key={item} className="bento-card rounded-[1.4rem] border border-white/15 bg-white/[0.05] p-5 transition-transform duration-300 hover:-translate-y-1 md:col-span-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item}</p>
                <p className="mt-4 text-2xl text-white/90">{item === "Instagram" ? "@noiratelier" : `Explorar ${item.toLowerCase()}`}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-7 absolute inset-0 px-6 py-12 md:px-10">
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.9]">Gallery Strip</h2>
          <div className="mt-8 grid h-[70vh] gap-4 md:grid-cols-12">
            {gallery.map((image, idx) => (
              <div key={image} className={`gallery-item group relative overflow-hidden rounded-[1.4rem] border border-white/15 ${idx === 0 ? "md:col-span-5" : "md:col-span-3"}`}>
                <img src={image} alt="Galería editorial" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[0.65rem] uppercase tracking-[0.16em] text-white/0 transition group-hover:text-white/75">
                  Chapter 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-8 absolute inset-0 grid items-center px-6 text-center md:px-10">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.1),transparent_55%)] p-8 md:p-14">
            <p className="cta-item text-xs uppercase tracking-[0.25em] text-white/55">Story 08 · Final CTA</p>
            <h2 className="cta-item mt-5 font-display text-[clamp(2.8rem,9vw,9rem)] leading-[0.84]">¿Listo para tu próxima velada?</h2>
            <p className="cta-item mt-5 text-lg text-white/74">Últimas plazas para el próximo menú degustación y encargos boutique.</p>
            <div className="cta-item mt-8 flex flex-wrap justify-center gap-3">
              <button data-cursor="link" data-magnet className="rounded-full border border-white/25 px-7 py-3 text-xs uppercase tracking-[0.18em] transition hover:bg-white hover:text-black">
                Reservar
              </button>
              <button data-cursor="link" data-magnet className="rounded-full border border-white/25 px-7 py-3 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white/60">
                Encargar
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
