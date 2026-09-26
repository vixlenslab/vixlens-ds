import {
  Palette,
  PuzzlePiece,
  Lightning,
  MagnifyingGlass,
  Rocket,
  DownloadSimple,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'
import { CodeBlock } from '../Copy.jsx'

const PRESET_CMD = 'npx shadcn@latest init --preset b6GgLgzgW'

const CONSUMO = [
  {
    icon: Palette,
    title: 'CSS vars',
    desc: (
      <>
        Importe <code className="font-mono text-vix-preto">vixlens-tokens.css</code> e use{' '}
        <code className="font-mono text-vix-preto">var(--vix-*)</code> em qualquer stack. Zero build.
      </>
    ),
    code: `@import url('https://ds.vixlens.com.br/assets/tokens/vixlens-tokens.css');

.botao {
  color: var(--vix-preto);
  background: var(--vix-amarelo);
}`,
  },
  {
    icon: PuzzlePiece,
    title: 'Tailwind 4',
    desc: (
      <>
        Importe o tema e ganhe as classes da marca —{' '}
        <code className="font-mono text-vix-preto">bg-vix-amarelo</code>,{' '}
        <code className="font-mono text-vix-preto">rounded-vix-card</code> e cia. Tela ainda em Tailwind 3? Use o
        preset <code className="font-mono text-vix-preto">vixlens-ds/tailwind.preset.js</code>.
      </>
    ),
    code: `/* globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'vixlens-ds/theme.css';
@import 'vixlens-ds/tailwind.css';
@source '../node_modules/vixlens-ds/dist-lib';

/* no JSX */
<button className="bg-vix-amarelo rounded-vix-button" />`,
  },
  {
    icon: Lightning,
    title: 'Componentes shadcn (luma)',
    desc: (
      <>
        A base pronta: um comando reproduz o preset luma. Depois é só aplicar os tokens Vixlens por
        cima.
      </>
    ),
    code: PRESET_CMD,
  },
]

const PASSOS = [
  {
    title: 'Instale o preset shadcn',
    desc: (
      <>
        Rode <code className="font-mono text-vix-preto">{PRESET_CMD}</code> — base luma, base color
        mauve, ícones Lucide.
      </>
    ),
  },
  {
    title: 'Importe os tokens',
    desc: 'CSS vars ou Tailwind preset — cores, radius e tipografia já saem on-brand.',
  },
  {
    title: 'Use um componente',
    desc: (
      <>
        Monte a primeira tela com <code className="font-mono text-vix-preto">{'<Button>'}</code> e cia
        — já vem no estilo Vixlens.
      </>
    ),
  },
  {
    title: 'Confira contraste & acessibilidade',
    desc: (
      <>
        Valide foco, contraste e ordem de leitura antes de subir — veja{' '}
        <a href="#acessibilidade" className="font-bold text-vix-azul hover:underline">
          Acessibilidade
        </a>
        .
      </>
    ),
  },
]

const ONDE = [
  {
    icon: MagnifyingGlass,
    kbd: '⌘K',
    label: 'Busca',
    desc: 'Ache qualquer seção ou componente em segundos, sem rolar a página.',
    href: null,
  },
  {
    icon: Palette,
    label: 'Fundamentos',
    desc: 'Cor, tipo, radius, espaçamento, elevação, grid e a11y — a base de tudo.',
    href: '#cores',
  },
  {
    icon: PuzzlePiece,
    label: 'Componentes',
    desc: 'Props, do & don’t e código pronto pra copiar de cada peça.',
    href: '#botoes',
  },
  {
    icon: Lightning,
    label: 'Contribuir',
    desc: 'Como propor uma mudança ou incluir um componente novo no sistema.',
    href: '#contribuir',
  },
]

const DOWNLOADS = [
  { href: '/assets/tokens/vixlens-tokens.json', label: 'JSON', primary: true },
  { href: '/assets/tokens/vixlens-tokens.css', label: 'CSS' },
  { href: '/assets/tokens/vixlens-tailwind-preset.cjs', label: 'Tailwind' },
]

export default function ComecarSection() {
  return (
    <Section
      id="comecar"
      eyebrow="— Comece aqui"
      title="Comece aqui"
      desc="Como consumir o Vixlens DS num produto novo — do zero à primeira tela on-brand."
    >
      {/* 1. O que é */}
      <div className="mb-14 rounded-vix-card border border-gray-200 p-6 md:p-8">
        <SubTitle>O que é</SubTitle>
        <p className="max-w-3xl text-base leading-relaxed text-gray-700">
          Um sistema único de <b className="text-vix-preto">marca</b>,{' '}
          <b className="text-vix-preto">tokens</b> e <b className="text-vix-preto">componentes</b>. A
          fonte de verdade é o token <span className="font-mono text-vix-azul">JSON</span> — nada de
          hex na mão.
        </p>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-gray-700">
          Produção é este site (referência viva) mais a biblioteca no Figma. Tudo puxa os mesmos
          valores.
        </p>
      </div>

      {/* 2. 3 formas de consumir os tokens */}
      <SubTitle>3 formas de consumir os tokens</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CONSUMO.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className="flex flex-col rounded-vix-card border border-gray-200 p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-vix-input bg-vix-cinza-card text-vix-preto">
                <Icon size={20} weight="bold" />
              </div>
              <div className="text-[15px] font-bold text-vix-preto">{c.title}</div>
              <div className="mb-4 mt-1.5 flex-1 text-[13px] leading-relaxed text-gray-600">
                {c.desc}
              </div>
              <CodeBlock code={c.code} />
            </div>
          )
        })}
      </div>

      {/* 3. Primeiros passos */}
      <SubTitle>Primeiros passos</SubTitle>
      <ol className="mb-14 grid grid-cols-1 gap-3 md:grid-cols-2">
        {PASSOS.map((p, i) => (
          <li
            key={p.title}
            className="flex gap-4 rounded-vix-card border border-gray-200 p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vix-preto text-sm font-bold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[15px] font-bold text-vix-preto">
                {i === 0 && <Rocket size={16} weight="bold" className="text-vix-amarelo" />}
                {p.title}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-gray-600">{p.desc}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* 4. Onde achar as coisas */}
      <SubTitle>Onde achar as coisas</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ONDE.map((o) => {
          const Icon = o.icon
          const inner = (
            <>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-vix-input bg-vix-cinza-card text-vix-preto">
                <Icon size={20} weight="bold" />
              </div>
              <div className="flex items-center gap-2 text-[15px] font-bold text-vix-preto">
                {o.label}
                {o.kbd && (
                  <kbd className="rounded-md border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-gray-600">
                    {o.kbd}
                  </kbd>
                )}
                {o.href && (
                  <ArrowSquareOut
                    size={13}
                    weight="bold"
                    className="text-gray-600 transition-colors group-hover:text-vix-azul"
                  />
                )}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-gray-600">{o.desc}</div>
            </>
          )
          return o.href ? (
            <a
              key={o.label}
              href={o.href}
              className="group rounded-vix-card border border-gray-200 p-6 transition-colors hover:border-vix-azul/40 hover:bg-gray-50/60"
            >
              {inner}
            </a>
          ) : (
            <div key={o.label} className="rounded-vix-card border border-gray-200 p-6">
              {inner}
            </div>
          )
        })}
      </div>

      {/* 5. Downloads / links */}
      <SubTitle>Downloads &amp; links</SubTitle>
      <div className="flex flex-col items-start gap-4 rounded-vix-card bg-vix-preto p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <DownloadSimple size={20} weight="bold" className="text-vix-amarelo" />
            Pegue os tokens
          </div>
          <div className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-white/60">
            Os mesmos valores que este site consome — baixe e plugue no seu produto.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {DOWNLOADS.map((f) => (
            <a
              key={f.label}
              href={f.href}
              download
              className={`rounded-vix-button px-4 py-2.5 text-sm font-bold transition-colors ${
                f.primary
                  ? 'bg-vix-amarelo text-vix-preto hover:bg-vix-amarelo-hover'
                  : 'border border-white/25 text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="https://www.figma.com/design/xVXZpMF3PY5khaGElq0Mvz/Vixlens-DS-Luma"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-vix-button bg-vix-preto px-3.5 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#333333]"
        >
          <ArrowSquareOut size={14} weight="bold" /> Figma — Biblioteca
        </a>
        <a
          href="#contribuir"
          className="inline-flex items-center gap-1.5 rounded-vix-button border border-gray-200 px-3.5 py-2 text-[12px] font-bold text-vix-preto transition-colors hover:bg-gray-50"
        >
          <Lightning size={14} weight="bold" /> Contribuir
        </a>
      </div>
    </Section>
  )
}
