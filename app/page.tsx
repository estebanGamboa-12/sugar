"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollyRail from "@/components/ScrollyRail";
import Reveal from "@/components/Reveal";
import Dock from "@/components/Dock";

const specials = ["Tarta de cacao", "Crujiente de avellana", "Brioche tostado", "Café geisha", "Pre-postre cítrico", "Petit fours"];

export default function Page() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-black text-white">
        <CustomCursor />
        <ScrollyRail />

        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
          <Reveal className="grid gap-12 md:grid-cols-12" from="left">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.26em] text-white/50">Editorial Chapters</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5.2rem)] leading-[0.9]">Espacio, silencio y precisión.</h2>
            </div>
            <p className="text-lg leading-relaxed text-white/74 md:col-span-7">
              Noir Atelier plantea un recorrido pausado: luz mínima, materia prima de temporada y una coreografía de pases íntimos. El menú cambia por capítulos para respetar
              cada ingrediente en su punto.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          <Reveal className="rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 md:p-10" from="bottom">
            <h3 className="font-display text-[clamp(2rem,5vw,4.6rem)] leading-[0.9]">Post-Rail Bento</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-12">
              {specials.map((item) => (
                <article key={item} className="rounded-3xl border border-white/14 bg-black/50 p-5 transition-transform duration-300 hover:-translate-y-1 md:col-span-4" data-cursor="hover" data-magnet>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">Selection</p>
                  <p className="mt-3 text-xl text-white/90">{item}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          <Reveal className="grid gap-6 md:grid-cols-12" from="right">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/14 md:col-span-7">
              <img src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1800&q=80" alt="Comedor editorial" className="h-[56vh] w-full object-cover" />
            </div>
            <div className="rounded-[1.8rem] border border-white/14 bg-white/[0.04] p-7 md:col-span-5 md:p-10">
              <p className="text-xs uppercase tracking-[0.23em] text-white/55">Press Notes</p>
              <h3 className="mt-4 font-display text-[clamp(2rem,4.6vw,4.2rem)] leading-[0.9]">Servicio de 14 plazas.</h3>
              <p className="mt-4 text-white/74">El equipo abre dos turnos por noche para cuidar ritmo, temperatura y emplatado. Cada reserva se acompaña con maridaje opcional por capítulo.</p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-40 md:px-10">
          <Reveal className="rounded-[2.3rem] border border-white/15 bg-white/[0.05] p-8 text-center md:p-16" from="bottom">
            <p className="text-xs uppercase tracking-[0.26em] text-white/45">Last Call</p>
            <h3 className="mt-5 font-display text-[clamp(2.5rem,8vw,6.7rem)] leading-[0.88]">Reserva o diseña tu encargo.</h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">Aforo limitado por servicio. Encargos personalizados con 72h de antelación.</p>
          </Reveal>
        </section>

        <Dock />
      </main>
    </SmoothScroll>
  );
}
