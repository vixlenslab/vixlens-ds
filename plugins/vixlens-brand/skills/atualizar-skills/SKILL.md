---
name: atualizar-skills
description: >-
  Atualiza as skills da Vixlens de uma vez, rodando os comandos de plugin por dentro. Use quando o usuário pedir "atualiza as skills", "atualizar skills da Vixlens", "saiu versão nova", "estou com a skill velha", "atualiza os plugins", "pega a versão nova", ou digitar /atualizar-skills. Também use quando uma skill Vixlens se comportar de forma diferente do que a documentação dela descreve — costuma ser versão defasada.
---

# Atualizar as skills da Vixlens

Roda os comandos de atualização no lugar da pessoa. Antes disso eram cinco linhas de terminal para copiar na ordem certa; quem errava a ordem atualizava o catálogo e não os plugins, e continuava na versão velha sem perceber.

## O que fazer

**1. Atualize o catálogo do marketplace.** Sem isso o Claude não fica sabendo que existe versão nova, e os comandos seguintes não encontram nada:

```bash
claude plugin marketplace update vixlens-marketplace
```

**2. Descubra quais plugins existem**, em vez de assumir uma lista fixa — plugin novo tem que entrar sozinho:

```bash
claude plugin list
```

Filtre os que terminam em `@vixlens-marketplace`.

**3. Atualize cada um**, um comando por plugin:

```bash
claude plugin update NOME@vixlens-marketplace
```

**4. Relate o que mudou.** Só interessa quem saiu de uma versão para outra. Diga em uma linha por plugin, no formato `vixlens-catalogo 0.6.1 → 0.7.0`. Quem já estava atualizado entra numa linha só no fim: "os outros já estavam na última versão".

**5. Avise que precisa reiniciar.** O cache da skill só recarrega no boot: até fechar e abrir o Claude, a versão velha continua valendo. Essa parte não é opcional e não dá para contornar de dentro da sessão.

## Depois de atualizar

Se algum plugin mudou de versão, ofereça mostrar o que mudou: o changelog está em **skills.vixlens.com.br**, na aba Novidades. Não invente o conteúdo da versão — ou leia a página, ou aponte para ela.

## Cuidados

- **Não rode `claude plugin uninstall` nem `marketplace remove`.** Atualizar não desinstala nada. Se um plugin parecer quebrado, diga o que viu e pergunte antes de mexer.
- **Se o `marketplace update` falhar**, pare e mostre o erro. Sem catálogo atualizado, os updates seguintes não fazem nada e o silêncio parece sucesso.
- **Escopo:** os comandos rodam em `user` por padrão, que é onde as skills da Vixlens ficam instaladas. Só passe `--scope` se a pessoa pedir.
- **Não confunda com a instalação.** Quem ainda não tem as skills precisa de `marketplace add` e `plugin install` antes — está na página inicial do skills.vixlens.com.br. Esta skill é só para quem já tem.
