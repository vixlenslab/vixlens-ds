import { useState, useEffect } from 'react'
import { ArrowUp } from '@phosphor-icons/react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-vix-preto text-white shadow-lg ring-1 ring-white/10 transition-all duration-200 hover:bg-[#333333] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-vix-amarelo ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={20} weight="bold" />
    </button>
  )
}
