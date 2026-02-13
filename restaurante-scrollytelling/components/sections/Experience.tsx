"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Plate = {
  title: string;
  category: string;
  image: string;
};

const plateImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1541544181051-e46607d6d5ef?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1481931715705-36fbb1f4c3f9?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1400&q=80",
] as const;

const categories = ["Degustación", "Estacional", "Chef Signature", "Maridaje", "Postre"];

export default function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const plates = useMemo<Plate[]>(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        title: `Plato ${String(i + 1).padStart(2, "0")}`,
        category: categories[i % categories.length],
        image: plateImages[i],
      })),
    [],
  );

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".experience-root",
            start: "top top",
            end: "+=12000",
            scrub: 1.2,
            pin: true,
          },
        });

        timeline
          .to(".scene-1", { autoAlpha: 1, duration: 0.4 })
          .fromTo(".scene-1-title", { scale: 1.4, letterSpacing: "0.8em" }, { scale: 1, letterSpacing: "0.2em", duration: 0.9 }, 0)
          .to(".scene-1-mask", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, 0)
          .to(".scene-1", { autoAlpha: 0, duration: 0.6 }, ">+=0.8")

          .to(".scene-2", { autoAlpha: 1, duration: 0.4 }, ">")
          .to(
            ".menu-page",
            {
              rotationY: (_i, target) =>
                Number((target as HTMLElement).dataset.pageIndex) % 2 === 0 ? -165 : 165,
              z: (_i, target) => Number((target as HTMLElement).dataset.pageIndex) * 3,
              transformOrigin: "left center",
              stagger: 0.18,
              duration: 2.8,
            },
            "<",
          )
          .to(".scene-2", { autoAlpha: 0, duration: 0.7 }, ">+=1")

          .to(".scene-3", { autoAlpha: 1, duration: 0.4 }, ">")
          .fromTo(".ingredient-a", { xPercent: -90, z: -300 }, { xPercent: 100, z: 200, duration: 2.5 }, "<")
          .fromTo(".ingredient-b", { xPercent: 100, z: -200 }, { xPercent: -120, z: 260, duration: 2.8 }, "<0.2")
          .fromTo(".ingredient-c", { yPercent: 80, z: -250 }, { yPercent: -100, z: 200, duration: 2.4 }, "<0.4")
          .to(".scene-3", { autoAlpha: 0, duration: 0.8 }, ">")

          .to(".scene-4", { autoAlpha: 1, duration: 0.4 }, ">")
          .fromTo(".tunnel", { rotateX: -8, z: -500 }, { rotateX: 6, z: 420, duration: 3 }, "<")
          .fromTo(".bottle", { z: -1200, opacity: 0 }, { z: 650, opacity: 1, stagger: 0.1, duration: 2.6 }, "<0.2")
          .to(".scene-4", { autoAlpha: 0, duration: 0.8 }, ">")

          .to(".scene-5", { autoAlpha: 1, duration: 0.5 }, ">")
          .fromTo(".reserve-btn", { scale: 0.75, boxShadow: "0 0 0 rgba(212,175,55,0)" }, { scale: 1, boxShadow: "0 0 42px rgba(212,175,55,0.75)", duration: 1.8 }, "<");
      }, container);

      const onMouseMove = (event: MouseEvent) => {
        if (!spotlightRef.current) return;
        const { clientX, clientY } = event;
        spotlightRef.current.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(255,255,220,0.18) 0px, rgba(0,0,0,0.9) 220px, rgba(0,0,0,1) 380px)`;
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        ctx.revert();
      };
    },
    { scope: container },
  );

  return (
    <main ref={container} className="experience-root relative h-screen overflow-hidden bg-black text-[#f6f1e9]">
      <section className="scene-1 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="scene-1-mask [clip-path:inset(50%_0_50%_0)] text-center">
          <p className="mb-4 font-serif text-sm tracking-[0.6em] text-[#d4af37]">CINEMATIC EXPERIENCE</p>
          <h1 className="scene-1-title font-serif text-5xl md:text-8xl">THE SECRET</h1>
        </div>
      </section>

      <section className="scene-2 perspective-1000 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="preserve-3d relative h-[68vh] w-[80vw] max-w-6xl rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
          {plates.map((plate, idx) => (
            <article
              key={plate.title}
              data-page-index={idx}
              className="menu-page preserve-3d backface-hidden absolute left-1/2 top-1/2 h-[78%] w-[28%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-[#d4af37]/25 bg-[#090909] shadow-2xl"
              style={{ transform: `translateZ(${idx * 2}px) translateX(${idx * 3 - 45}px)` }}
            >
              <img src={plate.image} alt={plate.title} className="h-2/3 w-full object-cover" loading="lazy" />
              <div className="p-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d4af37]">{plate.category}</p>
                <h3 className="font-serif text-lg">{plate.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="scene-3 perspective-1000 absolute inset-0 opacity-0">
        <img className="ingredient-a absolute left-[-12%] top-[8%] w-[48vw] rounded-full object-cover opacity-85" src="https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=1600&q=80" alt="Tomates" />
        <img className="ingredient-b absolute right-[-10%] top-[22%] w-[52vw] rounded-full object-cover opacity-80" src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1600&q=80" alt="Especias" />
        <img className="ingredient-c absolute left-[20%] top-[52%] w-[42vw] rounded-full object-cover opacity-85" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80" alt="Hierbas" />
      </section>

      <section className="scene-4 perspective-1000 absolute inset-0 flex items-center justify-center opacity-0">
        <div className="tunnel preserve-3d relative h-[78vh] w-[78vw]">
          {Array.from({ length: 16 }).map((_, i) => (
            <img
              key={`bottle-${i + 1}`}
              className="bottle absolute left-1/2 top-1/2 h-32 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-[0_0_30px_rgba(212,175,55,0.25)]"
              style={{ transform: `translate(-50%, -50%) translateZ(${-i * 140}px) rotateY(${i * 22}deg) translateX(${140 + i * 8}px)` }}
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=420&q=80"
              alt="Botella premium"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="scene-5 absolute inset-0 opacity-0">
        <div ref={spotlightRef} className="absolute inset-0 bg-black" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
          <h2 className="font-serif text-5xl md:text-7xl tracking-[0.18em]">THE FINAL TABLE</h2>
          <p className="max-w-xl text-sm uppercase tracking-[0.45em] text-white/70">Solo para quienes entienden el arte de esperar el momento perfecto.</p>
          <button className="reserve-btn rounded-full border border-[#d4af37] px-12 py-4 font-semibold tracking-[0.35em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black">
            RESERVAR
          </button>
        </div>
      </section>
    </main>
  );
}
