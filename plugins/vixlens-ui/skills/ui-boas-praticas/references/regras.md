# As 80 regras — valores exatos

Destilado de *Guia de Boas Práticas Aplicáveis para a Criação de Interfaces* v2.0 (Andrey Knabbenn, 2023), 177 páginas, 6 capítulos + extras. Numeração original das dicas preservada para rastreabilidade.

**Conferido contra o PDF inteiro em 02/10/2026** (três leituras, páginas 1-177). Convenção: o número impresso no rodapé do guia é a página do PDF menos 1. Quando um valor ou ferramenta **não está no guia** e foi acrescentado por este resumo, vem marcado como **(adição)**. Quando é preferência declarada do autor, e não regra, vem como **(preferência do autor)**.

---

## 1. Tipografia (#1–15)

**#1 — Line-height.** Faixa ideal **120% a 150%**. Fórmula base para parágrafo: `1.6 × font-size`. O guia só dá dois exemplos: fonte 24px → 32px (120%) e fonte 16px → 24px (150%), e diz que o valor varia com o tamanho e a família da fonte. Títulos tendem ao 120% e corpo ao 150% **(leitura deste resumo, não regra do guia)**. Erros ilustrados: 100% (apertado) e 200% (solto). Pouco espaço = escaneabilidade ruim; muito espaço = sensação de desagrupamento.

**#2 — Palavras órfãs.** Nenhuma palavra sozinha na última linha. Correções: ajustar largura do bloco, adicionar/remover palavra, mexer em font-size ou letter-spacing. Vale ao menos para os breakpoints mais usados. Design responsivo dificulta, mas não é desculpa para ignorar os cenários e dispositivos mais vistos.

**#3 — Hierarquia textual.** Quatro alavancas: **escala**, **peso**, **cor de destaque**, **opacidade**. Padrão: título maior + ExtraBold + cor forte → subtítulo menor → corpo em tom ~70% preto, peso Regular. Exemplo da opacidade: texto `#000000` é o errado, `#6B6B6B` o correto para o corpo. O item mais importante tem mais destaque, a hierarquia precisa ser fácil de entender e o contraste vale para todas as idades. Sem hierarquia o usuário não sabe o que ler primeiro. Cuidado para a opacidade não derrubar o contraste.

**#4 — Paredes de texto.** Quebrar texto corrido em parágrafos menores com pausa visual.

**#5 — Caixa alta.** Nunca em texto corrido (lê-se como grito e exige mais esforço de decodificação). Funciona em: CTAs, pré-títulos/eyebrows, títulos curtos de grande ênfase.

**#6 — Justificar.** Nunca. Cria "rios" de espaço entre palavras. Use alinhado à esquerda (ou direita, conforme a lógica da grid).

**#7 — Listas.** Quebrar blocos densos em lista de tópicos melhora escaneabilidade. Bullets podem ter personalidade, não precisa ser círculo.

**#8 — Letter-spacing.** Default **0px**. Exceções: pré-títulos pequenos em caixa alta → **+4px** (compensa o tamanho pequeno); headlines grandes → **-1.2px** (compensa o excesso de espaço). Não existe valor universal — varia por família tipográfica; teste. Erros ilustrados no corpo: **−2.0px** (apertado demais) e **+1.5px** (largo demais). Pré-título com 0px fica pouco legível e headline com 0px fica com espaço excessivo.

**#9 — Número de fontes.** **1 família** basta. Gere distinção com cor, peso e tamanho — não com uma segunda ou terceira fonte. Exemplo errado do guia: 3 famílias (Times New Roman, Montserrat, Inter); o certo é Inter em Regular, Semibold e Bold. Ressalva: o Type Scale Generator do Material aceita até **2 famílias** (títulos + corpo), então 2 é aceitável quando a segunda é só de títulos.

**#10 — Estilo x contexto.** Fonte precisa transmitir a sensação certa (script manuscrita não serve para tema de segurança). Script **não** é proibida: funciona em contexto amigável (exemplo do guia: turismo, com Lobster). Na dúvida: Sans Serif do Google Fonts resolve 99% dos casos.

**#11 — White space em blocos de texto.** Espaçar em **múltiplos de 4**. Lei da Proximidade: elementos do mesmo tipo, espaçados uniformemente. Exemplo do guia: 4px entre pré-título e título, 8px entre título e parágrafo. Falta de respiro também é erro.

**#12 — Largura de linha.** **50–70 caracteres por linha**. Nunca parágrafo em largura total de página. Quanto maior a largura da linha, maior o cansaço. Ferramenta: wordcounter.net/character-count. Em CSS **(adição)**: `max-width: 65ch`.

**#13 — Escala tipográfica.** Usar type scale definida, nunca tamanhos aleatórios. Referência: type system do Material Design (Roboto), única escala numérica do guia: H1 Light 96 (ls −1.5) · H2 Light 60 (−0.5) · H3 Regular 48 (0) · H4 Regular 34 (0.25) · H5 Regular 24 (0) · H6 Medium 20 (0.15) · Subtitle1 Regular 16 (0.15) · Subtitle2 Medium 14 (0.1) · Body1 Regular 16 (0.5) · Body2 Regular 14 (0.25) · Button Medium 14 CAIXA ALTA (1.25). Gerador: Type Scale Generator (material.io/design/typography/the-type-system).

**#14 — Tamanhos.** Corpo de texto: **16px** é o padrão ideal. Informação secundária / mínimo: **12–14px** (com consciência de que exigem mais esforço e, dependendo do público, tornam-se inviáveis). O tamanho percebido varia por família — 16px Montserrat parece maior que 16px Roboto.

**#15 — Preview em dispositivo real.** A percepção no aparelho difere da tela do computador. Espelhar (ex.: app do Figma) antes de fechar.

---

## 2. Cores (#16–28)

**#16 — Matiz nos neutros.** Não usar cinza puro (matiz 0). Adicionar matiz alinhada com a cor predominante da interface. Exemplo: interface laranja → fundo `#FFF5F2` (matiz 12) em vez de `#E6E6E6`. Deixa a interface mais harmônica, imita o comportamento da luz na natureza.

**#17 — Contraste.** Baixo contraste aumenta carga cognitiva e tempo de tela. Vale para texto, botões e **ícones**. Sempre **medir** a razão. O guia mostra um exemplo ruim (2,65, "muito ruim") e um bom (10,87, "muito bom") no coolors.co/contrast-checker; os limiares **WCAG AA 4.5:1 (texto normal) e 3:1 (texto grande e componentes de UI) são adição deste resumo**, não estão no guia. Erro típico: texto ou ícone com tom muito próximo do fundo. Exemplos ruins do guia: verde com texto branco, roxo com texto preto, amarelo claro. Testar com usuários reais e pedir feedback.

**#18 — Cor primária da marca.** Usar com parcimônia — só nas ações primárias. Sobre-uso faz o botão perder exclusividade. Definir a paleta por segmentos **antes** de iniciar o projeto: primárias, secundárias, sucesso, alerta, avisos e mais. Método **60-30-10**: 60% cor base/dominante, 30% secundária, 10% destaque (exemplo do guia: fundo pêssego claro 60%, marrom escuro 30%, laranja 10%; o botão secundário é contorno ao lado do primário preenchido). Pesquisar como grandes marcas organizam as cores.

**#19 — Item selecionado.** Preenchimento com cor identifica mais rápido que só contorno.

**#20 — Semântica de cor.** Vermelho = perigo/erro/exclusão. Amarelo = alerta/atenção. Verde = sucesso/confirmação. Mensagem de sucesso em vermelho assusta o usuário.

**#21 — Cinza sobre fundo colorido.** Não usar. Alternativas: branco com opacidade reduzida (ex.: `#FFFFFF` a 70%), ou tom com a **mesma matiz do fundo** (fundo roxo → texto `#353264` em vez de `#000000`; `#5D5C77` em vez de `#555555`). Controle via HSB: iguale o H do texto ao H do fundo ("igual ou muito similar"; exemplo: fundo com matiz 300 leva texto em 300) e ajuste só S e B. Exemplo ruim do guia: `#AEAEAE` a 100% sobre fundo roxo.

**#22 — Preto 100%.** Evitar `#000000`. Na natureza preto puro quase não existe. Usar `#2F2F2F` em títulos e `#686868` em parágrafos.

**#23 — Ações destrutivas.** Vermelho em botões, botões-texto e modais de confirmação de exclusão. Modal bom: Cancelar como secundário (contorno) e "Excluir dados" em vermelho sólido; modal ruim: dois botões laranja iguais. Em botão-texto, só a ação destrutiva fica vermelha.

**#24 — Cor da ação primária.** Sempre definir uma cor exclusiva para o CTA, para ele não disputar atenção com o resto da tela. Exemplo do guia (planos Mensal/Trimestral/Anual): cartões de opção em cinza neutro com radio discreto, e só o botão "Comprar plano" com cor; o 10% do 60-30-10 é a cor do CTA.

**#25 — Significado das cores.** Pesquisar antes de definir paleta; significados variam culturalmente.

**#26 — Limite de cores.** Menos é mais. Poucas cores = visual mais leve.

**#27 — Acessibilidade.** Considerar deficiência de visão de cores e os tipos de daltonismo. Guia: guia-wcag.com. Simulador: extensão Colorblindly.

**#28 — Ferramentas.** Material Color Tool (material.io/resources/color) e maketintsandshades.com aparecem no guia; onlinepalette.com (paletas de marcas) também é citado neste item.

---

## 3. Botões (#29–38)

**#29 — Hierarquia.**
- **Primário** — ações mais importantes (comprar, cadastrar, prosseguir). Cor predominante da marca, "a mais exclusiva possível para botões", como background. Fonte maior/bold. Verbos do guia: "Criar uma conta", "Cadastrar", "Adicionar".
- **Secundário** — ações que não impactam o sucesso do fluxo. Contorno, background vazio ou tom mais opaco, peso menor. Verbos: "Pular tutorial", "Personalizar", "Ver similares".
- **Terciário / text button** — links externos, "esqueci minha senha", "saiba mais". Só texto, às vezes com underline. Verbos: "Relatar problema", "Esqueci minha senha", "Saiba mais sobre". Serve também para link que expande informações legais.

Um único primário evidente por contexto.

**#30 — Estados.** Prever todos: **default, hover** (não existe em mobile), **pressed**, **active**, **focus** (obrigatório para acessibilidade), **disabled**, **loading**. Microinterações são o feedback do sistema. Detalhes do guia: hover escurece ou clareia (não existe em mobile); pressed é toque rápido (ripple, versão mais escura); active indica clicado (mais escuro ou com borda); focus tem anel visível; disabled é claro e dessaturado; loading em 3 fases ("Salvar dados" → "Salvando..." com barra → "Salvo com sucesso" com check). Referência: design.gs.com/components/button.

**#31 — White space e altura.** Padding em **múltiplos de 8**, mas "não é regra absoluta". Exemplo certo do guia: **32px de padding lateral e 40px de altura**; o errado tem 6px laterais e 28px de altura. Alturas de **36px** (botão de baixa prioridade) e **48px** (primário mobile) são **experiência do autor**, e o guia não reconcilia o 36px com a área de toque mínima. Área de toque mínima: **44×44px** (Apple HIG) / **48×48px** (Material). A área de toque pode ser maior que o desenho do ícone. Leituras: lawsofux.com/fittss-law e nngroup.com/articles/touch-target-size.

**#32 — Drop-shadow.** Nunca o valor padrão do software (sombra rígida). Refinar. Config exemplo do guia para botão: `X 0 / Y 6 / Blur 16 / Spread 0`, cor = cor de background do botão a **38%** de opacidade. Para card neutro: `X 0 / Y 50 / Blur 50 / Spread 0`, `#000000` a **12%** (Y 50 projeta para baixo; Y 0 daria um halo simétrico). A sombra padrão do software é "rígida"; a refinada, difusa, serve de estado hover. Dica: usar a cor de fundo do botão como cor da sombra (exemplo `#FC825B` a 38%). Para card colorido: `X 0 / Y 32 / Blur 50`, cor da marca a **33%** (exemplo `#B467F3`).

**#33 — Texto do botão.** Máximo **3 palavras**, sempre em **linha única**. Prever quebras em mobile/web — texto quebrado descaracteriza o botão.

**#34 — Consistência.** Mesmo estilo em todas as telas: mesmo border-radius, mesma cor de primário, mesmos tamanhos, mesma capitalização. Inconsistência de raio é o erro mais comum.

**#35 — Ícones em botões.** Reforçam significado e reduzem esforço cognitivo. Só com contexto — ícone que não bate com o texto confunde mais do que ajuda. Pares do guia (certo × errado): carrinho × atualizar; bookmark × sino; seta para a direita × para a esquerda em "Ver próxima página". O cérebro processa imagem mais rápido que texto. Ícone pouco comum deve ser testado. Biblioteca: fonts.google.com/icons.

**#36 — Forma.** Retangular ou com cantos arredondados. Formas orgânicas fazem o usuário duvidar se é botão. Certos: retangular, cantos suaves e pílula.

**#37 — Escala e cor = prioridade.** Botão maior = mais importante. Três níveis do guia: baixa (texto sublinhado), média (fundo tonal, "Ver mais"), alta (primário, "Comprar").

**#38 — Espaço entre botões.** Mínimo **8px** entre botões lado a lado; **16px** é a **preferência do autor** para a maioria dos casos.

---

## 4. Grid e layout (#39–50)

**#39 — Espaçamento consistente.** Mesmo valor na horizontal e na vertical dentro de um agrupamento (ex.: 12px/12px, não 12px/4px). Usar valor **maior** para separar contextos/categorias diferentes — se tudo tiver o mesmo espaçamento, tudo parece o mesmo assunto. No exemplo do guia, o 24px aparece de cada lado de uma linha divisória fina (24 + linha + 24; leitura da figura). "Devo usar 12px para tudo?" Nem sempre.

**#40 — Alinhamento horizontal.** Linha imaginária alinhando menu, logo, botão, headline e mídia lateral. Simetria é padrão que o cérebro reconhece.

**#41 — Alinhamento vertical.** Ícones e textos alinhados verticalmente em listas e menus, para gerar ritmo.

**#42 — Margens laterais.** Mobile: mínimo **16px**, às vezes 24px. Grid exemplo: 4 colunas, gutter 8, margin 16. Sem margem os conteúdos ficam sufocados.

**#43 — Listas de features.** Ícone **fora** do bloco de texto (coluna própria), não colado no título — senão o texto desloca e quebra o alinhamento.

**#44 — Grid dentro de cards.** Cards também têm padding lateral próprio — **16px** de referência. Todos os elementos internos alinhados à mesma grid, não só alguns.

**#45 — White space.** Espaçamentos em **múltiplos de 4 ou 8**. Excesso também é erro: gera desagrupamento e quebra de ritmo. Exemplo de card do guia: imagem→título 16, título→texto 8, texto→botão 12, botão→divisor 16, rodapé 12 em cima e 12 embaixo. Múltiplos de 4 ou 8 ajudam "desde que usados da maneira ideal". "O espaço em branco é o silêncio na música."

**#46 — Sentido de leitura único.** Elemento primário centralizado → subsequentes centralizados. Primário à esquerda → resto à esquerda. Alinhamento inesperado quebra o ritmo.

**#47 — Espaços fantasma.** Caçar espaços em branco excedentes no início/fim de strings, que desalinham sem motivo aparente.

**#48–50 — Referências.** Apple HIG Layout; Material Design Spacing Methods (grid 4dp/8dp e alvos de toque); plugin Grids Generator (Figma).

---

## 5. Ícones (#51–62)

**#51 — SVG, não PNG.** Vetor escala sem serrilhar. Exceção: pipelines que exigem export @1x/@2x/@3x — o original continua sendo vetor. Ressalva do guia: SVG hoje é comum no iOS desde que o Xcode passou a aceitar, mas "não é regra geral"; combinar com o time de desenvolvimento. Bibliotecas: Phosphor, Google Fonts Icons, Eva Icons.

**#52 — Escala.** Ícone é elemento de **apoio**, não ilustração de destaque. Não usar em tamanho grande como imagem principal de card ou lista de features.

**#53 — Caixa delimitadora.** Manter o ícone dentro do frame padrão (geralmente **24×24**). Tirar o ícone da caixa gera tamanhos quebrados (ex.: 18.82×18.82) e espaçamentos irregulares (14.2px, 21.18px). Baixar biblioteca completa em vez de garimpar ícone solto.

**#54 — Espaçamento e tamanho iguais.** Mesmo espaçamento entre todos os ícones do agrupamento (ex.: 32px/32px/32px, não 28/34/46). Mesmo tamanho sempre — para destacar item selecionado use **cor** ou versão **filled**, nunca aumente o ícone.

**#55 — Peso casando com a fonte.** Ícone fino → fonte Light/Regular. Ícone bold → fonte Medium/Semibold/Bold. Dá para ajustar o stroke do ícone manualmente em vez de trocar de biblioteca.

**#56 — Estilo único.** Não misturar bibliotecas, espessuras, nem filled com outline (exceto para marcar seleção). Não misturar ícones coloridos com monocromáticos.

**#57 — Simplicidade.** Ícones minimalistas. Ícone detalhado demais fica ilegível, principalmente em mobile.

**#58 — Legibilidade em tamanho reduzido.** Testar como o ícone (e texto, imagem, botão) se comporta na menor tela prevista.

**#59 — Touch target.** Mínimo **44×44px** (Apple) ou **48×48px** (Android). Ações prioritárias podem ser maiores (ex.: play do Spotify a 58×58px). Ícones muito próximos também derrubam a precisão de toque. Valores vêm de pesquisa com o tamanho médio dos dedos ("44×44dp"). Alvos maiores servem a ações principais, menores a secundárias. "Testar com uma pessoa é melhor que com ninguém; design é sobre contexto."

**#60 — Ícone sem label.** Só quando o significado é universal (lupa, coração, fechar, play, compartilhar, salvar, voltar). Universais citados: salvar, pesquisar, fechar, recarregar, comentar, reproduzir, compartilhar, voltar. Ícone ambíguo (engrenagem para "variáveis") precisa de rótulo. "Se o ícone não é comum, pense se deveria usá-lo." Ícone novo → testar com usuários.

**#61 — Biblioteca com Outline + Filled.** Facilita marcar estado selecionado.

**#62 — Pesquisar padrões.** Se um ícone se repete em vários apps para a mesma função, use o mesmo. Não reinventar.

---

## 6. Imagens e textos (#63–70)

**#63 — Qualidade.** Imagem ruim derruba a tela inteira. Evitar imagens batidas (primeiras da busca). Processamos imagem mais rápido que texto. Usar bancos (Unsplash, Pixabay, Pexels) que entregam tamanho grande. Evitar Google Imagens (qualidade + direitos autorais).

**#64 — Imagens atuais e inclusivas.** Evitar imagens antigas e cenários de estúdio com fundo branco: "fundo branco = artificial" é **opinião declarada do autor** ("eu particularmente fujo"). Preferir imagens atuais e inclusivas.

**#65 — Cor da imagem x cor da marca.** Buscar imagens que combinem com o branding. Truque de busca: `assunto + cor` (ex.: "laptop purple").

**#66 — Edge to edge.** Técnica **opcional** ("sugestão extra"): em cards, estourar a imagem até a borda pode destacar melhor que respeitar a grid interna. A versão com padding não é erro.

**#67 — Propósito e contexto.** Imagem irrelevante desperdiça espaço e confunde. Escolher pela história a ser contada.

**#68 — Contraste de texto sobre imagem.** Técnicas, em ordem de uso:
1. **Overlay sólido** — `#000000` a **70%** de opacidade.
2. **Degradê** — de `#000000` 100% na base do texto até `#000000` 0% no topo. Pode usar cor predominante da imagem em vez de preto (ex.: `#371F10`).
3. **Degradê de duas cores** — linear a **85%** de opacidade (ex.: `#933EFF` → `#538DFF`), idealmente extraídas da própria imagem.
4. **Blend mode Multiply** com camada de cor escura (exemplo `#197122`; no Figma o blend mode fica no ícone de gota).
5. **Composição** — posicionar o texto em área naturalmente limpa da imagem.
6. Reduzir a saturação da imagem para aumentar contraste (dica de apoio ao overlay sólido; a ordem desta lista é deste resumo).
7. **Degradê diluído de texto para a imagem** — cor sólida da marca ou da imagem diluindo da esquerda (onde está o texto) para a foto à direita; funciona com texto lateral.

**#69 — Responsividade da imagem.** Perguntar: o propósito se entende em tamanho menor? Como o texto sobre a imagem quebra? Algum elemento importante some no celular?

**#70 — Extrair cores.** Adobe Color → Extrair Tema (color.adobe.com/create/image), com modos Colorido, Brilho, Suave, Profundo, Escuro e Nenhum, gerando 5 cores.

---

## 7. Extras — interação e formulários (#71–80)

**#71 — Fontes pesadas em parágrafos.** Não usar bold/extrabold em bloco inteiro — mata a hierarquia e desacelera a leitura. Bold serve para títulos, trechos curtos de destaque e links (medium/semibold funcionam bem). Com parágrafo acompanhando um título, tudo ao mesmo peso = "mesma prioridade": título extra-bold + parágrafo regular (ver #3).

**#72 — Drop-shadow em texto.** Nunca. Para destacar, use cor, tamanho ou peso. Sombra continua válida em: background de cards, hover de botões, hover de cards de artigo (ver #32). Sombra colorida do guia: `#A762FF` em card gradiente roxo/rosa.

**#73 — Affordance de scroll.** Deixar elemento "cortado" ou em preview na borda para comunicar que há mais conteúdo — vale para scroll horizontal e vertical.

**#74 — Empty states.** Tela vazia é oportunidade: sugerir ação útil ou apresentar recurso ainda não descoberto. "Sem músicas adicionadas — que tal começar adicionando algumas?" + botão, em vez de "Nada para mostrar aqui".

**#75 — Botão full width.** Funciona bem quando é o único CTA evidente e não disputa espaço lado a lado. Amplia a área de toque. Deve respeitar os limites laterais da grid.

**#76 — Teclado correto.** Pré-abrir o teclado compatível com o tipo da informação. Único exemplo do guia: teclado numérico para valor em R$. Elimina o risco de dado incorreto. Datas, e-mail e `type` / `inputMode` em web são **adição deste resumo**.

**#77 — Separação de conteúdos.** Separadores leves: espessura fina e cor opaca (`#EAEAEA`, não `#000000`). Quatro opções do guia (as cores são só exemplo): **linha leve**, **borda leve** (`#EAEAEA` aparece na borda dos itens), **preenchimento de fundo** e **mais espaçamento**. Objetivo: evitar tons que sirvam só de peso ou ruído.

**#78 — Ícones em botões de carrossel/categoria.** Reforçam a ação e ampliam a área de toque em grupos de atalhos lado a lado (padrão comum em apps de banking).

**#79 — Labels visíveis.** Nunca só placeholder. O usuário esquece o que o campo pedia e precisa apagar o conteúdo para reler. Label sempre aparente acima do input.

**#80 — Botão de envio evidente.** Perto dos campos, na posição esperada, com ênfase visual clara. Erros do guia: dois botões iguais sem prioridade ("Solicitar contato" + "Voltar"; solução: secundário como botão só de texto sob o primário); ação principal sem ênfase (botão só de texto cinza); botão de envio **acima** dos campos ou longe deles, em posição não habitual.

---

## Referências citadas pelo guia

- guia-wcag.com · coolors.co/contrast-checker · onlinepalette.com · material.io/resources/color · maketintsandshades.com
- fonts.google.com/icons · phosphoricons.com · akveo.github.io/eva-icons
- developer.apple.com/design/human-interface-guidelines/foundations/layout · material.io/design/layout/spacing-methods
- lawsofux.com/fittss-law · nngroup.com/articles/touch-target-size
- unsplash.com · pixabay.com · pexels.com · color.adobe.com/create/image
