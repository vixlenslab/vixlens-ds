# Contribuir com o Vixlens Design System

Guia de como propor e aplicar mudanças no DS. Vale para dev e design.
Repo: https://github.com/vixlenslab/vixlens-ds · No ar: https://ds.vixlens.com.br

## Regras de ouro

1. **Fonte única de token é o JSON.** `assets/tokens/vixlens-tokens.json`. Os arquivos `.css` e o preset Tailwind são **gerados** — nunca edite na mão.
2. **Toda mudança passa por PR.** `main` faz deploy automático (Vercel). O CI (GitHub Actions) roda **drift de token + lint + build + auditoria de acessibilidade (Lighthouse)**; PR não passa se drift, lint ou build quebrarem.
3. **Deploy sempre com autor `vixlens-lab-bot <bot@vixlens.com.br>`.**
4. **Mudança grande (novo token, novo componente, quebra):** abra uma _issue_ usando o template **RFC** antes, pra alinhar. Pequena (texto, fix): PR direto.

## Donos & decisão

- Quem revisa/aprova está em [`.github/CODEOWNERS`](.github/CODEOWNERS) — preencha com os handles reais do time e ligue "require review from Code Owners" em Settings → Branches pra tornar a revisão obrigatória.
- **RFC** decide mudança grande: abra a issue (template RFC), alinhe, então PR. Quebra (MAJOR) sempre passa por RFC.
- Templates em `.github/`: RFC, pedido de componente e checklist de PR.

## Mudar um token (cor, raio, espaçamento, tipografia)

```bash
# 1. edite o JSON
assets/tokens/vixlens-tokens.json

# 2. regenere os exports (CSS + preset Tailwind 3 + @theme Tailwind 4)
npm run tokens:build

# 3. confira que ficou em sync
npm run tokens:check

# 4. commit do JSON + dos gerados juntos
git add assets/tokens/
```

Nunca edite `vixlens-tokens.css`, `vixlens-tailwind-preset.cjs` nem `vixlens-theme-v4.css` diretamente — o `tokens:check` (e o CI) vão barrar.

## Adicionar um componente

1. Base é o preset shadcn **luma**: `npx shadcn@latest init --preset b6GgLgzgW` (estilo já decidido). Aplique os tokens Vixlens por cima.
2. Crie a seção em `src/components/<grupo>/<Nome>Section.jsx` usando `<Section id=... eyebrow=... title=... desc=...>`.
3. Documente: `PropsTable` + `DosDonts` (de `componentes/ComponentDocs.jsx`) e um bloco `CodeBlock` (de `Copy.jsx`) com o snippet de uso.
4. Registre em `src/App.jsx` (import + render, na ordem visual) e em `src/data/nav.js` (item + `eyebrow` sequencial, sem duplicar número).

## Versionamento (SemVer)

`MAJOR.MINOR.PATCH` — **MAJOR** quebra, **MINOR** adiciona compatível, **PATCH** corrige.

Ao lançar uma versão:

1. Bump em **3 lugares**: `src/data/nav.js` (`version`), rodapé em `src/App.jsx`, e `package.json`.
2. Adicione a entrada no topo da timeline em `src/components/sobre/ChangelogSection.jsx`.
3. Depois do merge, crie a tag:
   ```bash
   git tag -a v0.7.0 -m "v0.7.0"
   git push origin v0.7.0
   ```

## Rodar local

```bash
npm install
npm run dev          # dev server
npm run build        # build de produção (roda tokens:check antes)
npm run tokens:build # regenera os exports de token
```

## Skills e plugins

As skills dos plugins (`plugins/*/skills/*/SKILL.md`) são validadas por
`npm run skills:check`, que roda sozinho no `prebuild` e no CI.

Ative o hook de pre-push uma vez por clone:

```bash
npm run hooks:setup
```

O que ele barra:

- frontmatter que não é YAML válido
- `name` divergente do nome da pasta, ou `description` faltando
- arquivo citado em `references/` que não existe
- versão do `plugin.json` diferente da do `marketplace.json`
- `source` do marketplace sem o `./` no começo

### Cuidado com dois-pontos no `description`

`description:` sem aspas é escalar YAML puro. Um dois-pontos seguido de espaço
no meio do texto (`Triggers: `, `Para: `) faz o YAML inteiro falhar — e a skill
carrega com **metadata vazia**, sem erro nenhum. Na prática ela para de
disparar por contexto e só responde se você digitar o nome.

Escreva sempre em bloco:

```yaml
description: >-
  Texto livre, com Triggers: "isso", "aquilo" — sem precisar escapar nada.
```

Quatro das sete skills ficaram semanas nesse estado antes de alguém notar.
