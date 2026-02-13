"use client";

import { MENU_ITEMS } from "../../data/menu";

const DISCOVER_BG = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=85",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&q=85",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1920&q=85",
  "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1920&q=85",
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=85",
];

const DISCOVER_ITEMS = ["Brasa", "Huerta", "Mar", "Postres", "Bodega"];

const categories = DISCOVER_ITEMS.map((_, i) =>
  (["brasa", "huerta", "mar", "postres", "bodega"] as const)[i]
);

export default function DiscoverMode() {
  const selections = categories.map((cat) =>
    MENU_ITEMS.filter((m) => m.category === cat).slice(0, 4)
  );

  return (
    <section
      data-discover
      className="relative h-[350vh] w-full overflow-hidden"
    >
      <div
        data-discover-pin
        className="sticky top-0 h-screen w-full"
      >
        <div className="absolute inset-0">
          {DISCOVER_BG.map((url, i) => (
            <div
              key={i}
              data-discover-bg
              data-index={i}
              className="absolute inset-0 opacity-0"
              style={{ zIndex: 0 }}
            >
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/40" />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex h-full w-full items-end pb-24">
          <div className="flex w-1/2 flex-col justify-end gap-4 pl-12 pb-4 md:pl-24">
            <div className="absolute left-6 bottom-[28%] h-px w-16 rotate-[-30deg] bg-white/40" />
            <div className="absolute left-8 bottom-[28%] h-px w-8 rotate-[-30deg] bg-white/20" />
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Discover</p>
            {DISCOVER_ITEMS.map((label, i) => (
              <div
                key={label}
                data-discover-item
                data-index={i}
                className="font-serif text-3xl font-medium text-white opacity-40 transition-opacity md:text-4xl"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="relative flex w-1/2 flex-col justify-end gap-4 pr-12 pb-4 md:pr-24">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Selección del Chef
            </p>
            <div className="relative grid grid-cols-2 gap-4">
              {selections.map((selection, groupIdx) => (
                <div
                  key={groupIdx}
                  data-discover-thumb-group
                  data-index={groupIdx}
                  className={`grid grid-cols-2 gap-4 ${groupIdx === 0 ? "" : "absolute left-0 top-0 right-0 opacity-0"}`}
                >
                  {selection.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="aspect-square w-full object-cover"
                      />
                      <p className="mt-1 text-sm font-medium text-white">{item.name}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
