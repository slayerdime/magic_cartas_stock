'use client'

import { FormEvent, useState } from 'react'
import { ArrowLeft, Globe2, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const redirectTo = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?next=/cotizacion`

  async function handleGoogle() {
    setMessage('Redirigiendo a Google...')
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
    if (result.error) { setMessage('No pudimos completar el acceso. Revisa tus datos e inténtalo de nuevo.'); return }
    setMessage(mode === 'login' ? 'Acceso correcto. Redirigiendo...' : 'Revisa tu correo para confirmar tu cuenta.')
    if (mode === 'login') window.location.href = '/cotizacion'
  }

  return <main className="auth-page"><a className="auth-back" href="/"><ArrowLeft size={16} /> Volver a El Oasis</a><section className="auth-card"><p className="eyebrow">La comunidad de El Oasis</p><h1>{mode === 'login' ? 'Entra a tu oasis.' : 'Crea tu cuenta.'}</h1><p className="auth-lead">Inicia sesión para solicitar cotizaciones y mantener tu colección conectada.</p><button className="oauth-button" onClick={handleGoogle}><Globe2 size={18} /> Continuar con Google</button><div className="auth-divider"><span>o usa tu correo</span></div><form onSubmit={handleSubmit}><label>Correo electrónico<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Contraseña<input type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="button button-dark auth-submit" type="submit"><Mail size={16} /> {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</button></form>{message && <p className="auth-message" role="status">{message}</p>}<p className="auth-switch">{mode === 'login' ? '¿Aún no eres parte de la comunidad?' : '¿Ya tienes una cuenta?'} <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}>{mode === 'login' ? 'Date de alta' : 'Inicia sesión'}</button></p></section></main>
}
