import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atelier Noir · Tartas Couture',
  description: 'Scrollytelling editorial de alta pastelería.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-noir text-cream antialiased">{children}</body>
    </html>
  );
}
