"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";

type Scene = 1 | 2 | 3 | 4 | 5;

interface BookSpread {
  id: number;
  title: string;
  subtitle: string;
  left: string[];
  right: string[];
}

const spreads: BookSpread[] = [
  {
    id: 1,
    title: "Entrantes",
    subtitle: "Primeros bocados",
    left: ["Ostra Gillardeau & Citrus", "Carpaccio de Wagyu A5", "Burrata Ahumada"],
    right: ["Foie Gras a la Brasa", "Tartar de Atún Akami", "Vieira Dorada"],
  },
  {
    id: 2,
    title: "Mar",
    subtitle: "Texturas del océano",
    left: ["Langosta Thermidor", "Lubina Noisette", "Bacalao Confit"],
    right: ["Arroz de Carabinero", "Tartar Azul", "Vieiras al carbón"],
  },
  {
    id: 3,
    title: "Tierra",
    subtitle: "Profundidad y fuego",
    left: ["Solomillo Rossini", "Costilla 24h", "Risotto de Trufa Negra"],
    right: ["Pato Glaseado", "Cordero Lechal", "Pappardelle de Jabalí"],
  },
  {
    id: 4,
    title: "Postres",
    subtitle: "Final de autor",
    left: ["Soufflé Grand Marnier", "Milhojas de Caramelo", "Tarte Tatin de Vainilla"],
    right: ["Éclair de Avellana", "Cacao Nocturne", "Sorbete cítrico"],
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function Experience(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dragStartX = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [spreadIndex, setSpreadIndex] = useState(0);

  const scene = useMemo<Scene>(() => {
    if (scrollProgress < 0.2) return 1;
    if (scrollProgress < 0.4) return 2;
    if (scrollProgress < 0.65) return 3;
    if (scrollProgress < 0.85) return 4;
    return 5;
  }, [scrollProgress]);

  const bookOpenProgress = clamp((scrollProgress - 0.2) / 0.2, 0, 1);
  const readingEnabled = scene === 3;

  const turnPage = (direction: -1 | 1): void => {
    if (!readingEnabled) return;
    setSpreadIndex((current) => clamp(current + direction, 0, spreads.length - 1));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (!readingEnabled) return;
    dragStartX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    if (!readingEnabled || dragStartX.current === null) return;

    const diff = event.clientX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      turnPage(diff < 0 ? 1 : -1);
    }
    dragStartX.current = null;
  };

  useEffect(() => {
    const handleScroll = (): void => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      setScrollProgress(clamp(raw, 0, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const spread = spreads[spreadIndex];

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-[#050505] text-zinc-100">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-3 py-6 sm:px-6 lg:px-10">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2200&auto=format&fit=crop"
          alt="Sala restaurante"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-20 flex w-full max-w-6xl flex-col items-center gap-6">
          <p className="text-center text-[10px] uppercase tracking-[0.45em] text-amber-400 sm:text-xs">
            Escena {scene} de 5
          </p>

          {scene === 1 && (
            <div className="text-center">
              <h2 className="font-serif text-4xl sm:text-6xl">Le Réveil</h2>
              <p className="mt-4 max-w-xl text-sm text-zinc-300 sm:text-base">Scroll para abrir el libro.</p>
            </div>
          )}

          {(scene === 2 || scene === 3 || scene === 4) && (
            <div className="relative w-full max-w-5xl [perspective:1800px]">
              <div
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="mx-auto grid min-h-[58vh] cursor-grab grid-cols-2 overflow-hidden rounded-2xl border border-amber-300/30 bg-[#120f0b] shadow-[0_20px_90px_rgba(0,0,0,.7)] active:cursor-grabbing"
                style={{
                  transform: `rotateX(${(1 - bookOpenProgress) * 28}deg) scale(${0.78 + bookOpenProgress * 0.22})`,
                  transformOrigin: "center bottom",
                }}
              >
                <div className="border-r border-amber-100/15 bg-[linear-gradient(90deg,rgba(255,255,255,.08),transparent_16%)] p-4 sm:p-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/90">{spread.subtitle}</p>
                  <h3 className="mt-3 font-serif text-2xl sm:text-4xl">{spread.title}</h3>
                  <ul className="mt-6 space-y-3 text-sm text-zinc-200 sm:text-base">
                    {spread.left.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[linear-gradient(-90deg,rgba(255,255,255,.07),transparent_16%)] p-4 sm:p-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/90">Página {spread.id}</p>
                  <ul className="mt-14 space-y-3 text-sm text-zinc-200 sm:text-base">
                    {spread.right.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => turnPage(-1)}
                  className="rounded-full border border-amber-300/60 px-4 py-2 text-amber-200 disabled:opacity-35"
                  disabled={!readingEnabled || spreadIndex === 0}
                >
                  Página anterior
                </button>
                <button
                  type="button"
                  onClick={() => turnPage(1)}
                  className="rounded-full border border-amber-300/60 px-4 py-2 text-amber-200 disabled:opacity-35"
                  disabled={!readingEnabled || spreadIndex === spreads.length - 1}
                >
                  Página siguiente
                </button>
              </div>

              <p className="mt-2 text-center text-xs text-zinc-400">
                {readingEnabled
                  ? "Arrastra con ratón o dedo para pasar páginas."
                  : "Sigue haciendo scroll hasta abrir el libro al 100%."}
              </p>
            </div>
          )}

          {scene === 4 && <p className="text-sm text-zinc-300">Cierre cinematográfico del menú.</p>}

          {scene === 5 && (
            <div className="text-center">
              <h3 className="font-serif text-3xl sm:text-5xl">Reserva tu mesa</h3>
              <p className="mt-2 text-zinc-300">Experiencia completa en cualquier pantalla.</p>
              <button className="mt-6 rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black">
                Reservar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
