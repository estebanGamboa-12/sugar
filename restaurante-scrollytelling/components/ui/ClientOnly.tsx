"use client";

import { ReactNode, useEffect, useState } from "react";

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      fallback ?? (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <p className="font-serif text-xl tracking-widest text-[#d4af37]">Cargando...</p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
