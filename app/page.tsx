"use client";

import Image from "next/image";
import { useEffect, useRef, type DependencyList } from "react";

type CleanupFn = () => void;

type GsapLike = {
  registerPlugin: (plugin: unknown) => void;
  context: (fn: () => void, scope: { current: HTMLDivElement | null }) => { revert: () => void };
  fromTo: (target: string | Element, fromVars: object, toVars: object) => void;
  timeline: (vars: object) => {
    set: (target: string, vars: object, position?: number) => ReturnType<GsapLike["timeline"]>;
    to: (target: string, vars: object, position?: number) => ReturnType<GsapLike["timeline"]>;
  };
  utils: {
    toArray: (selector: string) => Element[];
  };
};

type LenisInstance = {
  on: (event: string, cb: () => void) => void;
  raf: (time: number) => void;
  destroy: () => void;
};

type ScrollTriggerLike = {
  update: () => void;
  matchMedia: (queries: Record<string, () => void>) => void;
  getAll?: () => Array<{ kill: () => void }>;
};


declare global {
  interface Window {
    gsap?: unknown;
    ScrollTrigger?: unknown;
    Lenis?: unknown;
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar: ${src}`));
    document.body.appendChild(script);
  });
}

function useGSAP(setup: () => CleanupFn | void, deps: DependencyList) {
  useEffect(() => {
    const cleanup = setup();
    return () => {
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const highlights = ["Reservas", "Carta", "Horarios", "Instagram"];
const gallery = ["/next.svg", "/globe.svg", "/window.svg", "/vercel.svg", "/file.svg"];

const testimonials = [
  { quote: "Cada plato se siente como una escena que no quieres que termine.", author: "Lucía M." },
  { quote: "Luz tenue, servicio impecable y una narrativa gastronómica brillante.", author: "Javier R." },
  { quote: "Noir Atelier convirtió una cena en una película íntima.", author: "Elena T." },
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    let lenis: LenisInstance | undefined;
    let mounted = true;

    const bootstrap = async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js");
      if (!mounted || !window.gsap || !window.ScrollTrigger || !window.Lenis) return;

      const gsap = window.gsap as GsapLike;
      const ScrollTrigger = window.ScrollTrigger as ScrollTriggerLike;
      gsap.registerPlugin(ScrollTrigger);

      const LenisCtor = window.Lenis as new (options: { lerp: number; smoothWheel: boolean }) => LenisInstance;
      lenis = new LenisCtor({ lerp: 0.08, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".scene-1-image",
          { scale: 1.2 },
          {
            scale: 1,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-1", start: "top top", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-1-title",
          { autoAlpha: 0, yPercent: 20 },
          {
            autoAlpha: 1,
            yPercent: 0,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-1", start: "top 70%", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-2-text",
          { filter: "blur(18px)", autoAlpha: 0 },
          {
            filter: "blur(0px)",
            autoAlpha: 1,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-2", start: "top 80%", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-3-image",
          { xPercent: -20 },
          {
            xPercent: 18,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-3", start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-3-text",
          { xPercent: 20 },
          {
            xPercent: -16,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-3", start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-4-curtain-left",
          { xPercent: 0 },
          {
            xPercent: -102,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-4", start: "top 75%", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".scene-4-curtain-right",
          { xPercent: 0 },
          {
            xPercent: 102,
            immediateRender: false,
            ease: "none",
            scrollTrigger: { trigger: ".scene-4", start: "top 75%", end: "bottom top", scrub: 1 },
          },
        );

        gsap.utils.toArray(".highlight-card").forEach((card: Element) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, scale: 0.8 },
            {
              autoAlpha: 1,
              scale: 1,
              immediateRender: false,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 90%", end: "bottom 55%", scrub: 1 },
            },
          );
        });

        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            gsap.fromTo(
              ".filmstrip-track",
              { xPercent: 12 },
              {
                xPercent: -68,
                immediateRender: false,
                ease: "none",
                scrollTrigger: { trigger: ".scene-6", start: "top bottom", end: "bottom top", scrub: 1 },
              },
            );
          },
        });

        const voices = gsap.timeline({
          scrollTrigger: { trigger: ".scene-7", start: "top top", end: "+=220%", pin: true, scrub: 1 },
        });

        voices
          .set(".voice-item", { autoAlpha: 0 }, 0)
          .to(".voice-0", { autoAlpha: 1, duration: 1, immediateRender: false }, 0)
          .to(".voice-0", { autoAlpha: 0, duration: 1, immediateRender: false }, 1)
          .to(".voice-1", { autoAlpha: 1, duration: 1, immediateRender: false }, 1)
          .to(".voice-1", { autoAlpha: 0, duration: 1, immediateRender: false }, 2)
          .to(".voice-2", { autoAlpha: 1, duration: 1.2, immediateRender: false }, 2);
      }, rootRef);

      return () => {
        ctx.revert();
      };
    };

    let ctxCleanup: CleanupFn | void;
    bootstrap().then((maybeCleanup) => {
      if (typeof maybeCleanup === "function") ctxCleanup = maybeCleanup;
    });

    return () => {
      mounted = false;
      ctxCleanup?.();
      lenis?.destroy();
      const triggers = (window.ScrollTrigger as { getAll?: () => Array<{ kill: () => void }> } | undefined)?.getAll?.();
      triggers?.forEach((st) => st.kill());
    };
  }, []);

  return (
    <main ref={rootRef} className="bg-black text-white">
      {/* ===================== ESCENA 1 · INTRO ===================== */}
      <section className="scene-1 relative z-10 h-screen overflow-hidden">
        <Image src="/window.svg" alt="Salón de lujo" fill priority className="scene-1-image object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        <div className="scene-1-title absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.65em] text-white/80">Maison Gastronomique</p>
          <h1 className="text-4xl md:text-7xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
            NOIR ATELIER
          </h1>
        </div>
      </section>

      {/* ===================== ESCENA 2 · FILOSOFÍA ===================== */}
      <section className="scene-2 relative z-20 flex h-screen items-center justify-center px-6 text-center">
        <p className="scene-2-text max-w-4xl text-3xl md:text-6xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
          Una noche diseñada como cine lento
        </p>
      </section>

      {/* ===================== ESCENA 3 · DETALLE ===================== */}
      <section className="scene-3 relative z-30 grid h-screen items-center gap-8 overflow-hidden px-6 md:grid-cols-2 md:px-14">
        <div className="relative h-[50vh] overflow-hidden rounded-3xl border border-white/20 md:h-[72vh]">
          <Image src="/globe.svg" alt="Close-up de plato" fill priority className="scene-3-image object-cover opacity-65" />
        </div>
        <div className="scene-3-text space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-white/70">Detalle</p>
          <h2 className="text-3xl leading-tight md:text-5xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
            Ingredientes precisos.
            <br />
            Ritmo contemplativo.
          </h2>
        </div>
      </section>

      {/* ===================== ESCENA 4 · EL PROCESO ===================== */}
      <section className="scene-4 relative z-40 h-screen overflow-hidden">
        <Image src="/vercel.svg" alt="Cocina en acción" fill priority className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="text-4xl md:text-6xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
            El proceso detrás del silencio
          </h2>
        </div>
        <div className="scene-4-curtain-left absolute inset-y-0 left-0 w-1/2 bg-black" />
        <div className="scene-4-curtain-right absolute inset-y-0 right-0 w-1/2 bg-black" />
      </section>

      {/* ===================== ESCENA 5 · BENTO HIGHLIGHTS ===================== */}
      <section className="scene-5 relative z-50 min-h-screen px-6 py-24 md:px-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-center text-sm uppercase tracking-[0.4em] text-white/70">Bento Highlights</p>
          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((item) => (
              <article key={item} className="highlight-card rounded-2xl border border-white/20 bg-white/5 p-10 backdrop-blur-sm">
                <h3 className="text-3xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
                  {item}
                </h3>
                <p className="mt-4 text-white/70">Accede en segundos a lo esencial de Noir Atelier.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ESCENA 6 · FILMSTRIP ===================== */}
      <section className="scene-6 relative z-[60] min-h-screen overflow-hidden px-6 py-24 md:px-14">
        <p className="mb-10 text-center text-sm uppercase tracking-[0.4em] text-white/70">Filmstrip Gallery</p>
        <div className="filmstrip-track hidden gap-6 md:flex">
          {gallery.map((src, i) => (
            <figure key={`${src}-${i}`} className="relative h-[65vh] min-w-[28vw] overflow-hidden rounded-2xl border border-white/20 bg-neutral-900">
              <Image src={src} alt={`Foto de galería ${i + 1}`} fill className="object-cover p-10 opacity-80" />
            </figure>
          ))}
        </div>
        <div className="grid gap-4 md:hidden">
          {gallery.map((src, i) => (
            <figure key={`mobile-${src}-${i}`} className="relative h-72 overflow-hidden rounded-xl border border-white/20 bg-neutral-900">
              <Image src={src} alt={`Foto móvil ${i + 1}`} fill className="object-cover p-8 opacity-80" />
            </figure>
          ))}
        </div>
      </section>

      {/* ===================== ESCENA 7 · VOCES ===================== */}
      <section className="scene-7 relative z-[70] h-screen px-6 md:px-14">
        <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center text-center">
          {testimonials.map((item, idx) => (
            <article key={item.author} className={`voice-item voice-${idx} absolute inset-0 flex flex-col items-center justify-center gap-6`}>
              <blockquote className="text-3xl leading-tight md:text-5xl" style={{ fontFamily: "Georgia, Times New Roman, serif" }}>
                “{item.quote}”
              </blockquote>
              <p className="text-sm uppercase tracking-[0.35em] text-white/75">{item.author}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== ESCENA 8 · CTA FINAL ===================== */}
      <section className="scene-8 relative z-[80] flex min-h-screen flex-col items-center justify-center gap-8 bg-black px-6 text-center">
        <button className="rounded-full border border-white/60 px-10 py-5 text-lg tracking-[0.28em] shadow-[0_0_35px_rgba(255,255,255,0.28)] transition hover:scale-[1.03]">
          RESERVAR MESA
        </button>
        <p className="text-sm uppercase tracking-[0.25em] text-white/70">Calle Lumière 17 · Madrid · Noir Atelier</p>
      </section>
    </main>
  );
}
