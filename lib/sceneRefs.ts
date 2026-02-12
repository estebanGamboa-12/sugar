import type React from 'react';

export type SceneRefMap = {
  s1: React.RefObject<HTMLElement | null>;
  s1Image: React.RefObject<HTMLElement | null>;
  s2: React.RefObject<HTMLElement | null>;
  s2Text: React.RefObject<HTMLElement | null>;
  s3: React.RefObject<HTMLElement | null>;
  s3Image: React.RefObject<HTMLElement | null>;
  s3Text: React.RefObject<HTMLElement | null>;
  s4: React.RefObject<HTMLElement | null>;
  s4Curtain: React.RefObject<HTMLElement | null>;
  s5: React.RefObject<HTMLElement | null>;
  s5Cards: React.RefObject<HTMLDivElement[]>;
  s6: React.RefObject<HTMLElement | null>;
  s6Track: React.RefObject<HTMLElement | null>;
  s7: React.RefObject<HTMLElement | null>;
  s7Quotes: React.RefObject<HTMLDivElement[]>;
  s8: React.RefObject<HTMLElement | null>;
};
