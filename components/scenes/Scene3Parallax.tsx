import type React from 'react';
import Image from 'next/image';
import { SceneShell } from '@/components/ui/SceneShell';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EditorialParagraph } from '@/components/ui/EditorialParagraph';

export function Scene3Parallax({ sectionRef, imageRef, textRef }: { sectionRef: React.RefObject<HTMLElement | null>; imageRef: React.RefObject<HTMLDivElement | null>; textRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <SceneShell id="scene-3" zIndex={30} className="min-h-screen" refProp={sectionRef}>
      <div className="grid min-h-screen items-center gap-8 py-16 md:grid-cols-2">
        <div ref={imageRef } className="relative h-[60vh] overflow-hidden rounded-lg border border-cream/20 will-change-transform">
          <Image src="/images/noir/scene-2.jpg" alt="Detalle de glaseado" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div ref={textRef } className="space-y-6 will-change-transform">
          <SectionLabel label="Parallax Split" />
          <h3 className="font-serif text-4xl md:text-5xl">Contrastes que seducen</h3>
          <EditorialParagraph>
            Crema sedosa, cacao intenso y una arquitectura interna que se revela plano a plano con cada corte.
          </EditorialParagraph>
        </div>
      </div>
    </SceneShell>
  );
}
