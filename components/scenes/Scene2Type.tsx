import type React from 'react';
import { SceneShell } from '@/components/ui/SceneShell';
import { Hairline } from '@/components/ui/Hairline';

export function Scene2Type({ sectionRef, textRef }: { sectionRef: React.RefObject<HTMLElement | null>; textRef: React.RefObject<HTMLParagraphElement | null> }) {
  return (
    <SceneShell id="scene-2" zIndex={20} className="min-h-screen bg-noir/95" refProp={sectionRef}>
      <div className="flex min-h-screen flex-col justify-center gap-8">
        <Hairline />
        <p ref={textRef} className="font-serif text-3xl leading-tight text-cream/90 md:text-6xl">
          No horneamos postres. Esculpimos recuerdos que brillan en la oscuridad.
        </p>
        <Hairline />
      </div>
    </SceneShell>
  );
}
