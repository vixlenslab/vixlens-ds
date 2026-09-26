# Componentes & specs detalhadas — Vixlens DS

Specs extraídas do Figma Vixlens 3.0 e de https://ds.vixlens.com.br. Consulte ao desenhar ou descrever qualquer componente.

## Índice

- Escala tipográfica digital (Host Grotesk)
- Botões
- Inputs
- Cards
- Callouts
- Caixa "EM UMA FRASE"
- Tokens de forma e espaçamento
- Logo & regras de marca
- Iconografia

## Escala tipográfica digital (Host Grotesk)

Pesos por grupo: Display 700 · Section 600/500 · Body 400 · UI 500/400.

| Token | Peso | Desktop | Tablet | Mobile | Line-height | Tracking |
|---|---|---|---|---|---|---|
| H1 | 700 | 64px | 40px | 40px | 100% | −0.02em |
| H2 | 700 | 48px | 40px | 32px | 100% | −0.02em |
| H3 | 700 | 40px | 32px | 28px | 100% | −0.02em |
| H4 | 600 | 32px | 28px | 24px | 120% | −0.01em |
| H5 | 500 | 24px | 22px | 20px | 120% | −0.01em |
| H6 | 500 | 20px | 18px | 16px | 120% | 0 |
| Parágrafo | 400 | 16px | 16px | 16px | 150% | 0 |
| Corpo bold | 600 | 16px | 16px | 16px | 150% | 0 |
| Label | 500 | 14px | 14px | 14px | — | +0.02em |
| Caption | 400 | 12px | 12px | 12px | — | 0 |
| Overline | 500 | 11px | 11px | 11px | — | +0.08em (CAIXA ALTA) |

Host Grotesk via Google Fonts, pesos 300–800. Tablet = a partir de `lg` (1024px), desktop = a partir de `xl` (1280px), mobile abaixo de 1024px. Classes: `text-vix-h1-m lg:text-vix-h1-t xl:text-vix-h1`.

## Botões

Border-radius **32px** (estilo luma, quase pill). Fonte Host Grotesk **SemiBold**, texto **14px** (16px só no LG). Máximo de **um botão Primário por seção**.

**Primário (fundo claro):** BG `#1D1D1F` (ou Amarelo `#FAC617` para CTA) · texto `#F5F5F7`/preto · padding lateral 16px.
**Secundário (fundo claro):** transparente · texto `#1D1D1F` · borda 1px `#1D1D1F` · padding lateral 16px.

**Sobre fundo escuro:** Primário → BG `#FAC617` com texto `#1D1D1F`. Secundário → transparente, borda e texto `#FFFFFF`.

Estados:

- Primário Preto: default `#1D1D1F`/texto branco · hover `#333333` + shadow · focus ring `#FAC617` 3px offset 3px · disabled `#E5E7EB`/texto `#9CA3AF`.
- Primário Amarelo: default `#FAC617`/texto preto · hover `#E5A800` + shadow · focus ring `#1D1D1F` · disabled igual acima.
- Secundário: hover preenche com a cor da borda (fill-in) + shadow · focus ring `#FAC617`.

Tamanhos (altura em px, estilo luma): **SM** h32 · px lateral 12 · texto 14 · **Default** h36 · px 16 · texto 14 (padrão) · **LG** h40 · px 24 · texto 16 · **Icon** 36×36 (só ícone, sempre com aria-label).

## Inputs

Altura **36px** (h32 em contextos densos). Padding lateral ~14px. **Border-radius 24px** (estilo luma, arredondado — nunca quadrado nem pill). **Preenchido:** fundo cinza claro (`#F5F5F7` / token input) com borda transparente ou sutil — o luma usa input preenchido, **não branco puro**. Focus: ring 3px. Placeholder Host Grotesk 14px `#606F7F`; texto preenchido `#1D1D1F`. Largura máx. 400px em formulários centralizados (100% em full-width).

## Cards

Border-radius **32px** (estilo luma). Sombra suave (Elevation/Card) + ring sutil, ou o contraste branco/cinza delimitando. Numa mesma seção, todos os cards usam o mesmo token (32px). Grid: 2 colunas, gap 40px (desktop); carrossel de produto gap 30px.

Container base: 430×680px · padding 24px 20px · gap 20px · BG `#FFFFFF` · flex column, itens centralizados. Imagem principal 380×280px.

Variantes:

- **Feature** — branco sobre `#F5F5F7`. Título H5 Medium 24px centralizado, corpo Regular 16px lh1.5, chevron → no canto inferior direito.
- **Conteúdo** — texto + imagem, radius 32px, padding 60px vertical / 83px lateral, título H3 Bold 40px, grid 2 colunas gap 40px.
- **Produto** (carrossel Freevix) — 430×680px, badge categoria (BG `#1D1D1F`, texto branco, radius 12px/SemiBold 14px), cards brancos em container `#F5F5F7`.
- **Hero** (linha de produto) — 315×400px radius 32px, foto full bleed + overlay `rgba(0,0,0,0.2–0.3)` ou cor de produto, ícone badge frosted glass 58×58px radius 14px, título Bold 24px branco, CTA ExtraBold 16px branco sem botão, padding 40px H / 60px V.

## Callouts

Componentes de **documento** (não usar em web — no site usar cards `#F5F5F7`). Barra lateral 4px + label em CAIXA ALTA na cor da barra (nunca omitir o label). Corpo Regular 11pt `#1D1D1F` lh1.6. Nunca dois callouts do mesmo tipo consecutivos.

| Tipo | Fundo | Barra | Label (SemiBold 9pt) |
|---|---|---|---|
| Destaque | `#FFFBEB` | `#FCD341` | `#92730A` |
| Informativo | `#EFEFFF` | `#615FFF` | `#615FFF` |
| Crítico | `#FFF0F0` | `#FF6566` | `#E03535` |
| Sucesso | `#EDFBF4` | `#30D389` | `#1A9960` |

Uso: Destaque = comercial/positivo · Informativo = técnico/instrucional · Crítico = alerta obrigatório/erro · Sucesso = confirmação/aprovação.

## Caixa "EM UMA FRASE"

Elemento exclusivo de **capa de documento**. Fundo Preto `#1D1D1F` · label "EM UMA FRASE" em Amarelo (Mont SemiBold 9pt) · texto Branco (Mont Regular 12pt). Exemplo: "1 lente Matriz = 1 lente Vixlens equivalente. Material, índice e desenho da lente espelhados automaticamente."

## Tokens de forma e espaçamento

Radius (estilo luma): **Card 32px · Botão 32px · Input 24px · Chip/Badge 12px**.

Escala de espaçamento (base 8px): 4 / 8 / 12 / 16 / 20 / 24 / 30 / **40 (âncora)** / 48 / 60 / 64 / 80 px. Aplicações: botões h36 (SM h32 / LG h40), padding lateral 16px · inputs h36, padding lateral 14px · cards conteúdo padding 60px 83px · sections padding lateral 64px, vertical 72–80px, max-width 1422px.

## Dashboard escuro

Superfícies para dashboard em tema escuro. Não são cores de marca: existem só para interface de dados.

| Nome | HEX | Uso |
|---|---|---|
| BG Escuro | `#0B1220` | Background da tela |
| BG Card | `#2B3037` | Cards sobre o background escuro |
| Stroke | `#3E4D62` | Bordas e divisores |

Texto sobre essas superfícies vai em branco ou branco translúcido a partir de 60%, nunca em cinza da rampa neutra.

## Data-viz (gráficos)

Paleta categórica dedicada — **não** é a cor de marca solta. 5 séries distintas: `#FAC617` (amarelo, lidera) · `#0439D9` (azul) · `#615FFF` (roxo) · `#30D389` (verde) · `#606F7F` (cinza). Vars: `--chart-1`..`--chart-5`. Sequência (uma cor variando de intensidade) quando há ordem/grandeza; categórica quando as séries são independentes. Amarelo nunca como texto fino sobre branco; máx. ~5 séries; começar eixo no zero em barras; sem 3D nem degradê decorativo.

## Logo & regras de marca

- Sempre o SVG oficial. Nunca recriar manualmente, recolorir, distorcer, ou aplicar sombra/contorno/efeito.
- Versão **Branco + Amarelo** é a preferencial (fundos escuros). **Branco mono** para fundos coloridos/médios. **Preto mono** para fundos claros (`#FFFFFF`, `#F5F5F7`) e impressão. **Preto + Amarelo** para fundo claro com identidade completa.
- Contraste mínimo 4.5:1 (WCAG AA). Não usar sobre fundos de baixo contraste. Evitar Azul como fundo do logo.
- Arquivos: brand kit completo (.zip), SVG/PDF/PNG em https://ds.vixlens.com.br.

## Iconografia

- **UI / documentos:** Phosphor Icons (phosphoricons.com). Peso Regular (padrão), Bold (em botões/junto a texto pequeno), Fill (estado ativo). Tamanho padrão 24px (20px botões compactos, 16px inline, 32–48px estados vazios). Cores de status: check-circle `#30D389` · warning `#FF6566` · info `#615FFF` · clock `#FCD341`. Em fundo escuro, ícones brancos ou `#FAC617`; em fundo claro, `#1D1D1F` ou `#606F7F`. Não misturar pesos na mesma tela.
- **Ícones de linha de produto** (Freevix, Reflecta, Essilor, Vix Academy): SVG customizados, brancos, sobre badge frosted glass 58×58px — exclusivos de Cards Hero. Não reusar entre linhas nem fora dos Cards Hero.
