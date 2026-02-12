import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sugar Lab | Pastelería artesanal de ultra-lujo",
  description: "Landing page premium de Sugar Lab, una experiencia de pastelería de ultra-lujo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
