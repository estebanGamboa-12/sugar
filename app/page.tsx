import BentoGrid from "@/components/BentoGrid";
import HeroZoom from "@/components/HeroZoom";
import PortraitScroll from "@/components/PortraitScroll";
import Reveal from "@/components/Reveal";

const signatureImage =
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1800&q=80";

export default function HomePage() {
  return (
    <main className="relative bg-black pb-36 text-white">
      <HeroZoom />

      <section className="px-6 py-28 md:px-12">
        <Reveal className="overflow-hidden rounded-3xl border border-white/10">
          <div className="grid md:grid-cols-12">
            <div
              className="min-h-[58vh] md:col-span-7"
              style={{
                backgroundImage: `url(${signatureImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex items-end bg-white/[0.02] p-8 md:col-span-5 md:p-10">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-white/55">Signature</p>
                <h2 className="mt-6 text-[clamp(2rem,4.8vw,4.5rem)] leading-[0.95] tracking-tight">Milhojas de vainilla tostada.</h2>
                <p className="mt-4 max-w-md text-white/72">
                  Capas ultrafinas, crema diplomática infusionada y sal de vainilla de Tahití. Textura limpia, final largo.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PortraitScroll />

      <BentoGrid />

      <section className="px-6 py-24 md:px-12">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-14">
          <p className="max-w-3xl text-[clamp(1.4rem,3vw,2.8rem)] leading-tight text-white/95">
            “Un lugar donde el ritmo baja y el paladar se vuelve protagonista.”
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55">— Clientes Atelier, 2026</p>
        </Reveal>
      </section>

      <section className="px-6 pb-20 pt-10 md:px-12">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <h3 className="text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-tight">Reserva o encarga tu próxima experiencia.</h3>
          <p className="mt-4 max-w-xl text-white/70">Mesas limitadas. Producción por cupos diarios para mantener calidad artesanal.</p>
          <button
            data-cursor="link"
            className="mt-8 rounded-full border border-white/25 px-7 py-3 text-sm uppercase tracking-[0.15em] transition hover:bg-white hover:text-black"
          >
            Join Waitlist
          </button>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs uppercase tracking-[0.16em] text-white/45 md:px-12">
        Atelier Sucre · Madrid · Since 2019
      </footer>

      <nav className="fixed bottom-4 left-1/2 z-40 w-[min(96vw,520px)] -translate-x-1/2 rounded-full border border-white/15 bg-black/70 p-2 backdrop-blur-md">
        <ul className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/80">
          <li>
            <a data-cursor="link" href="#" className="block rounded-full py-3 transition hover:bg-white/10">
              Brand
            </a>
          </li>
          <li>
            <a data-cursor="link" href="#" className="block rounded-full py-3 transition hover:bg-white/10">
              Reservar
            </a>
          </li>
          <li>
            <a data-cursor="link" href="#" className="block rounded-full py-3 transition hover:bg-white/10">
              Carta
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
