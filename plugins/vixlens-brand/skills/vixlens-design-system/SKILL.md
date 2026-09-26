---
name: vixlens-design-system
description: >-
  Aplica o Design System oficial da Vixlens (cores, tipografia, tokens, componentes, voz e vocabulário canônico) a qualquer documento, apresentação, planilha ou material de marca. Use SEMPRE que for criar, editar ou revisar conteúdo Vixlens — propostas, manuais, memos, cartas, relatórios, decks, planilhas, capas, callouts — mesmo que o usuário não cite "design system", "padrão" ou "marca" explicitamente. Combine este skill com os skills de formato (docx, pptx, pdf, xlsx) e com a Figma: este define O QUE seguir; o de formato define COMO construir o arquivo. Triggers: "documento Vixlens", "proposta", "manual", "apresentação da Vixlens", "no nosso padrão", "padrão da marca", "Freevix", "Reflecta", "Matriz Marca Própria", "EssilorLuxottica".
---

# Vixlens Design System

A referência oficial de identidade visual e verbal da Vixlens (Laboratório Óptico, Vila Velha/ES). Este skill garante que qualquer material gerado saia no padrão da marca — do layout às palavras. Fonte canônica online: https://ds.vixlens.com.br.

> **⚠️ Sempre alinhe ao DS online:** não pine versão aqui — a fonte da verdade é sempre o que `ds.vixlens.com.br` serve agora. Antes de aplicar, confirme no DS vivo; se algum valor deste arquivo divergir, **o DS vivo manda**. Nunca aplique um token daqui sem checar que ainda bate com o DS online.

## Como usar este skill

Este skill carrega as **regras**; o arquivo final é construído com o skill de formato adequado. Fluxo:

1. Identifique o formato do entregável e leia o skill de formato correspondente: `docx` (propostas, manuais, memos, cartas, relatórios), `pdf` (documentos finais para impressão/distribuição), `pptx` (apresentações), `xlsx` (planilhas/tabelas). Para telas, UI ou mockups, use a Figma.
2. Aplique as regras deste skill: tipografia, cores, tokens, componentes (consulte `references/componentes.md` quando precisar de specs exatas).
3. **Revise voz e texto** com base em `references/voz-tom.md` — isso vale para TODO texto gerado, não só o visual.
4. Rode o **Checklist pré-publicação** (no fim deste arquivo) antes de entregar.

A regra de ouro: a identidade Vixlens é restrita e deliberada. Poucas cores, poucas fontes, frases curtas. Quando em dúvida, prefira o mais sóbrio.

## Tipografia

Duas famílias, dois contextos — nunca misturar fora do seu meio.

- **Documentos impressos / PDF / propostas / manuais → Mont.** Substituta web livre: **Montserrat** (Google Fonts). Use Mont quando os arquivos `.otf` estiverem disponíveis; caso contrário, Montserrat.
- **Digital / site / UI / telas → Host Grotesk** (Google Fonts).

Regras invioláveis de tipografia:

- **Nunca itálico** em nenhum elemento — não faz parte da identidade.
- Caixa alta só em logo, tagline e labels de callout. Nunca em parágrafos corridos.
- No máximo dois pesos no mesmo bloco de texto.
- Sublinhado só em links, nunca como ênfase.
- Thin (100) e ExtraLight (200) proibidos em corpo de texto impresso.

Escala print (Mont) — use em documentos:

| Nível | Peso / Tamanho | Uso |
|---|---|---|
| Display / palavra-marca | Heavy 900 · 48pt · CAIXA ALTA | "VIXLENS" na capa |
| H1 documento | Bold 700 · 20pt | Seções principais |
| H2 documento | SemiBold 600 · 15pt | Subseções |
| Corpo | Regular 400 · 11pt · lh 1.4 | Parágrafos, listas, FAQ |
| Caption | Light 300 · 9pt | Rodapé, legendas |

Escala digital (Host Grotesk, estilo luma) — resumo: H1 700/64px, H2 700/48px, H3 700/40px, H4 600/32px, H5 500/24px, H6 500/20px, Parágrafo 400/16px lh1.5, Label 500/14px, Caption 400/12px, Overline 500/11px (caixa alta). Os headings colapsam no tablet (lg, 1024px) e no mobile: H1 64 → 40 → 40px. Specs completas em `references/componentes.md`.

## Cores

Paleta intencionalmente restrita. **Preto lidera.** Amarelo e Azul são de impacto. Branco é estrutural. Regra **60-30-10**: ~60% Preto/Branco, ~15% Amarelo, ~5% Azul.

Paleta primária:

| Cor | HEX | Uso | Texto sobre ela |
|---|---|---|---|
| Preto Vixlens | `#1D1D1F` | Texto, botões, nav — cor dominante | — |
| Amarelo | `#FAC617` | Destaque, CTAs, faixas | sempre **Preto #1D1D1F** |
| Azul | `#0439D9` | Accent de último recurso (~5%) | Branco |
| Branco | `#FFFFFF` | Fundo de página, texto sobre escuro | — |

Neutras: **BG Cinza** `#F5F5F7` (fundo de cards/seções — nunca cor dominante de página) · **Cinza** `#606F7F` (bordas de input, placeholder, UI secundária).

Cores de callout (documentos) — fundo / barra lateral 4px:

- **Destaque** (comercial, atenção positiva): fundo `#FFFBEB` · barra `#FCD341` · label `#92730A`
- **Informativo** (técnico, instrucional): fundo `#EFEFFF` · barra `#615FFF` · label `#615FFF`
- **Crítico** (alerta obrigatório, erro): fundo `#FFF0F0` · barra `#FF6566` · label `#E03535`
- **Sucesso** (confirmação, aprovação): fundo `#EDFBF4` · barra `#30D389` · label `#1A9960`

Linha Reflecta (cores de produto, SÓ nos materiais dessa linha — cada uma é o residual de cor do tratamento AR): BlueProtect SH `#134B97` · Reflecta Guard `#00782D` · Reflecta Express `#92BB36` (texto sempre Preto).

Data-viz (gráficos): paleta categórica dedicada — `#FAC617` · `#0439D9` · `#615FFF` · `#30D389` · `#606F7F` (vars `--chart-1`..`--chart-5`). Não é a cor de marca solta; regras em `references/componentes.md`.

Regras de cor invioláveis:

- Amarelo **exige** texto Preto `#1D1D1F` — nunca Branco ou Azul sobre Amarelo.
- Nos digitais, nunca `#000000` puro: o Preto Vixlens é `#1D1D1F`.
- Não adicionar cores fora da paleta (única exceção: as 3 cores Reflecta, restritas àquela linha).
- Azul nunca em headers, capas, badges ou bullets — só gráficos de dados (3ª cor) ou 1 elemento por documento.
- Não usar Azul e Preto como fundos simultâneos no mesmo documento.
- Fundos de card/callout (`#F5F5F7`, `#FFFBEB`, etc.) nunca como cor dominante de página.

## Tokens de forma e espaçamento

Border-radius (papel fixo, não intercambiável — estilo luma, arredondado): **Card 32px** · **Botão 32px** · **Input 24px** · **Chip/Badge 12px**.

Espaçamento base 8px. **40px é o token âncora** (gap entre cards, padding lateral de seções). Gaps internos usam sub-escala (8, 12, 20, 24px); margens externas usam a escala maior (40, 60, 80px). Não inventar valores intermediários (35px, 45px).

## Componentes

Specs exatas de **botões, inputs, cards e callouts** (estados, tamanhos, paddings, anatomia) estão em `references/componentes.md`. Consulte esse arquivo sempre que for desenhar ou descrever um componente. Pontos que valem memorizar:

- **Callouts são componentes de documento**, não de web. No site, usar cards com BG `#F5F5F7`.
- Capa de documento: caixa **"EM UMA FRASE"** — fundo Preto `#1D1D1F`, label Amarelo (Mont SemiBold 9pt), texto Branco (Mont Regular 12pt).
- Logo: sempre o SVG oficial, nunca recriar/recolorir/distorcer. Versão **Preto monocromático** para fundos claros e impressão; **Branco + Amarelo** é a preferencial em fundos escuros. Brand kit e SVGs em https://ds.vixlens.com.br.

## Voz, tom e vocabulário

**Isto se aplica a todo texto gerado.** Leia `references/voz-tom.md` para as 5 vozes, a lista completa de termos canônicos e exemplos. Princípios centrais: institucional mas direto, anti-corporativo-vazio, frases curtas, voz ativa, nenhuma palavra desperdiçada.

Erros mais comuns a evitar sempre:

- **Nunca usar travessão (—)** em copy, hooks ou CTAs.
- Banir: "importância de", "no mundo atual", "cada vez mais", "solução completa", "excelência em", "comprometidos com", "mindset de sucesso".
- Nunca % de crescimento ("crescemos X%"), nem valores exatos (faturamento, margem, EBITDA, jobs/dia), nem comparação direta com concorrentes (Hoya, Zeiss, Orgalent), nem referência a M&A/exit/valuation. Use faixas: "centenas de jobs".
- **"Essilor" nunca isolado → sempre "EssilorLuxottica".**
- Capitalização exata: **Freevix**, **Astera**, **Reflecta**, **Matriz Marca Própria**, **portfólio campeão Vixlens**, **espelho da tabela Vixlens**.

## Quando parar e escalar

Não gere o material; pergunte primeiro, quando o pedido:

- altera paleta, tipografia ou qualquer regra de marca
- cita cliente nominalmente sem autorização explícita
- menciona parceria, contrato ou dado comercial sensível
- toca em estratégia societária de qualquer forma

## Checklist pré-publicação

Rode antes de entregar qualquer material:

1. Tipografia: Mont/Montserrat (impresso) ou Host Grotesk (digital)? Sem itálico? Máx. dois pesos por bloco?
2. Cores dentro da paleta? Preto é `#1D1D1F` (não `#000000`)? Amarelo só com texto Preto? Azul ≤ 5%?
3. Tokens corretos: card 32px, botão 32px, input 24px, badge 12px? Espaçamentos na escala?
4. Tem travessão (—)? Remover.
5. Tem expressão proibida ou comparação com concorrente? Substituir/cortar.
6. Tem valor exato ou % de crescimento? Converter para faixa ou remover.
7. Tem referência a M&A/exit/valuation? Cortar completamente.
8. "Essilor" isolado? Corrigir para "EssilorLuxottica".
9. Termos canônicos grafados corretamente (Freevix, Reflecta, Matriz Marca Própria…)?
10. Cliente citado? Confirmar autorização prévia.

## Arquivos de referência

- `references/componentes.md` — specs completas de tipografia digital, botões, inputs, cards, callouts, dashboard escuro, tokens, logo.
- `references/voz-tom.md` — as 5 referências de voz (V1–V5), regras invioláveis de linguagem, checklist de revisão de copy.
- `references/vocabulario-canonico.md` — termos obrigatórios com grafia exata, frases-âncora, portfólio de produtos e regras de nomenclatura.
