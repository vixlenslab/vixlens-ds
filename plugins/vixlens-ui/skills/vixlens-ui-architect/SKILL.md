---
name: vixlens-ui-architect
description: >-
  Constrói interfaces web do ecossistema Vixlens em React + Tailwind + shadcn/ui, fiéis ao Design System. Use SEMPRE que for desenhar, codar ou iterar landing page, componente, homepage, header, hero, card de produto, formulário ou subpágina de Vixlens, Freevix, Reflecta, Astera, Vix Academy ou qualquer produto da linha. Triggers: "cria uma landing", "monta essa página", "faz esse componente", "codar a home", "hero da Vixlens", "card de produto", "página do Freevix", "converte esse wireframe em código", "no padrão visual da Vixlens", "usa nossos tokens", antes de escrever qualquer JSX de interface Vixlens.
---

# Vixlens UI Architect

Transforma token de design e wireframe em código React + Tailwind pronto para produção, no padrão visual da Vixlens.

> **Fonte da verdade: o DS ao vivo em https://ds.vixlens.com.br.** Todo token deste arquivo é um retrato que pode envelhecer. Antes de aplicar, confirme no DS; se divergir, **o DS manda**. O arquivo legível por máquina é `https://ds.vixlens.com.br/assets/tokens/vixlens-tokens.json` — busque de lá em vez de confiar nas tabelas abaixo.
>
> **Marca, voz e vocabulário não estão aqui.** Isso é da skill `vixlens-design-system`: paleta completa, as 5 vozes, termos canônicos, portfólio de produtos com nome e código. Invoque ela quando o trabalho envolver texto, nome de produto ou material de marca. Este arquivo cuida só da parte de interface e código.

## 1. Stack e ambiente

- **Stack:** React, Tailwind CSS, **shadcn/ui** como base de componente, Framer Motion, Phosphor Icons.
- **Base de componente:** monte Button, Input, Card, Dialog, Tabs e afins sobre o **shadcn/ui**, reestilizados nos tokens Vixlens. Nunca entregue o default do shadcn. Mapeie as CSS vars dele nos tokens (`--vix-*`): primary → Preto/Amarelo, radius → os tokens de forma. Componha e vista; não reinvente primitivo.
- **Onde entregar:** se o trabalho pertence a um projeto ou repositório, entregue **arquivos no projeto** e verifique no dev server. Nunca empacote como página auto-contida, isso descarta os tokens e componentes que o projeto já tem. Use **Artifact** só quando não há projeto onde escrever: mockup rápido, comparar variantes, ou mostrar para quem não vai rodar código.

## 2. Tokens de cor no Tailwind

| Token | HEX | Utilitário |
|---|---|---|
| Canvas escuro | `#1D1D1F` | `bg-[#1D1D1F]` |
| Canvas claro | `#FFFFFF` | `bg-white` |
| Fundo de card/seção | `#F5F5F7` | `bg-[#F5F5F7]` (nunca dominante da página) |
| Amarelo CTA | `#FAC617` | `bg-[#FAC617]` / `text-[#FAC617]` |
| Azul acento (~5%) | `#0439D9` | `bg-[#0439D9]` / `text-[#0439D9]` |
| Cinza borda/placeholder | `#606F7F` | `border-[#606F7F]` |
| Reflecta Blue Protect SH | `#134B97` | só em material da linha Reflecta |
| Reflecta Guard | `#00782D` | só em material da linha Reflecta |
| Reflecta Express | `#92BB36` | só em material da linha Reflecta (texto preto) |

**Preto Vixlens é `#1D1D1F`, nunca `#000000`.** Distribuição 60-30-10: Preto e Branco dominam, Amarelo em destaque e CTA, Azul como acento de último recurso.

Alguns arquivos de logo antigos ainda carregam `#FAC618` (Δ 1/255, imperceptível). Em web, sempre `#FAC617`.

**Rampa neutra:** `gray-600 #4B5563` para texto secundário. **Não use `gray-500` sobre `#F5F5F7`** — dá 4.44:1 e reprova em WCAG AA. Sobre card cinza, suba um degrau.

**Callouts** (dashboard e documento, não web): Destaque `#FFFBEB`/`#FCD341` · Informativo `#EFEFFF`/`#615FFF` · Crítico `#FFF0F0`/`#FF6566` · Sucesso `#EDFBF4`/`#30D389`. Texto do corpo sempre em Preto sobre o tint; as cores de barra são elemento de UI, nunca texto.

## 3. Tipografia

Só digital. Importe Host Grotesk:

`@import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500;600;700;800&display=swap');`

Mont e Montserrat são de documento impresso. Nunca em saída web.

| Grupo | Elemento | Desktop | Tablet | Mobile | Peso | Line height | Tracking |
|---|---|---|---|---|---|---|---|
| Display | H1 | 64px | 40px | 40px | 700 | 100% | -0.02em |
| Display | H2 | 48px | 40px | 32px | 700 | 100% | -0.02em |
| Display | H3 | 40px | 32px | 28px | 700 | 100% | -0.02em |
| Seção | H4 | 32px | 28px | 24px | 600 | 120% | -0.01em |
| Seção | H5 | 24px | 22px | 20px | 500 | 120% | -0.01em |
| Seção | H6 | 20px | 18px | 16px | 500 | 120% | 0em |
| Corpo | Parágrafo | 16px | 16px | 16px | 400 | 150% | 0em |
| Corpo | Bold | 16px | 16px | 16px | 600 | 150% | 0em |
| UI | Label | 14px | 14px | 14px | 500 | — | 0.02em |
| UI | Caption | 12px | 12px | 12px | 400 | — | 0em |
| UI | Overline | 11px | 11px | 11px | 500 | — | 0.08em |

Fonte: `typography.scale` no token JSON. Tablet = a partir de `lg` (1024px), desktop = a partir de `xl` (1280px), mobile abaixo de 1024px. Classes: `text-vix-h1-m lg:text-vix-h1-t xl:text-vix-h1`. A régua antiga deste arquivo (H1 96, H2 64, parágrafo 18) era pré-luma e está aposentada.

**Regras:** nunca itálico. Nunca caixa alta em parágrafo corrido — só logo, tagline e label de callout. Máximo dois pesos no mesmo bloco. Sublinhado só em link. Peso 900 é de documento impresso, nunca web.

## 4. Tokens de forma

| Token | Valor | Componente |
|---|---|---|
| Card | `32px` | cards e blocos de conteúdo |
| Botão | `32px` | todos os botões (quase pill) |
| Input | `24px` | inputs, selects, popovers |
| Chip/Badge | `12px` | chips, tags, badges pequenos |

Nunca invente valor intermediário. Fonte: `radius` no token JSON. O conjunto 57/30/12/6 que já morou aqui era pré-luma e está aposentado.

## 5. Botões

Dois tipos. No máximo um primário por seção.

**Primário sobre fundo escuro**
```
className="bg-[#FAC617] text-[#1D1D1F] font-bold rounded-[32px] px-8 py-3.5 text-base
hover:bg-[#E5A800] focus:ring-3 focus:ring-[#1D1D1F]"
```

**Primário sobre fundo claro**
```
className="bg-[#1D1D1F] text-[#F5F5F7] font-bold rounded-[32px] px-8 py-3.5 text-base
hover:bg-[#333333] focus:ring-3 focus:ring-[#FAC617]"
```

**Secundário sobre escuro**
```
className="border-2 border-white text-white bg-transparent rounded-[32px] px-[30px] py-3
hover:bg-white/10"
```

**Secundário sobre claro**
```
className="border-2 border-[#1D1D1F] text-[#1D1D1F] bg-transparent rounded-[32px] px-[30px] py-3
hover:bg-[#1D1D1F]/5"
```

| Estado | Primário preto | Primário amarelo |
|---|---|---|
| Hover | `#333333` + sombra | `#E5A800` |
| Foco | ring amarelo 3px | ring preto 3px |
| Desabilitado | `bg-[#E5E7EB]` `text-[#9CA3AF]` | igual |

**Tamanhos** (na régua do DS, 18px não existe mais): Small `text-sm` 14px · Default `text-base` 16px · Large `text-xl` 20px.

## 6. Inputs

```
className="h-14 px-5 py-3.5 rounded-[24px] border border-[#606F7F]
focus:border-[#1D1D1F] focus:outline-none bg-white
text-[#1D1D1F] text-base placeholder:text-[#606F7F]
disabled:bg-[#F9FAFB] disabled:text-[#D1D5DB]"
```

Altura sempre 56px. Radius sempre 24px, nunca quadrado nem pill. Largura máxima 400px em form centralizado, 100% em layout full. Fundo sempre branco.

**Label sempre visível e associada** com `htmlFor`/`id`. Placeholder é exemplo, não substitui label.

## 7. Iconografia — Phosphor

Único sistema de ícone. Pesos: Regular para UI geral, Bold para botão e texto pequeno, Fill para estado ativo. **Nunca misture pesos na mesma tela.**

Tamanhos: 16px inline/label · 20px botão/navegação · 24px UI padrão · 32px destaque · 48px hero.

Sobre fundo escuro, ícone branco ou amarelo. Sobre claro, preto ou `#606F7F`. Status: check `#30D389`, alerta `#FF6566`, info `#615FFF`, pendente `#FCD341`.

Área de toque mínima 44×44px, mesmo que o desenho do ícone seja menor.

## 8. Assets de marca

**Base:** `https://ds.vixlens.com.br/assets/marca/<linha>/<slug>.<ext>`
**Formatos:** `svg` (prefira em web), `png`, `pdf`, `webp`. Todos transparentes; o fundo vem do seu layout.

Nunca reexporte URL efêmera do Figma. Os arquivos do DS são permanentes e versionados.

**Convenção de slug:**
- **Vixlens / Freevix (wordmark):** `<marca>-<variação>` — ex. `vixlens-positivo`, `freevix-negativo`
- **Vix Academy:** `vix-academy-<horizontal|vertical>-<variação>`
- **Reflecta:** `reflecta[-<produto>]-<nível>-<variação>`
  - produtos: `guard`, `express`, `blue-protect-sh`; a matriz omite o segmento de produto
  - nível: `completo` (marca + wordmark) · `reduzido` (só wordmark) · `simbolo` (só símbolo)
- **Linha de lentes:** `<produto>-<horizontal|vertical>-<positiva|negativa>`
  - slugs que existem: `vix-total`, `freevix-one`, `freevix-premium`, `freevix-freedom`, `freevix-ia-tech`, `freevix-vs-hd`, `freevix-relax`, `astera`, `freevix-deskview-1-3m`, `freevix-deskview-2m`, `freevix-office-ate-4m`

> **Slug não é nome de produto.** São 13 lentes no portfólio e só estes 11 têm assinatura no DS: `freevix-vs` e as bifocais dão 404, então um card delas usa tipografia, não logo. E o nome comercial não é o slug: o arquivo é `freevix-office-ate-4m`, o produto é **Freevix Office até 4M**; o arquivo é `freevix-relax`, o produto é **Freevix VS Relax**. Nome de produto vem da `vixlens-design-system`, que lê do tabelão de preço. Não converta um no outro.

**Variações:** `positivo` (colorido, fundo claro) · `negativo` (colorido, fundo escuro) · `mono-positivo` (escuro monocromático) · `mono-negativo` (branco monocromático) · `cor` (só Reflecta, cor do produto no nível símbolo). A linha de lentes usa `positiva`/`negativa`.

**Brand kits:** `https://ds.vixlens.com.br/assets/kits/<linha>-brand-kit.zip` — linhas `vixlens`, `freevix`, `vix-academy`, `reflecta`, `lentes`.

Ícones SVG de linha de produto ficam em `assets/icones/`. Nunca rasterize logo: use o SVG como componente React para poder manipular `fill`.

## 9. Hero card de linha de produto

Badge de vidro fosco. É o **único** lugar do sistema onde efeito de vidro é permitido:

```
className="w-[58px] h-[58px] rounded-[14px]
bg-[rgba(255,255,255,0.28)] border border-[rgba(255,255,255,0.46)]
backdrop-blur-[8px]"
```

Ícone sempre branco. Nunca passe de 58×58px. Padding do hero card: `px-10` (40px) horizontal, `py-[60px]` vertical.

Sobre fundo vivo, injete `bg-black/40` atrás do texto crítico para manter 4.5:1.

## 10. Roteamento por zona de marca

Ao receber wireframe, roteie cada elemento pela zona:

- **Hero / header:** layout centralizado, logo SVG (`vixlens-negativo` em fundo escuro, `vixlens-positivo` em claro), navegação flutuante
- **Card de produto (linha de lentes):** canvas preto com faixa amarela, badge de vidro. Nome do produto vem da mestre, nunca do slug
- **Card de produto (Reflecta):** só a cor do produto correspondente como acento — Guard `#00782D`, Express `#92BB36` (texto preto), Blue Protect SH `#134B97`. Nunca misture cores Reflecta no mesmo card
- **Vix Academy:** faixas de callout amarelas, texto preto, cards brancos limpos
- **Formulário / cadastro de parceiro:** fundo branco, borda `#606F7F`, ring de foco preto

## 11. Grid e layout

**Container**, escolha pelo tipo de página:
- `container-produto` → `max-w-[1422px] mx-auto w-full` (produto e marketing)
- `container-ds-site` → `max-w-[1100px] mx-auto w-full` (documentação, catálogo, ferramenta interna)

Padding de seção `px-16` (64px) lateral, `py-[72px]` a `py-[80px]` vertical. Gutter entre cards sempre 30px (`gap-[30px]`). Nunca estique conteúdo até a borda da tela.

**Escala de espaçamento (base 8px):** 4 · 8 · 12 · 16 · 20 · 24 · 30 · **40** · 48 · 60 · 64 · 80.

**40px é o token âncora**, ponto de partida de todo espaçamento de componente. Gaps internos na sub-escala (8, 12, 20, 24). Margens externas na escala maior (40, 60, 80). Nunca invente 35px ou 45px.

**Specs:** botão padding `14×32`, altura 48–56px · input altura 56px, padding `14×20` · card de conteúdo padding `60×83`, gap interno 30px · hero card `40` horizontal por `60` vertical.

## 12. Direção de imagem

Pessoas reais em contexto cotidiano, luz ambiente, expressão genuína. Lente com reflexo mínimo comunica qualidade de AR.

Três direções aprovadas: retrato próximo (busto a rosto, luz lateral suave), lifestyle em ambiente natural, detalhe de produto (close, fundo limpo, profundidade curta).

Proibido: reflexo opaco bloqueando os olhos, estética de imagem gerada por IA, fundo carregado, banco de imagem sem curadoria.

O reflexo residual do AR é sinal de qualidade — sutil e colorido é aceitável, até 20% da área da lente. Opaco não é.

Specs: mínimo 2000×3000px, 300dpi impresso / 72dpi digital, tom neutro-quente 5.000–6.500K. Proporções 3:4, 1:1, 16:9.

## 13. Caminhos proibidos

- **Vidro fosco só no badge 58×58** do hero card. Nunca em card de conteúdo, seção ou navegação
- **Nenhuma cor fora da paleta**
- **Nunca itálico**, em elemento nenhum
- **Nunca `#000000`** — o preto é `#1D1D1F`
- **Azul nunca dominante:** é acento de ~5%, nunca em header, capa, hero ou fundo
- **Nenhum espaçamento intermediário** fora da escala
- **Nenhuma imagem gerada por IA** nem stock sem curadoria
- **Nunca azul e preto** como fundos simultâneos na mesma tela
- **`#F5F5F7` nunca como cor dominante** da página — é de card e subseção
- **Logo sempre SVG como componente React**, para manipular `fill`. Nunca placeholder de imagem
- **Versão de logo:** fundo escuro → `negativo` · fundo claro → `positivo` · fundo colorido onde o amarelo conflita → `mono-negativo` · documento impresso claro → `mono-positivo`

## 14. Antes de entregar

- Rode a `ui-boas-praticas` na tela antes de considerar pronta. Ela audita contraste, hierarquia, área de toque, label e grid contra 80 regras.
- Se o texto da interface for de marca (título, CTA, nome de produto), passe pela `vixlens-design-system`.
- Verifique no dev server, não só no build: screenshot e console limpos.
