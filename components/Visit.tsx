import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function Visit() {
  return (
    <section className="bg-lavender px-5 py-20 md:px-12">
      <Reveal className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[34px] bg-white/75 p-8 shadow-soft-xl backdrop-blur md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cocoa/60">visit us</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] uppercase text-cocoa">Dulce en persona</h2>
          <p className="mt-4 max-w-xl text-cocoa/75">
            Calle Brisa 28, Madrid · Lun-Dom 08:00–20:00 · Ven por tu café y saluda al obrador.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <a data-cursor="hover" href="https://instagram.com" className="rounded-full bg-strawberry px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Instagram
            </a>
          </Magnetic>
          <Magnetic>
            <a data-cursor="hover" href="tel:+34111222333" className="rounded-full bg-pistachio px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
              Llamar
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
