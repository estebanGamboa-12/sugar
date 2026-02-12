import type { Metadata } from "next";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Sucre — Editorial Dining",
  description: "Landing minimal y premium para pastelería/restaurante con Lenis + GSAP + Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <Script src="https://unpkg.com/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/lenis@1.3.13/dist/lenis.min.js" strategy="beforeInteractive" />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
