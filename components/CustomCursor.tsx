"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

const MAGNET_SELECTOR = "[data-magnet]";
const CURSOR_SELECTOR = "[data-cursor], [data-magnet]";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cursor.style.display = "none";
      return;
    }

    const { gsap } = getGSAP();
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });

    const magnetMap = new WeakMap<Element, { qx: (v: number) => void; qy: (v: number) => void }>();

    const getMagnetTweens = (el: Element) => {
      if (!magnetMap.has(el)) {
        magnetMap.set(el, {
          qx: gsap.quickTo(el, "x", { duration: 0.32, ease: "power3.out" }),
          qy: gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" }),
        });
      }
      return magnetMap.get(el)!;
    };

    const findTarget = (target: EventTarget | null) => (target instanceof Element ? target.closest(CURSOR_SELECTOR) : null);

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);

      const magnetEl = (e.target instanceof Element ? e.target.closest(MAGNET_SELECTOR) : null) as HTMLElement | null;
      if (!magnetEl) return;
      const { qx, qy } = getMagnetTweens(magnetEl);
      const rect = magnetEl.getBoundingClientRect();
      const mx = (e.clientX - (rect.left + rect.width / 2)) * 0.13;
      const my = (e.clientY - (rect.top + rect.height / 2)) * 0.13;
      qx(mx);
      qy(my);
    };

    const onOver = (e: MouseEvent) => {
      const target = findTarget(e.target);
      if (!target) return;
      cursor.classList.add("is-hover");
      cursor.dataset.mode = target.getAttribute("data-cursor") || "hover";
    };

    const onOut = (e: MouseEvent) => {
      const from = findTarget(e.target);
      if (!from) return;
      const related = findTarget(e.relatedTarget);
      if (related === from) return;

      if (from.matches(MAGNET_SELECTOR)) {
        const { qx, qy } = getMagnetTweens(from);
        qx(0);
        qy(0);
      }

      if (!related) {
        cursor.classList.remove("is-hover");
        delete cursor.dataset.mode;
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
