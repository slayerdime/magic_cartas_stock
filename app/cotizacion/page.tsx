import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CotizacionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/cotizacion')
  return <main className="quote-page"><a className="auth-back" href="/"><span>←</span> Volver a El Oasis</a><section className="quote-card"><p className="eyebrow">Comunidad El Oasis</p><h1>Solicita tu cotización.</h1><p>Hola, {user.email}. Cuéntanos qué cartas o deck quieres valorar y nuestro equipo te responderá.</p><textarea aria-label="Cartas para cotizar" placeholder="Ej. 4x Bilbo&apos;s Gambit, condición NM..." /><button className="button button-dark">Enviar solicitud</button></section></main>
}
