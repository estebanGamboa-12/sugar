import Image from "next/image";
import Reveal from "@/components/Reveal";

const items = [
  {
    title: "Fresh Daily",
    desc: "Horneamos cada mañana en pequeños lotes para textura perfecta.",
    img: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-7 md:row-span-2 min-h-[410px]",
  },
  {
    title: "Cultured Butter",
    desc: "Mantequilla premium para capas crujientes y aroma profundo.",
    img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-5 min-h-[195px]",
  },
  {
    title: "Seasonal Specials",
    desc: "Especiales de temporada con frutas frescas y cremas ligeras.",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-5 min-h-[195px]",
  },
];

export default function BentoGrid() {
  return (
    <section className="bg-cream px-5 py-20 md:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-12 md:grid-rows-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className={`${item.className} group relative overflow-hidden rounded-[30px] bg-white p-5 shadow-soft-lg`}>
            <Image src={item.img} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/30 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-white/70">bakery note</p>
              <h3 className="mt-3 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
