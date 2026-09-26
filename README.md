# Vixlens — Design System & Plugin Marketplace

Este repositório serve três coisas:

1. **Vixlens Design System** — publicado em **[ds.vixlens.com.br](https://ds.vixlens.com.br)** (Vercel)
2. **Biblioteca de componentes** — o que as telas Vixlens consomem por dependência
3. **Vixlens Plugin Marketplace** — plugins para Claude Code e Cowork

Os critérios de tecnologia de todo projeto Vixlens estão em [STACK.md](./STACK.md) — qual framework escolher, quando subir versão, quando abrir repositório novo.

---

## 1. Design System

Single-page site (`index.html`) com a documentação completa da marca:

- Cores (primárias, secundárias, dashboard, neutras)
- Tipografia (Host Grotesk web · Mont print)
- Tokens de forma (border-radius, espaçamento)
- Componentes (botões, inputs, cards, callouts)
- Voz & tom + vocabulário canônico
- Iconografia (ícones de linha + Phosphor UI)
- Logotipo & clearance
- Direção fotográfica

Documentação `.md` de referência em [`docs/`](./docs/).

### Deploy

Push pra `main` → Vercel publica automaticamente em ds.vixlens.com.br.

---

## 2. Consumir o DS numa tela

Toda tela Vixlens usa o DS por dependência — nunca copiando componente.

**1. Instalar**

```bash
npm install github:vixlenslab/vixlens-ds#main
```

O pacote se builda sozinho na instalação (script `prepare`).

**2. Herdar o Tailwind e o tema** — no `globals.css` da tela (Tailwind 4, o padrão):

```css
@import 'tailwindcss';
@import 'tw-animate-css';          /* animate-in/out dos componentes */
@import 'vixlens-ds/theme.css';    /* valores das CSS vars (tokens + shadcn) */
@import 'vixlens-ds/tailwind.css'; /* @theme: as vars viram bg-vix-*, rounded-vix-*, text-vix-h1... */

/* O Tailwind 4 não varre node_modules: sem isto as classes dos componentes somem. */
@source '../node_modules/vixlens-ds/dist-lib';
```

Sem `tailwind.config.js`: o tema inteiro vem do `@theme` gerado de `vixlens-tokens.json`.

**3. Tela ainda em Tailwind 3?** Tokens e preset continuam servindo o v3, iguais a antes:

```js
// tailwind.config.js
import vixlens from 'vixlens-ds/tailwind.preset.js'
export default { presets: [vixlens], content: ['./src/**/*.{js,jsx,ts,tsx}'] }
```

```css
/* globals.css */
@import 'vixlens-ds/theme.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Os **componentes** (`import { Button } from 'vixlens-ds'`) passaram a usar classes do Tailwind 4
(`shadow-xs`, `outline-hidden`, `ring-3`...) na v0.13.0. Em tela v3, use tokens e preset; para
usar os componentes, migre a tela (STACK.md: o DS sobe primeiro, as telas vêm atrás).

**4. Usar**

```jsx
import { Button, Card, CardHeader, cn } from 'vixlens-ds'
```

São 154 exports (componentes shadcn on-brand, Carrossel, Aviso de cookies e `cn`). Os tokens crus, se precisar:
`import tokens from 'vixlens-ds/tokens'`.

### Por que o preset e não só o CSS

A cor de borda padrão de todo elemento vem de `borderColor.DEFAULT` no preset,
porque quem emite `*{border-color}` é o preflight do Tailwind. Uma regra `*` no
`theme.css` não resolveria: o Tailwind v3 não emite `@layer` nativo, então o
preflight sai sem camada e quem for importado primeiro perde a disputa.

### Builds

| Comando | Sai em | O que é |
|---|---|---|
| `npm run build` | `dist/` | site de documentação (o que a Vercel publica) |
| `npm run build:lib` | `dist-lib/` | biblioteca (o que as telas consomem) |

React, Radix e o resto ficam externos no build de lib — as telas trazem os seus.
Duas cópias de React no mesmo app quebram hooks em runtime.

---

## 3. Plugin Marketplace

### Instalação via Claude Code

```bash
claude plugin marketplace add vixlenslab/vixlens-ds
claude plugin install vixlens-brand
claude plugin install vixlens-ui
claude plugin install vixlens-catalogo
claude plugin install vixlens-relatorios
```

Para atualizar depois de um push novo:

```bash
claude plugin marketplace update vixlens-marketplace
```

### Plugins disponíveis

#### `vixlens-brand`
Marca, documentos e comunicação B2B. 4 skills:

- **vixlens-design-system** — a mestre: paleta, tipografia, tokens, componentes, voz e vocabulário canônico. Os três abaixo carregam ela antes de escrever
- **comunicado-interno** — comunicados para o time no padrão institucional
- **manual-cliente** — manuais operacionais para clientes ópticos B2B
- **proposta-comercial** — propostas comerciais para varejistas ópticos independentes

> A skill `vixlens-brand` foi fundida na `vixlens-design-system` na 0.4.0. Duplicavam 84% das cores e todos os termos canônicos, e já tinham divergido entre si. Se você digitava `vixlens-brand`, passe a usar `vixlens-design-system`.

#### `vixlens-ui`
Interface e código de front-end. 2 skills:

- **vixlens-ui-architect** — interfaces web em React + Tailwind + shadcn fiéis ao DS
- **ui-boas-praticas** — audita e corrige telas contra 80 boas práticas de UI (tipografia, cores, botões, grid, ícones, imagens, formulários)

#### `vixlens-catalogo`
Catálogo de preço. 1 skill:

- **tabela-optica-figma** — monta no Figma o catálogo A4 de tabela de preço a partir do CSV por ótica (capa, índice, páginas por família, contracapa)

#### `vixlens-relatorios`
Relatórios mensais de venda tirados do ERP Volpe, somente leitura. 1 skill:

- **transitionsvix** — o relatório Transitions do mês: quantas lentes Transitions cada cliente levou, quem comprou lente e não levou Transitions (o alvo de oferta) e o total geral. Sai em dois arquivos: o compacto de 3 abas que o consultor recebe (sem fone, e-mail ou R$) e o completo de 5 abas para uso interno. Dispara com "Transitions de setembro", "relatório do Fabricio", "quem não levou Transitions". Traz um conferidor de 1 comando que prova que o compacto fecha com o completo e compara com o mês anterior, e sabe o que fazer quando o login do Volpe falha (regravar o cofre, nunca digitar senha).
  Precisa do clone de `vixlenslab/AI-Vixlens` (o script `scripts/relatorio-transitions-mes.ps1` e os docs vivem lá), do cofre `~/.volpe/ro.cred` e de IP liberado na PWI.

---

## Estrutura

```
site-ds/
├── index.html                       ← O DS publicado (ds.vixlens.com.br)
├── docs/                            ← Docs .md de referência (paleta, tipografia)
├── fotos/                           ← Imagens usadas no site
├── plugins/
│   ├── vixlens-brand/
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/
│   │       ├── vixlens-design-system/
│   │       ├── comunicado-interno/
│   │       ├── manual-cliente/
│   │       └── proposta-comercial/
│   ├── vixlens-ui/
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/
│   │       ├── vixlens-ui-architect/
│   │       └── ui-boas-praticas/
│   ├── vixlens-catalogo/
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/
│   │       └── tabela-optica-figma/
│   └── vixlens-relatorios/
│       ├── .claude-plugin/plugin.json
│       └── skills/
│           └── transitionsvix/        ← SKILL.md + confere.py
└── .claude-plugin/marketplace.json  ← Manifesto do marketplace
```

## Versionamento

| Versão | Data | Notas |
|---|---|---|
| DS 3.1 | Mai/2026 | Hierarquia 60-30-10, Preto na capa/header, Azul como accent |
| DS 3.0 | Mai/2026 | Release inicial do site + plugin v0.2.0 |
| Plugin v0.1.0 | Mai/2026 | 4 skills de marca e documentos |

---

Vixlens Laboratório Óptico · Vila Velha, ES · www.vixlens.com.br
