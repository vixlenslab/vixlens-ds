# Dois construtores de tabela: o que é igual, o que diverge

Análise de `tabela-optica-figma/construtor.js` (448 linhas, 21 funções) e `promovix/construtor.js`
(682 linhas, 45 funções), feita em 05/10/2026 comparando função por função.

## Resultado

- **A duplicação real é pequena.** Só 9 nomes de função coincidem. Sete são a mesma matemática de cor, com a lógica
  idêntica: `canais`, `rgb`, `lin`, `lumRel`, `razao`, `contraste` e `fill`. As outras 36 funções da Promovix
  (capa, combo, faixas, selos, ícones, QR) não existem no catálogo.
- `tinta20` dá o mesmo resultado nos dois (0,2·x + 204), escrita de jeitos diferentes.
- `bolinha` é a mesma ideia construída de forma diferente (catálogo: moldura com tamanho "grande";
  Promovix: Auto Layout com texto por helper). Não é cópia, é reimplementação.
- **Há uma divergência de dado, não de código:** a tabela de cores `CORES` das bolinhas é igual nos dois
  arquivos, exceto em duas cores.

| Cor | tabela-optica-figma | promovix |
|---|---|---|
| Cinza | `#545454` | `#6C6C6C` |
| Esmeralda | `#0C5335` | `#106943` |

Na prática, a mesma bolinha Transitions sai com cinza e verde diferentes no catálogo e na promoção.
Pode ser decisão de design ou deriva. **Quem decide qual vale é o design.**

## Recomendação

**Não unir os construtores agora.** O ganho seria de umas 20 linhas, e não dá para validar a mudança sem rodar no
Figma. O risco é maior que o benefício. Em vez disso:

1. `plugins/vixlens-catalogo/teste/paridade-construtores.mjs` (já rodando no `npm test`) falha se qualquer um
   dos 7 helpers ou a tabela `CORES` divergir entre os dois arquivos, ou se a sigla de uma cor mudar.
2. As duas divergências acima estão registradas como conhecidas. Quando alguém decidir o valor certo, iguala os
   dois arquivos e tira a entrada da lista. O teste avisa se a lista ficar velha.
3. Se um dia valer a pena unir, o bloco comum (helpers de cor + `CORES`) é o primeiro candidato. Lembrar que o
   construtor roda como bloco único no `use_figma` (limite de 50 mil caracteres); o `montar.py` já injeta partes
   por marcadores `//#sec`, e é o jeito natural de montar um bloco comum.

## Pendências para quem conhece o design

- Qual é o `Cinza` e o `Esmeralda` certos: o do catálogo ou o da Promovix?
- `tabela-optica-figma/SKILL.md` (linha 234) diz "paleta das 12 famílias", enquanto o texto e a referência falam em
  16. Provavelmente a "12" ficou velha. Não alterei, porque é texto de skill.
