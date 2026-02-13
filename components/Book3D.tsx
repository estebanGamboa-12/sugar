"use client";

import { forwardRef } from "react";

type Book3DProps = {
  pageRefs: (HTMLDivElement | null)[];
};

const leafs = [
  { title: "Degustación", subtitle: "12 pases" },
  { title: "Signature", subtitle: "Cocina de autor" },
  { title: "Maridaje", subtitle: "Grandes cosechas" },
  { title: "Desserts", subtitle: "Final haute pâtisserie" },
];

const Book3D = forwardRef<HTMLDivElement, Book3DProps>(({ pageRefs }, ref) => {
  return (
    <div ref={ref} className="relative h-[390px] w-[min(86vw,560px)] [perspective:2000px]">
      <div className="absolute inset-0 rounded-2xl bg-[#1a120d] shadow-[0_35px_100px_rgba(0,0,0,0.6)]" />
      <div className="absolute inset-[10px] rounded-2xl border border-[#b89266]/35" />

      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {leafs.map((leaf, index) => (
          <div
            key={leaf.title}
            ref={(node) => {
              pageRefs[index] = node;
            }}
            className="absolute inset-[14px] origin-[left_center] rounded-xl border border-[#d8b78a]/35 bg-gradient-to-br from-[#f9edd8] to-[#ead4ae] p-8 text-[#2d1d12] [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ zIndex: leafs.length - index }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#7f5b3e]">{leaf.subtitle}</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">{leaf.title}</h3>
            <p className="mt-5 max-w-xs text-sm text-[#4f3a2a]">
              Carta ceremonial diseñada para un servicio de lujo con ritmo pausado y precisión absoluta.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

Book3D.displayName = "Book3D";

export default Book3D;
