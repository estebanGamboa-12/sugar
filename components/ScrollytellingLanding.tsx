"use client";

import Image from "next/image";
import { useEffect, useRef, type DependencyList, type RefObject } from "react";

type Cleanup = () => void;

type UseGSAPConfig = {
  dependencies?: DependencyList;
  scope?: RefObject<HTMLElement | null>;
};

type GsapLike = {
  registerPlugin: (...plugins: unknown[]) => void;
  context: (fn: () => void, scope?: HTMLElement | null) => { revert: () => void };
  fromTo: (target: gsapTarget, fromVars: gsapVars, toVars: gsapVars) => void;
  to: (target: gsapTarget, vars: gsapVars) => void;
  set: (target: gsapTarget, vars: gsapVars) => void;
  timeline: (vars?: gsapVars) => {
    fromTo: (target: gsapTarget, fromVars: gsapVars, toVars: gsapVars, position?: string | number) => unknown;
    to: (target: gsapTarget, vars: gsapVars, position?: string | number) => unknown;
  };
};

type ScrollTriggerLike = {
  create: (vars: gsapVars) => { kill: () => void };
  update: () => void;
  getAll: () => Array<{ kill: () => void }>;
};

type LenisLike = {
  raf: (time: number) => void;
  on: (event: "scroll", callback: () => void) => void;
  destroy: () => void;
};

type gsapTarget = string | Element | Element[] | null;
type gsapVars = Record<string, unknown>;

declare global {
  interface Window {
    gsap?: GsapLike;
    ScrollTrigger?: ScrollTriggerLike;
    Lenis?: new (config: Record<string, unknown>) => LenisLike;
  }
}

async function loadScript(src: string): Promise<void> {
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Error cargando script: ${src}`));
    document.body.appendChild(script);
  });
}

function useGSAP(callback: () => Cleanup | void, config: UseGSAPConfig = {}) {
  const { dependencies = [], scope } = config;

  useEffect(() => {
    const cleanup = callback();
    return () => {
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, ...dependencies]);
}

const images = {
  hero: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=2000&q=80",
  split: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1600&q=80",
  curtain: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=2000&q=80",
  bento1: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
  bento2: "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=1200&q=80",
  bento3: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80",
  bento4: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
  film1: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80",
  film2: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80",
  film3: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
};

const testimonials = [
  "El maridaje de postres y luces fue una obra maestra.",
  "Sentí que cada plato tenía su propia banda sonora.",
  "El mejor scrollytelling culinario convertido en cena real.",
];

export function ScrollytellingLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLElement>(null);
  const scene2Ref = useRef<HTMLElement>(null);
  const scene3Ref = useRef<HTMLElement>(null);
  const scene4Ref = useRef<HTMLElement>(null);
  const scene5Ref = useRef<HTMLElement>(null);
  const scene6Ref = useRef<HTMLElement>(null);
  const scene7Ref = useRef<HTMLElement>(null);
  const scene8Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let lenis: LenisLike | undefined;
    let rafId = 0;
    let isActive = true;

    const initLenis = async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/lenis@1.1.16/dist/lenis.min.js");
      if (!window.Lenis || !isActive) {
        return;
      }

      lenis = new window.Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(loop);
      };

      loop(performance.now());
    };

    initLenis();

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  useGSAP(
    () => {
      let gsapContext: { revert: () => void } | undefined;
      let cleanupReady = false;

      const initGsap = async () => {
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js");

        if (!window.gsap || !window.ScrollTrigger || !rootRef.current || cleanupReady) {
          return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        gsapContext = gsap.context(() => {
          if (!scene1Ref.current || !scene2Ref.current || !scene3Ref.current || !scene4Ref.current || !scene5Ref.current || !scene6Ref.current || !scene7Ref.current || !scene8Ref.current) {
            return;
          }

          gsap.fromTo(
            ".scene-1-image",
            { scale: 1.5, immediateRender: false, overwrite: "auto" },
            {
              scale: 1,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene1Ref.current,
                start: "top top",
                end: "+=140%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".scene-2-copy",
            { filter: "blur(20px)", opacity: 0.2, immediateRender: false, overwrite: "auto" },
            {
              filter: "blur(0px)",
              opacity: 1,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene2Ref.current,
                start: "top top",
                end: "+=130%",
                pin: true,
                scrub: 1,
              },
            },
          );

          const splitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene3Ref.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
            },
          });

          splitTimeline.fromTo(
            ".scene-3-media",
            { xPercent: -16, immediateRender: false, overwrite: "auto" },
            { xPercent: 12, immediateRender: false, overwrite: "auto", ease: "none" },
            0,
          );

          splitTimeline.fromTo(
            ".scene-3-text",
            { xPercent: 18, immediateRender: false, overwrite: "auto" },
            { xPercent: -10, immediateRender: false, overwrite: "auto", ease: "none" },
            0,
          );

          gsap.fromTo(
            ".scene-4-curtain",
            { yPercent: 0, immediateRender: false, overwrite: "auto" },
            {
              yPercent: -101,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene4Ref.current,
                start: "top top",
                end: "+=130%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".bento-card",
            { opacity: 0, y: 80, scale: 0.9, immediateRender: false, overwrite: "auto" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.2,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene5Ref.current,
                start: "top top",
                end: "+=130%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".filmstrip-track",
            { x: "0vw", immediateRender: false, overwrite: "auto" },
            {
              x: "-200vw",
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene6Ref.current,
                start: "top top",
                end: "+=220%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.set(".testimonial", { opacity: 0, immediateRender: false, overwrite: "auto" });

          const testimonialsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene7Ref.current,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 1,
            },
          });

          testimonialsTimeline.to(".testimonial-0", { opacity: 1, immediateRender: false, overwrite: "auto", ease: "none" });
          testimonialsTimeline.to(".testimonial-0", { opacity: 0, immediateRender: false, overwrite: "auto", ease: "none" });
          testimonialsTimeline.to(".testimonial-1", { opacity: 1, immediateRender: false, overwrite: "auto", ease: "none" });
          testimonialsTimeline.to(".testimonial-1", { opacity: 0, immediateRender: false, overwrite: "auto", ease: "none" });
          testimonialsTimeline.to(".testimonial-2", { opacity: 1, immediateRender: false, overwrite: "auto", ease: "none" });

          ScrollTrigger.create({
            trigger: scene7Ref.current,
            start: "bottom bottom",
            end: "+=60%",
            scrub: 1,
            pin: true,
            onUpdate: (self: { progress: number }) => {
              const progress = self.progress;
              gsap.to(scene8Ref.current, {
                opacity: progress,
                immediateRender: false,
                overwrite: "auto",
                duration: 0.2,
              });

              if (progress > 0.98) {
                scene8Ref.current?.classList.remove("pointer-events-none");
              } else {
                scene8Ref.current?.classList.add("pointer-events-none");
              }
            },
          });
        }, rootRef.current);
      };

      initGsap();

      return () => {
        cleanupReady = true;
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
        gsapContext?.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} className="min-h-screen w-full bg-[#000] text-[#fff]">
      <section ref={scene1Ref} className="relative z-10 flex h-screen items-center justify-center overflow-hidden">
        <Image src={images.hero} alt="Hero de pastelería de lujo" fill priority className="scene-1-image object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 text-center">
          <p className="font-mono text-xs tracking-[0.5em] text-white/80">ATELIER NOIR · PÂTISSERIE</p>
          <h1 className="mt-4 font-serif text-5xl md:text-8xl">Donde el postre dirige la escena</h1>
        </div>
      </section>

      <section ref={scene2Ref} className="relative z-20 flex h-screen items-center justify-center bg-black px-8">
        <p className="scene-2-copy max-w-5xl text-center font-serif text-3xl leading-tight md:text-6xl">
          Cada pase nace en silencio, con técnica francesa y servicio coreografiado para una noche inolvidable.
        </p>
      </section>

      <section ref={scene3Ref} className="relative z-30 grid h-screen grid-cols-1 items-center gap-8 bg-black px-6 md:grid-cols-2 md:px-16">
        <div className="scene-3-media relative h-[58vh] overflow-hidden rounded-3xl border border-white/20 md:h-[72vh]">
          <Image src={images.split} alt="Chef preparando un postre" fill priority className="object-cover" />
        </div>
        <div className="scene-3-text">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/70">SPLIT EXPERIENCE</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">Texturas opuestas. Dirección compartida.</h2>
          <p className="mt-4 max-w-xl font-mono text-sm text-white/80">
            Helado de vainilla ahumada, ganache 70%, reducción de frutos rojos y crujiente de almendra tostada en montaje teatral.
          </p>
        </div>
      </section>

      <section ref={scene4Ref} className="relative z-40 h-screen overflow-hidden bg-black">
        <Image src={images.curtain} alt="Sala de restaurante de lujo" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="font-serif text-5xl md:text-7xl">La cocina abre el telón</h2>
        </div>
        <div className="scene-4-curtain absolute inset-0 bg-black" />
      </section>

      <section ref={scene5Ref} className="relative z-50 flex h-screen items-center bg-black px-6 md:px-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          <article className="bento-card relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6">
            <Image src={images.bento1} alt="Tarta de frutos rojos" fill priority className="object-cover opacity-30" />
            <div className="relative z-10">
              <h3 className="font-serif text-3xl">Signature Cakes</h3>
              <p className="mt-2 font-mono text-xs text-white/80">Selección diaria de tartas de autor.</p>
            </div>
          </article>
          <article className="bento-card relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6">
            <Image src={images.bento2} alt="Postre individual gourmet" fill priority className="object-cover opacity-30" />
            <div className="relative z-10">
              <h3 className="font-serif text-3xl">Dessert Pairing</h3>
              <p className="mt-2 font-mono text-xs text-white/80">Maridaje de café de especialidad y notas de cacao.</p>
            </div>
          </article>
          <article className="bento-card relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6">
            <Image src={images.bento3} alt="Mesa elegante en restaurante" fill priority className="object-cover opacity-30" />
            <div className="relative z-10">
              <h3 className="font-serif text-3xl">Private Tasting</h3>
              <p className="mt-2 font-mono text-xs text-white/80">Experiencia inmersiva para grupos reducidos.</p>
            </div>
          </article>
          <article className="bento-card relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6">
            <Image src={images.bento4} alt="Tarta de chocolate premium" fill priority className="object-cover opacity-30" />
            <div className="relative z-10">
              <h3 className="font-serif text-3xl">Midnight Service</h3>
              <p className="mt-2 font-mono text-xs text-white/80">Última reserva, máxima intimidad.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={scene6Ref} className="relative z-[60] h-screen overflow-hidden bg-black">
        <div className="filmstrip-track flex h-full w-[300vw] gap-6 p-8">
          <figure className="relative h-full w-[100vw] overflow-hidden rounded-3xl border border-white/20">
            <Image src={images.film1} alt="Tarta decorada en vitrina" fill priority className="object-cover" />
          </figure>
          <figure className="relative h-full w-[100vw] overflow-hidden rounded-3xl border border-white/20">
            <Image src={images.film2} alt="Plato gastronómico en primer plano" fill priority className="object-cover" />
          </figure>
          <figure className="relative h-full w-[100vw] overflow-hidden rounded-3xl border border-white/20">
            <Image src={images.film3} alt="Salón de restaurante nocturno" fill priority className="object-cover" />
          </figure>
        </div>
      </section>

      <section ref={scene7Ref} className="relative z-[70] h-screen bg-black px-6">
        <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center text-center">
          {testimonials.map((text, index) => (
            <article key={text} className={`testimonial testimonial-${index} absolute inset-0 flex items-center justify-center`}>
              <p className="font-serif text-4xl leading-tight md:text-6xl">“{text}”</p>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={scene8Ref}
        className="pointer-events-none fixed inset-0 z-[80] flex h-screen items-center justify-center bg-black px-6 opacity-0"
      >
        <div className="text-center">
          <h2 className="font-serif text-5xl md:text-7xl">Reserva tu mesa secreta</h2>
          <button className="cta-pulse mt-10 rounded-full border border-white px-10 py-4 font-mono text-sm tracking-[0.35em]">
            RESERVAR AHORA
          </button>
          <p className="mt-8 font-mono text-xs tracking-[0.35em] text-white/75">GRAN VÍA · MADRID · SOLO CON RESERVA</p>
        </div>
      </section>
    </main>
  );
}
