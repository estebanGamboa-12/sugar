"use client";

import { useState } from "react";
import { MENU_ITEMS, type MenuItem } from "../../data/menu";

const SIZES = ["tall", "wide", "default", "default", "tall", "wide", "default", "tall", "default", "wide"];

export default function MasonryMenuGrid() {
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const items = MENU_ITEMS;

  return (
    <>
      <section
        data-masonry
        className="relative w-full overflow-hidden bg-[#faf8f5] px-4 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {items.map((item, i) => {
            const size = SIZES[i % SIZES.length];
            const isTall = size === "tall";
            const isWide = size === "wide";
            return (
              <div
                key={item.id}
                data-masonry-card
                className={`group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md ${
                  isTall ? "md:row-span-2" : ""
                } ${isWide ? "col-span-2" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setModalItem(item)}
                  className="flex h-full w-full flex-col text-left"
                >
                  <div
                    className={`relative overflow-hidden ${
                      isTall ? "h-[280px] md:h-[380px]" : isWide ? "h-[200px]" : "h-[220px]"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#0a0a0a] backdrop-blur-sm">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-medium text-[#0a0a0a]">{item.name}</h3>
                    <p className="mt-0.5 text-sm text-[#0a0a0a]/60">{item.tagline}</p>
                    <span className="mt-3 inline-flex w-8 items-center justify-center rounded-full border border-[#0a0a0a]/20 text-[#0a0a0a]/70 transition group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white">
                      +
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {modalItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/70 p-4 backdrop-blur-sm"
          onClick={() => setModalItem(null)}
          onKeyDown={(e) => e.key === "Escape" && setModalItem(null)}
          role="dialog"
          aria-modal
          tabIndex={-1}
        >
          <div
            className="max-h-[90vh] max-w-lg overflow-auto rounded-2xl bg-[#faf8f5] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
                aria-label="Cerrar"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl">
              <img
                src={modalItem.imageUrl}
                alt={modalItem.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-[#0a0a0a]">{modalItem.name}</h3>
            <p className="mt-1 text-sm text-[#0a0a0a]/60">{modalItem.tagline}</p>
            <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">{modalItem.description}</p>
            {modalItem.allergens.length > 0 && (
              <p className="mt-4 text-xs text-[#0a0a0a]/50">
                Alérgenos: {modalItem.allergens.join(", ")}
              </p>
            )}
            <p className="mt-4 font-semibold text-[#0a0a0a]">{modalItem.price}</p>
          </div>
        </div>
      )}
    </>
  );
}
