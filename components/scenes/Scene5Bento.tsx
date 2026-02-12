import type React from 'react';
import Image from 'next/image';
import { SceneShell } from '@/components/ui/SceneShell';
import { Badge } from '@/components/ui/Badge';
import { PriceTag } from '@/components/ui/PriceTag';

const items = [
  { src: '/images/noir/scene-4.jpg', name: 'Velvet Noir', price: '€54' },
  { src: '/images/noir/scene-5.jpg', name: 'Ruby Veil', price: '€62' },
  { src: '/images/noir/scene-6.jpg', name: 'Ivory Eclipse', price: '€58' },
  { src: '/images/noir/scene-7.jpg', name: 'Midnight Bloom', price: '€66' }
];

export function Scene5Bento({ sectionRef, cardRefs }: { sectionRef: React.RefObject<HTMLElement | null>; cardRefs: React.MutableRefObject<HTMLDivElement[]> }) {
  return (
    <SceneShell id="scene-5" zIndex={50} className="relative min-h-screen py-20" refProp={sectionRef}>
      <div className="mb-8">
        <Badge text="Selección Couture" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="group relative overflow-hidden rounded-xl border border-cream/20 bg-noir/70 p-4 will-change-transform"
          >
            <div className="relative mb-4 h-64 overflow-hidden rounded-lg">
              <Image src={item.src} alt={item.name} fill priority className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-2xl">{item.name}</h4>
              <PriceTag amount={item.price} />
            </div>
          </div>
        ))}
      </div>
    </SceneShell>
  );
}
