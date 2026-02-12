"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getGSAP } from "@/lib/gsap";
import StoryHUD from "@/components/StoryHUD";

const TOTAL_SCENES = 8;
const SCENE_TITLES = ["Focus", "Signature", "Seasonal", "Menu", "Bento", "Filmstrip", "Cut Mask", "Reserve"];

const FILM_IMAGES = [
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1514516345957-556ca7a5f11d?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1500&q=80",
];

export default function ScrollyRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);

  const [hud, setHud] = useState({ current: 1, progress: 0, visible: true });
  const [isMobile] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false));
  const [reduceMotion] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const { gsap, ScrollTrigger } = getGSAP();

    const spotlightMove = (event: PointerEvent) => {
      if (mobile || isReduced) return;
      const grid = document.querySelector<HTMLElement>(".bento-spotlight");
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      grid.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      grid.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    window.addEventListener("pointermove", spotlightMove, { passive: true });

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(".story-scene") as HTMLElement[];
      const activateScene = (index: number) => {
        scenes.forEach((scene, i) => {
          gsap.to(scene, {
            autoAlpha: i === index ? 1 : 0,
            y: i === index ? 0 : 14,
            scale: i === index ? 1 : 0.995,
            duration: 0.42,
            ease: "power2.out",
            overwrite: "auto",
          });
          scene.style.pointerEvents = i === index ? "auto" : "none";
        });
      };

      gsap.set(scenes, { autoAlpha: 0, y: 14, scale: 0.995, pointerEvents: "none" });
      activateScene(0);

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to(frameRef.current, {
        clipPath: mobile ? "inset(0% 0% 0% 0% round 1rem)" : "inset(0% 0% 0% 0% round 0rem)",
        borderRadius: mobile ? "1rem" : "0rem",
        scale: mobile ? 1.03 : 1.08,
        duration: 1,
      })
        .to(".focus-vignette", { opacity: 0.22, duration: 0.8 }, "<")
        .to(".hero-title-wrap", { opacity: 0, y: -18, duration: 0.65 }, ">-0.1")
        .add(() => activateScene(1))
        .fromTo(".slice-reveal", { clipPath: "polygon(0 0,0 0,0 100%,0 100%)" }, { clipPath: "polygon(0 0,100% 0,85% 100%,0 100%)", duration: 0.95 })
        .fromTo(".slice-line", { scaleX: 0 }, { scaleX: 1, duration: 0.45, transformOrigin: "left center" }, "<0.1")
        .fromTo(".slice-caption", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, "<0.15")
        .add(() => activateScene(2))
        .fromTo(".shutter-a", { xPercent: -12 }, { xPercent: 0, duration: 0.7 })
        .fromTo(".shutter-b", { xPercent: 12 }, { xPercent: 0, duration: 0.7 }, "<")
        .fromTo(".shutter-c", { xPercent: -12 }, { xPercent: 0, duration: 0.7 }, "<")
        .fromTo(".season-stamp", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "<0.2")
        .add(() => activateScene(3))
        .to(".menu-card-1", { y: -10, rotate: -2.2, duration: 0.65 })
        .to(".menu-card-2", { y: 2, rotate: 1.6, duration: 0.65 }, "<")
        .to(".menu-card-3", { y: 16, rotate: 2.4, duration: 0.65 }, "<")
        .fromTo(".price-underline", { scaleX: 0 }, { scaleX: 1, duration: 0.4, transformOrigin: "left center" }, "<0.2")
        .add(() => activateScene(4))
        .fromTo(".bento-item", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.34 })
        .add(() => activateScene(5))
        .to(filmRef.current, {
          x: () => {
            const total = filmRef.current?.scrollWidth ?? 0;
            const viewport = filmRef.current?.parentElement?.clientWidth ?? 0;
            return -Math.max(0, total - viewport);
          },
          duration: isReduced ? 0.2 : 1,
        })
        .fromTo(".film-card", { clipPath: "inset(12% 8% 12% 8% round 1rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1rem)", stagger: 0.08, duration: 0.4 }, "<0.1")
        .add(() => activateScene(6))
        .fromTo(".cut-mask", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7 })
        .fromTo(".quote-card", { autoAlpha: 0, filter: "blur(6px)", y: 12 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, stagger: 0.12, duration: 0.35 }, "<0.2")
        .add(() => activateScene(7))
        .fromTo(".cta-glass", { backdropFilter: "blur(18px)", opacity: 0.78 }, { backdropFilter: "blur(10px)", opacity: 1, duration: 0.85 })
        .to(".cta-overlay", { opacity: 0.1, duration: 0.5 }, "<0.1");

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1000%",
        pin: true,
        scrub: isReduced ? false : 1,
        animation: tl,
        invalidateOnRefresh: true,
        onToggle: (self: { isActive: boolean }) => {
          window.dispatchEvent(new CustomEvent("rail-active", { detail: { active: self.isActive } }));
        },
        onUpdate: (self: { progress: number; isActive: boolean }) => {
          const current = Math.min(TOTAL_SCENES, Math.floor(self.progress * TOTAL_SCENES) + 1);
          setHud({ current, progress: self.progress * 100, visible: self.isActive });
          window.dispatchEvent(new CustomEvent("story-scene", { detail: { sceneIndex: current } }));
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => trigger.kill();
    }, section);

    return () => {
      window.removeEventListener("pointermove", spotlightMove);
      window.dispatchEvent(new CustomEvent("rail-active", { detail: { active: false } }));
      ctx.revert();
    };
  }, []);

  const filmset = useMemo(() => (isMobile ? FILM_IMAGES.slice(0, 5) : FILM_IMAGES), [isMobile]);

  return (
    <section ref={sectionRef} id="story-rail" className="relative h-screen overflow-hidden bg-black">
      <StoryHUD current={hud.current} total={TOTAL_SCENES} title={SCENE_TITLES[hud.current - 1]} progress={hud.progress} visible={hud.visible} />

      <div
        ref={frameRef}
        className="relative h-full w-full overflow-hidden border border-white/10 bg-black"
        style={{ clipPath: "inset(7% 8% 7% 8% round 2rem)" }}
      >
        <article className="story-scene scene-1 absolute inset-0 p-6 md:p-10">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero editorial" className="h-full w-full rounded-[1.8rem] object-cover" />
          <div className="focus-vignette absolute inset-0 opacity-0" style={{ background: "radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.72) 75%)" }} />
          <div className="hero-title-wrap absolute bottom-10 left-6 md:left-10">
            <motion.p animate={{ y: [0, -6, 0], opacity: [0.92, 1, 0.88] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} className="text-sm tracking-[0.2em] text-white/80">
              NOIR ATELIER
            </motion.p>
          </div>
        </article>

        <article className="story-scene scene-2 absolute inset-0 grid items-center p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-8">
            <div className="slice-reveal h-[68vh] overflow-hidden rounded-[1.6rem] border border-white/15">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diagonal reveal" className="h-full w-full object-cover" />
            </div>
            <span className="slice-line mt-3 block h-px w-full bg-[#ead8b8]/70" />
          </div>
          <motion.p animate={{ y: hud.current === 2 ? [8, 0] : 0, opacity: hud.current === 2 ? [0.4, 1] : 0.5 }} transition={{ duration: 0.55 }} className="slice-caption self-end md:col-span-4 md:pl-6 text-sm uppercase tracking-[0.18em] text-white/70">
            Signature pass, geometry precisa.
          </motion.p>
        </article>

        <article className="story-scene scene-3 absolute inset-0 grid items-center p-6 md:p-10">
          <div className="relative h-[70vh] overflow-hidden rounded-[1.7rem] border border-white/15">
            <div className="shutter-a absolute inset-y-0 left-0 w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80)", backgroundPosition: "0% 50%" }} />
            <div className="shutter-b absolute inset-y-0 left-1/3 w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80)", backgroundPosition: "50% 50%" }} />
            <div className="shutter-c absolute inset-y-0 left-2/3 w-1/3 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80)", backgroundPosition: "100% 50%" }} />
            <span className="season-stamp absolute bottom-6 left-6 rounded-full border border-white/35 bg-black/45 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/88">Seasonal / Limited</span>
          </div>
        </article>

        <article className="story-scene scene-4 absolute inset-0 grid items-center p-6 md:p-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="menu-card-1 relative z-30 rounded-3xl border border-white/16 bg-[#141414] p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Menu I</p>
              <p className="mt-2 text-xl">Cacao, sal de vainilla, crema tibia.</p>
            </div>
            <div className="menu-card-2 relative -mt-8 ml-10 z-20 rounded-3xl border border-white/14 bg-[#161616] p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Menu II</p>
              <p className="mt-2 text-xl">Brioche tostado y mantequilla noisette.</p>
            </div>
            <div className="menu-card-3 relative -mt-8 ml-20 z-10 rounded-3xl border border-white/14 bg-[#181818] p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Menu III</p>
              <p className="mt-2 text-xl">Cítricos, yogur y menta fresca.</p>
              <span className="mt-3 block text-sm text-[#ead8b8]">€58</span>
              <span className="price-underline block h-px w-24 bg-[#ead8b8]/80" />
            </div>
          </div>
        </article>

        <article className="story-scene scene-5 absolute inset-0 p-6 md:p-10">
          <div className="bento-spotlight relative grid h-full grid-cols-2 gap-4 rounded-[1.8rem] border border-white/14 bg-white/[0.02] p-4 md:grid-cols-4 [--mx:50%] [--my:50%]">
            {!hud.visible || false ? null : (
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.8rem]"
                style={{
                  background: isMobile || reduceMotion ? "none" : "radial-gradient(circle at var(--mx) var(--my), rgba(234,216,184,0.18), transparent 38%)",
                }}
              />
            )}
            {["Chef table", "Maridaje", "Private room", "Gift", "Cocktail", "Dessert", "Brunch", "Reserve"].map((item) => (
              <motion.article
                key={item}
                className="bento-item rounded-2xl border border-white/12 bg-black/45 p-4"
                whileHover={isMobile || reduceMotion ? {} : { x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{item}</p>
              </motion.article>
            ))}
          </div>
        </article>

        <article className="story-scene scene-6 absolute inset-0 overflow-hidden p-6 md:p-10">
          <div className="overflow-hidden">
            <div ref={filmRef} className="flex w-max gap-4">
              {filmset.map((img, idx) => (
                <div key={img} className="film-card group relative h-[68vh] w-[66vw] overflow-hidden rounded-[1.4rem] border border-white/14 md:w-[30vw]">
                  <img src={img} alt="Film chapter" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ transform: `translateY(${idx % 2 === 0 ? "-1%" : "1%"}) scale(1.06)` }} />
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-7 absolute inset-0 grid items-center p-6 md:p-10">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="cut-mask font-display text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.9]" style={{ WebkitMaskImage: "linear-gradient(90deg,#000 0%, #000 70%, transparent 100%)" }}>
              Quiet craft, precise tempo.
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {["Monocle — intimate and exact.", "AD — one of the most focused pastry rooms."].map((quote) => (
                <div key={quote} className="quote-card rounded-2xl border border-white/12 bg-white/[0.03] p-4 text-white/78">
                  {quote}
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="story-scene scene-8 absolute inset-0 grid items-center p-6 md:p-10">
          <div className="cta-glass relative mx-auto w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/[0.08] p-8 text-center backdrop-blur-[18px] md:p-12">
            <div className="cta-overlay pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-25" />
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Final reservation</p>
            <p className="mt-4 text-4xl leading-tight md:text-6xl">Reserve your evening.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Book table", "Private order"].map((cta) => (
                <button key={cta} className="rounded-full border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] transition hover:scale-[1.03] hover:bg-white hover:text-black" data-cursor="hover">
                  {cta}
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
