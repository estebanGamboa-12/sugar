"use client";

const FINAL_IMAGES = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=85",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=85",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=85",
];

export default function FinalMinimal() {
  return (
    <section
      data-final
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f6f1e9] px-6 pb-24"
    >
      <p className="mb-12 text-center font-serif text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.15] tracking-tight text-[#0a0a0a]/90">
        Sin prisas. Sin ruido.
      </p>
      <div className="flex gap-4">
        {FINAL_IMAGES.map((url, i) => (
          <div
            key={i}
            className="h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32"
          >
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <a
        href="#reservar"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-16 rounded-full border-2 border-[#0a0a0a] bg-[#0a0a0a] px-12 py-4 font-medium uppercase tracking-[0.25em] text-[#faf8f5] transition hover:bg-transparent hover:text-[#0a0a0a]"
      >
        Reservar mesa
      </a>
    </section>
  );
}
