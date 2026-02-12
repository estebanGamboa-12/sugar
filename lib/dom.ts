import type React from 'react';

export const getElement = <T extends HTMLElement>(ref: React.RefObject<T | null>) => ref.current;

export const setStyles = (element: HTMLElement | null, styles: Record<string, string>) => {
  if (!element) return;
  Object.entries(styles).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
};

export const toArray = <T>(items: T | T[]) => (Array.isArray(items) ? items : [items]);
