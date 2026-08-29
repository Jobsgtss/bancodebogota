import { Logo } from './Logo'

const COLUMNS = [
  {
    title: 'Productos',
    links: ['Cuenta de ahorros', 'CDT Digital', 'Tarjeta débito', 'Pagos en línea'],
  },
  {
    title: 'Simulación',
    links: ['Cómo entrar', 'Qué no somos', 'Preguntas frecuentes', 'Borrar sesión'],
  },
  {
    title: 'Atención',
    links: ['Ayuda', 'Seguridad', 'Términos de la demo', 'Contacto ilustrativo'],
  },
]

export function Footer() {
  return (
    <footer className="bg-footer text-cream">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-cream/65">
              Banca digital de demostración. Hecha para explorar, no para operar dinero.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="text-[13px] font-medium uppercase tracking-wider text-cream/50">{column.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#ayuda" className="text-[14px] text-cream/85 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bogotá · simulación</p>
          <p>No uses datos reales. No hay entidad vigilada detrás de este sitio.</p>
        </div>
      </div>
    </footer>
  )
}
