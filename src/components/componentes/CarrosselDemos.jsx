import { useState } from 'react'
import { ArrowRight, Eye, Quotes } from '@phosphor-icons/react'
import {
  CarouselItem,
  CarouselNav,
  CarouselTrack,
  useCarousel,
  useCarouselAutoplay,
} from '../ui/carousel.jsx'

// Cenas de demonstração do carrossel. Rodam na seção Carrossel e, sozinhas, dentro
// do iframe da prévia desktop × mobile (/?demo=carrossel&cena=...).

const LINHA = [
  { n: 'Freevix ONE', t: 'Multifocal · entrada' },
  { n: 'Freevix PREMIUM', t: 'Multifocal' },
  { n: 'Freevix FREEDOM', t: 'Multifocal' },
  { n: 'Freevix IA TECH', t: 'Multifocal · IA' },
  { n: 'Freevix VS HD', t: 'Visão simples · HD' },
  { n: 'Astera', t: 'Controle de miopia' },
]

const MARCAS = ['Freevix', 'Reflecta', 'Astera', 'Vix Academy', 'VixClub', 'Kodak', 'Transitions', 'Sun+']

const DEPOIMENTOS = [
  { q: 'O prazo de entrega mudou nossa rotina de balcão. Cliente volta pra buscar no dia combinado.', a: 'Depoimento de exemplo · Vitória, ES' },
  { q: 'A linha Freevix facilitou explicar a diferença entre as multifocais pro cliente.', a: 'Depoimento de exemplo · Salvador, BA' },
  { q: 'Os treinamentos da Vix Academy deixaram a equipe mais segura na venda.', a: 'Depoimento de exemplo · Teixeira de Freitas, BA' },
  { q: 'Suporte técnico que responde rápido e resolve. É o que a gente precisa.', a: 'Depoimento de exemplo · Linhares, ES' },
  { q: 'O Reflecta virou argumento de venda: o cliente vê a diferença no reflexo.', a: 'Depoimento de exemplo · Cachoeiro, ES' },
]

export const CENAS = [
  { id: 'cards', label: 'Cards · fundo claro' },
  { id: 'escuro', label: 'Marcas · fundo escuro' },
  { id: 'depoimentos', label: 'Depoimentos · autoplay' },
]

function CardsDemo() {
  const c = useCarousel(undefined, LINHA.length)
  return (
    <div>
      <CarouselTrack ref={c.scrollRef} aria-label="Linha Freevix">
        {LINHA.map((p, i) => (
          <CarouselItem key={p.n} index={i} size="cards">
            <div className="flex h-full flex-col rounded-vix-card border border-gray-200 bg-white p-6">
              <div className="mb-5 flex h-36 items-center justify-center rounded-[24px] bg-vix-cinza-card">
                <Eye size={32} className="text-gray-600" aria-hidden="true" />
              </div>
              <div className="text-xl font-bold text-vix-preto">{p.n}</div>
              <div className="mt-1 text-sm text-gray-600">{p.t}</div>
              <div className="mt-auto flex justify-end pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vix-preto">
                  <ArrowRight size={16} weight="bold" className="text-white" aria-hidden="true" />
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselTrack>
      <CarouselNav
        count={c.count}
        activeIndex={c.activeIndex}
        onSelect={c.scrollToIndex}
        onPrev={() => c.scrollByStep(-1)}
        onNext={() => c.scrollByStep(1)}
        canPrev={c.canPrev}
        canNext={c.canNext}
        itemLabel="card"
      />
    </div>
  )
}

function EscuroDemo() {
  const c = useCarousel(undefined, MARCAS.length)
  return (
    <div className="rounded-vix-card bg-vix-preto p-6 md:p-10">
      <CarouselTrack ref={c.scrollRef} aria-label="Marcas do portfólio">
        {MARCAS.map((m, i) => (
          <CarouselItem key={m} index={i} size="logos">
            <div className="flex h-28 items-center justify-center rounded-[24px] bg-white/10 px-4 text-center text-lg font-bold text-white">
              {m}
            </div>
          </CarouselItem>
        ))}
      </CarouselTrack>
      <CarouselNav
        tone="dark"
        count={c.count}
        activeIndex={c.activeIndex}
        onSelect={c.scrollToIndex}
        onPrev={() => c.scrollByStep(-1)}
        onNext={() => c.scrollByStep(1)}
        canPrev={c.canPrev}
        canNext={c.canNext}
        itemLabel="marca"
      />
    </div>
  )
}

function DepoimentosDemo() {
  const c = useCarousel(undefined, DEPOIMENTOS.length)
  const auto = useCarouselAutoplay({
    activeIndex: c.activeIndex,
    count: c.count,
    scrollToIndex: c.scrollToIndex,
  })
  const nav = (fn) => (...args) => {
    auto.restart()
    fn(...args)
  }
  return (
    <div ref={auto.rootRef} {...auto.rootProps}>
      <CarouselTrack
        ref={c.scrollRef}
        aria-label="Depoimentos"
        aria-live={auto.playing ? 'off' : 'polite'}
      >
        {DEPOIMENTOS.map((d, i) => (
          <CarouselItem key={d.a} index={i} size="cards">
            <figure className="flex h-full flex-col gap-4 rounded-vix-card bg-vix-cinza-card p-6">
              <Quotes size={28} weight="fill" className="text-vix-amarelo" aria-hidden="true" />
              <blockquote className="text-base leading-relaxed text-vix-preto">{d.q}</blockquote>
              <figcaption className="mt-auto text-sm font-semibold text-gray-600">{d.a}</figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselTrack>
      <CarouselNav
        count={c.count}
        activeIndex={c.activeIndex}
        onSelect={nav(c.scrollToIndex)}
        onPrev={nav(() => c.scrollByStep(-1))}
        onNext={nav(() => c.scrollByStep(1))}
        canPrev={c.canPrev}
        canNext={c.canNext}
        itemLabel="depoimento"
      />
      <p className="mt-4 text-xs text-gray-600" aria-hidden="true">
        {auto.playing ? 'Autoplay ligado: avança a cada 5 s.' : 'Autoplay pausado (mouse, foco, fora da tela ou movimento reduzido).'}
      </p>
    </div>
  )
}

// Cards clicáveis: prova que clique simples abre e que arrastar e soltar em cima de um card não abre.
function ArrastarDemo() {
  const c = useCarousel(undefined, LINHA.length)
  const [aberto, setAberto] = useState(null)
  return (
    <div>
      <CarouselTrack ref={c.scrollRef} aria-label="Linha Freevix (arraste com o mouse)">
        {LINHA.map((p, i) => (
          <CarouselItem key={p.n} index={i} size="cards">
            <button
              type="button"
              onClick={() => setAberto(p.n)}
              className="flex h-full w-full flex-col rounded-vix-card border border-gray-200 bg-white p-6 text-left transition-colors hover:border-vix-preto focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-vix-amarelo"
            >
              <span className="mb-5 flex h-28 w-full items-center justify-center rounded-[24px] bg-vix-cinza-card">
                <Eye size={32} className="text-gray-600" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-vix-preto">{p.n}</span>
              <span className="mt-1 text-sm text-gray-600">{p.t}</span>
            </button>
          </CarouselItem>
        ))}
      </CarouselTrack>
      <CarouselNav
        count={c.count}
        activeIndex={c.activeIndex}
        onSelect={c.scrollToIndex}
        onPrev={() => c.scrollByStep(-1)}
        onNext={() => c.scrollByStep(1)}
        canPrev={c.canPrev}
        canNext={c.canNext}
        itemLabel="card"
      />
      <p aria-live="polite" className="mt-4 rounded-lg bg-vix-cinza-card px-3.5 py-2.5 text-[13px] text-gray-600">
        {aberto ? (
          <>
            Card aberto por clique: <b className="text-vix-preto">{aberto}</b>
          </>
        ) : (
          'Arraste com o mouse: ao soltar, nenhum card abre. Clique sem arrastar: o card abre.'
        )}
      </p>
    </div>
  )
}

export function CarrosselDemo({ cena = 'cards' }) {
  if (cena === 'escuro') return <EscuroDemo />
  if (cena === 'depoimentos') return <DepoimentosDemo />
  if (cena === 'arrastar') return <ArrastarDemo />
  return <CardsDemo />
}

// Página mínima do iframe: gutter de 16px no celular e 64px a partir de md, como o site.
export function CarrosselFrame({ cena }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-8 font-vix md:px-16 md:py-12">
      <h1 className="sr-only">Prévia do carrossel</h1>
      <CarrosselDemo cena={cena} />
    </main>
  )
}
