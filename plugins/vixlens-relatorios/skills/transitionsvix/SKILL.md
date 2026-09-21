---
name: transitionsvix
description: >-
  Use quando alguem pedir o relatorio Transitions de um mes ("Transitions de setembro", "relatorio do Fabricio",
  "quem comprou / quem nao levou Transitions", "lentes Transitions por cliente"), ou quiser refazer, conferir ou
  comparar esse relatorio mensal. Vale para o CEO, a Mari e o Eduardo. Nao e para analise de preco, margem ou
  estoque de Transitions.
---

# Relatorio Transitions do mes

Um script, dois arquivos, um conferidor. **Nao redescubra nada: esta tudo aqui.** Read-only no Volpe.

**Onde roda:** dentro do clone de `vixlenslab/AI-Vixlens` (nesta casa, `C:\Vixlens\AI-Vixlens`). O script, os docs e a pasta de entrega vivem la. Precisa do cofre `~/.volpe/ro.cred` e de IP liberado na PWI. O `confere.py` esta **na pasta desta skill** (o caminho base e informado quando a skill carrega).

## 1. Qual mes

- Pedido sem mes → **ultimo mes fechado**. Mes corrente so se pedirem, e ai o arquivo e **parcial**: diga isso na entrega e no decision log.
- Formato `-Mes yyyy-MM`.

## 2. Rode

```powershell
cd C:\Vixlens\AI-Vixlens
git pull
& scripts\relatorio-transitions-mes.ps1 -Mes 2026-08 -NoOpen
```

Leva ~1 min. Sai em `entregaveis\relatorios\`:

| Arquivo | Para quem | O que e |
|---|---|---|
| `Transitions-<Mes>-<Ano> - FABRICIO.xlsx` | **Fabricio** (consultor). E o que ele recebe. | **1 aba unica** `Transitions <Mes>-<Ano>`: TODOS os clientes (426 em ago/26) ordenados por `Lentes Transitions` **maior → menor** — quem levou no topo com o numero, quem nao levou no fim com 0 e a lente total (= potencial de troca). Colunas item, Cod, Cliente, Cidade, UF, Lentes Transitions, Lentes totais, `% Transitions`. **Sem** vendedor, fone, e-mail, R$. |
| `Transitions-<Mes>-<Ano>.xlsx` | interno (CEO/Mari) | 5 abas: Resumo, Clientes, Modelos, Cliente x modelo, NAO levaram (com vendedor/fone/e-mail). |

**R$ so quando pedirem:** `-ComValor` acrescenta `R$ Transitions` e `R$ medio/par` (VL_PRETOT da NF) no fim das abas e grava com sufixo `" - com valor"` (CEO 14/09, excecao a regra "so quantidade"). Sem o switch = quantidade, que e o padrao — e o do Fabricio **nunca** leva R$.

Regras embutidas no script (nao reescreva): so PJ · rede agrupada pela matriz (`docs/volpe/definicao-cliente.md`) · `DS_MODELO LIKE '%TRANSITIONS%'` · fotossensivel proprio (OptFacil GO Foto, LP Foto AR, Biovis) **fora** · unidade = lente unitaria, par = 2 · quantidade, nunca valor (CEO 10/08/2026).

**Se falhar:**
- `Login failed for user 'Read_Only'` (18456) → o cofre `~/.volpe/ro.cred` desta maquina esta velho. **Nao digite senha, nao tente outra.** Peca a quem pediu regravar no PowerShell dele: `Read-Host "Senha do Read_Only" -AsSecureString | ConvertFrom-SecureString | Set-Content "$env:USERPROFILE\.volpe\ro.cred"`. Doppler **nao** esta instalado nas maquinas da casa. Se a senha vigente tambem falhar, e rotacao/bloqueio na PWI (chamado).
- **"a tabela vem zerada" / "sem o numero de Transitions"** (CEO, 21/09) → **nao e bug de query.** Era o layout: o compacto tinha 3 abas e abria na `NÃO compraram`, onde `Lentes Transitions` e **0 por definicao**. Google Sheets abre sempre a 1a aba, e o CEO cobrou 2x. **Resolvido na raiz virando 1 aba unica** — *"Fabricio e burro, a gente precisa simplificar"*: enquanto houver aba para escolher, alguem escolhe a errada. Se reaparecer, confira `wb.sheetnames` / `wb.active.title` (openpyxl) antes de acusar o banco, e lembre que **quem recebeu versao antiga precisa do arquivo novo** — trocar tambem a copia que esta no Drive (a do Drive nao se atualiza sozinha).
- timeout / nao conecta → IP fora da allowlist da PWI. Rede, nao senha.
- erro de query → mostre o erro. Nao invente numero.

## 3. Confira antes de entregar

```powershell
python "<pasta desta skill>\confere.py" 2026-08   # ou: python scripts\confere-transitions.py 2026-08
```

Roda de dentro de `C:\Vixlens\AI-Vixlens`. Copia versionada no repo em `scripts/confere-transitions.py` — a da skill vive no cache do marketplace e se perde em update; se as duas divergirem, a do repo e a mais nova. Checa que o compacto fecha com o completo (contagem, soma, ordem, ninguem nos dois lados, `%` certo, Cliente x modelo = total) e imprime os numeros do mes contra o anterior. **`NAO FECHA` = nao entrega.** Ele exige **1 aba so** e que a coluna Transitions esteja em ordem decrescente (zeros no fim); confere quem levou contra `Clientes Transitions` e quem nao levou contra `NAO levaram`, no completo. Se o total de lentes ou de clientes desviar muito do mes anterior (agosto/26: **2.349 lentes · 204 compraram · 222 nao levaram (5.683 lentes de potencial)**; julho/26: 2.251 · 205 · 248), leia a aba Resumo antes de concluir; mes parcial explica quase sempre.

**Remedir o mesmo mes muda um pouco os numeros** — agosto/26 deu 2.351/5.703 em 08/09, 2.349/5.679 em 14/09 e 2.349/5.683 em 21/09: NF e cadastro continuam sendo mexidos no ERP depois do fechamento. Entregue o numero da leitura do dia, com a data, e registre a deriva no decision log em vez de procurar culpado.

## 4. Entregue

1. Copie os dois para `$env:USERPROFILE\Downloads\` e mande com `SendUserFile` (o compacto primeiro).
2. Na resposta: tabela mes x mes anterior (lentes Transitions, compraram, nao levaram, potencial, share top 10) + top 3 compradores + top 3 sem Transitions. Nada de descrever a planilha.
3. `git add` dos dois xlsx + 1 linha em `docs/volpe/decisoes-seladas.md` (data · "Transitions <mes>" · numeros medidos · fechado ou parcial · "confere.py FECHA") → `commit` → `push`.

## 5. Nao faca

- Nao gere o compacto "a mao" a partir do completo. O script ja faz os dois.
- Nao rode para varios meses de uma vez sem pedido: cada rodada bate no ERP.
- Nao filtre por carteira do Fabricio: o arquivo dele e a base inteira (assim foi em julho e agosto de 2026).
- Nao mande o completo (com fone/e-mail) para fora do CEO/Mari.

## Liga com
`scripts/relatorio-transitions-mes.ps1` (oraculo, no AI-Vixlens) · `docs/volpe/definicao-cliente.md` · `docs/volpe/decisoes-seladas.md` (linhas 2026-08-11, 2026-09-08, 2026-09-14 `-ComValor` e 2026-09-21 ordem das abas) · `docs/volpe/modus-operandi.md`
