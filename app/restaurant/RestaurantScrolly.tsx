'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { chefCategories, chefPortrait, dishes, heroImages, type ImageAsset } from './data';
import { useLenisGsap } from './useLenisGsap';

gsap.registerPlugin(ScrollTrigger);

const stageCount = 6;

function SmartImage({
  asset,
  className,
  fill,
  width,
  height,
  priority = false,
  sizes
}: {
  asset: ImageAsset;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const [src, setSrc] = useState(asset.localSrc);

  return (
    <Image
      src={src}
      alt={asset.alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      onError={() => {
        if (src !== asset.remoteSrc) {
          setSrc(asset.remoteSrc);
        }
      }}
    />
  );
}

export default function RestaurantScrolly() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [activeDish, setActiveDish] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroImageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dishBgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dishNameRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLenisGsap(reducedMotion);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!section || !pinWrap) return;

    const ctx = gsap.context(() => {
      gsap.set(stageRefs.current, { autoAlpha: 0 });
      gsap.set(stageRefs.current[0], { autoAlpha: 1 });
      gsap.set(dishBgRefs.current, { autoAlpha: 0 });
      gsap.set(dishBgRefs.current[0], { autoAlpha: 1 });
      gsap.set(dishNameRefs.current, { color: '#9CA3AF', x: 0, opacity: 0.8 });
      gsap.set(dishNameRefs.current[0], { color: '#ffffff', x: 14, opacity: 1 });

      if (!reducedMotion) {
        heroImageRefs.current.forEach((el) => {
          if (!el) return;
          gsap.to(el, {
            y: `random(-14, 14)`,
            duration: `random(5, 8)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${stageCount * 1200}`,
          pin: pinWrap,
          scrub: reducedMotion ? false : 1.2,
          snap: reducedMotion
            ? false
            : {
                snapTo: 'labelsDirectional',
                duration: { min: 0.18, max: 0.55 },
                delay: 0.05
              },
          onUpdate: (self: { progress: number }) => {
            const stage = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
            setActiveStage(stage);
          }
        }
      });

      for (let i = 0; i < stageCount; i += 1) {
        timeline.addLabel(`s${i}`);

        stageRefs.current.forEach((ref, index) => {
          if (!ref) return;
          timeline.to(
            ref,
            {
              autoAlpha: index === i ? 1 : 0,
              duration: 0.4
            },
            `s${i}`
          );
        });

        if (i === 0 && !reducedMotion) {
          heroImageRefs.current.forEach((el, index) => {
            if (!el) return;
            timeline.fromTo(
              el,
              { y: 0 },
              { y: heroImages[index].parallax, duration: 1.1 },
              's0'
            );
          });
        }

        if (i === 3) {
          dishes.forEach((dish, dishIndex) => {
            const startAt = dishIndex * 0.24;
            timeline.call(
              () => {
                setActiveDish(dishIndex);
              },
              [],
              `s3+=${startAt}`
            );

            timeline.to(
              dishBgRefs.current,
              {
                autoAlpha: (bgIndex: number) => (bgIndex === dishIndex ? 1 : 0),
                duration: 0.35
              },
              `s3+=${startAt}`
            );

            timeline.to(
              dishNameRefs.current,
              {
                color: (nameIndex: number) => (nameIndex === dishIndex ? '#ffffff' : '#9CA3AF'),
                opacity: (nameIndex: number) => (nameIndex === dishIndex ? 1 : 0.65),
                x: (nameIndex: number) => (nameIndex === dishIndex ? 14 : 0),
                duration: 0.35
              },
              `s3+=${startAt}`
            );
          });
        }

        if (i === 5) {
          timeline.to(
            heroImageRefs.current,
            {
              x: (index: number) => (index % 2 === 0 ? 180 : 210),
              y: (index: number) => (index % 2 === 0 ? 110 + index * 3 : -40 + index * 4),
              scale: 0.58,
              rotate: (index: number) => (index % 3 === 0 ? -8 : 8),
              duration: 0.8,
              stagger: 0.03
            },
            's5'
          );
        }

        timeline.to({}, { duration: 1 });
      }

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-[#0E0D0B] text-white">
      <a
        href="#restaurant-cta"
        className="sr-only z-50 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip animations
      </a>

      <div className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col md:gap-3">
        {Array.from({ length: stageCount }).map((_, idx) => (
          <span
            key={`dot-${idx}`}
            className={`h-2.5 w-2.5 rounded-full border border-white/60 transition ${
              idx === activeStage ? 'bg-white' : 'bg-transparent'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div ref={pinWrapRef} className="relative h-screen overflow-hidden">
        <div className="absolute left-14 top-24 h-24 w-px rotate-12 bg-white/20" />
        <div className="absolute right-20 top-32 h-20 w-px -rotate-12 bg-white/20" />

        <div
          ref={(el) => {
            stageRefs.current[0] = el;
          }}
          className="absolute inset-0 bg-[#F7F0E4] text-[#17130E]"
        >
          <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#5f4d36]">Casa Trama</p>
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight md:text-7xl">
              Cocina de fuego lento y memoria viva.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-[#4B3D2A] md:text-xl">
              Una experiencia inmersiva donde el carbón, el mar y la huerta se encuentran en cada pase.
            </p>
          </div>

          {heroImages.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                heroImageRefs.current[index] = el;
              }}
              className={`absolute ${item.className}`}
            >
              <motion.div
                whileHover={{ scale: 1.06, rotate: index % 2 === 0 ? -2 : 2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                className="relative overflow-hidden rounded-lg border border-white/60 shadow-xl"
              >
                <SmartImage
                  asset={item}
                  width={240}
                  height={300}
                  priority={index < 4}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 24vw, 16vw"
                />
              </motion.div>
            </div>
          ))}
        </div>

        <div
          ref={(el) => {
            stageRefs.current[1] = el;
          }}
          className="absolute inset-0 bg-[#15110D] px-8 py-20"
        >
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <p className="text-3xl font-semibold leading-[1.15] text-[#F6EEE4] md:text-6xl">
              Cocinamos desde el origen, celebrando el producto, el tiempo y el gesto preciso. Cada servicio
              es una coreografía de calor y silencio donde{' '}
              <span className="relative inline-block">
                territorio
                <svg
                  viewBox="0 0 220 30"
                  className="absolute -bottom-3 left-0 h-7 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20 C 52 5, 120 32, 216 12"
                    stroke="#D3A45A"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset={reducedMotion ? 0 : 300}
                  >
                    {!reducedMotion && (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="300"
                        to="0"
                        dur="1.3s"
                        begin="0.2s"
                        fill="freeze"
                      />
                    )}
                  </path>
                </svg>
              </span>{' '}
              significa emoción.
            </p>
          </div>
        </div>

        <div
          ref={(el) => {
            stageRefs.current[2] = el;
          }}
          className="absolute inset-0 bg-[#111111] px-8 py-16"
        >
          <div className="mx-auto grid h-full max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="relative h-[55vh] overflow-hidden rounded-2xl border border-white/20 md:h-[70vh]">
              <SmartImage asset={chefPortrait} fill className="object-cover" sizes="(max-width: 768px) 90vw, 45vw" />
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.45em] text-white/70">Chef residente</p>
              <h2 className="text-4xl font-semibold md:text-6xl">Lucía Aranda</h2>
              <p className="mt-5 max-w-md text-base text-white/75 md:text-lg">
                Formada entre Barcelona y Lima, Lucía cocina con fuego, salinidad y acidez para crear menús
                con identidad contemporánea.
              </p>
              <div className="mt-8 space-y-2 text-3xl text-white/90 md:text-5xl">
                {chefCategories.map((category) => (
                  <p key={category}>{category}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={(el) => {
            stageRefs.current[3] = el;
          }}
          className="absolute inset-0 bg-black"
        >
          <div className="absolute inset-0">
            {dishes.map((dish, index) => (
              <div
                key={dish.id}
                ref={(el) => {
                  dishBgRefs.current[index] = el;
                }}
                className="absolute inset-0"
              >
                <SmartImage
                  asset={dish.background}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/45" />
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto grid h-full max-w-6xl px-8 py-16 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/75">Signature dishes</p>
              <div className="space-y-3">
                {dishes.map((dish, index) => (
                  <div
                    key={dish.id}
                    ref={(el) => {
                      dishNameRefs.current[index] = el;
                    }}
                    className="text-3xl font-medium md:text-5xl"
                  >
                    {dish.name}
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-xl text-sm text-white/80 md:text-base">{dishes[activeDish].subtitle}</p>
              <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">{dishes[activeDish].description}</p>
            </div>

            <div className="mt-10 flex flex-col gap-4 md:mt-0">
              {dishes[activeDish].thumbs.map((thumb) => (
                <div key={thumb.alt} className="relative h-24 w-32 overflow-hidden rounded-lg border border-white/30">
                  <SmartImage asset={thumb} fill className="object-cover" sizes="180px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={(el) => {
            stageRefs.current[4] = el;
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[#1E2A2A]" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#CFA579] to-[#6D4A2C]"
            style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}
          />
          <div className="relative flex h-full items-center justify-center px-8">
            <h2 className="text-center text-5xl font-semibold tracking-tight md:text-8xl">Atmósfera en transición</h2>
          </div>
        </div>

        <div
          ref={(el) => {
            stageRefs.current[5] = el;
          }}
          id="restaurant-cta"
          className="absolute inset-0 bg-[#F0ECE5] px-8 py-16 text-[#131313]"
        >
          <div className="mx-auto grid h-full max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#7A6851]">Último acto</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                Tu mesa espera para contar la próxima historia.
              </h2>
              <p className="mt-5 max-w-md text-base text-[#3F362D] md:text-lg">
                Reserva tu experiencia o explora el menú de temporada para descubrir cada pase con detalle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.04, rotate: -1.2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Reservar mesa
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, rotate: 1.2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[#1D1D1D] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1D1D1D] outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Ver menú
                </motion.button>
              </div>
            </div>
            <div className="relative h-[68vh]">
              {heroImages.slice(0, 8).map((image, index) => (
                <div
                  key={`cta-${image.id}`}
                  className="absolute overflow-hidden rounded-xl border border-black/10 shadow-lg"
                  style={{
                    width: `${30 + (index % 4) * 8}%`,
                    left: `${42 + (index % 3) * 10}%`,
                    top: `${8 + index * 6}%`,
                    transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
                  }}
                >
                  <SmartImage asset={image} width={360} height={440} className="h-auto w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
