import { CheckCircle, XCircle, WarningCircle } from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'
import { DosDonts } from '../componentes/ComponentDocs.jsx'
import tokens from '../../data/tokens.js'

// WCAG 2.1 — cálculo real de contraste (ratios computados, não chutados).
const srgb = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (hex) => { const h = hex.replace('#', ''); const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16); return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b) }
const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); const hi = Math.max(L1, L2), lo = Math.min(L1, L2); return (hi + 0.05) / (lo + 0.05) }

// Thresholds WCAG
const TH = { aa: 4.5, aaBig: 3.0, aaa: 7.0, ui: 3.0 }

const c = tokens.color
// Paleta real, lida do token
const PRETO = c.preto.value          // #1D1D1F
const BRANCO = c.branco.value        // #FFFFFF
const AMARELO = c.amarelo.value      // #FAC617
const AZUL = c.azul.value            // #0439D9
// --muted-foreground = hsl(293 8% 45%) → #7A6A7C (não existe hex no JSON de tokens)
const MUTED = '#7A6A7C'
const CINZA_CARD = c['cinza-card'].value   // #F5F5F7
const GRAY_500 = c.gray['500'].value       // #6B7280
const GRAY_600 = c.gray['600'].value       // #4B5563
const co = c.callout

const mk = (fg, bg, extra) => ({ fg, bg, r: ratio(fg, bg), ...extra })

function StatusBadge({ label, threshold, pass }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-vix-chip border px-2 py-1 text-[11px] font-medium ${
        pass ? 'border-[#00782D]/25 bg-[#EDFBF4] text-[#00782D]' : 'border-[#FF6566]/35 bg-[#FFF0F0] text-[#B91C1C]'
      }`}
    >
      {pass ? <CheckCircle weight="fill" className="h-3.5 w-3.5" /> : <XCircle weight="fill" className="h-3.5 w-3.5" />}
      {label}
      {/* sem opacity: ela compoe a cor com o fundo e derruba o contraste do badge */}
      <span className="font-mono text-[10px]">&ge;{threshold.toFixed(1)}</span>
    </span>
  )
}

function PairCard({ pair }) {
  const { fg, bg, r, name, use, anti } = pair
  const passAA = r >= TH.aa
  return (
    <div className="overflow-hidden rounded-vix-card border border-gray-200 bg-white">
      {/* Amostra visual — texto real na cor sobre o fundo */}
      <div
        className="flex h-28 flex-col justify-center gap-1 border-b border-gray-100 px-5"
        style={{ background: bg }}
      >
        <span className="text-xl font-bold leading-none" style={{ color: fg }}>Aa Vixlens</span>
        <span className="text-[13px] leading-snug" style={{ color: fg }}>Texto de exemplo em 16px</span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-vix-preto">
              {anti && <WarningCircle weight="fill" className="h-4 w-4 text-vix-amarelo" />}
              {name}
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{use}</div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-xl font-bold ${passAA ? 'text-vix-preto' : 'text-red-600'}`}>{r.toFixed(2)}:1</div>
            <div className="font-mono text-[11px] uppercase text-gray-600">{fg} / {bg}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge label="AA" threshold={TH.aa} pass={r >= TH.aa} />
          <StatusBadge label="AA Grande" threshold={TH.aaBig} pass={r >= TH.aaBig} />
          <StatusBadge label="AAA" threshold={TH.aaa} pass={r >= TH.aaa} />
        </div>
      </div>
    </div>
  )
}

export default function AcessibilidadeSection() {
  const textPairs = [
    mk(PRETO, BRANCO, { name: 'Preto sobre Branco', use: 'Texto de corpo padrão' }),
    mk(BRANCO, PRETO, { name: 'Branco sobre Preto', use: 'Texto em fundo escuro' }),
    mk(PRETO, AMARELO, { name: 'Preto sobre Amarelo', use: 'Texto de botão CTA' }),
    mk(BRANCO, AZUL, { name: 'Branco sobre Azul', use: 'Botão azul' }),
    mk(AZUL, BRANCO, { name: 'Azul sobre Branco', use: 'Links' }),
    mk(AMARELO, BRANCO, { name: 'Amarelo sobre Branco', use: 'Anti-exemplo — não usar amarelo como texto sobre branco', anti: true }),
    mk(MUTED, BRANCO, { name: 'Cinza texto (muted) sobre Branco', use: 'Texto secundário — token --muted-foreground' }),
    mk(GRAY_600, CINZA_CARD, { name: 'Gray 600 sobre BG Cinza', use: 'Texto secundário dentro de card — o par correto' }),
    mk(GRAY_500, CINZA_CARD, { name: 'Gray 500 sobre BG Cinza', use: 'Anti-exemplo — dois tokens do DS que juntos reprovam em AA', anti: true }),
  ]

  const calloutPairs = [
    mk(PRETO, co.highlight.bg, { name: 'Preto sobre Destaque', use: `Callout highlight · ${co.highlight.bg}` }),
    mk(PRETO, co.informative.bg, { name: 'Preto sobre Informativo', use: `Callout informative · ${co.informative.bg}` }),
    mk(PRETO, co.critical.bg, { name: 'Preto sobre Crítico', use: `Callout critical · ${co.critical.bg}` }),
    mk(PRETO, co.success.bg, { name: 'Preto sobre Sucesso', use: `Callout success · ${co.success.bg}` }),
  ]

  const allPairs = [...textPairs, ...calloutPairs]
  const total = allPairs.length
  const aaPass = allPairs.filter((p) => p.r >= TH.aa).length
  const allAA = aaPass === total
  const realPairs = allPairs.filter((p) => !p.anti)
  const realAllAA = realPairs.every((p) => p.r >= TH.aa)
  const antiPairs = allPairs.filter((p) => p.anti)
  const antiPair = antiPairs[0]
  const antiGray = allPairs.find((p) => p.fg === GRAY_500)

  const doList = [
    'Preto sobre amarelo em todo CTA e faixa — 10.54:1, folgado no AAA.',
    'Amarelo apenas como fundo ou destaque, nunca como texto.',
    'Azul de acento com moderação; branco sobre azul passa AAA em botão.',
    'Corpo mínimo de 16px; nunca abaixo de 12px.',
    'Dentro de card cinza, subir um degrau da rampa: Gray 600 no lugar de Gray 500.',
    'Foco sempre visível — outline com contraste de UI ≥ 3.0 contra o fundo.',
  ]
  const dontList = [
    `Amarelo como texto sobre branco — ${antiPair.r.toFixed(2)}:1, ilegível.`,
    'Inverter o par preto/amarelo — texto amarelo sobre preto perde contraste de leitura.',
    `Gray 500 como texto sobre BG Cinza #F5F5F7 — ${antiGray.r.toFixed(2)}:1, reprova por pouco. Use Gray 600 nesse fundo.`,
    'Cinza claro de texto sobre fundos coloridos ou tints de callout.',
    'Remover o outline de foco de qualquer elemento interativo.',
    'Reduzir corpo abaixo do tamanho legível para caber mais conteúdo.',
  ]

  return (
    <Section
      id="acessibilidade"
      eyebrow="10 — Fundamentos"
      title="Acessibilidade"
      desc="Contraste de cor conforme WCAG 2.1. Todo par texto/fundo da marca testado — mira AA no mínimo."
    >
      {/* Resumo — selo + contagem honesta, computada de verdade */}
      <div className="mb-14 grid gap-7 rounded-vix-card border border-gray-200 bg-vix-cinza-card p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-9">
        <div className="flex flex-col items-start gap-3">
          <span className="inline-flex items-center gap-2 rounded-vix-chip bg-vix-preto px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
            {allAA ? (
              <CheckCircle weight="fill" className="h-5 w-5 text-[#30D389]" />
            ) : (
              <WarningCircle weight="fill" className="h-5 w-5 text-vix-amarelo" />
            )}
            WCAG 2.1 AA
          </span>
          <div className="font-mono text-5xl font-bold text-vix-preto">
            {aaPass}
            <span className="text-2xl text-gray-600">/{total}</span>
          </div>
          <div className="text-[13px] text-muted-foreground">pares aprovados em AA</div>
        </div>
        <p className="text-sm leading-relaxed text-vix-preto">
          {allAA ? (
            <>Todos os {total} pares testados passam no nível AA. A maioria alcança AAA.</>
          ) : (
            <>
              {aaPass} de {total} pares testados passam no nível AA. O único que falha — amarelo sobre branco (
              {antiPair.r.toFixed(2)}:1) — é um anti-exemplo proposital: <b className="text-vix-preto">amarelo nunca é texto sobre branco</b>.
              {realAllAA ? (
                <> Excluindo esse caso, <b className="text-vix-preto">todos os pares reais da marca passam AA</b>, e a maioria alcança AAA.</>
              ) : null}
            </>
          )}
        </p>
      </div>

      <SubTitle>Pares de texto testados</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {textPairs.map((p) => <PairCard key={p.name} pair={p} />)}
      </div>

      <SubTitle>Callouts — texto preto sobre fundo tint</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
        {calloutPairs.map((p) => <PairCard key={p.name} pair={p} />)}
      </div>

      <SubTitle>Regras</SubTitle>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
        <div className="rounded-vix-card border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#00782D]">
            <CheckCircle weight="fill" className="h-5 w-5" />
            Faça
          </div>
          <ul className="space-y-3">
            {doList.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-vix-preto">
                <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-[#00782D]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-vix-card border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-red-600">
            <XCircle weight="fill" className="h-5 w-5" />
            Evite
          </div>
          <ul className="space-y-3">
            {dontList.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-vix-preto">
                <XCircle weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
        Referência de contraste de UI (bordas, ícones, foco): mínimo 3.0:1 contra o fundo adjacente. Texto grande = a partir de 18px, ou
        14px em negrito. Ratios acima computados em tempo real a partir dos tokens da marca.
      </p>

      {/* ─────────────────────────────────────────────────────────────
          Acessibilidade além do contraste — foco, teclado, movimento, cor
         ───────────────────────────────────────────────────────────── */}

      <SubTitle className="mt-12">Foco visível</SubTitle>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-vix-preto">
        Todo elemento interativo mostra um anel de foco quando alcançado por teclado. O DS aplica{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[12px] text-vix-azul">focus-visible:ring-[3px] focus-visible:ring-ring/30</code>{' '}
        em botões, inputs e controles. Nunca remova o <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[12px] text-vix-azul">outline</code> sem
        colocar um substituto visível — foco invisível deixa quem navega por teclado sem saber onde está.
      </p>
      <div className="mb-4 rounded-vix-card border border-gray-200 bg-white p-8">
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            className="rounded-vix-button bg-vix-preto px-5 py-2.5 text-sm font-semibold text-white ring-[3px] ring-ring/30"
          >
            Botão com foco
          </button>
          <input
            readOnly
            value="Campo com foco"
            aria-label="Exemplo de campo com anel de foco"
            className="rounded-vix-input border border-vix-preto bg-white px-4 py-2.5 text-sm text-vix-preto outline-hidden ring-[3px] ring-ring/30"
          />
          <span className="font-mono text-[11px] text-gray-600">ring-[3px] · ring-ring/30</span>
        </div>
      </div>

      <SubTitle className="mt-12">Navegação por teclado</SubTitle>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-vix-preto">
        A interface inteira funciona sem mouse. Percorra com Tab e confirme cada item:
      </p>
      <ul className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {[
          'Tudo alcançável por Tab, na mesma ordem em que aparece na tela.',
          'Enter e Espaço ativam botões e controles.',
          'Esc fecha modais, sheets e overlays abertos.',
          'O foco fica preso dentro de modais enquanto estão abertos.',
          'Sem armadilha de foco — nada prende o Tab fora de um overlay.',
          'Setas navegam dentro de grupos (radio, tabs, select).',
        ].map((t) => (
          <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-vix-preto">
            <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-[#00782D]" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <SubTitle className="mt-12">Movimento reduzido</SubTitle>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-vix-preto">
        Quem ativa <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[12px] text-vix-azul">prefers-reduced-motion</code> no sistema pediu
        menos movimento — respeite. Mantenha só transições essenciais (foco, abrir/fechar) e corte parallax, autoplay e deslocamentos grandes de tela.
      </p>
      <div className="mb-4 overflow-x-auto rounded-vix-input border border-gray-200 bg-gray-50 p-5">
        <pre className="font-mono text-[12px] leading-relaxed text-vix-preto">
          <code>{`@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// Tailwind: use a variante motion-reduce
<div className="transition-transform motion-reduce:transition-none" />`}</code>
        </pre>
      </div>

      <SubTitle className="mt-12">Além da cor (daltonismo)</SubTitle>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-vix-preto">
        Cor nunca é o único sinal. Se a diferença entre &ldquo;deu certo&rdquo; e &ldquo;deu erro&rdquo; for só verde vs. vermelho, quem tem daltonismo
        não distingue. Todo estado carrega <b className="text-vix-preto">ícone + cor + texto</b>. Os callouts do DS já seguem isso: cada um leva um ícone
        próprio além da cor de fundo.
      </p>
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-vix-input border border-[#00782D]/25 bg-[#EDFBF4] px-4 py-3 text-[13px] text-[#00782D]">
          <CheckCircle weight="fill" className="h-4 w-4 shrink-0" />
          <span>Cadastro salvo com sucesso.</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-vix-input border border-[#FF6566]/35 bg-[#FFF0F0] px-4 py-3 text-[13px] text-[#B91C1C]">
          <XCircle weight="fill" className="h-4 w-4 shrink-0" />
          <span>Não foi possível salvar. Verifique os campos destacados.</span>
        </div>
      </div>
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-vix-preto">
        Alvo de toque mínimo de <b className="text-vix-preto">44×44px</b> em qualquer controle clicável — dedos não miram como cursores. Botões,
        ícones-botão e links de ação respeitam esse mínimo.
      </p>

      <DosDonts
        dos={[
          'Anel de foco visível em todo elemento interativo (focus-visible:ring).',
          'Ícone + cor + texto em cada estado de erro, sucesso e alerta.',
          'Respeitar prefers-reduced-motion: só movimento essencial.',
          'Alvo de toque mínimo de 44×44px em controles clicáveis.',
        ]}
        donts={[
          'outline:none sem substituto — foco invisível ao teclado.',
          'Comunicar status só por cor (verde/vermelho), sem ícone nem texto.',
          'Autoplay, parallax ou movimento grande para quem pediu reduzir.',
          'Áreas de clique menores que 44px espremidas lado a lado.',
        ]}
      />
    </Section>
  )
}
