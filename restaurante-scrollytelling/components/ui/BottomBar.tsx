"use client";

type BottomBarProps = {
  onVerCarta?: () => void;
  onReservar?: () => void;
  className?: string;
};

export default function BottomBar({ onVerCarta, onReservar, className = "" }: BottomBarProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between border-t border-[#0a0a0a]/8 bg-[#faf8f5]/95 px-6 py-3 backdrop-blur-md ${className}`}
    >
      <span className="font-serif text-sm tracking-wider text-[#0a0a0a]/70">
        FUEGO REAL
      </span>
      <button
        type="button"
        onClick={onVerCarta}
        className="text-xs uppercase tracking-[0.25em] text-[#0a0a0a]/60 transition hover:text-[#0a0a0a]"
      >
        Ver carta
      </button>
      <button
        type="button"
        onClick={onReservar}
        className="rounded-full bg-[#0a0a0a] px-6 py-2.5 font-medium uppercase tracking-[0.2em] text-[#faf8f5] transition hover:bg-[#1a1a1a]"
      >
        Reservar
      </button>
    </div>
  );
}
