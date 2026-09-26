import { Check } from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'

const TERMOS = [
  ['Matriz Marca Própria', 'matriz · produto marca própria'],
  ['espelho da tabela Vixlens', 'cópia da tabela · equivalente à tabela'],
  ['material, índice e desenho da lente', 'especificações técnicas · dados da lente'],
  ['1 lente Matriz = 1 lente Vixlens equivalente', 'produto similar · versão parecida'],
  ['portfólio campeão Vixlens', 'melhores produtos · linha top'],
  ['EssilorLuxottica', 'Essilor'],
  ['Vix na Prática · Vix na Estrada · Vix Academy · Vix Innovation', 'programas · treinamentos genéricos'],
  ['Hub Rio · Freevix · Astera', 'filial · marca genérica'],
]

const FREEVIX = [
  ['Freevix ONE', 'Multifocal', 'Entrada de linha'],
  ['Freevix PREMIUM', 'Multifocal', '—'],
  ['Freevix FREEDOM', 'Multifocal', 'Liberdade de armações'],
  ['Freevix IA TECH', 'Multifocal', 'Tecnologia IA'],
  ['Freevix VS', 'Visão simples', 'Uso constante de telas'],
  ['Freevix VS HD', 'Visão simples', 'Campo de visão até 30% mais amplo'],
  ['Freevix VS RELAX', 'Visão simples', 'Até 80% de redução na fadiga ocular'],
  ['Freevix OFFICE ATÉ 4M', 'Ocupacional', 'Visão intermediária ampla (até 4m)'],
  ['Freevix DESKVIEW ATÉ 2M', 'Ocupacional', 'Conforto perto e médias distâncias'],
  ['Freevix DESKVIEW ATÉ 1,3M', 'Ocupacional', 'Foco em trabalho de perto (até 1,3m)'],
]
const OUTROS = [
  ['Astera', 'Lente para controle de miopia infantil'],
  ['VIX Total', 'Multifocal de entrada — produto âncora da linha'],
  ['Tecnologia Vix Slim', 'Lentes até 30% mais finas e leves para altas dioptrias'],
]
const REFLECTA = [
  ['Reflecta BlueProtect SH', 'Premium Shield · 24 camadas · Ion'],
  ['Reflecta Guard', 'Proteção do dia a dia'],
  ['Reflecta Express', 'Tratamento antirreflexo essencial'],
]
const REGRAS = [
  'Freevix é sempre uma palavra, com F maiúsculo. Nunca "Free Vix" ou "freevix".',
  'O nome do produto vai em CAIXA ALTA depois de Freevix: Freevix ONE, Freevix VS HD.',
  '"Vix" como prefixo leva espaço e capitalização própria: Vix Academy, Vix Innovation, Vix na Prática.',
  'EssilorLuxottica é sempre completo e junto. Nunca "Essilor" isolado.',
  'Reflecta é a matriz da linha AR; os produtos herdam o nome: Reflecta Guard, Reflecta Express.',
]

export default function VocabularioSection() {
  return (
    <Section
      id="vocabulario"
      eyebrow="09 — Vocabulário"
      title="Vocabulário Canônico"
      desc="Grafia obrigatória. Cada termo tem uma forma oficial — e o que nunca usar no lugar. Consistência de nomenclatura é parte da identidade."
    >
      <SubTitle>Termos obrigatórios</SubTitle>
      <div className="mb-14 overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-vix-preto">
              <th className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-vix-amarelo">Termo canônico</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-white/50">Nunca usar</th>
            </tr>
          </thead>
          <tbody>
            {TERMOS.map(([canon, nunca], i) => (
              <tr key={canon} className={`border-b border-gray-100 ${i % 2 ? 'bg-gray-50' : ''}`}>
                <td className="px-4 py-3 font-bold text-vix-preto">{canon}</td>
                <td className="px-4 py-3 text-gray-600">{nunca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Portfólio de produtos */}
      <SubTitle>Portfólio de produtos — nomes canônicos</SubTitle>
      <div className="mb-6 overflow-x-auto rounded-vix-input border border-gray-200">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-gray-600">Produto</th>
              <th className="px-3.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-gray-600">Tipo</th>
              <th className="px-3.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-gray-600">Diferencial</th>
            </tr>
          </thead>
          <tbody>
            {FREEVIX.map(([p, t, d], i) => (
              <tr key={p} className={`border-b border-gray-100 ${i % 2 ? 'bg-gray-50' : ''}`}>
                <td className="whitespace-nowrap px-3.5 py-2.5 font-bold text-vix-preto">{p}</td>
                <td className="px-3.5 py-2.5 text-gray-600">{t}</td>
                <td className="px-3.5 py-2.5 text-gray-600">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <span className="mb-3 inline-block rounded-vix-chip bg-vix-preto px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-vix-amarelo">Outros produtos</span>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            {OUTROS.map(([n, d], i) => (
              <div key={n} className={`border-b border-gray-100 px-3.5 py-3 last:border-0 ${i % 2 ? 'bg-gray-50' : ''}`}>
                <div className="text-[13px] font-bold text-vix-preto">{n}</div>
                <div className="text-xs text-gray-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-3 inline-block rounded-vix-chip bg-vix-azul px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">Linha Reflecta — AR</span>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            {REFLECTA.map(([n, d], i) => (
              <div key={n} className={`border-b border-gray-100 px-3.5 py-3 last:border-0 ${i % 2 ? 'bg-gray-50' : ''}`}>
                <div className="text-[13px] font-bold text-vix-preto">{n}</div>
                <div className="text-xs text-gray-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regras de nomenclatura */}
      <SubTitle>Regras de nomenclatura</SubTitle>
      <div className="flex flex-col gap-2.5">
        {REGRAS.map((r) => (
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
