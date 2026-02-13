"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type DishCategory = "Entrantes" | "Mar" | "Tierra" | "Postres";

interface Dish {
  id: number;
  name: string;
  category: DishCategory;
  image: string;
}

const dishes: Dish[] = [
  { id: 1, name: "Ostra Gillardeau & Citrus", category: "Entrantes", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, name: "Tartar de Atún Akami", category: "Entrantes", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, name: "Carpaccio de Wagyu A5", category: "Entrantes", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Burrata Ahumada", category: "Entrantes", image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, name: "Foie Gras a la Brasa", category: "Entrantes", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, name: "Vieira Dorada", category: "Mar", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop" },
  { id: 7, name: "Langosta Thermidor", category: "Mar", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" },
  { id: 8, name: "Bacalao Confit", category: "Mar", image: "https://images.unsplash.com/photo-1611270634830-971ff4d20dd6?q=80&w=1200&auto=format&fit=crop" },
  { id: 9, name: "Lubina en Mantequilla Noisette", category: "Mar", image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?q=80&w=1200&auto=format&fit=crop" },
  { id: 10, name: "Arroz de Carabinero", category: "Mar", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop" },
  { id: 11, name: "Solomillo Rossini", category: "Tierra", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop" },
  { id: 12, name: "Cordero Lechal", category: "Tierra", image: "https://images.unsplash.com/photo-1529694157871-9a783f06d95f?q=80&w=1200&auto=format&fit=crop" },
  { id: 13, name: "Pato Glaseado", category: "Tierra", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop" },
  { id: 14, name: "Risotto de Trufa Negra", category: "Tierra", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop" },
  { id: 15, name: "Pappardelle de Jabalí", category: "Tierra", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop" },
  { id: 16, name: "Ravioli de Bogavante", category: "Tierra", image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?q=80&w=1200&auto=format&fit=crop" },
  { id: 17, name: "Steak Tartar Imperial", category: "Tierra", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
  { id: 18, name: "Molleja Crocante", category: "Tierra", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop" },
  { id: 19, name: "Gnocchi de Patata Morada", category: "Tierra", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1200&auto=format&fit=crop" },
  { id: 20, name: "Costilla 24h", category: "Tierra", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
  { id: 21, name: "Soufflé de Grand Marnier", category: "Postres", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop" },
  { id: 22, name: "Tarte Tatin de Vainilla", category: "Postres", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop" },
  { id: 23, name: "Éclair de Avellana", category: "Postres", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1200&auto=format&fit=crop" },
  { id: 24, name: "Milhojas de Caramelo", category: "Postres", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop" },
  { id: 25, name: "Cacao Nocturne", category: "Postres", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop" },
];

const pageSets: Dish[][] = [
  dishes.slice(0, 6),
  dishes.slice(6, 12),
  dishes.slice(12, 18),
  dishes.slice(18, 25),
];

export default function Experience(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const magneticButtonRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=8000",
          pin: true,
          scrub: 1,
        },
      });

      timeline
        .fromTo(
          ".scene-1",
          { opacity: 1 },
          { opacity: 1, duration: 0.6 },
        )
        .to(
          ".intro-word--left",
          { xPercent: -120, opacity: 0, duration: 0.9, ease: "power3.inOut" },
          "+=0.5",
        )
        .to(
          ".intro-word--right",
          { xPercent: 120, opacity: 0, duration: 0.9, ease: "power3.inOut" },
          "<",
        )
        .to(
          ".intro-subtitle",
          { yPercent: 100, opacity: 0, duration: 0.7, ease: "power2.inOut" },
          "<",
        )
        .to(
          ".book-shell",
          { autoAlpha: 1, scale: 1, rotateX: 0, z: 0, duration: 1.2, ease: "power3.out" },
          "-=0.3",
        );

      pageSets.forEach((_, index) => {
        const page = `.page-${index + 1}`;
        const dishCards = `${page} .dish-card`;
        timeline
          .to(page, { rotateY: -160, duration: 1.2, ease: "power2.inOut" })
          .fromTo(
            dishCards,
            { yPercent: 22, opacity: 0 },
            {
              yPercent: -14,
              opacity: 1,
              stagger: 0.08,
              duration: 1.1,
              ease: "power2.out",
            },
            "<",
          );
      });

      timeline
        .to(".book-shell", { scale: 0.9, rotateY: 0, duration: 0.7, ease: "power2.inOut" })
        .to(".book-page", { rotateY: 0, duration: 0.7, stagger: 0.05, ease: "power2.inOut" }, "<")
        .to(".dessert-focus", { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power2.out" }, "-=0.1")
        .to(".book-scene", { opacity: 0, duration: 0.8 }, "<")
        .to(".cta-layer", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.2");

      gsap.to(".shimmer", {
        xPercent: 240,
        duration: 1.8,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef },
  );

  const handleMagneticMove = (event: MouseEvent<HTMLButtonElement>): void => {
    const button = magneticButtonRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    gsap.to(button, {
      x: offsetX * 0.2,
      y: offsetY * 0.25,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const resetMagnetic = (): void => {
    if (!magneticButtonRef.current) {
      return;
    }

    gsap.to(magneticButtonRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black text-zinc-100">
      <div className="scene-1 absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black px-6 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0, filter: "blur(14px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-5xl font-serif tracking-wide text-zinc-100 md:text-7xl"
        >
          <span className="intro-word--left inline-block pr-4">Le</span>
          <span className="intro-word--right inline-block text-amber-500">Réveil</span>
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="intro-subtitle max-w-xl text-xs uppercase tracking-[0.5em] text-zinc-400 md:text-sm"
        >
          Cartas vivas · cocina de autor · narrativa sensorial
        </motion.p>
      </div>

      <div className="book-scene absolute inset-0 z-20 flex items-center justify-center perspective-1000 px-4 md:px-10">
        <div className="book-shell preserve-3d relative h-[74vh] w-full max-w-6xl scale-90 opacity-0">
          <div className="absolute inset-0 rounded-2xl bg-zinc-900 shadow-[0_40px_120px_rgba(0,0,0,0.65)] ring-1 ring-amber-500/25" />

          {pageSets.map((page, pageIndex) => (
            <article
              key={`page-${pageIndex + 1}`}
              className={`book-page page-${pageIndex + 1} preserve-3d absolute inset-2 origin-left rounded-xl border border-amber-500/15 bg-zinc-950 p-6 md:p-8`}
              style={{ zIndex: 30 - pageIndex }}
            >
              <header className="mb-6 border-b border-amber-500/20 pb-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/80">Capítulo {pageIndex + 1}</p>
                <h3 className="mt-2 font-serif text-2xl text-zinc-100 md:text-3xl">La Carta Magna</h3>
              </header>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {page.map((dish) => (
                  <div key={dish.id} className="dish-card group">
                    <div className="relative mb-2 aspect-[4/5] overflow-hidden rounded-lg ring-1 ring-amber-500/20">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500/80">{dish.category}</p>
                    <p className="line-clamp-2 font-serif text-sm text-zinc-100 md:text-base">{dish.name}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="dessert-focus pointer-events-none absolute inset-0 z-30 scale-125 opacity-0">
        <Image
          src="https://images.unsplash.com/photo-1559622214-49d6c0f839eb?q=80&w=1800&auto=format&fit=crop"
          alt="Postre estrella"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="cta-layer absolute inset-0 z-50 flex translate-y-10 items-end justify-center px-6 pb-20 opacity-0">
        <button
          ref={magneticButtonRef}
          type="button"
          onMouseMove={handleMagneticMove}
          onMouseLeave={resetMagnetic}
          className="group relative overflow-hidden rounded-full border border-amber-400/70 bg-black/70 px-12 py-4 text-sm uppercase tracking-[0.3em] text-amber-400 backdrop-blur-md transition-colors duration-300 hover:bg-amber-500 hover:text-black"
        >
          <span className="relative z-20">Reservar Mesa</span>
          <span className="shimmer absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
        </button>
      </div>
    </section>
  );
}
