# Hook de conferência para o Claude Code

`scripts/hook-confere-skills.mjs` é um hook do Claude Code. Depois que o Claude edita uma skill ou um construtor,
ele roda sozinho as conferências do repositório e, se alguma falhar, devolve o erro ao Claude para ele corrigir
na hora. É o papel do `pre-push`, só que na edição, e não só no push.

| Arquivo editado | Conferências que rodam |
|---|---|
| `plugins/*/skills/*/SKILL.md` | `skills:check`, `skills:casos` |
| `construtor.js` da `tabela-optica-figma` ou da `promovix` | `test:construtor`, `test:paridade` |
| `promovix/montar.py` | `test:montar` |
| testes da `tabela-optica-figma` | `test:construtor` |

Só roda o que existir em `package.json`. Em um ponto da história do repositório que ainda não tem um script, aquela
conferência é pulada, sem erro.

## Como ativar (não está ativado)

O hook não foi ligado em nenhum `.claude/settings.json`, porque isso muda o comportamento de quem usa o Claude Code
neste repositório. Para ligar, junte o bloco de `docs/skills/hooks-exemplo.settings.json` a um destes arquivos:

- `.claude/settings.local.json`: só para você (não vai para o Git; confira que está no `.gitignore`).
- `.claude/settings.json`: para o time inteiro.

Abra o Claude Code na **raiz do repositório** (o comando usa caminho relativo) e confira em `/hooks`.

## Como foi testado

Sem depender do Claude Code, mandando o JSON que o hook recebe direto para o script:

- arquivo sem relação: silêncio;
- `SKILL.md` válido: silêncio;
- `SKILL.md` com `description` quebrada (dois-pontos sem aspas, o bug que motivou o validador): **bloqueia**, com o erro do `skills:check`;
- `construtor.js` com uma cor trocada só na Promovix: **bloqueia**, com a falha do `test:paridade`;
- `montar.py` intacto: roda o pytest e fica em silêncio;
- entrada vazia ou inválida: silêncio, sem quebrar.

**Ainda não foi visto disparando dentro de uma sessão real do Claude Code.** O teste acima prova o script e o formato
da configuração; que o Claude Code chama o hook no momento certo só se confirma ligando-o e editando uma skill.

## Limites

- No Windows o hook usa o shell padrão do Claude Code; o script já trata o `npm` por `shell: true` nesse caso.
- Cada edição que casa com uma regra roda as conferências (cerca de 1 a 5 segundos). Se ficar lento, o hook
  pode ser movido para o evento `Stop`, para rodar uma vez por resposta.
- Não cobre ainda: conferência de preço de CSV (depende da tabela de custo) e geração de várias tabelas em paralelo
  com subagentes (depende do Figma e de dados reais).
