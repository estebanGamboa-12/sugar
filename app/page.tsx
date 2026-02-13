"use client";

import { ReactLenis, type ReactLenisRef } from "@lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const pinnedTexts = [
  "Fermentamos masas por 48 horas para una miga perfecta.",
  "Decoramos cada plato al momento con precisión de joyería.",
  "Cada servicio está coreografiado como una obra en 5 actos.",
];

const dishes = [
  {
    title: "Noir 70%",
    description: "Mousse de cacao, avellana caramelizada y sal en escamas.",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Ruby Fruits",
    description: "Frutos rojos, crema diplomática y crumble de mantequilla.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Pistacho Atelier",
    description: "Praliné de pistacho iraní y glaseado espejo brillante.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Cítrico Imperial",
    description: "Yuzu, lima y merengue italiano sobre base sablée.",
    image:
      "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Home() {
  const lenisRef = useRef<ReactLenisRef>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLSectionElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const pinnedRef = useRef<HTMLSectionElement>(null);
  const pinnedPhraseRefs = useRef<HTMLParagraphElement[]>([]);

  const galleryRef = useRef<HTMLSectionElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  const colorShiftRef = useRef<HTMLSectionElement>(null);

  const contactRef = useRef<HTMLSectionElement>(null);
  const contactItemsRef = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const lenis = lenisRef.current?.lenis;

    const lenisTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (heroRef.current && heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (pinnedRef.current) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedRef.current,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: true,
          },
        });

        pinnedPhraseRefs.current.forEach((phrase) => {
          timeline
            .fromTo(phrase, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.75 })
            .to(phrase, { autoAlpha: 0, y: -40, duration: 0.75 }, "+=0.35");
        });
      }

      if (galleryRef.current && galleryTrackRef.current) {
        const getAmount = () => galleryTrackRef.current!.scrollWidth - galleryRef.current!.clientWidth;

        gsap.to(galleryTrackRef.current, {
          x: () => -getAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top top",
            end: () => `+=${Math.max(getAmount() + 1000, 2200)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (pageRef.current && colorShiftRef.current) {
        gsap.fromTo(
          pageRef.current,
          { backgroundColor: "#050505", color: "#f4eee3" },
          {
            backgroundColor: "#f5ecd9",
            color: "#171717",
            ease: "none",
            scrollTrigger: {
              trigger: colorShiftRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: true,
            },
          },
        );
      }

      if (contactRef.current) {
        gsap.fromTo(
          contactItemsRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 78%",
              end: "top 38%",
              scrub: true,
            },
          },
        );
      }
    }, pageRef);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(lenisTick);
      }
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <main ref={pageRef} className="bg-[#050505] text-[#f4eee3]">
        <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
          <div
            ref={heroBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 px-6 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] md:text-sm">Escena 1 · Hero</p>
            <h1 className="text-5xl font-semibold md:text-8xl">Noir Tartas</h1>
          </div>
        </section>

        <section ref={pinnedRef} className="relative flex h-screen items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#242424_0%,_#070707_70%)]" />
          <div className="relative z-10 max-w-4xl text-center">
            <p className="mb-8 text-xs uppercase tracking-[0.35em] text-current/70">Escena 2 · Pinned story</p>
            {pinnedTexts.map((text, index) => (
              <p
                key={text}
                ref={(node) => {
                  if (node) pinnedPhraseRefs.current[index] = node;
                }}
                className="absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-3xl font-medium opacity-0 md:text-5xl"
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        <section ref={galleryRef} className="overflow-hidden px-4 py-16 md:h-screen md:px-8 md:py-20">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-current/70">Escena 3 · La Carta</p>
          <div ref={galleryTrackRef} className="flex gap-6">
            {dishes.map((dish) => (
              <article
                key={dish.title}
                className="min-w-[82vw] rounded-3xl border border-current/20 bg-current/5 p-4 md:min-w-[44vw]"
              >
                <div
                  className="h-[62vh] rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${dish.image}')` }}
                />
                <h2 className="mt-4 text-3xl md:text-4xl">{dish.title}</h2>
                <p className="mt-2 text-current/80">{dish.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={colorShiftRef}
          className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-current/70">Escena 4 · Cambio de color</p>
          <h2 className="mt-6 max-w-3xl text-4xl md:text-7xl">Del noir profundo al crema cálido.</h2>
        </section>

        <section ref={contactRef} className="px-6 pb-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-current/30 bg-current/5 p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-current/70">Escena 5 · Contacto</p>
            <h3 className="mt-3 text-3xl md:text-5xl">Diseñemos tu experiencia</h3>
            <form className="mt-8 space-y-4">
              {[
                { type: "text", placeholder: "Nombre completo" },
                { type: "email", placeholder: "Correo electrónico" },
              ].map((field, index) => (
                <input
                  key={field.placeholder}
                  ref={(node) => {
                    contactItemsRef.current[index] = node;
                  }}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-current/35 bg-transparent px-4 py-3 outline-none placeholder:text-current/45"
                />
              ))}
              <textarea
                ref={(node) => {
                  contactItemsRef.current[2] = node;
                }}
                rows={5}
                placeholder="Cuéntanos fecha, número de personas y ocasión"
                className="w-full rounded-xl border border-current/35 bg-transparent px-4 py-3 outline-none placeholder:text-current/45"
              />
              <button
                ref={(node) => {
                  contactItemsRef.current[3] = node;
                }}
                type="submit"
                className="w-full rounded-xl border border-current bg-current px-4 py-3 text-sm uppercase tracking-[0.25em] text-[#f5ecd9]"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}
