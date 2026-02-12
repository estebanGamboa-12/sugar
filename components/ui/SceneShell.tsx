import type React from 'react';
import clsx from 'clsx';

type SceneShellProps = {
  id: string;
  zIndex: number;
  className?: string;
  children: React.ReactNode;
  innerClassName?: string;
  refProp?: React.RefObject<HTMLElement | null>;
};

export function SceneShell({ id, zIndex, className, children, innerClassName, refProp }: SceneShellProps) {
  return (
    <section id={id} ref={refProp} className={clsx('relative w-full', className)} style={{ zIndex }}>
      <div className={clsx('mx-auto w-full max-w-[1440px] px-4 md:px-10', innerClassName)}>{children}</div>
    </section>
  );
}
