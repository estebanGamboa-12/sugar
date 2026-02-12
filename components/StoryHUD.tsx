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
    <div className={`pointer-events-none absolute inset-x-0 top-0 z-40 px-6 py-6 transition-opacity duration-300 md:px-10 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/62">
            {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/78">{title}</p>
        </div>
        <div className="w-[min(45vw,280px)] pt-1">
          <div className="h-px w-full bg-white/22">
            <div className="h-full bg-[#f1dfbf] transition-[width] duration-200" style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
