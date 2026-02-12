import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuevo proyecto Next.js",
  description: "Plantilla inicial limpia de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
