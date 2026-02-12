import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Sugar Lab · Immersive Experience",
  description: "Landing page experiencial con scrollytelling, parallax y galería horizontal inspirada en Awwwards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${manrope.variable} ${playfairDisplay.variable} bg-black text-[#F1F1F1] antialiased`}>
        <Script src="https://unpkg.com/lenis@1.3.13/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
