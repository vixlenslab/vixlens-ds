---
name: artefato-otavio
description: >-
  Monta o artefato que a Mari entrega ao Otávio para uma mudança no Vix Factory (tela, feature ou correção): protótipo React vivo mais código TSX no stack do Lovable, em .zip por parte, conferido contra o código real do projeto, para o Claude dele aplicar de uma vez e gastar o mínimo de crédito. Use SEMPRE que a Mari pedir qualquer tela, correção, ajuste ou feature para o Otávio ou para o Lovable, citando ou não a skill, e quando digitarem /artefato-otavio. Esta skill carrega junto as skills vixlens-design-system e ui-boas-praticas, que são obrigatórias em toda entrega.
---

# Artefato para o Otávio

O Otávio trabalha só pelo Lovable, com o Claude dele ligado por MCP. Não tem Figma, não sabe abrir Figma e é visual. A Mari não mexe no Lovable. O artefato é a entrega: ele vê a tela funcionando e baixa o código. Meta: ele aplica tudo em um pedido só, sem rodadas de correção, porque cada pedido ao Lovable gasta crédito dele.

Antes de começar, se existir memória sobre o artefato do CRM ou sobre como o Otávio recebe artefatos, leia.

## 0. Skills obrigatórias em toda entrega
Esta skill faz tudo o que está descrito abaixo e, além disso, **sempre** chama as outras duas pela ferramenta Skill. Não pule nenhuma, nem em ajuste pequeno, nem quando a Mari não citar.
1. **No começo, antes de desenhar:** `vixlens-brand:vixlens-design-system` (cores, tipografia, tokens, componentes, voz e vocabulário canônico: Vixlens junto, nunca "Vix Lens"). Se o DS vivo não puder ser conferido (o site é SPA), use o repo do DS, vixlens-ds, e avise a Mari.
2. **Antes de publicar:** `vixlens-ui:ui-boas-praticas` em modo Auditar + Aplicar sobre o protótipo e o TSX: contraste medido, 65 caracteres, alvos de 44 px, hierarquia, um botão primário. Corrija os 🔴 e 🟡, e conte no resumo para a Mari o que ficou de fora e por quê. Regras da Mari e do DS vencem o guia; conflito vira pergunta, não correção silenciosa.
3. **Ao terminar:** diga à Mari, numa linha, que as duas skills rodaram e o que cada uma mudou. Se uma não rodou, diga qual e por quê, e não chame de pronto.
4. Quando a Mari pedir "atualiza o artefato" ou "ajusta o mobile", o mesmo vale: rodar de novo a 2 sobre o que mudou.

**Os consultores usam o sistema no celular.** Tudo é pensado primeiro para 390 px e depois alargado. Veja "Celular primeiro" e "Design System" abaixo; valem para toda tela entregue por esta skill.

## 1. Escopo
- Uma feature por artefato. Se já existe artefato da feature, atualize o mesmo URL (Artifact com url), nunca crie outro.
- Só duas abas: Protótipo e Código. Sem Figma, sem imagens, sem tabelas de auditoria.
- Decisão de produto não é minha nem do Otávio. Se faltar decisão da Mari, pergunte antes de desenhar, e registre a decisão no artefato.
- Se o pedido muda escopo, atualize SCOPE.md antes (regra do CLAUDE.md do projeto).

## 2. Ler o projeto real antes de escrever código
Projeto Lovable: "Vix Factory — Produção" (ache o id com list_projects). Só leitura pelo MCP do Lovable (list_files, read_file). Nunca send_message nem escrever sem o Otávio pedir.
Leia, nesta ordem:
1. AGENTS.md (regras: mudança de tela é só apresentação, toda ação de lead chama logEvent, regras de rota).
2. src/styles.css (tokens e classes). Só use cor ou classe que exista no tema. Conferido em 04/11: success-label, warning-label e critical-label NÃO são classes do tema, só variáveis. Use text-[var(--success-label)].
3. Os componentes que o código vai importar: src/components/Badge.tsx, EstadoFactory.tsx, SeletorFactory.tsx, BotaoTestes.tsx, ui/button.tsx, ui/sheet.tsx, ui/dialog.tsx, ui/dropdown-menu.tsx, ui/icones.tsx. Confira nome exportado, props e ícones. Nunca infira assinatura.
4. A rota e o componente real da tela que está mudando, para o código novo encaixar nos dados que ela já lê.

Armadilhas já encontradas:
- Badge não aceita className e já traz ml-2.
- EstadoFactory põe o título dentro de um h2. Para callout com botão, use as classes estado-factory estado-factory-aviso numa div.
- BotaoTestes usa react-query: a pré-visualização precisa estar dentro do QueryClientProvider.
- Ícones só pelos nomes exportados em @/components/ui/icones (Phosphor bold).
- O :focus-visible do projeto é outline 3px com !important. Se a Mari pedir foco discreto, entregue o trecho de styles.css no LEIA-ME.

## 2b. Celular primeiro (consultores em campo)
- Desenhe e confira em 390 px antes do desktop. O seletor Desktop/Celular do protótipo usa container query: no código-fonte exibido use `sm:`/`md:`/`lg:` normais e no protótipo converta para `cq-*` por regex na hora de rodar (o código baixado fica com as classes do projeto).
- Uma coluna no celular, na **ordem de uso**, não na ordem do código. Truque que mantém os slots intactos: colunas do desktop com `contents lg:block` e cada bloco com `order-N`, dentro de `flex flex-col gap-3 lg:grid`. Envolva cada slot em div só quando ele existir (slot nulo não pode deixar div vazia gerando espaço).
- Ação principal em largura total no celular (`w-full sm:w-auto`), uma só amarela por tela; secundárias em contorno, também em largura total. Alvo de toque mínimo 44 px.
- Abas no celular: nunca cortadas nem com rolagem. Até 5 abas viram colunas iguais (`grid grid-cols-5`), cada uma com ícone em cima e nome curto de uma palavra embaixo (`text-[11px]`, `min-h-14`); de `md` em diante voltam a ser a pílula do DS com o nome inteiro. O nome completo vai no `aria-label`. O `cn()` do projeto faz twMerge, então a className do uso vence a base do `TabsTrigger`. Mais de 5 abas: reveja o agrupamento antes de recorrer a rolagem.
- Raio e padding: a regra da Mari vale **igual no celular**, não se afrouxa para ganhar largura. Quanto maior o raio, maior o padding; padding de pelo menos 75% do raio em todo contêiner (cartão raio 32 com padding 24, tile raio 24 com 20, linha de lista e callout raio 12 com 12 a 16). Se não couber, reduza o raio junto, nunca só o padding, e reveja a medida de cada caixa nova antes de publicar.
- Texto de apoio com `max-w-[65ch] text-pretty` (nunca palavra sozinha na última linha). Nada de `max-md:`.
- Verifique no Chrome em 390 px cada aba e cada estado. Não diga que está pronto sem ter visto o celular.

## 2c. Design System (consultar antes de desenhar)
- `ds.vixlens.com.br` é SPA e não entrega valores. Leia o repo do DS, vixlens-ds (`git fetch` antes): `src/components/fundamentos/CoresSection.jsx`, `IconografiaSection.jsx`, `componentes/CalloutsSection.jsx`, `CardsSection.jsx`, `assets/tokens/vixlens-tokens.json`. Avise a Mari que a checagem foi pelo repo.
- Aba que só hospeda blocos já existentes não pode ficar crua: dê um cabeçalho (ícone em tile cinza + título + uma linha do que a aba mostra).
- Ícone no título de cada cartão, em tile `size-9 rounded-xl bg-surface text-muted-foreground`, só com nomes já exportados em `@/components/ui/icones` (Phosphor bold, peso único na tela). Se faltar ícone, liste no LEIA-ME as linhas exatas para acrescentar em `icones.tsx`.
- Cor por significado, nunca decorativa: Callouts do DS (barra lateral 4px, `rounded-r-sm`, `p-4`; destaque amarelo, informativo roxo, crítico coral, sucesso verde). Queda ou atenção = destaque amarelo; crítico só para erro ou risco real (o DS manda não usar crítico para tudo); sucesso para vigente/confirmado. Amarelo é do CTA e do destaque; azul quase nunca; preto e branco dominam (60-30-10). Texto colorido só com as variáveis `text-[var(--...-label)]`.
- Números importantes em tile cinza (`rounded-md bg-surface p-5`: rótulo pequeno, valor `text-xl font-bold tabular`, apoio em chip de tom). Lista de itens em linhas `bg-surface`. Estado vazio neutro, sem alarme.
- As skills `vixlens-design-system` (antes de desenhar) e `ui-boas-praticas` (antes de publicar) são obrigatórias, ver passo 0. O que ficou de fora vai no resumo para a Mari.

## 3. Protótipo (aba Protótipo)
- React 18 UMD + @babel/standalone + Tailwind play CDN, classes iguais às do projeto, tokens como variáveis no wrapper. Layout por container query (o seletor Desktop/Celular funciona).
- Dados de exemplo reais (nomes de óticas, praças, papéis do Factory), nunca lorem ipsum.
- Estados: normal, carregando, erro, vazio. Tema claro e escuro.
- As telas seguem o padrão do app (abas dentro do app abaixo do cabeçalho, filtros menores e iguais, botão primário na ação principal, Phosphor bold). Siga as memórias de padrões de UI da Mari no CRM, se existirem.
- Menos é mais. Se duas telas têm a mesma função, recomende tirar uma.

## 4. Código (aba Código)
- TSX no stack do projeto: React 19, Tailwind 4, shadcn new-york, Radix, Phosphor via @/components/ui/icones.
- Só apresentação: props controladas, sem fetch, sem estado de servidor. O pai liga aos dados existentes. Entregue um adaptador de exemplo (Lead do sistema para o tipo da tela).
- Um arquivo por componente, mais tipos.ts, util.ts, dados-exemplo.ts e index.ts. Sem código morto.
- Confira com tsc estrito (strict, exactOptionalPropertyTypes, noUnusedLocals) contra stubs escritos A PARTIR dos arquivos reais lidos no passo 2, não de memória. Rode também um teste de render em servidor (esbuild + react-dom/server) de cada tela e estado.
- Se o nome ou a rota mudar na tela (ex.: Chegadas virou Demandas), diga no LEIA-ME se código e rota continuam com o nome antigo.

## 5. Entrega ao Otávio
- Botão "Baixar tudo" e um .zip por parte. Downloads do artefato não aceita .tsx, então gere .zip no navegador (JSZip no cdnjs) com a capability downloads. O visualizador pede confirmação.
- A fonte do TSX fica embutida no HTML (script application/json). Reembuta depois de cada mudança.
- LEIA-ME.md dentro do pacote: tabela arquivo → destino, como usar, o que muda em relação ao sistema, "Conferido contra o projeto" (data e o que bateu), e um prompt pronto para o Claude dele: ler o pacote, aplicar tudo em um único pedido, só apresentação, ligar nos dados que já existem, chamar logEvent nas ações de lead.
- Para economizar crédito dele: decisões já fechadas no artefato, nenhuma pergunta em aberto no pacote, nada para "depois".

## 6. Publicar e verificar
- Antes de publicar: `ui-boas-praticas` rodada (passo 0). Depois de publicar, confira no Chrome.
- Atualize o mesmo URL a cada mudança. Mescle com a versão de outra sessão antes de publicar, se houver.
- Abra no Chrome e confira o que mudou, no desktop e no celular. Não diga que está pronto sem ter visto.
- Mande a Mari o link e o resumo do que mudou em linguagem simples.
- No fim, atualize a memória do artefato (estado, pendências).

## 7. Cuidados de ferramenta
- Patches grandes: escreva o script com a ferramenta Write, não com heredoc. Barra invertida em regex se perde na transmissão; prefira indexOf e slice.
- O terminal da Mari é PowerShell 5.1: sem &&.
- Tudo o que for do Otávio via Lovable: nunca envie mensagem ao Lovable por conta própria.
