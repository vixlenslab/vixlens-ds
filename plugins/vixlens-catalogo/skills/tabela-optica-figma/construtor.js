// Construtor de página de família — cole em use_figma.
// Ajuste CONFIG e DADOS. O resto é fixo.
//
// DADOS: uma linha por registro, campos separados por ~
//   produto: cod~indice~nome~diam~esfMais~esfMenos~p1~p2~p3~p4[~altura]
//   cores:   SUB~codigo Cor | codigo Cor | ...
//
// O 11o campo, altura, é obrigatório quando CONFIG.altura === 'varia' e
// ignorado nos outros casos. Ver "Altura" em referencia-tabela.md.
// Campo de preço vazio vira travessão. Cod vazio vira seta quando houver linha
// de cores logo abaixo.

const CONFIG = {
  pagina: '06 OPTIMA PRO (1/2)',
  familia: 'OPTIMA PRO',
  titulo: null,             // título exibido; null usa familia. Use na continuação
  tipo: 'LENTES MULTIFOCAIS SURFAÇADAS',
  cor: '#D94F2B',
  altura: '16 mm',          // 'NN mm' | 'varia' | null
  cilindro: '-6.00',        // vira pílula no cabeçalho
  adicao: '0.50 a 5.00',    // vira pílula; null em visão simples
  selo: 'ÓTICAS NATIVE',    // quem assina a lente; 'LINHA VIXLENS' quando não é marca própria
  antirreflexo: 'Reflecta', // marca do AR nas colunas de preço
  semExpress: false,        // true quando a família inteira não tem o AR de entrada
  alturaImagem: 120,        // ponto de partida; o slot cresce até preencher a página
  simbolos: true,           // padrao da casa; false volta para "Diâm." e "Alt."
  centavos: false           // preços sem casas decimais
};

const DADOS = `15075~1.49~Resina~80~+6~-10~R$ 2.098,54~R$ 2.356,79~R$ 2.844,88~R$ 3.845,86
SUB~15110 Marrom | 15111 G15 | 15112 Black`;

// ---------------------------------------------------------------- utilidades

const LS = String.fromCharCode(8232);
const TINTA = '#2F2F2F';            // preto de texto; #000000 fica só no separador
const NEUTRO = '#E4E4E4';
const TETO_IMAGEM = 340, PISO_IMAGEM = 56, LIMITE = 796;

const canais = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const rgb = h => { const c = canais(h); return { r: c[0] / 255, g: c[1] / 255, b: c[2] / 255 }; };
const fill = h => [{ type: 'SOLID', color: rgb(h) }];

// Contraste WCAG de verdade. A luminância perceptual (0.299/0.587/0.114) que
// esta skill usava antes errava em 6 das 12 famílias — OPTIMA MAX ficava em
// 2.72:1, abaixo até do piso de 3:1 de texto grande.
const lin = c => { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lumRel = h => { const c = canais(h); return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]); };
const razao = (a, b) => {
  const la = lumRel(a), lb = lumRel(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
const contraste = bg => (razao('#FFFFFF', bg) >= razao('#000000', bg) ? '#FFFFFF' : '#000000');
// 20% da cor sobre branco. O chip de índice tem 6.5pt, e os 4.5:1 do WCAG foram
// calibrados para 14pt: com preenchimento na cor cheia, seis das doze famílias
// ficam entre 4.82:1 (OFFICE NEAR) e 6.78:1, e o número some no balcão.
// Tintado, as doze ficam entre 9.83:1 e 12.14:1.
const tinta20 = h => {
  const c = canais(h);
  const v = x => ('0' + Math.round(0.20 * x + 0.80 * 255).toString(16)).slice(-2);
  return ('#' + v(c[0]) + v(c[1]) + v(c[2])).toUpperCase();
};

// Zero não tem sinal: a Astera começa em 0.00 e "Esf. +0.00 a -10.00" está
// errado nas 19 linhas dela. Nas outras famílias o positivo é real e o sinal
// informa.
const dec = s => {
  const neg = s.indexOf('-') > -1 || s.indexOf('−') > -1;
  const n = parseFloat(s.replace('−', '').replace('-', '').replace('+', ''));
  if (n === 0) return '0.00';
  return (neg ? '-' : '+') + n.toFixed(2);
};
const preco = s => {
  if (!s || !s.length) return '';
  return CONFIG.centavos ? s : s.replace(/,\d{2}$/, '');
};

const CORES = {
  'Cinza': ['#545454', 'C'], 'Marrom': ['#69401C', 'M'], 'Verde': ['#3B5424', 'V'],
  'Ametista': ['#54317B', 'A'], 'Safira': ['#1C5A95', 'S'], 'Âmbar': ['#754D17', 'Â'],
  'Esmeralda': ['#0C5335', 'E'], 'Rubi': ['#711533', 'R'], 'G15': ['#3F4A3C', 'G'],
  'Black': ['#1A1A1A', 'B'],
  'Prata': ['#9EADB0', 'EP'], 'Dourado': ['#BDB024', 'ED'],
  'Azul': ['#0538D9', 'EA'], 'Rosa': ['#FFA1FF', 'ER']
};
const ESPELHADO = ['Prata', 'Dourado', 'Azul', 'Rosa'];

// Família sem o AR de entrada perde a coluna, e a largura vai para o nome do
// produto. Uma coluna inteira de travessão não informa nada e come o espaço em
// que os nomes longos truncam.
const SEM_EXPRESS = !!CONFIG.semExpress;
const AR = CONFIG.antirreflexo || 'Reflecta';

const W = [27, 26, SEM_EXPRESS ? 222 : 168, 70];
const PW = 46, GAP_PRECO = 8;
const TITULOS = SEM_EXPRESS
  ? [['Par', ''], [AR, 'Guard'], [AR, 'Blue Protect']]
  : [['Par', ''], [AR, 'Express'], [AR, 'Guard'], [AR, 'Blue Protect']];

// ---------------------------------------------------------------- construção

for (const s of ['Regular', 'Medium', 'Bold', 'ExtraBold']) {
  await figma.loadFontAsync({ family: 'Host Grotesk', style: s });
}

const page = figma.currentPage.children.find(n => n.type === 'FRAME' && n.name === CONFIG.pagina);
if (!page) throw new Error('pagina nao encontrada: ' + CONFIG.pagina);
for (const c of page.children.slice()) {
  if (c.type === 'FRAME' && (c.name === 'Header' || c.name.indexOf('Tabela ') === 0 || c.name.indexOf('IMG // ') === 0)) c.remove();
}

const SOBRE_COR = contraste(CONFIG.cor);
const FUNDO_CHIP = tinta20(CONFIG.cor);

const texto = (parent, chars, style, size, cor) => {
  const t = figma.createText();
  t.fontName = { family: 'Host Grotesk', style };
  t.fontSize = size; t.characters = chars; t.fills = fill(cor);
  parent.appendChild(t);
  return t;
};

const hdr = figma.createAutoLayout('VERTICAL', { name: 'Header' });
hdr.fills = fill(CONFIG.cor); hdr.cornerRadius = 20;
hdr.paddingTop = 12; hdr.paddingBottom = 12; hdr.paddingLeft = 16; hdr.paddingRight = 16; hdr.itemSpacing = 2;
page.appendChild(hdr);
hdr.x = 20; hdr.y = 44; hdr.resize(555, hdr.height); hdr.layoutSizingHorizontal = 'FIXED';

// A linha de título QUEBRA. Nome longo com três ou quatro pílulas não cabe nos
// 523px úteis do cabeçalho, e auto-layout que não quebra também não trunca:
// ele transborda calado, por cima da borda do bloco colorido. Com WRAP as
// pílulas excedentes descem, o cabeçalho cresce, e o slot de imagem reabsorve
// a altura no fim do script.
const linhaTitulo = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' });
linhaTitulo.itemSpacing = 10; linhaTitulo.counterAxisAlignItems = 'CENTER'; linhaTitulo.fills = [];
hdr.appendChild(linhaTitulo);
linhaTitulo.layoutSizingHorizontal = 'FILL';
linhaTitulo.layoutWrap = 'WRAP';
linhaTitulo.counterAxisSpacing = 6;
texto(linhaTitulo, CONFIG.titulo || CONFIG.familia, 'ExtraBold', 22, SOBRE_COR);

// As constantes da família viram pílulas: repetir cilindro e adição em toda
// linha gastava 23% da largura da tabela para dizer sempre a mesma coisa.
const pilula = rotulo => {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'pilula' });
  f.fills = fill('#000000'); f.cornerRadius = 100;
  f.paddingTop = 4; f.paddingBottom = 4; f.paddingLeft = 10; f.paddingRight = 10;
  linhaTitulo.appendChild(f);
  texto(f, rotulo, 'Bold', 9, '#FFFFFF');
};
if (CONFIG.altura) pilula(CONFIG.altura === 'varia' ? 'Alt. mín. varia por lente' : 'Alt. mín. ' + CONFIG.altura);
if (CONFIG.cilindro) pilula('Cil. até ' + CONFIG.cilindro);
if (CONFIG.adicao) pilula('Add. ' + CONFIG.adicao);
// A coluna sumiu: a pílula é o que impede o balconista de achar que o preço
// do AR de entrada foi esquecido.
if (SEM_EXPRESS) pilula('Sem ' + AR + ' Express');

texto(hdr, CONFIG.tipo + '  //  ' + (CONFIG.selo || 'LINHA VIXLENS'), 'Medium', 8, SOBRE_COR);

// O slot de imagem é elástico: nasce com alturaImagem e cresce no fim para
// consumir a sobra. Sem isso sobravam ~190px mortos no pé de cada página.
let img = null, legendaImg = null;
if (CONFIG.alturaImagem > 0) {
  img = figma.createFrame();
  img.name = 'IMG // ' + CONFIG.familia;
  img.resize(555, CONFIG.alturaImagem);
  img.fills = fill('#F0F0F0'); img.strokes = fill('#6C6C6C'); img.strokeWeight = 1;
  img.dashPattern = [4, 4]; img.cornerRadius = 12;
  page.appendChild(img); img.x = 20; img.y = hdr.y + hdr.height + 14;
  legendaImg = texto(img, '[ IMAGEM FAMÍLIA ]', 'Bold', 9, '#6C6C6C');
}

const tbl = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + CONFIG.familia });
tbl.fills = fill('#FFFFFF');
tbl.strokes = fill(NEUTRO); tbl.strokeWeight = 1;
tbl.cornerRadius = 20;
tbl.paddingTop = 8; tbl.paddingBottom = 6; tbl.paddingLeft = 10; tbl.paddingRight = 10; tbl.itemSpacing = 0;
page.appendChild(tbl);
tbl.x = 20;
tbl.y = img ? img.y + img.height + 14 : hdr.y + hdr.height + 16;
tbl.resize(555, tbl.height); tbl.layoutSizingHorizontal = 'FIXED';

const celula = (parent, chars, w, o) => {
  o = o || {};
  const t = figma.createText();
  t.fontName = { family: 'Host Grotesk', style: o.style || 'Regular' };
  t.fontSize = o.size || 8;
  t.characters = chars && chars.length ? chars : '—';
  t.fills = fill(o.cor || TINTA);
  t.letterSpacing = { unit: 'PERCENT', value: o.ls === undefined ? -4 : o.ls };
  parent.appendChild(t);
  t.textAutoResize = 'NONE'; t.textTruncation = 'ENDING';
  t.resize(w, o.h || 11);
  if (o.alinha) t.textAlignHorizontal = o.alinha;
  return t;
};

const linha = (bg, pad) => {
  const r = figma.createAutoLayout('HORIZONTAL', { name: 'row' });
  r.itemSpacing = 5; r.paddingTop = pad; r.paddingBottom = pad; r.paddingLeft = 8; r.paddingRight = 8;
  r.cornerRadius = 30; r.fills = fill(bg); r.counterAxisAlignItems = 'CENTER';
  tbl.appendChild(r); r.layoutSizingHorizontal = 'FILL';
  return r;
};

const grupoValores = parent => {
  const g = figma.createAutoLayout('HORIZONTAL', { name: 'valores' });
  g.itemSpacing = GAP_PRECO; g.fills = []; g.counterAxisAlignItems = 'CENTER';
  parent.appendChild(g);
  return g;
};

const bolinha = (parent, nome, codigo, grande) => {
  const par = CORES[nome] || ['#6C6C6C', nome.charAt(0).toUpperCase()];
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'cor ' + nome });
  chip.itemSpacing = grande ? 3 : 2; chip.counterAxisAlignItems = 'CENTER'; chip.fills = [];
  parent.appendChild(chip);
  const d = grande ? 14 : 10;
  const dot = figma.createFrame();
  dot.name = nome; dot.resize(d, d); dot.cornerRadius = 100;
  dot.fills = fill(par[0]); dot.strokes = [];
  chip.appendChild(dot);
  const sigla = figma.createText();
  sigla.fontName = { family: 'Host Grotesk', style: 'Bold' };
  sigla.fontSize = 5;
  sigla.characters = grande ? par[1] : par[1].charAt(0);
  sigla.fills = fill(contraste(par[0]));
  sigla.letterSpacing = { unit: 'PERCENT', value: -4 };
  dot.appendChild(sigla);
  sigla.x = (d - sigla.width) / 2; sigla.y = (d - sigla.height) / 2;
  texto(chip, codigo, 'Regular', grande ? 7.5 : 6, TINTA);
};

// Fundo tintado, contorno na cor cheia, número em TINTA. Mantém a identidade
// da família e resolve o contraste que o preenchimento sólido não alcança.
// Bifocais convencionais não têm índice de refração. Nesse caso entra um
// espaçador da mesma largura, e não um chip vazio: as colunas seguintes
// continuam alinhadas com as das outras páginas.
const chipIndice = (parent, ind) => {
  const c = figma.createFrame();
  c.name = ind ? 'ind ' + ind : 'ind vazio';
  c.resize(26, 13); c.cornerRadius = 4;
  parent.appendChild(c);
  if (!ind) { c.fills = []; c.strokes = []; return; }
  c.fills = fill(FUNDO_CHIP);
  c.strokes = fill(CONFIG.cor); c.strokeWeight = 1;
  const t = texto(c, ind, 'Bold', 6.5, TINTA);
  t.letterSpacing = { unit: 'PERCENT', value: -2 };
  t.x = (26 - t.width) / 2; t.y = (13 - t.height) / 2;
};

// Cabeçalho da tabela: branco com régua na cor. A barra preta sólida disputava
// atenção com o bloco colorido logo acima.
const cab = linha('#FFFFFF', 3);
['Cód', 'Índ.', 'Produto', 'Disponibilidade'].forEach((h, i) => {
  celula(cab, h, W[i], { style: 'Bold', cor: TINTA, ls: 0, size: i === 3 ? 7 : 8 });
});
const cabValores = grupoValores(cab);
for (const par of TITULOS) {
  const t = figma.createText();
  t.fontName = { family: 'Host Grotesk', style: 'Bold' };
  t.fontSize = 6.5;
  t.characters = par[1] ? par[0] + LS + par[1] : par[0];
  t.fills = fill(TINTA);
  t.letterSpacing = { unit: 'PERCENT', value: 0 };
  cabValores.appendChild(t);
  t.textAutoResize = 'NONE'; t.textAlignHorizontal = 'LEFT'; t.resize(PW, 16);
}
const reguaCab = figma.createFrame();
reguaCab.name = 'regua-cab'; reguaCab.fills = fill(CONFIG.cor);
tbl.appendChild(reguaCab); reguaCab.resize(100, 3); reguaCab.layoutSizingHorizontal = 'FILL';

// Separador de índice: dá o degrau que faltava entre o título de 22pt e o corpo
// de 6pt, e evita varrer 25 linhas para achar o 1.67. Texto em preto — a cor da
// família sobre branco reprova em 9 das 12 famílias (a mais clara dá 1.70:1).
// Sem índice, o separador leva o nome da família: "ÍNDICE " seguido de nada
// não diz coisa alguma.
const separador = ind => {
  const s = figma.createAutoLayout('HORIZONTAL', { name: 'sep ' + (ind || CONFIG.familia) });
  s.fills = []; s.itemSpacing = 8; s.counterAxisAlignItems = 'CENTER';
  s.paddingTop = 7; s.paddingBottom = 3; s.paddingLeft = 8; s.paddingRight = 8;
  tbl.appendChild(s); s.layoutSizingHorizontal = 'FILL';
  const t = texto(s, ind ? 'ÍNDICE ' + ind : CONFIG.familia, 'ExtraBold', 8, '#000000');
  t.letterSpacing = { unit: 'PERCENT', value: 6 };
  const r = figma.createFrame();
  r.name = 'regua'; r.fills = fill(NEUTRO);
  s.appendChild(r); r.resize(100, 1); r.layoutSizingHorizontal = 'FILL';
};

const registros = DADOS.trim().split('\n').map(l => l.split('~'));
let ultimoProduto = null, ultimaCelulaCod = null;
let indiceAtual = null, produtos = 0, linhasCor = 0, inline = 0, seps = 0;

registros.forEach(d => {
  if (d[0] === 'SUB') {
    const itens = d[1].split('|')
      .map(s => s.trim().match(/^(\S+)\s+(.+)$/))
      .filter(Boolean);
    if (itens.length === 1 && ultimoProduto) {
      bolinha(ultimoProduto, itens[0][2], itens[0][1], false);
      inline++;
      return;
    }
    if (ultimaCelulaCod && ultimaCelulaCod.characters === '—') {
      ultimaCelulaCod.characters = '↓';
      ultimaCelulaCod.textAlignHorizontal = 'CENTER';
    }
    // A linha de cores é a mesma lente da linha acima: tom levemente distinto
    // do branco para agrupar as duas, sem virar zebra.
    const r = linha('#FAFAFA', 4);
    r.name = 'subrow';
    const esp = itens.some(m => ESPELHADO.indexOf(m[2]) > -1);
    const wrap = figma.createAutoLayout('HORIZONTAL', { name: 'cores' });
    wrap.itemSpacing = esp ? 10 : 6; wrap.counterAxisAlignItems = 'CENTER'; wrap.fills = [];
    r.appendChild(wrap);
    texto(wrap, 'COD:', 'Bold', 7, '#4A4A4A');
    for (const m of itens) bolinha(wrap, m[2], m[1], esp);
    linhasCor++;
    return;
  }

  if (d[1] !== indiceAtual) { indiceAtual = d[1]; separador(indiceAtual); seps++; }

  const r = linha('#FFFFFF', 3);
  ultimaCelulaCod = celula(r, d[0], W[0], { alinha: d[0] ? 'LEFT' : 'CENTER' });
  chipIndice(r, d[1]);

  const prod = figma.createAutoLayout('HORIZONTAL', { name: 'produto' });
  prod.itemSpacing = 5; prod.counterAxisAlignItems = 'CENTER'; prod.fills = [];
  r.appendChild(prod);
  prod.resize(W[2], prod.height); prod.layoutSizingHorizontal = 'FIXED';
  const nome = texto(prod, d[2], 'Regular', 8, TINTA);
  nome.letterSpacing = { unit: 'PERCENT', value: -4 };
  ultimoProduto = prod;

  // Só o que varia por lente fica na linha. Cilindro e adição estão nas pílulas.
  const diam = CONFIG.simbolos ? 'Ø' + d[3] : 'Diâm. ' + d[3] + 'mm';
  let l2 = diam;
  if (CONFIG.altura === 'varia') {
    if (!d[10]) throw new Error('altura varia na familia mas a linha nao traz a dela: ' + d[0] + ' ' + d[2]);
    l2 += CONFIG.simbolos ? ' | ↕' + d[10] : ' | Alt. ' + d[10] + 'mm';
  }
  celula(r, 'Esf. ' + dec(d[4]) + ' a ' + dec(d[5]) + LS + l2, W[3], { size: 6, h: 16, cor: '#4A4A4A' });

  const g = grupoValores(r);
  (SEM_EXPRESS ? [d[6], d[8], d[9]] : [d[6], d[7], d[8], d[9]]).forEach(v => {
    const p = preco(v);
    celula(g, p, PW, { alinha: p && p.length ? 'LEFT' : 'CENTER' });
  });
  produtos++;
});

// A imagem cresce para consumir a sobra; se não houver sobra, encolhe até o piso.
if (img) {
  const sobra = LIMITE - (tbl.y + tbl.height);
  const nova = Math.min(TETO_IMAGEM, Math.max(PISO_IMAGEM, Math.round(img.height + sobra)));
  img.resize(555, nova);
  tbl.y = img.y + nova + 14;
  legendaImg.x = (555 - legendaImg.width) / 2;
  legendaImg.y = (nova - legendaImg.height) / 2;
}

// Se ainda estourar, a família não cabe nesta página. Não encolha a tipografia:
// quebre em duas páginas num limite de índice. Ver "Quebra de página" no SKILL.
const fim = tbl.y + tbl.height;
return {
  pagina: CONFIG.pagina,
  criados: img ? [hdr.id, img.id, tbl.id] : [hdr.id, tbl.id],
  produtos: produtos,
  linhasDeCor: linhasCor,
  bolinhasInline: inline,
  separadores: seps,
  alturaImagem: img ? Math.round(img.height) : 0,
  contrasteCabecalho: Math.round(razao(SOBRE_COR, CONFIG.cor) * 100) / 100,
  contrasteChip: Math.round(razao(TINTA, FUNDO_CHIP) * 100) / 100,
  fimDaTabela: Math.round(fim),
  cabeNoRodape: fim <= LIMITE,
  aviso: fim > LIMITE ? 'ESTOUROU o rodapé. Quebrar a família em duas páginas num limite de índice.' : null
};
