export function money(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, '')
  return Number(digits || 0)
}
