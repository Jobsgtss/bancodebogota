import { useState } from 'react'
import { goTo } from '../lib/hash'

export function PromoToast() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <aside className="fixed bottom-5 left-4 z-40 w-[min(100%-2rem,22rem)] rounded-2xl bg-promo p-4 shadow-xl shadow-black/10">
      <button
        type="button"
        className="absolute right-3 top-2 text-lg text-navy/50"
        onClick={() => setOpen(false)}
        aria-label="Cerrar aviso"
      >
        ×
      </button>
      <p className="pr-6 text-[14px] leading-snug text-ink">
        ¡Tus ahorros crecen con una tasa de hasta 12% E.A. invierte desde $100.000 en un CDT Digital!
      </p>
      <button
        type="button"
        onClick={() => goTo('login')}
        className="mt-3 rounded-full bg-navy px-3.5 py-1.5 text-[13px] font-medium text-white"
      >
        Ábrelo aquí
      </button>
    </aside>
  )
}
