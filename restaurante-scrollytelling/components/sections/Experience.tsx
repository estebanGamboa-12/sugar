"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgHd = (url: string) =>
  url.replace(/w=\d+/, "w=800").replace(/q=\d+/, "q=90");

type Item = {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  price: string;
};

const ITEMS: Item[] = [
  { id: 1, name: "Carpaccio de Wagyu", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=85", description: "Finas láminas de wagyu A5, aceite de trufa negra, alcaparras y queso pecorino. Un entrante delicado que equilibra intensidad y sutileza.", price: "32€" },
  { id: 2, name: "Burrata con Tomate", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=85", description: "Burrata cremosa sobre tomate de heirloom, albahaca fresca y reducción de balsámico. Frescura mediterránea en cada bocado.", price: "18€" },
  { id: 3, name: "Tataki de Atún", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&q=85", description: "Atún rojo sellado, aguacate, salsa ponzu y sésamo tostado. Influencias japonesas con toque mediterráneo.", price: "24€" },
  { id: 4, name: "Foie Gras Mi-Cuit", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=85", description: "Foie mi-cuit sobre pan brioche, compota de higos y reducción de Oporto. Clásico francés reinventado.", price: "28€" },
  { id: 5, name: "Ostras Rockefeller", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&q=85", description: "Ostras gratinadas con espinacas, pernod y parmesano. Receta legendaria de Nueva Orleans.", price: "22€" },
  { id: 6, name: "Caviar Beluga", category: "Entrantes", imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&q=85", description: "Caviar beluga sobre blinis caseros, crème fraîche y huevo de codorniz. Lujo en su máxima expresión.", price: "95€" },
  { id: 7, name: "Ravioli de Trufa", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=85", description: "Ravioli relleno de ricotta y trufa negra, mantequilla de trufa y parmesano envejecido 36 meses.", price: "42€" },
  { id: 8, name: "Lubina a la Sal", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=85", description: "Lubina entera cocida en costra de sal mediterránea, patatas confitadas y emulsión de hierbas.", price: "48€" },
  { id: 9, name: "Entrecôte Bordelaise", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?w=500&q=85", description: "Entrecôte de 300g a la parrilla, salsa bordelesa, patatas dauphine y espárragos verdes.", price: "52€" },
  { id: 10, name: "Langosta Thermidor", category: "Principales", imageUrl: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500&q=85", description: "Langosta viva preparada al estilo thermidor con brandy, mostaza y gratinado de queso.", price: "78€" },
  { id: 11, name: "Tiramisú Clásico", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&q=85", description: "Tiramisú tradicional con mascarpone de Lombardía, café espresso y cacao amargo. Receta de la nonna.", price: "12€" },
  { id: 12, name: "Soufflé au Chocolat", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=500&q=85", description: "Soufflé de chocolate Valrhona, helado de vainilla de Madagascar. Esperar 15 min. de preparación.", price: "16€" },
  { id: 13, name: "Crème Brûlée", category: "Postres", imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=85", description: "Crema de vainilla bourbon con costra crujiente de azúcar quemada. Atemporal y perfecto.", price: "11€" },
  { id: 14, name: "Chardonnay Reserva", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=85", description: "Rueda 2020. Crianza en barrica francesa. Notas de mantequilla, manzana verde y vainilla.", price: "38€" },
  { id: 15, name: "Pinot Noir Grand Cru", category: "Vinos", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&q=85", description: "Borgoña 2019. Elegancia y sutileza. Cereza, tierra húmeda y especias.", price: "95€" },
  { id: 16, name: "IPA Artesanal", category: "Cervezas", imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=85", description: "Brewdog Punk IPA. Lúpulo Cascade y Amarillo. Amargor equilibrado, cítrico y resinoso.", price: "8€" },
  { id: 17, name: "Lager Premium", category: "Cervezas", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=85", description: "Estrella Galicia 0,0. Dorada, suave y refrescante. Sin alcohol, con todo el sabor.", price: "6€" },
];

const BOOK_PAGES: { title: string; items: Item[] }[] = [
  { title: "Entrantes", items: ITEMS.filter((i) => i.category === "Entrantes") },
  { title: "Principales", items: ITEMS.filter((i) => i.category === "Principales") },
  { title: "Postres", items: ITEMS.filter((i) => i.category === "Postres") },
  { title: "Vinos y Cervezas", items: ITEMS.filter((i) => i.category === "Vinos" || i.category === "Cervezas") },
];

const HERO_TITLE = "Recomendaciones reales de gente real";
const RESTAURANT_IMG = "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=889&auto=format&fit=crop";
const CURATORS = [
  { name: "Chef Marco", desc: "THE SECRET es un espacio donde cada plato cuenta una historia. Suscribirse a la experiencia, degustar lo mejor, inspirarse y expandir el paladar.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85" },
  { name: "El Local", desc: "Entrantes, principales, postres, vinos y cervezas seleccionadas. Cada categoría pensada para maridar con el momento. Nuestro espacio acoge cada detalle.", img: RESTAURANT_IMG },
];

type BookCartaProps = {
  onItemClick: (item: Item) => void;
};

function BookCarta({ onItemClick }: BookCartaProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const dragRef = useRef({ startX: 0, startY: 0, isDragging: false });
  const totalPages = BOOK_PAGES.length;

  const goNext = useCallback(() => setPage((p) => Math.min(p + 1, totalPages - 1)), [totalPages]);
  const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY, isDragging: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    if (Math.abs(deltaX) < 50) return;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (deltaX < 0) goNext();
    else goPrev();
    dragRef.current.isDragging = false;
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  const spread = BOOK_PAGES[page];
  if (!spread) return null;

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/60">
        Arrastra, desliza o usa ← →
      </p>
      <div
        ref={bookRef}
        className="relative flex h-[55vh] min-h-[320px] w-full max-w-3xl touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] md:h-[60vh] md:min-h-[400px]"
        style={{
          perspective: 1200,
          touchAction: "pan-y",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), inset 4px 0 16px rgba(0,0,0,0.5)",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col overflow-auto p-6 md:p-8"
          >
            <h3 className="mb-6 border-b border-[#f59e0b]/40 pb-2 font-serif text-xl font-semibold text-[#f59e0b] md:text-2xl">
              {spread.title}
            </h3>
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6">
              {spread.items.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  data-collection-item
                  onClick={() => onItemClick(item)}
                  className="group flex flex-col text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={imgHd(item.imageUrl)}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                  <p className="mt-2 font-serif text-sm font-medium text-white md:text-base">
                    {item.name}
                  </p>
                  <p className="text-xs font-medium text-[#f59e0b] md:text-sm">{item.price}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navegación flechas */}
        <button
          type="button"
          onClick={goPrev}
          disabled={page === 0}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-sm transition hover:bg-black/80 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Página anterior"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={page >= totalPages - 1}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-sm transition hover:bg-black/80 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Página siguiente"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {BOOK_PAGES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${i === page ? "bg-[#f59e0b]" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const scrollToY = (y: number) => {
  const lenis = window.lenis;
  if (lenis) lenis.scrollTo(y, { lerp: 0.1 });
};
const getTotalScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
const progressToY = (p: number) => p * getTotalScroll();

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [detailItem, setDetailItem] = useState<Item | null>(null);

  const scrollToProgress = useCallback((p: number) => {
    scrollToY(progressToY(Math.max(0, Math.min(1, p))));
  }, []);

  useGSAP(
    () => {
      const trigger = document.getElementById("scroll-driver");
      const container = containerRef.current;
      if (!trigger || !container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "+=8000",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      const s1 = container.querySelector("[data-scene='1']") as HTMLElement;
      const s2 = container.querySelector("[data-scene='2']") as HTMLElement;
      const s3 = container.querySelector("[data-scene='3']") as HTMLElement;
      const s4 = container.querySelector("[data-scene='4']") as HTMLElement;
      const s5 = container.querySelector("[data-scene='5']") as HTMLElement;

      if (!s1 || !s2 || !s3 || !s4 || !s5) return;

      gsap.set(s1, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set([s2, s3, s4, s5], { autoAlpha: 0, scale: 0.92, y: 40 });

      tl.to(s1, { scale: 1, y: 0, autoAlpha: 1, duration: 0.02 }, 0)
        .to(s1, { scale: 0.92, y: -60, autoAlpha: 0, duration: 0.06, ease: "power2.in" }, 0.15)
        .to(s2, { scale: 0.92, y: 60, autoAlpha: 1, duration: 0.05, ease: "power2.out" }, 0.18)
        .to(s2, { scale: 1, y: 0, duration: 0.04 }, 0.18)
        .to(s2, { scale: 0.9, y: -80, autoAlpha: 0, duration: 0.06, ease: "power2.in" }, 0.36)
        .to(s3, { scale: 0.85, y: 40, autoAlpha: 1, duration: 0.05, ease: "back.out(1.4)" }, 0.38)
        .to(s3, { scale: 1, y: 0, duration: 0.06 }, 0.38)
        .to(s3, { scale: 0.88, y: 50, autoAlpha: 0, duration: 0.06, ease: "power2.in" }, 0.62)
        .to(s4, { scale: 0.9, y: 80, autoAlpha: 1, duration: 0.05, ease: "power2.out" }, 0.64)
        .to(s4, { scale: 1, y: 0, duration: 0.05 }, 0.64)
        .to(s4, { scale: 0.9, y: -60, autoAlpha: 0, duration: 0.05, ease: "power2.in" }, 0.82)
        .to(s5, { scale: 0.9, y: 30, autoAlpha: 1, duration: 0.06, ease: "back.out(1.2)" }, 0.84)
        .to(s5, { scale: 1, y: 0, duration: 0.05 }, 0.84);

      tl.fromTo(
        "[data-letter]",
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, stagger: 0.008, ease: "back.out(1.2)" },
        0
      );

      tl.fromTo(
        "[data-curator-img]",
        { scale: 1.3, opacity: 0, clipPath: "inset(20% 20% 20% 20%)" },
        { scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.out" },
        0.2
      );

      tl.fromTo(
        "[data-curator-text]",
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
        0.26
      );

      tl.fromTo(
        "[data-collection-item]",
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.05, stagger: 0.015, ease: "back.out(1.3)" },
        0.42
      );

      tl.fromTo(
        "[data-local-img]",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out" },
        0.66
      );

      tl.fromTo(
        "[data-local-text]",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
        0.7
      );

      tl.fromTo(
        "[data-cta]",
        { scale: 0.8, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.1, ease: "back.out(1.4)" },
        0.86
      );

      return () => tl.scrollTrigger?.kill();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Dock fijo — estilo Telescope */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pt-2">
        <div className="flex gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => scrollToProgress(0.45)}
            className="rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 transition hover:text-white"
          >
            Ver Menú
          </button>
          <button
            type="button"
            onClick={() => scrollToProgress(0.9)}
            className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Reservar
          </button>
        </div>
      </div>

      {/* Escena 1 — Hero estilo Telescope */}
      <section
        data-scene="1"
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ visibility: "visible", opacity: 1 }}
      >
        <h1 className="flex flex-wrap justify-center gap-x-1 gap-y-0 px-4 text-center font-serif text-3xl leading-tight text-white md:text-5xl md:leading-tight">
          {HERO_TITLE.split("").map((char, i) => (
            <span
              key={i}
              data-letter
              className={char === " " ? "inline-block w-2" : "inline-block"}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="mt-6 text-sm uppercase tracking-[0.5em] text-white/50">
          Platos que cuentan historias
        </p>
        <p className="mt-16 animate-bounce text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll
        </p>
      </section>

      {/* Escena 2 — Curator / Chef (estilo Telescope) */}
      <section
        data-scene="2"
        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:flex-row md:gap-16"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div data-curator-img className="relative h-[45vh] w-full max-w-xl overflow-hidden rounded-lg md:h-[60vh]">
          <img
            src={CURATORS[0].img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div data-curator-text className="mt-8 max-w-md md:mt-0">
          <p className="text-xs uppercase tracking-[0.4em] text-[#f59e0b]">
            {CURATORS[0].name}
          </p>
          <p className="mt-4 font-serif text-2xl leading-relaxed text-white md:text-3xl">
            {CURATORS[0].desc}
          </p>
        </div>
      </section>

      {/* Escena 3 — Libro de la carta */}
      <section
        data-scene="3"
        className="absolute inset-0 flex flex-col items-center justify-center overflow-auto px-4 pb-32 pt-12 md:px-6"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <h2 className="mb-2 font-serif text-2xl tracking-wide text-white md:text-3xl">
          La Carta
        </h2>
        <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/50">
          THE SECRET — desliza para explorar
        </p>
        <BookCarta onItemClick={setDetailItem} />
      </section>

      {/* Escena 4 — El Local / ambiente */}
      <section
        data-scene="4"
        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:flex-row md:gap-16"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div data-local-img className="relative h-[40vh] w-full max-w-2xl overflow-hidden rounded-xl md:h-[55vh]">
          <img
            src={CURATORS[1].img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div data-local-text className="mt-8 max-w-lg md:mt-0">
          <p className="text-xs uppercase tracking-[0.4em] text-[#f59e0b]">
            {CURATORS[1].name}
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-white md:text-2xl">
            {CURATORS[1].desc}
          </p>
          <p className="mt-6 text-sm text-white/60">
            Reserva y vive la experiencia.
          </p>
        </div>
      </section>

      {/* Modal de detalle del plato */}
      <AnimatePresence>
        {detailItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setDetailItem(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-[#141414] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={imgHd(detailItem.imageUrl)}
                alt={detailItem.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
                aria-label="Cerrar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl font-semibold text-white">{detailItem.name}</h3>
                <span className="text-lg font-semibold text-[#f59e0b]">{detailItem.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">{detailItem.description}</p>
              <p className="text-xs uppercase tracking-wider text-white/50">{detailItem.category}</p>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Escena 5 — CTA final (estilo Telescope) */}
      <section
        data-scene="5"
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <p className="mb-4 text-center font-serif text-2xl leading-relaxed text-white md:text-3xl">
          Sin prisas. Solo experiencia.
        </p>
        <p className="mb-12 text-center text-sm text-white/60">
          Recomendaciones reales por gente real
        </p>
        <motion.button
          data-cta
          type="button"
          onClick={() => scrollToProgress(0.9)}
          className="shimmer-btn rounded-full border-2 border-white bg-transparent px-10 py-4 font-medium uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reservar Mesa
        </motion.button>
      </section>
    </div>
  );
}
