import type { Audience } from '../lib/session'
import { goTo } from '../lib/hash'

const PERSONAS = [
  {
    title: 'Cuenta de ahorros',
    body: 'Saldo de práctica, movimientos y extractos que puedes ocultar o mostrar.',
  },
  {
    title: 'CDT Digital',
    body: 'Abre un CDT ilustrativo desde $100.000 y mira cómo se aparta el saldo.',
  },
  {
    title: 'Tarjeta débito',
    body: 'Una tarjeta de ensayo con cupo, compras recientes y avance a ahorros.',
  },
  {
    title: 'Pagos en línea',
    body: 'Paga la tarjeta o un crédito de práctica con el saldo de la cuenta demo.',
  },
]

const EMPRESAS = [
  {
    title: 'Cuenta corriente',
    body: 'Un saldo corporativo de práctica para tesorería y pagos del día.',
  },
  {
    title: 'Nómina',
    body: 'Dispersa un lote de prueba y ve el impacto en el saldo de la empresa.',
  },
  {
    title: 'Convenios',
    body: 'Paga servicios y proveedores con referencias inventadas.',
  },
  {
    title: 'Portal tesorería',
    body: 'El mismo tablero de personas, con saldos y roles de empresa.',
  },
]

export function Products({ audience }: { audience: Audience }) {
  const items = audience === 'empresas' ? EMPRESAS : PERSONAS

  return (
    <section id="productos" className="scroll-mt-28 bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[28px] font-bold text-navy sm:text-[32px]">
            {audience === 'empresas' ? 'Productos para tu empresa' : 'Productos para ti'}
          </h2>
          <button
            type="button"
            onClick={() => goTo('login')}
            className="hidden rounded-full bg-navy px-5 py-2.5 text-[14px] font-medium text-white sm:inline-flex"
          >
            Ingresar
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-[22px] border border-black/5 bg-page p-6">
              <h3 className="text-[18px] font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{item.body}</p>
              <button
                type="button"
                onClick={() => goTo('login')}
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-navy"
              >
                Conoce más <span aria-hidden>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
