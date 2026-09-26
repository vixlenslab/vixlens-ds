import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { navGroups } from '../data/nav.js'

// componentes shadcn (todos apontam pra #shadcn)
const SHADCN = [
  'Switch', 'Checkbox', 'Radio', 'Select', 'Slider', 'Textarea',
  'Badge', 'Progress', 'Avatar', 'Separator', 'Dialog', 'Popover',
  'Tooltip', 'Alert', 'Tabs', 'Accordion', 'Table', 'Dropdown Menu',
]

const norm = (s) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

function buildIndex() {
  const out = []
  for (const g of navGroups) {
    for (const it of g.items) {
      if (!it.href) continue // pula "em breve"
      out.push({ label: it.label, href: it.href, group: g.label, dot: it.dot })
    }
  }
  for (const name of SHADCN) {
    out.push({ label: name, href: '#shadcn', group: 'Biblioteca shadcn', dot: '#0439D9' })
  }
  return out
}

export default function Search() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const nq = norm(q.trim())
    if (!nq) return index
    return index.filter((i) => norm(i.label + ' ' + i.group).includes(nq))
  }, [q, index])

  const close = useCallback(() => {
    setOpen(false)
    setQ('')
    setActive(0)
  }, [])

  const go = useCallback(
    (item) => {
      if (!item) return
      window.location.hash = item.href
      close()
    },
    [close],
  )

  // abrir: ⌘K / Ctrl+K, ou evento 'open-search' (botão da sidebar)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        // Global, e não só no input: o foco pode estar em qualquer lugar do modal.
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-search', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [q])

  // mantém o item ativo visível
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, results])

  if (!open) return null

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]">
      {/* O fundo é um botão de verdade: fechar no clique fora precisa existir
          também para teclado e leitor de tela, não só para o mouse. */}
      <button
        type="button"
        aria-label="Fechar busca"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-xs"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar no Design System"
        className="relative w-full max-w-lg overflow-hidden rounded-vix-card bg-white shadow-2xl ring-1 ring-black/10"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
          <MagnifyingGlass size={18} className="shrink-0 text-gray-600" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Buscar seção, token ou componente…"
            className="flex-1 bg-transparent text-[15px] text-vix-preto outline-hidden placeholder:text-gray-600"
          />
          <kbd className="shrink-0 rounded-md border border-gray-200 px-1.5 py-0.5 font-mono text-[10px] text-gray-600">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px] text-gray-600">
              Nada encontrado para “{q}”.
            </div>
          ) : (
            results.map((item, i) => {
              const isActive = i === active
              return (
                <button
                  key={item.group + item.label}
                  type="button"
                  data-active={isActive ? 'true' : undefined}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive ? 'bg-vix-cinza-card' : 'hover:bg-gray-50'
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: item.dot || '#606F7F' }}
                  />
                  <span className="text-[14px] font-medium text-vix-preto">{item.label}</span>
                  <span className="ml-auto text-[11px] text-gray-600">{item.group}</span>
                  {isActive && <span className="shrink-0 font-mono text-[13px] text-gray-600">↵</span>}
                </button>
              )
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-gray-100 bg-gray-50/60 px-4 py-2 text-[11px] text-gray-600">
          <span><b className="font-mono text-gray-600">↑↓</b> navegar</span>
          <span><b className="font-mono text-gray-600">↵</b> abrir</span>
          <span><b className="font-mono text-gray-600">esc</b> fechar</span>
        </div>
      </div>
    </div>
  )
}
