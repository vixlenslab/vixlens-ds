import { CheckCircle, XCircle } from '@phosphor-icons/react'
import tokens from '../../data/tokens.js'

const cor = tokens.color

/**
 * PropsTable — tabela responsiva de props.
 * rows: array de { prop, tipo, padrao, desc }
 * Mesmo estilo da tabela utilitária de TipografiaSection.jsx.
 */
export function PropsTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-vix-input border border-gray-200">
      <table className="w-full min-w-[560px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600">
            <th className="px-5 py-3 font-bold">Prop</th>
            <th className="px-5 py-3 font-bold">Tipo</th>
            <th className="px-5 py-3 font-bold">Padrão</th>
            <th className="px-5 py-3 font-bold">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r) => (
            <tr key={r.prop}>
              <td className="px-5 py-3.5 font-mono text-[12px] text-vix-azul">{r.prop}</td>
              <td className="px-5 py-3.5 font-mono text-[12px] text-gray-600">{r.tipo}</td>
              <td className="px-5 py-3.5 font-mono text-[12px] text-vix-preto">{r.padrao || '—'}</td>
              <td className="px-5 py-3.5 text-gray-600">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * DosDonts — dois blocos lado a lado (Faça / Evite).
 * dos, donts: arrays de string.
 */
// Cores de callout do DS. O texto vai em Preto sobre o tint, como manda a
// regra de callout — as cores de sucesso/crítico ficam no ícone e na borda,
// onde o mínimo é 3.0 (elemento de UI) e não 4.5 (texto).
const LADOS = [
  {
    key: 'dos',
    titulo: 'Faça',
    Icone: CheckCircle,
    bg: cor.callout.success.bg,
    borda: cor.callout.success.bar,
    acento: cor.callout.success.label,
  },
  {
    key: 'donts',
    titulo: 'Evite',
    Icone: XCircle,
    bg: cor.callout.critical.bg,
    borda: cor.callout.critical.bar,
    acento: cor.callout.critical.label,
  },
]

export function DosDonts({ dos = [], donts = [] }) {
  const itens = { dos, donts }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {LADOS.map(({ key, titulo, Icone, bg, borda, acento }) => (
        <div
          key={key}
          className="rounded-vix-input border p-5"
          style={{ background: bg, borderColor: `${borda}66` }}
        >
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-vix-preto">
            <Icone size={16} weight="fill" style={{ color: acento }} />
            {titulo}
          </div>
          <div className="flex flex-col gap-2.5">
            {itens[key].map((d) => (
              <div key={d} className="flex items-start gap-2.5">
                <Icone size={18} weight="fill" className="mt-0.5 shrink-0" style={{ color: acento }} />
                <span className="text-[13px] leading-relaxed text-vix-preto">{d}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * StatesRow — wrapper simples: label pequeno + linha flex com exemplos.
 * Opcional.
 */
export function StatesRow({ children, label }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="text-[11px] uppercase tracking-widest text-gray-600">{label}</div>
      )}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  )
}
