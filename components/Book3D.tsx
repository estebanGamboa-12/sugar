"use client";

import { forwardRef } from "react";

type Book3DProps = {
  pageRefs: (HTMLDivElement | null)[];
};

const pages = ["Degustación", "Cocina de autor", "Maridaje", "Postres"];

const Book3D = forwardRef<HTMLDivElement, Book3DProps>(({ pageRefs }, ref) => {
  return (
    <div ref={ref} className="relative h-[360px] w-[min(78vw,520px)] [perspective:1800px]">
      <div className="absolute inset-0 rounded-2xl border border-white/20 bg-[#1b120d] shadow-[0_30px_90px_rgba(0,0,0,0.45)]" />

      <div className="absolute inset-0 rounded-2xl [transform-style:preserve-3d]">
        {pages.map((title, index) => (
          <div
            key={title}
            ref={(node) => {
              pageRefs[index] = node;
            }}
            className="absolute inset-0 origin-[left_center] rounded-2xl border border-white/10 bg-gradient-to-br from-[#f8edd8] to-[#e9d8b5] p-8 text-[#2b1d14] shadow-2xl [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ zIndex: pages.length - index }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#7a5a40]">Collection {index + 1}</p>
            <h3 className="mt-4 font-serif text-3xl">{title}</h3>
            <p className="mt-4 max-w-xs text-sm text-[#4f3a2b]">
              Selección curada para una velada de alta cocina con ritmo ceremonial.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

Book3D.displayName = "Book3D";

export default Book3D;
