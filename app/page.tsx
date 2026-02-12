import CustomCursor from "@/components/CustomCursor";
import Dock from "@/components/Dock";
import Reveal from "@/components/Reveal";
import ScrollyRail from "@/components/ScrollyRail";
import SmoothScroll from "@/components/SmoothScroll";

const specials = [
  "Cacao 72% & sal marina",
  "Tarta de pistacho y azahar",
  "Brioche de mantequilla noisette",
  "Ravioli de calabaza ahumada",
  "Trufa cítrica de temporada",
  "Milhojas de vainilla bourbon",
];

const faq = [
  {
    q: "¿Trabajáis con reservas?",
    a: "Sí, recomendamos reservar con 48h. En fines de semana abrimos una lista de espera dinámica.",
  },
  {
    q: "¿Opciones vegetarianas o sin gluten?",
    a: "Tenemos menú estacional con alternativas adaptadas. Indícalo al reservar para preparar tu pase.",
  },
  {
    q: "¿Hacéis encargos para eventos?",
    a: "Sí. Diseñamos piezas de pastelería y menús de catering íntimo para marcas y celebraciones privadas.",
  },
];

const quotes = [
  "“Noir Atelier convierte cada pase en una secuencia: estética precisa, técnica limpia y un servicio impecable.” — Hoja de Sala",
  "“Una de las propuestas más sólidas del año en Madrid: profundidad de sabor, identidad visual y ritmo de autor.” — Diario Gourmet",
  "“La casa que demuestra que la pastelería contemporánea puede ser íntima, cinematográfica y memorable.” — Press Table",
];

export default function HomePage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="relative bg-black text-white">
        <ScrollyRail />

        <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <Reveal className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">About Noir Atelier</p>
            <h2 className="font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] tracking-tight">
              Pastelería narrativa con ritmo de editorial.
            </h2>
            <p className="max-w-3xl text-pretty text-lg leading-relaxed text-white/72">
              Creemos en el tempo: masas fermentadas lentamente, fuegos cortos y una mise en place precisa para que
              cada plato llegue con intención. Este espacio mezcla la sensibilidad de un estudio creativo con el oficio
              clásico de cocina, en una experiencia diseñada para recorrerse con calma.
            </p>
          </Reveal>
        </section>

        <section id="bento" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10" rounded="2rem">
            <h3 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.9]">Bento / Highlights</h3>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
              {specials.map((item, index) => (
                <article
                  key={item}
                  className="group rounded-3xl border border-white/12 bg-black/60 p-5 transition-transform duration-300 hover:scale-[1.01] md:col-span-4"
                  data-cursor="hover"
                  data-magnet
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">0{index + 1}</p>
                  <p className="mt-3 text-xl text-white/92">{item}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="story" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-44">
          <Reveal className="space-y-16" rounded="2rem">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs uppercase tracking-[0.26em] text-white/45">Our Story / Ingredients</p>
              <h3 className="font-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.9]">Origen, estación y paciencia.</h3>
            </div>
            <div className="grid gap-14 md:grid-cols-12">
              <p className="text-lg leading-relaxed text-white/74 md:col-span-7">
                Trabajamos con lotes pequeños, cacao de origen, mantequillas de temporada y fruta en punto de maduración.
                El menú cambia por capítulos: cada ingrediente entra cuando su perfil aromático está listo y desaparece
                antes de repetirse. Por eso dejamos espacio entre platos, entre voces y entre luces: para que el paladar
                y la memoria respiren.
              </p>
              <div className="space-y-4 md:col-span-5 md:pt-10">
                <p className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 text-sm uppercase tracking-[0.18em] text-white/72">
                  Harinas vivas · fermentación lenta · horno de piedra.
                </p>
                <p className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 text-sm uppercase tracking-[0.18em] text-white/72">
                  Cítricos de costa · frutos secos tostados al momento.
                </p>
                <p className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 text-sm uppercase tracking-[0.18em] text-white/72">
                  Mise en place de precisión · pase íntimo de 18 cubiertos.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="faq" className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9]">FAQ</h3>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 open:bg-white/[0.06]"
                data-cursor="hover"
              >
                <summary className="cursor-pointer list-none text-lg font-medium">{item.q}</summary>
                <p className="mt-3 text-white/70">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="location" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <Reveal className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-8 md:p-14" rounded="2rem">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Location</p>
            <h3 className="mt-4 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9]">Calle de las Letras, 27 · Madrid</h3>
            <div className="mt-8 h-[40vh] rounded-3xl border border-white/15 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center transition-transform duration-300 hover:scale-[1.01]" />
          </Reveal>
        </section>

        <section id="press" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <Reveal className="space-y-8 rounded-[2rem] border border-white/12 bg-white/[0.03] p-8 md:p-12" rounded="2rem">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Reviews / Press</p>
            <h3 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9]">Voces que entienden el ritmo.</h3>
            <div className="space-y-5">
              {quotes.map((quote) => (
                <blockquote key={quote} className="rounded-3xl border border-white/12 bg-black/60 p-6 text-xl leading-relaxed text-white/84">
                  {quote}
                </blockquote>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-44 md:px-10">
          <Reveal className="rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-8 text-center md:p-16" rounded="2.5rem">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Último paso</p>
            <h3 className="mt-5 font-display text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.9]">Reserva tu mesa o diseña tu encargo.</h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">Plazas limitadas por servicio. Encargos con antelación mínima de 72h.</p>
          </Reveal>
        </section>

        <Dock />
      </main>
    </SmoothScroll>
  );
}
