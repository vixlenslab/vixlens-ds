---
name: marca-propria
description: Use when someone asks to create, update or reissue a Vixlens marca própria (private label) for an ótica — "marca própria da ótica X", "cliente novo de MP", "manual de marca", "tabela MP", "importação ERP de marca própria", "briefing", "Matriz Marca Própria", "reemitir manual" — or when about to reach for manual-cliente or design-system to build a private-label manual or price table.
---

# Marca Própria Vixlens

## Overview

Marca própria tem projeto próprio, com gerador validado, no **Drive compartilhado**. Esta skill só leva até ele. **As regras moram no `CLAUDE.md` da pasta do Drive e prevalecem sobre esta skill.** Nada aqui repete regra: se algo aqui contradisser o `CLAUDE.md` do Drive, vale o Drive.

## Passo 1 · Achar a pasta do Drive

A letra muda por máquina. Procure em todas:

```powershell
Get-PSDrive -PSProvider FileSystem | ForEach-Object { Join-Path $_.Root 'Drives compartilhados\Vixlens - CRO\Comercial\Marca própria' } | Where-Object { Test-Path -LiteralPath $_ }
```

Não achou: **pare**. Peça ao usuário para abrir o Google Drive para Desktop, entrar com o e-mail da Vixlens e marcar `Marca própria` como disponível off-line. Não monte tabela, manual ou importação na mão.

Achou, mas a sessão não enxerga a pasta: peça acesso a ela (e à pasta local).

## Passo 2 · Ler antes de tudo

1. `CLAUDE.md` da pasta do Drive, inteiro
2. `DECISOES.md` (seção **Em andamento**: se alguém está no mesmo cliente, pare e avise)
3. `_geradores/LEIA-ME.md`
4. `Clientes/_NOTAS_POR_CLIENTE.md`, na seção do cliente, se ele já existir

Depois siga a rotina da seção 2 do `CLAUDE.md` (puxar → trabalhar na pasta local → publicar só com 7/7 travas).

## Pegadinhas de máquina (Windows)

| Sintoma | Causa | Faça |
|---|---|---|
| `python3` abre a Microsoft Store (o `CLAUDE.md` e o `LEIA-ME` escrevem `python3`) | Alias do Windows | Rode `python` |
| Trava 7 falha: "pdfplumber não instalado" | Dependência faltando | `python -m pip install openpyxl reportlab pdfplumber` |
| Acento quebrado na saída | Console Windows | `PYTHONIOENCODING=utf-8` |
| Ler `.xls` antigo de `_fontes/` | Precisa de `xlrd` | `python -m pip install xlrd` |
| O `CLAUDE.md` diz que o shell não abre o Drive | Depende do ambiente | Se o shell enxerga a letra do Drive, copie direto; se não, arquivo por arquivo |

Pasta local: a que o `CLAUDE.md` indica. Se ela não existir nesta máquina, pergunte ao usuário qual usar (padrão do `CLAUDE.md`, ou `C:\Vixlens\Marca própria` quando o Documentos está no OneDrive).

## O que vem de fora

- **Do ERP (Volpe):** só o código do cliente e o nome fantasia. Sem acesso ao Volpe, peça ao usuário.
- **Do cliente:** marca, desconto, famílias, nomes comerciais e marcações. Formulário do cliente vale como fonte. Sem nomes por família, proponha pelo `briefings/_MODELO.json` (`<MARCA> START / ONE / …`) e confirme antes de gerar.
- Mostre os entregáveis ao usuário antes de publicar no Drive.

## Não faça

- Não use `manual-cliente` nem `vixlens-design-system` para gerar manual ou tabela de marca própria: saem fora do gerador e sem as travas.
- Não escreva script novo nem edite `.py` por cliente.
