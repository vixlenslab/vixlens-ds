import { Section, SubTitle } from '../Section.jsx'

const VOZES = [
  {
    id: 'V1', nome: 'Autoridade técnica', ref: 'Roosevelt (Hub Rio) · Luciano mentor (Vix Academy)',
    quando: 'Conteúdo educacional, comparativos técnicos, qualidade', tom: 'Preciso, referenciado, sem arrogância',
    certo: 'Material, índice e desenho da lente espelhados automaticamente. Sem renegociação, sem aditivo.',
    errado: 'Somos referência em qualidade no setor óptico.',
  },
  {
    id: 'V2', nome: 'Consultoria de balcão', ref: 'Fabrício Amorim · Guilherme · Carlos Coan',
    quando: 'Dicas práticas, visita a cliente, conversas do dia a dia', tom: 'Próximo, direto, útil imediatamente',
    certo: 'Sua marca própria continua cadastrada normalmente. O que muda é o caminho até ela.',
    errado: 'Estamos comprometidos em oferecer a melhor experiência ao cliente.',
  },
  {
    id: 'V3', nome: 'Bastidor industrial', ref: 'Luciano coord. produção · Diego Freitas',
    quando: 'Processo fabril, escala, estrutura operacional', tom: 'Concreto, números em faixa, bastidor real',
    certo: 'Centenas de jobs por dia, cada um rastreado. Quando a escala dobrar, o processo já está pronto.',
    errado: 'Crescemos X% ao ano com tecnologia de ponta.',
  },
  {
    id: 'V4', nome: 'Cliente falando', ref: 'Casos e depoimentos',
    quando: 'Cases e depoimentos — o cliente é sempre o protagonista', tom: 'Cliente no centro, dado real',
    certo: 'Reduzi erro de cadastro na minha ótica depois que mudei pro fluxo Matriz.',
    errado: 'A Vixlens transformou o negócio do cliente.',
  },
  {
    id: 'V5', nome: 'Visão estratégica', ref: 'Otávio · liderança',
    quando: 'Parcerias-âncora, decisões estruturais', tom: 'Mentalidade de dono, sem discurso motivacional',
    certo: 'A Matriz Marca Própria vira infraestrutura: cada parceiro escala sem refazer cadastro.',
    errado: 'Acreditamos no futuro da óptica brasileira e seguimos inovando.',
  },
]

const NUNCA = ['em dash em marketing', '"importância de"', '"solução completa"', 'crescimento em %', 'comparar com concorrente', '"Essilor" sozinho', 'valores financeiros exatos']
const SEMPRE = ['frases curtas, voz ativa', 'faixas no lugar de número exato', 'dado real, nunca inventado', 'EssilorLuxottica sempre completo']

export default function VozTomSection() {
  return (
    <Section
      id="voz-tom"
      eyebrow="08 — Voz"
      title="Voz & Tom"
      desc="Institucional, mas direto. Anti-corporativo-vazio. Cada frase serve um propósito, nenhuma palavra desperdiçada. A Vixlens tem cinco vozes, cada uma com contexto de uso definido."
    >
      <SubTitle>As 5 referências de voz</SubTitle>
      <div className="mb-14 flex flex-col gap-4">
        {VOZES.map((v) => (
          <div key={v.id} className="overflow-hidden rounded-2xl border border-gray-200">
            <div className="flex flex-wrap items-center gap-3 bg-vix-preto px-6 py-4">
              <span className="rounded-vix-chip bg-vix-amarelo/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-vix-amarelo">{v.id}</span>
              <span className="text-[15px] font-bold text-white">{v.nome}</span>
              <span className="ml-auto text-xs text-white/65">{v.ref}</span>
            </div>
            <div className="bg-white p-6">
              <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-600">Quando usar</div>
                  <div className="text-[13px] text-gray-600">{v.quando}</div>
                </div>
                <div>
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-600">Tom</div>
                  <div className="text-[13px] text-gray-600">{v.tom}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-r-lg border-l-[3px] border-[#00782D] bg-[#F0FDF4] px-3.5 py-3">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-[#00782D]">✓ Certo</div>
                  <div className="text-[13px] text-vix-preto">&ldquo;{v.certo}&rdquo;</div>
                </div>
                <div className="rounded-r-lg border-l-[3px] border-[#B91C1C] bg-[#FEF2F2] px-3.5 py-3">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-[#B91C1C]">✗ Errado</div>
                  <div className="text-[13px] text-gray-600">&ldquo;{v.errado}&rdquo;</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-vix-card border border-gray-200 p-7">
          <div className="mb-3 text-sm font-bold text-[#00782D]">Sempre</div>
          <ul className="flex flex-col gap-2">
            {SEMPRE.map((t) => <li key={t} className="text-[13px] text-gray-600">· {t}</li>)}
          </ul>
        </div>
        <div className="rounded-vix-card border border-gray-200 p-7">
          <div className="mb-3 text-sm font-bold text-[#B91C1C]">Nunca</div>
          <ul className="flex flex-col gap-2">
            {NUNCA.map((t) => <li key={t} className="text-[13px] text-gray-600">· {t}</li>)}
          </ul>
        </div>
      </div>

      {/* Checklist antes de publicar */}
      <SubTitle className="mt-14">Checklist antes de publicar</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CHECKLIST.map((t, i) => {
          const id = `checklist-voz-${i}`
          return (
            <label
              key={t}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-100 px-3.5 py-2.5"
            >
              <input id={id} type="checkbox" className="h-4 w-4 accent-vix-preto" />
              <span className="text-[13px] text-gray-600">{t}</span>
            </label>
          )
        })}
      </div>

      {/* Frases-âncora */}
      <SubTitle>Frases-âncora — calibração de tom</SubTitle>
      <div className="flex flex-col gap-2.5">
        {FRASES.map((f, i) => (
          <div key={i} className="flex items-start gap-3.5 rounded-xl bg-vix-preto px-5 py-4">
            <span className="mt-0.5 shrink-0 rounded-vix-chip bg-vix-amarelo/10 px-2 py-1 font-mono text-[11px] font-bold text-vix-amarelo">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm leading-relaxed text-white">&ldquo;{f}&rdquo;</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

const CHECKLIST = [
  'Tem travessão (—)? Remover.',
  'Tem expressão proibida? Substituir.',
  'Tem comparação com concorrente? Cortar.',
  'Tem valor exato? Converter para faixa ou remover.',
  'Tem referência a M&A/exit/valuation? Cortar completamente.',
  '"Essilor" aparece isolado? Corrigir para "EssilorLuxottica".',
  'Cliente citado? Verificar autorização prévia.',
]
const FRASES = [
  '1 lente Matriz = 1 lente Vixlens equivalente. Material, índice e desenho da lente espelhados automaticamente.',
  'Toda nova tecnologia incorporada ao portfólio campeão Vixlens fica disponível na sua tabela no mesmo momento em que entra na tabela Vixlens.',
  'Sem atualização de cadastro, sem renegociação. O estado da arte chega por padrão.',
  'Material, índice e desenho da lente espelhados automaticamente da Matriz, eliminando erro de cadastro.',
  'O tratamento permanece sendo selecionado pelo cliente, sem interferência do sistema.',
]
