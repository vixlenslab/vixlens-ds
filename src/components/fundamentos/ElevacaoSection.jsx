import { Section, SubTitle } from '../Section.jsx'

const NIVEIS = [
  {
    nome: 'Rente',
    nivel: '0',
    classe: 'shadow-none',
    sombra: 'sem sombra — no plano base',
    uso: 'Elementos dentro de um card, encostados na superfície.',
  },
  {
    nome: 'Sutil',
    nivel: 'sm',
    classe: 'shadow-xs',
    sombra: 'sombra rasa, quase colada',
    uso: 'Inputs, chips, hover leve.',
  },
  {
    nome: 'Card',
    nivel: 'md',
    classe: 'shadow-md ring-1 ring-black/5',
    sombra: 'sombra média + anel sutil',
    uso: 'Padrão do card — é o que o DS usa.',
    destaque: true,
  },
  {
    nome: 'Overlay',
    nivel: 'lg/xl',
    classe: 'shadow-xl',
    sombra: 'sombra ampla e difusa',
    uso: 'Modais, popovers, dropdowns, tooltip.',
  },
]

export default function ElevacaoSection() {
  return (
    <Section
      id="elevacao"
      eyebrow="06 — Fundamentos"
      title="Elevação"
      desc="Sombras suaves — separam camadas sem peso. Poucos níveis, papel claro pra cada um."
    >
      <SubTitle>Escala de elevação</SubTitle>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {NIVEIS.map((n) => (
          <div
            key={n.nivel}
            className={`flex flex-col rounded-vix-card border bg-vix-cinza-card p-5 ${
              n.destaque ? 'border-vix-azul' : 'border-gray-200'
            }`}
          >
            {/* palco cinza pra a sombra aparecer */}
            <div className="mb-5 flex h-24 items-center justify-center">
              <div className={`h-16 w-16 rounded-vix-input bg-white ${n.classe}`} />
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-vix-preto">{n.nome}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-gray-600">
                {n.nivel}
              </span>
            </div>

            {n.destaque && (
              <span className="mt-1.5 inline-flex w-fit rounded-vix-input bg-vix-azul/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-vix-azul">
                Mais usado
              </span>
            )}

            <code className="mt-2.5 block wrap-break-word font-mono text-[12px] text-vix-azul">
              {n.classe}
            </code>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{n.sombra}.</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">{n.uso}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-vix-card border border-gray-200 bg-vix-cinza-card px-5 py-4">
        <p className="text-sm leading-relaxed text-vix-preto">
          <span className="font-bold">Regra:</span> no máximo 2 níveis numa mesma tela. Sombra
          comunica hierarquia, não decora.
        </p>
      </div>
    </Section>
  )
}
