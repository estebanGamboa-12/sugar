import Image from 'next/image';

type FilmstripItemProps = {
  src: string;
  alt: string;
};

export function FilmstripItem({ src, alt }: FilmstripItemProps) {
  return (
    <div className="filmstrip-item relative h-[360px] w-[260px] overflow-hidden rounded-md border border-cream/15">
      <Image src={src} alt={alt} fill className="object-cover" sizes="260px" />
    </div>
  );
}
