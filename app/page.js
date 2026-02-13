export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem'
      }}
    >
      <section
        style={{
          maxWidth: '42rem',
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '1rem',
          padding: '2rem'
        }}
      >
        <h1 style={{ marginTop: 0 }}>Proyecto listo para Next.js (última versión)</h1>
        <p>
          Esta base ya usa dependencias configuradas con <code>latest</code> para que
          siempre se instale la versión más reciente disponible de Next.js y su ecosistema.
        </p>
      </section>
    </main>
  )
}
