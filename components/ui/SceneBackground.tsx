import Image from 'next/image';
import clsx from 'clsx';

type SceneBackgroundProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

export function SceneBackground({ src, alt, priority, className, imgClassName }: SceneBackgroundProps) {
  return (
    <div className={clsx('absolute inset-0 overflow-hidden', className)}>
      <Image
        fill
        src={src}
        alt={alt}
        priority={priority}
        className={clsx('object-cover', imgClassName)}
        sizes="100vw"
      />
    </div>
  );
}
