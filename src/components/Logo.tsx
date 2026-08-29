type LogoProps = {
  className?: string
  invert?: boolean
}

export function Logo({ className = '', invert = false }: LogoProps) {
  return (
    <a href="#inicio" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Banco de Bogotá">
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden>
        <path d="M3 22c0-8 4.2-16 8-16s8 8 8 16" stroke="#f5c518" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M9 22c0-8 4.2-16 8-16s8 8 8 16" stroke="#e85d04" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M15 22c0-8 4.2-16 8-16s8 8 8 16" stroke="#3db5d4" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
      <span className={`text-[16px] font-semibold leading-tight tracking-tight sm:text-[18px] ${invert ? 'text-navy' : 'text-white'}`}>
        Banco de Bogotá
      </span>
    </a>
  )
}
