---
name: promovix
description: >-
  Monta a Promovix, tabela promocional mensal da Vixlens (PVO) para as óticas, no Figma a partir de um Excel,
  com ou sem página de combo. Segue o layout da Promovix Outubro 2026: tabela no formato do catálogo, moldura
  promocional preta e amarela, faixa Reflecta 50%, chips de AR com o símbolo do DS, ícones nos cabeçalhos,
  pílulas Transitions, página de combo com QR da campanha Freevix e destaques Optview, tudo em Auto Layout.
  Use SEMPRE que o pedido for a Promovix ou a tabela promocional do mês — "promovix de novembro",
  "atualiza a tabela promocional", "nova versão da promo", "tabela PVO", "promoção do mês das óticas",
  "Reflecta 50% nas Kodak", "entrou produto novo na promovix", "tem combo na promo" — mesmo sem citar Excel ou Figma.
  Não use para o catálogo A4 de marca própria por ótica (isso é a tabela-optica-figma).
---

# Promovix no Figma

Gera a Promovix do mês inteira a partir de um Excel: capa, página de combo (opcional), uma ou mais famílias por página, faixas de oferta e a moldura promocional em todas as páginas. Tudo sai em **Auto Layout**.

**Dois arquivos fazem o trabalho pesado:**
- `montar.py` lê o Excel, confere os dados e grava `lote_NN.js`. Cada lote é um script pronto para `use_figma`, com uma ou mais páginas e abaixo do limite de 50 mil caracteres.
- `construtor.js` é o construtor em si. **Não edite** os lotes à mão: se algo sair errado, o conserto vai no Excel ou no construtor, e você gera de novo.

> **Pergunta obrigatória no início: "terá combo este mês?"** (ver "Primeira coisa" abaixo). O resto da peça é igual com ou sem combo.

## Pré-requisitos

- MCP do Figma com permissão de **edição**. Nesta empresa, só o time **Tríade Pro** (`team::1553463006124348758`) tem assento Full; os outros planos são só visualização.
- Host Grotesk disponível no Figma (Regular, Medium, Bold, ExtraBold e SemiBold, esta última no título do combo).
- Python com `openpyxl`. O `segno` (`pip install segno`) só é preciso se o QR da campanha apontar para um endereço diferente do padrão.
- Para a página de combo com a campanha Freevix: o arquivo de destino precisa ter o frame **"Segundo Par"** (a arte 1920×1080 da campanha) em qualquer página, na Outubro a página `2 par`. O construtor acha sozinho. Sem ele, sai um painel de texto simples e o lote avisa em `estouros`.
- Carregue `figma-use` (ou `skill://figma/figma-use/SKILL.md`) antes do primeiro `use_figma`.

## Primeira coisa: pergunte se terá combo

**Antes de qualquer outra coisa, antes de ler arquivo ou rodar script, pergunte: "Terá combo este mês?"** Regra da Mari (02/10/2026). A estrutura da Promovix é a mesma nos dois casos; a única diferença é a página de combo:

- **Sim:** parta de `modelo/Promovix_modelo_com_combo.xlsx`. O comercial passa a lista dos combos (código, marca, produto **sem** a marca, preço montado e, se for o caso, a bolinha do residual) e diz qual painel fecha a página: campanha Freevix com QR, VixClub ou nenhum. O layout do combo já está nesta skill; não invente.
- **Não:** parta de `modelo/Promovix_modelo.xlsx` (sem aba Combos). Sai o mesmo layout, sem o bloco `COMBO`.

Só depois da resposta, pergunte o **destino**: arquivo novo (qual nome) ou o link de um arquivo existente.

O resto está no Excel. Se o pedido trouxer mudanças de preço ou produto em texto ("coloca a tabela X com a regra Y"), passe para o Excel primeiro, rode o `montar.py` e só então vá ao Figma.

## Entrada: o Excel modelo

Os dois modelos vêm preenchidos com a Promovix Outubro 2026 (o com combo traz os ajustes finais de 02/10: vigência 05/10 a 08/11, lentes prontas Kodak reordenadas, FastKôt com circunflexo). Para um mês novo, parta do Excel do mês anterior. Ele foi desenhado para quem preenche (o comercial) não precisar desta skill: títulos em português, notas explicando cada coluna (passe o mouse no título), listas suspensas e colunas cinzas de conferência. Abas:

| Aba | O que tem |
|---|---|
| **Comece aqui** | Passo a passo de quem preenche, legenda de cores, regras que a skill confere e o passo do combo |
| **Mês** | Mês, validade, acréscimos da regra 50%, textos do selo, das faixas, do VixClub e do rodapé, e o bloco **Combo (opcional)**. A coluna oculta `chave` é o que o `montar.py` lê |
| **Famílias** | Uma linha por família: cor, pílulas, colunas de preço, colunas em promoção, Regra 50%, Faixa ÍNDICE, Coluna Tratamento, Disponibilidade, Legenda de destaque, Selo de montagem, Bloco compacto e **Ícone** (opcional; vazio = automático pelo nome). Conferência: quantos produtos e em que página |
| **Combos** (só no modelo com combo) | Uma linha por combo: Código, Marca (Kodak, Optview ou Essilor), Produto sem a marca, Montado (preço do par com a montagem incluída), Bolinha (verde, azul ou roxo, opcional) e Observação |
| **Produtos** | Uma linha por linha impressa, na ordem da tabela. Conferência: "Colunas desta família" diz o que é Preço 1, 2, 3 e 4 |
| **Páginas** | Qual bloco vai em qual página, na ordem. Blocos especiais: `CAPA`, `COMBO`, `FAIXA_50`, `FAIXA_MONTAGEM`, `VIXCLUB`; o resto é nome de família |
| Listas (oculta) | Fonte da lista suspensa de blocos |

Chaves do bloco **Combo** na aba Mês: `combo_ativo` (S/N), `combo_titulo`, `combo_chamada`, `combo_chip`, `combo_coluna_preco`, `combo_painel` (`VIXCLUB`, `CAMPANHA_FREEVIX` ou `NENHUM`), `combo_selo`, `combo_chamada_campanha` e `combo_qr_url`.

Linha 1 de Famílias, Produtos e Páginas é a faixa amarela de grupos; o título fica na linha 2. O `montar.py` acha o título sozinho e traduz os nomes em português (`ALIAS`); Excel no formato antigo (abas Config/Paginas/Familias, títulos `cod`, `preco_1`…) continua valendo. Código e índice ficam em células de texto; se o Excel virar 0357 em 357 ou 1.50 em 1.5, o `montar.py` corrige.

Convenções que não são óbvias:
- Código vazio + "Cores e códigos" com 2 ou mais códigos = seta ↓ e linha de bolinhas logo abaixo. Com 1 código (`86413 Cinza`), a bolinha fica ao lado do nome (XTRActive). Sem código (`G15`), sai só a bolinha (Solar).
- Na regra 50%, deixe Guard e Blue **vazios** e a skill calcula Sem A.R. + acréscimos. Se vierem preenchidos, ela confere e acusa diferença.
- "Obs. do preço" no formato `2: só Cinza 0012` põe uma nota pequena sob o preço da coluna 2.
- **Combo:** o preço da tabela normal é **só da lente**; o do combo (Montado) inclui a montagem. O `montar.py` avisa se o combo montado ficar abaixo do preço da lente (já pegou o 0257 em 02/10). Um código só do combo (o 0507) pode não estar na tabela normal: sai aviso, não erro. As linhas das tabelas normais cujo código está na aba Combos ganham o selo "Combo disponível" sozinhas.
- O produto do combo vai **sem** a marca no nome: a marca vira o chip da linha.

## Fluxo

1. **Gerar e conferir.**
   ```
   python montar.py <Excel> --saida <pasta>
   ```
   Saída com `ERRO` bloqueia: corrija no Excel e rode de novo. Não contorne no Figma. `AVISO` você reporta ao usuário e segue. A "estimativa" por página é conservadora (a Outubro mostrou 834 para uma página que coube em 790): quem manda é o `fimDoConteudo` do passo 4. O `resumo.json` guarda o total de produtos e de códigos de cor, que servem para a validação final.
2. **Destino.** Arquivo novo: `create_new_file` no Tríade Pro. Existente: o construtor recria só os frames `Promovix <MÊS> // PNN` que o lote traz e não mexe no resto do arquivo.
3. **Rodar os lotes.** Para cada `lote_NN.js`, leia o arquivo e passe o conteúdo **inteiro, sem alterar**, como `code` do `use_figma` (a Outubro com combo gera 6 lotes). Lotes diferentes podem rodar em paralelo. Cada lote só carrega as partes do construtor e os ícones que as suas páginas usam; é por isso que cabem no limite.
4. **Ler o retorno.** Cada página devolve `fimDoConteudo`, `aperto`, `cabeNoRodape`, `estouros`, `combos` e `vixclubCabe`.
   - `cabeNoRodape: false` quer dizer que nem o aperto salvou: mova um bloco na aba Páginas e regere.
   - `estouros` com itens quer dizer texto mais largo que a coluna: aumente `largura_disponibilidade` na família ou encurte o nome. Também aparece aqui "ícone ausente" e "arte da campanha não achada".
5. **Foto do VixClub** (só se houver painel ou bloco `VIXCLUB`). A página devolve `idFotoVixClub`. Chame `upload_assets` com `nodeIds: [idFotoVixClub]` e `scaleMode: FILL`, e faça POST de `modelo/vixclub.jpg` na URL devolvida. A foto já vem recortada na proporção do painel, centrada no rosto. O painel da campanha Freevix não precisa disso: usa a arte do próprio arquivo.
6. **Validar.** Some `produtos` e `codigosCor` dos retornos e compare com o `resumo.json`: as contagens têm que ser idênticas. Depois, uma screenshot por página. Confira também o endereço do QR (abra no celular).

## A página do combo

Bloco `COMBO` em Páginas, sempre logo depois da `CAPA`. Estrutura (fechada com a Mari em 02/10/2026):
- **Faixa amarela** da chamada: título grande ("Combo: Lente + Montagem:", ExtraBold 32,5), a frase em duas linhas (SemiBold 18,5, centralizada, quebrada à mão para não sobrar palavra) e o chip preto com o ícone de óculos e os materiais ("Acetato, metal e nylon.").
- **Tabela clara** dos combos: Código, Produto (chip da marca, nome, bolinha do residual) e **Montado**. Fonte 10, divisórias visíveis, régua amarela no cabeçalho. Chip Kodak amarelo, Optview azul-acinzentado com filete, Essilor verde-oliva.
- **Painel de baixo** (`combo_painel`): `CAMPANHA_FREEVIX` clona a arte "Segundo Par" cortada em 555×215, põe o **QR sobre a arte** (cartão branco no canto, com "Aponte a câmera") e uma faixa amarela de uma linha embaixo; `VIXCLUB` usa o painel com foto; `NENHUM` deixa a tabela mais arejada.
- O respiro das linhas do combo se ajusta sozinho (de 6 até 3,5) para o conjunto caber até o rodapé.
- O QR leva a `vixlens.com.br/vix-club#segundo-par` (âncora criada no PR #35 do site). A campanha não tem data de fim: se a seção sair do site, o impresso fica sem destino. Antes de imprimir em escala, considere um endereço curto com redirecionamento.

## O layout e por quê

**A tabela é a mesma do catálogo** (formato 07 FINAL da `tabela-optica-figma`): cabeçalho colorido da família com pílulas das constantes, container branco, régua na cor da família, selo de índice por linha, Disponibilidade em 6pt, bolinhas de cor em ordem fixa. O balcão já aprendeu a ler esse formato; mudar a grade só na promo quebraria o hábito. Tabela de preço densa é exceção ao tamanho mínimo de fonte do guia de UI (confirmado pela Mari): fica como está.

**Tudo em Auto Layout, sem aninhar à toa.** A página é um Auto Layout vertical: `conteudo` (blocos empilhados, cada família como grupo cabeçalho + tabela) e `rodape`; a capa é horizontal; selos de índice e bolinhas de cor têm o texto centralizado por Auto Layout. Ficam fora, de propósito, só o que flutua: a faixa amarela de promoção e o adesivo "−50%" sobre a borda da tabela, a arte recortada da campanha e o QR sobre ela, e os vetores. Não deixe camada travada: camada travada impede Ctrl+clique até no que está dentro dela.

**Chips de AR nos cabeçalhos de preço** (modelo da Mari, 02/10/2026): caixa 52×23 com a cor do token do DS, o símbolo oficial branco do AR e o rótulo branco em Bold 6,5. Guard `#00782D`, Express `#92BB36`, Blue Protect SH `#134B97` (rótulo "Reflecta Blue / Protect SH" em duas linhas, porque "Blue Protect SH" inteiro não cabe ao lado do símbolo). A.R. Eco: só a cor (o DS não tem símbolo nem cor da Eco; hoje usa o verde da Express, a confirmar). Sem A.R.: o mesmo chip em cinza `#F3F4F6` com texto escuro. Símbolos vêm de `assets/marca/reflecta` do DS (versão mono negativo).

**Ícone no cabeçalho de cada família.** Freevix e Essilor usam o ícone de marca do DS; as demais, Phosphor Bold num selo 40×40 (óculos nas multifocais, olho nas Kodak, sol na Optview, caixa na lente pronta, brilho na Espace). A coluna **Ícone** da aba Famílias troca ou apaga. Peso único (Bold) em todas, regra do DS.

**A moldura é o que diferencia a promo do catálogo.** A Promovix vale um mês. Se ela tivesse a cara da tabela permanente, cedo ou tarde alguém cotaria pela promo vencida. Por isso a moldura tem estes elementos:
- **Rodapé preto em toda página:** PROMOVIX // MÊS.ANO, validade, contato e "Página N/T". A folha solta circula sozinha, então cada página precisa dizer até quando vale. A validade vem do campo Validade do Mês (capa e rodapé).
- **Colunas em promoção** (`colunas_promo`): faixa amarelo-clara contínua #FFF0BF do título ao último preço, preços em negrito e um selo de oferta sobre a borda da tabela com o texto de `adesivo_promo` (Mês; padrão "REFLECTA −50%"): pílula preta com contorno amarelo, ícone de cupom (SealPercent do Phosphor, `modelo/svg/selo-oferta.svg`), rótulo em branco e valor grande em amarelo, com sombra; reta e invadindo de leve o cabeçalho de propósito. As linhas dessas tabelas ficam transparentes para a faixa aparecer; a altura da faixa é recalculada no fim, depois do respiro e do aperto.
  Tabela com adesivo ganha 10 px a mais de padding no topo, para os chips não ficarem colados no selo.
- **Faixa de oferta** preta com o número grande em amarelo: Reflecta 50% (`FAIXA_50`). Pode repetir em mais de uma página; na Outubro abre as páginas 4 e 5.
- **Selo "Combo disponível"** (`combo_selo`) nas linhas das tabelas normais que também estão no combo: pílula preta com o ícone de selo com check. Avisa que o preço da tabela é só da lente.
- **Selo de montagem** (`selo_montagem = S`): pílula preta "MONTAGEM / LENTE PRONTA" + valor no canto do cabeçalho. Fora do padrão desde o combo (a montagem já vem incluída); continua disponível. A faixa `FAIXA_MONTAGEM` idem.
- **Preto com amarelo** reservado à Promovix. O catálogo não usa essa combinação.

**Transitions no nome do produto vira pílula, sozinho.** O construtor acha "Transitions Gen S / XTRActive / Signature / Classic" no nome e troca pela pílula; o resto do nome fica em texto ("Orma [Transitions Gen S] Cinza"):
- Gen S e as demais: degradê Transitions (#FCBE95 → #FF766E → #CB81C0 → #96CCDC), texto escuro.
- XTRActive: cinza-escuro #3A3A3C com texto branco (pedido do Otávio, 01/10).
Não use `destaque FOTO` em linha Transitions: a pílula já identifica. FOTO fica para fotossensível de outra marca (Optview Sun+, Resina Foto).

**Bloco compacto** (`compacta = S`): família curta e de pouco peso, como a Solar, sai sem o cabeçalho grande: chip com o nome, uma linha com o que é igual em todas as lentes (índice, curva/diâmetro) e os produtos em 2 colunas com código, nome, cor e preço. Só aceita 1 coluna de preço. O diâmetro da Solar fica (decisão da Mari, 02/10); o da Vix Total saiu.

**Faixa "ÍNDICE" só onde ajuda.** Ela custa ~25 px por grupo. Fica ligada nas tabelas longas de marca própria (Vix Total, Freevix VS). Nas Kodak, Essilor e lentes prontas, o selo de índice da linha basta.

**Respiro e aperto automáticos.** O construtor monta com espaçamento base e depois ajusta:
- **Sobrou espaço:** aumenta o respiro das linhas (até 6 px) e depois o espaço entre blocos (até 22 px). Página com buraco grande mesmo assim pede outro bloco, não mais respiro.
- **Estourou:** aperta primeiro os espaços, depois o padding das tabelas e só então as linhas.
- **Tipografia nunca encolhe.**

**Destaques (coluna `destaque`), herdados da Promovix de setembro:**
- `FOTO` (fotossensível): fundo #D0DDE4 e contorno verde #78B472.
- `RX` (cilíndrico -2.25 a -4.00): contorno azul #72B2DD.

Com `legenda_destaque = S`, pílulas no cabeçalho explicam as duas marcações (a Outubro desligou nas famílias em que o Otávio riscou a legenda: Optview e Lente pronta Kodak). O contorno fica fora do layout (`strokesIncludedInLayout = false`).

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

A Optview tem cor própria, pedido dele. Em família de cor clara, régua e borda do selo saem num tom escurecido, senão somem.

**Texto das peças:** maiúscula só no início de frase e em nome próprio, sem caixa alta decorativa e sem palavra sozinha no fim da linha (regra da Mari). Os títulos de família em caixa alta são o layout aprovado e ficam.

## Dados que exigem conferência fora do Excel

- **Grade das lentes Kodak e Essilor: confira contra a tabela oficial Essilor**, não só contra a promo anterior. A Promovix de setembro tinha quatro erros de grade (Unique UHD 1.67 impresso −10,00/+6,50 no lugar de −14,00/+8,00, entre outros). Fontes: a tabela Essilor Consumidor (a de ago/2025 está no Scribd, doc 939110380, pág. 24 para Kodak) e o Volpe (`LO_PRODUTOS.NR_ESFERICO_DE/ATE`).
- **Kodak Network UHD Poly vai até −11,75**, não −10,00. Em 30/09/2026 um cliente reclamou do −11,75; a tabela oficial e o Volpe confirmaram. O −10,00 é das Kodak Easy+/Up, a geração anterior.
- **Códigos por cor Transitions vêm do Volpe** (`tb_produtos.ds_modelo` traz a cor por extenso). Ordem Gen S: Cinza, Marrom, Verde, Ametista, Safira, Âmbar, Esmeralda, Rubi. O `montar.py` recusa uma ordem diferente.
- **Preços do combo** vêm do Otávio. Nunca invente nem arredonde: na Outubro o "35" escrito à mão virou R$ 35,00 só depois da confirmação.

## Erros que já custaram retrabalho

| Sintoma | Causa | Correção |
|---|---|---|
| Lote acima de 50 mil caracteres | Ícones e seções do construtor embutidos em todo lote | O `montar.py` injeta só os ícones da página (`modelo/svg/icones.json`) e poda as seções que o lote não usa (`//#sec` e `//#fim` no `construtor.js`) |
| Frame de Auto Layout fica com altura travada (ex.: 60 ou 100) | `resize()` depois de `primaryAxisSizingMode = 'AUTO'` volta o tamanho para FIXED | Chame `resize()` primeiro e só depois ponha `'AUTO'` |
| Cabeçalho de preço corta a segunda linha | Altura do cabeçalho fixa | `counterAxisSizingMode = 'AUTO'` no `cab` e no grupo `valores` |
| Chip "Blue Protect SH" estoura os 52 pt | Texto inteiro ao lado do símbolo | Rótulo em duas linhas: "Reflecta Blue / Protect SH" |
| Ctrl+clique não seleciona uma camada | Camada travada (cadeado) | Destravar; nunca travar camada de peça em edição |
| Página estoura por ~13 px | Espaçamento base mais folgado que o da versão feita à mão | Aperto automático; se ainda estourar, mova um bloco no Excel |
| Colunas de linhas destacadas desalinhadas | Contorno contando no Auto Layout | `strokesIncludedInLayout = false` |
| Nomes desalinhados na lente pronta | Linhas sem bolinha começavam mais à esquerda | Ponto vazio (sem preenchimento) quando a família tem bolinhas |
| `Failed to parse SSE message` | Retorno com U+2028 ou acentos em dump grande | Não devolva `.characters` cru; troque não-ASCII por `\uXXXX` |
| Regex com ` ` dá "unexpected line terminator" | O escape vira quebra de linha real dentro do `/…/` | Use `String.fromCharCode(8232)` e `split/join` |
| Imagem de outro arquivo não aparece | `getImageByHash` só enxerga o arquivo atual | `download_assets` + `upload_assets`, ou o `modelo/vixclub.jpg` |

## Arquivos

- `montar.py`: leitura, validação e geração dos lotes
- `construtor.js`: construtor das páginas (recebe `PAGINAS` do `montar.py`; seções opcionais marcadas com `//#sec` e `//#fim`)
- `modelo/Promovix_modelo_com_combo.xlsx`: Excel modelo com combo, dados de outubro/2026 (05/10 a 08/11)
- `modelo/Promovix_modelo.xlsx`: Excel modelo sem combo (layout de sempre)
- `modelo/vixclub.jpg`: foto do painel VixClub, já recortada
- `modelo/svg/`: logo Vixlens negativo (capa), logo VixClub, ícone do selo de oferta, QR padrão da campanha (`qr-segundo-par-figma.svg`) e `icones.json` (Phosphor Bold, símbolos dos AR e ícones de marca do DS)
