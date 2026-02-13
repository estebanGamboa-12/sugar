"use client";

import { ReactLenis } from "@lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useLayoutEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";

gsap.registerPlugin(ScrollTrigger);


const menuCards = [
  {
    title: "Tarta Noir 70%",
    description: "Ganache sedosa de cacao oscuro y sal de vainilla de Madagascar.",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Frutos Rubí",
    description: "Compota de frutos rojos, crema diplomática y crujiente de almendra.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pistacho Couture",
    description: "Praliné de pistacho iraní, mousse ligera y glaseado espejo.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cítrico Imperial",
    description: "Lima, yuzu y merengue italiano sobre base de sableé especiado.",
    image:
      "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1200&q=80",
  },
];

const craftPhrases = [
  "Masa laminada a mano cada madrugada.",
  "Horno de piedra calibrado al segundo.",
  "Detalle final con precisión de alta costura.",
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<HTMLParagraphElement[]>([]);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const parallaxImageRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (heroImageRef.current && heroRef.current) {
          gsap.fromTo(
            heroImageRef.current,
            { scale: 1.5, filter: "brightness(1)" },
            {
              scale: 1,
              filter: "brightness(0.58)",
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        if (heroTitleRef.current) {
          const letters = heroTitleRef.current.querySelectorAll("span");
          gsap.fromTo(
            letters,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 78%",
                end: "top 28%",
                scrub: 1,
              },
            },
          );
        }

        if (pinSectionRef.current) {
          const phraseTl = gsap.timeline({
            scrollTrigger: {
              trigger: pinSectionRef.current,
              start: "top top",
              end: "+=2000",
              pin: true,
              scrub: 1,
            },
          });

          phraseRefs.current.forEach((phrase, index) => {
            phraseTl
              .to(phrase, { opacity: 1, y: 0, duration: 0.9 })
              .to(phrase, { opacity: 0, y: -24, duration: 0.9 });
          });
        }

        if (horizontalSectionRef.current && horizontalTrackRef.current) {
          const cards = gsap.utils.toArray<HTMLElement>(".menu-card");
          const scrollAmount =
            horizontalTrackRef.current.scrollWidth - horizontalSectionRef.current.clientWidth;

          const horizontalTween = gsap.to(horizontalTrackRef.current, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: "top top",
              end: `+=${Math.max(scrollAmount + 900, 2200)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((_, index) => {
            const image = parallaxImageRefs.current[index];
            if (!image) return;
            gsap.fromTo(
              image,
              { xPercent: -12 },
              {
                xPercent: 12,
                ease: "none",
                scrollTrigger: {
                  trigger: horizontalSectionRef.current,
                  start: "top top",
                  end: `+=${Math.max(scrollAmount + 900, 2200)}`,
                  scrub: 1,
                },
              },
            );
          });

          return () => horizontalTween.scrollTrigger?.kill();
        }
      });

      mm.add("(max-width: 767px)", () => {
        if (heroImageRef.current && heroRef.current) {
          gsap.fromTo(
            heroImageRef.current,
            { scale: 1.2, filter: "brightness(1)" },
            {
              scale: 1,
              filter: "brightness(0.68)",
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        if (pinSectionRef.current) {
          gsap.to(phraseRefs.current, {
            opacity: 1,
            y: 0,
            stagger: 0.25,
            scrollTrigger: {
              trigger: pinSectionRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        }
      });

      if (rootRef.current && ctaRef.current) {
        gsap.fromTo(
          rootRef.current,
          { backgroundColor: "#000000", color: "#f8f4ea" },
          {
            backgroundColor: "#F5F5DC",
            color: "#0d0d0d",
            ease: "none",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 75%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      }

      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          fieldRefs.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      }

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const button = ctaButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    gsap.to(button, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleMagneticLeave = () => {
    if (!ctaButtonRef.current) return;
    gsap.to(ctaButtonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, syncTouch: true }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;700&display=swap");

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .font-inter {
          font-family: "Inter", sans-serif;
        }
      `}</style>
      <main
        ref={rootRef}
        className="bg-black text-[#f8f4ea] transition-colors duration-500"
      >
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <div
            ref={heroImageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="mb-6 font-inter text-xs uppercase tracking-[0.45em] text-[#f5f5dc]/80 md:text-sm">
              Pâtisserie Expérientielle
            </p>
            <h1
              ref={heroTitleRef}
              className="font-playfair text-5xl tracking-tight md:text-8xl"
              aria-label="Noir Tartas"
            >
              {"Noir Tartas".split("").map((char, index) => (
                <span key={`${char}-${index}`} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>
        </section>

        <section
          ref={pinSectionRef}
          className="relative flex h-screen items-center justify-center overflow-hidden px-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#262626_0%,_#050505_72%)]" />
          <div className="relative z-10 max-w-4xl space-y-4 text-center">
            {craftPhrases.map((phrase, index) => (
              <p
                key={phrase}
                ref={(node) => {
                  if (node) phraseRefs.current[index] = node;
                }}
                className="font-playfair text-2xl opacity-0 md:text-5xl"
              >
                {phrase}
              </p>
            ))}
          </div>
        </section>

        <section
          ref={horizontalSectionRef}
          className="relative overflow-hidden px-4 py-14 md:h-screen md:px-10 md:py-20"
        >
          <p className="mb-4 font-inter text-xs uppercase tracking-[0.35em] text-current/70 md:mb-6">
            La Carta de Autor
          </p>
          <div ref={horizontalTrackRef} className="flex gap-5 md:gap-8">
            {menuCards.map((card, index) => (
              <article
                key={card.title}
                className="menu-card h-[64vh] min-w-[82vw] rounded-3xl border border-current/25 bg-current/5 p-4 backdrop-blur-sm md:min-w-[46vw] md:p-6"
              >
                <div className="relative h-[70%] overflow-hidden rounded-2xl">
                  <div
                    ref={(node) => {
                      if (node) parallaxImageRefs.current[index] = node;
                    }}
                    className="h-full w-[120%] -translate-x-[8%] bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                </div>
                <h3 className="mt-4 font-playfair text-2xl md:text-4xl">{card.title}</h3>
                <p className="mt-2 max-w-lg font-inter text-sm text-current/80 md:text-base">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={ctaRef}
          className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
        >
          <p className="font-inter text-xs uppercase tracking-[0.4em] text-current/70">
            Reserva Sensorial
          </p>
          <h2 className="mt-6 max-w-3xl font-playfair text-4xl leading-tight md:text-7xl">
            Una noche de tartas, arte y luz tenue.
          </h2>
          <p className="mt-6 max-w-2xl font-inter text-base text-current/75 md:text-lg">
            Diseñamos cada servicio como una puesta en escena gastronómica.
          </p>
          <button
            ref={ctaButtonRef}
            type="button"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="mt-10 rounded-full border border-current px-10 py-4 font-inter text-sm uppercase tracking-[0.22em] transition-colors hover:bg-current hover:text-[#f5f5dc]"
          >
            Solicitar mesa privada
          </button>
        </section>

        <footer
          ref={contactRef}
          className="rounded-t-[2.5rem] border-t border-current/25 bg-current/10 px-6 py-16 md:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <h3 className="font-playfair text-3xl md:text-5xl">Contacto Couture</h3>
            <p className="mt-3 font-inter text-current/75">
              Déjanos los detalles y diseñamos una experiencia a medida.
            </p>
            <form className="mt-10 space-y-4">
              {[
                { type: "text", placeholder: "Nombre completo" },
                { type: "email", placeholder: "Correo electrónico" },
              ].map((field, index) => (
                <input
                  key={field.placeholder}
                  ref={(node) => {
                    fieldRefs.current[index] = node;
                  }}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-current/30 bg-transparent px-4 py-3 font-inter outline-none placeholder:text-current/45 focus:border-current"
                />
              ))}
              <textarea
                ref={(node) => {
                  fieldRefs.current[2] = node;
                }}
                placeholder="Cuéntanos fecha, número de personas y ocasión"
                rows={5}
                className="w-full rounded-xl border border-current/30 bg-transparent px-4 py-3 font-inter outline-none placeholder:text-current/45 focus:border-current"
              />
              <button
                type="submit"
                className="w-full rounded-xl border border-current bg-current px-5 py-3 font-inter text-sm uppercase tracking-[0.25em] text-[#f5f5dc]"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}
