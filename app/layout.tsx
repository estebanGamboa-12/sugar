import type { Metadata } from "next";
import { Manrope, Syncopate } from "next/font/google";
import Script from "next/script";
import Cursor from "@/components/Cursor";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miga de Nube · Cute Pastel Bakery",
  description:
    "Landing cinematográfica para una bakery pastel con scroll inmersivo, carta por capítulos y experiencia editorial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${manrope.variable} ${syncopate.variable} bg-cream text-cocoa antialiased`}>
        <Script src="https://unpkg.com/lenis@1.3.13/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
