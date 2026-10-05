// Garante que o que a tabela-optica-figma e a promovix copiam uma da outra continua igual.
//
// Os dois construtor.js repetem a mesma matemática de cor (contraste WCAG) e a mesma tabela CORES das
// bolinhas. Duas cópias se afastam sem ninguém ver: a correção entra numa e não na outra. Este teste
// falha quando isso acontece, sem exigir que os arquivos virem um só (o que não dá para validar sem o Figma).
//
// DIVERGENCIAS_CONHECIDAS lista o que já era diferente quando o teste nasceu (05/10/2026). Quem decidir
// qual valor vale tira a entrada da lista e iguala os dois arquivos; o teste avisa se a lista ficar velha.

import fs from 'node:fs';

const TABELA = new URL('../skills/tabela-optica-figma/construtor.js', import.meta.url);
const PROMOVIX = new URL('../skills/promovix/construtor.js', import.meta.url);
const fonteA = fs.readFileSync(TABELA, 'utf8');
const fonteB = fs.readFileSync(PROMOVIX, 'utf8');

// [valor na tabela-optica-figma, valor na promovix]
const DIVERGENCIAS_CONHECIDAS = {
  Cinza: ['#545454', '#6C6C6C'],
  Esmeralda: ['#0C5335', '#106943'],
};

const HELPERS = ['canais', 'rgb', 'lin', 'lumRel', 'razao', 'contraste', 'fill'];

const semRuido = (t) => t.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, '');

// Pega "const nome = ...;" inteira, respeitando parênteses, chaves e colchetes.
function extrair(fonte, nome) {
  const ini = fonte.search(new RegExp(`^const ${nome}\\s*=`, 'm'));
  if (ini < 0) return null;
  let prof = 0;
  for (let i = ini; i < fonte.length; i++) {
    const c = fonte[i];
    if ('({['.includes(c)) prof++;
    else if (')}]'.includes(c)) prof--;
    else if (c === ';' && prof === 0) return fonte.slice(ini, i + 1);
  }
  return null;
}

function tabelaCores(fonte) {
  const bloco = extrair(fonte, 'CORES');
  const mapa = {};
  for (const m of bloco.matchAll(/'([^']+)'\s*:\s*\[\s*'(#[0-9A-Fa-f]{6})'\s*,\s*'([^']+)'\s*\]/g)) {
    mapa[m[1]] = [m[2].toUpperCase(), m[3]];
  }
  return mapa;
}

const falhas = [];
const ok = (msg) => console.log(`ok     ${msg}`);

for (const nome of HELPERS) {
  const a = extrair(fonteA, nome), b = extrair(fonteB, nome);
  if (!a || !b) { falhas.push(`${nome}: não achei nos dois arquivos (tabela: ${!!a}, promovix: ${!!b})`); continue; }
  if (semRuido(a) === semRuido(b)) ok(`${nome} igual nos dois`);
  else falhas.push(`${nome}: a lógica ficou diferente entre tabela-optica-figma e promovix`);
}

const ca = tabelaCores(fonteA), cb = tabelaCores(fonteB);
const nomes = new Set([...Object.keys(ca), ...Object.keys(cb)]);
const achadas = {};
for (const n of nomes) {
  if (!ca[n]) { falhas.push(`CORES: "${n}" só existe na promovix`); continue; }
  if (!cb[n]) { falhas.push(`CORES: "${n}" só existe na tabela-optica-figma`); continue; }
  if (ca[n][1] !== cb[n][1]) falhas.push(`CORES: sigla de "${n}" diferente (${ca[n][1]} x ${cb[n][1]})`);
  if (ca[n][0] !== cb[n][0]) achadas[n] = [ca[n][0], cb[n][0]];
}
for (const [n, par] of Object.entries(achadas)) {
  const conhecida = DIVERGENCIAS_CONHECIDAS[n];
  if (!conhecida) falhas.push(`CORES: "${n}" agora diverge (${par[0]} x ${par[1]}) e não está na lista de conhecidas`);
  else if (conhecida[0] !== par[0] || conhecida[1] !== par[1]) falhas.push(`CORES: "${n}" mudou (${par[0]} x ${par[1]}); a lista de conhecidas diz ${conhecida[0]} x ${conhecida[1]}`);
}
for (const n of Object.keys(DIVERGENCIAS_CONHECIDAS)) {
  if (!achadas[n]) falhas.push(`CORES: "${n}" não diverge mais. Tire de DIVERGENCIAS_CONHECIDAS.`);
}
if (!falhas.some((f) => f.startsWith('CORES'))) {
  ok(`CORES: ${nomes.size} cores, só as ${Object.keys(DIVERGENCIAS_CONHECIDAS).length} divergências conhecidas (${Object.keys(DIVERGENCIAS_CONHECIDAS).join(', ')})`);
}

if (falhas.length) {
  console.error('\n' + falhas.map((f) => `FALHOU ${f}`).join('\n'));
  process.exit(1);
}
console.log('\nok: os dois construtores seguem em paridade');
