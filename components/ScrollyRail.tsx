"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";
import StoryHUD from "@/components/StoryHUD";

const TOTAL_SCENES = 8;
const BEATS = 9;
const SCENE_TITLES = ["Intro", "Signature", "Process", "Menu", "Bento", "Gallery", "Social", "CTA"];

const IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1900&q=80",
  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1900&q=80",
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ScrollyRail() {
  const railRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const sharedMediaRef = useRef<HTMLDivElement>(null);
  const filmTrackRef = useRef<HTMLDivElement>(null);

  const [hud, setHud] = useState({ current: 1, progress: 0, visible: true });
  const [activeScene, setActiveScene] = useState(0);
  const [sharedMediaSrc, setSharedMediaSrc] = useState(IMAGES[0]);
  const [isMobile] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false));
  const [isReduced] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false));

  const sceneSet = useMemo(() => IMAGES.slice(0, 8), []);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const media = sharedMediaRef.current;
    if (!rail || !media) return;

    const { gsap, ScrollTrigger, Flip } = getGSAP();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileView = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const scenes = Array.from(rail.querySelectorAll<HTMLElement>(".story-scene"));
      const placeholders = Array.from(rail.querySelectorAll<HTMLElement>("[data-media-slot]"));
      const beatSize = 1 / BEATS;
      const railImages = Array.from(rail.querySelectorAll<HTMLElement>("img"));

      if (placeholders[0] && !placeholders[0].contains(media)) {
        placeholders[0].appendChild(media);
      }

      let currentScene = 0;
      const moveSharedMedia = (sceneIndex: number) => {
        const slot = placeholders[sceneIndex];
        if (!slot || slot.contains(media)) return;

        const image = media.querySelector("img");
        if (image) {
          gsap.to(image, {
            autoAlpha: 0.5,
            duration: 0.2,
            onComplete: () => {
              setSharedMediaSrc(sceneSet[sceneIndex]);
              gsap.to(image, { autoAlpha: 1, duration: 0.32 });
            },
          });
        }

        const state = Flip.getState(media);
        slot.appendChild(media);
        Flip.from(state, {
          duration: reducedMotion ? 0.35 : 0.95,
          ease: "power3.inOut",
          absolute: true,
          simple: true,
        });
      };

      const setSceneVisibility = (nextScene: number) => {
        const prevScene = scenes[currentScene];
        const next = scenes[nextScene];
        if (!next || nextScene === currentScene) return;

        prevScene.style.pointerEvents = "none";
        next.style.pointerEvents = "auto";

        gsap.to(prevScene, { autoAlpha: 0, y: -10, scale: 0.985, duration: 0.38, ease: "power2.out", overwrite: "auto" });
        gsap.fromTo(next, { autoAlpha: 0, y: 16, scale: 0.98, immediateRender: false }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", overwrite: "auto" });

        currentScene = nextScene;
        setActiveScene(nextScene);
        moveSharedMedia(nextScene);
      };

      gsap.set(scenes, { autoAlpha: 0, y: 14, scale: 0.985, pointerEvents: "none" });
      gsap.set(scenes[0], { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto" });
      gsap.set(railImages, { autoAlpha: 1, opacity: 1 });

      const master = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      master
        .to(cameraRef.current, { scale: 1.02, rotateZ: -0.4, duration: 1 }, 0)
        .to(".s1-vignette", { opacity: 0.3, duration: 0.9 }, 0)
        .to(".s1-copy", { autoAlpha: 0, y: -16, duration: 0.8 }, 0.25)
        .add(() => setSceneVisibility(1), beatSize * 1)
        .fromTo(".s2-diagonal", { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", immediateRender: false }, { clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)", duration: 0.9 }, beatSize * 1)
        .fromTo(".s2-line", { scaleX: 0, immediateRender: false }, { scaleX: 1, duration: 0.55, transformOrigin: "left center" }, beatSize * 1.08)
        .fromTo(".s2-highlight", { xPercent: -130, opacity: 0, immediateRender: false }, { xPercent: 140, opacity: 0.25, duration: 0.65 }, beatSize * 1.2)
        .add(() => setSceneVisibility(2), beatSize * 2)
        .fromTo(".s3-panel-a", { xPercent: -25, immediateRender: false }, { xPercent: 0, duration: 0.7 }, beatSize * 2)
        .fromTo(".s3-panel-b", { xPercent: 20, immediateRender: false }, { xPercent: 0, duration: 0.7 }, beatSize * 2.05)
        .fromTo(".s3-panel-c", { xPercent: -20, immediateRender: false }, { xPercent: 0, duration: 0.7 }, beatSize * 2.08)
        .fromTo(".s3-badge", { autoAlpha: 0, y: 10, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.4 }, beatSize * 2.28)
        .add(() => setSceneVisibility(3), beatSize * 3)
        .fromTo(".s4-stack", { y: 22, rotate: -1.6, scale: 0.97, immediateRender: false }, { y: 0, rotate: 0, scale: 1, duration: 0.65 }, beatSize * 3)
        .to(".s4-card-a", { y: -8, rotate: -1.8, duration: 0.55 }, beatSize * 3.08)
        .to(".s4-card-b", { y: 6, rotate: 1.6, duration: 0.55 }, beatSize * 3.1)
        .to(".s4-card-c", { y: 12, rotate: 2, duration: 0.55 }, beatSize * 3.12)
        .add(() => setSceneVisibility(4), beatSize * 4)
        .fromTo(".s5-tile", { autoAlpha: 0, y: 16, immediateRender: false }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.34 }, beatSize * 4)
        .add(() => setSceneVisibility(5), beatSize * 5)
        .to(filmTrackRef.current, {
          x: () => {
            const total = filmTrackRef.current?.scrollWidth ?? 0;
            const viewport = filmTrackRef.current?.parentElement?.clientWidth ?? 0;
            return -Math.max(0, total - viewport);
          },
          duration: 1,
        }, beatSize * 5)
        .fromTo(".s6-item", { clipPath: "inset(14% 10% 14% 10% round 1rem)", immediateRender: false }, { clipPath: "inset(0% 0% 0% 0% round 1rem)", stagger: 0.08, duration: 0.36 }, beatSize * 5.05)
        .add(() => setSceneVisibility(6), beatSize * 6)
        .fromTo(".s7-mask", { clipPath: "inset(0 100% 0 0)", immediateRender: false }, { clipPath: "inset(0 0% 0 0)", duration: 0.75 }, beatSize * 6)
        .fromTo(".s7-quote", { autoAlpha: 0, filter: "blur(6px)", y: 14, immediateRender: false }, { autoAlpha: 1, filter: "blur(0px)", y: 0, stagger: 0.1, duration: 0.34 }, beatSize * 6.2)
        .add(() => setSceneVisibility(7), beatSize * 7.85)
        .fromTo(".s8-glass", { backdropFilter: "blur(18px)", opacity: 0.78, immediateRender: false }, { backdropFilter: "blur(8px)", opacity: 1, duration: 0.8 }, beatSize * 7.85)
        .to(cameraRef.current, { scale: 1, rotateZ: 0, x: 0, y: 0, duration: 0.8, ease: "power2.out" }, beatSize * 8)
        .fromTo(".dock-settle", { y: 0, immediateRender: false }, { y: -2, yoyo: true, repeat: 1, duration: 0.16 }, beatSize * 8.05);

      const trigger = ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: `+=${TOTAL_SCENES * 150}%`,
        pin: true,
        scrub: reducedMotion ? false : 1.08,
        animation: master,
        invalidateOnRefresh: true,
        onToggle: (self: { isActive: boolean }) => {
          window.dispatchEvent(new CustomEvent("rail-active", { detail: { active: self.isActive } }));
        },
        onUpdate: (self: { progress: number; start: number; end: number; getVelocity: () => number; isActive: boolean }) => {
          const scene = Math.min(TOTAL_SCENES, Math.floor(self.progress * TOTAL_SCENES) + 1);
          setHud({ current: scene, progress: self.progress * 100, visible: self.isActive });
          window.dispatchEvent(new CustomEvent("story-scene", { detail: { sceneIndex: scene } }));

          if (!reducedMotion && !mobileView) {
            const velocity = Math.abs(self.getVelocity());
            const blur = clamp((velocity / 2200) * 6, 0, 6);
            gsap.to(media, { filter: `blur(${blur.toFixed(2)}px)`, duration: 0.18, overwrite: "auto" });
          }

        },
      });

      const spotlightMove = (event: PointerEvent) => {
        if (reducedMotion || mobileView) return;
        const grid = rail.querySelector<HTMLElement>(".s5-spotlight");
        if (!grid) return;
        const rect = grid.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
        grid.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        grid.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      };

      window.addEventListener("pointermove", spotlightMove, { passive: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("pointermove", spotlightMove);
        trigger.kill();
      };
    }, rail);

    return () => {
      window.dispatchEvent(new CustomEvent("rail-active", { detail: { active: false } }));
      ctx.revert();
    };
  }, [sceneSet]);

  return (
    <section ref={railRef} id="story-rail" className="relative bg-black">
      <StoryHUD current={hud.current} total={TOTAL_SCENES} title={SCENE_TITLES[hud.current - 1]} progress={hud.progress} visible={hud.visible} />

      <div ref={stageRef} className="stage relative h-screen overflow-hidden border-y border-white/10">
        <div ref={cameraRef} className="camera relative h-full w-full will-change-transform">
          <article className="story-scene absolute inset-0 z-10 p-6 md:p-10 relative">
            <div className="h-full rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 md:p-10">
              <div data-media-slot className="relative mx-auto h-[66vh] max-w-5xl overflow-hidden rounded-[1.6rem]" />
              <div className="s1-vignette pointer-events-none absolute inset-0 opacity-0" style={{ background: "radial-gradient(circle at center, transparent 14%, rgba(0,0,0,0.8) 82%)" }} />
              <motion.div animate={{ y: activeScene === 0 ? [14, 0] : 0, opacity: activeScene === 0 ? [0, 1] : 0 }} transition={{ duration: 0.7 }} className="s1-copy absolute left-10 top-10 max-w-md">
                <p className="text-[11px] uppercase tracking-[0.26em] text-[#efe0c2]/90">Noir Atelier</p>
                <p className="mt-5 font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.9] text-[#f8f2e8]">Una noche diseñada como cine lento.</p>
              </motion.div>
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-20 grid items-center p-6 md:grid-cols-12 md:p-10 relative">
            <div className="md:col-span-8">
              <div data-media-slot className="s2-diagonal relative h-[64vh] overflow-hidden rounded-[1.5rem] border border-white/15" />
              <span className="s2-line mt-3 block h-px w-full bg-[#efe0c2]/70" />
              <span className="s2-highlight pointer-events-none absolute left-0 top-0 h-full w-24 bg-white/20 blur-xl" />
            </div>
            <motion.p animate={{ y: activeScene === 1 ? [12, 0] : 0, opacity: activeScene === 1 ? [0.25, 0.9] : 0.35 }} transition={{ duration: 0.52 }} className="self-end text-sm uppercase tracking-[0.2em] text-white/68 md:col-span-4 md:pl-7">
              Corte diagonal, tensión editorial.
            </motion.p>
          </article>

          <article className="story-scene absolute inset-0 z-30 grid items-center p-6 md:p-10 relative">
            <div data-media-slot className="relative h-[68vh] overflow-hidden rounded-[1.7rem] border border-white/14">
              <div className="s3-panel-a absolute inset-y-0 left-0 w-1/3 border-r border-white/10 bg-black/15" />
              <div className="s3-panel-b absolute inset-y-0 left-1/3 w-1/3 border-r border-white/10 bg-black/10" />
              <div className="s3-panel-c absolute inset-y-0 left-2/3 w-1/3 bg-black/15" />
              <span className="s3-badge absolute bottom-6 left-6 rounded-full border border-white/35 bg-black/50 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/90">Seasonal / Limited</span>
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-40 grid items-center p-6 md:p-10 [perspective:1200px] relative">
            <div className="s4-stack mx-auto w-full max-w-4xl">
              <div className="s4-card-a rounded-3xl border border-white/15 bg-[#121212] p-6">Cacao · vainilla · crema tibia</div>
              <div className="s4-card-b -mt-7 ml-12 rounded-3xl border border-white/12 bg-[#151515] p-6">Brioche · noisette · sal marina</div>
              <div className="s4-card-c -mt-7 ml-20 rounded-3xl border border-white/12 bg-[#181818] p-6">Cítricos · yogur · menta</div>
              <div data-media-slot className="mt-8 h-[38vh] overflow-hidden rounded-[1.5rem] border border-white/14" />
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-50 p-6 md:p-10 relative">
            <div className="s5-spotlight relative grid h-full grid-cols-2 gap-3 rounded-[1.7rem] border border-white/14 bg-white/[0.03] p-4 [--mx:50%] [--my:50%] md:grid-cols-4">
              <div className="pointer-events-none absolute inset-0 rounded-[1.7rem]" style={{ background: isMobile || isReduced ? "none" : "radial-gradient(circle at var(--mx) var(--my), rgba(239,224,194,0.14), transparent 40%)" }} />
              <div data-media-slot className="col-span-2 row-span-2 overflow-hidden rounded-[1.3rem] border border-white/16" />
              {[
                "Chef table",
                "Maridaje",
                "Private room",
                "Gift box",
                "After-dinner",
                "Brunch",
              ].map((item) => (
                <motion.div key={item} className="s5-tile rounded-2xl border border-white/12 bg-black/45 p-4 text-[11px] uppercase tracking-[0.19em] text-white/72" whileHover={isMobile || isReduced ? {} : { x: 2, y: -2 }} transition={{ duration: 0.2 }}>
                  {item}
                </motion.div>
              ))}
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-60 overflow-hidden p-6 md:p-10 relative">
            <div className="h-full overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#0e0e0e] p-4">
              <div ref={filmTrackRef} className="flex w-max gap-4">
                <div data-media-slot className="s6-item h-[64vh] w-[66vw] overflow-hidden rounded-[1.3rem] border border-white/16 md:w-[30vw]" />
                {sceneSet.slice(1, 7).map((img, idx) => (
                  <div key={img} className="s6-item group relative h-[64vh] w-[66vw] overflow-hidden rounded-[1.3rem] border border-white/12 md:w-[30vw]">
                    <Image src={img} alt="Gallery item" fill className="h-full w-full object-cover" sizes="(max-width: 768px) 66vw, 30vw" style={{ transform: `translateY(${idx % 2 === 0 ? "-1.5%" : "1.5%"}) scale(1.06)` }} priority={idx < 2} unoptimized />
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-70 grid items-center p-6 md:p-10 relative">
            <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_1.1fr]">
              <div data-media-slot className="h-[52vh] overflow-hidden rounded-[1.4rem] border border-white/14 opacity-70" />
              <div>
                <h2 className="s7-mask font-display text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.9]">Quiet craft, precise tempo.</h2>
                <div className="mt-8 space-y-3">
                  {["Monocle — intimate and exact.", "AD — one of the most focused pastry rooms."].map((quote) => (
                    <p key={quote} className="s7-quote rounded-2xl border border-white/12 bg-white/[0.03] p-4 text-white/76">
                      {quote}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="story-scene absolute inset-0 z-80 grid items-center p-6 md:p-10 relative">
            <div data-media-slot className="absolute inset-4 overflow-hidden rounded-[2rem] border border-white/10 opacity-35 md:inset-8" />
            <div className="s8-glass relative mx-auto w-full max-w-3xl rounded-[2rem] border border-white/22 bg-white/[0.09] p-8 text-center backdrop-blur-[18px] md:p-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#efe0c2]/82">Último pase</p>
              <p className="mt-4 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[0.9]">Reserva tu noche.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["Book table", "Private order"].map((cta) => (
                  <button key={cta} data-cursor="hover" className="rounded-full border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] transition hover:scale-[1.03] hover:bg-white hover:text-black">
                    {cta}
                  </button>
                ))}
              </div>
            </div>
          </article>

          <div ref={sharedMediaRef} className="sharedMedia absolute left-0 top-0 h-full w-full overflow-hidden rounded-[inherit] border border-white/12 bg-[#0c0c0c] will-change-transform">
            <Image src={sharedMediaSrc} alt="Hero media" fill sizes="100vw" className="h-full w-full object-cover" priority unoptimized />
          </div>
        </div>
      </div>
    </section>
  );
}
