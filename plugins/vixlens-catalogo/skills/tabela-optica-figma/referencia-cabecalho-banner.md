# Referência — cabeçalho, banner, gráfico, Gen S, cores e nomes (padrão 0.13.0)

Padrão fechado com a Mari em 09/10/2026 no catálogo da Ótica do Toninho (Figma `nriDdl7KbLjlgBEmkJjeFv`, 20 páginas). **Substitui** o cabeçalho de duas linhas descrito em `referencia-tabela.md` e acrescenta o banner enxuto, o destaque do Transitions Gen S e a cor por família.

> **Estado do código:** `construtor.js` ainda gera o cabeçalho antigo (duas linhas, pílulas pretas na linha do título). O padrão abaixo é aplicado **depois** da construção, página a página, até o construtor ser atualizado. Antes de mexer em qualquer página, clone-a para fora da área de trabalho como `ARQUIVO // pág NN antes de …`.

## 1. Cabeçalho em três linhas

Auto-layout vertical, raio 20, padding 12/16, **gap 6**, texto sempre branco. Altura final **96**.

| Linha | Conteúdo | Estilo |
|---|---|---|
| 1 `titulo` | nome da lente + chip do tipo da lente | nome Host Grotesk ExtraBold 22 caixa alta; chip **branco sólido, texto preto**, Bold 7, altura 20, padding 9/3,5, raio 100 |
| 2 `dados` | chips `Alt. mín.`, `Cil. até`, `Add.` | **branco 16% de opacidade, texto branco**, Bold 9, altura 20, raio 100, gap 10 |
| 3 | `Disponibilidade 1.49 \| 1.56 \| …` | Host Grotesk **Bold** 8, branco, direto sobre o bloco, sem chip |

- **Texto do chip do tipo:** `MULTIFOCAL FREEFORM` (Day/Essencial), `MULTIFOCAL FREEFORM PREMIUM`, `VISÃO SIMPLES SURFAÇADA`, `VISÃO SIMPLES ESPECIAL` (Astera), `OCUPACIONAL`, `BIFOCAL SURFAÇADA`.
- **Linha 3:** os índices saem dos separadores de índice da própria tabela da página. Linha Vixlens (Astera, Bifocais) prefixa `LINHA VIXLENS // `. **Nada de** `// ÓTICA DO <CLIENTE>` nem `LENTES … SURFAÇADAS //` — o tipo já está no chip.
- **Posição:** com 96 de altura o cabeçalho passa de y=44 para **y=20** (bottom 116), para não invadir o banner em y=124. A página 17 (banner em y=150) fica em y=44.
- **Cabeçalho claro** (menta, por exemplo): chip branco 16% com texto branco não lê. Escureça o fundo da família; não troque o padrão do chip.
- **Sem wrap:** a linha 1 nunca leva pílulas de dados — elas descem para a linha 2. É isso que impede 3 pílulas + nome longo de estourar os 523 px úteis.

## 2. Banner enxuto

O banner (frame `IMG // …`, foto + `Overlay`) **não repete** chip, título nem disponibilidade: essas três coisas vivem só no cabeçalho colorido. O que sobra, em auto-layout vertical (`Conteúdo`, gap 14, 12 nos banners baixos; padding-top 18–24 conforme a altura):

```
Distribuição da visão  ou  Atributos   (rótulo)
[gráfico]
Tratamentos                           (rótulo)
[logos]
```

- **Rótulos:** Host Grotesk Bold 8, branco 70%, line-height 10, gap 5 até o conteúdo. Frase com maiúscula só na primeira letra.
- **Qual título:** gráfico de **Perto / Intermediário / Longe → "Distribuição da visão"**; qualquer outro (Liberdade de armações, Conforto visual…) → **"Atributos"**.
- **Alturas dos banners não mudam.** Gráfico à esquerda; informação nunca à direita sobre o rosto da foto. Se o cabeçalho de 96 invadir o banner, mova o **cabeçalho** (y=20), não encurte o banner.
- **Banners de 340 pt** (páginas 2/2): `Tratamentos` em **coluna vertical**, gap 12, logos no tamanho padrão. Nos demais, linha horizontal, gap 10.
- **Overlay:** gradiente de azul-marinho sólido à esquerda (alfa .96 → .93 em 28%) clareando até ~.38 em 62%, para o texto e o gráfico lerem sobre a foto.

## 3. Gráfico

Linhas de 11 pt de altura, texto Host Grotesk Regular 7 centralizado na vertical.

| Peça | Medida |
|---|---|
| Barra | 125 pt = 5 colunas × 25 (20 onde há rosto/olhos na foto) |
| Trilho (fundo da barra) | retângulo branco 7%, mesma largura, altura 7, y 2,5 |
| Valor | gradiente original da barra, altura 7, y 2,5 |
| Divisórias | 5 linhas verticais (a primeira é suprimida), sólidas |
| Separador por linha | retângulo da largura do rótulo, sob cada linha |
| Largura do rótulo | 72 (3 linhas), 88–112 (4–5 linhas); **127 se houver "Até 80% de redução…"** |

- **Espessura de todas as linhas: 0,3 mm = 0,85 pt, branco 30%.** É o mínimo para sair na impressão. Em prova, se sumir, suba a opacidade (45–50%), nunca a espessura.
- **Valor = a proporção da tabela acima.** `largura do Valor ÷ largura da barra` é preservada ao trocar de escala; **nunca** "arredonde" para colunas inteiras nem copie valores de outra família.
**Os valores do gráfico são padrão de cada família, iguais para qualquer cliente** — não vêm do CSV nem mudam por ótica. A tabela abaixo é a fonte (fração da largura da barra; o gráfico mestre usa 7 passos, e a VS HD usa 5):

| Família | Linhas (na ordem) | Valores | Fração da barra |
|---|---|---|---|
| Essencial (Day) | Perto, Intermediário, Longe | 2 / 2 / 2 de 7 | .286 / .286 / .286 |
| Plus (Max) | Perto, Intermediário, Longe | 3 / 2 / 3 de 7 | .428 / .286 / .428 |
| Advanced (Pro) | Perto, Intermediário, Longe | 4 / 4 / 3 de 7 | .572 / .572 / .428 |
| Premium (Elite) | Perto, Intermediário, Longe | 5 / 5 / 4 de 7 | .714 / .714 / .572 |
| Elite IA (Signature) | Perto, Intermediário, Longe | 7 / 7 / 7 de 7 | 1 / 1 / 1 |
| VS | Liberdade de armações, Conforto visual, Uso constante de telas, Refinamento Estético | 3 / 3 / 0,4 / 0,4 de 7 | .428 / .428 / .058 / .058 |
| VS HD | as quatro acima + Até 80% de redução da fadiga ocular | 4 / 4 / 4 / 3 / 3 de 5 | .8 / .8 / .8 / .6 / .6 |
| Relax 0.50 | as quatro acima + Até 80% de redução na fadiga ocular | 4 / 5 / 5 / 5 de 7; frase 3 de 5 | .572 / .714 / .714 / .714 / .6 |
| Relax 0.75 e 1.0 | as quatro acima (sem a frase dos 80%) | 4 / 5 / 5 / 5 de 7 | .572 / .714 / .714 / .714 |
| Office (Ocupacionais) | Liberdade de armações, Facilidade de adaptação, Conforto visual, Amplitude no campo de perto, Refinamento Estético | 4 / 4 / 4 / 4 / 3 de 7 | .572 / .572 / .572 / .572 / .428 |

Astera e Bifocais **não têm gráfico**. Ao montar o gráfico pela fração, use `largura do Valor = fração × largura da barra`; o número de colunas do desenho (5) não muda a conta.

- A frase "Até 80% de redução…" vira quinta linha com barra de 3 colunas (como VS HD e Relax).
- **Posição:** o gráfico é filho do auto-layout `Conteúdo`, não um frame solto. Linhas e trilho com constraint MIN/MIN — com SCALE, redimensionar o pai desloca as barras.

## 4. Logos de tratamento — um tamanho só

Em **todas** as páginas, mesmo tamanho (largura × altura em pt): UV+ 23,1×9,4 · Sun+ 17,2×14,4 · Transitions 50,8×13,3 · Clear 23,9×11,1 · Shield 27,6×11,1 · Diamond 36,8×11,1. Redimensione com **`rescale()`** (escala também os vetores filhos); `resize()` deixa os filhos no tamanho antigo.

**Transitions precisa do traço que corta o "o"** (vetor diagonal) e do ®. Versões antigas do logo no arquivo tinham 14 vetores e **não tinham o traço**. Fonte do SVG branco completo: `site_vixlens/public/assets/home/marcas-essilor/transitions.svg` (o traço é o `Vector_15`). Mantenha **um** componente (`Camada_1`) e clone-o por página.

## 5. Cor por família de lente

**Uma cor sólida por família**, nunca duas famílias iguais (Astera ≠ Bifocais). A cor da família comanda:

1. o fundo do cabeçalho;
2. os **chips de índice** da tabela: borda na cor cheia, fundo = cor a 18% sobre branco, número `#2F2F2F`;
3. a **régua** (`regua-cab`, 3 px) abaixo do cabeçalho da tabela.

Regras: branco sobre a cor ≥ 4,5:1; multifocais em progressão do nível de entrada ao topo; visão simples reconhecível como outra linha. **Hexadecimais não são CMYK final** — a conversão depende do perfil da gráfica e de prova no papel.

Paleta "Raiz Contemporânea" (Ótica do Toninho; é do cliente, **não** o padrão Vixlens — peça ou derive a do cliente a partir da capa dele):

| Família | Cor | Família | Cor |
|---|---|---|---|
| Essencial | `#565F45` | Relax 0.50 | `#414B7A` |
| Plus | `#38622E` | Relax 0.75 | `#5A456F` |
| Advanced | `#255F47` | Relax 1.0 | `#71465A` |
| Premium | `#1F5352` | Office | `#745020` |
| Elite IA | `#1E455A` | Astera | `#783578` |
| VS | `#256178` | Bifocais | `#7A402F` |
| VS HD | `#205178` | | |

### Como gerar a paleta de um cliente novo

1. **Colha 4 a 6 cores da marca dele** (capa, logo, site): amostre os pixels de fundo e dos blocos de cor, não as de fotos. Anote o hexadecimal de cada uma.
2. **Escureça** o que for claro: misture com preto (`c × 0,55 … 0,8`) até o **branco sobre a cor** bater ≥ 4,5:1 (razão WCAG, `razao()` do construtor), com o texto dos chips a 16% também ≥ 4,5:1 sobre a cor **composta** (cor + branco a 16%). Cores claras da marca (menta, turquesa, verde vivo) viram tons escuros da mesma matiz.
3. **Distribua pelas 13 famílias** com progressão: multifocais do nível de entrada ao topo (Essencial → Elite IA) em gradação clara, a linha visão simples numa matiz própria, Office/Relax/Astera/Bifocais cada um reconhecível.
4. **Teste de distinção:** nenhuma família repete cor; Astera ≠ Bifocais; duas famílias vizinhas no índice devem diferir em matiz **ou** em luminosidade de forma visível lado a lado.
5. **Mostre o quadro antes de aplicar:** um frame fora da área de trabalho com as cores da marca e as 13 propostas (mini-cabeçalho com chip a 16% em cada). **Só aplique com aprovação.** Se o cliente já escolheu uma paleta (por exemplo, gerada com apoio externo), use os hexadecimais dele e só confira os contrastes.
6. **Conversão para CMYK não é feita aqui:** informe que os hexadecimais dependem do perfil da gráfica e de prova no papel.

Cores de apoio da mesma proposta: `#81C6A3` (detalhes claros) e `#F4F0E8` (fundo neutro quente), só onde o layout pedir. Cores da capa do cliente (origem): `#297a53 #81c6a3 #214b21 #57a63f #262f64 #41b9c3`.

## 6. Destaque do Transitions Gen S

**Padrão de toda tabela, para qualquer cliente** — não é escolha de um cliente nem de uma ótica. Toda linha de **Transitions Gen S** ganha (spec lida da Native, página "Impressao CMYK (gabarito)"):

- **Texto do produto sem o sufixo:** `Resina Transitions Gen S` → `Resina` (idem `Poli`). A célula `produto` é horizontal, gap 5, centrada.
- **Pílula `pilula Gen S`** ao lado do nome: auto-layout horizontal, padding 5/1, raio 100, texto `Transitions Gen S` Host Grotesk **Bold 6**, `#2F2F2F`. Fundo: degradê **horizontal** `#fcbe95` (0) → `#ff766e` (.33) → `#cb81c0` (.67) → `#96ccdc` (1).
- **Faixa `faixa Gen S`**: retângulo 3 px, raio 1,5, mesmo degradê na **vertical**, **ABSOLUTE**, x=4 dentro do frame `Tabela …`, cobrindo a `row` **e a `subrow` de cores** logo abaixo (22 + 18).

A faixa é absoluta: se as linhas mudarem de lugar ela **não acompanha**. Reposicione pelo y da row (`absoluteBoundingBox` da row menos o da tabela). Esta skill, até a 0.12.x, **não gerava** esse destaque — o catálogo da Native tinha, o do Toninho não.

## 7. Nomes das lentes

- O nome da lente (e o tipo e a disponibilidade) aparece **só no cabeçalho colorido** e nos títulos de seção da tabela e do índice. **Não** repita no banner.
- **Grafia do cliente, não a da Vixlens:** `EYETECH RELAX 0.50 / 0.75 / 1.0` (ponto, "1.0"), `EYETECH OFFICE NEAR / MID / MAX`. Nomes Vixlens (`Deskview`, `VS Relax`, `Freevix …`) não podem sair numa peça de marca própria. Exceção: linha Vixlens (Freevix Astera, Bifocais).
- Revise o texto da tabela também: `Resina Freevix Colors` é nome Vixlens dentro de peça de marca própria — pergunte ao dono da tabela.
- Atualize **tudo** que cita o nome: cabeçalho, seções, índice e nome das camadas (`14 EYETECH RELAX 0.50`).

## 8. Contracapa

Preencha com os contatos **reais** que o cliente mandou (WhatsApp, Instagram, atendimento, endereço). Campo sem dado (e-mail, site) sai do layout — placeholder `[ e-mail ]` impresso é erro. Se dois números divergirem (capa x contracapa), pergunte qual é qual antes de trocar.

**Texto legal (nota da capa e da contracapa): não entra.** No modelo do Toninho a Mari **retirou** a nota legal da capa e da contracapa (09/10/2026), e esse modelo é a regra. Não gere o bloco `nota-legal` da contracapa nem a nota da capa, e não deixe frame vazio: reabra o espaço no layout. A pergunta "custo ou venda" continua valendo para decidir **quais preços** entram; só o texto impresso saiu. A tabela "Nota da capa" na pergunta 1 descreve o comportamento antigo (até a 0.12.x).

## 9. Imagens: 300 dpi no mínimo

Toda foto do banner e da capa precisa de **300 dpi efetivos** no tamanho em que aparece na página (frames em pt: 595 × 842 = A4 a 72 pt/pol).

**Como medir** (`use_figma`, por frame com fill de imagem): `getImageByHash(hash).getSizeAsync()` dá `iw × ih`; pontos exibidos por pixel `s` = `max(w/iw, h/ih)` em `FILL`, `min(...)` em `FIT`, `w ÷ (imageTransform[0][0] × iw)` em `CROP`; **dpi = 72 ÷ s**. Ponha um **ponto vermelho visível** (círculo 18 pt, borda branca, no canto) em toda imagem abaixo de 300 e **apague quando corrigir**. O ponto é marcador de revisão, não vai para a impressão.

**Como corrigir quando não há original maior** (foi o caso da foto da Essencial, 1366 px → 177 dpi, e da VS HD, 322 dpi):
1. Pergunte primeiro se existe a foto original em alta. É o único jeito de ter resolução de verdade.
2. Sem original: **Real-ESRGAN x4plus** em ambiente isolado (venv com `realesrgan` e `basicsr`; o `basicsr` quebra com torchvision novo — troque `torchvision.transforms.functional_tensor` por `torchvision.transforms.functional` só na cópia do venv; pesos `RealESRGAN_x4plus.pth`, ~67 MB, do repositório `xinntao/Real-ESRGAN`). CPU leva ~2 min a 1366 px e ~10 min a 4096 px. `outscale` ≈ 1,5–1,8. Avise a Mari de que é detalhe sintetizado: interpolação simples (Lanczos) chega ao número, mas não ganha detalhe.
3. **Tirar a imagem do Figma:** o `use_figma` não tem `fetch` e o retorno passa de 1 MB. Crie um retângulo temporário com o tamanho em pixels da imagem, fill `FILL`, e use `get_screenshot` com `maxDimension` = a largura em pixels (o screenshot do frame original é capado no tamanho do frame).
4. **Devolver:** `upload_assets` (POST do JPEG na URL devolvida) com `nodeIds` do frame e `scaleMode: FILL`; se o fill era `CROP`, **reaplique o `imageTransform` original** com o novo `imageHash` (a proporção é a mesma, a transformação é normalizada).
5. Guarde o retângulo com a imagem antiga como `ARQUIVO // … original NNNN px (antes do upscale)`, fora da área de trabalho.

## 10. Em aberto neste padrão

Não decidido com a Mari em 09/10/2026; **não aplique sem perguntar**:

- **Bolinhas dos títulos de seção** da tabela (ex.: `● EYETECH OFFICE NEAR`): ainda nas cores antigas. Falta decidir se acompanham a cor da família.
- **`Resina Freevix Colors`**: nome Vixlens dentro da tabela de uma marca própria (páginas 04, 05, 07, 09, 12 no Toninho).
- **Família sem correspondente na lista do cliente**: no Toninho, `EYETECH VS` (página 11) não está na lista de equivalências.
- **Linha extra no cabeçalho dos Bifocais** (`Desenhos disponíveis: ULTEX / KRIPTOK`): foi colocada pela Mari; não é padrão para as outras famílias.

## 11. Fatos de produto que mudam a página

- **Freevix Astera não tem Reflecta Express**: a revisão oficial da tabela de valores retirou o AR Express dela. Use `CONFIG.semExpress: true` e o chip `Sem Reflecta Express`; só Par, Reflecta Guard e Reflecta Blue Protect. Nunca derive o Express de Par + 50.
- **Altura mínima da Astera é 18 mm**, exceção à regra de que visão simples não leva altura.

## 12. Armadilhas desta etapa

| Sintoma | Causa | Correção |
|---|---|---|
| Quadro branco atrás do chip/título | `figma.createAutoLayout()` nasce com **fill branco** | `fills = []` em todo frame criado só para agrupar |
| Gap definido mas a linha continua colada | `primaryAxisAlignItems = 'SPACE_BETWEEN'` com altura fixa ignora `itemSpacing` | `MIN` + `primaryAxisSizingMode = 'AUTO'` |
| Barras do gráfico deslocadas ao mudar o pai | constraint SCALE nos filhos | MIN/MIN antes de redimensionar |
| Foto distorcida ao encurtar o banner | fill `CROP` guarda a transformação normalizada | ajustar `imageTransform[1][1]` pela razão de alturas e re-centrar |
| `Failed to parse SSE message` no retorno | página grande ou texto com U+2028 no `return` | devolver só ids, contagens e nomes ASCII |
| Frame de um nó solto some ao `findAll` | `findAll` num `RECTANGLE` não existe | filtrar `type === 'FRAME'` antes de `findAll` |
| Logo diferente de uma página para outra | `resize()` em vez de `rescale()`; clones de versões antigas | uma tabela de tamanhos única, `rescale(alvo/largura)` |
