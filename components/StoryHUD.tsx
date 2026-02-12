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
    <aside className={`pointer-events-none absolute inset-x-0 top-0 z-50 px-6 py-6 transition-opacity duration-400 md:px-10 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/58">
            {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/82">{title}</p>
        </div>
        <div className="w-[min(46vw,300px)] pt-1">
          <div className="h-px bg-white/20">
            <div className="h-full bg-[#ead8b8] transition-[width] duration-200" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
