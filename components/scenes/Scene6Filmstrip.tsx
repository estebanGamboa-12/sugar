import type React from 'react';
import { SceneShell } from '@/components/ui/SceneShell';
import { FilmstripItem } from '@/components/ui/FilmstripItem';

const frames = [
  '/images/noir/scene-1.jpg',
  '/images/noir/scene-2.jpg',
  '/images/noir/scene-3.jpg',
  '/images/noir/scene-4.jpg',
  '/images/noir/scene-5.jpg',
  '/images/noir/scene-6.jpg'
];

export function Scene6Filmstrip({ sectionRef, trackRef }: { sectionRef: React.RefObject<HTMLElement | null>; trackRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <SceneShell id="scene-6" zIndex={60} className="relative min-h-screen py-24" refProp={sectionRef}>
      <div className="filmstrip-mask overflow-hidden">
        <div ref={trackRef} className="flex w-[300%] gap-4 will-change-transform">
          {[...frames, ...frames, ...frames].map((frame, index) => (
            <FilmstripItem key={`${frame}-${index}`} src={frame} alt={`Frame ${index + 1}`} />
          ))}
        </div>
      </div>
    </SceneShell>
  );
}
