import { useState } from 'react'
import type { Audience } from '../lib/session'
import { goTo } from '../lib/hash'
import { Logo } from './Logo'
import { Spinner } from './Spinner'

const PRODUCTS = [
  { title: 'Cuenta de ahorros', desc: 'Sin cuota de manejo en la simulación' },
  { title: 'CDT Digital', desc: 'Hasta 12% E.A. desde $100.000' },
  { title: 'Tarjeta débito', desc: 'Cupo de práctica y movimientos demo' },
  { title: 'Crédito', desc: 'Flujo ilustrativo, sin desembolso real' },
]

const PAYMENTS = [
  { title: 'Transferencias', desc: 'Entre cuentas o a un tercero demo' },
  { title: 'Pagos', desc: 'Servicios y tarjeta en el portal' },
  { title: 'Bre-B simulado', desc: 'Llaves y QR solo de demostración' },
]

const SUPPORT = [
  { title: 'Ayuda', desc: 'Chat de la simulación, esquina inferior' },
  { title: 'Preguntas frecuentes', desc: 'Cómo funciona este entorno' },
  { title: 'Seguridad', desc: 'No ingreses datos reales' },
]

type HeaderProps = {
  audience: Audience
  onAudience: (value: Audience) => void
}

export function Header({ audience, onAudience }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  function enter() {
    setLoading(true)
    window.setTimeout(() => goTo('login'), 700)
  }

  return (
    <header className="sticky top-0 z-40 bg-navy">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center gap-4 px-4 lg:px-8">
        <Logo />

        <div className="ml-2 hidden items-center gap-2 md:flex">
          <AudiencePill active={audience === 'personas'} onClick={() => onAudience('personas')}>
            Personas
          </AudiencePill>
          <AudiencePill active={audience === 'empresas'} onClick={() => onAudience('empresas')}>
            Empresas
          </AudiencePill>
        </div>

        <nav className="ml-auto hidden items-center gap-7 text-[15px] text-white lg:flex">
          <Dropdown label="Productos" items={PRODUCTS} />
          <Dropdown label="Pagos en línea" items={PAYMENTS} />
          <Dropdown label="Atención al cliente" items={SUPPORT} />
        </nav>

        <button
          type="button"
          onClick={enter}
          disabled={loading}
          className="ml-auto inline-flex h-10 min-w-[118px] items-center justify-center gap-1.5 rounded-full bg-white px-5 text-[15px] font-medium text-navy lg:ml-6"
        >
          {loading ? <Spinner className="size-4 text-navy" /> : 'Ingresar'}
          {loading ? null : (
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden>
              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menú"
        >
          <span className="text-lg">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open ? (
        <nav className="grid gap-1 border-t border-white/10 px-5 py-4 text-white lg:hidden">
          <div className="mb-2 flex gap-2">
            <AudiencePill active={audience === 'personas'} onClick={() => onAudience('personas')}>
              Personas
            </AudiencePill>
            <AudiencePill active={audience === 'empresas'} onClick={() => onAudience('empresas')}>
              Empresas
            </AudiencePill>
          </div>
          <a href="#productos" className="py-2" onClick={() => setOpen(false)}>
            Productos
          </a>
          <a href="#pagos" className="py-2" onClick={() => setOpen(false)}>
            Pagos en línea
          </a>
          <a href="#ayuda" className="py-2" onClick={() => setOpen(false)}>
            Atención al cliente
          </a>
        </nav>
      ) : null}
    </header>
  )
}

function AudiencePill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition ${
        active ? 'bg-sky text-navy' : 'border border-white text-white'
      }`}
    >
      {children}
    </button>
  )
}

function Dropdown({
  label,
  items,
}: {
  label: string
  items: { title: string; desc: string }[]
}) {
  return (
    <div className="group relative">
      <button type="button" className="inline-flex items-center gap-1.5 text-white">
        {label}
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
          {items.map((item) => (
            <a key={item.title} href="#productos" className="block rounded-xl px-3 py-2.5 text-left hover:bg-page">
              <div className="text-sm text-ink">{item.title}</div>
              <div className="text-xs text-muted">{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
