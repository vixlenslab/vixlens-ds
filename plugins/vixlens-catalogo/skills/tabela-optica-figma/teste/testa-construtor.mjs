// Roda o construtor da skill nos dois modos e confere a estrutura gerada.
// Não valida pixel — valida lógica: que separador sai, quantos, e se o modo
// agrupado não quebrou o modo de família única.

import fs from 'node:fs';
import { montarFigma } from './stub-figma.mjs';

const CAMINHO = new URL('../construtor.js', import.meta.url);
const fonte = fs.readFileSync(CAMINHO, 'utf8');

const PROD = `0733~1.49~Resina~75~+6~-8~R$ 540,60~R$ 710,60~R$ 829,60~R$ 1.217,20
0734~1.56~Resina UV+~75~+6~-8~R$ 642,60~R$ 812,60~R$ 931,60~R$ 1.319,20
0745~1.59~Poli~75~+6~-8~R$ 880,60~R$ 1.050,60~R$ 1.169,60~R$ 1.557,20
~1.59~Poli Transitions Gen S~75~+7~-8~R$ 948,60~~R$ 1.237,60~R$ 1.625,20
SUB~0901 Cinza | 0902 Marrom | 0903 Verde
0746~1.67~Resina~75~+6~-8~R$ 1.186,60~~R$ 1.475,60~R$ 1.863,20
0736~1.67~Resina UV+~75~+7.5~-9.5~R$ 1.254,60~~R$ 1.543,60~R$ 1.931,20`;

function preparar(cfgExtra, blocosLiteral, dados) {
  let src = fonte;
  const cfg = `const CONFIG = ${JSON.stringify({
    pagina: 'P', familia: 'FAMILIA TESTE', titulo: null,
    tag: 'MULTIFOCAL FREEFORM PREMIUM', graficoPadrao: 'advanced',
    tipo: 'LENTES', cor: '#0E8A5F', altura: '16 mm', cilindro: '-6.00',
    adicao: '0.75 a 3.50', selo: 'OTICA', antirreflexo: 'Lumina',
    semExpress: false, semSeparadorIndice: false,
    alturaImagem: 120, simbolos: true, centavos: false, ...cfgExtra
  })};`;
  src = src.replace(/const CONFIG = \{[\s\S]*?\n\};/, cfg);
  src = src.replace(/const DADOS = `[\s\S]*?`;/, 'const DADOS = ' + JSON.stringify(dados ?? PROD) + ';');
  src = src.replace('const BLOCOS = null;', blocosLiteral || 'const BLOCOS = null;');
  return src;
}

async function rodar(nome, src, opcoes) {
  const figma = montarFigma(['P'], opcoes);
  const fn = new Function('figma', `return (async () => {${src}})();`);
  let r;
  try { r = await fn(figma); }
  catch (e) { return { nome, erro: e.message }; }
  const page = figma.currentPage.children[0];
  const tbl = page.children.find(c => c.name.startsWith('Tabela '));
  const hdr = page.children.find(c => c.name === 'Header');
  const banner = page.children.find(c => c.name.startsWith('IMG // '));
  const cont = banner && banner.children.find(c => c.name === 'Conteúdo');
  const ach = (n, f, acc = []) => { if (f(n)) acc.push(n); for (const c of n.children || []) ach(c, f, acc); return acc; };
  const logos = banner ? ach(banner, n => /^(logo_|Camada_1)/.test(n.name) && n.parent && n.parent.name === 'Tratamentos') : [];
  const seps = tbl.children.filter(c => c.name.startsWith('sep '));
  return {
    nome,
    produtos: r.produtos,
    cabecalho: hdr.children.map(c => c.name),
    tituloFilhos: hdr.children[0].children.map(c => c.name),
    pilulasDados: ach(hdr, n => n.name === 'pilula').length,
    gruposBanner: cont ? cont.children.map(c => c.name) : [],
    linhasGrafico: banner ? ach(banner, n => n.name === 'Barra').length : 0,
    divisoriasPorBarra: banner && ach(banner, n => n.name === 'Barra')[0] ? ach(banner, n => n.name === 'Barra')[0].children.filter(c => c.name === 'Divisória').length : 0,
    logos: logos.map(l => l.name + ':' + Math.round(l.width * 10) / 10),
    linhasGenS: r.linhasGenS,
    pilulasGenS: ach(tbl, n => n.name === 'pilula Gen S').length,
    faixasGenS: ach(tbl, n => n.name === 'faixa Gen S').length,
    nomeNaLinhaGenS: ach(tbl, n => n.name === 'produto').map(p => p.children[0].characters).filter(x => /^(Resina|Poli)$/.test(x)).length,
    indicesDisponiveis: r.indicesDisponiveis,
    avisosBanner: r.avisosBanner,
    linhasDeCor: r.linhasDeCor,
    separadores: r.separadores,
    tiposDeSeparador: seps.map(s => s.name.replace('sep ', '')),
    linhasNaTabela: tbl.children.filter(c => c.name === 'row').length,
    chipsComCor: (function conta(n, acc = []) {
      if (n.name && n.name.startsWith('ind ') && n.name !== 'ind vazio') acc.push(n.strokes?.[0]?.color);
      for (const c of n.children || []) conta(c, acc);
      return acc;
    })(tbl).length
  };
}

const casos = [];

// 1. Família única: o comportamento de sempre.
casos.push(['familia unica', preparar({}, null)]);

// 2. Família única sem separador de índice.
casos.push(['sem separador de indice', preparar({ semSeparadorIndice: true }, null)]);

// 3. Página agrupada com três blocos.
const tresBlocos = `const BLOCOS = [
  { nome: 'FAM A', cor: '#0E8A5F', dados: ${JSON.stringify(PROD)} },
  { nome: 'FAM B', cor: '#3FA96E', dados: ${JSON.stringify(PROD)} },
  { nome: 'FAM C', cor: '#78B472', pilulas: ['Cil. ate -4.00'], dados: ${JSON.stringify(PROD)} }
];`;
casos.push(['agrupada 3 blocos', preparar({}, tresBlocos)]);

// 4. Agrupada com um bloco só: tem de se comportar como família única.
const umBloco = `const BLOCOS = [
  { nome: 'FAM A', cor: '#0E8A5F', dados: ${JSON.stringify(PROD)} }
];`;
casos.push(['agrupada com 1 bloco', preparar({}, umBloco)]);

// 5. Sem os logos mestres: banner sai sem logos e o retorno AVISA.
casos.push(['sem logos mestres', preparar({}, null), { logos: false }]);

// 6. Família sem gráfico (Astera/Bifocais) e linha Vixlens.
casos.push(['sem grafico, linha vixlens', preparar({ graficoPadrao: null, selo: 'LINHA VIXLENS', tag: 'VISÃO SIMPLES ESPECIAL' }, null)]);

// 7. Sem banner (alturaImagem 0).
casos.push(['sem banner', preparar({ alturaImagem: 0 }, null)]);

let falhas = 0;
const exige = (cond, msg) => { if (!cond) { falhas++; console.log('FALHOU: ' + msg); } };
const res = {};

// Esperado conferido à mão contra os dados de PROD acima: 6 produtos (0733, 0734, 0745, o Poli
// Transitions sem código, 0746, 0736), 1 linha de cores (a SUB), 4 índices (1.49, 1.56, 1.59, 1.67).
// Linhas na tabela = produtos + linhas de cor. Página agrupada = um separador por bloco, 3 x 6 produtos.
// Os números são a estrutura que o construtor tem de gerar; pixel só o Figma confirma.
const ESPERADO = {
  'familia unica': { produtos: 6, linhasDeCor: 1, separadores: 4, tiposDeSeparador: ['1.49', '1.56', '1.59', '1.67'], linhasNaTabela: 7, chipsComCor: 6 },
  'sem separador de indice': { produtos: 6, linhasDeCor: 1, separadores: 0, tiposDeSeparador: [], linhasNaTabela: 7, chipsComCor: 6 },
  'agrupada 3 blocos': { produtos: 18, linhasDeCor: 3, separadores: 3, tiposDeSeparador: ['FAM A', 'FAM B', 'FAM C'], linhasNaTabela: 19, chipsComCor: 18 },
  'agrupada com 1 bloco': { produtos: 6, linhasDeCor: 1, separadores: 4, tiposDeSeparador: ['1.49', '1.56', '1.59', '1.67'], linhasNaTabela: 7, chipsComCor: 6 },
};

for (const [nome, src, opcoes] of casos) {
  const r = await rodar(nome, src, opcoes);
  res[nome] = r;
  console.log(JSON.stringify(r));
  if (r.erro) { falhas++; console.log('FALHOU: ' + nome + ' lançou ' + r.erro); continue; }
  // Estrutura das tabelas (contagens) contra o esperado conferido à mão.
  const esperado = ESPERADO[nome];
  if (esperado) {
    for (const k of Object.keys(esperado)) {
      exige(JSON.stringify(r[k]) === JSON.stringify(esperado[k]), nome + ': ' + k + ' esperado ' + JSON.stringify(esperado[k]) + ' obtido ' + JSON.stringify(r[k]));
    }
  }
  // padrão 0.14: cabeçalho de 3 linhas, chip do tipo, Gen S
  exige(r.cabecalho.length === 3 && r.cabecalho[0] === 'titulo' && r.cabecalho[1] === 'dados', nome + ': cabecalho de 3 linhas');
  exige(r.tituloFilhos.length === 2 && r.tituloFilhos[1] === 'Tag', nome + ': titulo + chip Tag na linha 1');
  exige(r.pilulasDados === 3, nome + ': 3 pilulas de dados (Alt, Cil, Add)');
  exige(r.linhasGenS >= 1 && r.linhasGenS === r.pilulasGenS && r.linhasGenS === r.faixasGenS, nome + ': cada linha Gen S = 1 pilula + 1 faixa');
  exige(r.nomeNaLinhaGenS >= 1, nome + ': texto da linha Gen S perdeu o sufixo');
  exige(nome.startsWith('agrupada') || r.indicesDisponiveis.join(',') === '1.49,1.56,1.59,1.67', nome + ': indices do CSV');
}
exige(res['familia unica'].gruposBanner.join('|') === 'Distribuição da visão|Tratamentos (grupo)', 'banner: grupos de gráfico e tratamentos');
exige(res['familia unica'].linhasGrafico === 3 && res['familia unica'].divisoriasPorBarra === 5, 'grafico advanced: 3 linhas, 5 divisorias');
exige(res['familia unica'].logos.length === 6 && res['familia unica'].logos.every(l => /:(23\.1|17\.2|50\.8|23\.9|27\.6|36\.8)$/.test(l)), 'logos no tamanho unico depois do rescale: ' + res['familia unica'].logos.join(' '));
exige(res['sem logos mestres'].avisosBanner.length > 0 && res['sem logos mestres'].logos.length === 0, 'sem mestre: avisa e nao inventa logos');
exige(res['sem grafico, linha vixlens'].gruposBanner.join('|') === 'Tratamentos (grupo)', 'sem grafico: so tratamentos');
exige(res['sem banner'].gruposBanner.length === 0, 'sem banner: nenhum grupo');
console.log(falhas ? 'FALHAS: ' + falhas : 'TUDO OK');
process.exitCode = falhas ? 1 : 0;
