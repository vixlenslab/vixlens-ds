import { useState, useCallback, useRef, useEffect } from 'react'
import { Copy, Check } from '@phosphor-icons/react'

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      return true
    } catch {
      return false
    }
  }
}

export function useCopy(timeout = 1400) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = useCallback(
    async (text) => {
      const ok = await writeClipboard(text)
      if (!ok) return
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), timeout)
    },
    [timeout],
  )
  return { copied, copy }
}

const TONE = {
  light: { hover: 'hover:bg-black/6', icon: 'text-gray-600', ok: 'text-green-600' },
  dark: { hover: 'hover:bg-white/10', icon: 'text-white/50', ok: 'text-vix-amarelo' },
}

// Ícone-only — copia `value`
export function CopyButton({ value, label, tone = 'light', size = 14, className = '' }) {
  const { copied, copy } = useCopy()
  const t = TONE[tone] || TONE.light
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        copy(value)
      }}
      aria-label={`Copiar ${label || value}`}
      title={copied ? 'Copiado!' : `Copiar ${label || value}`}
      className={`inline-flex shrink-0 items-center justify-center rounded-md p-1 transition-colors ${t.hover} ${className}`}
    >
      {copied ? (
        <Check size={size} weight="bold" className={t.ok} />
      ) : (
        <Copy size={size} weight="regular" className={t.icon} />
      )}
    </button>
  )
}

// Bloco de código escuro com botão de copiar (canto superior direito)
export function CodeBlock({ code, className = '' }) {
  return (
    <div className={`group relative overflow-hidden rounded-vix-input bg-vix-preto ${className}`}>
      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word px-4 py-3.5 pr-12 font-mono text-[12.5px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
      <CopyButton value={code} label="código" tone="dark" className="absolute right-2 top-2" />
    </div>
  )
}

// Valor clicável (mono por padrão) — o texto inteiro copia; ícone aparece no hover
export function CopyValue({ value, children, tone = 'light', mono = true, size = 12, className = '' }) {
  const { copied, copy } = useCopy()
  const t = TONE[tone] || TONE.light
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        copy(value)
      }}
      aria-label={`Copiar ${value}`}
      title={copied ? 'Copiado!' : 'Clique para copiar'}
      className={`group/copy -mx-1 inline-flex max-w-full items-center gap-1 rounded px-1 py-0.5 align-middle transition-colors ${t.hover}`}
    >
      <span className={`${mono ? 'font-mono' : ''} truncate ${className}`}>{children ?? value}</span>
      {copied ? (
        <Check size={size} weight="bold" className={`shrink-0 ${t.ok}`} />
      ) : (
        <Copy
          size={size}
          weight="regular"
          className={`shrink-0 ${t.icon} opacity-0 transition-opacity group-hover/copy:opacity-100`}
        />
      )}
    </button>
  )
}
