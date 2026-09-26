import { Section, SubTitle } from '../Section.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'
import { PropsTable, DosDonts } from './ComponentDocs.jsx'
import { CodeBlock } from '../Copy.jsx'

const INPUT_PROPS = [
  { prop: 'type', tipo: 'text | email | password | number …', padrao: '"text"', desc: 'Tipo do campo HTML — define teclado, validação e mascaramento.' },
  { prop: 'placeholder', tipo: 'string', padrao: '—', desc: 'Texto de exemplo dentro do campo. Não substitui o label.' },
  { prop: 'disabled', tipo: 'boolean', padrao: 'false', desc: 'Desabilita o campo, bloqueando foco e edição.' },
  { prop: 'value / onChange', tipo: 'string / function', padrao: '—', desc: 'Par controlado — o valor vem do estado e onChange o atualiza.' },
]

export default function InputsSection() {
  return (
    <Section
      id="inputs"
      eyebrow="11 — Componentes"
      title="Inputs"
      desc="Estilo luma: campo PREENCHIDO (fill cinza suave, sem borda), altura 36px, radius 24px, foco preto com ring sutil e texto 14px."
    >
      <div className="max-w-md">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="input-otica" className="text-sm font-medium text-vix-preto">
              Nome da ótica
            </label>
            <Input id="input-otica" placeholder="Ex: Ótica Vixlens" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="input-email" className="text-sm font-medium text-vix-preto">
              E-mail
            </label>
            <Input id="input-email" type="email" placeholder="contato@otica.com.br" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="input-desabilitado" className="text-sm font-medium text-vix-preto">
              Desabilitado
            </label>
            <Input id="input-desabilitado" placeholder="Indisponível" disabled />
          </div>
          <Button variant="dark" className="mt-1 w-full">Enviar cadastro</Button>
        </div>
      </div>

      <SubTitle className="mt-12">Especificação</SubTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ['Altura', '36px'],
          ['Padding lateral', '14px'],
          ['Radius', '24px'],
          ['Texto', '14px'],
          ['Fundo', 'cinza suave'],
          ['Foco', '#1D1D1F'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-vix-input border border-gray-200 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-gray-600">{k}</div>
            <div className="mt-1 font-mono text-sm font-bold text-vix-preto">{v}</div>
          </div>
        ))}
      </div>

      <SubTitle className="mt-14">Estados</SubTitle>
      <div className="mb-2 max-w-md">
        <div className="flex flex-col gap-5">
          {/* htmlFor/id explícitos: o label envolvendo o campo já associa, mas os
              auditores de acessibilidade só reconhecem com a ligação declarada. */}
          <div className="flex flex-col gap-2">
            <label htmlFor="input-demo-default" className="text-[11px] uppercase tracking-widest text-gray-600">
              Default
            </label>
            <Input id="input-demo-default" placeholder="Digite aqui" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="input-demo-foco" className="text-[11px] uppercase tracking-widest text-gray-600">
              Foco (ring)
            </label>
            <Input id="input-demo-foco" placeholder="Clique para ver o ring de foco" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="input-demo-disabled" className="text-[11px] uppercase tracking-widest text-gray-600">
              Disabled
            </label>
            <Input id="input-demo-disabled" placeholder="Indisponível" disabled />
          </div>
        </div>
      </div>

      <SubTitle className="mt-14">Props</SubTitle>
      <PropsTable rows={INPUT_PROPS} />

      <SubTitle className="mt-12">Do &amp; Don't</SubTitle>
      <DosDonts
        dos={[
          'Sempre associar um label ao campo.',
          'Usar o placeholder como exemplo, não como label.',
          'Mostrar mensagem de erro clara abaixo do campo.',
        ]}
        donts={[
          'Usar o placeholder no lugar do label.',
          'Deixar o campo sem indicação visível de foco.',
          'Largura minúscula para um dado longo (e-mail, endereço).',
        ]}
      />

      <SubTitle className="mt-12">Código</SubTitle>
      <CodeBlock
        code={`import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Label htmlFor="otica">Nome da ótica</Label>
<Input id="otica" placeholder="Ex: Ótica Vixlens" />`}
      />
    </Section>
  )
}
