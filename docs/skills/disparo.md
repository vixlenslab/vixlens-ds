# Disparo das skills

O `npm run skills:check` confere se o YAML de cada skill é válido. Ele **não** diz se a skill dispara no
pedido certo. Esta pasta cobre essa segunda parte.

- `casos-de-disparo.json`: pedidos reais e quais skills devem ou não devem entrar.
- `npm run skills:casos`: confere a própria lista (nomes que existem, toda skill com casos). Não roda o Claude.

## Como rodar os casos (manual, numa sessão limpa)

1. Abra uma sessão nova do Claude Code com as skills da Vixlens instaladas (`/atualizar-skills` antes).
2. Para cada caso, cole o `pedido` e veja quais skills o Claude invoca.
3. Marque na tabela abaixo: **ok** se acionou o esperado e nenhuma das proibidas, **erro** caso contrário.
4. Erro de disparo se corrige na `description` da skill, não no corpo dela.

Rode de novo depois de mexer em qualquer `description` e antes de lançar skill nova.

## Onde as descrições se sobrepõem hoje

Leitura das 12 descrições, ainda **não confirmada numa sessão real**. Os casos abaixo existem para confirmar.

| Par ou grupo | Por que se confundem | Casos |
|---|---|---|
| `nova-pagina`, `vixlens-ui-architect`, `ui-boas-praticas` | os três citam "landing page" e "criar" | pagina-3, ui-1, ui-3 |
| `tabela-optica-figma`, `marca-propria` | "tabela MP" numa, "tabela de preço marca própria" na outra | mp-3 |
| `tabela-optica-figma`, `promovix` | a Promovix usa o formato do catálogo | promovix-4, tabela-1, tabela-2 |
| `manual-cliente`, `marca-propria` | ambas falam de manual para ótica | manual-3 |
| `atualizar-skills`, qualquer skill | vale "quando a skill se comporta diferente" | atualizar-3 |
| `proposta-comercial`, `vixlens-design-system` | as duas citam "proposta" (a segunda deve entrar junto, de propósito) | proposta-1 |

`tabela-optica-figma` e `marca-propria` têm a descrição em inglês e as demais em português. Funciona, mas vale
padronizar.

Casos com `decisao_pendente: true` precisam de uma regra decidida por quem mantém as skills antes de virarem teste.

## Resultado da última rodada

| Caso | Resultado | Data | Observação |
|---|---|---|---|
| (ainda não rodado) | | | |
