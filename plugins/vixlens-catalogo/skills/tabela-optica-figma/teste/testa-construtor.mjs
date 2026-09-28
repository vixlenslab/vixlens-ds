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

async function rodar(nome, src) {
  const figma = montarFigma(['P']);
  const fn = new Function('figma', `return (async () => {${src}})();`);
  let r;
  try { r = await fn(figma); }
  catch (e) { return { nome, erro: e.message }; }
  const page = figma.currentPage.children[0];
  const tbl = page.children.find(c => c.name.startsWith('Tabela '));
  const seps = tbl.children.filter(c => c.name.startsWith('sep '));
  return {
    nome,
    produtos: r.produtos,
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

for (const [nome, src] of casos) {
  const r = await rodar(nome, src);
  console.log(JSON.stringify(r));
}
