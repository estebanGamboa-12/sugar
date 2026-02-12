"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollyRail from "@/components/ScrollyRail";
import Reveal from "@/components/Reveal";
import Dock from "@/components/Dock";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-black text-white">
        <CustomCursor />
        <ScrollyRail />

        <section id="bento" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <Reveal className="grid gap-10 md:grid-cols-12" from="left">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#efe0c2]/68">After Story</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.4rem)] leading-[0.92]">Continúa la experiencia en formato íntimo.</h2>
            </div>
            <p className="text-lg leading-relaxed text-white/74 md:col-span-7">
              Menú de 14 plazas por noche. Capítulos cortos, maridaje opcional y servicio sincronizado para mantener temperatura, ritmo y silencio visual.
            </p>
          </Reveal>
        </section>

        <section id="visit" className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-32">
          <Reveal className="grid gap-6 md:grid-cols-12" from="right">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/14 md:col-span-7">
              <img src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1800&q=80" alt="Comedor editorial" className="h-[56vh] w-full object-cover" />
            </div>
            <div className="rounded-[1.8rem] border border-white/14 bg-white/[0.04] p-7 md:col-span-5 md:p-10">
              <p className="text-xs uppercase tracking-[0.23em] text-[#efe0c2]/70">Visit</p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,4.4vw,3.8rem)] leading-[0.92]">Madrid · Barrio de las Letras.</h3>
              <p className="mt-4 text-white/74">Miércoles a domingo, dos turnos por noche. Reservas privadas disponibles para celebraciones de formato reducido.</p>
            </div>
          </Reveal>
        </section>

        <Dock />
      </main>
    </SmoothScroll>
  );
}
