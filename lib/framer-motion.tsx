'use client';

import {
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type TouchEvent,
  useMemo,
  useState
} from 'react';

type MotionStyle = {
  scale?: number;
  rotate?: number;
};

type MotionProps<T> = HTMLAttributes<T> & {
  whileHover?: MotionStyle;
  whileTap?: MotionStyle;
  transition?: Record<string, unknown> & {
    duration?: number;
  };
};

function toTransform(style?: MotionStyle) {
  if (!style) return '';
  const chunks: string[] = [];
  if (typeof style.scale === 'number') chunks.push(`scale(${style.scale})`);
  if (typeof style.rotate === 'number') chunks.push(`rotate(${style.rotate}deg)`);
  return chunks.join(' ');
}

function createMotionComponent(tag: string) {
  return function MotionComponent({
    whileHover,
    whileTap,
    transition,
    style,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    ...rest
  }: MotionProps<HTMLElement>) {
    const [hovered, setHovered] = useState(false);
    const [tapped, setTapped] = useState(false);

    const motionStyle = useMemo(() => {
      const transform = tapped ? toTransform(whileTap) : hovered ? toTransform(whileHover) : '';
      return {
        transition: `transform ${transition?.duration ?? 0.25}s ease`,
        transform,
        ...(style as CSSProperties)
      } as CSSProperties;
    }, [hovered, style, tapped, transition?.duration, whileHover, whileTap]);

    return createElement(tag, {
      ...rest,
      style: motionStyle,
      onMouseEnter: (event: MouseEvent<HTMLElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
      },
      onMouseLeave: (event: MouseEvent<HTMLElement>) => {
        setHovered(false);
        setTapped(false);
        onMouseLeave?.(event);
      },
      onMouseDown: (event: MouseEvent<HTMLElement>) => {
        setTapped(true);
        onMouseDown?.(event);
      },
      onMouseUp: (event: MouseEvent<HTMLElement>) => {
        setTapped(false);
        onMouseUp?.(event);
      },
      onTouchStart: (event: TouchEvent<HTMLElement>) => {
        setTapped(true);
        onTouchStart?.(event);
      },
      onTouchEnd: (event: TouchEvent<HTMLElement>) => {
        setTapped(false);
        onTouchEnd?.(event);
      }
    });
  };
}

export const motion = new Proxy(
  {},
  {
    get(_, tag: string) {
      return createMotionComponent(tag);
    }
  }
) as Record<string, ReturnType<typeof createMotionComponent>>;
