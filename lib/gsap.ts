'use client';

type TweenValue = string | number | ((index: number, element: HTMLElement) => string | number);
type TweenVars = Record<string, TweenValue | unknown>;

class Timeline {
  addLabel(_label?: string) {
    return this;
  }

  to(target: unknown, vars?: TweenVars, _position?: string) {
    applyVars(target, vars);
    return this;
  }

  fromTo(target: unknown, _from: TweenVars, to: TweenVars, _position?: string) {
    return this.to(target, to);
  }

  call(callback: () => void, _params?: unknown[], _position?: string) {
    callback();
    return this;
  }
}

function resolve(value: unknown, index: number, element: HTMLElement) {
  return typeof value === 'function' ? (value as (idx: number, el: HTMLElement) => unknown)(index, element) : value;
}

function applyVars(target: unknown, vars?: TweenVars) {
  if (!vars || !target) return;
  const elements = Array.isArray(target) ? target : [target];
  elements.forEach((item, index) => {
    if (!(item instanceof HTMLElement)) return;
    const style = item.style;
    if (vars.autoAlpha !== undefined) {
      const value = Number(resolve(vars.autoAlpha, index, item));
      style.opacity = String(Number.isNaN(value) ? 1 : value);
      style.visibility = value === 0 ? 'hidden' : 'visible';
    }
    if (vars.x !== undefined) {
      const value = Number(resolve(vars.x, index, item)) || 0;
      style.transform = `translateX(${value}px)`;
    }
    if (vars.color !== undefined) {
      style.color = String(resolve(vars.color, index, item));
    }
  });
}

const gsap = {
  registerPlugin: (..._plugins: unknown[]) => undefined,
  set: (target: unknown, vars?: TweenVars) => applyVars(target, vars),
  to: (target: unknown, vars?: TweenVars) => {
    applyVars(target, vars);
    return { kill: () => undefined };
  },
  timeline: (_config?: unknown) => new Timeline(),
  ticker: {
    add: (_cb: (time: number) => void) => undefined,
    remove: (_cb: (time: number) => void) => undefined,
    lagSmoothing: (_value: number) => undefined
  },
  context: (fn: () => void, _scope?: unknown) => {
    fn();
    return { revert: () => undefined };
  }
};

export default gsap;
