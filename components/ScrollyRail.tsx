"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getGSAP } from "@/lib/gsap";

const SHOW_MARKERS = false;

const gallery = [
  "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
];

const bentoItems = ["Reservas", "Carta", "Horarios", "Ubicación", "Reseñas", "Instagram"];

export default function ScrollyRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const portraitRevealRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const heroTitleY = useTransform(scrollYProgress, [0, 0.12, 0.2], [24, 0, -18]);
  const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [0.35, 1, 0.75]);

  const portraitTitleY = useTransform(scrollYProgress, [0.16, 0.3, 0.42], [20, 0, -14]);
  const portraitTitleOpacity = useTransform(scrollYProgress, [0.16, 0.3, 0.42], [0.35, 1, 0.72]);

  const dishTitleY = useTransform(scrollYProgress, [0.33, 0.45, 0.54], [18, 0, -12]);
  const dishTitleOpacity = useTransform(scrollYProgress, [0.33, 0.45, 0.54], [0.3, 1, 0.75]);

  const bentoTitleY = useTransform(scrollYProgress, [0.5, 0.62, 0.72], [16, 0, -10]);
  const bentoTitleOpacity = useTransform(scrollYProgress, [0.5, 0.62, 0.72], [0.3, 1, 0.76]);

  const galleryTitleY = useTransform(scrollYProgress, [0.67, 0.79, 0.88], [16, 0, -10]);
  const galleryTitleOpacity = useTransform(scrollYProgress, [0.67, 0.79, 0.88], [0.3, 1, 0.78]);

  const ctaTitleY = useTransform(scrollYProgress, [0.83, 0.94, 1], [18, 0, -8]);
  const ctaTitleOpacity = useTransform(scrollYProgress, [0.83, 0.94, 1], [0.35, 1, 0.96]);

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

      gsap.set(".scene", { autoAlpha: 0, pointerEvents: "none", y: 16, scale: 0.99 });
      gsap.set(".scene-1", { autoAlpha: 1, pointerEvents: "auto", y: 0, scale: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=800%",
          pin: true,
          scrub: 1,
          markers: SHOW_MARKERS,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const withLabels = tl as unknown as {
        addLabel: (label: string, position?: string | number) => typeof tl;
      };

      const transitionTo = (outgoing: string, incoming: string, at: string) => {
        tl.to(outgoing, { autoAlpha: 0, y: -14, scale: 1.01, pointerEvents: "none", duration: 0.44 }, at).fromTo(
          incoming,
          { autoAlpha: 0, y: 14, scale: 0.99, pointerEvents: "none" },
          { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.52 },
          "<",
        );
      };

      withLabels.addLabel("scene-1");
      tl.to(frameRef.current, {
          scale: isMobile ? 1.06 : 1.22,
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.1rem)" : "inset(0% 0% 0% 0% round 0rem)",
          borderRadius: isMobile ? "1.1rem" : 0,
          duration: 1,
        })
        .to(".hero-vignette", { opacity: 0.16, duration: 0.75 }, "<");
      withLabels.addLabel("scene-2", "+=0.45");

      transitionTo(".scene-1", ".scene-2", "scene-2");
      tl.fromTo(
        portraitRevealRef.current,
        {
          clipPath: isMobile ? "inset(6% 6% 6% 6% round 1.4rem)" : "inset(100% 0% 0% 0%)",
          yPercent: isMobile ? 0 : 8,
        },
        { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.9 },
        "<0.08",
      )
        .fromTo(".diagonal-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6 }, "<0.12");
      withLabels.addLabel("scene-3", "+=0.65");

      transitionTo(".scene-2", ".scene-3", "scene-3");
      tl.fromTo(signatureRef.current, { scale: 1.05 }, { scale: 1, duration: 1 }, "<").fromTo(
        ".dish-caption",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.58 },
        "<0.14",
      );
      withLabels.addLabel("scene-4", "+=0.68");

      transitionTo(".scene-3", ".scene-4", "scene-4");
      tl.fromTo(
        ".bento-card",
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.97,
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 100% 0% round 1.2rem)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 1.2rem)",
          stagger: 0.08,
          duration: 0.52,
        },
        "<0.08",
      );
      withLabels.addLabel("scene-5", "+=0.6");

      transitionTo(".scene-4", ".scene-5", "scene-5");
      tl.fromTo(
        ".gallery-item",
        {
          clipPath: isMobile ? "inset(0% 0% 0% 0% round 1.2rem)" : "inset(0% 0% 100% 0% round 1.2rem)",
          y: 30,
          autoAlpha: 0,
        },
        { clipPath: "inset(0% 0% 0% 0% round 1.2rem)", y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
        "<",
      );
      withLabels.addLabel("scene-6", "+=0.65");

      transitionTo(".scene-5", ".scene-6", "scene-6");
      tl.fromTo(".cta-item", { y: 20, autoAlpha: 0, scale: 0.99 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.52, stagger: 0.08 }, "<0.1");
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    root.querySelectorAll("img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", refresh);
      root.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("load", refresh);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black text-white" aria-label="Scrolly rail">
      <div className="relative h-screen">
        <article className="scene scene-1 absolute inset-0">
          <div
            ref={frameRef}
            className="relative h-full overflow-hidden rounded-[2rem] border border-white/20 bg-neutral-950"
            style={{ clipPath: "inset(8% 7% 10% 7% round 2rem)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1800&q=80"
              alt="Postres de autor"
              className="h-full w-full object-cover"
            />
            <div className="hero-vignette absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30" />
            <motion.div style={{ y: heroTitleY, opacity: heroTitleOpacity }} className="absolute inset-x-0 top-[16%] px-6 md:px-12">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Story 01 — Hero Zoom</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,14vw,14rem)] uppercase leading-[0.82]">Noir Atelier</h1>
            </motion.div>
          </div>
        </article>

        <article className="scene scene-2 absolute inset-0 grid items-center px-6 py-10 md:px-12">
          <div className="relative grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div ref={portraitRevealRef} className="h-[70vh] overflow-hidden rounded-[2rem] border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=1400&q=80"
                  alt="Chef portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <motion.div style={{ y: portraitTitleY, opacity: portraitTitleOpacity }} className="md:col-span-5 md:self-end">
              <div className="diagonal-line mb-8 h-px w-full rotate-[-18deg] bg-white/40" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Story 02 — Portrait Editorial</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/52">Lucía Ferrer · Creative Chef</p>
              <p className="mt-3 max-w-md text-2xl leading-tight text-white/88">“Cada plato es un encuadre. Cada textura, una línea en la narrativa.”</p>
            </motion.div>
          </div>
        </article>

        <article className="scene scene-3 absolute inset-0 grid items-center px-6 py-10 md:px-10">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div ref={signatureRef} className="h-[70vh] overflow-hidden rounded-[2rem] border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80"
                  alt="Signature dish"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <motion.div style={{ y: dishTitleY, opacity: dishTitleOpacity }} className="dish-caption md:col-span-5 md:pb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Story 03 — Signature Dish</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">Caramelo negro, cacao y flor de sal.</h2>
              <p className="mt-4 max-w-md text-white/72">Texturas en capas, temperatura medida y un final seco para prolongar el recuerdo.</p>
            </motion.div>
          </div>
        </article>

        <article className="scene scene-4 absolute inset-0 px-6 py-14 md:px-10">
          <motion.h2 style={{ y: bentoTitleY, opacity: bentoTitleOpacity }} className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.88]">
            Story 04 — Bento Highlights
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
            {bentoItems.map((item) => (
              <div key={item} className="bento-card rounded-[1.4rem] border border-white/15 bg-white/[0.05] p-5 md:col-span-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item}</p>
                <p className="mt-4 text-2xl text-white/90">{item === "Instagram" ? "@noiratelier" : `Explorar ${item.toLowerCase()}`}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-5 absolute inset-0 px-6 py-12 md:px-10">
          <motion.h2 style={{ y: galleryTitleY, opacity: galleryTitleOpacity }} className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.9]">
            Story 05 — Gallery Strip
          </motion.h2>
          <div className="mt-8 grid h-[70vh] gap-4 md:grid-cols-12">
            {gallery.map((image, idx) => (
              <div key={image} className={`gallery-item overflow-hidden rounded-[1.4rem] border border-white/15 ${idx === 0 ? "md:col-span-5" : "md:col-span-3"}`}>
                <img src={image} alt="Galería editorial" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-6 absolute inset-0 grid items-center px-6 text-center md:px-10">
          <motion.div style={{ y: ctaTitleY, opacity: ctaTitleOpacity }} className="mx-auto max-w-4xl">
            <p className="cta-item text-xs uppercase tracking-[0.25em] text-white/55">Story 06 · Final CTA</p>
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
          </motion.div>
        </article>
      </div>
    </section>
  );
}
