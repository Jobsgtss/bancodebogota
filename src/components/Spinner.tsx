type SpinnerProps = {
  className?: string
}

export function Spinner({ className = 'size-8 text-ink' }: SpinnerProps) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LoadingScreen({ label = 'Cargando' }: { label?: string }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-cream">
      <Spinner className="size-10 text-ink" />
      <span className="text-[13px] tracking-wide text-ink/50">{label}</span>
    </div>
  )
}
