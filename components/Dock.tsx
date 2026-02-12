"use client";

import { useEffect, useState } from "react";

const dockItems = [
  { label: "Story", href: "#story-rail", key: "story" },
  { label: "Bento", href: "#bento", key: "bento" },
  { label: "Visit", href: "#visit", key: "visit" },
];

export default function Dock() {
  const [active, setActive] = useState("story");
  const [sceneIndex, setSceneIndex] = useState(1);

  useEffect(() => {
    let railActive = false;

    const onRail = (event: Event) => {
      const detail = (event as CustomEvent<{ active: boolean }>).detail;
      railActive = Boolean(detail?.active);
      if (railActive) setActive("story");
    };

    const onScene = (event: Event) => {
      const detail = (event as CustomEvent<{ sceneIndex: number }>).detail;
      setSceneIndex(Math.min(8, Math.max(1, detail?.sceneIndex ?? 1)));
      setActive("story");
    };

    const onScroll = () => {
      if (railActive) return;
      const sections = ["bento", "visit"] as const;
      const winner = sections.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.2;
      });
      setActive(winner ?? "story");
    };

    window.addEventListener("rail-active", onRail as EventListener);
    window.addEventListener("story-scene", onScene as EventListener);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("rail-active", onRail as EventListener);
      window.removeEventListener("story-scene", onScene as EventListener);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="dock-settle fixed bottom-4 left-1/2 z-[90] w-[min(96vw,620px)] -translate-x-1/2 rounded-full border border-white/20 bg-black/72 p-2 backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
        <ul className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.22em] text-white/86">
          {dockItems.map((item) => (
            <li key={item.key}>
              <a data-cursor="link" data-magnet href={item.href} className={`block rounded-full py-3 transition ${active === item.key ? "bg-white/16 text-white" : "hover:bg-white/10"}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className={`h-1.5 w-1.5 rounded-full transition-all ${sceneIndex === index + 1 ? "bg-[#efe0c2]" : "bg-white/28"}`} />
          ))}
        </div>
      </div>
    </nav>
  );
}
