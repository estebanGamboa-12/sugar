"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// 25 Platos Premium con imágenes de Unsplash
const menuItems = [
  { id: 1, title: "Ostras Fine de Claire", cat: "Entrantes", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0" },
  { id: 2, title: "Tártar de Atún Rojo", cat: "Entrantes", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { id: 3, title: "Carpaccio de Wagyu", cat: "Entrantes", img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: 4, title: "Caviar Beluga", cat: "Entrantes", img: "https://images.unsplash.com/photo-1534604973900-c41ab4c5e636" },
  { id: 5, title: "Burrata Ahumada", cat: "Entrantes", img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38" },
  { id: 6, title: "Solomillo Rossini", cat: "Principales", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c" },
  { id: 7, title: "Bogavante a la Brasa", cat: "Principales", img: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9" },
  { id: 8, title: "Risotto de Trufa Negra", cat: "Principales", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371" },
  { id: 9, title: "Bacalao Giraldo", cat: "Principales", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06" },
  { id: 10, title: "Pato Barberie", cat: "Principales", img: "https://images.unsplash.com/photo-1516100882582-76c9a586590c" },
  { id: 11, title: "Cordero Lechal", cat: "Principales", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143" },
  { id: 12, title: "Salmón Salvaje", cat: "Principales", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288" },
  { id: 13, title: "Pulpo de Roca", cat: "Principales", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641" },
  { id: 14, title: "Entrecot Gallego", cat: "Principales", img: "https://images.unsplash.com/photo-1558030006-450675393462" },
  { id: 15, title: "Cochinillo Segoviano", cat: "Principales", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b" },
  { id: 16, title: "Esfera de Chocolate", cat: "Postres", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b" },
  { id: 17, title: "Tarta de Queso Idiazábal", cat: "Postres", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad" },
  { id: 18, title: "Soufflé de Grand Marnier", cat: "Postres", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc" },
  { id: 19, title: "Milhojas de Vainilla", cat: "Postres", img: "https://images.unsplash.com/photo-1509482560494-4126f8225994" },
  { id: 20, title: "Sorbete de Cava", cat: "Postres", img: "https://images.unsplash.com/photo-1499638472904-ea5c6178a300" },
  { id: 21, title: "Dom Perignon 2012", cat: "Vinos", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef" },
  { id: 22, title: "Vega Sicilia Unico", cat: "Vinos", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3" },
  { id: 23, title: "Château d'Yquem", cat: "Vinos", img: "https://images.unsplash.com/photo-1553361371-9bb22026829b" },
  { id: 24, title: "Macallan 25 años", cat: "Vinos", img: "https://images.unsplash.com/photo-1527281405159-35d5b5d0c151" },
  { id: 25, title: "Petrus Pomerol", cat: "Vinos", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809" },
];

export default function Experience() {
  const container = useRef(null);
  const bookRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=10000",
        scrub: 1,
        pin: true,
      },
    });

    // Intro
    tl.to(".intro-h1", { scale: 1.5, opacity: 0, filter: "blur(10px)", duration: 2 });

    // Animación de hojas (cada hoja pasa al scrollear)
    const pages = gsap.utils.toArray(".book-page");
    pages.forEach((page: any, i) => {
      tl.to(page, { 
        rotateY: -160, 
        duration: 3, 
        ease: "power2.inOut",
        delay: i * 0.5 
      });
      // Los platos de esa hoja flotan
      tl.from(`.plate-item-${i}`, { 
        y: 100, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 2 
      }, "-=2");
    });

    // Cierre y Botón final
    tl.to(".book-container", { scale: 0.8, opacity: 0, duration: 2 });
    tl.from(".reserve-btn", { scale: 0, rotate: 360, opacity: 0, duration: 2 });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      
      {/* ESCENA 1: INTRO */}
      <div className="intro-h1 absolute inset-0 flex flex-col items-center justify-center z-50 p-4">
        <h1 className="text-6xl md:text-9xl font-serif italic text-amber-500">The Secret</h1>
        <p className="tracking-widest uppercase text-zinc-500 mt-4">Scroll para abrir la carta</p>
      </div>

      {/* ESCENA 2: LIBRO 3D */}
      <div className="book-container relative w-full h-screen flex items-center justify-center perspective-1000">
        <div ref={bookRef} className="preserve-3d relative w-[85vw] h-[75vh] max-w-5xl shadow-2xl">
          
          {/* MAPEO DE HOJAS (5 hojas, 5 platos cada una) */}
          {[0, 1, 2, 3, 4].map((pageIndex) => (
            <div 
              key={pageIndex} 
              className="book-page absolute inset-0 bg-zinc-100 origin-left preserve-3d rounded-r-2xl border-l-[10px] border-amber-900 shadow-xl"
              style={{ zIndex: 50 - pageIndex }}
            >
              {/* CARA A (Texto/Título) */}
              <div className="absolute inset-0 backface-hidden p-8 flex flex-col justify-center items-center text-zinc-900 border-r border-zinc-300">
                 <h2 className="text-5xl font-serif mb-4 text-amber-800">
                    {menuItems[pageIndex * 5].cat}
                 </h2>
                 <div className="w-20 h-1 bg-amber-600 mb-10"></div>
                 <p className="text-zinc-400 italic">Descubriendo sabores únicos...</p>
              </div>

              {/* CARA B (Los 5 Platos) */}
              <div className="absolute inset-0 bg-zinc-50 text-zinc-900 rotate-y-180 backface-hidden p-8 grid grid-cols-2 gap-4">
                {menuItems.slice(pageIndex * 5, (pageIndex + 1) * 5).map((item, idx) => (
                  <div key={item.id} className={`plate-item-${pageIndex} flex flex-col`}>
                    <img 
                      src={`${item.img}?q=80&w=400`} 
                      className="w-full h-32 object-cover rounded-lg shadow-md grayscale hover:grayscale-0 transition-all" 
                      alt={item.title} 
                    />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-tighter">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ÚLTIMA PÁGINA FIJA */}
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center rounded-r-2xl">
             <h2 className="text-amber-500 font-serif text-3xl">Buen Provecho</h2>
          </div>
        </div>
      </div>

      {/* BOTÓN FINAL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button className="reserve-btn pointer-events-auto bg-amber-600 hover:bg-amber-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-transform hover:scale-110">
          RESERVAR AHORA
        </button>
      </div>

    </div>
  );
}