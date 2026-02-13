"use client";

import { MENU_ITEMS } from "../../data/menu";

const MANIFESTO_LINES = [
  { id: "l1", text: "Brasa.", category: "brasa" },
  { id: "l2", text: "Huerta.", category: "huerta" },
  { id: "l3", text: "Mar.", category: "mar" },
  { id: "l4", text: "Postres.", category: "postres" },
  { id: "l5", text: "Bodega.", category: "bodega" },
];

const LABELS: Record<string, string> = {
  brasa: "Brasa",
  huerta: "Huerta",
  mar: "Mar",
  postres: "Postres",
  bodega: "Bodega",
};

export default function ManifestoSplit() {
  const itemsByCategory = MANIFESTO_LINES.reduce(
    (acc, { category }) => {
      acc[category] = MENU_ITEMS.filter((m) => m.category === category).slice(0, 2);
      return acc;
    },
    {} as Record<string, typeof MENU_ITEMS>
  );

  return (
    <section
      data-manifesto
      className="relative h-[220vh] w-full overflow-hidden bg-[#f6f1e9]"
    >
      <div
        data-manifesto-pin
        className="sticky top-0 flex h-screen w-full items-end overflow-hidden pb-24"
      >
        <div
          data-manifesto-track
          className="flex h-full shrink-0 items-end"
          style={{ width: "500vw" }}
        >
          {MANIFESTO_LINES.map(({ category }) => (
            <div
              key={category}
              data-manifesto-panel
              data-category={category}
              className="flex h-full w-screen shrink-0 items-end justify-center px-8 pb-4 md:px-24"
            >
              <div className="flex max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-24">
                <div className="flex flex-1 justify-center md:justify-end">
                  <h2
                    data-manifesto-word
                    data-category={category}
                    className="font-serif text-[clamp(4rem,15vw,12rem)] font-medium leading-[0.9] tracking-tight text-[#0a0a0a]"
                  >
                    {LABELS[category]}.
                  </h2>
                </div>
                <div
                  data-manifesto-cards
                  data-category={category}
                  className="flex w-full max-w-md flex-col gap-6"
                >
                  <div className="flex flex-col gap-4">
                    {(itemsByCategory[category] ?? []).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-[#0a0a0a]/8 bg-white/80 p-5 shadow-sm"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-lg font-medium text-[#0a0a0a]">{item.name}</p>
                          <p className="text-sm text-[#0a0a0a]/60">{item.tagline}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#0a0a0a]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
