'use client';

import { useRef } from 'react';
import { Scene1Hero } from '@/components/scenes/Scene1Hero';
import { Scene2Type } from '@/components/scenes/Scene2Type';
import { Scene3Parallax } from '@/components/scenes/Scene3Parallax';
import { Scene4Curtain } from '@/components/scenes/Scene4Curtain';
import { Scene5Bento } from '@/components/scenes/Scene5Bento';
import { Scene6Filmstrip } from '@/components/scenes/Scene6Filmstrip';
import { Scene7Testimonials } from '@/components/scenes/Scene7Testimonials';
import { Scene8CTA } from '@/components/scenes/Scene8CTA';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { useLenis } from '@/hooks/useLenis';
import { useGsapScroll } from '@/hooks/useGsapScroll';
import { useSplitText } from '@/hooks/useSplitText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function HomePage() {
  useLenis();
  const reducedMotion = usePrefersReducedMotion();

  const s1 = useRef<HTMLElement>(null);
  const s1Image = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLElement>(null);
  const s2Text = useRef<HTMLParagraphElement>(null);
  const s3 = useRef<HTMLElement>(null);
  const s3Image = useRef<HTMLDivElement>(null);
  const s3Text = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLElement>(null);
  const s4Curtain = useRef<HTMLDivElement>(null);
  const s5 = useRef<HTMLElement>(null);
  const s5Cards = useRef<HTMLDivElement[]>([]);
  const s6 = useRef<HTMLElement>(null);
  const s6Track = useRef<HTMLDivElement>(null);
  const s7 = useRef<HTMLElement>(null);
  const s7Quotes = useRef<HTMLDivElement[]>([]);
  const s8 = useRef<HTMLElement>(null);

  const refs = { s1, s1Image, s2, s2Text, s3, s3Image, s3Text, s4, s4Curtain, s5, s5Cards, s6, s6Track, s7, s7Quotes, s8 };

  useSplitText(s2Text);
  useGsapScroll(refs, reducedMotion);

  return (
    <main className="relative overflow-x-clip">
      <ScrollProgress />
      <Scene1Hero sectionRef={s1} imageRef={s1Image} />
      <Scene2Type sectionRef={s2} textRef={s2Text} />
      <Scene3Parallax sectionRef={s3} imageRef={s3Image} textRef={s3Text} />
      <Scene4Curtain sectionRef={s4} curtainRef={s4Curtain} />
      <Scene5Bento sectionRef={s5} cardRefs={s5Cards} />
      <Scene6Filmstrip sectionRef={s6} trackRef={s6Track} />
      <Scene7Testimonials sectionRef={s7} quoteRefs={s7Quotes} />
      <Scene8CTA sectionRef={s8} />
    </main>
  );
}
