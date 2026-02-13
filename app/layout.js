export const metadata = {
  title: 'Sugar',
  description: 'Proyecto preparado para la última versión de Next.js.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: 'Inter, system-ui, sans-serif',
          background: '#0f172a',
          color: '#e2e8f0'
        }}
      >
        {children}
      </body>
    </html>
  )
}
