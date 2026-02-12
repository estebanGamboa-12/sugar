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

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.55]);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.set(".scene", { autoAlpha: 0 });
      gsap.set(".scene-1", { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          markers: SHOW_MARKERS,
          invalidateOnRefresh: true,
        },
      });

      tl.to(frameRef.current, { scale: 1.25, clipPath: "inset(0% 0% 0% 0% round 0rem)", borderRadius: 0, duration: 1 });

      tl.to(".scene-1", { autoAlpha: 0, duration: 0.45 }, ">")
        .to(".scene-2", { autoAlpha: 1, duration: 0.45 }, "<")
        .fromTo(
          portraitRevealRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", yPercent: 8 },
          { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.8 },
          "<",
        )
        .fromTo(".diagonal-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6 }, "<0.1")
        .to(".scene-2", { autoAlpha: 0, duration: 0.45 }, "+=0.8")
        .to(".scene-3", { autoAlpha: 1, duration: 0.45 }, "<")
        .fromTo(
          ".bento-card",
          { autoAlpha: 0, y: 60, clipPath: "inset(0% 0% 100% 0% round 1.2rem)" },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 1.2rem)",
            stagger: 0.08,
            duration: 0.55,
          },
          "<0.1",
        )
        .to(".scene-3", { autoAlpha: 0, duration: 0.45 }, "+=0.9")
        .to(".scene-4", { autoAlpha: 1, duration: 0.45 }, "<")
        .fromTo(
          ".gallery-item",
          { clipPath: "inset(0% 0% 100% 0% round 1.3rem)", y: 45 },
          { clipPath: "inset(0% 0% 0% 0% round 1.3rem)", y: 0, duration: 0.8, stagger: 0.13 },
          "<",
        )
        .to(".scene-4", { autoAlpha: 0, duration: 0.45 }, "+=0.8")
        .to(".scene-5", { autoAlpha: 1, duration: 0.45 }, "<")
        .fromTo(".quote-item", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.2, duration: 0.6 }, "<0.1")
        .to(".scene-5", { autoAlpha: 0, duration: 0.45 }, "+=0.9")
        .to(".scene-6", { autoAlpha: 1, duration: 0.45 }, "<")
        .fromTo(".cta-item", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.55 }, "<0.1");

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-clip">
      <div className="relative h-full w-full">
        <article className="scene scene-1 absolute inset-0 px-6 py-10 md:px-10">
          <div ref={frameRef} className="h-full w-full overflow-hidden border border-white/20 bg-black [clip-path:inset(8%_8%_12%_8%_round_2.4rem)]">
            <img
              src="https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1800&q=80"
              alt="Postres de autor"
              className="h-full w-full object-cover"
            />
            <motion.div style={{ y: titleY, opacity: titleOpacity }} className="absolute inset-x-0 top-[16%] px-6 md:px-12">
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
            <div className="md:col-span-5 md:self-end">
              <div className="diagonal-line mb-8 h-px w-full rotate-[-18deg] bg-white/40" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Lucía Ferrer · Creative Chef</p>
              <p className="mt-3 max-w-md text-2xl leading-tight text-white/88">“Cada plato es un encuadre. Cada textura, una línea en la narrativa.”</p>
            </div>
          </div>
        </article>

        <article className="scene scene-3 absolute inset-0 px-6 py-14 md:px-10">
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.88]">Bento Highlights</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
            {bentoItems.map((item) => (
              <div key={item} className="bento-card rounded-[1.4rem] border border-white/15 bg-white/[0.05] p-5 md:col-span-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item}</p>
                <p className="mt-4 text-2xl text-white/90">{item === "Instagram" ? "@noiratelier" : `Explorar ${item.toLowerCase()}`}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-4 absolute inset-0 px-6 py-12 md:px-10">
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.9]">Gallery Strip</h2>
          <div className="mt-8 grid h-[70vh] gap-4 md:grid-cols-12">
            {gallery.map((image, idx) => (
              <div key={image} className={`gallery-item overflow-hidden rounded-[1.4rem] border border-white/15 ${idx === 0 ? "md:col-span-5" : "md:col-span-3"}`}>
                <img src={image} alt="Galería editorial" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </article>

        <article className="scene scene-5 absolute inset-0 grid items-center px-6 md:px-10">
          <div>
            <h2 className="quote-item font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.88]">Voces de la mesa.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <blockquote className="quote-item rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-xl text-white/88">
                “La mejor secuencia de sabores que hemos probado este año.”
              </blockquote>
              <blockquote className="quote-item rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-xl text-white/88">
                “Ritmo perfecto entre sala, cocina y storytelling visual.”
              </blockquote>
            </div>
          </div>
        </article>

        <article className="scene scene-6 absolute inset-0 grid items-center px-6 text-center md:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="cta-item text-xs uppercase tracking-[0.25em] text-white/55">Scene 06 · Final CTA</p>
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
