import { Section, SubTitle } from '../Section.jsx'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '../ui/chart.jsx'
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
} from 'recharts'
import { CheckCircle, XCircle } from '@phosphor-icons/react'
import { CodeBlock } from '../Copy.jsx'

/* ---------------------------------------------------------------- paleta */

const paleta = [
  { key: 'chart-1', name: 'Amarelo', hex: '#FAC617', note: 'Lidera. Primeira série.' },
  { key: 'chart-2', name: 'Azul', hex: '#0439D9', note: 'Segunda série.' },
  { key: 'chart-3', name: 'Roxo', hex: '#615FFF', note: 'Terceira série.' },
  { key: 'chart-4', name: 'Verde', hex: '#30D389', note: 'Quarta série.' },
  { key: 'chart-5', name: 'Cinza', hex: '#606F7F', note: 'Neutro / resto.' },
]

/* ------------------------------------------------------------ dados (fake) */

const cadastrosData = [
  { mes: 'Jan', novos: 42, recorrentes: 18 },
  { mes: 'Fev', novos: 55, recorrentes: 24 },
  { mes: 'Mar', novos: 61, recorrentes: 30 },
  { mes: 'Abr', novos: 58, recorrentes: 35 },
  { mes: 'Mai', novos: 72, recorrentes: 41 },
  { mes: 'Jun', novos: 84, recorrentes: 47 },
]

const cadastrosConfig = {
  novos: { label: 'Novos', color: 'var(--chart-1)' },
  recorrentes: { label: 'Recorrentes', color: 'var(--chart-2)' },
}

const pedidosData = [
  { dia: 'Seg', pedidos: 24 },
  { dia: 'Ter', pedidos: 31 },
  { dia: 'Qua', pedidos: 28 },
  { dia: 'Qui', pedidos: 39 },
  { dia: 'Sex', pedidos: 52 },
  { dia: 'Sáb', pedidos: 61 },
  { dia: 'Dom', pedidos: 33 },
]

const pedidosConfig = {
  pedidos: { label: 'Pedidos', color: 'var(--chart-4)' },
}

const lentesData = [
  { tipo: 'simples', valor: 45, fill: 'var(--color-simples)' },
  { tipo: 'multifocal', valor: 27, fill: 'var(--color-multifocal)' },
  { tipo: 'bifocal', valor: 15, fill: 'var(--color-bifocal)' },
  { tipo: 'ocupacional', valor: 8, fill: 'var(--color-ocupacional)' },
  { tipo: 'outras', valor: 5, fill: 'var(--color-outras)' },
]

const lentesConfig = {
  valor: { label: 'Lentes' },
  simples: { label: 'Visão simples', color: 'var(--chart-1)' },
  multifocal: { label: 'Multifocal', color: 'var(--chart-2)' },
  bifocal: { label: 'Bifocal', color: 'var(--chart-3)' },
  ocupacional: { label: 'Ocupacional', color: 'var(--chart-4)' },
  outras: { label: 'Outras', color: 'var(--chart-5)' },
}

/* ------------------------------------------------------------------- code */

const exemploCodigo = `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, CartesianGrid, XAxis } from 'recharts'

const config = {
  novos: { label: 'Novos', color: 'var(--chart-1)' },
}

const data = [
  { mes: 'Jan', novos: 42 },
  { mes: 'Fev', novos: 55 },
  { mes: 'Mar', novos: 61 },
]

export function Grafico() {
  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="novos" fill="var(--color-novos)" radius={6} />
      </BarChart>
    </ChartContainer>
  )
}`

/* --------------------------------------------------------------- pequenos */

function ChartCard({ title, children }) {
  return (
    <div className="rounded-vix-card border border-gray-200 bg-white p-6">
      <div className="mb-4 text-[15px] font-bold text-vix-preto">{title}</div>
      {children}
    </div>
  )
}

const axisProps = { tickLine: false, axisLine: false, tickMargin: 8 }

/* --------------------------------------------------------------- section */

export default function DataVizSection() {
  return (
    <Section
      id="dataviz"
      eyebrow="11 — Fundamentos"
      title="Data-viz"
      desc="Cor e forma para dados. Paleta categórica dedicada, eixos discretos, foco no dado — não na decoração."
    >
      {/* 1 · Paleta pra dado ------------------------------------------- */}
      <SubTitle>Paleta pra dado</SubTitle>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Uma paleta <strong className="text-vix-preto">categórica</strong> separa séries distintas —
        não é a mesma coisa que cor de marca. O amarelo <span className="font-mono">#FAC617</span>{' '}
        lidera; as demais entram na ordem para diferenciar categorias. Quando os dados têm ordem ou
        intensidade (do menor ao maior), prefira uma escala <strong className="text-vix-preto">sequencial</strong>{' '}
        de um mesmo tom em vez desta paleta.
      </p>
      <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {paleta.map((s) => (
          <div key={s.key} className="overflow-hidden rounded-vix-input border border-gray-200">
            <div className="h-16" style={{ background: `var(--${s.key})` }} />
            <div className="px-3 py-2.5">
              <div className="text-[13px] font-bold text-vix-preto">{s.name}</div>
              <div className="text-[11px] font-mono uppercase text-gray-600">{s.hex}</div>
              <div className="mt-1 text-[11px] leading-snug text-gray-600">{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 2 · Gráficos -------------------------------------------------- */}
      <SubTitle>Gráficos</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Barras */}
        <ChartCard title="Cadastros por mês">
          <ChartContainer config={cadastrosConfig} className="aspect-auto h-[240px] w-full">
            <BarChart data={cadastrosData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="novos" fill="var(--color-novos)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="recorrentes" fill="var(--color-recorrentes)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        {/* Área */}
        <ChartCard title="Pedidos na semana">
          <ChartContainer config={pedidosConfig} className="aspect-auto h-[240px] w-full">
            <AreaChart data={pedidosData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="dia" {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="pedidos"
                type="monotone"
                stroke="var(--color-pedidos)"
                strokeWidth={2}
                fill="var(--color-pedidos)"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>

        {/* Donut */}
        <ChartCard title="Mix de lentes">
          <ChartContainer config={lentesConfig} className="aspect-auto h-[240px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="tipo" hideLabel />} />
              <Pie
                data={lentesData}
                dataKey="valor"
                nameKey="tipo"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                strokeWidth={2}
              >
                {lentesData.map((entry) => (
                  <Cell key={entry.tipo} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="tipo" />} />
            </PieChart>
          </ChartContainer>
        </ChartCard>

        {/* Nota */}
        <div className="flex flex-col justify-center rounded-vix-card border border-dashed border-gray-200 bg-vix-cinza-card p-6">
          <div className="text-[13px] font-bold uppercase tracking-widest text-gray-600">Leitura</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Todo gráfico usa <span className="font-mono">ChartContainer</span> com um{' '}
            <span className="font-mono">config</span> — o container gera as vars{' '}
            <span className="font-mono">var(--color-&lt;chave&gt;)</span> a partir de{' '}
            <span className="font-mono">config[chave].color</span>. Assim a cor da série vive num só
            lugar e o tooltip/legenda saem on-brand de graça.
          </p>
        </div>
      </div>

      {/* 3 · Do & Don't ------------------------------------------------ */}
      <SubTitle>Faça &amp; Evite</SubTitle>
      <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-vix-card border border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle size={20} weight="fill" className="text-green-600" />
            <span className="text-[13px] font-bold uppercase tracking-widest text-vix-preto">Faça</span>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Paleta categórica para diferenciar séries.</li>
            <li>Rótulo direto no eixo ou na legenda.</li>
            <li>Eixo de valor começando no zero (barras).</li>
            <li>No máximo ~5 séries por gráfico.</li>
          </ul>
        </div>
        <div className="rounded-vix-card border border-gray-200 bg-white p-6">
          <div className="mb-3 flex items-center gap-2">
            <XCircle size={20} weight="fill" className="text-red-500" />
            <span className="text-[13px] font-bold uppercase tracking-widest text-vix-preto">Evite</span>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Amarelo como texto fino sobre branco.</li>
            <li>Degradê decorativo ou efeito 3D.</li>
            <li>Mais de 5–6 categorias sem agrupar.</li>
            <li>Cortar o eixo de barras acima do zero.</li>
          </ul>
        </div>
      </div>

      {/* 4 · Código ---------------------------------------------------- */}
      <SubTitle>Código</SubTitle>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Exemplo mínimo de barras com <span className="font-mono">ChartContainer</span>. A cor vem do{' '}
        <span className="font-mono">config</span> — nunca hard-coded no JSX.
      </p>
      <CodeBlock code={exemploCodigo} />
    </Section>
  )
}
