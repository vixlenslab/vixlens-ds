import { Section, SubTitle } from '../Section.jsx'
import { Sparkle, Wrench, Plus, ArrowUp } from '@phosphor-icons/react'

// Tipos de mudança — ícone + cor por categoria (Novo / Melhoria / Correção).
const TIPOS = {
  novo: {
    label: 'Novo',
    Icon: Plus,
    pill: 'bg-vix-amarelo text-vix-preto',
    dot: 'text-vix-preto',
  },
  melhoria: {
    label: 'Melhoria',
    Icon: ArrowUp,
    pill: 'bg-vix-azul/10 text-vix-azul',
    dot: 'text-vix-azul',
  },
  correcao: {
    label: 'Correção',
    Icon: Wrench,
    pill: 'bg-vix-cinza-card text-gray-600',
    dot: 'text-gray-600',
  },
}

const ORDEM = ['novo', 'melhoria', 'correcao']

// Timeline — mais recente em cima. Dados reais do DS.
const VERSOES = [
  {
    versao: 'v0.12.1',
    data: '26/09/2026',
    atual: true,
    mudancas: [
      ['correcao', 'Cor vix-cinza (#606F7F) volta a existir: placeholder do Input, texto de apoio dos cards e legenda da Tipografia estavam sem cor desde a consolidação do preset'],
    ],
  },
  {
    versao: 'v0.12.0',
    data: '26/09/2026',
    mudancas: [
      ['novo', 'Carrossel: clicar e arrastar com o mouse no desktop. Ao soltar, encaixa no card mais próximo; arrastar não abre o card; toque segue nativo'],
      ['novo', 'useCarousel aceita { draggable: false } para desligar o arrasto'],
    ],
  },
  {
    versao: 'v0.11.4',
    data: '25/09/2026',
    mudancas: [
      ['melhoria', 'Tipografia: escala do mobile menor. H1 40 → 32, H2 32 → 28, H3 28 → 24, H4 24 → 20, H5 20 → 18 (H6 continua 16)'],
      ['melhoria', 'Skills vixlens-ui-architect e vixlens-design-system com a escala mobile nova'],
      ['novo', 'Materiais: tabela promocional do mês (PromoVix setembro 2026) em PDF, com abrir e baixar'],
    ],
  },
  {
    versao: 'v0.11.3',
    data: '25/09/2026',
    mudancas: [
      ['melhoria', 'Tipografia: escala em abas Desktop, Tablet e Mobile, com a escala inteira de cada aparelho em tamanho real (mobile numa moldura de 375px)'],
    ],
  },
  {
    versao: 'v0.11.2',
    data: '25/09/2026',
    mudancas: [
      ['melhoria', 'Tipografia: escala Host Grotesk com três tamanhos, desktop (xl) ↔ tablet (lg) ↔ mobile, com os valores do site institucional'],
      ['novo', 'Tokens: tamanho de tablet em cada nível (--vix-font-<nível>-tablet e text-vix-<nível>-t, Tailwind 3 e 4)'],
      ['melhoria', 'Skills vixlens-ui-architect e vixlens-design-system com a coluna Tablet na escala'],
      ['correcao', 'Carrossel: a prévia desktop × mobile mede antes de pintar e não empurra mais a página na horizontal'],
    ],
  },
  {
    versao: 'v0.11.1',
    data: '25/09/2026',
    mudancas: [
      ['correcao', 'Carrossel: não conta uma posição a mais quando é medido escondido (largura zero, ex.: aba ou painel fechado)'],
    ],
  },
  {
    versao: 'v0.11.0',
    data: '25/09/2026',
    mudancas: [
      ['novo', 'Componente Carrossel: trilha com scroll-snap, cards sempre inteiros (1 · 2 · 3 por vez) e navegação padrão com pontos à esquerda e setas à direita, em fundo claro e escuro'],
      ['novo', 'Carrossel: contador 02 / 15 no celular acima de 6 posições e autoplay com pausa para depoimentos'],
      ['novo', 'Carrossel: prévia lado a lado em desktop (1280px) e mobile (375px)'],
      ['novo', 'Componente Aviso de cookies (LGPD): Aceitar e Recusar, reabrir pelo rodapé, medição só depois do aceite'],
      ['melhoria', 'Cards: as variantes provisórias de carrossel (setas abaixo, bolinhas) dão lugar ao componente oficial'],
    ],
  },
  {
    versao: 'v0.10.0',
    data: '24/09/2026',
    mudancas: [
      ['novo', 'Materiais: tabela de preços 2026, cardápio Freevix, folder de tecnologias, marca própria e Tracer E-tess em PDF, com abrir e baixar'],
      ['novo', 'Marca → Tecnologias & lentes: 12 ícones de tecnologia (ícone + lockup) e 12 desenhos de lente em SVG, com .zip'],
      ['novo', 'Cards: carrossel de linha Freevix com setas abaixo e com bolinhas'],
      ['melhoria', 'Data de atualização em cada arquivo para download'],
    ],
  },
  {
    versao: 'v0.9.1',
    data: '23/07/2026',
    mudancas: [
      ['correcao', 'Selects do Playground: seta com respiro da borda (chevron próprio)'],
      ['correcao', 'Blocos de código quebram linha no mobile (nada mais cortado) + card do Playground sem estourar na horizontal'],
      ['melhoria', 'Regra 60-30-10 redesenhada — barra de proporção + legenda (mobile e desktop)'],
      ['correcao', 'Fotografia: caixas "Sem AR" / "Reflecta AR" agora embaixo, cada uma dentro do seu lado da foto'],
      ['melhoria', 'Scroll horizontal fino e discreto em todo o site (carrossel, tabelas, código)'],
      ['correcao', 'Accordion: removida a linha dupla (underline do título + borda do último item)'],
      ['correcao', 'Vocabulário: VIX Total marcada como multifocal de entrada'],
    ],
  },
  {
    versao: 'v0.9.0',
    data: '19/07/2026',
    mudancas: [
      ['novo', 'Data-viz — gráficos (shadcn Charts / recharts) com paleta categórica Vixlens + guia de cor pra dado'],
      ['novo', 'Playground — controles de prop ao vivo (Button, Badge, Alert, Input) com o código atualizando junto'],
      ['novo', 'Paleta de gráfico nos tokens (color.chart 1–5) + vars --chart-*'],
    ],
  },
  {
    versao: 'v0.8.0',
    data: '19/07/2026',
    mudancas: [
      ['novo', '"Comece aqui" — onboarding do consumidor: como puxar tokens (CSS/Tailwind) e usar os componentes'],
      ['novo', 'Lint no CI (ESLint + regras de acessibilidade jsx-a11y)'],
      ['novo', 'Auditoria de acessibilidade automática (Lighthouse) em cada PR'],
      ['novo', 'Templates de RFC, pedido de componente e PR + CODEOWNERS'],
    ],
  },
  {
    versao: 'v0.7.0',
    data: '19/07/2026',
    mudancas: [
      ['novo', 'Busca ⌘K — command palette pra achar seção ou componente'],
      ['novo', 'Copiar código nos exemplos de Botões, Inputs, Cards e Callouts'],
      ['novo', 'Fundamentos: Elevação (sombras) e Grid & breakpoints'],
      ['novo', 'Documentação de props dos 17 componentes da biblioteca shadcn'],
      ['novo', 'Governança: gerador de token (JSON→CSS/preset) com guarda de drift no CI + guia de contribuição'],
      ['melhoria', 'Acessibilidade além do contraste — foco visível, teclado, movimento reduzido, daltonismo'],
      ['correcao', 'Exports de token estavam desatualizados (radius/tipografia) — regenerados do JSON'],
    ],
  },
  {
    versao: 'v0.6.0',
    data: '19/07/2026',
    mudancas: [
      ['novo', 'Copiar cor/token em 1 clique — cores, callouts, radius, espaçamento e classes utilitárias'],
      ['novo', 'Página de Changelog + versionamento (SemVer)'],
      ['novo', 'Auditoria de Acessibilidade — contraste WCAG AA/AAA'],
      ['novo', "Documentação por componente — estados, props, do / don't"],
    ],
  },
  {
    versao: 'v0.5.0',
    data: '17/07/2026',
    mudancas: [
      ['novo', 'Rebuild completo em React (Vite + Tailwind + shadcn/ui)'],
      ['novo', 'Adota estilo luma (preset b6GgLgzgW) + base color mauve, mantendo cores/fontes Vixlens'],
      ['novo', 'Fonte única de tokens (JSON / CSS / Tailwind preset), exportável'],
      ['novo', 'Iconografia (Phosphor principal + Lucide do shadcn) com exemplos e links'],
      ['novo', 'Handoff dev (comando do preset) + link da biblioteca no Figma'],
      ['novo', 'Seção Materiais (scaffold "em breve")'],
      ['melhoria', 'Escala tipográfica ligada ao token (H1 64 → mobile 40; headings múltiplos de 4)'],
    ],
  },
  {
    versao: 'v0.4.0',
    data: '17/07/2026',
    mudancas: [
      ['novo', 'Sistema de marcas multi-formato — 81 conceitos em SVG / PNG / PDF / WebP + 5 brand kits'],
      ['correcao', 'Padroniza preto #1D1D1F e amarelo #FAC617; rampa de cinza completa'],
    ],
  },
  {
    versao: 'Anterior',
    data: 'mai–jun/2026',
    neutro: true,
    resumo: 'Ajustes de marca, galeria de fotografia, tipografia mobile, Reflecta; repo renomeado p/ vixlens-ds.',
  },
]

function VersaoBadge({ versao, atual, neutro }) {
  const tone = atual
    ? 'bg-vix-amarelo text-vix-preto'
    : neutro
      ? 'bg-vix-cinza-card text-gray-600'
      : 'bg-vix-preto text-white'
  return (
    <span className={`inline-flex items-center rounded-vix-chip px-2.5 py-1 font-mono text-[13px] font-bold tracking-tight ${tone}`}>
      {versao}
    </span>
  )
}

function TipoGrupo({ tipo, itens }) {
  const { label, Icon, pill, dot } = TIPOS[tipo]
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-vix-chip px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${pill}`}>
          <Icon size={11} weight="bold" />
          {label}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {itens.map((texto) => (
          <li key={texto} className="flex items-start gap-2 text-[13px] leading-relaxed text-gray-600">
            <Icon size={13} weight="bold" className={`mt-[3px] shrink-0 ${dot}`} />
            <span>{texto}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function VersaoCard({ versao }) {
  const grupos = versao.mudancas
    ? ORDEM.map((tipo) => [tipo, versao.mudancas.filter(([t]) => t === tipo).map(([, texto]) => texto)]).filter(
        ([, itens]) => itens.length > 0,
      )
    : []

  return (
    <div
      className={`grid grid-cols-1 gap-5 rounded-vix-card border p-6 md:grid-cols-[180px_1fr] md:gap-8 md:p-7 ${
        versao.atual ? 'border-vix-amarelo bg-vix-amarelo-light/40' : 'border-gray-100 bg-white'
      }`}
    >
      <div className="flex flex-row flex-wrap items-center gap-2.5 md:flex-col md:items-start md:gap-3">
        <VersaoBadge versao={versao.versao} atual={versao.atual} neutro={versao.neutro} />
        {versao.atual && (
          <span className="inline-flex items-center gap-1 rounded-vix-chip bg-vix-preto px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            <Sparkle size={11} weight="fill" className="text-vix-amarelo" />
            Atual
          </span>
        )}
        <span className="font-mono text-[12px] text-gray-600">{versao.data}</span>
      </div>

      <div className="flex flex-col gap-5">
        {versao.resumo ? (
          <p className="text-[13px] leading-relaxed text-gray-600">{versao.resumo}</p>
        ) : (
          grupos.map(([tipo, itens]) => <TipoGrupo key={tipo} tipo={tipo} itens={itens} />)
        )}
      </div>
    </div>
  )
}

export default function ChangelogSection() {
  return (
    <Section
      id="changelog"
      eyebrow="— Sobre o sistema"
      title="Changelog"
      desc="O que mudou em cada versão do Design System, da mais recente pra mais antiga. Sem enrolação: o que entrou, o que melhorou, o que foi corrigido."
    >
      {/* Esquema de versionamento — SemVer */}
      <div className="mb-10 flex flex-col gap-4 rounded-vix-card border border-gray-100 bg-vix-cinza-card p-5 sm:flex-row sm:items-center sm:gap-6">
        <VersaoBadge versao={VERSOES[0].versao} atual />
        <p className="text-[13px] leading-relaxed text-gray-600">
          Seguimos <span className="font-bold text-vix-preto">Semantic Versioning</span> (MAJOR.MINOR.PATCH):{' '}
          <span className="font-bold text-vix-preto">MAJOR</span> muda quando algo quebra,{' '}
          <span className="font-bold text-vix-preto">MINOR</span> quando adiciona sem quebrar e{' '}
          <span className="font-bold text-vix-preto">PATCH</span> quando corrige.
        </p>
      </div>

      {/* Legenda de tipos */}
      <SubTitle>Legenda</SubTitle>
      <div className="mb-9 flex flex-wrap gap-2">
        {ORDEM.map((tipo) => {
          const { label, Icon, pill } = TIPOS[tipo]
          return (
            <span
              key={tipo}
              className={`inline-flex items-center gap-1 rounded-vix-chip px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${pill}`}
            >
              <Icon size={12} weight="bold" />
              {label}
            </span>
          )
        })}
      </div>

      {/* Timeline */}
      <SubTitle>Histórico</SubTitle>
      <div className="flex flex-col gap-4">
        {VERSOES.map((versao) => (
          <VersaoCard key={versao.versao + versao.data} versao={versao} />
        ))}
      </div>
    </Section>
  )
}
