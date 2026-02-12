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
    <aside className={`pointer-events-none fixed inset-x-0 top-0 z-[80] px-6 py-5 transition-opacity duration-300 md:px-10 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-6">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#f0e2c7]/88">
          {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")} · {title}
        </p>

        <div className="w-[min(36vw,260px)] pt-1">
          <div className="h-px bg-white/15">
            <div className="h-px bg-[#efe0c2] transition-[width] duration-150" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
