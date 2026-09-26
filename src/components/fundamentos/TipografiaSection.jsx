import { Check, Desktop, DeviceMobile, DeviceTablet } from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'
import { CodeBlock, CopyValue } from '../Copy.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.jsx'
import tokens from '../../data/tokens.js'

// 'comment' no JSON documenta os breakpoints; não é nível da escala.
const LEVELS = Object.entries(tokens.typography.scale).filter(([k]) => k !== 'comment')
const DEVICES = [
  { key: 'desktop', label: 'Desktop', faixa: 'xl · a partir de 1280 px', Icon: Desktop },
  { key: 'tablet', label: 'Tablet', faixa: 'lg · 1024 a 1279 px', Icon: DeviceTablet },
  { key: 'mobile', label: 'Mobile', faixa: 'base · abaixo de 1024 px', Icon: DeviceMobile },
]
const META = {
  h1: { name: 'H1 · Display', tracking: '-0.02em' },
  h2: { name: 'H2 · Display', tracking: '-0.02em' },
  h3: { name: 'H3 · Display', tracking: '-0.02em' },
  h4: { name: 'H4 · Seção', tracking: '-0.01em' },
  h5: { name: 'H5 · Seção', tracking: '-0.01em' },
  h6: { name: 'H6 · Seção', tracking: '0' },
  paragraph: { name: 'Parágrafo', tracking: '0' },
  bold: { name: 'Corpo bold', tracking: '0' },
  label: { name: 'Label', tracking: '0.02em' },
  caption: { name: 'Caption', tracking: '0' },
  overline: { name: 'Overline', tracking: '0.08em' },
}
const px = (v) => parseInt(v, 10)
const lhNum = (v) => (v ? px(v) / 100 : 1.15)

// Texto de amostra por nível: título curto nos headings, frase inteira no corpo.
const AMOSTRA = {
  h1: 'Lentes para cada perfil',
  h2: 'Sua ótica cresce',
  h3: 'Tecnologia Freevix',
  h4: 'Tratamento Reflecta',
  h5: 'Entrega rápida e rastreada',
  h6: 'Suporte especializado',
  paragraph: 'Material, índice e desenho da lente espelhados automaticamente, sem renegociação.',
  bold: 'Cada pedido monitorado do laboratório até a ótica.',
  label: 'Número de cliente',
  caption: 'Atualizado em 25/09/2026',
  overline: 'Laboratório óptico',
}

// Escala inteira de um aparelho, no tamanho real. Mobile vai numa moldura de 375px
// para os títulos quebrarem linha como no celular.
function EscalaDoAparelho({ device }) {
  const mobile = device === 'mobile'
  const linhas = LEVELS.map(([key, s]) => {
    const size = s[device]
    const tk = META[key].tracking
    return (
      <div
        key={key}
        className={`flex flex-col gap-2 border-b border-gray-100 py-5 last:border-b-0 ${mobile ? '' : 'sm:flex-row sm:items-baseline sm:gap-6'}`}
      >
        <div className={`shrink-0 ${mobile ? '' : 'sm:w-44'}`}>
          <div className="text-[13px] font-bold text-vix-preto">{META[key].name}</div>
          <div className="mt-0.5 font-mono text-[12px] font-bold text-vix-azul">{size}</div>
          <div className="mt-0.5 font-mono text-[11px] text-gray-600">
            {s.weight} · lh {s.lineHeight || 'auto'} · {tk}
          </div>
          <div className="mt-1 font-mono text-[10px] text-gray-600">
            {DEVICES.map((d, i) => (
              <span key={d.key} className={d.key === device ? 'font-bold text-vix-preto' : ''}>
                {i > 0 && ' → '}
                {px(s[d.key])}
              </span>
            ))}
          </div>
        </div>
        <div
          className={`min-w-0 wrap-break-word text-vix-preto ${key === 'overline' ? 'uppercase' : ''}`}
          style={{ fontSize: size, fontWeight: s.weight, lineHeight: lhNum(s.lineHeight), letterSpacing: tk }}
        >
          {AMOSTRA[key]}
        </div>
      </div>
    )
  })

  if (!mobile) return <div className="rounded-vix-card border border-gray-200 px-5 md:px-8">{linhas}</div>
  return (
    <div className="rounded-vix-card bg-vix-cinza-card p-4 md:p-8">
      <div className="mx-auto w-full max-w-[375px] rounded-[28px] border border-gray-200 bg-white px-4 shadow-xs">
        {linhas}
      </div>
    </div>
  )
}

export default function TipografiaSection() {
  return (
    <Section
      id="tipografia"
      eyebrow="04 — Fundamentos"
      title="Tipografia"
      desc="Host Grotesk em todos os elementos digitais. Montserrat/Mont é reservada para impressos. Nunca itálico, nunca caixa alta em parágrafo, no máximo dois pesos por bloco."
    >
      {/* Baixar as fontes */}
      <SubTitle>Baixar as fontes</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Host Grotesk */}
        <div className="rounded-vix-card bg-vix-preto p-8">
          <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/65">Web · Digital</div>
          <div className="mt-2 text-5xl font-bold leading-none text-white" style={{ fontFamily: "'Host Grotesk', sans-serif" }}>Host Grotesk</div>
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-vix-amarelo">Site · Plataformas · UI</div>
          <p className="mt-4 text-xs leading-relaxed text-white/65">Disponível via Google Fonts. Pesos 300 · 400 · 500 · 600 · 700 · 800.</p>
          <div className="mt-5 flex flex-col gap-1.5">
            {[['Regular', 400], ['SemiBold', 600], ['Bold', 700], ['ExtraBold', 800]].map(([n, w]) => (
              <div key={n} className="flex items-center border-b border-white/5 py-1.5 last:border-0">
                <span className="w-24 shrink-0 text-xs text-white/65">{n}</span>
                <span className="flex-1 text-right text-white" style={{ fontWeight: w, color: w === 800 ? '#FAC617' : '#fff' }}>Aa Bb Cc</span>
                <span className="w-8 shrink-0 text-right text-[10px] text-white/60">{w}</span>
              </div>
            ))}
          </div>
          <a href="https://fonts.google.com/specimen/Host+Grotesk" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-vix-button bg-vix-amarelo px-5 py-2.5 text-sm font-bold text-vix-preto transition-colors hover:bg-vix-amarelo-hover">
            Abrir no Google Fonts
          </a>
        </div>
        {/* Mont */}
        <div className="rounded-vix-card border border-gray-200 bg-white p-8">
          <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">Print · Documentos</div>
          <div className="mt-2 text-5xl font-black leading-none tracking-[0.04em] text-vix-preto">Mont</div>
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-vix-cinza">Propostas · Manuais · PDFs</div>
          <p className="mt-4 text-xs leading-relaxed text-gray-600">Licença comercial requerida. Substituta web: Montserrat (Google Fonts).</p>
          <div className="mt-5 flex flex-col gap-1.5">
            {[['Light', 300], ['Regular', 400], ['SemiBold', 600], ['Black', 900]].map(([n, w]) => (
              <div key={n} className="flex items-center border-b border-gray-100 py-1.5 text-vix-preto last:border-0">
                <span className="w-24 shrink-0 text-xs text-gray-600">{n}</span>
                <span className="flex-1 text-right" style={{ fontWeight: w }}>Aa Bb Cc</span>
                <span className="w-8 shrink-0 text-right text-[10px] text-gray-600">{w}</span>
              </div>
            ))}
          </div>
          <a href="/assets/fontes/mont/vixlens-mont.zip" download className="mt-6 inline-flex items-center gap-2 rounded-vix-button bg-vix-preto px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#333333]">
            Baixar Mont (.zip)
          </a>
        </div>
      </div>

      {/* Exemplo de texto — a tipografia em ação */}
      <SubTitle>Exemplo em uso</SubTitle>
      <div className="mb-14 rounded-vix-card border border-gray-200 bg-white p-8 md:p-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-vix-azul">Laboratório óptico</div>
        <h3 className="mt-3 text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-vix-preto md:text-6xl md:leading-none">
          Sua ótica cresce com a Matriz Marca Própria.
        </h3>
        <p className="mt-5 max-w-2xl text-lg leading-normal text-gray-600">
          Material, índice e desenho da lente espelhados automaticamente. O consultor abre, confere e
          envia — sem renegociação, sem aditivo. A tipografia carrega a autoridade técnica sem gritar.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">Escala</div>
            <div className="mt-1 text-2xl font-medium text-vix-preto">Centenas de jobs por dia</div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">Rastreio</div>
            <div className="mt-1 text-2xl font-medium text-vix-preto">Cada um monitorado</div>
          </div>
        </div>
      </div>

      {/* Escala completa — equivalência desktop ↔ tablet ↔ mobile */}
      <SubTitle>Escala (Host Grotesk) — desktop ↔ tablet ↔ mobile</SubTitle>
      <p className="-mt-2 mb-5 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Cada nível tem três tamanhos (H1 cai de{' '}
        <b className="text-vix-preto">
          {DEVICES.map((d) => tokens.typography.scale.h1[d.key].replace('px', ' px')).join(' → ')}
        </b>
        ).
        Troque de aba para ver a escala inteira de cada aparelho no tamanho real, com o line-height e o tracking
        exatos. No mobile, a moldura tem a largura de um celular (375&nbsp;px).
      </p>
      <Tabs defaultValue="desktop">
        <TabsList className="h-auto flex-wrap bg-vix-cinza-card">
          {DEVICES.map((d) => (
            <TabsTrigger
              key={d.key}
              value={d.key}
              className="gap-2 px-4 py-2 text-[13px] font-semibold focus-visible:ring-vix-amarelo"
            >
              <d.Icon size={16} aria-hidden="true" />
              {d.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {DEVICES.map((d) => (
          <TabsContent key={d.key} value={d.key} className="mt-5">
            <p className="mb-4 flex items-center gap-2 text-[13px] text-gray-600">
              <d.Icon size={16} className="shrink-0 text-vix-preto" aria-hidden="true" />
              <span>
                <b className="text-vix-preto">{d.label}</b> · <span className="font-mono">{d.faixa}</span> · amostras em
                tamanho real
              </span>
            </p>
            <EscalaDoAparelho device={d.key} />
          </TabsContent>
        ))}
      </Tabs>

      <SubTitle className="mt-10">Como aplicar</SubTitle>
      <p className="-mt-2 mb-4 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Cada nível vira três classes: <span className="font-mono text-vix-azul">text-vix-h1-m</span> (mobile),{' '}
        <span className="font-mono text-vix-azul">text-vix-h1-t</span> (tablet) e{' '}
        <span className="font-mono text-vix-azul">text-vix-h1</span> (desktop). Comece pelo mobile e suba com os prefixos
        do Tailwind. Em CSS puro: <span className="font-mono text-vix-azul">--vix-font-h1-mobile</span>,{' '}
        <span className="font-mono text-vix-azul">-tablet</span> e <span className="font-mono text-vix-azul">--vix-font-h1</span>.
      </p>
      <CodeBlock
        className="mb-14"
        code={`<h1 className="text-vix-h1-m lg:text-vix-h1-t xl:text-vix-h1">…</h1>
<h2 className="text-vix-h2-m lg:text-vix-h2-t xl:text-vix-h2">…</h2>
<h3 className="text-vix-h3-m lg:text-vix-h3-t xl:text-vix-h3">…</h3>`}
      />

      {/* Escala utilitária Tailwind/shadcn — ligada ao token */}
      <SubTitle className="mt-14">Escala utilitária (Tailwind / shadcn)</SubTitle>
      <p className="-mt-2 mb-5 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        As classes utilitárias que o shadcn usa na UI. <b className="text-vix-preto">text-xs / text-sm / text-base
        saem do token</b> (caption 12 · label 14 · parágrafo 16) — mudar o token muda as utilities. O shadcn não
        tem escala própria: usa essas classes do Tailwind direto no componente.
      </p>
      <div className="mb-14 overflow-x-auto rounded-vix-input border border-gray-200">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600">
              <th className="px-5 py-3 font-bold">Utility</th>
              <th className="px-5 py-3 font-bold">px</th>
              <th className="px-5 py-3 font-bold">Onde o shadcn usa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['text-xs', '12', 'Badges, captions, hints', false],
              ['text-sm', '14', 'Botão, input, select, label, tabela, dropdown — a maioria da UI', true],
              ['text-base', '16', 'Texto de conteúdo', false],
              ['text-lg +', '18 +', 'Títulos (mas o shadcn quase não estiliza heading — deixa pro app)', false],
            ].map(([u, px, uso, hi]) => (
              <tr key={u} className={hi ? 'bg-vix-amarelo-light/40' : ''}>
                <td className="px-5 py-3.5">
                  <CopyValue value={u} className="text-[12px] text-vix-azul">{u}</CopyValue>
                </td>
                <td className="px-5 py-3.5 font-mono text-[13px] font-bold text-vix-preto">{px}</td>
                <td className={`px-5 py-3.5 ${hi ? 'font-semibold text-vix-preto' : 'text-gray-600'}`}>{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Escala print — Mont (amostras renderizadas no tamanho real) */}
      <SubTitle className="mt-14">Escala print — Mont (propostas, manuais, documentos)</SubTitle>
      <div className="mb-14 flex flex-col gap-3">
        {[
          ['Título capa', 48, 900, 'Black', 'Capas de proposta'],
          ['Título de seção', 24, 700, 'Bold', 'Abertura de blocos'],
          ['Subtítulo', 18, 600, 'SemiBold', 'Destaques dentro da seção'],
          ['Corpo', 11, 400, 'Regular', 'Texto corrido, lh 1.5'],
          ['Dados / números', 11, 600, 'SemiBold', 'Tabelas e valores'],
          ['Legenda', 9, 400, 'Regular', 'Notas, rodapés'],
        ].map(([n, pt, w, wName, u]) => (
          <div key={n} className="flex flex-col gap-3 rounded-vix-input border border-gray-200 p-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="w-40 shrink-0">
              <div className="text-[13px] font-bold text-vix-preto">{n}</div>
              <div className="mt-0.5 font-mono text-[11px] text-vix-azul">{pt} pt · {wName}</div>
              <div className="mt-0.5 text-[11px] text-gray-600">{u}</div>
            </div>
            <div
              className="min-w-0 flex-1 truncate text-vix-preto"
              style={{ fontFamily: "'Montserrat', 'Host Grotesk', sans-serif", fontSize: pt, fontWeight: w, lineHeight: 1.15 }}
            >
              Vixlens
            </div>
          </div>
        ))}
      </div>

      {/* Regras de uso */}
      <SubTitle>Regras de uso</SubTitle>
      <div className="flex flex-col gap-2.5">
        {[
          'Nunca itálico, em nenhum elemento.',
          'Nunca caixa alta em parágrafo corrido — só em logo, tagline e labels de callout.',
          'No máximo dois pesos no mesmo bloco de texto.',
          'Underline reservado a links — nunca como ênfase.',
          'Peso Heavy/900 só em logo e display de impressos — nunca na web.',
          'Host Grotesk no digital, Mont/Montserrat só em impressos.',
        ].map((r) => (
          <div key={r} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3.5">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vix-amarelo text-vix-preto">
              <Check size={12} weight="bold" />
            </div>
            <span className="text-[13px] leading-relaxed text-gray-600">{r}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
