'use client';

import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import type { SceneRefMap } from '@/lib/sceneRefs';

export const useGsapScroll = (refs: SceneRefMap, reducedMotion: boolean) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrubValue = reducedMotion ? 0.3 : 1;

      gsap.fromTo(
        refs.s1Image.current,
        { scale: reducedMotion ? 1.1 : 1.5, immediateRender: false },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: refs.s1.current,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s2Text.current?.querySelectorAll('.split-word-inner') || [],
        { autoAlpha: 0, filter: 'blur(20px)', y: 20, immediateRender: false },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.04,
          scrollTrigger: {
            trigger: refs.s2.current,
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s3Image.current,
        { y: reducedMotion ? 20 : 140, autoAlpha: 0.35, immediateRender: false },
        {
          y: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: refs.s3.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s3Text.current,
        { y: reducedMotion ? -20 : -140, autoAlpha: 0.35, immediateRender: false },
        {
          y: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: refs.s3.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s4Curtain.current,
        { yPercent: 0, immediateRender: false },
        {
          yPercent: -104,
          ease: 'none',
          scrollTrigger: {
            trigger: refs.s4.current,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s5Cards.current || [],
        { autoAlpha: 0, y: 60, scale: 0.85, rotate: -3, immediateRender: false },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: refs.s5.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s6Track.current,
        { xPercent: 0, immediateRender: false },
        {
          xPercent: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: refs.s6.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s7Quotes.current || [],
        { autoAlpha: 0, y: 50, filter: 'blur(20px)', immediateRender: false },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.12,
          scrollTrigger: {
            trigger: refs.s7.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: scrubValue
          }
        }
      );

      gsap.fromTo(
        refs.s8.current,
        { autoAlpha: 0, immediateRender: false },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: refs.s8.current,
            start: 'top bottom',
            end: 'top 55%',
            scrub: scrubValue
          }
        }
      );

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [refs, reducedMotion]);
};
