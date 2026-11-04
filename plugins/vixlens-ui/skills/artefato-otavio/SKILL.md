---
name: artefato-otavio
description: >-
  Monta o artefato que a Mari entrega ao Otávio para uma mudança no Vix Factory (tela, feature ou correção): protótipo React vivo mais código TSX no stack do Lovable, em .zip por parte, conferido contra o código real do projeto, para o Claude dele aplicar de uma vez e gastar o mínimo de crédito. Use quando pedirem artefato para o Otávio, entregar correção ao Otávio, mandar tela ou feature para o Lovable, ou /artefato-otavio.
---

# Artefato para o Otávio

O Otávio trabalha só pelo Lovable, com o Claude dele ligado por MCP. Não tem Figma, não sabe abrir Figma e é visual. A Mari não mexe no Lovable. O artefato é a entrega: ele vê a tela funcionando e baixa o código. Meta: ele aplica tudo em um pedido só, sem rodadas de correção, porque cada pedido ao Lovable gasta crédito dele.

Antes de começar, se existir memória sobre o artefato do CRM ou sobre como o Otávio recebe artefatos, leia.

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
- Atualize o mesmo URL a cada mudança. Mescle com a versão de outra sessão antes de publicar, se houver.
- Abra no Chrome e confira o que mudou, no desktop e no celular. Não diga que está pronto sem ter visto.
- Mande a Mari o link e o resumo do que mudou em linguagem simples.
- No fim, atualize a memória do artefato (estado, pendências).

## 7. Cuidados de ferramenta
- Patches grandes: escreva o script com a ferramenta Write, não com heredoc. Barra invertida em regex se perde na transmissão; prefira indexOf e slice.
- O terminal da Mari é PowerShell 5.1: sem &&.
- Tudo o que for do Otávio via Lovable: nunca envie mensagem ao Lovable por conta própria.
