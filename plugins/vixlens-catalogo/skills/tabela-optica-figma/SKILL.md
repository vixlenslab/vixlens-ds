---
name: tabela-optica-figma
description: Use when building or updating a Vixlens lens price table in Figma from a CSV — catálogo A4, tabela de preço marca própria, tabela por ótica, página de família de lente, atualização mensal de preços. Also use when a table page overflows the footer, when columns truncate text, when a lens family no longer fits one page, or when text on a family colour is hard to read.
---

# Tabela de lentes em Figma

Constrói o catálogo A4 inteiro no Figma a partir do CSV de tabela de preço por ótica.

**Estrutura:** capa, índice, uma ou mais páginas por família de lente, contracapa. Cada página de família = cabeçalho + slot de imagem + tabela. O índice cabe numa página só e acumula três coisas: a matriz de receita, o bloco "como ler a tabela" e os códigos de cor.

**O número de páginas não é fixo, mas o total tem que ser múltiplo de 4.** É imposição da impressão, não gosto: a folha impressa vira quatro páginas. Some as páginas de família ao capa, índice e contracapa e arredonde para cima até o próximo múltiplo de 4; a sobra vira folga no fim, não motivo para espremer família.

### Quantas páginas, de verdade

Não estime pelo número de famílias. **Construa e leia o `fimDaTabela` que o construtor devolve** — foi assim que se descobriu que a conta antiga errava.

A altura da tabela é previsível dentro de ±2px:

```
altura = 39 + 21×(separadores de índice) + 22×(produtos) + 18×(tiras de cor em linha própria)
```

Uma tira de **uma cor só** não gera linha: vira bolinha ao lado do nome do produto. Conte só as de duas cores ou mais. Com slot de imagem no piso (56px) a tabela começa em y=194, então **o teto é 602px de tabela**; sem slot de imagem, começa em 126 e o teto vai a 670.

Consequência prática: **21 produtos com 5 índices já ocupam 606px sem nenhuma tira de cor** — toda família desse tamanho quebra em duas, não importa a paleta.

Com as 16 famílias de 2026 e o CSV de uma ótica real, o resultado medido foi: 4 famílias de 21 produtos quebram sempre; Freevix One estoura por 13px e Astera por 34px — as duas cabem em página única **se abrirem mão do slot de imagem**. Fechamento em 24 páginas: capa + índice + 20 de família + contracapa.

As 15 do formato antigo ficaram para trás: os separadores de índice custam altura e empurram famílias para uma segunda página.

### Marca própria e linha Vixlens

As famílias se dividem em dois grupos, e isso aparece na peça:

| Grupo | Nome da lente | Selo do cabeçalho | Antirreflexo |
|---|---|---|---|
| **Marca própria** | o nome que a ótica deu (OPTIMA DAY, EYETECH PLUS) | nome da ótica | a marca dela, se houver (`CONFIG.antirreflexo`) |
| **Linha Vixlens** | o nome Vixlens (Freevix Astera, Bifocais…) | `LINHA VIXLENS` | Reflecta |

Astera, Bifocais Convencionais e Bifocais Freeform Invisível são revendidas sem marca própria. Escrever "MARCA PRÓPRIA VIXLENS" no selo delas é erro que sai impresso.

Quando a ótica tem marca própria, **peça o de-para antes de construir** — o CSV traz sempre o nome canônico Vixlens. Se ela batizou só parte das famílias, o padrão que funcionou foi prefixar as demais: `EYETECH VS HD`, `EYETECH DESKVIEW ATÉ 2M`.

## Pré-requisitos

- **MCP do Figma conectado** e autenticado numa conta com permissão de **edição** no arquivo de destino. Conta só com acesso de visualização falha na primeira chamada de escrita.
- **Host Grotesk** disponível no Figma, nos estilos Regular, Medium, Bold e ExtraBold. Confirme com `listAvailableFontsAsync` antes de construir.
- **PRÉ-REQUISITO DE SKILL:** carregue `figma-use` (ou o recurso `skill://figma/figma-use/SKILL.md`) antes de qualquer chamada `use_figma`.

## Quando usar

- Gerar o catálogo inteiro a partir de um CSV novo (troca de tabela, nova ótica, novo mês)
- Regerar uma família só depois de mudança de preço
- Ajustar o grid quando texto trunca ou a tabela invade o rodapé

**Não usar para:** o formato antigo de 12 colunas; peças que não sejam tabela de preço.

## Entrada

**CSV** no layout de 28 colunas do simulador: `Lente;Descrição;cod.;Diâm;Altura;Esf +;Esf -;Cilíndrico;Adição;Tabelão×4;Desconto;Custo×4;Markup Par;Markup Reflecta;Venda×4;Lucro×4`, separador `;`. Linhas cujo primeiro campo é vazio e o segundo começa com `cod. por cor:` são continuação da linha anterior.

## Perguntas antes de rodar

**Faça as três de uma vez, numa rodada só.** Espalhá-las pelo processo confunde quem está pedindo a tabela.

### 1. A tabela é de custo ou de venda

Decide qual base de preço do CSV entra — e muda a nota legal da capa.

| Resposta | Colunas | Para quem | Nota da capa |
|---|---|---|---|
| **Venda** | `Venda por par …` | balcão da ótica → consumidor final | valores são sugestão; o preço final é livre da ótica |
| **Custo** | `Custo pago por par …` | Vixlens → ótica | condição comercial, com validade; o desconto da ótica aparece no cabeçalho |

**Custo é sempre `Custo pago por par`**, nunca `Tabelão por par`. O tabelão é o preço de lista antes do desconto; o custo pago é o que aquela ótica realmente paga. Com desconto 0% os dois são iguais, então ler o custo pago acerta nos dois casos — e quando há desconto, é ele o número verdadeiro para aquela ótica.

**Markup e Lucro nunca entram na peça**, nas duas.

**A skill lê o CSV, nunca recalcula preço.** Não aplica markup, não arredonda valor, não deriva uma base a partir de outra. A única transformação sobre o número é cosmética: `CONFIG.centavos` corta as casas decimais na exibição.

Se os valores do CSV estiverem errados, o erro sai impresso. Toda decisão de preço — markup, desconto, normalização de anomalia — pertence à etapa que **gera** o CSV, que é anterior a esta skill e não faz parte dela. Ao receber um CSV, rode a checagem de coerência antes de construir: `venda = custo × markup` em todas as linhas, e as quatro colunas de preço em ordem crescente. Divergência aí é problema da fonte, não da peça — reporte antes de gerar duas dezenas de páginas em cima de número errado.

### 2. Destino no Figma

Arquivo novo ou link de um existente. Não dá para inferir — pergunte sempre.

### 3. Centavos

`R$ 2.826` ou `R$ 2.826,40`. `CONFIG.centavos`, padrão `false` (corta por truncamento, não arredonda).

## Pergunte só quando o dado exigir

- **Família fora das 16 conhecidas** (marca própria de terceiro, como a linha OPTIMA das Óticas Native): para qual família Vixlens ela mapeia. Define a cor e o tipo da página.
- **De-para da marca própria**: o CSV traz o nome canônico Vixlens. Se a ótica batiza as lentes, peça a lista toda numa rodada só, junto com o nome do antirreflexo dela, se houver. Pergunte também o que acontece com as famílias de linha Vixlens — o padrão é manterem nome e antirreflexo Vixlens.
- **Achados de qualidade no CSV**: preço divergente entre cores da mesma lente, dobras exatas de 2×, descrições duplicadas. Reporte os números e pergunte **uma vez**, com o diagnóstico pronto — nunca linha a linha.

## Resolva sozinho, não pergunte

| Item | Como |
|---|---|
| Cor e tipo da família | Bate o nome contra as 16 famílias de `referencia-tabela.md` |
| Dados da ótica na capa | Saem do cabeçalho do CSV; só pergunte se vierem vazios |
| Quantas páginas e onde quebrar | Automático, pela altura da tabela |
| Modo de altura (fixa / varia / null) | Sai da checagem de variância |
| Símbolos Ø e ↕ | Padrão da casa. O índice traz a legenda. `CONFIG.simbolos: false` volta para "Diâm." e "Alt." se alguém pedir |
| Coluna de tratamento vazia na família inteira | `CONFIG.semExpress: true`. A coluna sai, a largura vai para o nome do produto e entra a pílula "Sem … Express" no cabeçalho |
| Família sem índice de refração | O construtor já trata: separador com o nome da família e espaçador no lugar do chip |

## Fluxo

1. **Parsear o CSV** para linhas normalizadas, lendo a base de preco escolhida na pergunta 1 e separando produtos de linhas `cod. por cor`. O índice de refração sai do começo da descrição e vira campo próprio: `1.49 Resina Sun+` → `1.49` + `Resina Sun+`.
2. **Conferir constantes por família**: Cilíndrico, Adição e Altura costumam ter um único valor por família. Rode a checagem de variância. Cilindro e adição viram pílulas no cabeçalho; se **variarem dentro da família**, pare e reporte — o formato assume os dois constantes. Se a **altura** vier com mais de um valor, a família entra no modo `varia`.
3. **Empacotar em páginas.** Use a fórmula de altura acima, corte em limites de índice e equilibre as metades. Só então numere as páginas.
4. **Construir cada família** com `construtor.js`, e conferir o `fimDaTabela` que ele devolve. Uma chamada `use_figma` por família, ou duas por chamada — não mais que isso, o script fica grande demais. Dá para definir o construtor uma vez e chamá-lo em laço sobre várias famílias na mesma execução; o custo é o tamanho do bloco de dados.
5. **Fechar a paginação** com as alturas reais, criar os frames que faltam e numerar o rodapé. Só aqui os números existem de verdade.
6. **Construir o índice**, que depende dos números da etapa anterior.
7. **Capa e contracapa.**
8. **Validar** — obrigatório, ver abaixo.
9. **Screenshot** da página inteira e conferência visual.

**Não crie os 24 frames vazios antes de ter conteúdo.** Frame vazio no meio do arquivo parece trabalho pela metade para quem abre o Figma, e a paginação muda enquanto você mede. Crie o frame na hora de preencher.

Ao passar de família em família, só mudam `CONFIG` e `DADOS`. Famílias de visão simples têm `altura: null` e `adicao: null` — as pílulas correspondentes somem e a Disponibilidade fica só com esférico e diâmetro.

## O índice é uma matriz de receita

A pergunta que o balconista faz é "qual família atende **essa receita**?", e é esse o título da página. As colunas são as faixas que a receita traz, não os tratamentos disponíveis:

`Família | Tipo | Esférico | Cilíndrico | Adição | Alt. mín. | Ø máx. | Pág`

Todos esses dados saem do CSV. Duas marcações carregam o que mais gera troca de lente:

- **Vermelho** no cilindro das famílias que param em −4,00, quando as outras vão a −6,00. Use `#A82315`: o vermelho comum reprova o contraste nesse corpo de texto.
- **Negrito** na Alt. mín. das famílias com mais de uma altura, com a nota de que a altura de cada lente sai na própria linha da tabela.

Abaixo da matriz, na mesma página, vêm o bloco **"como ler a tabela"** e os **códigos de cor agrupados por tecnologia** (Transitions Gen S, Transitions XTRActive, Colors e Espelhado) — não uma lista corrida de bolinhas.

Uma matriz de quais antirreflexos cada família aceita **não** substitui isso: essa informação já está nas colunas de preço de cada página, e o travessão diz o resto.

## Rodapé

`TABELA DE PREÇO <NOME DA ÓTICA>` à esquerda, `NN / TT` à direita, com o total. Capa e contracapa não levam rodapé. O nome do frame acompanha a posição: `04 EYETECH PLUS (1/2)`, `05 EYETECH PLUS (2/2)`.

## Validação (não pule)

Rode as quatro antes de dizer que terminou:

| Checagem | Como | Critério |
|---|---|---|
| Texto não trunca | Nó de teste medindo o texto mais largo por coluna | `precisa <= largura` em todas |
| Tabela não invade o rodapé | `fimDaTabela` que o construtor devolve | `<= 796` |
| Nenhum dado perdido | Contar linhas de produto e códigos de cor contra o CSV | contagens idênticas |
| Contraste | Razão WCAG de **todo** texto sobre cor | ≥ 4,5:1; ≥ 7:1 no que estiver abaixo de 8pt |

Nunca chute largura de coluna. Meça. `0.00 a -4.00` estourou uma coluna de 44px por 1px e só apareceu na medição.

Contraste é o único item que **sempre** exige número calculado, nunca olhômetro — e a conta é a WCAG, não a luminância perceptual. Ver "Contraste" em `referencia-tabela.md`.

## Erros que já custaram retrabalho

| Sintoma | Causa | Correção |
|---|---|---|
| Texto claro ilegível sobre a cor da família | Escolha por luminância perceptual `0.299/0.587/0.114 > 0.6` em vez de razão WCAG | Usar `razao()` e escolher o lado de maior contraste. Errava em 6 das 12 famílias que existiam então |
| Número do chip de índice sumido | 4,5:1 é piso de 14pt; o chip tem 6.5pt | Fundo em 20% da cor + borda na cor cheia + texto `#2F2F2F` |
| Separador de índice apagado | Cor da família sobre branco reprova em 9 das 12 | Texto preto; a cor vai só na régua |
| Rodapé e imagem saltam de posição | `findOne(n => n.name.indexOf('Tabela ')===0)` casou com um nó de TEXTO — o Figma nomeia texto pelo conteúdo | Sempre filtrar por `n.type === 'FRAME'` |
| `Failed to parse SSE message: Invalid JSON` | O `return` levou texto contendo U+2028 (separador usado nas células de 2 linhas) | Nunca retornar `.characters` cru; trocar U+2028 por espaço antes de retornar |
| `Cannot write to node with unloaded font` ao só alinhar texto | `textAlignHorizontal` também exige fonte carregada | `loadFontAsync` de todos os estilos usados no início do script |
| `layoutSizingHorizontal` rejeitado | Setado antes do `appendChild` | Anexar primeiro, dimensionar depois |
| Iteração sobre a página quebra com `children of undefined` | Nó de teste de medição ficou solto na página | Filtrar `type === 'FRAME'` e remover o nó de teste no fim |
| Família que cabia numa página passou a estourar | Separadores de índice custam ~21px cada | Quebrar em duas num limite de índice; não encolher tipografia |
| Auto-layout não cresce e fica com 10px de altura | `resize()` chamado antes de preencher trava `layoutSizingVertical` em FIXED | Depois de preencher, `n.layoutSizingVertical = 'HUG'` |
| Colunas somem pela direita da caixa | Larguras somadas passaram do conteúdo útil e o auto-layout transbordou sem avisar | Somar as larguras **mais os gaps** e comparar com `largura − padding` antes de construir |
| Metade das cores não aparece na legenda | Grade montada por linhas de N itens quando a intenção era N colunas | Definir chips por linha explicitamente e conferir a contagem contra a paleta |
| Contagem de produtos maior que o CSV | O validador varreu também a tabela do índice, cujo nome também começa com "Tabela " | Excluir `Tabela indice` da contagem |
| Contraste "1:1" em texto sobre faixa colorida | A faixa é irmã do texto, não ancestral; a busca de fundo subiu até a página branca | Pôr o texto dentro do frame que o pinta, ou medir por sobreposição geométrica |
| Tira de cor sumida na peça | Linha `SUB~` esquecida ao transcrever os dados | Conferir produtos **e** tiras contra o CSV; tira de uma cor vira bolinha inline, e conta |

## Referências

- `referencia-tabela.md` — grid, contraste, paleta das 12 famílias, regras de formatação, capa/índice/contracapa
- `construtor.js` — código da Plugin API pronto para `use_figma`
