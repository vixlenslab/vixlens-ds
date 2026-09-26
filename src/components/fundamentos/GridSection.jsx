import { Check, DeviceMobile, Monitor } from '@phosphor-icons/react'
import { Section, SubTitle } from '../Section.jsx'

// Breakpoints padrão do Tailwind — não inventar valores.
const BREAKPOINTS = [
  { prefix: '—', min: '0', uso: 'Base — ponto de partida. Sem prefixo = mobile.', mobile: true },
  { prefix: 'sm', min: '640', uso: 'Celular na horizontal, telas pequenas.' },
  { prefix: 'md', min: '768', uso: 'Tablet / desktop liga: a sidebar aparece e o conteúdo ganha margem (md:ml-[260px]).', main: true },
  { prefix: 'lg', min: '1024', uso: 'Desktop — layouts com mais colunas.' },
  { prefix: 'xl', min: '1280', uso: 'Telas largas.' },
  { prefix: '2xl', min: '1536', uso: 'Monitores grandes.' },
]

export default function GridSection() {
  return (
    <Section
      id="grid"
      eyebrow="09 — Fundamentos"
      title="Grid & breakpoints"
      desc="Mobile-first. O layout vira desktop no md. Breakpoints padrão do Tailwind — não inventar valores."
    >
      {/* 1 — Breakpoints */}
      <SubTitle>Breakpoints</SubTitle>
      <p className="-mt-2 mb-6 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Mobile-first: <b className="text-vix-preto">sem prefixo é o estado base (mobile)</b>. Cada prefixo
        aplica dali para cima. O <span className="font-mono text-vix-azul">md</span> (768&nbsp;px) é o breakpoint
        principal do DS — onde a sidebar aparece e o conteúdo ganha margem.
      </p>
      <div className="mb-14 overflow-x-auto rounded-vix-input border border-gray-200">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600">
              <th className="px-5 py-3 font-bold">Prefixo</th>
              <th className="px-5 py-3 font-bold">Largura mínima</th>
              <th className="px-5 py-3 font-bold">Uso típico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {BREAKPOINTS.map((b) => (
              <tr key={b.prefix} className={b.main ? 'bg-vix-amarelo-light/40' : ''}>
                <td className="px-5 py-3.5">
                  <span className={`font-mono ${b.mobile ? 'text-gray-600' : 'text-vix-azul'}`}>{b.prefix}</span>
                  {b.main && (
                    <span className="ml-2 rounded-full bg-vix-preto px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                      principal
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 font-mono text-[13px] font-bold text-vix-preto">
                  {b.mobile ? '—' : `${b.min} px`}
                </td>
                <td className={`px-5 py-3.5 ${b.main ? 'font-semibold text-vix-preto' : 'text-gray-600'}`}>{b.uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2 — Container */}
      <SubTitle>Container</SubTitle>
      <p className="-mt-2 mb-6 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Conteúdo com largura de leitura confortável — <span className="font-mono text-vix-azul">max-w-2xl</span> /
        <span className="font-mono text-vix-azul"> max-w-3xl</span> para texto. O padding lateral cresce com a tela:
        <span className="font-mono text-vix-azul"> px-8 md:px-16</span>.
      </p>
      <div className="mb-14 rounded-vix-card border border-gray-200 bg-vix-cinza-card px-8 py-8 md:px-16">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <Monitor size={13} weight="bold" /> Coluna de conteúdo · <span className="font-mono text-vix-azul">max-w-2xl</span>
        </div>
        <div className="mx-auto max-w-2xl rounded-vix-input border border-gray-200 bg-white p-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-vix-azul">Largura de leitura</div>
          <p className="mt-2 text-base leading-relaxed text-vix-preto">
            Texto corrido nunca ocupa a tela inteira: ele fica preso a uma coluna estreita para a leitura não cansar.
            As faixas cinza dos lados são o padding lateral crescendo de mobile para desktop.
          </p>
        </div>
      </div>

      {/* 3 — Grid responsivo */}
      <SubTitle>Grid responsivo</SubTitle>
      <p className="-mt-2 mb-6 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Padrão <span className="font-mono text-vix-azul">grid-cols-N</span> + <span className="font-mono text-vix-azul">gap</span> do
        token. Os blocos abaixo são reais: <span className="font-mono text-vix-azul">grid-cols-2 md:grid-cols-4</span> —
        2 colunas no mobile, 4 a partir do <span className="font-mono text-vix-azul">md</span>. Redimensione para ver reflowar.
      </p>
      <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
        <DeviceMobile size={13} weight="bold" /> grid-cols-2
        <span className="text-gray-600">·</span>
        <Monitor size={13} weight="bold" /> md:grid-cols-4
        <span className="text-gray-600">·</span>
        <span className="font-mono text-vix-azul">gap-vix-3</span>
      </div>
      <div className="mb-14 grid grid-cols-2 gap-vix-3 rounded-vix-card border border-gray-200 bg-white p-6 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 items-center justify-center rounded-vix-input bg-vix-cinza-card font-mono text-sm font-bold text-gray-600"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* 4 — Regra curta */}
      <SubTitle>Regra</SubTitle>
      <div className="flex flex-col gap-2.5">
        {[
          'Mobile-first sempre: escreva o estado base e adicione prefixos para cima.',
          'Use os prefixos do Tailwind (sm/md/lg/xl/2xl) — nunca media queries na mão.',
          'O gap vem do espaçamento (token) — gap-vix-N, não valores soltos.',
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
