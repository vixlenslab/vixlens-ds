import { useEffect, useState } from 'react'
import { navGroups, version } from '../data/nav.js'

export default function Sidebar({ open, onClose }) {
  const [active, setActive] = useState('')

  // scroll-spy — destaca a seção atual (toque luma: item ativo preenchido)
  useEffect(() => {
    const ids = navGroups
      .flatMap((g) => g.items)
      .filter((i) => i.href)
      .map((i) => i.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* backdrop mobile — botão de verdade, para fechar também no teclado */}
      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`fixed inset-0 z-30 h-full w-full cursor-default bg-black/40 transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] max-w-[85vw] flex-col overflow-hidden bg-vix-preto text-white transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* brand — fixo no topo */}
        <div className="shrink-0 border-b border-white/10 px-6 py-7">
          <img src="/assets/marca/vixlens/vixlens-negativo.svg" alt="Vixlens" className="h-8 w-auto" />
          <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-vix-amarelo">
            Laboratório Óptico
          </div>
          <div className="mt-1 text-[11px] text-white/60">Design System · {version}</div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-search'))}
            className="mt-4 flex w-full items-center gap-2 rounded-vix-input border border-white/15 bg-white/5 px-3 py-2 text-[13px] text-white/50 transition-colors hover:border-white/25 hover:text-white/80"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Buscar
            <kbd className="ml-auto rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/65">⌘K</kbd>
          </button>
        </div>

        {/* nav — única área que scrolla */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 [scrollbar-color:rgba(255,255,255,0.15)_transparent] scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                {group.label}
              </div>
              {group.items.map((item) =>
                item.soon ? (
                  <span
                    key={item.label}
                    className="flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-white/35"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    {item.label}
                    <span className="ml-auto rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/65">
                      EM BREVE
                    </span>
                  </span>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    aria-current={active === item.href.slice(1) ? 'true' : undefined}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-colors ${
                      active === item.href.slice(1)
                        ? 'bg-white/10 font-semibold text-white'
                        : 'font-medium text-white/70 hover:bg-white/6 hover:text-white'
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: active === item.href.slice(1) ? '#FAC617' : item.dot }}
                    />
                    {item.label}
                  </a>
                ),
              )}
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 px-6 py-5 text-[11px] text-white/60">
          Vixlens © 2026
        </div>
      </aside>
    </>
  )
}
