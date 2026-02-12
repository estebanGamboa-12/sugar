import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noir Atelier — Storycrolling Landing",
  description: "Landing editorial premium con Lenis, GSAP ScrollTrigger y Framer Motion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <Script src="https://unpkg.com/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/Flip.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/lenis@1.3.13/dist/lenis.min.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
