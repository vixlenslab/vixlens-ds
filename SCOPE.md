# SCOPE — Materiais: PDFs de produto e tabela de preços

**Status:** concluído
**Data:** 2026-09-24
**Pedido por:** Otávio (direto no Claude Code)

## O quê
Publicar na aba **Materiais** do ds.vixlens.com.br 5 PDFs de produto que a
Vixlens já entrega a qualquer ótica, com botão de abrir e baixar.

| Material | Arquivo publicado | Origem (Drive) |
|---|---|---|
| Tabela de preços 2026 (20 págs) | `assets/materiais/tabela-precos-vixlens-2026.pdf` | `003 - Tabelas/000 - Tabelões/2026/tabelona_vixlens_2026_digital_v16_20_páginas.pdf` |
| Cardápio de lentes Freevix 2026 | `assets/materiais/cardapio-lentes-freevix-2026.pdf` | `001 - Cardápio_lentes_vixlens/2026/AF_Cardapio_2026_A4.pdf` |
| Folder de tecnologias | `assets/materiais/folder-tecnologias-vixlens.pdf` | `002 - Folder tecnologias/Vixlens_Folder_digital.pdf` |
| Marca própria | `assets/materiais/marca-propria-vixlens.pdf` | `004 - Marca propria/AF_marca propria.pdf` |
| Tracer E-tess | `assets/materiais/tracer-etess-vixlens.pdf` | `005 - Tracer Etess/AF_tracer_Etess_V2.pdf` |

Base das origens: `H:\Meu Drive\000 - Gestão Mkt\001 - Vixlens\003 - Marketing\002 - Produção Geral\002 - Produtos & Técnicos\`.

## Decisões
- Acesso público, sem senha: a tabela é a que o comercial já entrega às óticas.
- PDF versionado dentro do repo (não link do Drive). Reajuste = trocar o arquivo
  mantendo o mesmo nome + commit + deploy.
- Novo grupo "Produtos & tabelas" no topo da aba, com os 5 cards ativos.
- Tabela de preços primeiro, com tag amarela "Atualizada" (fixa no código —
  tirar ou manter a cada reajuste).
- O card placeholder "Tabela de preços" sai do grupo Comercial.
- Demais cards (papelaria, proposta, deck, institucional) seguem "Em breve".
- Descrições curtas dos cards escritas pelo Claude; GPT pode revisar a copy depois.

## Adendo 2026-09-24 — Card Produto: carrossel com navegação
**Status:** concluído
- Seção Cards → "Card Produto — carrossel de linha (Freevix)": o carrossel atual
  (só scroll) fica como está.
- Novas variantes logo abaixo, mesmos cards e dados:
  - **A — setas abaixo:** botões circulares ← → embaixo à direita; desativam nas pontas.
  - **B — bolinhas:** um ponto por card, ponto ativo alongado em amarelo; clicar leva ao card.
- Scroll com snap por card; arrastar/scroll do trackpad segue funcionando.
- Sem biblioteca nova (nada de embla); componente local na própria seção.

## Fora do escopo
- Tabela interativa no site (busca/filtro).
- Compressão dos PDFs.
