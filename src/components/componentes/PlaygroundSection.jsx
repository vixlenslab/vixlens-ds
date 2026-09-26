import { Section } from '../Section.jsx'
import { Playground } from './Playground.jsx'
import { Button } from '../ui/button.jsx'
import { Badge } from '../ui/badge.jsx'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert.jsx'
import { Input } from '../ui/input.jsx'
import { Label } from '../ui/label.jsx'

// Gera código LIMPO — só as props não-default.
function buttonCode({ variant, size, disabled }) {
  const props = []
  if (variant && variant !== 'default') props.push(`variant="${variant}"`)
  if (size && size !== 'default') props.push(`size="${size}"`)
  if (disabled) props.push('disabled')
  const attrs = props.length ? ' ' + props.join(' ') : ''
  return `<Button${attrs}>Ação</Button>`
}

function badgeCode({ variant }) {
  const attrs = variant && variant !== 'default' ? ` variant="${variant}"` : ''
  return `<Badge${attrs}>Novo</Badge>`
}

function alertCode({ variant }) {
  const attrs = variant && variant !== 'default' ? ` variant="${variant}"` : ''
  return `<Alert${attrs}>
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription>
    Confira os dados antes de continuar.
  </AlertDescription>
</Alert>`
}

function inputCode({ disabled }) {
  const attrs = disabled ? ' disabled' : ''
  return `<Label htmlFor="email">E-mail</Label>
<Input id="email" placeholder="voce@vixlens.com"${attrs} />`
}

export default function PlaygroundSection() {
  return (
    <Section
      id="playground"
      eyebrow="14 — Componentes"
      title="Playground"
      desc="Mexa nas props e veja o componente mudar — o código atualiza junto, é só copiar."
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Button */}
        <Playground
          title="Button"
          controls={[
            {
              key: 'variant',
              label: 'variant',
              type: 'select',
              default: 'default',
              options: [
                { value: 'default', label: 'default' },
                { value: 'dark', label: 'dark' },
                { value: 'secondary', label: 'secondary' },
                { value: 'outline', label: 'outline' },
                { value: 'ghost', label: 'ghost' },
                { value: 'destructive', label: 'destructive' },
                { value: 'link', label: 'link' },
              ],
            },
            {
              key: 'size',
              label: 'size',
              type: 'select',
              default: 'default',
              options: [
                { value: 'sm', label: 'sm' },
                { value: 'default', label: 'default' },
                { value: 'lg', label: 'lg' },
              ],
            },
            { key: 'disabled', label: 'disabled', type: 'toggle', default: false },
          ]}
          render={({ variant, size, disabled }) => (
            <Button variant={variant} size={size} disabled={disabled}>
              Ação
            </Button>
          )}
          code={buttonCode}
        />

        {/* Badge */}
        <Playground
          title="Badge"
          controls={[
            {
              key: 'variant',
              label: 'variant',
              type: 'select',
              default: 'default',
              options: [
                { value: 'default', label: 'default' },
                { value: 'secondary', label: 'secondary' },
                { value: 'destructive', label: 'destructive' },
                { value: 'outline', label: 'outline' },
              ],
            },
          ]}
          render={({ variant }) => <Badge variant={variant}>Novo</Badge>}
          code={badgeCode}
        />

        {/* Alert */}
        <Playground
          title="Alert"
          controls={[
            {
              key: 'variant',
              label: 'variant',
              type: 'select',
              default: 'default',
              options: [
                { value: 'default', label: 'default' },
                { value: 'destructive', label: 'destructive' },
              ],
            },
          ]}
          render={({ variant }) => (
            <Alert variant={variant} className="max-w-md text-left">
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>Confira os dados antes de continuar.</AlertDescription>
            </Alert>
          )}
          code={alertCode}
        />

        {/* Input */}
        <Playground
          title="Input"
          controls={[
            { key: 'disabled', label: 'disabled', type: 'toggle', default: false },
          ]}
          render={({ disabled }) => (
            <div className="w-full max-w-xs text-left [&>:not([hidden])~:not([hidden])]:mt-1.5">
              <Label htmlFor="pg-input-email">E-mail</Label>
              <Input id="pg-input-email" placeholder="voce@vixlens.com" disabled={disabled} />
            </div>
          )}
          code={inputCode}
        />
      </div>
    </Section>
  )
}
