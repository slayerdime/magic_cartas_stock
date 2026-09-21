import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ q?: string }>

export default async function ComunidadPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/comunidad')

  const { q = '' } = await searchParams
  const search = q.trim()
  let listings: Array<{ card_name: string; set_code: string | null; condition: string | null; profiles: Array<{ display_name: string | null; state: string }> }> = []

  if (search) {
    const result = await supabase
      .from('community_listings')
      .select('card_name, set_code, condition, profiles!community_listings_owner_id_fkey(display_name, state)')
      .eq('available_for_trade', true)
      .ilike('card_name', `%${search}%`)
      .limit(30)
    listings = (result.data ?? []) as typeof listings
  }

  return <main className="community-page"><div className="community-shell"><Link className="auth-back" href="/">← Volver a El Oasis</Link><header className="community-header"><p className="eyebrow">Comunidad El Oasis</p><h1>Encuentra esa carta.</h1><p>Busca entre las cartas que otros coleccionistas ponen disponibles para intercambio y conoce su estado antes de contactar.</p></header><form className="community-search"><label htmlFor="card-search">Nombre de carta</label><div><input id="card-search" name="q" defaultValue={search} placeholder="Ej. Bilbo&apos;s Gambit" /><button className="button button-dark" type="submit">Buscar cartas</button></div></form>{search && <section className="community-results"><h2>{listings.length ? `${listings.length} resultado${listings.length === 1 ? '' : 's'} para “${search}”` : 'No encontramos esa carta todavía.'}</h2>{listings.map((listing, index) => <article className="community-listing" key={`${listing.card_name}-${listing.set_code}-${index}`}><div><p className="eyebrow">{listing.set_code ?? 'Colección no indicada'}</p><h3>{listing.card_name}</h3><p className="muted">Condición: {listing.condition ?? 'No indicada'}</p></div><div className="listing-owner"><strong>{listing.profiles?.[0]?.display_name ?? 'Coleccionista'}</strong><span>{listing.profiles?.[0]?.state ?? 'Estado no indicado'}</span><small>Contacta para conocer detalles</small></div></article>)}</section>}<aside className="community-notice"><strong>Intercambios entre la comunidad</strong><p>Los intercambios que no son realizados por El Oasis TCG son acuerdos entre particulares y no pueden ser garantizados por nuestra tienda. Verifica siempre la carta, condición y referencias antes de cerrar.</p></aside></div></main>
}
