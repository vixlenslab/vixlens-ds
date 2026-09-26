---
name: nova-pagina
description: >-
  Cria página nova ou landing page no site vixlens.com.br (repo vixlenslab/site_vixlens) no padrão do projeto — página do site com menu completo, LP em vixlens.com.br/<palavra> ou LP em subdomínio <palavra>.vixlens.com.br. Gera a rota com `npm run nova-pagina`, monta a página por blocos de dados (textImage, cards, ctaBanner, faq, contact), confere em 375/768/1440, abre PR e orienta DNS na Cloudflare e domínio na Vercel quando for subdomínio. Use SEMPRE que pedirem página, LP, landing page, hotsite, página de campanha, página de evento, página de produto ou subdomínio para o site da Vixlens. Triggers: "cria uma LP", "landing page", "página nova no site", "página da campanha", "hotsite", "lp.vixlens", "vixlens.com.br/alguma-coisa", "subdomínio para a promoção", "página do evento", "página para o anúncio".
---

# Nova página ou landing page no site Vixlens

A fonte da verdade é o próprio repositório. **Antes de qualquer coisa, leia no repo
`site_vixlens`:** `docs/NOVA-PAGINA.md` (receita completa), `src/lib/pages/types.ts` (contrato dos
blocos) e `.claude/CLAUDE.md` (regras). Se algo aqui divergir do repo, o repo manda.

## 1. Entender o pedido e recomendar o formato

Pergunte só o que faltar (uma pergunta por vez, com recomendação):

| Formato                    | Endereço                         | Quando usar (recomendação)                                          |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| Página do site             | `vixlens.com.br/<slug>`          | Conteúdo permanente do institucional, pode entrar no menu           |
| **LP em caminho (padrão)** | `vixlens.com.br/<palavra>`       | Campanha, evento, anúncio. Sem menu, foco no formulário. Zero DNS   |
| LP em subdomínio           | `<palavra>.vixlens.com.br`       | Endereço curto falado ou impresso (QR, rádio, feira). Exige DNS     |

A palavra é livre (`outubro`, `expovisao`, `promo`, `lp`...), em minúsculas com hífen, sem
repetir rota existente. Na dúvida entre caminho e subdomínio, **recomende caminho**.

Também confirme: título, objetivo (qual ação a pessoa deve tomar), textos e imagens.

- **Copy é do GPT/Codex ou do Figma**, não invente texto de venda. Sem copy, monte com
  `[TROCAR]` e avise. Grafia sempre **Vixlens** (junto); nomes de lente seguem o tabelão.
- **Escopo:** regra do projeto, nada é implementado sem `SCOPE.md` validado. Registre a página
  nova numa seção do `SCOPE.md` com status e quem validou.

## 2. Preparar o repositório

```bash
cd C:\vixlens\site_vixlens      # ou o clone da máquina
git fetch
git switch -c feat/lp-<slug> origin/main    # ou feat/pagina-<slug>
```

Nunca use `git stash`; trabalho inacabado vai para branch `wip/...` com push.

## 3. Gerar

```bash
npm run nova-pagina -- --slug <slug> --titulo "<Título>"                          # página do site
npm run nova-pagina -- --tipo lp --slug <slug> --titulo "<Título>"                # LP em caminho
npm run nova-pagina -- --tipo lp --slug <slug> --titulo "<Título>" --subdominio <palavra>   # LP em subdomínio
```

Use `--dry` para simular. Não crie rota ou arquivo à mão.

## 4. Montar a página

Edite **só** `src/lib/data/paginas/<slug>.ts`:

- `meta` (título até ~60 caracteres terminando em `| Vixlens`, descrição até ~155), `hero`
  (título curto, subtítulo de uma frase, CTA para `#contato`).
- `blocks` na ordem da página: `textImage`, `cards`, `ctaBanner`, `faq`, `contact`. Repita,
  reordene ou remova à vontade. **Sempre termine com `contact`** (formulário que cai no Pipedrive).
- Imagens `.webp` em `public/assets/paginas/<slug>/` (medidas no `LEIA-ME.txt` da pasta). Hero
  mobile vertical com o rosto no terço de cima: **nunca texto sobre rosto**. Não publique com as
  imagens de `_modelo`.
- Precisou de algo que nenhum bloco faz? Crie um bloco novo seguindo "Quando nenhum bloco
  serve" em `docs/NOVA-PAGINA.md`. Não escreva seção solta dentro da página.

## 5. Conferir

```bash
npm run check     # lint, tipos, formatação, testes
npm run build
npm run dev       # não rode build com o dev ligado: pare o dev antes
```

No navegador, em **375px, 768px e 1440px**: texto do hero dentro da primeira dobra no celular,
textos à esquerda no mobile, nada cortado, botões levando ao formulário. Aplique a skill
`ui-boas-praticas` se houver dúvida visual. **Mostre print ao usuário antes de subir.**

## 6. Publicar

1. Commit (autor `vixlens-lab-bot`, já vem do `~/.gitconfig` nas máquinas em `C:\vixlens`) e PR
   para a `main`, descrição em português.
2. Merge **só com o ok do Otávio** ("sobe"). Merge = no ar em ~1 min pela Vercel.
3. Confirme a página no ar com `curl -I` e atualize o Status no `SCOPE.md`.

## 7. Subdomínio (só se escolhido)

Depois do merge, ligar uma vez:

1. **Cloudflare** > vixlens.com.br > DNS: `CNAME <palavra>` → `cname.vercel-dns.com`, **Somente DNS**.
2. **Vercel** > projeto `site-vixlens` > Settings > Domains: adicionar `<palavra>.vixlens.com.br`.

Mexer em DNS e em domínio é ação externa: **peça confirmação explícita antes**, e prefira que a
pessoa faça (ou faça no Chrome dela com aprovação). Nunca toque em `pedidos.`, `mail.`,
`webmail.`, `cpanel.`, MX, `send.` nem troque nameservers. Enquanto o subdomínio não estiver
ligado, a LP já abre em `vixlens.com.br/<slug>`.

## Entrega

Diga ao usuário, em linguagem simples: o endereço no ar, o que ficou com `[TROCAR]` ou imagem de
modelo (se algo ficou), e os passos de DNS pendentes, se houver.
