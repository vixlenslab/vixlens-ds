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

## Adendo 2026-09-24 — Tecnologias & desenho de lentes
**Status:** concluído
- Nova seção **Marca → Tecnologias & lentes** (`#tecnologias`), depois de Fotografia.
- Bloco 1 — **Ícones de tecnologia**: 12 tecnologias (freeform, WideView, Adapt,
  SoftView, Duo, VixSense, PointLight, Mapping, VixSlim, SmartView, Pixel,
  VixControl). Card mostra o lockup, nome e descrição; download do ícone e do
  lockup em SVG + .zip com todos.
- Bloco 2 — **Desenho de lentes**: 12 desenhos (Vix Total, Freevix One, Premium,
  Freedom, IA Tech, Deskview 1,3M, Deskview 2M, Office 4M, VS, VS HD, VS Relax,
  Astera), com família; download SVG + .zip.
- Fonte dos arquivos: `C:\Vixlens\apresentacoes\assets-tecnologias-vixlens\`
  (mesma pasta que alimenta o deck de tecnologias). Nomes e descrições das
  tecnologias vêm do deck, transcritos do folder — nada de copy nova.
- Arquivos no DS: `assets/marca/tecnologias/` e `assets/marca/desenhos-lentes/`.
- Filtros (Sun+, UV+, Freevix Colors, Transitions, Reflecta) ficam fora por ora.

## Adendo 2026-09-24 — Data de atualização e versão
**Status:** concluído
- Todo arquivo para download mostra "Atualizado em DD/MM/AAAA": por card em
  Materiais (campo `atualizado` em `PDFS`) e por bloco em Tecnologias & lentes
  (`ATUALIZADO`, mostrado no card do .zip).
- Regra: trocou ou incluiu arquivo, a data passa a ser o dia em que ele entrou
  no DS. Os arquivos que subiram em 24/09/2026 ficam com essa data.
- Toda publicação de arquivo novo ou trocado ganha entrada no Changelog e bump de
  versão (arquivo = patch; seção ou componente novo = minor).
- v0.10.0 (24/09/2026): Materiais em PDF, Tecnologias & lentes, carrossel com
  setas e bolinhas, datas de atualização.

## Adendo 2026-09-25 — Carrossel oficial + Aviso de cookies (v0.11.0)
**Status:** concluído
**Pedido por:** Otávio (spec em `C:\vixlens\outputs\prompt-ds-carrossel.md`)

Os dois componentes já estão no ar no site institucional (`vixlenslab/site_vixlens`)
e entram no DS como padrão oficial.

### Carrossel de cards
- Referência de comportamento: `site_vixlens` → `src/components/ui/CarouselNav.tsx`
  e `src/hooks/useCarousel.ts`. A spec completa (anatomia, visual, comportamento,
  a11y, critérios de aceite) é o prompt acima.
- Biblioteca: `src/components/ui/carousel.jsx`, exportado em `src/lib.js`
  (`useCarousel`, `useCarouselAutoplay`, `CarouselNav`, `CarouselTrack`,
  `CarouselItem`, `carouselItemWidth`).
- Doc: nova seção **Componentes → Carrossel** (`#carrossel`), com demo em fundo
  claro e escuro, autoplay, props, quando usar, a11y e código.
- **Pré-visualização desktop × mobile** lado a lado (pedido do Otávio): o demo roda
  em iframe da própria página (`/?demo=carrossel`) com larguras reais de 1280px e
  375px, para os breakpoints do Tailwind valerem de verdade.
- As duas variantes provisórias de 24/09 em Cards ("setas abaixo" e "bolinhas")
  saem; Cards aponta para a seção Carrossel. O carrossel só-scroll de Cards também sai.
- Sem dependência nova: o site usa framer-motion, o DS reproduz as animações
  (largura da pílula, escala das setas, cascata e hover `y: -6`) em CSS/Tailwind.

### Aviso de cookies (LGPD)
- Referência: `site_vixlens` PR #9 → `src/components/layout/CookieConsent.tsx`,
  `CookiePreferencesLink.tsx` e `src/lib/data/cookies.ts`.
- Biblioteca: `src/components/ui/cookie-consent.jsx` (`CookieConsent`,
  `CookiePreferencesButton`, `useCookieConsent`, `readConsent`, `saveConsent`).
- Doc: nova seção **Componentes → Aviso de cookies** (`#cookies`), com demo
  embutida (não flutuante), regra "scripts de medição só depois do Aceitar",
  props e código. Copy igual à do site.

### Versão
- v0.11.0 (MINOR: componentes novos) em 25/09/2026, com Changelog.
- v0.11.1 (PATCH) em 25/09/2026: carrossel medido com largura zero contava uma
  posição a mais; agora mantém o estado até a trilha aparecer.

## Adendo 2026-09-25 — Escala tipográfica com tablet (v0.11.2)
**Status:** concluído
**Pedido por:** Otávio ("prever uma Escala (Host Grotesk) — desktop ↔ tablet ↔ mobile")

- A escala passa de 2 para 3 tamanhos. Breakpoints: **mobile** abaixo de 1024,
  **tablet** a partir de `lg` (1024px) e **desktop** a partir de `xl` (1280px).
- Valores de tablet = os que o site institucional já usa em produção
  (`site_vixlens/src/app/globals.css`, classes `type-h1`…`type-h6`, que vêm do Figma).
  Nada inventado:

  | Nível | Desktop | Tablet | Mobile |
  |---|---|---|---|
  | H1 | 64 | 40 | 40 |
  | H2 | 48 | 40 | 32 |
  | H3 | 40 | 32 | 28 |
  | H4 | 32 | 28 | 24 |
  | H5 | 24 | 22 | 20 |
  | H6 | 20 | 18 | 16 |
  | Corpo, label, caption, overline | iguais nos 3 | | |

- Fonte única: campo `tablet` no `vixlens-tokens.json`. O gerador emite
  `--vix-font-<nível>-tablet` e a classe `text-vix-<nível>-t` (Tailwind 3 e 4).
  Uso: `text-vix-h1-m lg:text-vix-h1-t xl:text-vix-h1`.
- Doc: a seção Tipografia mostra desktop ↔ tablet ↔ mobile lado a lado.
- As tabelas de escala das skills (`vixlens-ui-architect` e `vixlens-design-system`)
  ganham a coluna Tablet, com bump de versão dos plugins.
- A decidir: no site, o H1 no tablet é igual ao mobile (40). Foi mantido assim.
- Versão PATCH (v0.11.2), pela cadência do DS: é um token novo e compatível, sem quebrar nada.
- v0.11.3 (pedido do Otávio): a escala vira abas Desktop · Tablet · Mobile, cada uma com
  a escala inteira em tamanho real, sem redução; o mobile vai numa moldura de 375px.
- v0.11.4 (decisão do Otávio: 40px no mobile é muito): a escala do **mobile** desce um
  degrau. H1 32, H2 28, H3 24, H4 20, H5 18, H6 16; corpo e UI sem mudança. Desktop e
  tablet ficam iguais. Com isso o DS **diverge do site** (o site ainda usa H1 40 no
  mobile); o ajuste no site é pedido separado.

## Adendo 2026-09-25 — Tabela promocional do mês (PromoVix) em Materiais (v0.11.4)
**Status:** concluído
**Pedido por:** Otávio ("mesmo esquema da tabela de preço")
- Card novo em Materiais → Produtos & tabelas, logo depois da tabela de preços:
  "PromoVix — setembro 2026", A4, 6 págs, 11 MB, tag "Setembro", com abrir e baixar.
- Arquivo: `assets/materiais/tabela-promocional-promovix.pdf`. Origem:
  `C:\vixlens\outputs\imagens-novas\Promovix_setembro_2026.pdf`, enviado pelo Otávio.
  As versões anteriores ficam no Drive, em `003 - Tabelas/002 - Tabela de promoção mensal/`.
- Público, como a tabela de preços: é a PVO que o comercial já entrega às óticas.
- **Rotina mensal:** trocar o PDF **mantendo o nome do arquivo**, para o link não
  mudar. Atualizar em `PDFS` o `t` (mês), o `d` (validade), a `tag`, a `meta` e o `atualizado`.
  Registrar no Changelog e fazer bump PATCH.

## Fora do escopo
- Tabela interativa no site (busca/filtro).
- Compressão dos PDFs.
