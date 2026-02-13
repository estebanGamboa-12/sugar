"use client";

const COLLAGE_IMAGES = [
  { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=85", x: "5%", y: "8%", w: 140 },
  { url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=85", x: "72%", y: "12%", w: 120 },
  { url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=85", x: "15%", y: "65%", w: 110 },
  { url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=85", x: "68%", y: "58%", w: 130 },
  { url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=85", x: "80%", y: "78%", w: 100 },
  { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=85", x: "3%", y: "35%", w: 95 },
  { url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=85", x: "78%", y: "38%", w: 85 },
  { url: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=85", x: "8%", y: "82%", w: 115 },
  { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=85", x: "85%", y: "5%", w: 90 },
  { url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=85", x: "2%", y: "50%", w: 105 },
];

export default function HeroCollage() {
  return (
    <section
      data-hero
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f6f1e9]"
    >
      <h1
        data-hero-headline
        className="relative z-10 max-w-4xl px-4 text-center font-serif text-[clamp(3rem,12vw,10rem)] font-medium leading-[0.95] tracking-tight text-[#0a0a0a]"
      >
        Fuego real. Producto real.
      </h1>
      {COLLAGE_IMAGES.map((img, i) => (
        <div
          key={i}
          data-collage-img
          data-index={i}
          className="absolute overflow-hidden rounded-lg shadow-md"
          style={{
            left: img.x,
            top: img.y,
            width: img.w,
            height: img.w * 1.2,
            zIndex: 1,
          }}
        >
          <img
            src={img.url}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      ))}
    </section>
  );
}
