'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Moon, Search, ShieldCheck, Sparkles, Sun } from 'lucide-react'
import rawCards from '../cards.json'

type Card = { name: string; setCode: string; setName: string; rarity: string; foil: string; quantity: number; purchasePrice: number | null; condition: string; scryfallId?: string }

function getScryfallImage(card: Card) {
  if (!card.scryfallId) return null
  const id = card.scryfallId.toLowerCase()
  return `https://cards.scryfall.io/normal/front/${id.slice(0, 1)}/${id.slice(1, 2)}/${id}.jpg`
}
const cards = (rawCards as unknown[]).map((item) => { const record = item as { data?: Card }; return record.data ?? (item as Card) }).filter((card): card is Card => Boolean(card && 'name' in card))
const featured = cards.slice(0, 4)
const rarityLabels: Record<string, string> = { mythic: 'Mítica', rare: 'Rara', uncommon: 'Poco común', common: 'Común' }

function CollectionCard({ card, index }: { card: Card; index: number }) {
  const palettes = ['card-indigo', 'card-amber', 'card-ink', 'card-sand']
  const imageUrl = getScryfallImage(card)
  return <article className="collection-card">
    <div className={`card-art ${palettes[index % palettes.length]}`}>
      {imageUrl ? <img src={imageUrl} alt={`Carta ${card.name}`} loading="lazy" /> : <><span className="mana">{index === 0 ? '✦' : index === 1 ? '◈' : '◉'}</span><div className="art-glow" /></>}
      <span className="set-mark">{card.setCode}</span>
    </div>
    <div className="collection-info"><div><p className="eyebrow">{rarityLabels[card.rarity] ?? card.rarity}</p><h3>{card.name}</h3><p className="muted">{card.setName}</p></div><ArrowUpRight size={17} /></div>
  </article>
}

export default function Home() {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')
  const visible = useMemo(() => featured.filter((card) => card.name.toLowerCase().includes(query.toLowerCase())), [query])
  return <main className={dark ? 'site dark' : 'site'}>
    <nav className="nav wrap"><a className="brand" href="#top"><span className="brand-mark"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-18%20at%2015.01.31-40ZBvu0IWMXWBocEzVy2gjkybyE1sN.jpeg" alt="El Oasis TCG" /></span>El Oasis TCG</a><div className="nav-links"><a href="#collection">Colección</a><a href="#insights">Análisis</a><a href="#community">Comunidad</a></div><div className="nav-actions"><button aria-label="Buscar" className="icon-button"><Search size={18} /></button><button aria-label="Cambiar tema" className="icon-button" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="button button-dark">Abrir bóveda <ArrowUpRight size={16} /></button></div></nav>
    <section id="top" className="hero wrap"><div className="hero-copy"><div className="pill"><span className="live-dot" /> El refugio del coleccionista</div><h1>Colecciona<br /><em>en tu oasis.</em></h1><p className="hero-text">Tus cartas son mucho más que cartón. El Oasis TCG le da a cada pieza de tu colección un lugar, una historia y un futuro.</p><div className="hero-actions"><button className="button button-dark">Explorar la bóveda <ArrowUpRight size={16} /></button><a href="#collection" className="text-link">Descubre cómo funciona <span>↓</span></a></div><div className="social-proof"><div className="avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><p><strong>12,840+</strong><br /><span>coleccionistas en la bóveda</span></p></div></div><div className="hero-visual"><div className="orb orb-a" /><div className="orb orb-b" /><div className="hero-card"><div className="hero-card-top"><span>THE HOBBIT</span><span>285 / 281</span></div><div className="hero-art"><span className="art-symbol">✦</span><span className="mountain">⌁</span></div><div className="hero-card-name"><strong>Bilbo&apos;s Gambit</strong><span>R</span></div><div className="hero-card-body">When you cast this spell, choose one —<br />• Draw two cards<br />• Create a Treasure token</div><div className="hero-card-foot"><span>1/1</span><span>HOB • EN • NM</span></div></div><div className="float-tag tag-one"><Sparkles size={14} /> 2,481 cartas registradas</div><div className="float-tag tag-two"><ShieldCheck size={14} /> Solo casi nuevas</div></div></section>
    <section className="stats-band"><div className="wrap stats"><div><strong>{cards.length || '2,481'}</strong><span>cartas catalogadas</span></div><div><strong>$18.6k MXN</strong><span>valor de colección</span></div><div><strong>99.2%</strong><span>precisión de estado</span></div><div className="stats-note"><span className="live-dot" /> Actualizado hace un momento</div></div></section>
    <section id="collection" className="collection wrap"><div className="section-heading"><div><p className="eyebrow">Últimas adquisiciones</p><h2>Recién llegadas a la bóveda</h2></div><div className="search-box"><Search size={16} /><input aria-label="Buscar cartas" placeholder="Buscar en tu colección" value={query} onChange={(e) => setQuery(e.target.value)} /></div></div><div className="collection-grid">{visible.map((card, index) => <CollectionCard key={`${card.name}-${index}`} card={card} index={index} />)}</div></section>
    <section id="insights" className="insight-section"><div className="wrap insight-grid"><div><p className="eyebrow">Un oasis para tu colección</p><h2>Conoce lo que tienes.<br /><em>Entiende lo que significa.</em></h2><p className="hero-text">Desde tu primer sobre hasta tu intercambio número mil, El Oasis TCG convierte una colección dispersa en un archivo vivo.</p><button className="button button-light">Explorar análisis <ArrowUpRight size={16} /></button></div><div className="insight-panel"><div className="panel-top"><span>Valor del portafolio</span><ChevronDown size={16} /></div><strong>$18,642.80 MXN</strong><p className="positive">+12.4% <span>este mes</span></p><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-labels"><span>ABR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AGO</span><span>SEP</span></div></div></div></section>
    <footer id="community" className="footer wrap"><a className="brand" href="#top"><span className="brand-mark"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-18%20at%2015.01.31-40ZBvu0IWMXWBocEzVy2gjkybyE1sN.jpeg" alt="El Oasis TCG" /></span>El Oasis TCG</a><p>Tu colección, tu oasis.</p><div className="footer-links"><a href="#collection">Colección</a><a href="#insights">Análisis</a><a href="#">Instagram</a></div></footer>
  </main>
}
