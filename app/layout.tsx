import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'El Oasis TCG — Tu colección, bajo control',
  description: 'La bóveda digital para coleccionistas de trading cards.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>
}
