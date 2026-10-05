---
name: proposta-comercial
description: >-
  Gera propostas comerciais para novos clientes B2B no padrão Vixlens. Use quando o usuário digitar /proposta-comercial ou pedir "proposta para cliente", "proposta B2B Vixlens", "apresentação comercial", "pitch para ótica". Público-alvo: varejistas ópticos independentes. Não use para propostas da Tríade (agência, outro padrão) nem para tabela de preço ou promoção do mês (tabela-optica-figma e promovix).
---

# Skill /proposta-comercial

## Antes de qualquer coisa: carregue o Design System

Invoque a skill `vixlens-design-system` e leia as referências dela (voz-tom e vocabulario-canonico) antes de escrever uma linha.
Sem isso os códigos de voz (V1–V5) e os termos canônicos citados aqui não significam nada, e
o material sai fora do padrão. A fonte da verdade é sempre o DS vivo em https://ds.vixlens.com.br —
se algum valor deste arquivo divergir, o DS manda.

Gere propostas comerciais para novos clientes B2B — varejistas ópticos independentes — no padrão Vixlens.

## Antes de começar

Pergunte ao usuário (se não informado):
1. **Nome da ótica e responsável** — para personalização
2. **Produto/serviço foco** — Marca Própria (Matriz), Freevix, Astera, portfólio EssilorLuxottica, ou combinação
3. **Contexto da conversa** — cliente frio, indicação, reconversão?
4. **Consultor responsável** — quem assina a proposta (Fabrício, Guilherme, outro)

## Estrutura da proposta comercial

### 1. Capa
```
VIXLENS
LABORATÓRIO ÓPTICO INDUSTRIAL

Proposta Comercial
[Nome da Ótica]

EM UMA FRASE
[Síntese do valor principal — use vocabulário canônico]

[Cidade] — [Mês/Ano]
```

### 2. Quem é a Vixlens (máximo 1 página)
- Laboratório óptico B2B, Vila Velha (ES), fundado em 2015
- Lab parceiro homologado EssilorLuxottica — fabricação local + acesso ao portfólio completo
- Linhas próprias: Freevix (10 SKUs) + Astera (controle de miopia infantil)
- Hub Rio: atendimento local RJ com produção centralizada ES
- NÃO mencionar: jobs/dia exatos, faturamento, EBITDA, CAPEX, aquisições

### 3. O que estamos propondo
- Listar claramente os produtos/serviços incluídos na proposta
- Para cada item: benefício concreto para o cliente, não para a Vixlens

### 4. Argumento comercial principal (callout O GRANDE DIFERENCIAL)
Para propostas que incluam Marca Própria:
> Toda nova tecnologia incorporada ao portfólio campeão Vixlens fica disponível na sua tabela de marca própria no mesmo momento em que entra na tabela Vixlens. Sem atualização de cadastro, sem renegociação.

Para propostas com foco em portfólio EssilorLuxottica:
> Acesso ao portfólio completo EssilorLuxottica com produção local no ES, com prazo e rastreabilidade de laboratório regional com tecnologia de grupo global.

### 5. Como funciona (operacional)
- Resumo do fluxo de pedido em 3-5 steps
- Foco em simplicidade e rapidez
- Mencionar suporte disponível

### 6. Próximos passos
- 3 ações concretas com responsável (Vixlens x cliente)
- Prazo de resposta esperado
- Contato direto do consultor

## Tom de voz para propostas comerciais

Use V2 (Consultoria de balcão) + V5 (Visão estratégica) combinados:
- Abertura próxima e direta (V2): fala com o dono da ótica
- Argumento principal estratégico (V5): o benefício de longo prazo
- Operacional objetivo (V2): como funciona na prática

**O que evitar em propostas:**
- Não prometer exclusividade sem aprovação prévia do Otávio
- Não mencionar condições comerciais específicas (tabela, desconto, prazo de pagamento) — deixar em branco ou indicar "conforme tabela vigente"
- Não comparar com concorrentes
- Não usar adjetivos vazios: "melhor laboratório", "líder do mercado"

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

Para proposta: **Destaque** para o pitch principal, **Informativo** para o fluxo operacional,
**Crítico** para a ação esperada do cliente com prazo.

## Checklist antes de entregar

- [ ] Nome da ótica aparece na capa
- [ ] "Em uma frase" usa vocabulário canônico relevante
- [ ] Argumento principal está em callout de destaque
- [ ] Nenhum valor exato de tabela ou margem
- [ ] Próximos passos têm prazo e nome do consultor
- [ ] Nenhuma comparação com concorrente
- [ ] EssilorLuxottica com grafia completa
