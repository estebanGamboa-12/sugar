"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Instagram, ArrowUpRight } from 'lucide-react';

// --- 1. CURSOR PERSONALIZADO ---
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
     window.addEventListener("mousemove", handleMouse);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-pink-500 rounded-full pointer-events-none z-[999] mix-blend-difference"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

// --- 2. TEXTO INFINITO (MARQUEE) ---
const RollingText = ({ baseVelocity = 100, children }: { baseVelocity?: number, children: React.ReactNode }) => {
    return (
    <div className="flex overflow-hidden whitespace-nowrap py-10 border-y border-black/5">
      <motion.div
        className="flex text-[8vw] font-black uppercase italic tracking-tighter"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <span className="pr-10">{children}</span>
        <span className="pr-10">{children}</span>
      </motion.div>
    </div>
  );
};

export default function MegaLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  const [isClient, setIsClient] = useState(false);

  // Transformaciones locas
  const skew = useTransform(smoothVelocity, [-1, 1], [-20, 20]);
  const rotate = useTransform(smoothVelocity, [-1, 1], [-45, 45]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);


  // Este useEffect solo se ejecuta en el navegador
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="bg-[#fffaf5]">
      {/* Solo cargamos el cursor y las animaciones locas si es el cliente */}
      {isClient && <CustomCursor />}
      return (
      <div ref={containerRef} className="bg-[#fffaf5] cursor-none">
        <CustomCursor />

        {/* NAVBAR FLOTANTE */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] flex justify-between items-center px-8 py-4 bg-black text-white rounded-[30px]">
          <span className="font-black italic text-xl">SUGAR LAB®</span>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-50">
            <span>Obrador</span><span>Menú</span><span>Ubicación</span>
          </div>
          <ShoppingBag size={20} />
        </nav>

        {/* --- HERO SECTION: MÁXIMO IMPACTO --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ skewX: skew }} className="z-10 text-center">
            <motion.h1
              className="text-[18vw] font-[1000] leading-[0.75] tracking-[ -0.05em] uppercase italic"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Bake<br /><span className="text-pink-500 italic">Rules.</span>
            </motion.h1>
          </motion.div>

          {/* ELEMENTOS VOLADORES CON FÍSICAS */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl md:text-8xl"
              initial={{ x: Math.random() * 1000 - 500, y: 500 }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
              style={{
                top: `${20 + i * 10}%`,
                left: `${10 + i * 15}%`,
                filter: "blur(2px)"
              }}
            >
              {["🍓", "🍩", "🍫", "🍪", "🥯", "🧁"][i]}
            </motion.div>
          ))}
        </section>

        <RollingText>Artesanía radical • Freshly baked • Limited drops •</RollingText>

        {/* --- SECCIÓN STICKY INTERACTIVA --- */}
        <section className="relative h-[300vh] px-6 py-20">
          <div className="sticky top-20 flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/2 overflow-hidden rounded-[60px] h-[70vh] relative group">
              <motion.div style={{ scale: bgScale }} className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 space-y-20 pt-20">
              <motion.div whileInView={{ x: 0, opacity: 1 }} initial={{ x: 50, opacity: 0 }} className="max-w-md">
                <Star className="mb-6 text-pink-500" fill="currentColor" />
                <h2 className="text-6xl font-black italic mb-6 leading-none tracking-tighter">EL SECRETO DE LAS 48 HORAS.</h2>
                <p className="text-xl opacity-60">No corremos. Nuestra masa madre fermenta a temperatura controlada para conseguir el alveolado perfecto.</p>
              </motion.div>

              <motion.div whileInView={{ x: 0, opacity: 1 }} initial={{ x: 50, opacity: 0 }} className="max-w-md">
                <h2 className="text-6xl font-black italic mb-6 leading-none tracking-tighter text-pink-500 underline">CHOCOLATE DE ORIGEN.</h2>
                <p className="text-xl opacity-60">Trabajamos con cooperativas en Ecuador para traer el cacao más puro del planeta a tu paladar.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- GRID DE PRODUCTOS "BENTO STYLE" --- */}
        <section className="py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            <div className="md:col-span-2 md:row-span-2 bg-pink-100 rounded-[50px] p-12 flex flex-col justify-between overflow-hidden relative">
              <h3 className="text-7xl font-black italic tracking-tighter relative z-10 leading-none">EL BOX<br />ICÓNICO.</h3>
              <div className="text-[15vw] absolute -bottom-10 -right-10 opacity-20">📦</div>
              <motion.button whileHover={{ scale: 1.05 }} className="bg-black text-white self-start px-8 py-4 rounded-full font-bold flex items-center gap-2">
                RESERVAR <ArrowRight size={18} />
              </motion.button>
            </div>
            <div className="bg-orange-200 rounded-[50px] p-8 flex flex-col justify-end group">
              <span className="text-4xl mb-auto group-hover:rotate-12 transition-transform">🥯</span>
              <p className="font-bold text-2xl tracking-tighter italic leading-none text-orange-900/50 uppercase">Brioche de Naranja</p>
            </div>
            <div className="bg-zinc-900 text-white rounded-[50px] p-8 flex flex-col justify-between italic font-black">
              <p className="text-4xl leading-none italic">100% ARTESANAL.</p>
              <ArrowUpRight size={40} className="self-end" />
            </div>
            <div className="md:col-span-2 bg-white border border-black/5 rounded-[50px] p-10 flex items-center justify-between shadow-2xl shadow-pink-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-30 mb-2">Próximo Drop</p>
                <h4 className="text-4xl font-black italic">TARTA DE QUESO & MATCHA</h4>
              </div>
              <span className="text-5xl">🍵</span>
            </div>
          </div>
        </section>

        {/* --- FOOTER DESTRUCTOR --- */}
        <footer className="bg-black text-white pt-40 pb-10 px-6 rounded-t-[100px] overflow-hidden relative">
          <motion.div style={{ y: rotate }} className="text-center mb-40">
            <h2 className="text-[15vw] font-black italic tracking-tighter leading-none">JOIN THE<br /><span className="text-pink-500 underline">LAB.</span></h2>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-10 opacity-40 font-bold uppercase text-[10px] tracking-[0.5em]">
            <p>Madrid • Barcelona • Valencia</p>
            <div className="flex gap-10">
              <span>Instagram</span><span>TikTok</span><span>Twitter</span>
            </div>
            <p>© 2026 SUGAR LAB ARTISANS</p>
          </div>
        </footer >
      </div>
      );
      {/* Para los elementos con Math.random(), haz lo mismo: */}
      {isClient && [...Array(6)].map((_, i) => (
        <motion.div key={i}>
          {["🍓", "🍩"][i % 2]}
        </motion.div>
      ))}
    </div>
  );
}
