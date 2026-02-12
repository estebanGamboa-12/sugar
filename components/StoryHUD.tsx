"use client";

type StoryHUDProps = {
  current: number;
  total: number;
  title: string;
  progress: number;
  visible: boolean;
};

export default function StoryHUD({ current, total, title, progress, visible }: StoryHUDProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-30 px-5 py-5 md:px-10 md:py-7 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/66">
            {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/75">{title}</p>
        </div>
        <div className="w-[min(44vw,280px)] pt-1">
          <div className="h-px w-full bg-white/30">
            <div className="h-full bg-white/90 transition-[width] duration-200" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
