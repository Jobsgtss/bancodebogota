export type Audience = 'personas' | 'empresas'

export type Session = {
  type: 'CC' | 'CE' | 'NIT'
  doc: string
  name: string
  audience: Audience
}

const KEY = 'moro-session'
const NAMES = ['Camila', 'Andrés', 'Valentina', 'Santiago', 'Laura', 'Mateo']

export function nameFromDoc(doc: string) {
  const total = [...doc].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return NAMES[total % NAMES.length]
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function setSession(session: Session) {
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(KEY)
}
