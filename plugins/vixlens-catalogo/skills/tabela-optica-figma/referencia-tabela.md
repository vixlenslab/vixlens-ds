# Referência — grid, paleta e formatação

## Página

A4 retrato 595 × 842. Fundo branco. **Margem 20px em todas as páginas** — capa, índice, tabela e contracapa.

| Elemento | Posição | Tamanho |
|---|---|---|
| Cabeçalho da família | x 20, y 44 | 555 × hug |
| Slot de imagem | x 20, abaixo do cabeçalho + 14 | 555 × elástico |
| Tabela | x 20, abaixo da imagem + 14 | 555 × hug |
| Rodapé | x 20, y 812 | texto 7pt `#6C6C6C` |

O rodapé fica em 812; a tabela não pode passar de **796**.

### Slot de imagem elástico

`CONFIG.alturaImagem` é só o ponto de partida. No fim da construção o slot cresce para consumir a sobra até o rodapé, com **teto 340** e **piso 56**. Antes disso o formato deixava ~190px mortos no pé de cada página.

Consequência: a peça passa a **depender da foto**. Com o slot vazio, ele é o maior bloco da página.

Para desligar o slot numa família, use `alturaImagem: 0`.

### Quebra de página

Estimativa da altura da tabela:

```
altura ≈ produtos × 22 + linhasDeCor × 18 + separadores × 21 + 37
```

O `37` cobre padding do container (14), a régua do cabeçalho (3) e a linha de títulos (20). A conta erra por ~5px para mais ou para menos — **confie no `fimDaTabela` que o construtor devolve, não na estimativa**.

Se `cabeNoRodape` vier `false`, **quebre a família em duas páginas num limite de índice**, equilibrando as metades. Nunca encolha a tipografia. Os separadores de índice custam ~21px cada, então famílias que cabiam no formato antigo podem não caber mais — no catálogo Native de 2026, cinco das doze famílias precisaram de duas páginas.

## Cabeçalho da família

Auto-layout vertical, fill na cor da família, raio 20, padding 12/16, gap 2.

- Linha 1: nome da família em Host Grotesk ExtraBold 22, seguido das **pílulas de constante** — pretas, raio 100, Bold 9 branco:
  - `Alt. mín. 16 mm` (ou `Alt. mín. varia por lente`), quando `CONFIG.altura` não é null
  - `Cil. até -6.00`
  - `Add. 0.50 a 5.00`, omitida em visão simples
- Linha 2: tipo da lente + `//  MARCA PRÓPRIA VIXLENS`, Medium 8

Cilindro e adição são **constantes da família** e ficam aqui, não na linha. Repetidos em toda linha, gastavam 23% da largura da tabela para dizer sempre a mesma coisa.

## Contraste — leia antes de escolher qualquer cor de texto

**Use razão de contraste WCAG, nunca luminância perceptual.** A fórmula `0.299R + 0.587G + 0.114B > 0.6` que este construtor usava até 02/09/2026 errava em 6 das 12 famílias: OPTIMA MAX saía com texto branco a **2,72:1**, abaixo até do piso de 3:1 de texto grande.

O certo é luminância relativa com a rampa sRGB e escolher o lado de maior razão:

```js
const lin = c => { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lumRel = h => 0.2126*lin(R) + 0.7152*lin(G) + 0.0722*lin(B);
const razao = (a, b) => (max(L) + 0.05) / (min(L) + 0.05);
const contraste = bg => razao('#FFFFFF', bg) >= razao('#000000', bg) ? '#FFFFFF' : '#000000';
```

**Valide o contraste de todo texto sobre cor, não só o do cabeçalho.** Na primeira rodada eu validei cabeçalho e chip e deixei passar o separador de índice, que reprovava em 9 das 12 famílias.

Dois lugares em que o mínimo de 4,5:1 do WCAG **não basta**, porque ele foi calibrado para 14pt:

| Elemento | Corpo | Regra |
|---|---|---|
| Chip de índice | 6.5pt | fundo em 20% da cor sobre branco + borda na cor cheia + texto `#2F2F2F` → 9,8 a 12,1:1 |
| Separador de índice | 8pt sobre branco | texto **preto puro**; a cor da família reprova (a mais clara dá 1,70:1) |

Chip preenchido na cor cheia deixava PRO em 5,10:1 e OFFICE NEAR em 4,82:1 — passa no papel, não se lê no balcão.

## Grid da tabela

Container: auto-layout vertical, **fill branco**, contorno `#E4E4E4`, raio 20, padding 8/10/6/10, gap 0.
Linha: auto-layout horizontal, raio 30, padding 3/8, gap 5, `counterAxisAlignItems: CENTER`, largura FILL.

| # | Coluna | Largura | Tipo |
|---|---|---|---|
| 0 | Cód | 27 | texto 8pt |
| 1 | Índ. | 26 | chip com fundo em 20% + borda |
| 2 | Produto | 168 | frame auto-layout (texto + bolinha opcional) |
| 3 | Disponibilidade | 70 | texto 6pt, 2 linhas, `#4A4A4A` |
| 4 | Valores | 208 | grupo auto-layout, gap 8, 4 células de 46 |

Soma: 27 + 26 + 168 + 70 + 208 + (4 gaps × 5) = 519, dentro dos 519 disponíveis (555 internos − 20 de padding do container − 16 de padding da linha).

**A cor da família não preenche mais o container.** Ela aparece no bloco de cabeçalho e numa **régua de 3px logo abaixo da linha de títulos** da tabela. Container colorido criava uma moldura que sobrava nas bordas das linhas arredondadas e lia como etiqueta.

Tipografia: Host Grotesk Regular 8pt com `letterSpacing` −4% nas células de dado; Bold 8pt (colunas 0–2) e Bold 7pt (3) no cabeçalho, `letterSpacing` 0. Texto de corpo em `#2F2F2F`, não `#000000`.

**Sem zebra.** Os separadores de índice já estruturam a tabela; alternar tons sobre container branco lia como "algumas linhas destacadas". Linhas de produto ficam `#FFFFFF`; a linha de cores fica `#FAFAFA`, só para agrupar com a lente de cima.

### Separador de índice

Linha própria antes de cada mudança de índice: `ÍNDICE 1.49` em ExtraBold 8pt preto com tracking 6%, seguido de uma régua de 1px `#E4E4E4` que preenche o resto. Padding 7/8/3/8.

Resolve duas coisas: dá o degrau tipográfico que faltava entre o título de 22pt e o corpo de 6pt, e evita varrer 25 linhas para achar o 1.67. A régua é **neutra em todas as famílias** — cor ali seria identidade repetida, e o separador é estrutura.

### Títulos das colunas de preço

Bold 6.5pt, alinhados à esquerda. A primeira é uma linha só; as outras três quebram em duas por U+2028:

`Par` · `Reflecta` / `Express` · `Reflecta` / `Guard` · `Reflecta` / `Blue Protect`

## Formatação de conteúdo

### Disponibilidade

Duas linhas separadas por U+2028. **Só o que varia por lente.** Cilindro e adição estão nas pílulas do cabeçalho.

```
Esf. +6.00 a -10.00
Ø80
```

Com `CONFIG.altura === 'varia'`, a altura entra na segunda linha: `Ø75 | ↕18`.

**Sempre duas casas decimais no esférico, ponto como separador, hífen simples.** Nunca vírgula, nunca cortar os dois zeros.

### Símbolos — `CONFIG.simbolos`

| | `true` | `false` |
|---|---|---|
| Diâmetro | `Ø80` | `Diâm. 80mm` |
| Altura | `↕18` | `Alt. 18mm` |

`Ø` é **U+00D8**, não U+2300 — o sinal de diâmetro tem desenho de minúscula e some no 6pt. `↕` é U+2195. Os dois existem na Host Grotesk.

**Símbolo é o padrão da casa** (`simbolos: true`). O bloco "COMO LER A TABELA" do índice é obrigado a explicar os dois — símbolo sem legenda é ícone sem rótulo. Use `false` só quando alguém pedir por extenso.

### Preços — `CONFIG.centavos`

`false` (padrão) corta as casas decimais por truncamento: `R$ 2.826,40` vira `R$ 2.826`. Não arredonda.

Alinhados à esquerda, títulos inclusive. Combinação inexistente: `—` **centralizado**, para ler como ausência e não competir com os números.

### Coluna Cód

- Código próprio: o número
- Código depende da cor e está na linha abaixo: `↓` centralizado
- Nunca `—` nesta coluna

### Bolinhas de cor

Conjunto com **uma cor só** (as Transitions XTRActive): a bolinha vai inline, dentro do frame do Produto, depois do texto, gap 5.

Conjunto com **duas ou mais cores**: linha própria logo abaixo, fill `#FAFAFA`, padding 4/8, gap 6 entre pares, **sempre precedida do rótulo `COD:`** em Bold 7pt `#4A4A4A`.

Bolinha padrão: círculo 10px, raio 100, inicial da cor em Bold 5pt centralizada, código em Regular 6pt ao lado com gap 2.

Bolinha do Espelhado: círculo 14px, sigla de duas letras em Bold 5pt, código em Regular 7.5pt, gap 3 no par e 10 entre pares.

Cor do texto dentro da bolinha: mesma regra de contraste WCAG.

### Ordem das cores — fixa, não vem do CSV

A sequência é sempre a mesma, independente da ordem em que o CSV listar os códigos. **Ordene antes de desenhar.**

| Conjunto | Ordem |
|---|---|
| Transitions Gen S | Cinza · Marrom · Verde · Ametista · Safira · Âmbar · Esmeralda · Rubi |
| Freevix Colors | Marrom · G15 · Black |
| Espelhado | Prata · Dourado · Azul · Rosa |

Lentes com menos cores usam a **subsequência**, sem reordenar: `Marrom · Verde · Ametista` está certo; `Verde · Marrom` não.

**Why:** a bolinha é o elemento que o balcão usa para achar a cor, e a posição vira memória muscular. Se a ordem muda de página para página, o atendente perde o atalho e volta a ler código por código. Confirmado com o Otávio em 03/09/2026.

### Nome do produto quando o preço varia por cor

Se as cores de uma mesma lente têm preços diferentes, cada faixa vira linha própria. O nome precisa dizer de quais cores fala:

- **1 cor:** `Resina Transitions Gen S Cinza`
- **2 ou mais:** `Resina Transitions Gen S (5 cores)` — a linha de bolinhas logo abaixo lista quais

Enfileirar os nomes (`Marrom/Verde/Ametista/Safira/Âmbar`) estourava 138px numa coluna de 168 e chegava a 271px com sete cores.

### Altura

Três modos, definidos por `CONFIG.altura`. Escolha pelo resultado da checagem de variância, nunca por suposição.

| `CONFIG.altura` | Quando | Pílula | Linha |
|---|---|---|---|
| `'16 mm'` | um único valor na família inteira | `Alt. mín. 16 mm` | nada |
| `'varia'` | dois ou mais valores | `Alt. mín. varia por lente` | `\| ↕NN` no fim da linha 2, **em todas as linhas** |
| `null` | visão simples, o CSV não traz altura | sem pílula | nada |

No modo `varia`, cada registro de `DADOS` precisa trazer a sua altura no 11º campo. O construtor lança erro se faltar — melhor quebrar do que publicar uma linha sem altura.

**Por que em todas as linhas e não só nas divergentes.** Marcar só a exceção obriga quem lê a inferir o resto do cabeçalho. Funciona com uma exceção, quebra com cinco. E a divergência costuma ser para cima: sem a altura explícita, a peça promete que a lente monta numa armação menor do que ela aceita, e o erro só aparece na montagem, virando refação.

## Paleta

### Famílias — Vixlens

| Família | Cor | Altura | Cilindro | Adição |
|---|---|---|---|---|
| VIX TOTAL | `#F7B200` | 18 mm | -4.00 | 1.00 a 3.50 |
| FREEVIX ONE | `#EF7F02` | 18 mm | -6.00 | 0.50 a 5.00 |
| FREEVIX PREMIUM | `#D94F2B` | 16 mm | -6.00 | 0.50 a 5.00 |
| FREEVIX FREEDOM | `#B5306B` | varia | -6.00 | 0.50 a 5.00 |
| FREEVIX IA TECH | `#7A4BC4` | varia | -6.00 | 0.50 a 5.00 |
| FREEVIX VISÃO SIMPLES | `#00497A` | null | **-4.00** | null |
| FREEVIX VS HD | `#006BB2` | null | -6.00 | null |
| VS RELAX 0,50 | `#2E9BD6` | null | -6.00 | null |
| VS RELAX 0,75 | `#5BB8E0` | null | -6.00 | null |
| VS RELAX 1,00 | `#8FD0EA` | null | -6.00 | null |
| DESKVIEW ATÉ 1,3M | `#0E8A5F` | 16 mm | -6.00 | 0.75 a 3.50 |
| DESKVIEW ATÉ 2M | `#3FA96E` | 16 mm | -6.00 | 0.75 a 3.50 |
| OFFICE ATÉ 4M | `#78B472` | 16 mm | -6.00 | 0.75 a 3.50 |
| FREEVIX ASTERA | `#C9A227` | **18 mm** | -6.00 | null |
| BIFOCAIS CONVENCIONAIS | `#6E6E76` | 13 mm | **-4.00** | 1.00 a 3.50 / 1.00 a 3.00 |
| BIFOCAIS FREEFORM INVISÍVEL | `#43505E` | 13 mm | -6.00 | 0.50 a 5.00 |

Cilindro e adição mudam por família — **nunca reaproveite os da anterior**, confira contra o CSV.

**Duas famílias param em -4.00 e isso é exceção**: Vix Total e Freevix Visão Simples, as de entrada de cada linha. Na matriz do índice, marque o cilindro delas em `#C81E1E` Bold — é a diferença que mais gera pedido errado no balcão.

**As Bifocais Convencionais também param em -4.00, e ali é o normal.** Bifocal não é multifocal: o desenho não comporta o mesmo cilindro. Não marque em vermelho — marcar o esperado ensina o balcão a ignorar a cor, e aí a marcação deixa de servir para a Vix Total e a Visão Simples, que é onde ela precisa funcionar.

Tipo: Multifocal → `LENTES MULTIFOCAIS SURFAÇADAS`; VS → `LENTES DE VISÃO SIMPLES SURFAÇADAS`; ocupacional → `LENTES OCUPACIONAIS SURFAÇADAS`.

**Freevix Visão Simples** é a de entrada da linha de visão simples, conferida contra o tabelão `tabelona_vixlens_2026_digital_v16`, página 13, logo antes da VS HD. Vem no CSV como as outras. Exports gerados até 02/09/2026 trazem 12 famílias e não a incluem — se estiver trabalhando com um desses, peça o export atualizado em vez de montar a página na mão.

**O nome é "Visão Simples", não "VS".** A abreviação só aparece na VS HD e nas VS Relax; esta usa por extenso, como no tabelão.

### As três sem marca própria

Entraram em 28/09/2026, das páginas 11 e 12 do tabelão v16. São lentes Vixlens como as outras — mesmo cálculo, mesmo desconto — e a diferença é só que a ótica revende sem pôr o nome dela. Cada uma traz uma particularidade que o construtor precisa tratar:

**Freevix Astera — não tem coluna Reflecta Express.** O tabelão traz PAR, Guard e Blue Protect, e só. As 19 linhas vêm no CSV com o campo de Express vazio. Não invente o valor a partir de PAR+50: a coluna não existe para essa família.

**Freevix Astera é visão simples e mesmo assim tem altura.** É a exceção à regra de que visão simples vai com `altura: null` — a página traz 18 mm em todas as linhas e o rótulo dela é "visão simples especial". A adição continua `null`, como nas outras cinco.

**Bifocais Convencionais não têm índice.** As cinco linhas são desenhos — Ultex e Biovis —, não materiais por índice. A família inteira é um bloco só: um separador com o nome dela no lugar de `Índice 1.49`, e nada de quebrar por limite de índice, porque não há limite.

### Marca própria de terceiro

Uma ótica com linha própria (ex.: OPTIMA, das Óticas Native) reaproveita a paleta pela **família Vixlens equivalente**. Registre o mapeamento antes de construir.

### Cores de lente

| Cor | Hex | Inicial |
|---|---|---|
| Cinza | `#6C6C6C` | C |
| Marrom | `#69401C` | M |
| Verde | `#3B5424` | V |
| Ametista | `#54317B` | A |
| Safira | `#1C5A95` | S |
| Âmbar | `#754D17` | Â |
| Esmeralda | `#106943` | E |
| Rubi | `#711533` | R |

Freevix Colors: G15 `#3F4A3C` (G), Black `#1A1A1A` (B), Marrom reaproveita o hex acima.

Espelhado — sigla de duas letras, E de Espelhado + inicial da cor: Prata `#9EADB0` (EP), Dourado `#BDB024` (ED), Azul `#0538D9` (EA), Rosa `#FFA1FF` (ER).

Ametista e Âmbar dividem a letra A na legenda oficial. Mantivemos `A` para Ametista e `Â` para Âmbar — aprovado pelo Otávio em 02/09/2026; as duas aparecem juntas em toda linha de Transitions Gen S.

## Capa, índice e contracapa

**Capa, contracapa e as fotos das páginas de família são trabalho do designer, não da skill.** Gere só os slots tracejados e o texto estrutural; não invente imagem, logo nem dados de contato.

**Capa:** slot `CAPA` 595×470 sangrado no topo, slot `LOGO VIXLENS` 150×46 em (20, 500), título ExtraBold 34 em duas linhas (a segunda em `#6C6C6C`), bloco "EMITIDO PARA" com os dados do cabeçalho do CSV (ótica, CNPJ, responsável, telefone, desconto, data), e a nota legal em 7pt no pé.

**A nota legal muda com a base de preço** escolhida na pergunta 1 do SKILL:

| Base | Nota |
|---|---|
| Venda (`Venda por par`) | os valores são **sugestão** de venda por par; a definição do preço final ao consumidor é livre e exclusiva da ótica |
| Custo (`Custo pago por par`) | **condição comercial** do laboratório, por par, já com o desconto da ótica, sujeita a validade e confirmação no pedido; a peça é nominal àquela ótica |

Dizer "sugestão, preço livre" numa peça de custo é falso — aquilo é o preço do laboratório, não sugestão.

**Índice:** título `QUAL FAMÍLIA ATENDE ESSA RECEITA?` ExtraBold 22 e a matriz de compatibilidade — uma linha por família com chip de cor 14×14 raio 4, nome, tipo, esférico, cilíndrico, adição, altura, diâmetro e página. Larguras `[14,128,65,70,56,60,46,38,18]`, gap 5, container `#E4E4E4`. Família em modo `varia` mostra os dois valores na coluna Alt., em Bold: `16/18mm`. Deixar só um valor ali contradiz a página da família. As famílias que param num cilindro menor que as outras (Vix Total e Freevix Visão Simples, ambas em -4.00) vão em `#C81E1E` Bold.

Abaixo da matriz vêm o bloco **COMO LER A TABELA** e a legenda das bolinhas. O bloco precisa explicar os dois modos de altura e, quando `CONFIG.simbolos` estiver ligado, **o que significam `Ø` e `↕`** — símbolo sem legenda é ícone sem rótulo.

A legenda agrupa por tratamento, não por cor, nesta ordem: **TRANSITIONS GEN S** com as oito cores em duas colunas, **TRANSITIONS XTRACTIVE** só com Cinza, e **FREEVIX COLOR** com Marrom, G15 e Black numa coluna e os quatro Espelhado na outra. Bolinha 12px, rótulo Regular 7.5pt, título do grupo Bold 7.5pt com tracking +2%.

**Contracapa:** slot `CONTRACAPA` 595×560, logo, bloco de contato com placeholders e o texto legal em 7pt.

**A numeração de página não é fixa.** Depende de quantas famílias quebraram em duas. Gere a lista de páginas a partir do resultado do empacotamento e só então escreva os rodapés e a coluna Pág. da matriz.
