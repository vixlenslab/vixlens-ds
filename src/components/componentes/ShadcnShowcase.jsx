import { useState } from 'react'
import { Section, SubTitle } from '../Section.jsx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { WarningCircle, CaretDown } from '@phosphor-icons/react'
import { PropsTable } from './ComponentDocs.jsx'
import shadcnProps from '../../data/shadcnProps.js'

/**
 * PropsDocs — bloco <details> nativo, discreto, com a doc de props do componente.
 * docKey: chave em shadcnProps. label opcional exibido ao lado de "Props".
 */
function PropsDocs({ docKey, label }) {
  const entry = shadcnProps[docKey]
  if (!entry) return null
  return (
    <details className="group mt-1 w-full border-t border-gray-100 pt-3">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-gray-600 transition-colors hover:text-vix-preto [&::-webkit-details-marker]:hidden">
        <CaretDown size={11} weight="bold" className="transition-transform duration-200 group-open:rotate-180" />
        Props{label ? <span className="text-gray-600 normal-case tracking-normal">· {label}</span> : null}
      </summary>
      <div className="mt-3 flex flex-col gap-3">
        <p className="text-[12px] leading-relaxed text-gray-600">{entry.uso}</p>
        <PropsTable rows={entry.props} />
      </div>
    </details>
  )
}

function Cell({ title, children, docKey }) {
  return (
    <div className="flex flex-col gap-4 rounded-vix-input border border-gray-200 bg-white p-6">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-gray-600">{title}</div>
      <div className="flex flex-1 flex-wrap items-center gap-4">{children}</div>
      {docKey && <PropsDocs docKey={docKey} />}
    </div>
  )
}

export default function ShadcnShowcase() {
  const [slider, setSlider] = useState([60])
  return (
    <TooltipProvider>
      <Section
        id="shadcn"
        eyebrow="13.5 — Componentes"
        title="Biblioteca shadcn/ui"
        desc="A biblioteca shadcn completa, com o tema Vixlens aplicado via CSS variables — todo componente nasce on-brand (amarelo primary, preto, cinzas do DS, radius Vixlens). Compõe, não reinventa."
      >
        <SubTitle>Seleção & entrada</SubTitle>
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Cell title="Switch" docKey="switch">
            <Switch defaultChecked aria-label="Exemplo de switch ligado" /> <Switch aria-label="Exemplo de switch desligado" />
          </Cell>
          <Cell title="Checkbox" docKey="checkbox">
            <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1">Aceito</Label></div>
          </Cell>
          <Cell title="Radio" docKey="radio">
            <RadioGroup defaultValue="a" className="flex gap-4">
              <div className="flex items-center gap-2"><RadioGroupItem value="a" id="ra" /><Label htmlFor="ra">Opção A</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="b" id="rb" /><Label htmlFor="rb">Opção B</Label></div>
            </RadioGroup>
          </Cell>
          <Cell title="Select" docKey="select">
            <Select>
              <SelectTrigger className="w-48" aria-label="Escolha uma lente"><SelectValue placeholder="Escolha uma lente" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="total">VixTotal</SelectItem>
                <SelectItem value="one">Freevix One</SelectItem>
                <SelectItem value="astera">Astera</SelectItem>
              </SelectContent>
            </Select>
          </Cell>
          <Cell title="Slider" docKey="slider">
            <div className="w-full">
              <Slider value={slider} onValueChange={setSlider} max={100} step={1} aria-label="Exemplo de slider" />
              <div className="mt-2 font-mono text-xs text-gray-600">{slider[0]}%</div>
            </div>
          </Cell>
          <Cell title="Textarea" docKey="textarea">
            <Textarea placeholder="Observações do pedido..." className="min-h-[80px]" />
          </Cell>
        </div>

        <SubTitle>Feedback & dados</SubTitle>
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Cell title="Badge" docKey="badge">
            <Badge>Novo</Badge> <Badge variant="secondary">Beta</Badge> <Badge variant="outline">v0.4</Badge> <Badge variant="destructive">Crítico</Badge>
          </Cell>
          <Cell title="Progress" docKey="progress">
            <div className="w-full"><Progress value={slider[0]} aria-label="Exemplo de barra de progresso" /></div>
          </Cell>
          <Cell title="Avatar" docKey="avatar">
            <Avatar><AvatarFallback>VX</AvatarFallback></Avatar>
            <Avatar><AvatarFallback className="bg-vix-amarelo text-vix-preto">MK</AvatarFallback></Avatar>
          </Cell>
          <Cell title="Separator" docKey="separator">
            <div className="w-full text-sm text-gray-600">Acima<Separator className="my-3" />Abaixo</div>
          </Cell>
          <div className="md:col-span-2">
            <Alert>
              <WarningCircle className="size-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>Alerta com o tema Vixlens. Barra e ícone on-brand.</AlertDescription>
            </Alert>
            <PropsDocs docKey="alert" label="Alert" />
          </div>
        </div>

        <SubTitle>Overlays</SubTitle>
        <div className="mb-10">
          <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild><Button variant="dark">Abrir Dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar ação</DialogTitle>
                <DialogDescription>Dialog shadcn com tema Vixlens. Radius e cores do DS.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
            <PopoverContent>Conteúdo flutuante on-brand.</PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="secondary">Hover pro Tooltip</Button></TooltipTrigger>
            <TooltipContent>Tooltip Vixlens</TooltipContent>
          </Tooltip>
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <PropsDocs docKey="dialog" label="Dialog" />
            <PropsDocs docKey="popover" label="Popover" />
            <PropsDocs docKey="tooltip" label="Tooltip" />
          </div>
        </div>

        <SubTitle>Navegação & conteúdo</SubTitle>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-vix-input border border-gray-200 bg-white p-6">
            <Tabs defaultValue="marca">
              <TabsList>
                <TabsTrigger value="marca">Marca</TabsTrigger>
                <TabsTrigger value="lentes">Lentes</TabsTrigger>
                <TabsTrigger value="ar">Reflecta</TabsTrigger>
              </TabsList>
              <TabsContent value="marca" className="pt-4 text-[13px] text-gray-600">Identidade, logo e aplicações.</TabsContent>
              <TabsContent value="lentes" className="pt-4 text-[13px] text-gray-600">Linha Freevix, 11 produtos.</TabsContent>
              <TabsContent value="ar" className="pt-4 text-[13px] text-gray-600">Tratamentos antirreflexo.</TabsContent>
            </Tabs>
            <PropsDocs docKey="tabs" label="Tabs" />
          </div>
          <div className="rounded-vix-input border border-gray-200 bg-white p-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="1"><AccordionTrigger>O que é a Matriz Marca Própria?</AccordionTrigger><AccordionContent>Espelho da tabela Vixlens: material, índice e desenho da lente.</AccordionContent></AccordionItem>
              <AccordionItem value="2"><AccordionTrigger>Como funciona o AR Reflecta?</AccordionTrigger><AccordionContent>Reflexo residual mínimo, cada cor é um tipo de tratamento.</AccordionContent></AccordionItem>
            </Accordion>
            <PropsDocs docKey="accordion" label="Accordion" />
          </div>
        </div>

        <SubTitle className="mt-10">Tabela</SubTitle>
        <div className="overflow-x-auto rounded-vix-input border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Produto</TableHead><TableHead>Linha</TableHead><TableHead>Formatos</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>VixTotal</TableCell><TableCell>Lentes</TableCell><TableCell>SVG · PNG · PDF · WebP</TableCell></TableRow>
              <TableRow><TableCell>Reflecta Guard</TableCell><TableCell>Reflecta</TableCell><TableCell>SVG · PNG · PDF · WebP</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <PropsDocs docKey="table" label="Table" />
        </div>
      </Section>
    </TooltipProvider>
  )
}
