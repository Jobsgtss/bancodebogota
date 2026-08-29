import { useState } from 'react'

const REPLIES = [
  'Esto es una simulación. No hay asesores reales detrás del chat.',
  'Entra con cualquier documento inventado y una clave cualquiera.',
  'Los saldos viven en tu navegador. Recarga y siguen ahí hasta que borres el sitio.',
]

export function HelpWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'bot' | 'me'; text: string }[]>([
    { from: 'bot', text: 'Hola. Soy la ayuda de Bogotá, solo de demostración. ¿Qué quieres ensayar?' },
  ])
  const [text, setText] = useState('')

  function send() {
    const value = text.trim()
    if (!value) return
    const reply = REPLIES[messages.length % REPLIES.length]
    setMessages((current) => [...current, { from: 'me', text: value }, { from: 'bot', text: reply }])
    setText('')
  }

  return (
    <div className="fixed bottom-5 right-4 z-40">
      {open ? (
        <div className="mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <div>
              <p className="text-[15px] font-medium">Ayuda</p>
              <p className="text-[12px] text-white/60">Chat de la simulación</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar ayuda">
              ×
            </button>
          </header>
          <div className="grid max-h-72 gap-2 overflow-auto p-3">
            {messages.map((message, index) => (
              <p
                key={`${message.text}-${index}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                  message.from === 'me' ? 'ml-auto bg-navy text-white' : 'bg-page text-ink'
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-black/10 p-3"
            onSubmit={(event) => {
              event.preventDefault()
              send()
            }}
          >
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Escribe algo"
              className="h-10 flex-1 rounded-full border border-black/10 px-3 text-[14px] outline-none"
            />
            <button type="submit" className="rounded-full bg-navy px-3 text-[13px] text-white">
              Enviar
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2.5 text-[15px] font-semibold text-ink shadow-lg shadow-black/15"
      >
        <span className="grid size-7 place-items-center rounded-full bg-white text-navy">?</span>
        Ayuda
      </button>
    </div>
  )
}
