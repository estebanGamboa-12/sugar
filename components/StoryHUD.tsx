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
    <aside className={`pointer-events-none fixed inset-x-0 top-0 z-[70] px-6 py-5 md:px-10 ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
      <div className="flex items-start justify-between">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/78">
          {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")} · {title}
        </p>

        <div className="w-[min(34vw,240px)]">
          <div className="h-px bg-white/20">
            <div className="h-px bg-[#ead8b8] transition-[width] duration-150" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
