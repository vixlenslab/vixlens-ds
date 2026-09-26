import { ArrowSquareOut } from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'
import { CopyValue, CopyButton } from '../Copy.jsx'
import tokens from '../../data/tokens.js'

const RADIUS = [
  { key: 'card', name: 'Card Large', use: 'Cards de conteúdo, seções em destaque' },
  { key: 'button', name: 'Button', use: 'Botões e inputs' },
  { key: 'input', name: 'Input', use: 'Campos de formulário' },
  { key: 'chip', name: 'Chip / Badge', use: 'Tags, badges, chips' },
]

export default function TokensSection() {
  return (
    <Section
      id="tokens"
      eyebrow="05 — Fundamentos"
      title="Tokens de forma"
      desc="Border radius no estilo luma — geometria arredondada. Cards e botões bem redondos. Cada valor tem um papel específico — não usar livremente entre contextos."
    >
      <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {RADIUS.map((r) => {
          const v = tokens.radius[r.key].value
          return (
            <div key={r.key} className="rounded-vix-input border border-gray-200 p-6 text-center">
              <div className="mx-auto mb-4 h-14 w-20 bg-vix-preto" style={{ borderRadius: v }} />
              <div className="text-[13px] font-bold text-vix-preto">{r.name}</div>
              <CopyValue value={v} className="text-sm font-bold text-vix-azul">{v}</CopyValue>
              <div className="mt-1.5 text-[11px] leading-snug text-gray-600">{r.use}</div>
            </div>
          )
        })}
      </div>

      <SubTitle>Tokens consumíveis</SubTitle>
      <div className="flex flex-col items-start gap-4 rounded-vix-card bg-vix-preto p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-bold text-white">Fonte única de tokens</div>
          <div className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-white/60">
            Cores, raios, espaçamento e tipografia num arquivo só — o site, a skill de UI e qualquer
            produto puxam os mesmos valores. Não copie hex na mão.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/assets/tokens/vixlens-tokens.json', label: 'JSON', primary: true },
            { href: '/assets/tokens/vixlens-tokens.css', label: 'CSS' },
            { href: '/assets/tokens/vixlens-tailwind-preset.cjs', label: 'Tailwind' },
          ].map((f) => (
            <a
              key={f.label}
              href={f.href}
              download
              className={`rounded-vix-button px-4 py-2.5 text-sm font-bold transition-colors ${
                f.primary ? 'bg-vix-amarelo text-vix-preto hover:bg-vix-amarelo-hover' : 'border border-white/25 text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </a>
          ))}
        </div>
      </div>

      {/* Handoff para devs — mesmo estilo em qualquer projeto novo */}
      <SubTitle className="mt-12">Para desenvolvedores — mesmo estilo</SubTitle>
      <div className="rounded-vix-card border border-gray-200 p-6 md:p-8">
        <p className="max-w-2xl text-[13px] leading-relaxed text-gray-600">
          Qualquer dev que for criar telas pra gente parte do mesmo preset shadcn — estilo{' '}
          <b className="text-vix-preto">luma</b>, base color <b className="text-vix-preto">mauve</b>,
          tema Vixlens (amarelo), ícones Lucide. Um comando reproduz a base:
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-vix-input bg-vix-preto px-4 py-3">
          <span className="select-none font-mono text-xs text-vix-amarelo">$</span>
          <code className="min-w-0 flex-1 whitespace-pre-wrap wrap-break-word font-mono text-[13px] text-white">
            npx shadcn@latest init --preset b6GgLgzgW
          </code>
          <CopyButton value="npx shadcn@latest init --preset b6GgLgzgW" label="comando" tone="dark" className="ml-auto" />
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-gray-600">
          Depois é só aplicar os tokens Vixlens (JSON/CSS/Tailwind acima) por cima — cores, radius e
          tipografia já saem on-brand. O mesmo sistema está no <b className="text-vix-preto">Figma</b>{' '}
          (foundations, 14 componentes, dark & light) pra quem desenha.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-5">
          <a
            href="https://www.figma.com/design/xVXZpMF3PY5khaGElq0Mvz/Vixlens-DS-Luma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-vix-button bg-vix-preto px-3.5 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#333333]"
          >
            <ArrowSquareOut size={14} weight="bold" /> Figma — Biblioteca
          </a>
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-vix-button border border-gray-200 px-3.5 py-2 text-[12px] font-bold text-vix-preto transition-colors hover:bg-gray-50"
          >
            <ArrowSquareOut size={14} weight="bold" /> Icon Library — Lucide
          </a>
          <a
            href="https://ui.shadcn.com/create?preset=b6GgLgzgW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-vix-button border border-gray-200 px-3.5 py-2 text-[12px] font-bold text-vix-preto transition-colors hover:bg-gray-50"
          >
            <ArrowSquareOut size={14} weight="bold" /> Preset shadcn
          </a>
        </div>
      </div>
    </Section>
  )
}
