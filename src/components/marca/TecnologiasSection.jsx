import { Section, SubTitle } from '../Section.jsx'
import { DownloadSimple } from '@phosphor-icons/react'

// Nomes e descrições transcritos do folder de tecnologias (mesma fonte do deck).
const TECNOLOGIAS = [
  { id: 'freeform', nome: 'freeform', desc: 'Cálculo digital ponto a ponto que permite criar superfícies ópticas complexas, com estética superior, adaptação mais rápida e campos de visão mais amplos.' },
  { id: 'wideview', nome: 'WideView', desc: 'Amplia os campos da progressiva, com zona de longe maior, corredor mais fluido, perto mais confortável e menos zonas turvas laterais.' },
  { id: 'adapt', nome: 'Adapt', desc: 'Adapta o corredor à geometria da armação, permitindo progressivas em modelos menores e modernos sem comprometer o conforto visual.' },
  { id: 'softview', nome: 'SoftView', desc: 'Reduz o cansaço visual em até 80% no uso de telas, com campo de perto ampliado e mais conforto para celular e computador.' },
  { id: 'duo', nome: 'Duo', desc: 'Calcula os dois olhos de forma sincronizada, favorecendo melhor binocularidade, foco mais rápido, percepção de profundidade e menos esforço visual.' },
  { id: 'vixsense', nome: 'VixSense', desc: 'Usa o contorno real da armação no cálculo, deslocando distorções para fora da área útil e entregando visão mais nítida e estável.' },
  { id: 'pointlight', nome: 'PointLight', desc: 'Simula a luz dentro da lente antes da fabricação, otimizando cada ponto para mais nitidez em perto, longe e distâncias intermediárias.' },
  { id: 'mapping', nome: 'Mapping', desc: 'Calcula a lente para o rosto real do usuário, usando 6 medidas individuais, como ângulo dos óculos, curvatura e distância vértice.' },
  { id: 'vixslim', nome: 'VixSlim', desc: 'Deixa a lente até 30% mais fina que o padrão, reduzindo espessura e peso para óculos mais leves, discretos e confortáveis.' },
  { id: 'smartview', nome: 'SmartView', desc: 'Inteligência artificial que otimiza a superfície da lente ponto a ponto, usando dados individuais para mais precisão, nitidez e conforto.' },
  { id: 'pixel', nome: 'Pixel', desc: 'Expande o campo intermediário para telas e preserva a postura ergonômica, reduzindo movimentos de cabeça e esforço no pescoço.' },
  { id: 'vixcontrol', nome: 'VixControl', desc: 'Tecnologia para controle da miopia, com raio de transição de 22 mm, zona central de 12 mm e redução da progressão em até 60%.' },
]

const LENTES = [
  { id: 'vix-total', nome: 'Vix Total', familia: 'Multifocal' },
  { id: 'freevix-one', nome: 'Freevix One', familia: 'Multifocal' },
  { id: 'freevix-premium', nome: 'Freevix Premium', familia: 'Multifocal' },
  { id: 'freevix-freedom', nome: 'Freevix Freedom', familia: 'Multifocal' },
  { id: 'freevix-ia-tech', nome: 'Freevix IA Tech', familia: 'Multifocal' },
  { id: 'freevix-deskview-1-3m', nome: 'Freevix Deskview até 1,3M', familia: 'Ocupacional' },
  { id: 'freevix-deskview-2m', nome: 'Freevix Deskview até 2M', familia: 'Ocupacional' },
  { id: 'freevix-office-4m', nome: 'Freevix Office até 4M', familia: 'Ocupacional' },
  { id: 'freevix-vs', nome: 'Freevix VS', familia: 'Visão simples' },
  { id: 'freevix-vs-hd', nome: 'Freevix VS HD', familia: 'Visão simples' },
  { id: 'freevix-vs-relax', nome: 'Freevix VS Relax', familia: 'Visão simples' },
  { id: 'astera', nome: 'Astera', familia: 'Controle de miopia' },
]

// Data em que os arquivos de cada bloco entraram ou foram trocados no DS.
const ATUALIZADO = { tecnologias: '24/09/2026', lentes: '24/09/2026' }

const TEC = '/assets/marca/tecnologias'
const DES = '/assets/marca/desenhos-lentes'

function Baixar({ href, label, primary }) {
  return (
    <a
      href={href}
      download
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
        primary
          ? 'bg-vix-preto text-white hover:bg-[#333]'
          : 'border border-gray-300 text-vix-preto hover:bg-vix-cinza-card'
      }`}
    >
      {label}
    </a>
  )
}

function Kit({ titulo, desc, href, atualizado }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 rounded-vix-card border border-gray-200 bg-vix-cinza-card p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-lg font-bold text-vix-preto">{titulo}</div>
        <div className="mt-1.5 text-[13px] leading-relaxed text-gray-600">{desc}</div>
        <div className="mt-1 text-[11px] text-gray-500">Atualizado em {atualizado}</div>
      </div>
      <a
        href={href}
        download
        className="inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-vix-button bg-vix-preto px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#333333] md:self-auto"
      >
        <DownloadSimple size={15} weight="bold" />
        Baixar .zip
      </a>
    </div>
  )
}

export default function TecnologiasSection() {
  return (
    <Section
      id="tecnologias"
      eyebrow="02.5 — Marca"
      title="Tecnologias & lentes"
      desc="Ícones das tecnologias Vixlens e o desenho de cada lente do portfólio, em SVG. Os arquivos são transparentes; o fundo é só pra visualização."
    >
      <SubTitle>Ícones de tecnologia</SubTitle>
      <p className="-mt-1 mb-5 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        Cada tecnologia tem o ícone sozinho e o lockup (ícone + nome). Os SVGs não têm cor fixa: saem em
        preto e aceitam qualquer cor da paleta.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECNOLOGIAS.map((t) => (
          <figure key={t.id} className="m-0 flex flex-col overflow-hidden rounded-vix-input border border-gray-200 bg-white">
            <div className="flex h-[110px] items-center justify-center gap-6 bg-vix-cinza-card p-6">
              <img src={`${TEC}/icones/${t.id}.svg`} alt="" loading="lazy" className="h-9 w-9 object-contain" />
              <span className="h-10 w-px bg-gray-300" />
              <img src={`${TEC}/lockups/${t.id}.svg`} alt={t.nome} loading="lazy" className="h-6 max-w-[150px] object-contain" />
            </div>
            <figcaption className="flex flex-1 flex-col border-t border-gray-200 p-4">
              <div className="text-sm font-bold text-vix-preto">{t.nome}</div>
              <p className="mb-3 mt-1 flex-1 text-[12px] leading-relaxed text-gray-600">{t.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                <Baixar href={`${TEC}/icones/${t.id}.svg`} label="Ícone SVG" primary />
                <Baixar href={`${TEC}/lockups/${t.id}.svg`} label="Lockup SVG" />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <Kit
        titulo="Kit — Ícones de tecnologia"
        desc={`${TECNOLOGIAS.length} tecnologias × ícone e lockup, em SVG, num único .zip.`}
        href={`${TEC}/tecnologias-vixlens-svg.zip`}
        atualizado={ATUALIZADO.tecnologias}
      />

      <SubTitle className="mt-14">Desenho de lentes</SubTitle>
      <p className="-mt-1 mb-5 max-w-2xl text-[13px] leading-relaxed text-gray-600">
        O mapa de cada lente, como sai no folder: zonas de visão, corredor e alcance.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {LENTES.map((l) => (
          <figure key={l.id} className="m-0 flex flex-col overflow-hidden rounded-vix-input border border-gray-200 bg-white">
            <div className="flex h-[150px] items-center justify-center bg-white p-5">
              <img src={`${DES}/${l.id}.svg`} alt={`Desenho da lente ${l.nome}`} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
            <figcaption className="border-t border-gray-200 p-4">
              <div className="text-xs font-bold text-vix-preto">{l.nome}</div>
              <div className="mb-2.5 mt-0.5 text-[11px] text-gray-500">{l.familia}</div>
              <Baixar href={`${DES}/${l.id}.svg`} label="SVG" primary />
            </figcaption>
          </figure>
        ))}
      </div>
      <Kit
        titulo="Kit — Desenho de lentes"
        desc={`${LENTES.length} desenhos em SVG num único .zip.`}
        href={`${DES}/desenhos-lentes-vixlens-svg.zip`}
        atualizado={ATUALIZADO.lentes}
      />
    </Section>
  )
}
