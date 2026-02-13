'use client';

export type LenisOptions = {
  lerp?: number;
  syncTouch?: boolean;
  wrapper?: HTMLElement;
  content?: HTMLElement;
  [key: string]: unknown;
};

type Callback = (...args: unknown[]) => void;

export default class Lenis {
  constructor(options?: LenisOptions) {
    void options;
  }
  raf(time: number) {
    void time;
  }
  on(event: string, callback: Callback) {
    void event;
    void callback;
  }
  off(event: string, callback: Callback) {
    void event;
    void callback;
  }
  scrollTo(target: number | string | HTMLElement) {
    void target;
  }
  stop() {}
  start() {}
  destroy() {}
}
