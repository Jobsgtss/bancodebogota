import type { Audience } from '../lib/session'
import { goTo } from '../lib/hash'

const COPY = {
  personas: {
    left: {
      eyebrow: 'Información importante',
      title: '¡Nuestro lugar es con todos los colombianos!',
      body: 'Contigo, podemos sumar esfuerzos para apoyar a quienes más lo necesitan hoy.',
    },
    right: {
      title: 'Si eres cliente ITAÚ, esta información es para ti',
    },
  },
  empresas: {
    left: {
      eyebrow: 'Portal empresas',
      title: '¡La tesorería de tu empresa, en un solo lugar!',
      body: 'Nómina, convenios y pagos de práctica para ensayar la operación del día, sin mover un peso real.',
    },
    right: {
      title: 'Si operas con varios bancos, esta información es para ti',
    },
  },
}

export function Hero({ audience }: { audience: Audience }) {
  const copy = COPY[audience]
  const leftImage = audience === 'empresas' ? '/hero-business.jpg' : '/hero-hands.jpg'

  return (
    <section id="inicio" className="bg-white px-4 pb-4 pt-5 sm:px-6">
      <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[1.45fr_0.9fr]">
        <article className="relative min-h-[460px] overflow-hidden rounded-[28px] sm:min-h-[520px]">
          <img src={leftImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/40 to-transparent" />
          <div className="relative flex h-full min-h-[460px] flex-col px-7 py-8 text-white sm:min-h-[520px] sm:px-10 sm:py-10">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em]">{copy.left.eyebrow}</p>
            <h1 className="mt-3 max-w-[16ch] text-[34px] font-bold leading-[1.12] sm:text-[46px]">
              {copy.left.title}
            </h1>
            <p className="mt-4 max-w-[32rem] text-[16px] leading-relaxed text-white/95 sm:text-[18px]">
              {copy.left.body}
            </p>
            <button
              type="button"
              onClick={() => goTo('login')}
              className="mt-auto mb-2 inline-flex size-12 items-center justify-center rounded-full bg-white text-navy shadow-md"
              aria-label="Entrar a la banca"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </article>

        <article className="flex min-h-[460px] flex-col overflow-hidden rounded-[28px] bg-cream sm:min-h-[520px]">
          <img src="/hero-client.jpg" alt="" className="h-[230px] w-full object-cover object-[50%_20%] sm:h-[260px]" />
          <div className="flex flex-1 flex-col px-7 py-7 sm:px-8">
            <h2 className="text-[26px] font-bold leading-tight text-ink sm:text-[30px]">{copy.right.title}</h2>
            <a
              href="#productos"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-[15px] font-medium text-white"
            >
              Conoce más
              <span
                className="grid size-6 place-items-center rounded-full bg-white text-navy"
                aria-hidden
              >
                →
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
