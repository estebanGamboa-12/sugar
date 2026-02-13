"use client";

export default function MenuCollectionHeader() {
  return (
    <section
      data-menu-header
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-[#faf8f5] px-6 py-24"
    >
      <div className="text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-[#0a0a0a]/50">
          Experiencia
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[1.05] tracking-tight text-[#0a0a0a]">
          Menú Degustación
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-[#0a0a0a]/70">
          <span>8 pases</span>
          <span>·</span>
          <span>2h</span>
          <span>·</span>
          <span className="font-semibold text-[#0a0a0a]">95€</span>
        </div>
      </div>
    </section>
  );
}
