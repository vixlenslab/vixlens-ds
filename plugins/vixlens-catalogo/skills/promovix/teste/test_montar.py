"""Testes do montar.py da Promovix.

Cada teste monta um Excel mínimo na hora, roda o montar.py como o comercial rodaria
(`python montar.py arquivo.xlsx --saida pasta`) e confere o código de saída e as
mensagens. A regra: ERRO bloqueia (código 1), AVISO só informa (código 0).

Rodar:  python -m pytest plugins/vixlens-catalogo/skills/promovix/teste -q
"""
import json
import subprocess
import sys
from pathlib import Path

import pytest
from openpyxl import Workbook

SKILL = Path(__file__).resolve().parent.parent
MONTAR = SKILL / "montar.py"

CONFIG_BASE = {
    "mes": "OUTUBRO", "ano": "26", "validade": "06/10 a 30/11",
    "acrescimo_guard": 50, "acrescimo_blue": 70,
}


def excel(tmp_path, *, config=None, familias=None, produtos=None, paginas=None, combos=None):
    """Monta um Excel mínimo no formato antigo (nomes internos de coluna, que o montar.py aceita)."""
    cfg = {**CONFIG_BASE, **(config or {})}
    familias = familias if familias is not None else [
        dict(familia="FAM", cor="#F7B200", colunas_preco="Sem A.R.;Reflecta Guard;Reflecta Blue", regra_50="S")]
    produtos = produtos if produtos is not None else [
        dict(familia="FAM", cod="1001", indice="1.50", produto="Resina", esf_max=4, esf_min=-4, preco_1=100)]
    paginas = paginas if paginas is not None else [(1, "CAPA"), (1, "FAM")]

    wb = Workbook()
    wb.remove(wb.active)

    def aba(nome, colunas, linhas):
        ws = wb.create_sheet(nome)
        ws.append(colunas)
        for linha in linhas:
            ws.append([linha.get(c) for c in colunas])

    aba("Config", ["chave", "valor"], [dict(chave=k, valor=v) for k, v in cfg.items()])
    aba("Familias", ["familia", "cor", "colunas_preco", "regra_50"], familias)
    aba("Produtos", ["familia", "cod", "indice", "produto", "esf_max", "esf_min",
                     "preco_1", "preco_2", "preco_3", "cores"], produtos)
    aba("Paginas", ["pagina", "bloco"], [dict(pagina=p, bloco=b) for p, b in paginas])
    if combos is not None:
        aba("Combos", ["Código", "Marca", "Produto", "Montado"], combos)

    caminho = tmp_path / "promo.xlsx"
    wb.save(caminho)
    return caminho


def rodar(caminho, tmp_path):
    saida = tmp_path / "saida"
    r = subprocess.run([sys.executable, str(MONTAR), str(caminho), "--saida", str(saida)],
                       capture_output=True, text=True, encoding="utf-8")
    return r, saida


# --- os modelos que o comercial recebe têm de passar ---------------------------------

@pytest.mark.parametrize("modelo", ["Promovix_modelo.xlsx", "Promovix_modelo_com_combo.xlsx"])
def test_modelos_oficiais_passam_sem_erro(modelo, tmp_path):
    r, saida = rodar(SKILL / "modelo" / modelo, tmp_path)
    assert r.returncode == 0, r.stdout
    assert "ERRO" not in r.stdout
    resumo = json.loads((saida / "resumo.json").read_text(encoding="utf-8"))
    assert resumo["produtos"] > 0 and resumo["paginas"] > 0
    assert list(saida.glob("lote_*.js")), "nenhum lote gerado"


# --- regra dos 50% -------------------------------------------------------------------

def test_regra_50_calcula_guard_e_blue_quando_vazios(tmp_path):
    r, saida = rodar(excel(tmp_path), tmp_path)
    assert r.returncode == 0, r.stdout
    lote = (saida / "lote_01.js").read_text(encoding="utf-8")
    # 100 (Sem A.R.) + 50 (Guard) = 150 ; 100 + 70 (Blue) = 170
    assert '"100,00","150,00","170,00"' in lote


def test_regra_50_acusa_preco_fora_da_regra(tmp_path):
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina",
                     esf_max=4, esf_min=-4, preco_1=100, preco_2=149, preco_3=170)]
    r, _ = rodar(excel(tmp_path, produtos=produtos), tmp_path)
    assert r.returncode == 1
    assert "a regra 50% dá 150,00" in r.stdout


def test_regra_50_sem_preco_base_e_sem_os_outros_bloqueia(tmp_path):
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina", esf_max=4, esf_min=-4)]
    r, _ = rodar(excel(tmp_path, produtos=produtos), tmp_path)
    assert r.returncode == 1


# --- conferências de dados ------------------------------------------------------------

def test_cores_transitions_fora_de_ordem_bloqueia(tmp_path):
    # Ordem fixa da Gen S: Cinza antes de Marrom.
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina Transitions Gen S",
                     esf_max=4, esf_min=-4, preco_1=100, preco_2=150, preco_3=170,
                     cores="9001 Marrom; 9002 Cinza")]
    r, _ = rodar(excel(tmp_path, produtos=produtos), tmp_path)
    assert r.returncode == 1
    assert "cores fora da ordem fixa" in r.stdout


def test_cores_na_ordem_certa_passam(tmp_path):
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina Transitions Gen S",
                     esf_max=4, esf_min=-4, preco_1=100, preco_2=150, preco_3=170,
                     cores="9001 Cinza; 9002 Marrom")]
    r, _ = rodar(excel(tmp_path, produtos=produtos), tmp_path)
    assert r.returncode == 0, r.stdout


def test_familia_com_produtos_fora_das_paginas_bloqueia(tmp_path):
    r, _ = rodar(excel(tmp_path, paginas=[(1, "CAPA")]), tmp_path)
    assert r.returncode == 1
    assert 'Família "FAM" tem produtos mas não está em nenhuma página' in r.stdout


def test_indice_de_refracao_invalido_bloqueia(tmp_path):
    produtos = [dict(familia="FAM", cod="1001", indice="1.5", produto="Resina",
                     esf_max=4, esf_min=-4, preco_1=100, preco_2=150, preco_3=170)]
    r, _ = rodar(excel(tmp_path, produtos=produtos), tmp_path)
    assert r.returncode == 1
    assert "índice" in r.stdout


def test_mes_vazio_bloqueia(tmp_path):
    r, _ = rodar(excel(tmp_path, config={"mes": ""}), tmp_path)
    assert r.returncode == 1
    assert 'Config: "mes" vazio' in r.stdout


def test_cor_de_familia_que_nao_e_hex_bloqueia(tmp_path):
    familias = [dict(familia="FAM", cor="amarelo", colunas_preco="Preço", regra_50="N")]
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina",
                     esf_max=4, esf_min=-4, preco_1=100)]
    r, _ = rodar(excel(tmp_path, familias=familias, produtos=produtos), tmp_path)
    assert r.returncode == 1
    assert "não é hex" in r.stdout


# --- aviso não bloqueia ---------------------------------------------------------------

def test_precos_fora_de_ordem_so_avisa(tmp_path):
    familias = [dict(familia="FAM", cor="#F7B200", colunas_preco="Sem A.R.;Reflecta Express", regra_50="N")]
    produtos = [dict(familia="FAM", cod="1001", indice="1.50", produto="Resina",
                     esf_max=4, esf_min=-4, preco_1=100, preco_2=90)]
    r, _ = rodar(excel(tmp_path, familias=familias, produtos=produtos), tmp_path)
    assert r.returncode == 0, r.stdout
    assert "fora de ordem crescente" in r.stdout


# --- combo ----------------------------------------------------------------------------

def combo_config(**extra):
    return {"combo_ativo": "S", "combo_painel": "NENHUM", **extra}


def test_combo_abaixo_do_preco_da_lente_so_avisa(tmp_path):
    # Montado (90) menor que o preço da lente na tabela (100): a montagem entra no combo, então confere.
    xl = excel(tmp_path, config=combo_config(),
               paginas=[(1, "CAPA"), (1, "COMBO"), (2, "FAM")],
               combos=[dict(**{"Código": "1001", "Marca": "Kodak", "Produto": "Resina", "Montado": 90})])
    r, _ = rodar(xl, tmp_path)
    assert r.returncode == 0, r.stdout
    assert "abaixo do preço da lente" in r.stdout


def test_combo_com_marca_desconhecida_bloqueia(tmp_path):
    xl = excel(tmp_path, config=combo_config(),
               paginas=[(1, "CAPA"), (1, "COMBO"), (2, "FAM")],
               combos=[dict(**{"Código": "1001", "Marca": "Zeiss", "Produto": "Resina", "Montado": 120})])
    r, _ = rodar(xl, tmp_path)
    assert r.returncode == 1
    assert "marca" in r.stdout


def test_combo_ativo_sem_bloco_combo_nas_paginas_bloqueia(tmp_path):
    xl = excel(tmp_path, config=combo_config(),
               combos=[dict(**{"Código": "1001", "Marca": "Kodak", "Produto": "Resina", "Montado": 120})])
    r, _ = rodar(xl, tmp_path)
    assert r.returncode == 1
    assert "o bloco COMBO não está em nenhuma página" in r.stdout
