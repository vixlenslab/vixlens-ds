---
name: tabela-optica-figma
description: Use when building or updating a Vixlens lens price table in Figma from a CSV — catálogo A4, tabela de preço marca própria, tabela por ótica, página de família de lente, atualização mensal de preços. Also use when a table page overflows the footer, when columns truncate text, when a lens family no longer fits one page, or when text on a family colour is hard to read. Also use for the coloured header (type chip, data chips, availability line), the photo banner and its attribute chart, the Transitions Gen S highlight, the colour of each lens family and the client spelling of lens names.
---

# Tabela de lentes em Figma

Constrói o catálogo A4 inteiro no Figma a partir do CSV de tabela de preço por ótica.

**Estrutura:** capa, índice, uma ou mais páginas por família de lente, contracapa. Cada página de família = cabeçalho + slot de imagem + tabela. O índice cabe numa página só e acumula três coisas: a matriz de receita, o bloco "como ler a tabela" e os códigos de cor.

**O número de páginas não é fixo, mas o total tem que ser múltiplo de 4.** É imposição da impressão, não gosto: a folha impressa vira quatro páginas.

**Menos páginas é mais barato, e o arredondamento é degrau, não rampa.** 21 páginas custam o mesmo que 24 — então, ao chegar a um número logo acima de um múltiplo de 4, vale procurar as três ou quatro páginas que faltam para descer um degrau inteiro. Duas alavancas fazem isso sem encolher tipografia: **agrupar famílias** numa página e **tirar os separadores de índice** de famílias que estouram por pouco (ver as duas seções abaixo). A sobra vira folga no fim, nunca motivo para espremer família.

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

### Página agrupada

Famílias pequenas e parecidas dividem uma página. Em vez de `DADOS`, declare `BLOCOS`: o separador passa a ser por família, com a bolinha da cor de cada uma, e o índice de refração continua no chip de cada linha.

```js
const BLOCOS = [
  { nome: 'EYETECH DESKVIEW ATÉ 1,3M', cor: '#0E8A5F', dados: `...` },
  { nome: 'EYETECH DESKVIEW ATÉ 2M',   cor: '#3FA96E', dados: `...` },
  { nome: 'EYETECH OFFICE ATÉ 4M',     cor: '#78B472', dados: `...` }
];
```

**Quando vale agrupar:** famílias que compartilham altura mínima, cilindro e adição, e cujos produtos são os mesmos — só mudando código e preço. As três ocupacionais são o caso exemplar: em páginas separadas viravam três páginas quase idênticas em sequência; juntas, a página passa a permitir comparar o preço das três lado a lado, que é a pergunta real de quem vende.

**Quando as famílias divergem** em cilindro, adição ou disponibilidade de Express, essas pílulas descem para o separador do bloco e o cabeçalho fica só com o que é comum:

```js
{ nome: 'BIFOCAIS CONVENCIONAIS', cor: '#6E6E76',
  pilulas: ['Cil. até -4.00', 'Add. 1.00 a 3.50 / 1.00 a 3.00', 'Sem Reflecta Express'], dados: `...` }
```

Nesse caso a tabela é uma só e mantém as quatro colunas, então a família sem Express volta a exibir travessão nessas linhas — a pílula do bloco é o que explica. `CONFIG.semExpress` só serve para página de família única.

**O que o agrupamento custa:** o separador por índice. Em família de 6 produtos isso é ganho (4 separadores para 6 lentes é mais separador que lente); em família de 14 ou mais, pesa — o olho perde o degrau que agrupava por índice.

**A conta:** some o corpo de cada família (altura da tabela menos 39 de base e menos os separadores de índice), some 21 por bloco, e some 39. Compare com o teto da página. Duas famílias de 14 produtos dão ~845px e não cabem em 670.

### Encolher sem agrupar

`CONFIG.semSeparadorIndice: true` tira os separadores de uma família única. São ~21px cada, e é isso — não o volume de lentes — que empurra várias famílias para a segunda página. Uma família de 21 produtos com 5 índices tem 105px só de separador: sem eles, cabe numa página.

Use quando fechar o múltiplo de 4 depender disso. O índice continua legível no chip de cada linha, mas a tabela vira uma lista corrida — em famílias grandes, avalie se vale.

### Marca própria e linha Vixlens

As famílias se dividem em dois grupos, e isso aparece na peça:

| Grupo | Nome da lente | Selo do cabeçalho | Antirreflexo |
|---|---|---|---|
| **Marca própria** | o nome que a ótica deu (OPTIMA DAY, EYETECH PLUS) | nome da ótica | a marca dela, se houver (`CONFIG.antirreflexo`) |
| **Linha Vixlens** | o nome Vixlens (Freevix Astera, Bifocais…) | `LINHA VIXLENS` | Reflecta |

Astera, Bifocais Convencionais e Bifocais Freeform Invisível são revendidas sem marca própria. Escrever "MARCA PRÓPRIA VIXLENS" no selo delas é erro que sai impresso.

Quando a ótica tem marca própria, **peça o de-para antes de construir** — o CSV traz sempre o nome canônico Vixlens. Se ela batizou só parte das famílias, o padrão que funcionou foi prefixar as demais: `EYETECH VS HD`, `EYETECH DESKVIEW ATÉ 2M`.

## Padrão de cabeçalho, banner, gráfico, Gen S e cor (0.13.0)

Fechado em 09/10/2026 com a Mari no catálogo da Ótica do Toninho. **Esse catálogo é o modelo: a regra é reproduzir a tabela do Toninho**, não só as peças isoladas. **Leia `referencia-cabecalho-banner.md` antes de montar ou revisar qualquer página de família.** O resumo:

1. **Cabeçalho em três linhas:** nome + chip do tipo da lente (branco, texto preto) / chips Alt., Cil., Add. (branco 16%, texto branco) / `Disponibilidade 1.49 | …` em Bold. Sem `// ÓTICA DO …` nem `LENTES … SURFAÇADAS //`.
2. **Nome, tipo e disponibilidade vivem só no cabeçalho colorido.** O banner da foto não os repete: leva só o gráfico à esquerda e os tratamentos, com rótulos **"Distribuição da visão"** (Perto/Intermediário/Longe) ou **"Atributos"**, e **"Tratamentos"**.
3. **Gráfico:** 5 colunas, linhas de **0,3 mm (0,85 pt)** para sair na impressão, valores originais preservados em proporção.
4. **Logos de tratamento num tamanho só** em todas as páginas, com o traço do Transitions.
5. **Cor por família de lente** (nunca duas iguais): comanda cabeçalho, chips de índice e régua da tabela.
6. **Destaque do Transitions Gen S** (pílula com degradê + faixa lateral de 3 px). Até a 0.12.x a skill não gerava isso.
7. **Nomes na grafia do cliente** (`RELAX 0.50`, `OFFICE NEAR/MID/MAX`), nunca nomes Vixlens numa peça de marca própria.
8. **Contracapa** com os contatos reais; placeholder vazio sai. **Sem texto legal** na capa e na contracapa (regra do modelo do Toninho).

Também documentados na referência: **300 dpi nas fotos** (como medir, ponto vermelho, ampliação com Real-ESRGAN), **fatos de produto** (Astera sem Reflecta Express) e o que ainda está **em aberto** (bolinhas de seção, `Resina Freevix Colors`).

**Estado do código:** `construtor.js` ainda gera o cabeçalho antigo de duas linhas e não faz banner, gráfico nem Gen S. Hoje o padrão é aplicado **depois** da construção, página a página, e **sempre com cópia `ARQUIVO // pág NN …` antes**. Transformar isso em código do construtor é o próximo passo.

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

**CSV** no layout de 29 colunas do simulador: `Lente;Descrição;cod.;Diâm;Altura;Esf +;Esf -;Cilíndrico;Adição;Tabelão×4;Desconto;Custo×4;Markup Par;Markup Reflecta;Venda×4;Lucro×4;Linha do cliente`, separador `;`. Linhas cujo primeiro campo é vazio e o segundo começa com `cod. por cor:` são continuação da linha anterior.

**Coluna 29, `Linha do cliente`** (desde 01/10/2026): o nome que a ótica deu à família no simulador (`Virtu Start` para o Vix Total). Preenchida, vira o título da família na peça (`CONFIG.titulo`); vazia, vale o nome Vixlens. A cor e o tipo da família continuam saindo da coluna 1, `Lente`, que segue com o nome Vixlens. Astera e bifocais vêm sempre vazias: a ótica revende sem nome próprio. CSV antigo, de 28 colunas, é o mesmo arquivo sem esse nome — leia normalmente e trate como coluna 29 vazia.

## Perguntas antes de rodar

**Faça as três de uma vez, numa rodada só.** Espalhá-las pelo processo confunde quem está pedindo a tabela.

### 1. A tabela é de custo ou de venda

Decide qual base de preço do CSV entra — e muda a nota legal da capa.

| Resposta | Colunas | Para quem | Nota da capa (comportamento até a 0.12.x; a 0.13.0 não gera nota, ver `referencia-cabecalho-banner.md`) |
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
- **De-para da marca própria**: primeiro leia a coluna 29, `Linha do cliente` — o que vier preenchido ali já é o nome da ótica e **não se pergunta de novo**. Só se a ótica batiza as lentes e a coluna veio vazia (ou o CSV é antigo, de 28 colunas), peça a lista das que faltam numa rodada só. O nome do antirreflexo dela não vem no CSV: pergunte junto, se houver. Pergunte também o que acontece com as famílias de linha Vixlens — o padrão é manterem nome e antirreflexo Vixlens.
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

Todos esses dados saem do CSV. Uma marcação só:

- **Negrito** na Alt. mín. das famílias com mais de uma altura, com a nota de que a altura de cada lente sai na própria linha da tabela.

**Nada de vermelho na matriz.** O cilindro das famílias que param em −4,00 sai no mesmo estilo das outras (Regular `#2F2F2F`). A marcação em vermelho existiu até a 0.7.0 e foi retirada a pedido do Otávio em 28/09/2026.

Abaixo da matriz, na mesma página, vêm o bloco **"como ler a tabela"** e os **códigos de cor agrupados por tecnologia** (Transitions Gen S, Transitions XTRActive, Colors e Espelhado) — não uma lista corrida de bolinhas.

Uma matriz de quais antirreflexos cada família aceita **não** substitui isso: essa informação já está nas colunas de preço de cada página, e o travessão diz o resto.

## Rodapé

`TABELA DE PREÇO <NOME DA ÓTICA>` à esquerda, `NN / TT` à direita, com o total. Capa e contracapa não levam rodapé. O nome do frame acompanha a posição: `04 EYETECH PLUS (1/2)`, `05 EYETECH PLUS (2/2)`.

## Validação (não pule)

Rode **todas** antes de dizer que terminou:

| Checagem | Como | Critério |
|---|---|---|
| Texto não trunca | Nó de teste medindo o texto mais largo por coluna | `precisa <= largura` em todas |
| **Nada transborda o container** | Largura de cada filho contra a do pai menos padding | `filho <= util` em todos |
| Tabela não invade o rodapé | `fimDaTabela` que o construtor devolve | `<= 796` |
| Nenhum dado perdido | Contar linhas de produto e códigos de cor contra o CSV | contagens idênticas |
| Contraste | Razão WCAG de **todo** texto sobre cor | ≥ 4,5:1; ≥ 7:1 no que estiver abaixo de 8pt |
| **Espessura das linhas** (gráfico do banner) | Largura de todo traço e retângulo-linha | ≥ **0,3 mm = 0,85 pt** (mínimo para sair na impressão) |
| **Chips de dados a 16%** | Razão WCAG do texto branco sobre a cor **composta** (cabeçalho + branco a 16%) | ≥ 4,5:1; cabeçalho claro (menta) reprova — escureça o fundo |
| **Resolução das imagens** | dpi efetivo de cada foto (ver `referencia-cabecalho-banner.md`, seção 9) | ≥ **300 dpi**; ponto vermelho nas que falharem |
| Nomes do cliente | Buscar `Deskview`, `VS Relax`, `Freevix` em texto de marca própria | nenhum fora da linha Vixlens (Astera, Bifocais) |

**Truncamento e transbordo são coisas diferentes, e a checagem de um não pega o outro.** Célula de largura fixa com `textTruncation` trunca e aparece no primeiro teste. Auto-layout em HUG não faz nem uma coisa nem outra: ele cresce além do pai e desenha por cima da borda, sem erro nenhum. Foi assim que 8 cabeçalhos de 24 saíram com as pílulas atravessando o bloco colorido, passando por uma validação que só olhava truncamento. Meça **todo** filho contra a largura útil do pai, não só o que você espera que seja apertado.

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
| Pílulas do cabeçalho atravessam a borda do bloco colorido | Nome longo com 3 ou 4 pílulas passa dos 523px úteis; auto-layout em HUG transborda sem truncar | `layoutWrap = 'WRAP'` na linha de título, com `layoutSizingHorizontal = 'FILL'`; o slot de imagem reabsorve a altura |
| Colunas somem pela direita da caixa | Larguras somadas passaram do conteúdo útil e o auto-layout transbordou sem avisar | Somar as larguras **mais os gaps** e comparar com `largura − padding` antes de construir |
| Metade das cores não aparece na legenda | Grade montada por linhas de N itens quando a intenção era N colunas | Definir chips por linha explicitamente e conferir a contagem contra a paleta |
| Contagem de produtos maior que o CSV | O validador varreu também a tabela do índice, cujo nome também começa com "Tabela " | Excluir `Tabela indice` da contagem |
| Contraste "1:1" em texto sobre faixa colorida | A faixa é irmã do texto, não ancestral; a busca de fundo subiu até a página branca | Pôr o texto dentro do frame que o pinta, ou medir por sobreposição geométrica |
| Tira de cor sumida na peça | Linha `SUB~` esquecida ao transcrever os dados | Conferir produtos **e** tiras contra o CSV; tira de uma cor vira bolinha inline, e conta |

## Testar o construtor sem abrir o Figma

`teste/testa-construtor.mjs` roda o `construtor.js` contra um stub da Plugin API e confere a estrutura gerada: que separador saiu, quantos, quantas linhas, quantos chips. Pega erro de lógica antes de gastar chamada de MCP.

```bash
node plugins/vixlens-catalogo/skills/tabela-optica-figma/teste/testa-construtor.mjs
```

Cobre os quatro caminhos: família única, família única sem separador de índice, página agrupada com três blocos, e página agrupada com um bloco só (que deve se comportar como família única). **Rode depois de qualquer mudança no construtor** — o stub mede altura por aproximação, então ele valida estrutura, não pixel. Pixel só o Figma confirma.

## Referências

- `referencia-tabela.md` — grid, contraste, paleta das 12 famílias, regras de formatação, capa/índice/contracapa
- `referencia-cabecalho-banner.md` — padrão 0.13.0: cabeçalho em 3 linhas, banner enxuto, gráfico, logos, Gen S, cor por família, nomes do cliente
- `construtor.js` — código da Plugin API pronto para `use_figma`
