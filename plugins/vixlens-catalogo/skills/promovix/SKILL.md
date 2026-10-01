---
name: promovix
description: >-
  Monta a Promovix, tabela promocional mensal da Vixlens (PVO) para as óticas, no Figma a partir de um Excel,
  seguindo o layout da Promovix Outubro 2026: tabela no formato do catálogo, moldura promocional preta e amarela,
  faixa Reflecta 50%, selo de montagem R$15 no cabeçalho, pílulas Transitions, painel VixClub e destaques Optview.
  Use SEMPRE que o pedido for a Promovix ou a tabela promocional do mês — "promovix de novembro",
  "atualiza a tabela promocional", "nova versão da promo", "tabela PVO", "promoção do mês das óticas",
  "Reflecta 50% nas Kodak", "entrou produto novo na promovix" — mesmo sem citar Excel ou Figma.
  Não use para o catálogo A4 de marca própria por ótica (isso é a tabela-optica-figma).
---

# Promovix no Figma

Gera a Promovix do mês inteira a partir de um Excel: capa, uma ou mais famílias por página, faixas de oferta, painel VixClub e a moldura promocional em todas as páginas.

**Dois arquivos fazem o trabalho pesado:**
- `montar.py` lê o Excel, confere os dados e grava `lote_NN.js`. Cada lote é um script pronto para `use_figma`, com várias páginas e abaixo do limite de 50 mil caracteres.
- `construtor.js` é o construtor em si. **Não edite** os lotes à mão: se algo sair errado, o conserto vai no Excel ou no construtor, e você gera de novo.

## Pré-requisitos

- MCP do Figma com permissão de **edição**. Nesta empresa, só o time **Tríade Pro** (`team::1553463006124348758`) tem assento Full; os outros planos são só visualização.
- Host Grotesk disponível no Figma (Regular, Medium, Bold, ExtraBold).
- Python com `openpyxl`.
- Carregue `figma-use` (ou `skill://figma/figma-use/SKILL.md`) antes do primeiro `use_figma`.

## Entrada: o Excel modelo

`modelo/Promovix_modelo.xlsx` vem preenchido com a Promovix Outubro 2026. Para um mês novo, parta do Excel do mês anterior. Abas:

| Aba | O que tem |
|---|---|
| **Leia-me** | Regras de preenchimento para quem atualiza o Excel |
| **Config** | Mês, validade, acréscimos da regra 50%, textos das faixas e do VixClub, contato |
| **Paginas** | Qual bloco vai em qual página, na ordem. Blocos especiais: `CAPA`, `FAIXA_50`, `FAIXA_MONTAGEM`, `VIXCLUB`; o resto é nome de família |
| **Familias** | Uma linha por família: cor, pílulas, títulos das colunas de preço, colunas em promoção, regra 50%, separador de índice, coluna de tratamento, largura da Disponibilidade, legenda de destaque, `selo_montagem`, `compacta` |
| **Produtos** | Uma linha por linha impressa, na ordem da tabela |

Três convenções que não são óbvias:
- `cod` vazio + `cores` com 2 ou mais códigos = seta ↓ e linha de bolinhas logo abaixo. Com 1 código (`86413 Cinza`), a bolinha fica ao lado do nome (XTRActive). Sem código (`G15`), sai só a bolinha (Solar).
- Na regra 50%, deixe Guard e Blue **vazios** e a skill calcula Sem A.R. + acréscimos. Se vierem preenchidos, ela confere e acusa diferença.
- `obs_preco` no formato `2: só Cinza 0012` põe uma nota pequena sob o preço da coluna 2.

## Pergunte antes de rodar

Pergunte só o **destino**: arquivo novo (qual nome) ou o link de um arquivo existente. O resto está no Excel. Se o pedido trouxer mudanças de preço ou produto em texto ("coloca a tabela X com a regra Y"), passe para o Excel primeiro, rode o `montar.py` e só então vá ao Figma.

## Fluxo

1. **Gerar e conferir.**
   ```
   python montar.py <Excel> --saida <pasta>
   ```
   Saída com `ERRO` bloqueia: corrija no Excel e rode de novo. Não contorne no Figma. `AVISO` você reporta ao usuário e segue. O `resumo.json` guarda o total de produtos e de códigos de cor, que servem para a validação final.
2. **Destino.** Arquivo novo: `create_new_file` no Tríade Pro. Existente: o construtor recria só os frames `Promovix <MÊS> // PNN` que o lote traz e não mexe no resto do arquivo.
3. **Rodar os lotes.** Para cada `lote_NN.js`, leia o arquivo e passe o conteúdo **inteiro, sem alterar**, como `code` do `use_figma`. Lotes diferentes podem rodar em paralelo.
4. **Ler o retorno.** Cada página devolve `fimDoConteudo`, `aperto`, `cabeNoRodape`, `estouros` e `vixclubCabe`.
   - `cabeNoRodape: false` quer dizer que nem o aperto salvou: mova um bloco na aba Paginas e regere.
   - `estouros` com itens quer dizer texto mais largo que a coluna: aumente `largura_disponibilidade` na família ou encurte o nome.
5. **Foto do VixClub.** A página com `VIXCLUB` devolve `idFotoVixClub`. Chame `upload_assets` com `nodeIds: [idFotoVixClub]` e `scaleMode: FILL`, e faça POST de `modelo/vixclub.jpg` na URL devolvida. A foto já vem recortada na proporção do painel, centrada no rosto.
6. **Validar.** Some `produtos` e `codigosCor` dos retornos e compare com o `resumo.json`: as contagens têm que ser idênticas. Depois, uma screenshot por página.

## O layout e por quê

**A tabela é a mesma do catálogo** (formato 07 FINAL da `tabela-optica-figma`): cabeçalho colorido da família com pílulas das constantes, container branco, régua na cor da família, selo de índice por linha, Disponibilidade em 6pt, bolinhas de cor em ordem fixa. O balcão já aprendeu a ler esse formato; mudar a grade só na promo quebraria o hábito.

**A moldura é o que diferencia a promo do catálogo.** A Promovix vale um mês. Se ela tivesse a cara da tabela permanente, cedo ou tarde alguém cotaria pela promo vencida. Por isso a moldura tem quatro elementos:
- **Rodapé preto em toda página:** PROMOVIX // MÊS.ANO, validade, contato e "Página N/T". A folha solta circula sozinha, então cada página precisa dizer até quando vale.
- **Colunas em promoção** (`colunas_promo`): faixa amarelo-clara contínua #FFF0BF do título ao último preço, preços em negrito e um selo de oferta sobre a borda da tabela com o texto de `adesivo_promo` (Config; padrão "REFLECTA −50%"): pílula preta com contorno amarelo, ícone de cupom (SealPercent do Phosphor, `modelo/svg/selo-oferta.svg`), rótulo em branco e valor grande em amarelo, com sombra; reta (a versão inclinada foi recusada) e invadindo de leve o cabeçalho de propósito (pedido de 01/10: "bonito e chamativo"). É a proposta 1, escolhida pelo Otávio entre 6 propostas em 30/09/2026. As linhas dessas tabelas ficam transparentes para a faixa aparecer; a altura da faixa é recalculada no fim, depois do respiro e do aperto.
  Tabela com adesivo ganha 10 px a mais de padding no topo, para os títulos "Reflecta Guard / Blue Protect SH" não ficarem colados no selo (pedido de 01/10).
- **Faixa de oferta** preta com o número grande em amarelo: Reflecta 50% (`FAIXA_50`). Pode repetir em mais de uma página da promoção; na Outubro ela abre as páginas 3 e 4.
- **Selo de montagem** (`selo_montagem = S`): pílula preta "MONTAGEM / LENTE PRONTA" + valor em amarelo no canto direito do cabeçalho da família (Optview e Lente Pronta Kodak). Substituiu a faixa `FAIXA_MONTAGEM` em 01/10/2026: a faixa custava ~67 px por página e repetia nas duas páginas de lente pronta. Textos em `montagem_selo` e `montagem_destaque` (Config). A faixa ainda existe para quem quiser, mas não é o padrão.
- **Preto com amarelo** reservado à Promovix. O catálogo não usa essa combinação.

**Transitions no nome do produto vira pílula, sozinho.** O construtor acha "Transitions Gen S / XTRActive / Signature / Classic" no nome e troca pela pílula; o resto do nome fica em texto ("Orma [Transitions Gen S] Cinza"):
- Gen S e as demais: degradê Transitions (#FCBE95 → #FF766E → #CB81C0 → #96CCDC), texto escuro.
- XTRActive: cinza-escuro #3A3A3C com texto branco (pedido do Otávio, 01/10).
Não use `destaque FOTO` em linha Transitions: a pílula já identifica, e o fundo azul junto pesava demais. FOTO fica para fotossensível de outra marca (Optview Sun+, Resina Foto).

**Bloco compacto** (`compacta = S`): família curta e de pouco peso, como a Solar, sai sem o cabeçalho grande: chip com o nome, uma linha com o que é igual em todas as lentes (subtítulo, índice, curva/diâmetro) e os produtos em 2 colunas com código, nome, cor e preço. Só aceita 1 coluna de preço. Foi assim que a Solar coube na página da lente pronta (pedido de 01/10: "tem que entrar em lente pronta, pode reduzir").

**Faixa "ÍNDICE" só onde ajuda.** Ela custa ~25 px por grupo. Fica ligada nas tabelas longas de marca própria (Vix Total, Freevix VS). Nas Kodak, Essilor e lentes prontas, o selo de índice da linha basta, e foi desligando as faixas que Unique UHD e Unique Infinite couberam na mesma página.

**Respiro e aperto automáticos.** O construtor monta com espaçamento base e depois ajusta:
- **Sobrou espaço:** aumenta o respiro das linhas (até 6 px) e depois o espaço entre blocos (até 22 px). Página com buraco grande mesmo assim (ex.: duas tabelas curtas) pede outro bloco, não mais respiro: na Outubro o VixClub foi para a página da Freevix e a página 4 ganhou a faixa 50%.
- **Estourou:** aperta primeiro os espaços, depois o padding das tabelas e só então as linhas.
- **Tipografia nunca encolhe.**

**Destaques (coluna `destaque`), herdados da Promovix de setembro:**
- `FOTO` (fotossensível): fundo #D0DDE4 e contorno verde #78B472.
- `RX` (cilíndrico -2.25 a -4.00): contorno azul #72B2DD.

Com `legenda_destaque = S`, pílulas no cabeçalho explicam as duas marcações. O contorno fica fora do layout (`strokesIncludedInLayout = false`); dentro dele, as colunas das linhas destacadas desalinhavam 1,5 px.

**Cores das famílias** (decididas com o Otávio em 30/09/2026):

| Família | Cor |
|---|---|
| Kodak (todas, inclusive a lente pronta) e Vix Total | amarelo #F7B200 |
| Espace | laranja #EF7F02 |
| Freevix VS | azul #00497A |
| Essilor surfaçadas | verde-oliva #3F4A3C |
| Lente pronta Essilor | cinza-azulado #414B55 (cor dos cabeçalhos da tabela oficial Essilor) |
| Optview e MF acabada | azul-acinzentado #D0DDE4 |
| Optfácil e Solar | cinza #DADFE2 |

A Optview tem cor própria, pedido dele. Com `legenda_destaque = S`, família que tem Transitions e nenhum outro fotossensível destacado (a lente pronta Kodak) ganha a legenda "Transitions · Fotossensível" com o degradê e contorno preto de 1px, desenhada pelo Otávio. Em família de cor clara, régua e borda do selo saem num tom escurecido, senão somem.

## Dados que exigem conferência fora do Excel

- **Grade das lentes Kodak e Essilor: confira contra a tabela oficial Essilor**, não só contra a promo anterior. A Promovix de setembro tinha quatro erros de grade (Unique UHD 1.67 impresso −10,00/+6,50 no lugar de −14,00/+8,00, entre outros). Fontes: a tabela Essilor Consumidor (a de ago/2025 está no Scribd, doc 939110380, pág. 24 para Kodak) e o Volpe (`LO_PRODUTOS.NR_ESFERICO_DE/ATE`).
- **Kodak Network UHD Poly vai até −11,75**, não −10,00. Em 30/09/2026 um cliente reclamou do −11,75; a tabela oficial e o Volpe confirmaram. O −10,00 é das Kodak Easy+/Up, a geração anterior.
- **Códigos por cor Transitions vêm do Volpe** (`tb_produtos.ds_modelo` traz a cor por extenso). Ordem Gen S: Cinza, Marrom, Verde, Ametista, Safira, Âmbar, Esmeralda, Rubi. O `montar.py` recusa uma ordem diferente.

## Erros que já custaram retrabalho

| Sintoma | Causa | Correção |
|---|---|---|
| Página estoura por ~13 px | Espaçamento base mais folgado que o da versão feita à mão | Aperto automático; se ainda estourar, mova um bloco no Excel |
| Colunas de linhas destacadas desalinhadas | Contorno contando no auto-layout | `strokesIncludedInLayout = false` |
| Bloco vira "tipo" errado | Campo `tipo` da família colidia com o tipo do bloco | O subtítulo da família chama `subtitulo` |
| Nomes desalinhados na lente pronta | Linhas sem bolinha começavam mais à esquerda | Ponto vazio (sem preenchimento) quando a família tem bolinhas |
| `Failed to parse SSE message` | Retorno com U+2028 ou acentos em dump grande | Não devolva `.characters` cru; troque não-ASCII por `\uXXXX` |
| Imagem de outro arquivo não aparece | `getImageByHash` só enxerga o arquivo atual | `download_assets` + `upload_assets`, ou o `modelo/vixclub.jpg` |

## Arquivos

- `montar.py`: leitura, validação e geração dos lotes
- `construtor.js`: construtor das páginas (recebe `PAGINAS` do `montar.py`)
- `modelo/Promovix_modelo.xlsx`: Excel modelo com os dados de outubro/2026
- `modelo/vixclub.jpg`: foto do painel VixClub, já recortada
- `modelo/svg/`: logo Vixlens negativo (capa), logo VixClub e o ícone do selo de oferta
