"use client";

import Lenis, { type LenisOptions } from "lenis";
import { useEffect, useRef, type PropsWithChildren } from "react";

type ReactLenisProps = PropsWithChildren<{
  root?: boolean;
  options?: LenisOptions;
}>;

export function ReactLenis({ children, options, root }: ReactLenisProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis(
      root
        ? {
            ...options,
          }
        : {
            ...options,
            wrapper: wrapperRef.current ?? undefined,
            content: contentRef.current ?? undefined,
          },
    );

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [options, root]);

  if (root) return <>{children}</>;

  return (
    <div ref={wrapperRef} className="h-full overflow-hidden">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

export function useLenis() {
  return null;
}
