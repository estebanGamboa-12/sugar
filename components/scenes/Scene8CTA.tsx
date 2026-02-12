import type React from 'react';
import { SceneShell } from '@/components/ui/SceneShell';
import { GlowButton } from '@/components/ui/GlowButton';

export function Scene8CTA({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <SceneShell id="scene-8" zIndex={80} className="min-h-screen bg-black" refProp={sectionRef}>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h3 className="font-serif text-5xl md:text-7xl">Reserva tu pieza noir</h3>
        <p className="mt-4 max-w-xl text-cream/75">Consultas privadas para celebraciones, editoriales y eventos exclusivos.</p>
        <div className="mt-10">
          <GlowButton>Reservar</GlowButton>
        </div>
      </div>
    </SceneShell>
  );
}
