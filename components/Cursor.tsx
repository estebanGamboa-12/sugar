"use client";

import { useEffect, useRef } from "react";

const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches);

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch() || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let rafId = 0;

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const setHover = (active: boolean) => {
      cursor.classList.toggle("is-hover", active);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHover(Boolean(target.closest('[data-cursor="hover"]')));
    };

    const animate = () => {
      x += (mouseX - x) * 0.18;
      y += (mouseY - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return <div ref={cursorRef} className="custom-cursor" aria-hidden />;
}
