"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// 25 Platos con imágenes brutales
const menuData = [
  { id: 1, cat: "Entrantes", name: "Carpaccio de Wagyu", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500" },
  { id: 2, cat: "Entrantes", name: "Ostras al Champagne", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=500" },
  { id: 3, cat: "Entrantes", name: "Burrata Ahumada", img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=500" },
  { id: 4, cat: "Principales", name: "Solomillo al Carbón", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=500" },
  { id: 5, cat: "Principales", name: "Langosta Thermidor", img: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?q=80&w=500" },
  { id: 6, cat: "Postres", name: "Esfera de Oro y Choco", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500" },
  // ... Imagina que aquí siguen los 25 platos
];

export default function Experience() {
  const container = useRef(null);
  const bookContainer = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=6000", // Más largo para que dé tiempo a ver todo
        scrub: 1,
        pin: true,
      },
    });

    // Intro: El texto se abre paso al libro
    tl.to(".intro-text", { y: -100, opacity: 0, scale: 0.8, duration: 1 })
      
      // El libro entra girando desde el fondo
      .from(".book-3d", { rotateX: 45, rotateY: -30, z: -1000, opacity: 0, duration: 2 })

      // Animación de las páginas (simulamos 3 grandes bloques)
      .to(".page-1", { rotateY: -160, duration: 2 })
      .to(".page-2", { rotateY: -155, duration: 2 }, "-=1.5")
      
      // Los platos aparecen flotando con parallax
      .from(".food-item", { 
        y: 200, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 1.5,
        ease: "power2.out" 
      }, "-=2");

  }, { scope: container });

  return (
    <div ref={container} className="bg-zinc-950 min-h-screen text-white overflow-hidden">
      
      {/* TEXTO INICIAL */}
      <div className="intro-text absolute inset-0 flex flex-col items-center justify-center z-50">
        <h2 className="text-8xl font-serif italic mb-4">The Gallery</h2>
        <p className="tracking-[1em] uppercase text-orange-500 text-xs">Menú Degustación 2026</p>
      </div>

      {/* ESCENA DEL LIBRO 3D */}
      <div className="relative w-full h-screen flex items-center justify-center perspective-1000">
        <div className="book-3d preserve-3d relative w-[70vw] h-[70vh] max-w-4xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          
          {/* PORTADA */}
          <div className="page-1 absolute inset-0 bg-orange-900 origin-left z-30 preserve-3d rounded-r-xl border-l-8 border-black shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center backface-hidden">
                <h1 className="text-4xl font-serif border-2 border-orange-200/20 p-8 text-orange-200">LA CARTA</h1>
            </div>
            <div className="absolute inset-0 bg-zinc-100 text-black rotate-y-180 backface-hidden p-12 overflow-y-auto">
               <h3 className="text-3xl font-serif mb-8 border-b border-black/10">Entrantes</h3>
               <div className="grid grid-cols-2 gap-8">
                  {menuData.slice(0, 3).map(item => (
                    <div key={item.id} className="food-item">
                      <img src={item.img} className="w-full h-32 object-cover rounded-lg mb-2 shadow-lg" alt={item.name} />
                      <p className="font-bold text-sm">{item.name}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* SEGUNDA PÁGINA */}
          <div className="page-2 absolute inset-0 bg-zinc-50 origin-left z-20 preserve-3d rounded-r-xl shadow-xl">
             <div className="absolute inset-0 p-12 text-zinc-900">
                <h3 className="text-3xl font-serif mb-8 border-b border-black/10">Platos Principales</h3>
                <div className="grid grid-cols-3 gap-4">
                  {menuData.slice(3, 6).map(item => (
                    <div key={item.id} className="food-item">
                      <img src={item.img} className="w-full h-24 object-cover rounded-md mb-2" alt={item.name} />
                      <p className="text-[10px] uppercase font-bold">{item.name}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* FONDO DEL LIBRO (ÚLTIMA PÁGINA) */}
          <div className="absolute inset-0 bg-zinc-200 z-10 rounded-r-xl p-12 text-zinc-900">
             <h3 className="text-3xl font-serif mb-8 border-b border-black/10 text-center">Postres & Vinos</h3>
             <div className="flex justify-around items-center h-2/3">
                <div className="text-center food-item">
                    <img src={menuData[5].img} className="w-48 h-48 rounded-full object-cover border-8 border-white shadow-2xl" />
                    <p className="mt-4 italic font-serif">La Tentación Final</p>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}