"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) {
      cursor.style.display = "none";
      return;
    }

    const { gsap } = getGSAP();

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.28, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX - 12);
      yTo(event.clientY - 12);
    };

    const magneticCleanup: Array<() => void> = [];

    const bindMagnet = (el: Element) => {
      const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onEnter = () => cursor.classList.add("is-hover");
      const onLeave = () => {
        cursor.classList.remove("is-hover");
        qx(0);
        qy(0);
      };

      const onMoveMagnet = (event: Event) => {
        const e = event as MouseEvent;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        qx(dx);
        qy(dy);
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("mousemove", onMoveMagnet);

      magneticCleanup.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousemove", onMoveMagnet);
      });
    };

    const magnetTargets = document.querySelectorAll('[data-cursor="link"]');
    magnetTargets.forEach(bindMagnet);

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      magneticCleanup.forEach((fn) => fn());
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
