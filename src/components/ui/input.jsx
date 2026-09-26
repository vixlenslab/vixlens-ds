import { cn } from '../../lib/utils.js'

// Input estilo luma — campo PREENCHIDO (bg-input/50, sem borda), radius grande (24px),
// h 36px, texto 14px. Cores Vixlens (foco preto).
export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'h-[36px] w-full rounded-vix-input border border-transparent bg-input/50 px-[14px] py-1 text-sm text-vix-preto transition-[color,box-shadow,background-color]',
        'placeholder:text-vix-cinza focus:border-vix-preto focus:outline-hidden focus:ring-[3px] focus:ring-ring/30',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
