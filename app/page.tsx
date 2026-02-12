"use client";

import Image from "next/image";
import { useEffect, useRef, type DependencyList, type RefObject } from "react";

type Cleanup = () => void;

type UseGSAPConfig = {
  dependencies?: DependencyList;
  scope?: RefObject<HTMLElement | null>;
};

type GsapTarget = string | Element | Element[] | null;
type GsapVars = Record<string, unknown>;

type GsapLike = {
  registerPlugin: (...plugins: unknown[]) => void;
  context: (fn: () => void, scope?: HTMLElement | null) => { revert: () => void };
  fromTo: (target: GsapTarget, fromVars: GsapVars, toVars: GsapVars) => void;
  to: (target: GsapTarget, vars: GsapVars) => void;
  set: (target: GsapTarget, vars: GsapVars) => void;
  timeline: (vars?: GsapVars) => {
    fromTo: (target: GsapTarget, fromVars: GsapVars, toVars: GsapVars, position?: string | number) => unknown;
    to: (target: GsapTarget, vars: GsapVars, position?: string | number) => unknown;
  };
};

type ScrollTriggerLike = {
  create: (vars: GsapVars) => { kill: () => void };
  update: () => void;
  refresh: () => void;
  getAll: () => Array<{ kill: () => void }>;
};

type LenisLike = {
  raf: (time: number) => void;
  on: (event: "scroll", callback: () => void) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    gsap?: GsapLike;
    ScrollTrigger?: ScrollTriggerLike;
    Lenis?: new (config: Record<string, unknown>) => LenisLike;
  }
}

const imageSources = {
  scene1: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=2400&q=80",
  scene3: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=2000&q=80",
  scene4: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=2200&q=80",
  bento1: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1500&q=80",
  bento2: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=1500&q=80",
  bento3: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=1500&q=80",
  bento4: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1500&q=80",
  film1: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1700&q=80",
  film2: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1700&q=80",
  film3: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1700&q=80",
  film4: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1700&q=80",
  film5: "https://images.unsplash.com/photo-1559622214-4f79e6d245c6?auto=format&fit=crop&w=1700&q=80",
  film6: "https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?auto=format&fit=crop&w=1700&q=80",
};

const testimonials = [
  "La noche empezó como una cena y terminó como una película que no quería que acabara.",
  "Cada tarta tenía una textura visual, un ritmo de luz y un final perfecto.",
  "Nunca había sentido el servicio tan coreografiado: elegante, oscuro, memorable.",
  "Si el lujo tuviera sabor, sonaría exactamente como este menú.",
];

const filmFrames = [
  imageSources.film1,
  imageSources.film2,
  imageSources.film3,
  imageSources.film4,
  imageSources.film5,
  imageSources.film6,
  imageSources.film1,
  imageSources.film2,
  imageSources.film3,
];

async function loadScript(src: string): Promise<void> {
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
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

export default function Page() {
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
    let active = true;

    const setupLenis = async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/lenis@1.1.16/dist/lenis.min.js");
      if (!window.Lenis || !active) {
        return;
      }

      lenis = new window.Lenis({
        duration: 1.15,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      lenis.on("scroll", () => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.update();
        }
      });

      raf(performance.now());
    };

    setupLenis();

    return () => {
      active = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  useGSAP(
    () => {
      let context: { revert: () => void } | undefined;
      let disposed = false;

      const initGSAP = async () => {
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js");

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        if (!gsap || !ScrollTrigger || disposed || !rootRef.current) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          if (
            !scene1Ref.current ||
            !scene2Ref.current ||
            !scene3Ref.current ||
            !scene4Ref.current ||
            !scene5Ref.current ||
            !scene6Ref.current ||
            !scene7Ref.current ||
            !scene8Ref.current
          ) {
            return;
          }

          gsap.set(scene8Ref.current, { opacity: 0, immediateRender: false, overwrite: "auto" });

          gsap.fromTo(
            ".scene-1-hero-image",
            { scale: 1.5, immediateRender: false, overwrite: "auto" },
            {
              scale: 1,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene1Ref.current,
                start: "top top",
                end: "+=160%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".scene-2-typography",
            { filter: "blur(20px)", opacity: 0.2, yPercent: 20, immediateRender: false, overwrite: "auto" },
            {
              filter: "blur(0px)",
              opacity: 1,
              yPercent: 0,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene2Ref.current,
                start: "top top",
                end: "+=140%",
                pin: true,
                scrub: 1,
              },
            },
          );

          const scene3Timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene3Ref.current,
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: 1,
            },
          });

          scene3Timeline.fromTo(
            ".scene-3-parallax-image",
            { yPercent: 20, immediateRender: false, overwrite: "auto" },
            {
              yPercent: -20,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
            },
            0,
          );

          scene3Timeline.fromTo(
            ".scene-3-parallax-text",
            { yPercent: -12, immediateRender: false, overwrite: "auto" },
            {
              yPercent: 16,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
            },
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
                end: "+=150%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".scene-5-card",
            {
              opacity: 0,
              y: 100,
              rotate: (index: number) => (index % 2 === 0 ? -6 : 6),
              scale: 0.84,
              immediateRender: false,
              overwrite: "auto",
            },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              stagger: 0.12,
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene5Ref.current,
                start: "top top",
                end: "+=170%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.fromTo(
            ".scene-6-film-track",
            { x: "0%", immediateRender: false, overwrite: "auto" },
            {
              x: "-200%",
              immediateRender: false,
              overwrite: "auto",
              ease: "none",
              scrollTrigger: {
                trigger: scene6Ref.current,
                start: "top top",
                end: "+=280%",
                pin: true,
                scrub: 1,
              },
            },
          );

          gsap.set(".scene-7-quote", { opacity: 0, immediateRender: false, overwrite: "auto" });

          const scene7Timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene7Ref.current,
              start: "top top",
              end: "+=260%",
              pin: true,
              scrub: 1,
            },
          });

          scene7Timeline
            .to(".scene-7-quote-0", { opacity: 1, xPercent: -16, immediateRender: false, overwrite: "auto", ease: "none" }, 0)
            .to(".scene-7-quote-1", { opacity: 1, xPercent: 16, immediateRender: false, overwrite: "auto", ease: "none" }, 0)
            .to(".scene-7-quote-0", { opacity: 0.05, xPercent: -30, immediateRender: false, overwrite: "auto", ease: "none" })
            .to(".scene-7-quote-1", { opacity: 0.05, xPercent: 30, immediateRender: false, overwrite: "auto", ease: "none" }, "<")
            .to(".scene-7-quote-2", { opacity: 1, yPercent: -12, immediateRender: false, overwrite: "auto", ease: "none" })
            .to(".scene-7-quote-3", { opacity: 1, yPercent: 12, immediateRender: false, overwrite: "auto", ease: "none" }, "<")
            .to(".scene-7-quote-2", { opacity: 0.1, immediateRender: false, overwrite: "auto", ease: "none" })
            .to(".scene-7-quote-3", { opacity: 0.1, immediateRender: false, overwrite: "auto", ease: "none" }, "<");

          ScrollTrigger.create({
            trigger: scene7Ref.current,
            start: "bottom bottom",
            end: "+=120%",
            scrub: 1,
            onUpdate: (self: { progress: number }) => {
              const progress = self.progress;
              gsap.to(scene8Ref.current, {
                opacity: progress,
                immediateRender: false,
                overwrite: "auto",
                duration: 0.16,
              });

              if (progress > 0.92) {
                scene8Ref.current?.classList.remove("pointer-events-none");
              } else {
                scene8Ref.current?.classList.add("pointer-events-none");
              }
            },
          });

          ScrollTrigger.refresh();
        }, rootRef.current);
      };

      initGSAP();

      return () => {
        disposed = true;
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
        context?.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} className="relative min-h-screen w-full overflow-x-clip bg-[#050505] text-white">
      <section ref={scene1Ref} className="relative z-10 flex h-screen items-center justify-center overflow-hidden">
        <Image
          src={imageSources.scene1}
          alt="Salón noir con servicio de alta pastelería"
          fill
          priority
          className="scene-1-hero-image object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
        <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
          <p className="font-mono text-xs tracking-[0.55em] text-white/80">ATELIER NOIR · TARTAS COUTURE</p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.95] md:text-8xl">La noche empieza con una cucharada de sombra</h1>
          <p className="mx-auto mt-8 max-w-2xl font-mono text-[11px] tracking-[0.26em] text-white/70 md:text-xs">
            SCROLL PARA ENTRAR · SIN SNAP · SIN CORTES · SOLO TU RITMO
          </p>
        </div>
      </section>

      <section ref={scene2Ref} className="relative z-20 flex h-screen items-center justify-center bg-[#040404] px-8">
        <div className="scene-2-typography mx-auto max-w-6xl text-center">
          <p className="font-serif text-3xl leading-[1.12] md:text-7xl">
            Encendemos la sala en negro mate, bajamos el ruido del mundo y dejamos que el azúcar, el cacao y la mantequilla hagan
            dirección de arte en cada plato.
          </p>
          <p className="mx-auto mt-8 max-w-4xl font-mono text-[11px] tracking-[0.28em] text-white/65 md:text-xs">
            TEXTURA VISUAL · DRAMATURGIA SENSORIAL · SERVICIO COREOGRAFIADO
          </p>
        </div>
      </section>

      <section
        ref={scene3Ref}
        className="relative z-30 grid h-screen grid-cols-1 items-center gap-8 bg-[#070707] px-6 py-12 md:grid-cols-2 md:gap-14 md:px-16"
      >
        <div className="scene-3-parallax-image relative h-[58vh] overflow-hidden rounded-[2rem] border border-white/20 md:h-[74vh]">
          <Image
            src={imageSources.scene3}
            alt="Detalle de tarta de autor con frutos rojos"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
        <div className="scene-3-parallax-text relative z-10">
          <p className="font-mono text-xs tracking-[0.38em] text-white/70">PARALLAX PAIRING</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.03] md:text-6xl">La imagen sube.
            <br />
            El relato baja.
          </h2>
          <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-white/80 md:text-base">
            Bizcocho húmedo de chocolate 72%, mousse de vainilla bourbon, confitura de cereza negra y espejo de cacao puro. Un pase
            construido para sostener el silencio antes del aplauso.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] tracking-[0.26em] text-white/65 md:text-xs">
            <span className="rounded-full border border-white/25 px-4 py-2">ALTA PASTELERÍA</span>
            <span className="rounded-full border border-white/25 px-4 py-2">NOIR DINING</span>
            <span className="rounded-full border border-white/25 px-4 py-2">ART DESSERT</span>
          </div>
        </div>
      </section>

      <section ref={scene4Ref} className="relative z-40 h-screen overflow-hidden bg-black">
        <Image
          src={imageSources.scene4}
          alt="Cocina abierta de restaurante con iluminación cinematográfica"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-8 text-center">
          <div>
            <p className="font-mono text-xs tracking-[0.5em] text-white/80">ESCENA 4 · CORTINA</p>
            <h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-8xl">La cocina sube el telón</h2>
          </div>
        </div>
        <div className="scene-4-curtain absolute inset-0 z-20 bg-black" />
      </section>

      <section ref={scene5Ref} className="relative z-50 min-h-screen bg-[#040404] px-6 py-20 md:px-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 md:mb-14">
            <p className="font-mono text-xs tracking-[0.44em] text-white/70">ESCENA 5 · BENTO MENU</p>
            <h3 className="mt-4 max-w-4xl font-serif text-4xl leading-[1] md:text-6xl">Cuatro momentos para romper la noche en porciones perfectas.</h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="scene-5-card group relative min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/20 bg-white/[0.04] p-7">
              <Image src={imageSources.bento1} alt="Tarta de frutos rojos" fill className="object-cover opacity-40 transition group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/70">01 · SIGNATURE</p>
                <h4 className="mt-3 font-serif text-4xl">Tarta Rubí</h4>
                <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-white/75">
                  Frambuesa, lichi, pétalos cristalizados y crema de vainilla fría con acabado espejo.
                </p>
              </div>
            </article>

            <article className="scene-5-card group relative min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/20 bg-white/[0.04] p-7">
              <Image src={imageSources.bento2} alt="Postre individual de lujo" fill className="object-cover opacity-40 transition group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/70">02 · PAIRING</p>
                <h4 className="mt-3 font-serif text-4xl">Cacao Obsidiana</h4>
                <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-white/75">
                  Ganache 70%, sal marina ahumada y espresso lavado para un final seco y profundo.
                </p>
              </div>
            </article>

            <article className="scene-5-card group relative min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/20 bg-white/[0.04] p-7">
              <Image src={imageSources.bento3} alt="Mesa privada de degustación" fill className="object-cover opacity-40 transition group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/70">03 · PRIVATE TABLE</p>
                <h4 className="mt-3 font-serif text-4xl">Salón Secreto</h4>
                <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-white/75">
                  Cena inmersiva en formato íntimo para seis plazas, luz controlada y servicio invisible.
                </p>
              </div>
            </article>

            <article className="scene-5-card group relative min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/20 bg-white/[0.04] p-7">
              <Image src={imageSources.bento4} alt="Tarta de chocolate premium" fill className="object-cover opacity-40 transition group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/70">04 · MIDNIGHT</p>
                <h4 className="mt-3 font-serif text-4xl">Último Pase</h4>
                <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-white/75">
                  Cítricos oscuros, chocolate negro y crocante dorado para cerrar la noche con tensión.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section ref={scene6Ref} className="relative z-60 min-h-screen overflow-hidden bg-[#060606] py-16">
        <div className="mb-8 px-6 md:px-16">
          <p className="font-mono text-xs tracking-[0.45em] text-white/65">ESCENA 6 · FILMSTRIP</p>
          <h3 className="mt-4 max-w-4xl font-serif text-4xl leading-[1] md:text-6xl">Fotogramas de azúcar movidos por scroll vertical.</h3>
        </div>
        <div className="scene-6-film-track flex w-[300%] gap-5 px-6 md:gap-7 md:px-16">
          {filmFrames.map((frame, index) => (
            <figure key={`${frame}-${index}`} className="relative h-[62vh] w-[38vw] min-w-[280px] overflow-hidden rounded-[1.6rem] border border-white/20 md:h-[68vh] md:min-w-[360px]">
              <Image
                src={frame}
                alt={`Fotograma gastronómico ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 38vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
      </section>

      <section ref={scene7Ref} className="relative z-70 min-h-screen bg-black px-6 py-16 md:px-16">
        <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center text-center">
          <div className="relative h-[62vh] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.02]">
            <div className="scene-7-quote scene-7-quote-0 absolute inset-0 flex items-center justify-center px-6 mix-blend-screen">
              <p className="max-w-4xl font-serif text-3xl leading-[1.08] md:text-6xl">“{testimonials[0]}”</p>
            </div>
            <div className="scene-7-quote scene-7-quote-1 absolute inset-0 flex items-center justify-center px-6 mix-blend-difference">
              <p className="max-w-4xl font-serif text-3xl leading-[1.08] md:text-6xl">“{testimonials[1]}”</p>
            </div>
            <div className="scene-7-quote scene-7-quote-2 absolute inset-0 flex items-center justify-center px-6 mix-blend-lighten">
              <p className="max-w-4xl font-serif text-3xl leading-[1.08] md:text-6xl">“{testimonials[2]}”</p>
            </div>
            <div className="scene-7-quote scene-7-quote-3 absolute inset-0 flex items-center justify-center px-6 mix-blend-exclusion">
              <p className="max-w-4xl font-serif text-3xl leading-[1.08] md:text-6xl">“{testimonials[3]}”</p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={scene8Ref}
        className="pointer-events-none fixed inset-0 z-80 flex min-h-screen items-center justify-center bg-black px-6 opacity-0"
      >
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.48em] text-white/70">ESCENA 8 · CTA FINAL</p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.95] md:text-8xl">Tu mesa ya está en penumbra.</h2>
          <p className="mx-auto mt-6 max-w-2xl font-mono text-xs tracking-[0.2em] text-white/70 md:text-sm">
            RESERVAS LIMITADAS · EXPERIENCIA DEGUSTACIÓN DE 8 PASES · SOLO BAJO DISPONIBILIDAD
          </p>
          <button
            type="button"
            className="cta-glow mt-12 inline-flex items-center justify-center rounded-full border border-white px-11 py-4 font-mono text-xs tracking-[0.34em] text-white md:text-sm"
          >
            RESERVAR
          </button>
        </div>
      </section>

      <style jsx>{`
        .cta-glow {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }

        .cta-glow::before {
          content: "";
          position: absolute;
          top: -120%;
          left: -40%;
          width: 40%;
          height: 340%;
          background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
          transform: rotate(20deg);
          animation: glowSweep 2.3s linear infinite;
        }

        @keyframes glowSweep {
          0% {
            transform: translateX(-200%) rotate(20deg);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          65% {
            opacity: 0.9;
          }

          100% {
            transform: translateX(760%) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
