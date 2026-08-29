import { type FormEvent, useMemo, useState } from 'react'
import { money, parseAmount } from '../lib/format'
import { clearSession, type Session } from '../lib/session'
import { Logo } from './Logo'

type View = 'inicio' | 'transferencias' | 'pagos' | 'cdt' | 'tarjeta'

type Move = {
  id: string
  label: string
  when: string
  amount: number
}

type Ledger = {
  savings: number
  cdt: number
  cardUsed: number
  cardLimit: number
  moves: Move[]
}

const CARD_LIMIT = 4_500_000

function seed(name: string): Ledger {
  return {
    savings: 4_250_800,
    cdt: 0,
    cardUsed: 2_650_000,
    cardLimit: CARD_LIMIT,
    moves: [
      { id: '1', label: `Nómina · ${name}`, when: 'Ayer', amount: 2_450_000 },
      { id: '2', label: 'Mercado · Compra', when: 'Hoy 10:42', amount: -186_900 },
      { id: '3', label: 'Transferencia a Juan P.', when: '24 ago', amount: -120_000 },
      { id: '4', label: 'Café Local', when: '23 ago', amount: -18_500 },
    ],
  }
}

export function Banca({ session }: { session: Session }) {
  const [view, setView] = useState<View>('inicio')
  const [hidden, setHidden] = useState(false)
  const [toast, setToast] = useState('')
  const [ledger, setLedger] = useState<Ledger>(() => seed(session.name))

  const available = ledger.cardLimit - ledger.cardUsed

  function show(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  function addMove(label: string, amount: number) {
    setLedger((current) => ({
      ...current,
      moves: [{ id: String(Date.now()), label, when: 'Ahora', amount }, ...current.moves].slice(0, 8),
    }))
  }

  function formatMoney(value: number) {
    return hidden ? '$ ••••••' : money(value)
  }

  function logout() {
    clearSession()
    window.location.hash = 'inicio'
  }

  return (
    <div className="min-h-svh bg-page lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 bg-navy text-white lg:min-h-svh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <Logo />
          <p className="hidden px-1 pt-4 text-[12px] text-cream/45 lg:block">Banca en línea · demo</p>
        </div>
        <nav className="flex gap-1 overflow-auto px-3 pb-3 lg:grid lg:gap-1 lg:px-4">
          <SideLink current={view} id="inicio" onClick={setView}>
            Inicio
          </SideLink>
          <SideLink current={view} id="transferencias" onClick={setView}>
            Transferencias
          </SideLink>
          <SideLink current={view} id="pagos" onClick={setView}>
            Pagos
          </SideLink>
          <SideLink current={view} id="cdt" onClick={setView}>
            CDT Digital
          </SideLink>
          <SideLink current={view} id="tarjeta" onClick={setView}>
            Tarjeta
          </SideLink>
        </nav>
        <div className="hidden px-4 pb-6 lg:block">
          <button type="button" onClick={logout} className="mt-8 text-[14px] text-cream/60 hover:text-cream">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-5 sm:px-8">
          <div>
            <h1 className="font-serif text-[30px] text-ink">Hola, {session.name}</h1>
            <p className="text-[13px] text-ink/50">
              {session.type} {session.doc} · {session.audience === 'empresas' ? 'Portal empresas' : 'Banca personas'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setHidden((value) => !value)}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px]"
            >
              {hidden ? 'Mostrar saldos' : 'Ocultar saldos'}
            </button>
            <a href="#inicio" className="rounded-full bg-ink px-3.5 py-1.5 text-[13px] text-cream">
              Ir al sitio
            </a>
            <button type="button" onClick={logout} className="rounded-full px-3.5 py-1.5 text-[13px] text-ink/60 lg:hidden">
              Salir
            </button>
          </div>
        </header>

        <main className="px-5 py-6 sm:px-8">
          {view === 'inicio' ? (
            <Home
              ledger={ledger}
              available={available}
              formatMoney={formatMoney}
              session={session}
              onView={setView}
              onExtract={() => show('Extracto de agosto generado (demo).')}
            />
          ) : null}
          {view === 'transferencias' ? (
            <TransferForm
              savings={ledger.savings}
              onSubmit={(amount, name) => {
                if (amount > ledger.savings) {
                  show('Saldo insuficiente en la simulación.')
                  return
                }
                setLedger((current) => ({ ...current, savings: current.savings - amount }))
                addMove(`Transferencia a ${name}`, -amount)
                show(`Transferencia a ${name} enviada.`)
                setView('inicio')
              }}
            />
          ) : null}
          {view === 'pagos' ? (
            <PayForm
              onSubmit={(amount, product) => {
                if (amount > ledger.savings) {
                  show('Saldo insuficiente en la simulación.')
                  return
                }
                setLedger((current) => ({
                  ...current,
                  savings: current.savings - amount,
                  cardUsed: product.includes('Tarjeta') ? Math.max(0, current.cardUsed - amount) : current.cardUsed,
                }))
                addMove(`Pago ${product}`, -amount)
                show('Pago aplicado a tu producto.')
                setView('inicio')
              }}
            />
          ) : null}
          {view === 'cdt' ? (
            <CdtForm
              onSubmit={(amount) => {
                if (amount < 100_000) {
                  show('El mínimo de la demo es $100.000.')
                  return
                }
                if (amount > ledger.savings) {
                  show('Saldo insuficiente en la simulación.')
                  return
                }
                setLedger((current) => ({
                  ...current,
                  savings: current.savings - amount,
                  cdt: current.cdt + amount,
                }))
                addMove('Apertura CDT Digital', -amount)
                show('CDT Digital abierto en la simulación.')
                setView('inicio')
              }}
            />
          ) : null}
          {view === 'tarjeta' ? (
            <CardDetail
              ledger={ledger}
              available={available}
              formatMoney={formatMoney}
              name={session.name}
              onAdvance={(amount) => {
                if (amount > available) {
                  show('Cupo insuficiente en la simulación.')
                  return
                }
                setLedger((current) => ({
                  ...current,
                  savings: current.savings + amount,
                  cardUsed: current.cardUsed + amount,
                }))
                addMove('Avance a ahorros', amount)
                show('Avance desembolsado a tu cuenta de ahorros.')
              }}
            />
          ) : null}
        </main>
      </div>

      {toast ? (
        <p className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[13px] text-cream shadow-lg">
          {toast}
        </p>
      ) : null}
    </div>
  )
}

function SideLink({
  current,
  id,
  onClick,
  children,
}: {
  current: View
  id: View
  onClick: (id: View) => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`whitespace-nowrap rounded-full px-3 py-2 text-left text-[14px] lg:rounded-xl ${
        current === id ? 'bg-white/10 text-cream' : 'text-cream/65 hover:text-cream'
      }`}
    >
      {children}
    </button>
  )
}

function Home({
  ledger,
  available,
  formatMoney,
  session,
  onView,
  onExtract,
}: {
  ledger: Ledger
  available: number
  formatMoney: (value: number) => string
  session: Session
  onView: (view: View) => void
  onExtract: () => void
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[20px] bg-ink p-6 text-cream md:col-span-1">
          <p className="text-[13px] text-cream/55">Cuenta de ahorros · **** 4821</p>
          <p className="mt-3 font-serif text-[34px] leading-none">{formatMoney(ledger.savings)}</p>
          <p className="mt-2 text-[13px] text-cream/50">Disponible hoy</p>
        </article>
        <article className="rounded-[20px] bg-white p-6">
          <p className="text-[13px] text-ink/50">Tarjeta débito</p>
          <p className="mt-3 font-serif text-[28px] leading-none">{formatMoney(available)}</p>
          <p className="mt-2 text-[13px] text-ink/45">Cupo disponible</p>
        </article>
        <article className="rounded-[20px] bg-white p-6">
          <p className="text-[13px] text-ink/50">CDT Digital</p>
          <p className="mt-3 font-serif text-[28px] leading-none">{formatMoney(ledger.cdt)}</p>
          <p className="mt-2 text-[13px] text-ink/45">EA 12% · demo</p>
        </article>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Action onClick={() => onView('transferencias')}>Transferir</Action>
        <Action onClick={() => onView('pagos')}>Pagar</Action>
        <Action onClick={() => onView('cdt')}>Abrir CDT</Action>
        <Action onClick={onExtract}>Extractos</Action>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[20px] bg-white p-6">
          <h3 className="text-[16px] font-medium">Últimos movimientos</h3>
          <ul className="mt-4 divide-y divide-ink/8">
            {ledger.moves.map((move) => (
              <li key={move.id} className="flex items-center justify-between gap-4 py-3 text-[14px]">
                <span>
                  {move.label}
                  <small className="mt-0.5 block text-[12px] text-ink/40">{move.when}</small>
                </span>
                <span className={move.amount < 0 ? 'text-ink' : 'text-banner'}>
                  {move.amount < 0 ? '−' : '+'}
                  {formatMoney(Math.abs(move.amount)).replace('-$', '').replace('$', '')}
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[20px] bg-ink p-6 text-cream">
          <h3 className="text-[16px] font-medium">Tu tarjeta</h3>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-copper/80 to-[#2f6a62] p-5">
            <p className="text-[13px] text-cream/80">Mastercard</p>
            <p className="mt-8 tracking-[0.2em]">**** **** **** 7742</p>
            <p className="mt-4 text-[13px]">
              {session.name} · 08/28
            </p>
          </div>
          <p className="mt-4 text-[13px] text-cream/55">
            Cupo total {formatMoney(ledger.cardLimit)} · Utilizado {formatMoney(ledger.cardUsed)}
          </p>
        </article>
      </div>
    </div>
  )
}

function Action({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-white px-4 py-4 text-left text-[14px] font-medium text-ink"
    >
      {children}
    </button>
  )
}

function TransferForm({
  savings,
  onSubmit,
}: {
  savings: number
  onSubmit: (amount: number, name: string) => void
}) {
  function handle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit(parseAmount(String(data.get('monto') || '')), String(data.get('nombre') || 'tercero'))
    event.currentTarget.reset()
  }

  return (
    <article className="max-w-lg rounded-[20px] bg-white p-6">
      <h2 className="font-serif text-[28px]">Nueva transferencia</h2>
      <p className="mt-1 text-[13px] text-ink/50">Disponible {money(savings)}</p>
      <form className="mt-5 grid gap-3" onSubmit={handle}>
        <Field name="destino" placeholder="Cuenta o cédula destino" required />
        <Field name="nombre" placeholder="Nombre del destinatario" required />
        <Field name="monto" placeholder="Monto" required />
        <Field name="desc" placeholder="Descripción (opcional)" />
        <button type="submit" className="mt-2 h-12 rounded-full bg-ink text-cream">
          Transferir
        </button>
      </form>
    </article>
  )
}

function PayForm({ onSubmit }: { onSubmit: (amount: number, product: string) => void }) {
  function handle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit(parseAmount(String(data.get('monto') || '')), String(data.get('producto') || 'producto'))
    event.currentTarget.reset()
  }

  return (
    <article className="max-w-lg rounded-[20px] bg-white p-6">
      <h2 className="font-serif text-[28px]">Pagar tarjeta o crédito</h2>
      <form className="mt-5 grid gap-3" onSubmit={handle}>
        <select name="producto" className="h-12 rounded-xl border border-ink/15 px-3">
          <option>Tarjeta débito ****7742</option>
          <option>Crédito de libre inversión</option>
        </select>
        <Field name="monto" placeholder="Valor a pagar" required />
        <button type="submit" className="mt-2 h-12 rounded-full bg-ink text-cream">
          Pagar
        </button>
      </form>
    </article>
  )
}

function CdtForm({ onSubmit }: { onSubmit: (amount: number) => void }) {
  function handle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit(parseAmount(String(data.get('monto') || '')))
    event.currentTarget.reset()
  }

  return (
    <article className="max-w-lg rounded-[20px] bg-white p-6">
      <h2 className="font-serif text-[28px]">CDT Digital</h2>
      <p className="mt-2 text-[14px] text-ink/60">
        Tasa de muestra 12% E.A. · plazo 90 días · mínimo $100.000. No hay rendimientos reales.
      </p>
      <form className="mt-5 grid gap-3" onSubmit={handle}>
        <Field name="monto" placeholder="Monto a invertir" required />
        <button type="submit" className="mt-2 h-12 rounded-full bg-ink text-cream">
          Abrir CDT
        </button>
      </form>
    </article>
  )
}

function CardDetail({
  ledger,
  available,
  formatMoney,
  name,
  onAdvance,
}: {
  ledger: Ledger
  available: number
  formatMoney: (value: number) => string
  name: string
  onAdvance: (amount: number) => void
}) {
  const usedPct = useMemo(() => Math.round((ledger.cardUsed / ledger.cardLimit) * 100), [ledger])

  function handle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onAdvance(parseAmount(String(data.get('monto') || '')))
    event.currentTarget.reset()
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-[20px] bg-white p-6">
        <h2 className="font-serif text-[28px]">Detalle de tu tarjeta</h2>
        <div className="mt-5 grid gap-3 text-[14px]">
          <Row label="Titular" value={name} />
          <Row label="Cupo total" value={formatMoney(ledger.cardLimit)} />
          <Row label="Utilizado" value={formatMoney(ledger.cardUsed)} />
          <Row label="Disponible" value={formatMoney(available)} />
          <Row label="Uso" value={`${usedPct}%`} />
        </div>
      </article>
      <article className="rounded-[20px] bg-white p-6">
        <h2 className="font-serif text-[28px]">Avance a ahorros</h2>
        <form className="mt-5 grid gap-3" onSubmit={handle}>
          <Field name="monto" placeholder="Valor del avance" required />
          <button type="submit" className="mt-2 h-12 rounded-full bg-ink text-cream">
            Desembolsar
          </button>
        </form>
      </article>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/8 py-2">
      <span className="text-ink/50">{label}</span>
      <strong className="font-medium">{value}</strong>
    </div>
  )
}

function Field({
  name,
  placeholder,
  required,
}: {
  name: string
  placeholder: string
  required?: boolean
}) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      required={required}
      className="h-12 rounded-xl border border-ink/15 px-3 text-[15px] outline-none"
    />
  )
}
