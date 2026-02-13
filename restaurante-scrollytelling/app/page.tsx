"use client";

import React, { JSX, useCallback, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type DishCategory = "Entrantes" | "Principales" | "Postres" | "Vinos";
type Dish = { id: string; name: string; category: DishCategory; imageUrl: string };
type PageModel = { id: string; title: string; subtitle: string; dishIds: string[] };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function splitIntoPages(dishes: Dish[]): PageModel[] {
  const ids = dishes.map((d) => d.id);
  return [
    { id: "p1", title: "Entrantes", subtitle: "Apertura con carácter", dishIds: ids.slice(0, 6) },
    { id: "p2", title: "Principales", subtitle: "Fuego lento, precisión total", dishIds: ids.slice(6, 12) },
    { id: "p3", title: "Postres", subtitle: "El golpe final", dishIds: ids.slice(12, 18) },
    { id: "p4", title: "Vinos", subtitle: "Ritual y cristal", dishIds: ids.slice(18, 24) },
    { id: "p5", title: "Chef’s Selection", subtitle: "Una firma.", dishIds: ids.slice(24, 25) },
  ];
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]" data-dish>
      <div className="relative aspect-[4/5] w-full">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="h-full w-full object-cover grayscale-[10%] contrast-[1.05] brightness-[0.9] saturate-[1.05]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/0" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-400/90">{dish.category}</p>
        <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-white/95">{dish.name}</h3>
        <div className="mt-3 h-px w-10 bg-amber-400/70" />
      </div>
    </article>
  );
}

function MagneticCTA({ onClick }: { onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.3 });

  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          10% { opacity: .75; }
          55% { opacity: .75; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
      `}</style>

      <motion.button
        type="button"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-amber-400/35 bg-gradient-to-b from-amber-400/20 via-black/40 to-black/60 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-md"
      >
        <span className="relative z-10">Reservar Mesa</span>
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <span
            className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-amber-300/45 to-transparent"
            style={{ animation: "shimmer 2.4s linear infinite" }}
          />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.28), transparent 60%)" }}
        />
      </motion.button>
    </>
  );
}

export default function Experience(): JSX.Element {
  const dishes: Dish[] = useMemo(() => [
    { id: "d01", name: "Ostra ahumada, cítricos y oro", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80" },
    { id: "d02", name: "Tártaro de wagyu, trufa negra", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1543332164-6e82f355bad4?auto=format&fit=crop&w=1600&q=80" },
    { id: "d03", name: "Caviar, crema ácida, blini", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80" },
    { id: "d04", name: "Carpaccio, pimienta rosa", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80" },
    { id: "d05", name: "Brioche, noisette", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1600&q=80" },
    { id: "d06", name: "Tomate confitado, albahaca", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1600&q=80" },
    { id: "d07", name: "Lomo al carbón, demi-glace", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1544025161-9450b2b9c9b2?auto=format&fit=crop&w=1600&q=80" },
    { id: "d08", name: "Pasta fresca, limón y parmesano", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1600&q=80" },
    { id: "d09", name: "Salmón, mantequilla y eneldo", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80" },
    { id: "d10", name: "Risotto, setas y tomillo", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1600&q=80" },
    { id: "d11", name: "Sushi omakase, precisión", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=80" },
    { id: "d12", name: "Pato, reducción de frutos rojos", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=80" },
    { id: "d13", name: "Chocolate 70%, sal marina", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1600&q=80" },
    { id: "d14", name: "Tarta cítrica, merengue tostado", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1600&q=80" },
    { id: "d15", name: "Helado artesano, vainilla real", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=1600&q=80" },
    { id: "d16", name: "Fresas, crema, oro sutil", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=80" },
    { id: "d17", name: "Soufflé, corazón líquido", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80" },
    { id: "d18", name: "Café, espuma, cacao", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1600&q=80" },
    { id: "d19", name: "Tinto reserva, roble", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1514361892635-eae32a87fdbf?auto=format&fit=crop&w=1600&q=80" },
    { id: "d20", name: "Blanco mineral, frescura", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1600&q=80" },
    { id: "d21", name: "Champagne brut, burbuja fina", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1600&q=80" },
    { id: "d22", name: "Cóctel ámbar, especias", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1600&q=80" },
    { id: "d23", name: "Degustación, copa perfecta", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1600&q=80" },
    { id: "d24", name: "Maridaje, luz y cristal", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1600&q=80" },
    { id: "d25", name: "Postre estrella: “Ámbar”", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=2000&q=80" },
  ], []);

  const dishById = useMemo(() => new Map(dishes.map((d) => [d.id, d] as const)), [dishes]);
  const pages = useMemo(() => splitIntoPages(dishes), [dishes]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const s1Ref = useRef<HTMLDivElement | null>(null);
  const s2Ref = useRef<HTMLDivElement | null>(null);
  const s3Ref = useRef<HTMLDivElement | null>(null);
  const s4Ref = useRef<HTMLDivElement | null>(null);
  const s5Ref = useRef<HTMLDivElement | null>(null);

  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroLRef = useRef<HTMLSpanElement | null>(null);
  const heroRRef = useRef<HTMLSpanElement | null>(null);
  const heroSubRef = useRef<HTMLParagraphElement | null>(null);

  const coverRef = useRef<HTMLDivElement | null>(null);
  const bookWrapRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setPageRef = useCallback((idx: number) => (el: HTMLDivElement | null) => { pageRefs.current[idx] = el; }, []);

  const dessertImgRef = useRef<HTMLImageElement | null>(null);

  // Framer “intro blur” (solo para micro feeling)
  const p = useMotionValue(0);
  const introOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const introY = useTransform(p, [0, 0.12], [50, 0]);
  const introBlur = useTransform(p, [0, 0.12], [14, 0]);
  const titleFilter = useTransform(introBlur, (b) => `blur(${b}px)`);

  const featuredDessert = dishById.get("d25") ?? dishes[dishes.length - 1];

  const [pageIndex, setPageIndex] = useState(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    if (!rootRef.current || !pinRef.current) return;

    // ✅ Detecta scroller Lenis si existe
    const lenisScroller = document.querySelector("[data-lenis-scroll]") as HTMLElement | null;

   const setHidden = (el: HTMLElement | null): void => {
  if (!el) return;
  gsap.set(el, { autoAlpha: 0, pointerEvents: "none" });
};

const setVisible = (el: HTMLElement | null): void => {
  if (!el) return;
  gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });
};



    setVisible(s1Ref.current);
    setHidden(s2Ref.current); setHidden(s3Ref.current); setHidden(s4Ref.current); setHidden(s5Ref.current);

    gsap.set(heroBgRef.current, { scale: 1.08 });
    gsap.set([heroLRef.current, heroRRef.current], { x: 0, opacity: 1 });

    gsap.set(bookWrapRef.current, { rotateX: -12, rotateY: 10, y: 20, autoAlpha: 0 });
    gsap.set(coverRef.current, { rotateY: 0, transformOrigin: "0% 50%" });
    pageRefs.current.forEach((pg, i) => pg && gsap.set(pg, { rotateY: 0, transformOrigin: "0% 50%", zIndex: 50 - i }));

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        // ✅ clave: trigger y pin sobre el MISMO nodo
        trigger: pinRef.current,
        start: "top top",
        end: "+=8000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scroller: lenisScroller ?? undefined,
        onUpdate: (self) => {
          p.set(self.progress);

          // book page index derivado (para UI)
          const bookA = 0.36, bookB = 0.78;
          if (self.progress >= bookA && self.progress <= bookB) {
            const t = (self.progress - bookA) / (bookB - bookA);
            const idx = Math.round(t * (pages.length - 1));
            setPageIndex(idx);
          }
        },
        onRefresh: (self) => { stRef.current = self; },
      },
    });

    // SCENE 1 (cinema)
    tl.addLabel("s1", 0);
    tl.to(heroBgRef.current, { scale: 1.35, y: -20, duration: 2.0 }, "s1");
    tl.fromTo(heroSubRef.current, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, "s1+=0.35");
    tl.to(heroLRef.current, { x: -260, opacity: 0, duration: 0.9 }, "s1+=1.25");
    tl.to(heroRRef.current, { x: 260, opacity: 0, duration: 0.9 }, "s1+=1.25");
    tl.to(heroSubRef.current, { y: -12, autoAlpha: 0, duration: 0.65 }, "s1+=1.35");
    // helpers: IMPORTANTÍSIMO -> devuelven void
    const hide = (el: HTMLElement | null): void => {
      if (!el) return;
      gsap.set(el, { autoAlpha: 0, pointerEvents: "none" });
    };

    const show = (el: HTMLElement | null): void => {
      if (!el) return;
      gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });
    };

    // --- guard de refs (evita null en overloads)
    const s1 = s1Ref.current;
    const s2 = s2Ref.current;
    const s3 = s3Ref.current;
    const s4 = s4Ref.current;
    const s5 = s5Ref.current;

    const bookWrap = bookWrapRef.current;
    const cover = coverRef.current;
    const dessertImg = dessertImgRef.current;

    if (!s1 || !s2 || !s3 || !s4 || !s5 || !bookWrap || !cover || !dessertImg) {
      return;
    }

    // pages con type guard (importantísimo)
    const pagesEls = pageRefs.current.filter(
      (p): p is HTMLDivElement => p !== null
    );

    // Transition to Scene 2
    tl.to(
      s1,
      {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          hide(s1);
        },
      },
      "s1+=1.9"
    );

    tl.to(
      s2,
      {
        autoAlpha: 1,
        duration: 0.3,
        onStart: () => {
          show(s2);
        },
      },
      "s1+=1.9"
    );

    // Scene 2 (pasos)
    tl.addLabel("s2", "s1+=2.05");
    tl.fromTo(
      "[data-step]",
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.14, duration: 1.2 },
      "s2+=0.1"
    );
    tl.to("[data-step]", { y: -14, stagger: 0.08, duration: 1.2 }, "s2+=0.55");

    tl.to(
      s2,
      {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          hide(s2);
        },
      },
      "s2+=1.6"
    );

    tl.to(
      s3,
      {
        autoAlpha: 1,
        duration: 0.3,
        onStart: () => {
          show(s3);
        },
      },
      "s2+=1.6"
    );

    // Scene 3 (book)
    tl.addLabel("s3", "s2+=1.8");
    tl.to(bookWrap, { autoAlpha: 1, y: 0, rotateX: -10, rotateY: 8, duration: 0.9 }, "s3+=0.0");
    tl.to(cover, { rotateY: -160, duration: 1.1 }, "s3+=0.45");

    pagesEls.forEach((page, i) => {
      const at = 1.0 + i * 0.55;
      const dishEls = Array.from(page.querySelectorAll("[data-dish]")) as HTMLElement[];

      tl.to(page, { rotateY: -170, duration: 1.0 }, `s3+=${at}`);
      tl.fromTo(
        dishEls,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.55 },
        `s3+=${at + 0.06}`
      );
      tl.to(dishEls, { y: -18, stagger: 0.02, duration: 1.0 }, `s3+=${at}`);
    });

    tl.to(cover, { rotateY: 0, duration: 0.9 }, "s3+=3.85");
    tl.to(pagesEls, { rotateY: 0, duration: 0.9 }, "s3+=3.85");

    tl.to(
      s3,
      {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          hide(s3);
        },
      },
      "s3+=4.2"
    );

    tl.to(
      s4,
      {
        autoAlpha: 1,
        duration: 0.25,
        onStart: () => {
          show(s4);
        },
      },
      "s3+=4.2"
    );

    // Scene 4 (dessert zoom)
    tl.addLabel("s4", "s3+=4.25");
    tl.fromTo(dessertImg, { scale: 1.0 }, { scale: 1.38, duration: 1.35 }, "s4+=0.05");

    tl.to(
      s4,
      {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          hide(s4);
        },
      },
      "s4+=1.15"
    );

    tl.to(
      s5,
      {
        autoAlpha: 1,
        duration: 0.25,
        onStart: () => {
          show(s5);
        },
      },
      "s4+=1.15"
    );


    tl.fromTo("[data-cta]", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, "s4+=1.25");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: rootRef });

  // Debug badge (te dice si monta)
  const debugMount = process.env.NODE_ENV !== "production";

  return (
    <div ref={rootRef} className="relative w-full" style={{ height: "calc(100vh + 8000px)" }}>
      {debugMount && (
        <div className="fixed left-4 top-4 z-[9999] rounded bg-red-600 px-3 py-2 text-xs font-bold text-white">
          Experience mounted
        </div>
      )}

      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-black">
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-24 opacity-40 blur-3xl [background:radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>

        {/* SCENE 1 — VISIBLE by default */}
        <section ref={s1Ref} className="absolute inset-0 z-20">
          <div className="absolute inset-0">
            <div ref={heroBgRef} className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2200&q=80"
                alt="Restaurante"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
            </div>
          </div>

          <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
            <div className="w-full">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-400/25 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-amber-300/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Alta cocina · Dark luxury
              </div>

              <motion.div
                style={{ opacity: introOpacity, y: introY, filter: titleFilter }}
                className="max-w-4xl"
              >
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  <span ref={heroLRef} className="inline-block">La noche</span>{" "}
                  <span className="text-amber-300/90">se abre</span>{" "}
                  <span ref={heroRRef} className="inline-block">en dos.</span>
                </h1>

                <p ref={heroSubRef} className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                  Scrollea para vivir la experiencia. Abajo tienes acceso directo a menú y reserva.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SCENE 2 */}
        <section ref={s2Ref} className="absolute inset-0 z-20 opacity-0">
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
            <div className="w-full">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/90">El ritual</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Cinco segundos de silencio. <span className="text-amber-300/90">Luego, todo encaja.</span>
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  ["Paso 01", "Descubre", "Una entrada cinematográfica que fija el tono."],
                  ["Paso 02", "Explora", "La carta vive como objeto físico, con profundidad."],
                  ["Paso 03", "Convierte", "Reserva inmediata. Sin fricción."],
                ].map(([k, t, d]) => (
                  <div key={k} data-step className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-amber-400/90">{k}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white/95">{t}</h3>
                    <p className="mt-3 text-sm text-white/70">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 3 — BOOK */}
        <section ref={s3Ref} className="absolute inset-0 z-30 opacity-0">
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
            <div className="w-full">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/90">La Carta Magna</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">
                    Páginas que se sienten. <span className="text-amber-300/90">No slides.</span>
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-semibold text-white/80">
                  {pageIndex + 1}/{pages.length}
                </span>
              </div>

              <div className="relative mx-auto h-[72vh] w-[min(94vw,980px)] perspective-1000">
                <div ref={bookWrapRef} className="relative h-full w-full preserve-3d">
                  <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/5 to-black/70" style={{ transform: "translateZ(-6px)" }} />

                  {/* Cover */}
                  <div ref={coverRef} className="absolute inset-0 z-[55] backface-hidden preserve-3d" style={{ transform: "translateZ(10px)" }}>
                    <div className="absolute inset-0 rounded-[28px] border border-amber-400/20 bg-black">
                      <div className="relative flex h-full items-center justify-center p-10 text-center">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.30em] text-amber-300/90">Menú Degustación</p>
                          <h3 className="mt-4 text-4xl font-semibold text-white md:text-5xl">La Carta</h3>
                          <div className="mx-auto mt-6 h-px w-28 bg-amber-400/70" />
                          <p className="mx-auto mt-6 max-w-sm text-sm text-white/70">Cada página es un gesto.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pages */}
                  {pages.map((pg, idx) => {
                    const list = pg.dishIds.map((id) => dishById.get(id)).filter(Boolean) as Dish[];
                    const isLast = idx === pages.length - 1;
                    return (
                      <div
                        key={pg.id}
                        ref={setPageRef(idx)}
                        className="absolute inset-0 z-[50] backface-hidden preserve-3d"
                        style={{ transform: `translateZ(${8 - idx * 1.2}px)` }}
                      >
                        <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/6 via-black/65 to-black/80">
                          <div className="relative h-full w-full p-6 md:p-8">
                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/90">{pg.title}</p>
                                <h4 className="mt-2 text-lg font-semibold text-white/95 md:text-xl">{pg.subtitle}</h4>
                              </div>
                            </div>

                            <div className="mt-6 h-px w-full bg-white/10" />

                            <div className={`mt-6 grid gap-4 ${isLast ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
                              {list.map((dish) => <DishCard key={dish.id} dish={dish} />)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 4 — DESSERT */}
        <section ref={s4Ref} className="absolute inset-0 z-40 opacity-0">
          <div className="absolute inset-0">
            <img ref={dessertImgRef} src={featuredDessert.imageUrl} alt={featuredDessert.name} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />
          </div>
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-14">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/90">El Postre Visual</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{featuredDessert.name}</h2>
              <p className="mt-4 text-sm text-white/75 md:text-base">Zoom profundo. Golpe limpio.</p>
            </div>
          </div>
        </section>

        {/* SCENE 5 — CTA */}
        <section ref={s5Ref} className="absolute inset-0 z-50 opacity-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
            <div data-cta className="w-full text-center">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/90">Conversión</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-white md:text-5xl">
                Reserva en segundos. <span className="text-amber-300/90">Sin perder la magia.</span>
              </h2>

              <div className="mt-10 flex items-center justify-center">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                  <MagneticCTA onClick={() => alert("Conecta aquí tu /reservar real")} />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[90] [box-shadow:inset_0_0_140px_rgba(0,0,0,0.85)]" />
      </div>
    </div>
  );
}
