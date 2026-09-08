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
| `Transitions-<Mes>-<Ano> - FABRICIO.xlsx` | **Fabricio** (consultor). E o que ele recebe. | 3 abas: `NÃO compraram` · `compraram` · `total geral`. Colunas item, Cod, Cliente, Cidade, UF, Lentes Transitions, Lentes totais, `% Transitions`. **Sem** vendedor, fone, e-mail, R$. |
| `Transitions-<Mes>-<Ano>.xlsx` | interno (CEO/Mari) | 5 abas: Resumo, Clientes, Modelos, Cliente x modelo, NAO levaram (com vendedor/fone/e-mail). |

Regras embutidas no script (nao reescreva): so PJ · rede agrupada pela matriz (`docs/volpe/definicao-cliente.md`) · `DS_MODELO LIKE '%TRANSITIONS%'` · fotossensivel proprio (OptFacil GO Foto, LP Foto AR, Biovis) **fora** · unidade = lente unitaria, par = 2 · quantidade, nunca valor (CEO 10/08/2026).

**Se falhar:**
- `Login failed for user 'Read_Only'` (18456) → o cofre `~/.volpe/ro.cred` desta maquina esta velho. **Nao digite senha, nao tente outra.** Peca a quem pediu regravar no PowerShell dele: `Read-Host "Senha do Read_Only" -AsSecureString | ConvertFrom-SecureString | Set-Content "$env:USERPROFILE\.volpe\ro.cred"`. Doppler **nao** esta instalado nas maquinas da casa. Se a senha vigente tambem falhar, e rotacao/bloqueio na PWI (chamado).
- timeout / nao conecta → IP fora da allowlist da PWI. Rede, nao senha.
- erro de query → mostre o erro. Nao invente numero.

## 3. Confira antes de entregar

```powershell
python "<pasta desta skill>\confere.py" 2026-08
```

Roda de dentro de `C:\Vixlens\AI-Vixlens`. Checa que o compacto fecha com o completo (contagem, soma, ordem, ninguem nos dois lados, `%` certo, Cliente x modelo = total) e imprime os numeros do mes contra o anterior. **`NAO FECHA` = nao entrega.** Se o total de lentes ou de clientes desviar muito do mes anterior (agosto/26: 2.351 lentes · 204 compraram · 222 nao levaram), leia a aba Resumo antes de concluir; mes parcial explica quase sempre.

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
`scripts/relatorio-transitions-mes.ps1` (oraculo, no AI-Vixlens) · `docs/volpe/definicao-cliente.md` · `docs/volpe/decisoes-seladas.md` (linhas 2026-08-11 e 2026-09-08 sobre Transitions) · `docs/volpe/modus-operandi.md`
