import { useCallback, useEffect, useRef, useState } from 'react'
import { Section, SubTitle } from '../Section.jsx'
import { ArrowRight, CaretLeft, CaretRight, Eye } from '@phosphor-icons/react'
import { Button } from '../ui/button.jsx'
import { PropsTable, DosDonts } from './ComponentDocs.jsx'
import { CodeBlock } from '../Copy.jsx'

const CARD_ANATOMY = [
  { prop: 'Card', tipo: 'container', padrao: '—', desc: 'Raiz do card — radius 32, padding 32, fundo branco e sombra suave.' },
  { prop: 'CardHeader', tipo: 'slot', padrao: '—', desc: 'Topo do card — agrupa título e descrição com espaçamento próprio.' },
  { prop: 'CardTitle', tipo: 'slot', padrao: '—', desc: 'Título do card — curto e direto, um assunto por card.' },
  { prop: 'CardDescription', tipo: 'slot', padrao: '—', desc: 'Texto de apoio ao título, em tom secundário.' },
  { prop: 'CardContent', tipo: 'slot', padrao: '—', desc: 'Corpo do card — conteúdo principal (texto, imagem, campos).' },
  { prop: 'CardFooter', tipo: 'slot', padrao: '—', desc: 'Rodapé do card — reservado para ações (botões, links).' },
]

const FEATURES = [
  { t: 'Lentes avançadas', d: 'Free-Form, tratamentos premium e linha completa para todos os perfis.' },
  { t: 'Suporte especializado', d: 'Treinamentos técnicos, apoio comercial e consultoria personalizada.' },
  { t: 'Logística eficiente', d: 'Entrega rápida, operação estruturada e atendimento ágil.' },
]
const SPECS = [
  ['Background', '#FFFFFF sobre #F5F5F7'],
  ['Border-radius', '32 px'],
  ['Título', 'H5 Bold 24px · center'],
  ['Corpo', 'Regular 18px · lh 1.5'],
  ['Padding', '20px'],
  ['Ação', 'Chevron → canto inferior'],
]

export default function CardsSection() {
  return (
    <Section
      id="cards"
      eyebrow="12 — Componentes"
      title="Cards"
      desc="Três tipos de card, todos arredondados no estilo luma (radius 32px)."
    >
      {/* Card Feature — branco sobre BG cinza */}
      <SubTitle>Card Feature — branco sobre fundo cinza</SubTitle>
      <div className="mb-5 rounded-vix-card bg-vix-cinza-card p-6 md:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="flex min-h-[320px] flex-col rounded-vix-card bg-white p-6">
              <div className="mb-5 flex h-32 items-center justify-center rounded-[36px] bg-vix-cinza-card">
                <Eye size={32} weight="regular" className="text-gray-600" />
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                <div className="text-[22px] font-bold leading-tight text-vix-preto">{f.t}</div>
                <div className="text-sm leading-relaxed text-vix-cinza">{f.d}</div>
              </div>
              <div className="flex justify-end pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vix-preto">
                  <ArrowRight size={16} weight="bold" className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-3">
        {SPECS.map(([k, v]) => (
          <div key={k} className="rounded-lg bg-vix-cinza-card px-3.5 py-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-600">{k}</div>
            <div className="mt-0.5 text-[13px] font-bold text-vix-preto">{v}</div>
          </div>
        ))}
      </div>

      {/* Card Conteúdo — texto + imagem */}
      <SubTitle>Card Conteúdo — texto + imagem</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex min-h-[380px] flex-col justify-center gap-6 rounded-vix-card bg-vix-cinza-card p-10 md:p-12">
          <div className="text-3xl font-bold leading-[1.05] text-vix-preto md:text-[40px]">
            Sua ótica cresce.<br />Seus benefícios acompanham.
          </div>
          <p className="text-base leading-relaxed text-vix-preto/80">
            O VixClub transforma volume em vantagem comercial. À medida que sua ótica evolui, você
            acumula benefícios que fortalecem margem e previsibilidade.
          </p>
          <div>
            <Button variant="dark" className="gap-2">Entender o VixClub <ArrowRight size={16} weight="bold" /></Button>
          </div>
        </div>
        <div className="flex min-h-[380px] items-center justify-center rounded-vix-card bg-vix-preto">
          <Eye size={48} weight="regular" className="text-white/20" />
        </div>
      </div>

      {/* Card produto — claro + escuro (base shadcn) */}
      <SubTitle>Card produto — linha de marca</SubTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-vix-card border border-gray-200 bg-white p-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-vix-input bg-vix-amarelo">
            <Eye size={24} className="text-vix-preto" />
          </div>
          <div className="text-xl font-bold text-vix-preto">Tratamento AR Reflecta</div>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
            Reflexo residual mínimo. Cada cor representa um tipo de tratamento antirreflexo.
          </p>
        </div>
        <div className="rounded-vix-card bg-vix-preto p-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-vix-input bg-white/10">
            <Eye size={24} className="text-vix-amarelo" />
          </div>
          <div className="text-xl font-bold text-white">Linha de produto</div>
          <p className="mt-2 text-[15px] leading-relaxed text-white/60">
            Freevix, Reflecta, Vix Academy — card escuro com acento amarelo.
          </p>
        </div>
      </div>

      {/* Card Produto — carrossel de linha (radius shadcn) */}
      <SubTitle className="mt-14">Card Produto — carrossel de linha (Freevix)</SubTitle>
      <div className="mb-14 flex gap-4 overflow-x-auto pb-2">
        {CARROSSEL.map((p) => (
          <CarrosselCard key={p.n} p={p} />
        ))}
      </div>

      <SubTitle>Card Produto — carrossel com setas abaixo</SubTitle>
      <Carrossel nav="setas" />

      <SubTitle>Card Produto — carrossel com bolinhas</SubTitle>
      <Carrossel nav="bolinhas" />

      {/* Card Hero — linha de produto (foto + overlay, radius shadcn) */}
      <SubTitle>Card Hero — linha de produto (foto + overlay)</SubTitle>
      <div className="relative overflow-hidden rounded-2xl">
        <img src="/fotos/Frame 33-1.jpg" alt="Linha Freevix" className="h-[340px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8 md:p-12">
          <span className="w-fit rounded-vix-chip bg-vix-amarelo px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-vix-preto">Linha Freevix</span>
          <div className="max-w-md text-3xl font-bold leading-tight text-white md:text-4xl">Lentes para cada perfil de cliente.</div>
          <Button variant="dark" className="w-fit gap-2">Ver linha completa <ArrowRight size={16} weight="bold" /></Button>
        </div>
      </div>

      <SubTitle className="mt-14">Anatomia &amp; Props</SubTitle>
      <PropsTable rows={CARD_ANATOMY} />

      <SubTitle className="mt-12">Do &amp; Don't</SubTitle>
      <DosDonts
        dos={[
          'Um assunto por card.',
          'Título curto e direto.',
          'Concentrar as ações no footer.',
        ]}
        donts={[
          'Card dentro de card.',
          'Sombra pesada — a sombra é suave.',
          'Conteúdo espremido, sem o padding de 32.',
        ]}
      />

      <SubTitle className="mt-12">Código</SubTitle>
      <CodeBlock
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição curta.</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo do card</CardContent>
</Card>`}
      />
    </Section>
  )
}

function CarrosselCard({ p }) {
  return (
    <div className="flex w-[200px] shrink-0 snap-start flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-vix-cinza-card">
        <Eye size={28} className="text-gray-600" />
      </div>
      <div className="text-[15px] font-bold text-vix-preto">{p.n}</div>
      <div className="mt-0.5 text-xs text-vix-cinza">{p.t}</div>
      <div className="mt-3 flex justify-end">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vix-preto">
          <ArrowRight size={14} weight="bold" className="text-white" />
        </div>
      </div>
    </div>
  )
}

// Variante com navegação: nav="setas" (← → abaixo) ou nav="bolinhas" (um ponto por card)
function Carrossel({ nav }) {
  const trilho = useRef(null)
  const [ativo, setAtivo] = useState(0)
  const [pontas, setPontas] = useState({ inicio: true, fim: false })

  const atualizar = useCallback(() => {
    const el = trilho.current
    if (!el) return
    const passo = el.firstElementChild.offsetWidth + 16
    const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
    // no fim do trilho os últimos cards não chegam à esquerda — marca o último ponto
    setAtivo(fim ? CARROSSEL.length - 1 : Math.round(el.scrollLeft / passo))
    setPontas({ inicio: el.scrollLeft <= 2, fim })
  }, [])

  useEffect(() => {
    atualizar()
    window.addEventListener('resize', atualizar)
    return () => window.removeEventListener('resize', atualizar)
  }, [atualizar])

  const irPara = (i) => {
    const el = trilho.current
    el.scrollTo({ left: el.children[i].offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }
  const mover = (dir) => {
    const el = trilho.current
    el.scrollBy({ left: dir * (el.firstElementChild.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <div className="mb-14">
      <div
        ref={trilho}
        onScroll={atualizar}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CARROSSEL.map((p) => (
          <CarrosselCard key={p.n} p={p} />
        ))}
      </div>

      {nav === 'setas' ? (
        <div className="mt-4 flex justify-end gap-2">
          {[
            [-1, CaretLeft, 'Anterior', pontas.inicio],
            [1, CaretRight, 'Próximo', pontas.fim],
          ].map(([dir, Icon, label, off]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={off}
              onClick={() => mover(dir)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-vix-preto transition-colors hover:border-vix-preto disabled:cursor-default disabled:opacity-30 disabled:hover:border-gray-200"
            >
              <Icon size={16} weight="bold" />
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex justify-center gap-1.5">
          {CARROSSEL.map((p, i) => (
            <button
              key={p.n}
              type="button"
              aria-label={`Ir para ${p.n}`}
              aria-current={i === ativo}
              onClick={() => irPara(i)}
              className={`h-2 rounded-full transition-all ${i === ativo ? 'w-6 bg-vix-amarelo' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const CARROSSEL = [
  { n: 'Freevix ONE', t: 'Multifocal · entrada' },
  { n: 'Freevix PREMIUM', t: 'Multifocal' },
  { n: 'Freevix FREEDOM', t: 'Multifocal' },
  { n: 'Freevix IA TECH', t: 'Multifocal · IA' },
  { n: 'Freevix VS HD', t: 'Visão simples · HD' },
  { n: 'Astera', t: 'Controle de miopia' },
]
