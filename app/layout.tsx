import type { Metadata } from "next";
import Script from "next/script";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sugar Lab | Awwwards-style Creative Landing",
  description:
    "Landing premium con estética editorial minimalista, smooth scroll inercial con Lenis y secuencias GSAP ScrollTrigger.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Script src="https://unpkg.com/lenis@1.3.13/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
