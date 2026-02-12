"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

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
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);
    };

    const cleanups: Array<() => void> = [];

    document.querySelectorAll('[data-cursor="link"], [data-cursor="hover"], [data-magnet]').forEach((el) => {
      const qx = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const qy = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

      const onEnter = () => cursor.classList.add("is-hover");
      const onLeave = () => {
        cursor.classList.remove("is-hover");
        qx(0);
        qy(0);
      };

      const onMagnetMove = (event: Event) => {
        if (!(el instanceof HTMLElement) || !el.hasAttribute("data-magnet")) return;
        const e = event as MouseEvent;
        const rect = el.getBoundingClientRect();
        const mx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
        const my = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
        qx(mx);
        qy(my);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("mousemove", onMagnetMove);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousemove", onMagnetMove);
      });
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
