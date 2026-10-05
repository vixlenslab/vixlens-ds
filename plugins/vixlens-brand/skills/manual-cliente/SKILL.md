---
name: manual-cliente
description: >-
  Gera um manual operacional para clientes ópticos no padrão Vixlens. Use quando o usuário digitar /manual-cliente ou pedir "criar manual para cliente", "manual operacional Vixlens", "documentação para cliente óptico". Segue a mesma estrutura do Manual de Pedidos Marca Própria. Não use para criar ou reemitir o manual de marca de uma ótica de marca própria (isso é a marca-propria).
---

# Skill /manual-cliente

## Antes de qualquer coisa: carregue o Design System

Invoque a skill `vixlens-design-system` e leia as referências dela (voz-tom e vocabulario-canonico) antes de escrever uma linha.
Sem isso os códigos de voz (V1–V5) e os termos canônicos citados aqui não significam nada, e
o material sai fora do padrão. A fonte da verdade é sempre o DS vivo em https://ds.vixlens.com.br —
se algum valor deste arquivo divergir, o DS manda.

Gere um manual operacional para clientes ópticos seguindo exatamente o padrão Vixlens de documentos.

## Antes de começar

Pergunte ao usuário (se não informado):
1. **Tema do manual** — ex: "pedidos de marca própria", "uso do portal Vixlens", "processo de devolução"
2. **Público-alvo** — tipo de cliente óptico (independente pequeno, médio, grande)
3. **Versão e data** — para o rodapé

Se o usuário não souber, use: público = óptica independente, versão = 1.0, data = mês e ano atual.

## Estrutura obrigatória do manual

### 1. Capa
```
VIXLENS
LABORATÓRIO ÓPTICO INDUSTRIAL

[Título do Manual]
[Subtítulo descritivo]

EM UMA FRASE
[Síntese em 1-2 linhas. Direto ao ponto. Use frase-âncora canônica se aplicável.]

Versão X.X — [Mês/Ano]
Espírito Santo, Brasil
```

### 2. Abertura — "Por que estamos mudando" (ou equivalente)
- 1 parágrafo contextual: o que muda e por quê
- Destacar o grande diferencial em callout com barra Amber

### 3. Benefícios (4 itens máximo)
- Bullet curto + 1-2 frases de desenvolvimento
- Foco em benefício concreto para o cliente, não em qualidade da Vixlens

### 4. Passo a passo (steps numerados)
- Badge Blue numerado para cada etapa
- Máximo 9 steps
- Linguagem imperativa: "Acesse", "Selecione", "Confirme"
- Callout ATENÇÃO ao final se houver regra crítica

### 5. FAQ (Perguntas frequentes)
- Formato: pergunta em negrito + resposta direta no parágrafo
- 6 a 10 perguntas cobrindo dúvidas operacionais previsíveis

### 6. Suporte e contato
Tabela com: Canal | Para que serve | Tempo de resposta
Sempre incluir: Comercial/Consultor, Suporte técnico, WhatsApp Vixlens, Atendimento ao Cliente
Horário: Segunda a sexta 8h-18h, Sábado 8h-12h

## Tom de voz para manuais de cliente

Use V2 (Consultoria de balcão) como base:
- Linguagem próxima e direta
- Frases curtas, imperativas
- Antecipe a dúvida antes que o cliente precise perguntar
- Cliente é protagonista; Vixlens facilita o processo

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

Para manual de cliente: **Crítico** para regra e proibição, **Destaque** para o diferencial
comercial e o pitch do portfólio campeão, **Informativo** para atalho e boa prática.

## Checklist antes de entregar

- [ ] Frase "Em uma frase" na capa é direta e usa vocabulário canônico
- [ ] Steps usam verbos imperativos
- [ ] FAQ cobre o erro mais comum do processo
- [ ] Nenhum travessão no texto
- [ ] Tabela de suporte preenchida
- [ ] Versão e data no rodapé
