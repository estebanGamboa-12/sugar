import type React from 'react';
import { SceneShell } from '@/components/ui/SceneShell';
import { StarRow } from '@/components/ui/StarRow';
import { SeparatorDot } from '@/components/ui/SeparatorDot';

const testimonials = [
  { quote: 'Una obra de arte que también sabe a gloria.', name: 'Camille Laurent' },
  { quote: 'El mejor final para una noche inolvidable.', name: 'Mateo R.' },
  { quote: 'Texturas precisas, emoción absoluta.', name: 'Nadia Voss' }
];

export function Scene7Testimonials({ sectionRef, quoteRefs }: { sectionRef: React.RefObject<HTMLElement | null>; quoteRefs: React.MutableRefObject<HTMLDivElement[]> }) {
  return (
    <SceneShell id="scene-7" zIndex={70} className="relative min-h-screen py-24" refProp={sectionRef}>
      <div className="space-y-8">
        {testimonials.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => {
              if (el) quoteRefs.current[index] = el;
            }}
            className="rounded-xl border border-cream/20 bg-cream/5 p-8 backdrop-blur-sm"
          >
            <StarRow />
            <p className="mt-4 font-serif text-3xl leading-snug mix-blend-screen md:text-4xl">“{item.quote}”</p>
            <p className="mt-5 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-cream/80">
              <SeparatorDot />
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </SceneShell>
  );
}
