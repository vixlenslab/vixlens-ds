import { Section, SubTitle } from '../Section.jsx'
import { ArrowSquareOut, DownloadSimple } from '@phosphor-icons/react'

const PDFS = [
  { t: 'Tabela de preços 2026', d: 'Valores praticados do laboratório para a ótica. Portfólio completo Vixlens.', f: 'tabela-precos-vixlens-2026.pdf', meta: '20 págs · 21 MB', atualizado: '24/09/2026', tag: 'Atualizada' },
  { t: 'Cardápio de lentes Freevix', d: 'As multifocais Freevix lado a lado, pra ótica explicar a diferença no balcão.', f: 'cardapio-lentes-freevix-2026.pdf', meta: 'A4 · 2 págs · 0,8 MB', atualizado: '24/09/2026' },
  { t: 'Folder de tecnologias', d: 'As tecnologias por trás das lentes Vixlens, em versão digital.', f: 'folder-tecnologias-vixlens.pdf', meta: '9 págs · 7,2 MB', atualizado: '24/09/2026' },
  { t: 'Marca própria', d: 'Como a ótica cria a própria linha de lentes e antirreflexos com a Vixlens.', f: 'marca-propria-vixlens.pdf', meta: '2 págs · 3,4 MB', atualizado: '24/09/2026' },
  { t: 'Tracer E-tess', d: 'Traçador digital em parceria com a EssilorLuxottica: a forma real da armação vai direto pra produção.', f: 'tracer-etess-vixlens.pdf', meta: '2 págs · 5,6 MB', atualizado: '24/09/2026' },
]

const GRUPOS = [
  {
    grupo: 'Papelaria',
    cards: [
      { t: 'Cartão de visita', d: 'Modelo com os dados do consultor. Edita, troca nome e telefone, exporta pra gráfica.', b: [['Abrir no Google', 'open'], ['Baixar PDF', 'pdf']] },
      { t: 'Papel timbrado', d: 'Cabeçalho oficial pra cartas, ofícios e documentos internos.', b: [['Abrir no Google Docs', 'open'], ['Baixar PDF', 'pdf']] },
      { t: 'Assinatura de e-mail', d: 'Assinatura padronizada pra Gmail/Outlook, com logo e contatos.', b: [['Copiar assinatura', 'open']] },
    ],
  },
  {
    grupo: 'Comercial',
    cards: [
      { t: 'Proposta comercial', d: 'Modelo de proposta pronto pra preencher e enviar ao cliente.', b: [['Abrir no Google Docs', 'open'], ['Baixar PDF', 'pdf']] },
      { t: 'Apresentação de vendas', d: 'Deck de vendas pro consultor apresentar a Vixlens.', b: [['Abrir no Google Slides', 'open'], ['Baixar PDF', 'pdf']] },
    ],
  },
  {
    grupo: 'Institucional',
    cards: [
      { t: 'Apresentação institucional', d: 'Quem é a Vixlens — pra parceiros, eventos e imprensa.', b: [['Abrir no Google Slides', 'open'], ['Baixar PDF', 'pdf']] },
      { t: 'Flyer / folder', d: 'Material de divulgação pra ótica e ponto de venda.', b: [['Baixar PDF', 'pdf']] },
    ],
  },
]

function DisabledBtn({ label, kind }) {
  const Icon = kind === 'pdf' ? DownloadSimple : ArrowSquareOut
  return (
    <span
      aria-disabled="true"
      className="inline-flex cursor-default items-center gap-1.5 rounded-vix-button border border-gray-200 bg-vix-cinza-card px-3 py-1.5 text-[11px] font-bold text-gray-600"
    >
      <Icon size={13} weight="bold" />
      {label}
    </span>
  )
}

function PdfBtn({ href, label, kind }) {
  const Icon = kind === 'pdf' ? DownloadSimple : ArrowSquareOut
  const dark = kind === 'pdf'
  return (
    <a
      href={href}
      {...(dark ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}
      className={`inline-flex items-center gap-1.5 rounded-vix-button border px-3 py-1.5 text-[11px] font-bold transition-colors ${
        dark
          ? 'border-vix-preto bg-vix-preto text-white hover:bg-gray-800'
          : 'border-gray-200 bg-white text-vix-preto hover:border-vix-preto'
      }`}
    >
      <Icon size={13} weight="bold" />
      {label}
    </a>
  )
}

export default function MateriaisSection() {
  return (
    <Section
      id="materiais"
      eyebrow="14 — Materiais"
      title="Materiais"
      desc="Tabela de preços e materiais de produto prontos pra enviar à ótica. Modelos de papelaria, comercial e institucional chegam em breve, editáveis no Google (Docs, Sheets, Slides)."
    >
      <SubTitle>Produtos & tabelas</SubTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PDFS.map((card) => {
          const href = `/assets/materiais/${card.f}`
          return (
            <div key={card.f} className="flex flex-col gap-3 rounded-vix-input border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between gap-2.5">
                <div className="text-[15px] font-bold text-vix-preto">{card.t}</div>
                <div className="flex shrink-0 gap-1">
                  {card.tag && (
                    <span className="rounded-vix-chip bg-vix-amarelo px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-vix-preto">
                      {card.tag}
                    </span>
                  )}
                  <span className="rounded-vix-chip bg-vix-cinza-card px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-gray-600">
                    PDF
                  </span>
                </div>
              </div>
              <p className="flex-1 text-[13px] leading-relaxed text-gray-600">{card.d}</p>
              <div className="text-[11px] text-gray-500">
                {card.meta}
                <br />
                Atualizado em {card.atualizado}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <PdfBtn href={href} label="Abrir" kind="open" />
                <PdfBtn href={href} label="Baixar PDF" kind="pdf" />
              </div>
            </div>
          )
        })}
      </div>

      {GRUPOS.map((g) => (
        <div key={g.grupo} className="mt-14">
          <SubTitle>{g.grupo}</SubTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.cards.map((card) => (
              <div key={card.t} className="flex flex-col gap-3 rounded-vix-input border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="text-[15px] font-bold text-vix-preto">{card.t}</div>
                  <span className="shrink-0 rounded-vix-chip bg-vix-cinza-card px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-gray-600">
                    Em breve
                  </span>
                </div>
                <p className="flex-1 text-[13px] leading-relaxed text-gray-600">{card.d}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.b.map(([label, kind]) => (
                    <DisabledBtn key={label} label={label} kind={kind} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  )
}
