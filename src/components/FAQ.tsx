import { useState } from 'react'

const FAQS = [
  {
    q: '¿Este sitio es el banco real?',
    a: 'No. Bogotá es una simulación de banca digital. No captura depósitos ni reemplaza a ninguna entidad real.',
  },
  {
    q: '¿Puedo entrar con cualquier documento?',
    a: 'Sí. Elige un tipo de documento, escribe un número inventado y una clave cualquiera. El portal arma un nombre a partir del número y te deja operar saldos de mentira.',
  },
  {
    q: '¿Qué pasa con lo que escribo?',
    a: 'Se guarda solo en este navegador, en localStorage. No hay servidor de autenticación ni envío de credenciales. Borra los datos del sitio cuando termines.',
  },
  {
    q: '¿Las transferencias son reales?',
    a: 'No. Restan y suman cifras locales. El destinatario no recibe nada. El CDT Digital y el pago de tarjeta funcionan igual: son teatro interactivo.',
  },
  {
    q: '¿Por qué se parece a una home bancaria?',
    a: 'Para ensayar el ritmo de una portada bancaria: dos tarjetas, Personas y Empresas, ingreso, aviso de CDT y botón de ayuda. El banco es ficticio.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const allOpen = open === -1

  return (
    <section id="ayuda" className="scroll-mt-28 bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-[860px] px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[32px] font-bold leading-[1.2] text-navy sm:text-[40px]">Preguntas frecuentes</h2>
          <button
            type="button"
            className="text-[13px] text-ink/60 underline-offset-2 hover:underline"
            onClick={() => setOpen(allOpen ? null : -1)}
          >
            {allOpen ? 'Cerrar todas' : 'Expandir todas'}
          </button>
        </div>
        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((item, index) => {
            const isOpen = allOpen || open === index
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen && !allOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-medium text-ink">{item.q}</span>
                  <span className="text-xl text-ink/50">{isOpen ? '–' : '+'}</span>
                </button>
                {isOpen ? <p className="pb-5 text-[15px] leading-relaxed text-ink/70">{item.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
