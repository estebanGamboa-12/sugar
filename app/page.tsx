import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Next.js listo</p>
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">Base limpia para empezar</h1>
      <p className="text-base leading-7 text-neutral-600">
        Reinicié la estructura para que tengas un punto de partida simple y estable. Puedes volver a construir secciones en <code>components/</code> y utilidades en <code>lib/</code>.
      </p>
      <div className="flex gap-3">
        <Link
          href="https://nextjs.org/docs"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
        >
          Documentación
        </Link>
        <Link
          href="https://nextjs.org/learn"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Aprender Next.js
        </Link>
      </div>
    </main>
  );
}
