import { type FormEvent, useEffect, useState } from 'react'
import { goTo } from '../lib/hash'
import { nameFromDoc, setSession, type Audience, type Session } from '../lib/session'
import { Logo } from './Logo'
import { LoadingScreen, Spinner } from './Spinner'

type LoginProps = {
  audience: Audience
}

export function Login({ audience }: LoginProps) {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<Session['type']>(audience === 'empresas' ? 'NIT' : 'CC')
  const [doc, setDoc] = useState('1020304050')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const session = {
      type,
      doc: doc.trim(),
      name: nameFromDoc(doc.trim() || '1'),
      audience,
    }
    window.setTimeout(() => {
      setSession(session)
      goTo('banca')
    }, 800)
  }

  if (!ready) {
    return <LoadingScreen label="Abriendo ingreso" />
  }

  return (
    <div className="flex min-h-svh flex-col bg-navy">
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <a href="#inicio" className="text-[14px] text-white/70 hover:text-white">
          Volver al sitio
        </a>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <form onSubmit={onSubmit} className="w-full max-w-[420px] rounded-[22px] bg-white p-8 shadow-2xl sm:p-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-navy/50">Simulación</p>
          <h1 className="mt-2 text-[32px] font-bold leading-tight text-navy">Ingresa a tu banca</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
            Cualquier documento inventado y una clave cualquiera. No uses datos reales.
          </p>

          <label className="mt-7 block text-[13px] text-ink/70">
            Tipo de documento
            <select
              value={type}
              onChange={(event) => setType(event.target.value as Session['type'])}
              className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-[15px] outline-none"
            >
              <option value="CC">Cédula de ciudadanía</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="NIT">NIT</option>
            </select>
          </label>

          <label className="mt-4 block text-[13px] text-ink/70">
            Número
            <input
              required
              value={doc}
              onChange={(event) => setDoc(event.target.value)}
              inputMode="numeric"
              className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-[15px] outline-none"
            />
          </label>

          <label className="relative mt-4 block text-[13px] text-ink/70">
            Clave de la demo
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="demo"
              className="mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-3 pr-12 text-[15px] outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-[34px] text-[12px] text-navy"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </button>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-navy text-[16px] text-white"
          >
            {loading ? <Spinner className="size-5 text-white" /> : 'Continuar'}
          </button>
          <p className="mt-4 text-center text-[12px] text-ink/45">
            Sugerido: CC 1020304050 · clave demo
          </p>
        </form>
      </div>
    </div>
  )
}
