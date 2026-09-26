import { Section, SubTitle } from '../Section.jsx'
import { UserCircle, Coffee, Eye, CheckCircle, XCircle, Sparkle, Eyeglasses, Warning } from '@phosphor-icons/react'

const CENAS = [
  {
    Icon: UserCircle, bar: '#FAC617', title: 'Retrato próximo',
    desc: 'Enquadramento busto a rosto. Foco nos olhos — lente visível e transparente. Luz suave lateral ou difusa. Expressão natural, não posada.',
    ok: ['Lente transparente, olhos visíveis', 'Fundo neutro ou desfocado'],
    no: ['Reflexo opaco bloqueando os olhos'],
  },
  {
    Icon: Coffee, bar: '#615FFF', title: 'Lifestyle / ambiente',
    desc: 'Pessoa em contexto real — trabalho, leitura, rua. Óculos integrado ao momento, não protagonista. Luz natural preferencial.',
    ok: ['Contexto legível e coerente', 'Pele com textura natural'],
    no: ['Plástico/AI — pele lisa demais'],
  },
  {
    Icon: Eye, bar: '#30D389', title: 'Detalhe de produto',
    desc: 'Close na armação ou na lente — detalhe de material, acabamento ou tratamento AR. Fundo clean, profundidade de campo rasa.',
    ok: ['Foco nítido no detalhe relevante', 'Reflexo AR visível e controlado'],
    no: ['Fundo carregado ou sem foco'],
  },
]

const GALERIA = [
  { src: '/fotos/Frame 32-4.jpg', tag: 'Retrato', cap: 'Luz natural · lente transparente · expressão genuína' },
  { src: '/fotos/Frame 33-1.jpg', tag: 'Lifestyle', cap: 'Contexto real · luz ambiente · natural' },
  { src: '/fotos/Frame 48095592.jpg', tag: 'Detalhe', cap: 'Close armação · acabamento · tratamento visível' },
]

export default function FotografiaSection() {
  return (
    <Section
      id="fotografia"
      eyebrow="02 — Marca"
      title="Fotografia"
      desc="A fotografia Vixlens mostra pessoas reais usando óculos em contextos cotidianos. Tom natural, luz ambiente, rostos com expressão genuína. O produto aparece como parte da vida — não como objeto de catálogo. Lentes com mínimo de reflexo: transparência é sinal de qualidade de tratamento."
    >
      <SubTitle>Direção de cena</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {CENAS.map((c) => (
          <div key={c.title} className="overflow-hidden rounded-[24px] bg-vix-preto">
            <div className="h-1.5" style={{ background: c.bar }} />
            <div className="p-7">
              <c.Icon size={28} weight="regular" style={{ color: c.bar }} />
              <div className="mb-2.5 mt-3 text-[15px] font-bold text-white">{c.title}</div>
              <p className="text-[13px] leading-relaxed text-white/60">{c.desc}</p>
              <div className="mt-5 flex flex-col gap-1.5">
                {c.ok.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[11px] text-[#30D389]">
                    <CheckCircle size={14} weight="fill" /> {t}
                  </div>
                ))}
                {c.no.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[11px] text-[#FF6566]">
                    <XCircle size={14} weight="fill" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubTitle>Galeria — 1 exemplo de cada tipo</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GALERIA.map((g) => (
          <div key={g.tag} className="relative aspect-3/4 overflow-hidden rounded-[20px]">
            <img src={g.src} alt={g.tag} className="h-full w-full object-cover object-top" loading="lazy" />
            <div className="absolute left-3 top-3 rounded-lg bg-vix-preto/70 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-xs">
              {g.tag}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3.5 pb-3.5 pt-5 text-[11px] text-white/80">
              {g.cap}
            </div>
          </div>
        ))}
      </div>

      <SubTitle>Comparativo de tratamento AR</SubTitle>
      <p className="mb-5 text-[13px] leading-relaxed text-gray-600">
        O reflexo residual do AR é uma qualidade técnica — não um defeito visual. A diferença entre
        lente sem tratamento e com Reflecta é imediatamente visível. Use em materiais de venda e
        treinamento.
      </p>
      <div className="relative overflow-hidden rounded-[24px]">
        <img src="/fotos/Frame 32-3.jpg" alt="Comparativo AR" className="h-[420px] w-full object-cover" style={{ objectPosition: 'center 40%' }} />
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/60" />
        <div className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-vix-preto/85 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-vix-amarelo backdrop-blur-sm">
          Diferença visual do tratamento AR
        </div>
        <div className="absolute bottom-3 left-3 right-[53%] rounded-[10px] bg-[#dc2626]/90 px-3 py-2 text-center backdrop-blur-sm md:bottom-5 md:left-[5%] md:right-[55%]">
          <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-white">✗ Sem AR</div>
          <div className="text-[11px] leading-snug text-white/80">Reflexo opaco · olhos encobertos</div>
        </div>
        <div className="absolute bottom-3 left-[53%] right-3 rounded-[10px] bg-[#10a166]/90 px-3 py-2 text-center backdrop-blur-sm md:bottom-5 md:left-[55%] md:right-[5%]">
          <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-white">✓ Reflecta AR</div>
          <div className="text-[11px] leading-snug text-white/80">Residual mínimo · olhos visíveis</div>
        </div>
      </div>

      {/* O que evitar */}
      <SubTitle className="mt-14">O que evitar</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EVITAR.map((e) => (
          <div key={e.t} className="overflow-hidden rounded-[14px] border-[1.5px] border-[#FF6566]">
            <div className="flex items-center gap-1.5 bg-[#FF6566] px-3 py-2">
              <XCircle size={13} weight="bold" className="text-white" />
              <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-vix-preto">{e.t}</span>
            </div>
            <div className="bg-[#FFF0F0] p-3.5">
              <div className="mb-2.5 flex h-[90px] items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-[#FECDD3] bg-gray-100">
                <e.Icon size={24} className="text-gray-600" />
              </div>
              <div className="text-[11px] leading-relaxed text-gray-700">{e.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Especificações técnicas */}
      <SubTitle>Especificações técnicas</SubTitle>
      <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SPECS.map(([label, val, sub]) => (
          <div key={label} className="rounded-2xl bg-vix-cinza-card p-5">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">{label}</div>
            <div className="text-[22px] font-bold text-vix-preto">{val}</div>
            <div className="mt-1 text-xs text-gray-600">{sub}</div>
          </div>
        ))}
      </div>

      {/* Regras de uso */}
      <SubTitle>Regras de uso</SubTitle>
      <div className="flex flex-col gap-2.5">
        {REGRAS.map((r) => (
          <div key={r.t} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3.5">
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${r.ok ? 'bg-[#EDFBF4] text-[#10a166]' : 'bg-[#FFF0F0] text-[#dc2626]'}`}>
              {r.ok ? '✓' : '✗'}
            </div>
            <span className="text-[13px] leading-relaxed text-gray-600">{r.t}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

const EVITAR = [
  { t: 'Reflexo opaco', Icon: Eye, d: 'Reflexo total encobrindo os olhos. Perde o sinal de qualidade do tratamento.' },
  { t: 'Estética AI', Icon: Sparkle, d: 'Pele lisa demais, olhos perfeitos. Descartado automaticamente.' },
  { t: 'Produto sem pessoa', Icon: Eyeglasses, d: 'Armação flutuando em fundo branco. Só para fichas técnicas.' },
  { t: 'Fundo carregado', Icon: Warning, d: 'Ambiente desfoca a leitura — atenção vai pro cenário, não pra lente.' },
]
const SPECS = [
  ['Resolução mínima', '2000 × 3000 px', '300 dpi impressão · 72 dpi digital'],
  ['Formato de entrega', 'JPG · PNG · TIFF', 'TIFF sem compressão para masters'],
  ['Proporções comuns', '3:4 · 1:1 · 16:9', '3:4 retratos · 16:9 hero banners'],
  ['Tom de cor', 'Neutro / Quente', 'Sem filtro frio. 5.000–6.500K'],
  ['Iluminação', 'Natural / Difusa', 'Evitar luz direta. Softbox ou janela'],
  ['Reflexo AR máx.', '< 20% da lente', 'Residual visível ok · opaco total não'],
]
const REGRAS = [
  { ok: true, t: 'Pessoas reais, expressões naturais. Luz ambiente ou difusa. Óculos integrado ao rosto — não centralizado artificialmente.' },
  { ok: true, t: 'Lente transparente é o padrão visual de qualidade Vixlens. Priorizar ângulos e luz que minimizem reflexo opaco.' },
  { ok: true, t: 'Residual de AR (reflexo suave e colorido) é aceitável e tecnicamente correto — comunica que a lente tem tratamento.' },
  { ok: true, t: 'Diversidade de perfil, faixa etária e contexto. O portfólio deve representar o espectro real de clientes Vixlens.' },
  { ok: false, t: 'Não usar imagens geradas por IA como material de marca. Pele, olhos e armação com tratamento excessivo são descartados.' },
  { ok: false, t: 'Não usar fotos de stock sem curadoria. Toda imagem no banco deve ter sido aprovada pelo responsável de marca.' },
  { ok: false, t: 'Não aplicar filtros de cor globais — edições permitidas apenas em exposição, contraste e balanço de branco.' },
]
