import type React from 'react';
import { SceneShell } from '@/components/ui/SceneShell';
import { SceneBackground } from '@/components/ui/SceneBackground';
import { LightLeak } from '@/components/ui/LightLeak';

export function Scene4Curtain({ sectionRef, curtainRef }: { sectionRef: React.RefObject<HTMLElement | null>; curtainRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <SceneShell id="scene-4" zIndex={40} className="min-h-screen overflow-hidden" refProp={sectionRef}>
      <div className="relative min-h-screen">
        <SceneBackground src="/images/noir/scene-3.svg" alt="Cocina profesional" priority imgClassName="object-center" />
        <LightLeak />
        <div ref={curtainRef} className="absolute inset-0 bg-noir will-change-transform">
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-ruby/70 to-transparent" />
        </div>
      </div>
    </SceneShell>
  );
}
