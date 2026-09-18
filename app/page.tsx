'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Bell, ChevronDown, Grid2X2, Moon, Search, ShieldCheck, Sparkles, Sun, WalletCards } from 'lucide-react'
import rawCards from '../cards.json'

type Card = { name: string; setCode: string; setName: string; rarity: string; foil: string; quantity: number; purchasePrice: number | null; condition: string }
const cards = (rawCards as unknown[]).map((item) => { const record = item as { data?: Card }; return record.data ?? (item as Card) }).filter((card): card is Card => Boolean(card && 'name' in card))
const featured = cards.slice(0, 4)
const rarityLabels: Record<string, string> = { mythic: 'Mythic rare', rare: 'Rare', uncommon: 'Uncommon', common: 'Common' }

function CollectionCard({ card, index }: { card: Card; index: number }) {
  const palettes = ['card-indigo', 'card-amber', 'card-ink', 'card-sand']
  return <article className="collection-card">
    <div className={`card-art ${palettes[index % palettes.length]}`}><span className="mana">{index === 0 ? '✦' : index === 1 ? '◈' : '◉'}</span><span className="set-mark">{card.setCode}</span><div className="art-glow" /></div>
    <div className="collection-info"><div><p className="eyebrow">{rarityLabels[card.rarity] ?? card.rarity}</p><h3>{card.name}</h3><p className="muted">{card.setName}</p></div><ArrowUpRight size={17} /></div>
  </article>
}

export default function Home() {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')
  const visible = useMemo(() => featured.filter((card) => card.name.toLowerCase().includes(query.toLowerCase())), [query])
  return <main className={dark ? 'site dark' : 'site'}>
    <nav className="nav wrap"><a className="brand" href="#top"><span className="brand-mark"><WalletCards size={18} /></span>cardvault</a><div className="nav-links"><a href="#collection">Collection</a><a href="#insights">Insights</a><a href="#community">Community</a></div><div className="nav-actions"><button aria-label="Buscar" className="icon-button"><Search size={18} /></button><button aria-label="Cambiar tema" className="icon-button" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="button button-dark">Open vault <ArrowUpRight size={16} /></button></div></nav>
    <section id="top" className="hero wrap"><div className="hero-copy"><div className="pill"><span className="live-dot" /> The collector&apos;s operating system</div><h1>Collect<br /><em>with intent.</em></h1><p className="hero-text">Your cards are more than cardboard. Cardvault gives every piece of your collection a place, a story, and a future.</p><div className="hero-actions"><button className="button button-dark">Explore the vault <ArrowUpRight size={16} /></button><a href="#collection" className="text-link">See how it works <span>↓</span></a></div><div className="social-proof"><div className="avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><p><strong>12,840+</strong><br /><span>collectors in the vault</span></p></div></div><div className="hero-visual"><div className="orb orb-a" /><div className="orb orb-b" /><div className="hero-card"><div className="hero-card-top"><span>THE HOBBIT</span><span>285 / 281</span></div><div className="hero-art"><span className="art-symbol">✦</span><span className="mountain">⌁</span></div><div className="hero-card-name"><strong>Bilbo&apos;s Gambit</strong><span>R</span></div><div className="hero-card-body">When you cast this spell, choose one —<br />• Draw two cards<br />• Create a Treasure token</div><div className="hero-card-foot"><span>1/1</span><span>HOB • EN • NM</span></div></div><div className="float-tag tag-one"><Sparkles size={14} /> 2,481 cards tracked</div><div className="float-tag tag-two"><ShieldCheck size={14} /> Near mint only</div></div></section>
    <section className="stats-band"><div className="wrap stats"><div><strong>{cards.length || '2,481'}</strong><span>cards catalogued</span></div><div><strong>€18.6k</strong><span>collection value</span></div><div><strong>99.2%</strong><span>condition accuracy</span></div><div className="stats-note"><span className="live-dot" /> Updated moments ago</div></div></section>
    <section id="collection" className="collection wrap"><div className="section-heading"><div><p className="eyebrow">The latest additions</p><h2>Fresh from the vault</h2></div><div className="search-box"><Search size={16} /><input aria-label="Buscar cartas" placeholder="Search your collection" value={query} onChange={(e) => setQuery(e.target.value)} /></div></div><div className="collection-grid">{visible.map((card, index) => <CollectionCard key={`${card.name}-${index}`} card={card} index={index} />)}</div></section>
    <section id="insights" className="insight-section"><div className="wrap insight-grid"><div><p className="eyebrow">Built for the long game</p><h2>Know what you own.<br /><em>Know what it means.</em></h2><p className="hero-text">From your first booster to your thousandth trade, Cardvault turns a scattered collection into a living archive.</p><button className="button button-light">Explore insights <ArrowUpRight size={16} /></button></div><div className="insight-panel"><div className="panel-top"><span>Portfolio value</span><ChevronDown size={16} /></div><strong>€18,642.80</strong><p className="positive">+12.4% <span>this month</span></p><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-labels"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div></div></div></section>
    <footer id="community" className="footer wrap"><a className="brand" href="#top"><span className="brand-mark"><WalletCards size={18} /></span>cardvault</a><p>For people who collect with intention.</p><div className="footer-links"><a href="#collection">Collection</a><a href="#insights">Insights</a><a href="#">Instagram</a></div></footer>
  </main>
}
