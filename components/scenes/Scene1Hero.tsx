import type React from 'react';
import { SceneBackground } from '@/components/ui/SceneBackground';
import { SceneShell } from '@/components/ui/SceneShell';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SceneTitle } from '@/components/ui/SceneTitle';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { VignetteOverlay } from '@/components/ui/VignetteOverlay';
import { CornerMarks } from '@/components/ui/CornerMarks';

export function Scene1Hero({ sectionRef, imageRef }: { sectionRef: React.RefObject<HTMLElement | null>; imageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <SceneShell id="scene-1" zIndex={10} className="min-h-screen" refProp={sectionRef}>
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <SceneBackground src="/images/noir/scene-1.jpg" alt="Atelier noir en penumbra" priority />
      </div>
      <NoiseOverlay />
      <VignetteOverlay />
      <CornerMarks />
      <div className="relative flex min-h-screen flex-col justify-end pb-20">
        <SectionLabel label="Atelier Noir" />
        <SceneTitle>Tartas Couture</SceneTitle>
        <p className="mt-3 max-w-xl text-cream/80">Cada capa cuenta una historia de sombras, textura y deseo.</p>
        <div className="mt-10">
          <ScrollIndicator />
        </div>
      </div>
    </SceneShell>
  );
}
