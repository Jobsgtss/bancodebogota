const REASONS = [
  {
    title: 'Clara desde el primer renglón',
    body: 'Bogotá es una simulación. No hay captación real ni se guardan credenciales fuera de tu navegador.',
  },
  {
    title: 'Un portal que se siente banco',
    body: 'Saldos, transferencias, CDT y tarjeta viven en el navegador. Sirve para ensayar flujos, no para operar plata real.',
  },
  {
    title: 'Se ve como un banco, no lo es',
    body: 'Misma portada de dos tarjetas, Personas y Empresas, aviso de CDT y botón de ayuda. El nombre y los datos son de la simulación.'
  },
  {
    title: 'Datos que no viajan',
    body: 'El documento y la clave se quedan en localStorage. Cualquier combinación entra. No uses información verdadera.',
  },
]

export function Why() {
  return (
    <section id="pagos" className="scroll-mt-28 bg-page px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="max-w-xl text-[32px] font-bold leading-[1.2] text-navy sm:text-[40px]">
          Por qué esta simulación existe
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <article key={reason.title} className="border-t border-ink/10 pt-6">
              <h3 className="text-[17px] font-medium text-ink">{reason.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{reason.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
