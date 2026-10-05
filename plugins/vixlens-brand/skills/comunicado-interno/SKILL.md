---
name: comunicado-interno
description: >-
  Gera comunicados internos para o time Vixlens no padrão de marca. Use quando o usuário digitar /comunicado-interno ou pedir "comunicado para o time", "comunicado interno Vixlens", "avisar o time sobre", "nota interna". Para: equipe comercial, time de produção, coordenadores, gestores. Não use para comunicação com cliente ou ótica (isso é externo) nem para proposta ou manual.
---

# Skill /comunicado-interno

## Antes de qualquer coisa: carregue o Design System

Invoque a skill `vixlens-design-system` e leia as referências dela (voz-tom e vocabulario-canonico) antes de escrever uma linha.
Sem isso os códigos de voz (V1–V5) e os termos canônicos citados aqui não significam nada, e
o material sai fora do padrão. A fonte da verdade é sempre o DS vivo em https://ds.vixlens.com.br —
se algum valor deste arquivo divergir, o DS manda.

Gere comunicados internos para o time Vixlens com clareza operacional e tom institucional direto.

## Antes de começar

Pergunte ao usuário (se não informado):
1. **Assunto** — o que está sendo comunicado
2. **Destinatários** — todo o time, comercial, produção, coordenadores?
3. **Urgência** — informativo padrão ou ação imediata necessária?
4. **Ação esperada** — o que o time deve fazer após ler?

## Estrutura do comunicado interno

### Cabeçalho
```
VIXLENS — COMUNICADO INTERNO
Para: [destinatários]
Data: [data]
Assunto: [título direto — máximo 10 palavras]
```

### Corpo (3 blocos obrigatórios)

**Bloco 1 — Contexto (2-3 frases)**
O que mudou ou o que está acontecendo. Sem rodeios.

**Bloco 2 — O que muda para você (lista objetiva)**
Impacto prático na rotina. Máximo 5 itens. Verbos no imperativo.

**Bloco 3 — Próximos passos e prazo**
O que fazer, até quando, quem acionar em caso de dúvida.

### Fechamento
```
Dúvidas: [nome do responsável] via WhatsApp/e-mail
[Nome do emissor] — [Cargo]
Vixlens Laboratório Óptico
```

## Tom de voz para comunicados internos

Use V3 (Bastidor industrial) ou V5 (Visão estratégica) conforme a natureza:
- V3 para comunicados operacionais (processo, produção, fluxo)
- V5 para comunicados estratégicos (nova parceria, mudança estrutural, marcos)

Regras específicas para comunicados internos:
- Direto. A equipe não precisa de contexto histórico longo.
- Se há prazo, abra com ele: "A partir de [data], o fluxo muda."
- Se há ação obrigatória, destaque em callout ATENÇÃO.
- Nunca motivacional. Nunca genérico.

## Callouts

Use os quatro callouts do Design System, com a grafia e as cores exatas. Não invente nome nem cor:

| Tipo | Barra | Fundo | Label | Quando |
|---|---|---|---|---|
| **Crítico** | `#FF6566` | `#FFF0F0` | `#E03535` | regra obrigatória, proibição, consequência de erro |
| **Destaque** | `#FCD341` | `#FFFBEB` | `#92730A` | argumento comercial, benefício principal |
| **Informativo** | `#615FFF` | `#EFEFFF` | `#615FFF` | processo, prazo, passo operacional |
| **Sucesso** | `#30D389` | `#EDFBF4` | `#1A9960` | confirmação, aprovação, conclusão |

Texto do corpo do callout sempre em Preto `#1D1D1F` sobre o fundo tint. As cores de barra e label
são elementos de UI: nunca use nenhuma delas como cor de texto corrido.

Para comunicado interno: **Crítico** para prazo e mudança obrigatória, **Destaque** para novo
processo ou parceria, **Informativo** para deadline com data.

## O que NUNCA incluir em comunicado interno

- Valores exatos (faturamento, margem, EBITDA, CAPEX)
- Referências a M&A, exit, valuation, aquisição futura
- "cada vez mais", "estamos comprometidos", "excelência em"
- Travessão (—)
- Crescimento em %

## Checklist antes de entregar

- [ ] Assunto tem no máximo 10 palavras
- [ ] Bloco "O que muda para você" usa imperativo
- [ ] Próximos passos têm prazo e responsável
- [ ] Nenhuma expressão proibida
- [ ] Se tem dado sensível, verificar se é para comunicado interno ou apenas para Otávio
