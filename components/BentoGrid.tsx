import Reveal from "@/components/Reveal";

const cards = [
  { title: "Especialidad", value: "Entremet de avellana + cacao de origen.", span: "md:col-span-6" },
  { title: "Horarios", value: "Mié–Dom / 13:00–23:30", span: "md:col-span-3" },
  { title: "Ubicación", value: "Calle de la Miel 18, Madrid", span: "md:col-span-3" },
  { title: "Reservas", value: "+34 91 444 1122", span: "md:col-span-4" },
  { title: "Reseñas", value: "4.9 / 5 · 380 opiniones", span: "md:col-span-4" },
  { title: "Instagram", value: "@atelier.sucre", span: "md:col-span-4" },
];

export default function BentoGrid() {
  return (
    <section className="px-6 py-28 md:px-12">
      <h2 className="mb-10 text-[clamp(2rem,6.4vw,5rem)] font-semibold tracking-tight">Bento Menu</h2>
      <div className="grid gap-4 md:grid-cols-12">
        {cards.map((card) => (
          <Reveal key={card.title} className={`${card.span} rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8`}>
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-white/50">{card.title}</p>
            <p className="mt-5 text-xl tracking-tight text-white/92 md:text-2xl">{card.value}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
