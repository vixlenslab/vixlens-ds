import { useLayoutEffect, useRef, useState } from 'react'
import { Section, SubTitle } from '../Section.jsx'
import { Desktop, DeviceMobile } from '@phosphor-icons/react'
import { PropsTable, DosDonts } from './ComponentDocs.jsx'
import { CodeBlock } from '../Copy.jsx'
import { CarrosselDemo, CENAS } from './CarrosselDemos.jsx'

const NAV_PROPS = [
  { prop: 'count', tipo: 'number', padrao: '—', desc: 'Número de posições de rolagem (vem do useCarousel). Com 1 ou menos, a navegação não renderiza.' },
  { prop: 'activeIndex', tipo: 'number', padrao: '—', desc: 'Posição ativa (0-based). Vira a pílula de 28×8px.' },
  { prop: 'onSelect', tipo: '(i) => void', padrao: '—', desc: 'Clique no ponto. Normalmente scrollToIndex.' },
  { prop: 'onPrev / onNext', tipo: '() => void', padrao: '—', desc: 'Setas. Normalmente scrollByStep(-1) / scrollByStep(1).' },
  { prop: 'canPrev / canNext', tipo: 'boolean', padrao: '—', desc: 'false desabilita a seta de verdade (disabled) no início / fim da trilha.' },
  { prop: 'tone', tipo: '"light" | "dark"', padrao: '"light"', desc: 'Cor do fundo onde a navegação fica. dark para carrossel sobre preto.' },
  { prop: 'itemLabel', tipo: 'string', padrao: '"item"', desc: 'Nome do item para leitor de tela: "card", "slide", "depoimento", "marca".' },
  { prop: 'className', tipo: 'string', padrao: '—', desc: 'Classes extras. Já vem com mt-8 (32px da trilha).' },
]

const HOOK_PROPS = [
  { prop: 'useCarousel(step?, initialCount?, { draggable? })', tipo: 'hook', padrao: 'draggable true', desc: 'step em px é opcional: sem ele as setas andam de posição em posição. initialCount = total de itens, para a navegação nascer renderizada no SSR. draggable: false desliga o clicar e arrastar com o mouse.' },
  { prop: 'scrollRef', tipo: 'ref', padrao: '—', desc: 'Vai no CarouselTrack. Os filhos diretos são os itens.' },
  { prop: 'count · activeIndex · canPrev · canNext', tipo: 'estado', padrao: '—', desc: 'Remedidos na rolagem, no resize da janela e quando trilha ou cards mudam de tamanho (ResizeObserver).' },
  { prop: 'scrollToIndex(i) · scrollByStep(±1)', tipo: 'função', padrao: '—', desc: 'Rolagem suave até a posição / uma posição para o lado.' },
  { prop: 'useCarouselAutoplay({ activeIndex, count, scrollToIndex, interval? })', tipo: 'hook', padrao: 'interval 5000', desc: 'Só depoimentos. Devolve rootRef + rootProps (vão no wrapper), playing e restart() para chamar no clique de ponto/seta.' },
  { prop: 'CarouselItem size', tipo: '"cards" | "logos" | "produtos"', padrao: '"cards"', desc: 'Cards por vez: cards 1·2·3, logos 2·3·4, produtos 1·2·4 (celular · sm · xl). index escalona a cascata.' },
]

const SPECS = [
  ['Pontos', '8×8 · gap 8 · ativo 28×8'],
  ['Setas', '48×48 · gap 16 · ícone 20 bold'],
  ['Seta hover', 'Amarelo · scale 1.08'],
  ['Trilha → nav', '32px'],
  ['Gap dos cards', '24px'],
  ['Autoplay', '5 s · pausa hover/foco'],
]

const CODE = `import {
  CarouselTrack, CarouselItem, CarouselNav, useCarousel,
} from 'vixlens-ds'

function LinhaFreevix({ itens }) {
  const c = useCarousel(undefined, itens.length)
  return (
    <div>
      <CarouselTrack ref={c.scrollRef} aria-label="Linha Freevix">
        {itens.map((item, i) => (
          <CarouselItem key={item.id} index={i} size="cards">
            <Card {...item} />
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
        tone="light"
        itemLabel="card"
      />
    </div>
  )
}`

const CODE_AUTOPLAY = `const c = useCarousel(undefined, depoimentos.length)
const auto = useCarouselAutoplay({
  activeIndex: c.activeIndex, count: c.count, scrollToIndex: c.scrollToIndex,
})
const nav = (fn) => (...a) => { auto.restart(); fn(...a) }

<div ref={auto.rootRef} {...auto.rootProps}>
  <CarouselTrack ref={c.scrollRef} aria-live={auto.playing ? 'off' : 'polite'}>…</CarouselTrack>
  <CarouselNav … onSelect={nav(c.scrollToIndex)} itemLabel="depoimento" />
</div>`

// Iframe com largura real (1280 / 375), reduzido para caber. Os breakpoints do
// Tailwind são de viewport: só num iframe o "celular" vira celular de verdade.
function DeviceFrame({ Icon, label, width, height, cena }) {
  const box = useRef(null)
  const [avail, setAvail] = useState(0)

  // Mede antes da pintura: sem isso o quadro nasce com a largura cheia (1280) e empurra
  // a página na horizontal até o ResizeObserver responder — e com a aba escondida ele não responde.
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return undefined
    const measure = () => {
      if (el.clientWidth > 0) setAvail(el.clientWidth)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Até medir, 0: o quadro fica vazio por um instante em vez de estourar a página.
  const scale = Math.min(1, avail / width)
  return (
    <figure className="min-w-0">
      <figcaption className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-gray-600">
        <Icon size={16} aria-hidden="true" />
        {label} · {width}px
      </figcaption>
      <div ref={box} className="w-full">
        <div
          className="overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm"
          style={{ width: width * scale, height: height * scale }}
        >
          <iframe
            key={cena}
            title={`Prévia do carrossel em ${label.toLowerCase()} (${width}px)`}
            src={`/?demo=carrossel&cena=${cena}`}
            loading="lazy"
            style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: '0 0' }}
          />
        </div>
      </div>
    </figure>
  )
}

function DevicePreview() {
  const [cena, setCena] = useState('cards')
  return (
    <div className="rounded-vix-card bg-vix-cinza-card p-4 md:p-6">
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Cena da prévia">
        {CENAS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cena === c.id}
            onClick={() => setCena(c.id)}
            className={`rounded-vix-button px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-vix-amarelo ${
              cena === c.id ? 'bg-vix-preto text-white' : 'bg-white text-vix-preto hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
        <DeviceFrame Icon={Desktop} label="Desktop" width={1280} height={560} cena={cena} />
        <DeviceFrame Icon={DeviceMobile} label="Mobile" width={375} height={640} cena={cena} />
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-gray-600">
        As duas prévias são interativas. Repare no número de pontos: com 6 cards são{' '}
        <b className="text-vix-preto">4 pontos no desktop</b> (3 visíveis) e{' '}
        <b className="text-vix-preto">6 no celular</b>. Em "Marcas", o celular passa de 6 posições e os pontos viram o
        contador <span className="font-mono">01 / 07</span>.
      </p>
    </div>
  )
}

export default function CarrosselSection() {
  return (
    <Section
      id="carrossel"
      eyebrow="12.5 — Componentes"
      title="Carrossel"
      desc="Trilha de cards com scroll-snap e a navegação padrão Vixlens: pontos à esquerda (ativo em pílula) e setas redondas à direita. Cards sempre inteiros, nunca cortados. É o mesmo componente do site institucional."
    >
      <SubTitle>Desktop × mobile</SubTitle>
      <div className="mb-14">
        <DevicePreview />
      </div>

      <SubTitle>Cards · fundo claro</SubTitle>
      <div className="mb-14">
        <CarrosselDemo cena="cards" />
      </div>

      <SubTitle>Fundo escuro · tone="dark"</SubTitle>
      <div className="mb-14">
        <CarrosselDemo cena="escuro" />
      </div>

      <SubTitle>Clicar e arrastar · desktop com mouse</SubTitle>
      <div className="mb-14">
        <CarrosselDemo cena="arrastar" />
      </div>

      <SubTitle>Depoimentos · autoplay com pausa</SubTitle>
      <div className="mb-14">
        <CarrosselDemo cena="depoimentos" />
      </div>

      <SubTitle>Especificação</SubTitle>
      <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-3">
        {SPECS.map(([k, v]) => (
          <div key={k} className="rounded-lg bg-vix-cinza-card px-3.5 py-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-600">{k}</div>
            <div className="mt-0.5 text-[13px] font-bold text-vix-preto">{v}</div>
          </div>
        ))}
      </div>

      <SubTitle>Comportamento</SubTitle>
      <ul className="mb-14 flex max-w-3xl flex-col gap-2.5 text-[14px] leading-relaxed text-gray-600">
        <li><b className="text-vix-preto">Pontos são posições, não itens.</b> Quando os últimos cards já cabem juntos na tela, contam como uma posição final. Por isso o número de pontos muda com a largura.</li>
        <li><b className="text-vix-preto">Setas</b> andam uma posição; <b className="text-vix-preto">pontos</b> levam direto à posição; o ponto ativo acompanha a rolagem por toque e trackpad.</li>
        <li><b className="text-vix-preto">1 posição ou menos:</b> a navegação não aparece.</li>
        <li><b className="text-vix-preto">Mais de 6 posições no celular:</b> abaixo de sm os pontos viram o contador <span className="font-mono">02 / 15</span>.</li>
        <li><b className="text-vix-preto">Autoplay</b> só em depoimentos: 5 s, volta ao início no fim, pausa com mouse em cima, foco dentro ou aba escondida, e não roda com movimento reduzido.</li>
        <li><b className="text-vix-preto">Desktop:</b> clique e arraste com o mouse para rolar; ao soltar, encaixa no card mais próximo. O arrasto começa depois de 5px (antes disso é clique) e, se houve arrasto, soltar em cima de um card não o abre. Toque e caneta seguem com a rolagem nativa. É um atalho a mais: setas, pontos e teclado não mudam.</li>
        <li><b className="text-vix-preto">Cards</b> entram em cascata quando a trilha aparece e sobem 6px no hover.</li>
      </ul>

      <SubTitle>Props · CarouselNav</SubTitle>
      <div className="mb-10">
        <PropsTable rows={NAV_PROPS} />
      </div>

      <SubTitle>Hooks &amp; trilha</SubTitle>
      <div className="mb-14">
        <PropsTable rows={HOOK_PROPS} />
      </div>

      <SubTitle>Quando usar</SubTitle>
      <div className="mb-14">
        <DosDonts
          dos={[
            'Lista horizontal com mais cards do que cabem na largura (linha de produtos, marcas, depoimentos).',
            'Sempre com a CarouselNav: pontos à esquerda, setas à direita.',
            'Autoplay só em depoimentos.',
          ]}
          donts={[
            'Carrossel com menos de 2 posições: use grade.',
            'Carrossel quando todos os cards cabem na tela: prefira grade.',
            'Card cortado na borda, barra de rolagem nativa ou autoplay em produto.',
          ]}
        />
      </div>

      <SubTitle>Acessibilidade</SubTitle>
      <ul className="mb-14 flex max-w-3xl flex-col gap-2.5 text-[14px] leading-relaxed text-gray-600">
        <li>Pontos num <span className="font-mono text-vix-preto">role="group"</span> com <span className="font-mono text-vix-preto">aria-label="Navegação do carrossel"</span>.</li>
        <li>Cada ponto é um <span className="font-mono text-vix-preto">&lt;button&gt;</span> com "Ir para {'{item}'} {'{n}'} de {'{total}'}" e <span className="font-mono text-vix-preto">aria-current</span> no ativo. Área de clique ampliada para perto de 44px.</li>
        <li>Setas "Anterior" / "Próximo" com <span className="font-mono text-vix-preto">disabled</span> de verdade nas pontas.</li>
        <li>Contador do celular com <span className="font-mono text-vix-preto">aria-live="polite"</span> e texto completo ("depoimento 2 de 5").</li>
        <li>Tudo por teclado, com anel de foco amarelo de 3px. Com autoplay, a trilha fica <span className="font-mono text-vix-preto">aria-live="off"</span> enquanto roda.</li>
      </ul>

      <SubTitle>Código</SubTitle>
      <CodeBlock code={CODE} className="mb-4" />
      <CodeBlock code={CODE_AUTOPLAY} />
    </Section>
  )
}
