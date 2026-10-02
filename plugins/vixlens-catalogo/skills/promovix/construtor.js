// Construtor das páginas da Promovix — cole em use_figma.
// Não edite à mão: o montar.py injeta PAGINAS a partir do Excel e grava lotes
// prontos (lote_NN.js), cada um com uma ou mais páginas abaixo do limite de tamanho.
// Tudo em Auto Layout (regra da Mari, 02/10/2026). Exceções por desenho: faixa amarela e adesivo
// "Reflecta −50%" sobre as tabelas, arte recortada da campanha, QR sobre a arte e vetores (ABSOLUTE).

const PAGINAS = /*PAGINAS*/[];
const SVG_OFERTA = /*SVG_OFERTA*/null;   // ícone SealPercent (Phosphor, fill) em amarelo
let PAGINA = null;
let ARTE = null;                         // frame "Segundo Par" (arte da campanha), achado no arquivo

// ---------------------------------------------------------------- utilidades

const LS = String.fromCharCode(8232);
const TINTA = '#2F2F2F', NEUTRO = '#E4E4E4', PRETO = '#000000', AMARELO = '#F7B200', FAIXA_PROMO = '#FFF0BF';
const LIMITE = 796;              // nada de conteúdo abaixo daqui
const PAD_BASE = 3, PAD_MAX = 6;     // respiro das linhas: começa em 3 e cresce com a sobra
let GAP_HDR = 8, GAP_BLOCO = 14; const GAP_BLOCO_MAX = 22;

const canais = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const rgb = h => { const c = canais(h); return { r: c[0] / 255, g: c[1] / 255, b: c[2] / 255 }; };
const fill = h => [{ type: 'SOLID', color: rgb(h) }];
const lin = c => { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lumRel = h => { const c = canais(h); return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]); };
const razao = (a, b) => { const la = lumRel(a), lb = lumRel(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); };
const contraste = bg => (razao('#FFFFFF', bg) >= razao('#000000', bg) ? '#FFFFFF' : '#000000');
const mistura = (h, alvo, t) => { const a = canais(h), b = canais(alvo); return '#' + a.map((x, i) => ('0' + Math.round(x * (1 - t) + b[i] * t).toString(16)).slice(-2)).join('').toUpperCase(); };
const tinta20 = h => mistura(h, '#FFFFFF', 0.8);
// Cor clara (Optview, cinzas) some como régua sobre branco: usa um tom escurecido.
const traco = h => (razao('#FFFFFF', h) < 1.6 ? mistura(h, '#000000', 0.3) : h);

const CORES = {
  'Cinza': ['#6C6C6C', 'C'], 'Marrom': ['#69401C', 'M'], 'Verde': ['#3B5424', 'V'], 'Ametista': ['#54317B', 'A'],
  'Safira': ['#1C5A95', 'S'], 'Âmbar': ['#754D17', 'Â'], 'Esmeralda': ['#106943', 'E'], 'Rubi': ['#711533', 'R'],
  'G15': ['#3F4A3C', 'G'], 'Black': ['#1A1A1A', 'B'],
  'Prata': ['#9EADB0', 'EP'], 'Dourado': ['#BDB024', 'ED'], 'Azul': ['#0538D9', 'EA'], 'Rosa': ['#FFA1FF', 'ER']
};
const PONTO = { verde: '#78B472', azul: '#61AFE3', roxo: '#804CC4' };
const DESTAQUE = { FOTO: { fundo: '#D0DDE4', borda: '#78B472', rotulo: 'Fotossensível' }, RX: { fundo: '#FFFFFF', borda: '#72B2DD', rotulo: 'RX  ·  Cil. -2.25 a -4.00' } };
// Degradê Transitions (desenho do Otávio, 01/10/2026): legenda do cabeçalho e pílula no nome do produto.
const GRAD_TR = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [
  { position: 0, color: { ...rgb('#FCBE95'), a: 1 } }, { position: 0.33, color: { ...rgb('#FF766E'), a: 1 } },
  { position: 0.66, color: { ...rgb('#CB81C0'), a: 1 } }, { position: 1, color: { ...rgb('#96CCDC'), a: 1 } }] }];
const XTR = '#3A3A3C';               // XTRActive: pílula cinza-escura, texto branco (pedido de 01/10)
const RX_TR = /Transitions(?: Gen ?S| XTRActive(?: New Generation)?| Signature(?: Gen ?8)?| Classic)?/i;

// Ícones: o montar.py injeta em PAGINA só os que a página usa (ph = Phosphor Bold, ar = símbolos dos AR, marca = ícones de marca do DS).
const svgPh = (k, hex) => { const d = PAGINA.ph && PAGINA.ph[k]; return d ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">' + d.map(x => '<path d="' + x + '" fill="' + hex + '"/>').join('') + '</svg>' : null; };
const svgAr = k => { const d = PAGINA.ar && PAGINA.ar[k]; return d ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + d[0] + ' ' + d[1] + '">' + d[2].map(x => '<path d="' + x + '" fill="#FFFFFF"/>').join('') + '</svg>' : null; };
const svgMarca = k => (PAGINA.marca && PAGINA.marca[k]) || null;
const icone = (svg, nome, lado, parent) => { if (!svg) { estouros.push('ícone ausente: ' + nome); return null; } const n = figma.createNodeFromSvg(svg); n.name = nome; n.resize(lado, lado * (n.height / n.width)); parent.appendChild(n); return n; };

for (const s of ['Regular', 'Medium', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Host Grotesk', style: s });
try { await figma.loadFontAsync({ family: 'Host Grotesk', style: 'SemiBold' }); } catch (e) {}

let estouros = [];
const T = (parent, chars, style, size, cor, ls) => {
  const t = figma.createText(); t.fontName = { family: 'Host Grotesk', style }; t.fontSize = size;
  t.characters = chars; t.fills = fill(cor); if (ls !== undefined) t.letterSpacing = { unit: 'PERCENT', value: ls };
  parent.appendChild(t); return t;
};
const AL = (nome, dir) => { const f = figma.createAutoLayout(dir, { name: nome }); f.fills = []; f.clipsContent = false; return f; };
// Célula de largura fixa. Mede o texto antes de fixar: estouro vira aviso, não chute.
const cel = (parent, chars, w, o) => {
  o = o || {};
  const t = figma.createText(); t.fontName = { family: 'Host Grotesk', style: o.style || 'Regular' }; t.fontSize = o.size || 8;
  t.characters = chars && chars.length ? chars : '—'; t.fills = fill(o.cor || TINTA);
  t.letterSpacing = { unit: 'PERCENT', value: o.ls === undefined ? -4 : o.ls };
  if (o.small) t.setRangeFontSize(o.small, t.characters.length, 6);
  if (o.lh) t.lineHeight = { unit: 'PIXELS', value: o.lh };
  parent.appendChild(t);
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  if (t.width > w + 0.5) estouros.push(chars.split(LS).join(' / ') + ' (' + Math.ceil(t.width) + ' > ' + w + ')');
  const h = t.height;
  t.textAutoResize = 'NONE'; t.resize(w, Math.max(o.h || 0, h));
  if (o.alinha) t.textAlignHorizontal = o.alinha;
  return t;
};
const selo = parent => {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'blue uv' });
  f.fills = fill('#E6EEF7'); f.cornerRadius = 100; f.paddingTop = 1.5; f.paddingBottom = 1.5; f.paddingLeft = 4; f.paddingRight = 4;
  parent.appendChild(f); T(f, 'BLUE UV', 'Bold', 5.5, '#0B3D6E', 4);
};
const ponto = (parent, k) => {
  const d = figma.createFrame(); d.name = k ? 'ponto ' + k : 'ponto vazio'; d.resize(7, 7); d.cornerRadius = 100;
  d.fills = k ? fill(PONTO[k] || '#6C6C6C') : []; parent.appendChild(d);
};
// Nome do produto. "Transitions…" vira pílula; o que vem antes e depois fica em texto normal
// ("Orma [Transitions Gen S] Cinza"). Substituiu o fundo de destaque nas linhas Transitions.
const nomeProduto = (pr, n) => {
  const m = n.match(RX_TR);
  if (!m) { T(pr, n, 'Regular', 8, TINTA, -4); return; }
  const antes = n.slice(0, m.index).trim(), depois = n.slice(m.index + m[0].length).trim();
  const xtr = /xtractive/i.test(m[0]);
  if (antes) T(pr, antes, 'Regular', 8, TINTA, -4);
  const p = figma.createAutoLayout('HORIZONTAL', { name: xtr ? 'pilula transitions xtractive' : 'pilula transitions' });
  p.cornerRadius = 100; p.paddingTop = 1.5; p.paddingBottom = 1.5; p.paddingLeft = 6; p.paddingRight = 6; p.counterAxisAlignItems = 'CENTER';
  p.fills = xtr ? fill(XTR) : GRAD_TR; pr.appendChild(p);
  T(p, m[0], 'Medium', 7.5, xtr ? '#FFFFFF' : '#1D1D1F');
  if (depois) T(pr, depois, 'Regular', 8, TINTA, -4);
};
//#sec montagem
// Selo "MONTAGEM LENTE PRONTA R$15" no canto do cabeçalho da família (selo_montagem). Fora do padrão
// desde o combo (02/10/2026): o combo já traz a montagem incluída. Continua disponível no Excel.
const seloMontagem = hdr => {
  const b = figma.createAutoLayout('HORIZONTAL', { name: 'Montagem LP' }); b.fills = fill(PRETO); b.cornerRadius = 100;
  b.itemSpacing = 6; b.paddingTop = 5; b.paddingBottom = 5; b.paddingLeft = 12; b.paddingRight = 12; b.counterAxisAlignItems = 'CENTER';
  hdr.appendChild(b);
  const r = T(b, PAGINA.montagem.rotulo.split('\n').join(LS), 'Bold', 7, '#FFFFFF', 4); r.lineHeight = { unit: 'PERCENT', value: 110 };
  T(b, PAGINA.montagem.valor, 'ExtraBold', 18, AMARELO);
  const icone = hdr.children.find(n => n.name === 'icone de familia' || n.name === 'icone de marca');
  b.layoutPositioning = 'ABSOLUTE'; b.x = hdr.width - 16 - (icone ? icone.width + 10 : 0) - b.width; b.y = Math.round((hdr.height - b.height) / 2);
  const lt = hdr.children[0].children[0];
  if (lt.x + lt.width + 10 > b.x) estouros.push('selo de montagem encosta no título (' + Math.ceil(lt.x + lt.width) + ' > ' + Math.floor(b.x - 10) + ')');
};
//#fim montagem
// Bolinha de cor da Transitions/Solar: círculo com a inicial centralizada (Auto Layout).
const bolinha = (parent, nome, codigo) => {
  const par = CORES[nome] || ['#6C6C6C', nome.charAt(0)];
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'cor ' + nome }); chip.itemSpacing = 2; chip.counterAxisAlignItems = 'CENTER'; chip.fills = [];
  parent.appendChild(chip);
  const dot = figma.createAutoLayout('HORIZONTAL', { name: nome }); dot.primaryAxisSizingMode = 'FIXED'; dot.counterAxisSizingMode = 'FIXED'; dot.resize(10, 10);
  dot.primaryAxisAlignItems = 'CENTER'; dot.counterAxisAlignItems = 'CENTER'; dot.paddingTop = 0; dot.paddingBottom = 0; dot.paddingLeft = 0; dot.paddingRight = 0;
  dot.cornerRadius = 100; dot.fills = fill(par[0]); chip.appendChild(dot);
  T(dot, par[1], 'Bold', 5, contraste(par[0]));
  if (codigo) T(chip, codigo, 'Regular', 6, TINTA);
};
// Selo de índice da linha: caixa 26×13 com o índice centralizado (Auto Layout).
const seloIndice = (parent, ind, bg, borda) => {
  const ch = figma.createAutoLayout('HORIZONTAL', { name: 'ind ' + ind }); ch.primaryAxisSizingMode = 'FIXED'; ch.counterAxisSizingMode = 'FIXED'; ch.resize(26, 13);
  ch.primaryAxisAlignItems = 'CENTER'; ch.counterAxisAlignItems = 'CENTER'; ch.paddingTop = 0; ch.paddingBottom = 0; ch.paddingLeft = 0; ch.paddingRight = 0;
  ch.cornerRadius = 4; ch.fills = fill(bg); ch.strokes = fill(borda); ch.strokeWeight = 1; parent.appendChild(ch);
  T(ch, ind, 'Bold', 6.5, TINTA, -2);
};
// Selo "Combo disponível" nas linhas das tabelas normais que também estão no combo.
const seloCombo = parent => {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'selo combo' }); f.fills = fill(PRETO); f.cornerRadius = 100;
  f.paddingLeft = 4; f.paddingRight = 6; f.paddingTop = 1.5; f.paddingBottom = 2; f.itemSpacing = 3; f.counterAxisAlignItems = 'CENTER';
  parent.appendChild(f);
  icone(svgPh('selo', AMARELO), 'icone selo (Phosphor bold)', 9, f);
  T(f, PAGINA.comboSelo || 'Combo disponível', 'Bold', 6.5, AMARELO);
};
// Chip de AR no cabeçalho de preço: caixa 52×23, cor do DS, símbolo oficial branco e rótulo branco (modelo da Mari, 02/10/2026).
const AR = k => {
  k = k.split(LS).join(' ').toLowerCase();
  if (k.indexOf('blue') >= 0) return { nome: 'Blue Protect SH', cor: '#134B97', sim: 'blue', texto: 'Reflecta Blue' + LS + 'Protect SH', lado: 8 };
  if (k.indexOf('guard') >= 0) return { nome: 'Guard', cor: '#00782D', sim: 'guard', texto: 'Reflecta' + LS + 'Guard', lado: 7 };
  if (k.indexOf('express') >= 0) return { nome: 'Express', cor: '#92BB36', sim: 'express', texto: 'Reflecta' + LS + 'Express', lado: 9 };
  if (/\beco\b/.test(k)) return { nome: 'Eco', cor: '#92BB36', sim: null, texto: 'A.R. Eco' };
  if (k.indexOf('sem a.r') >= 0) return { nome: 'Sem A.R.', cor: '#F3F4F6', sim: null, texto: 'Sem A.R.', escuro: true, centro: true };
  return null;
};
const chipAR = (parent, a) => {
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'chip AR ' + a.nome }); chip.primaryAxisSizingMode = 'FIXED'; chip.counterAxisSizingMode = 'FIXED'; chip.resize(52, 23);
  chip.primaryAxisAlignItems = 'CENTER'; chip.counterAxisAlignItems = 'CENTER'; chip.paddingTop = 0; chip.paddingBottom = 0; chip.paddingLeft = 0; chip.paddingRight = 0;
  chip.cornerRadius = 3; chip.fills = fill(a.cor); parent.appendChild(chip);
  const ic = AL('conteudo', 'HORIZONTAL'); ic.itemSpacing = 2; ic.counterAxisAlignItems = a.centro ? 'CENTER' : 'MIN'; chip.appendChild(ic);
  if (a.sim) {
    icone(svgAr(a.sim), 'simbolo ' + a.nome + ' (DS)', a.lado, ic);
  }
  const t = T(ic, a.texto, 'Bold', 6.5, a.escuro ? TINTA : '#FFFFFF', 0);
  t.lineHeight = { unit: 'PIXELS', value: 6.6 }; t.textAlignHorizontal = a.centro ? 'CENTER' : 'LEFT';
  if (ic.width > 50) estouros.push('chip de AR ' + a.nome + ' não cabe (' + Math.ceil(ic.width) + ' > 50)');
  return chip;
};
// Ícone do cabeçalho da família: Freevix e Essilor usam o ícone de marca do DS; o resto usa Phosphor Bold
// num selo 40×40 (escuro sobre cabeçalho claro, branco sobre escuro). Coluna "Ícone" do Excel sobrescreve.
const iconeDe = F => {
  const e = (F.icone || '').toLowerCase();
  if (e === 'nenhum') return null;
  if (e) return e;
  const n = F.familia.toUpperCase();
  if (n.indexOf('FREEVIX') >= 0) return 'freevix';
  if (n.indexOf('ESSILOR') >= 0) return 'essilor';
  if (n.indexOf('OPTVIEW') >= 0) return 'sol';
  if (n.indexOf('ESPACE') >= 0) return 'brilho';
  if (n.indexOf('PRONTA') >= 0) return 'caixa';
  if (n.indexOf('KODAK') >= 0) return 'olho';
  if (/VIX TOTAL|OPTF|MULTIFOCAL/.test(n)) return 'oculos';
  return null;
};
const iconeFamilia = (hdr, F, cor) => {
  const k = iconeDe(F); if (!k) return null;
  if (k === 'freevix' || k === 'essilor') return icone(svgMarca(k), 'icone de marca', 40, hdr);
  if (!svgPh(k, '#000000')) { estouros.push('ícone "' + k + '" desconhecido (família ' + F.familia + ')'); return null; }
  const claro = contraste(cor) === '#000000';
  const box = figma.createAutoLayout('HORIZONTAL', { name: 'icone de familia' }); box.primaryAxisSizingMode = 'FIXED'; box.counterAxisSizingMode = 'FIXED'; box.resize(40, 40);
  box.primaryAxisAlignItems = 'CENTER'; box.counterAxisAlignItems = 'CENTER'; box.paddingTop = 0; box.paddingBottom = 0; box.paddingLeft = 0; box.paddingRight = 0; box.cornerRadius = 12;
  box.fills = [{ type: 'SOLID', color: claro ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 }, opacity: claro ? 0.1 : 0.28 }];
  box.strokes = [{ type: 'SOLID', color: claro ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 }, opacity: claro ? 0.14 : 0.46 }]; box.strokeWeight = 0.75; box.strokeAlign = 'INSIDE';
  hdr.appendChild(box);
  icone(svgPh(k, claro ? '#000000' : '#FFFFFF'), k + ' (Phosphor bold)', 22, box);
  return box;
};

// ---------------------------------------------------------------- blocos

function familia(pai, F) {
  const cor = F.cor, sobre = contraste(cor), chipBg = tinta20(cor), linhaCor = traco(cor);
  const grupo = AL('familia ' + F.familia, 'VERTICAL'); grupo.itemSpacing = GAP_HDR; pai.appendChild(grupo); grupo.layoutSizingHorizontal = 'FILL';
  const hdr = figma.createAutoLayout('HORIZONTAL', { name: 'Header ' + F.familia });
  hdr.fills = fill(cor); hdr.cornerRadius = 20; hdr.paddingTop = 10; hdr.paddingBottom = 10; hdr.paddingLeft = 16; hdr.paddingRight = 16; hdr.itemSpacing = 0;
  hdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; hdr.counterAxisAlignItems = 'CENTER';
  grupo.appendChild(hdr); hdr.layoutSizingHorizontal = 'FILL';
  const textos = AL('textos', 'VERTICAL'); textos.itemSpacing = 2; hdr.appendChild(textos);
  const lt = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' }); lt.itemSpacing = 10; lt.counterAxisAlignItems = 'CENTER'; lt.fills = []; textos.appendChild(lt);
  T(lt, F.familia, 'ExtraBold', 22, sobre);
  for (const p of F.pilulas) {
    const f = figma.createAutoLayout('HORIZONTAL', { name: 'pilula' }); f.fills = fill(PRETO); f.cornerRadius = 100;
    f.paddingTop = 4; f.paddingBottom = 4; f.paddingLeft = 10; f.paddingRight = 10; lt.appendChild(f); T(f, p, 'Bold', 9, '#FFFFFF');
  }
  if (F.legenda) {
    // Família com Transitions (e sem outro fotossensível destacado) ganha a legenda
    // "Transitions · Fotossensível" em degradê com contorno preto — desenho do Otávio, 01/10/2026.
    const fotos = F.rows.filter(r => r.dest === 'FOTO');
    const legTr = F.rows.some(r => RX_TR.test(r.n)) && fotos.every(r => RX_TR.test(r.n));
    const pilulaLeg = (rotulo, k) => {
      const f = figma.createAutoLayout('HORIZONTAL', { name: 'legenda' }); f.cornerRadius = 100;
      f.paddingTop = 4; f.paddingBottom = 4; f.paddingLeft = 10; f.paddingRight = 10; f.strokeAlign = 'INSIDE';
      if (k) { f.fills = fill('#FFFFFF'); f.strokes = fill(DESTAQUE[k].borda); f.strokeWeight = 1.5; }
      else { f.fills = GRAD_TR; f.strokes = fill(PRETO); f.strokeWeight = 1; }
      lt.appendChild(f); T(f, rotulo, 'Bold', 8.5, k ? TINTA : PRETO);
    };
    if (legTr) pilulaLeg('Transitions · Fotossensível', null);
    else if (fotos.length) pilulaLeg(DESTAQUE.FOTO.rotulo, 'FOTO');
    if (F.rows.some(r => r.dest === 'RX')) pilulaLeg(DESTAQUE.RX.rotulo, 'RX');
  }
  T(textos, F.subtitulo, 'Medium', 8, sobre);
  iconeFamilia(hdr, F, cor);
  if (F.montagem && PAGINA.montagem) seloMontagem(hdr);

  const tbl = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + F.familia });
  tbl.fills = fill('#FFFFFF'); tbl.strokes = fill(NEUTRO); tbl.strokeWeight = 1; tbl.cornerRadius = 20; tbl.clipsContent = false;
  // Com o adesivo −50% invadindo a borda, os títulos Reflecta precisam de 10 px a mais de folga (01/10).
  const comAdesivo = F.promo.length > 0 && !!PAGINA.adesivo;
  tbl.paddingTop = comAdesivo ? 20 : 10; tbl.paddingBottom = 8; tbl.paddingLeft = 10; tbl.paddingRight = 10; tbl.itemSpacing = 0;
  grupo.appendChild(tbl); tbl.layoutSizingHorizontal = 'FILL';

  const NP = F.titulos.length, PW = 52, TW = 62, DW = F.dispW || 70;
  const valW = NP * PW + (NP - 1) * 8;
  const ncols = 5 + (F.trat ? 1 : 0);
  const prodW = 519 - 27 - 26 - (F.trat ? TW : 0) - DW - valW - (ncols - 1) * 5;
  const linha = (bg, nome) => {
    const r = figma.createAutoLayout('HORIZONTAL', { name: nome || 'row' }); r.itemSpacing = 5; r.paddingTop = PAD_BASE; r.paddingBottom = PAD_BASE;
    r.paddingLeft = 8; r.paddingRight = 8; r.cornerRadius = 30; r.fills = fill(bg); r.counterAxisAlignItems = 'CENTER';
    tbl.appendChild(r); r.layoutSizingHorizontal = 'FILL'; return r;
  };
  const grupoValores = parent => { const g = figma.createAutoLayout('HORIZONTAL', { name: 'valores' }); g.itemSpacing = 8; g.fills = []; g.counterAxisAlignItems = 'CENTER'; parent.appendChild(g); return g; };

  const cab = linha('#FFFFFF', 'cab');
  cel(cab, 'Cód', 27, { style: 'Bold', ls: 0 }); cel(cab, 'Índ.', 26, { style: 'Bold', ls: 0 }); cel(cab, 'Produto', prodW, { style: 'Bold', ls: 0 });
  if (F.trat) cel(cab, 'Tratamento', TW, { style: 'Bold', ls: 0, size: 7 });
  cel(cab, F.dispTitulo || 'Disponibilidade', DW, { style: 'Bold', ls: 0, size: 7 });
  const cv = grupoValores(cab);
  const nosPromo = [];
  F.titulos.forEach((par, i) => {
    const txt = par[1] ? par[0] + LS + par[1] : par[0];
    const ar = AR(F.titulosTexto ? F.titulosTexto[i] : txt);
    // Coluna em promoção: o título fica sobre a faixa amarelo-clara (proposta 1, escolhida em 30/09/2026).
    const no = ar ? chipAR(cv, ar) : cel(cv, txt, PW, { style: 'Bold', size: 6.5, ls: 0, h: 16 });
    if (F.promo.indexOf(i + 1) > -1) nosPromo.push(no);
  });
  const rg = figma.createFrame(); rg.name = 'regua-cab'; rg.fills = fill(linhaCor); tbl.appendChild(rg); rg.resize(100, 3); rg.layoutSizingHorizontal = 'FILL';

  let indAtual = null, produtos = 0, linhasCor = 0, codigosCor = 0, seps = 0, destaques = 0, combos = 0;
  const temPonto = F.rows.some(r => r.d);
  for (const d of F.rows) {
    if (F.sep && d.i !== indAtual) {
      const s = figma.createAutoLayout('HORIZONTAL', { name: 'sep ' + d.i }); s.fills = []; s.itemSpacing = 8; s.counterAxisAlignItems = 'CENTER';
      s.paddingTop = 7; s.paddingBottom = 3; s.paddingLeft = 8; s.paddingRight = 8; tbl.appendChild(s); s.layoutSizingHorizontal = 'FILL';
      T(s, 'ÍNDICE ' + d.i, 'ExtraBold', 8, PRETO, 6);
      const rr = figma.createFrame(); rr.name = 'regua'; rr.fills = fill(NEUTRO); s.appendChild(rr); rr.resize(100, 1); rr.layoutSizingHorizontal = 'FILL';
      seps++;
    }
    indAtual = d.i;
    const r = linha('#FFFFFF');
    const multi = d.cores && d.cores.length > 1;
    cel(r, d.c || (multi ? '↓' : ''), 27, { alinha: d.c ? 'LEFT' : 'CENTER' });
    seloIndice(r, d.i, chipBg, linhaCor);
    const pr = figma.createAutoLayout('HORIZONTAL', { name: 'produto' }); pr.itemSpacing = 5; pr.counterAxisAlignItems = 'CENTER'; pr.fills = []; r.appendChild(pr);
    if (temPonto) ponto(pr, d.d);          // ponto vazio mantém os nomes alinhados
    nomeProduto(pr, d.n);
    if (d.b) selo(pr);
    if (d.cores && d.cores.length === 1) { bolinha(pr, d.cores[0][1], d.cores[0][0]); codigosCor += d.cores[0][0] ? 1 : 0; }
    if (d.k) { seloCombo(pr); combos++; }
    if (pr.width > prodW + 0.5) estouros.push(d.n + ' (produto ' + Math.ceil(pr.width) + ' > ' + prodW + ')');
    pr.resize(prodW, pr.height); pr.layoutSizingHorizontal = 'FIXED';
    if (F.trat) {
      const tf = figma.createAutoLayout('HORIZONTAL', { name: 'tratamento' }); tf.itemSpacing = 3; tf.counterAxisAlignItems = 'CENTER'; tf.fills = []; r.appendChild(tf);
      T(tf, d.t || '—', 'Regular', 7, TINTA, -2);
      for (const k of (d.td || [])) ponto(tf, k);
      if (tf.width > TW + 0.5) estouros.push((d.t || '') + ' (tratamento)');
      tf.resize(TW, tf.height); tf.layoutSizingHorizontal = 'FIXED';
    }
    const escuro = d.dest === 'FOTO';     // 6pt sobre o fundo do destaque precisa de tinta mais escura (≥ 7:1)
    cel(r, d.disp.join(LS), DW, { size: 6, cor: escuro ? TINTA : '#4A4A4A', lh: 7.5 });
    const g = grupoValores(r);
    d.p.forEach((v, i) => {
      if (!v) { cel(g, '', PW, { alinha: 'CENTER' }); return; }
      const obs = d.obs && d.obs[i + 1];
      const promo = F.promo.indexOf(i + 1) > -1 ? 'Bold' : 'Regular';     // preço em oferta em negrito
      if (obs) cel(g, 'R$ ' + v + LS + obs, PW, { small: ('R$ ' + v).length + 1, lh: 9, style: promo });
      else cel(g, 'R$ ' + v, PW, { style: promo });
    });
    if (d.dest && DESTAQUE[d.dest]) {
      r.fills = fill(DESTAQUE[d.dest].fundo); r.strokes = fill(DESTAQUE[d.dest].borda); r.strokeWeight = 1.5;
      r.strokeAlign = 'INSIDE'; r.strokesIncludedInLayout = false; destaques++;
    }
    produtos++;
    if (multi) {
      const s = linha('#FAFAFA', 'subrow'); s.paddingTop = PAD_BASE + 1; s.paddingBottom = PAD_BASE + 1;
      const w = figma.createAutoLayout('HORIZONTAL', { name: 'cores' }); w.itemSpacing = 6; w.counterAxisAlignItems = 'CENTER'; w.fills = []; s.appendChild(w);
      T(w, 'COD:', 'Bold', 7, '#4A4A4A');
      for (const m of d.cores) { bolinha(w, m[1], m[0]); codigosCor++; }
      linhasCor++;
    }
  }
  // Faixa amarelo-clara contínua atrás das colunas em promoção, do título ao último preço.
  // As linhas ficam transparentes para a faixa aparecer; a altura é refeita no fim (ajustarFaixas),
  // porque o respiro e o aperto mudam a altura da tabela depois daqui. Sobreposição de propósito (ABSOLUTE).
  let faixaPromo = null;
  if (nosPromo.length) {
    for (const r of tbl.children) if (r.name === 'row' || r.name === 'subrow' || r.name === 'cab') { if (!r.strokes.length) r.fills = []; }
    const tb0 = tbl.absoluteBoundingBox, a0 = nosPromo[0].absoluteBoundingBox, z0 = nosPromo[nosPromo.length - 1].absoluteBoundingBox;
    faixaPromo = figma.createRectangle(); faixaPromo.name = 'faixa promo'; tbl.insertChild(0, faixaPromo); faixaPromo.layoutPositioning = 'ABSOLUTE';
    faixaPromo.x = a0.x - tb0.x - 5; faixaPromo.resize(z0.x + z0.width - a0.x + 10, 10); faixaPromo.fills = fill(FAIXA_PROMO); faixaPromo.cornerRadius = 12;
  }
  // Adesivo da oferta sobre a borda da tabela, centrado nas colunas em promoção.
  if (nosPromo.length && PAGINA.adesivo) {
    const tb = tbl.absoluteBoundingBox, a = nosPromo[0].absoluteBoundingBox, z = nosPromo[nosPromo.length - 1].absoluteBoundingBox;
    // Selo de oferta: ícone de cupom + rótulo em branco + valor grande em amarelo, com contorno e sombra.
    // Reto: a versão inclinada foi recusada em 01/10.
    // "REFLECTA −50%" vira rótulo "REFLECTA" + valor "−50%" (quebra no último espaço).
    const k = PAGINA.adesivo.lastIndexOf(' ');
    const rotulo = k > 0 ? PAGINA.adesivo.slice(0, k) : '', valor = k > 0 ? PAGINA.adesivo.slice(k + 1) : PAGINA.adesivo;
    const st = figma.createAutoLayout('HORIZONTAL', { name: 'adesivo promo' }); st.fills = fill(PRETO); st.cornerRadius = 100;
    st.paddingTop = 4; st.paddingBottom = 4; st.paddingLeft = SVG_OFERTA ? 8 : 12; st.paddingRight = 12; st.itemSpacing = 5; st.counterAxisAlignItems = 'CENTER';
    st.strokes = fill(AMARELO); st.strokeWeight = 1.5; st.strokeAlign = 'INSIDE';
    st.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 2 }, radius: 4, spread: 0, visible: true, blendMode: 'NORMAL' }];
    tbl.appendChild(st); st.layoutPositioning = 'ABSOLUTE';
    if (SVG_OFERTA) { const ic = figma.createNodeFromSvg(SVG_OFERTA); ic.name = 'icone oferta'; st.appendChild(ic); ic.rescale(16 / ic.width); }
    if (rotulo) T(st, rotulo, 'Bold', 8, '#FFFFFF', 8);
    T(st, valor, 'ExtraBold', 14, AMARELO, -2);
    st.x = (a.x - tb.x) + ((z.x + z.width) - a.x - st.width) / 2; st.y = -14;
  }
  return { nos: [grupo], tbl, comAdesivo, faixaPromo, info: { familia: F.familia, produtos, linhasCor, codigosCor, seps, destaques, combos, contrasteCabecalho: Math.round(razao(sobre, cor) * 100) / 100 } };
}

//#sec compacta
// Família curta e de pouco peso (compacta = S, ex.: Solar): sem cabeçalho grande — chip com o nome,
// uma linha com o que é igual em todas as lentes, e os produtos em 2 colunas. Pedido de 01/10/2026.
function compacta(pai, F) {
  const box = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + F.familia }); box.fills = fill('#FFFFFF'); box.strokes = fill(NEUTRO);
  box.strokeWeight = 1; box.cornerRadius = 20; box.itemSpacing = 4; box.paddingTop = 7; box.paddingBottom = 6; box.paddingLeft = 11; box.paddingRight = 11;
  pai.appendChild(box); box.layoutSizingHorizontal = 'FILL';
  const tit = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' }); tit.fills = []; tit.itemSpacing = 8; tit.paddingLeft = 6; tit.counterAxisAlignItems = 'CENTER'; box.appendChild(tit);
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'chip' }); chip.fills = fill(F.cor); chip.cornerRadius = 100;
  chip.paddingTop = 3; chip.paddingBottom = 3; chip.paddingLeft = 10; chip.paddingRight = 10; tit.appendChild(chip);
  T(chip, F.familia, 'ExtraBold', 11, contraste(F.cor));
  const igual = k => F.rows.every(r => JSON.stringify(r[k]) === JSON.stringify(F.rows[0][k]));
  const info = [];
  const mesmoInd = igual('i');
  if (mesmoInd) info.push('Índice ' + F.rows[0].i);
  if (igual('disp') && F.rows[0].disp.length) info.push(F.rows[0].disp.join(' | '));
  if (info.length) T(tit, info.join('   ·   '), 'Medium', 7.5, '#4A4A4A');
  const grade = figma.createAutoLayout('HORIZONTAL', { name: 'grade' }); grade.fills = []; grade.itemSpacing = 14; box.appendChild(grade); grade.layoutSizingHorizontal = 'FILL';
  const meio = Math.ceil(F.rows.length / 2);
  let produtos = 0, codigosCor = 0;
  [F.rows.slice(0, meio), F.rows.slice(meio)].forEach((lista, c) => {
    const col = figma.createAutoLayout('VERTICAL', { name: 'coluna ' + (c + 1) }); col.fills = []; grade.appendChild(col); col.layoutSizingHorizontal = 'FILL';
    for (const d of lista) {
      const r = figma.createAutoLayout('HORIZONTAL', { name: 'row' }); r.itemSpacing = 5; r.paddingTop = PAD_BASE; r.paddingBottom = PAD_BASE;
      r.paddingLeft = 8; r.paddingRight = 8; r.cornerRadius = 30; r.fills = fill('#FFFFFF'); r.counterAxisAlignItems = 'CENTER';
      col.appendChild(r); r.layoutSizingHorizontal = 'FILL';
      cel(r, d.c, 27);
      if (!mesmoInd) seloIndice(r, d.i, tinta20(F.cor), traco(F.cor));
      const pr = figma.createAutoLayout('HORIZONTAL', { name: 'produto' }); pr.itemSpacing = 5; pr.counterAxisAlignItems = 'CENTER'; pr.fills = []; r.appendChild(pr);
      nomeProduto(pr, d.n);
      if (d.b) selo(pr);
      if (d.cores && d.cores.length) for (const m of d.cores) { bolinha(pr, m[1], m[0]); codigosCor += m[0] ? 1 : 0; }
      pr.layoutSizingHorizontal = 'FILL';
      cel(r, d.p[0] ? 'R$ ' + d.p[0] : '', 52);
      produtos++;
    }
  });
  for (const col of grade.children) for (const r of col.children) {
    const pr = r.children.find(n => n.name === 'produto'); const usado = pr.children.reduce((s, k) => s + k.width, 0) + pr.itemSpacing * (pr.children.length - 1);
    if (usado > pr.width + 0.5) estouros.push(F.familia + ': nome largo demais para a coluna compacta (' + Math.ceil(usado) + ' > ' + Math.floor(pr.width) + ')');
  }
  return { box, info: { familia: F.familia, produtos, linhasCor: 0, codigosCor, seps: 0, destaques: 0, combos: 0, compacta: true } };
}

//#fim compacta
//#sec faixa
function faixa(pai, B, nome) {
  const fx = figma.createAutoLayout('HORIZONTAL', { name: nome });
  fx.fills = fill(PRETO); fx.cornerRadius = 20; fx.paddingLeft = 22; fx.paddingRight = 22; fx.paddingTop = 5; fx.paddingBottom = 5; fx.counterAxisAlignItems = 'CENTER';
  pai.appendChild(fx); fx.layoutSizingHorizontal = 'FILL'; fx.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const esq = figma.createAutoLayout('HORIZONTAL', { name: 'oferta' }); esq.fills = []; esq.itemSpacing = 6; esq.counterAxisAlignItems = 'CENTER'; fx.appendChild(esq);
  if (B.antes) T(esq, B.antes, 'Bold', 13, '#FFFFFF');
  T(esq, B.destaque, 'ExtraBold', 32, AMARELO, -2);
  if (B.depois) T(esq, B.depois, 'Bold', 13, '#FFFFFF');
  if (B.direita) { const t = T(fx, B.direita.split('\n').join(LS), 'Medium', 8.5, '#FFFFFF'); t.textAlignHorizontal = 'RIGHT'; }
  return fx;
}

//#fim faixa
//#sec capa
// Capa: logotipo + aviso à esquerda, mês no meio, logo Vixlens + validade à direita (Auto Layout).
function capa(pai) {
  const band = figma.createAutoLayout('HORIZONTAL', { name: 'Cabecalho Promovix' }); band.fills = fill(PRETO); band.primaryAxisSizingMode = 'FIXED'; band.counterAxisSizingMode = 'FIXED';
  band.resize(595, 88); band.bottomLeftRadius = 20; band.bottomRightRadius = 20; band.primaryAxisAlignItems = 'SPACE_BETWEEN'; band.counterAxisAlignItems = 'CENTER';
  band.paddingLeft = 20; band.paddingRight = 20; band.paddingTop = 0; band.paddingBottom = 0; band.itemSpacing = 0; pai.appendChild(band);
  const esq = AL('esquerda', 'VERTICAL'); esq.itemSpacing = 0; esq.counterAxisAlignItems = 'MIN'; band.appendChild(esq);
  const marca = AL('marca', 'HORIZONTAL'); marca.itemSpacing = 6; marca.counterAxisAlignItems = 'MIN'; esq.appendChild(marca);
  const tit = T(marca, 'PROMOVIX', 'Regular', 38, '#FFFFFF', -2); tit.setRangeFontName(5, 8, { family: 'Host Grotesk', style: 'ExtraBold' });
  const pvoBox = AL('pvo', 'HORIZONTAL'); pvoBox.paddingTop = 8; marca.appendChild(pvoBox); T(pvoBox, 'PVO', 'Bold', 9, '#FFFFFF');
  T(esq, PAGINA.aviso, 'Medium', 7.5, '#FFFFFF');
  const meio = AL('meio', 'HORIZONTAL'); band.appendChild(meio); T(meio, '// ' + PAGINA.mes + '.' + PAGINA.ano, 'Bold', 15, '#FFFFFF');
  const dir = AL('direita', 'VERTICAL'); dir.itemSpacing = 8; dir.counterAxisAlignItems = 'MAX'; band.appendChild(dir);
  if (PAGINA.svgVixlens) { const logo = figma.createNodeFromSvg(PAGINA.svgVixlens); logo.name = 'logo vixlens'; dir.appendChild(logo); logo.rescale(100 / logo.width); }
  const val = figma.createAutoLayout('HORIZONTAL', { name: 'validade' }); val.fills = fill(AMARELO); val.cornerRadius = 100; val.paddingTop = 3; val.paddingBottom = 3; val.paddingLeft = 9; val.paddingRight = 9;
  dir.appendChild(val); T(val, 'VÁLIDO DE ' + PAGINA.validade, 'Bold', 7.5, PRETO);
  return band;
}

//#fim capa
//#sec vixclub
function vixclub(pai, B) {
  const vc = figma.createFrame(); vc.name = 'VixClub'; vc.resize(555, 160); vc.cornerRadius = 20; vc.fills = fill(PRETO); vc.clipsContent = true;
  pai.appendChild(vc); vc.layoutSizingHorizontal = 'FILL';
  const foto = figma.createRectangle(); foto.name = 'Foto VixClub'; foto.resize(555, 160); foto.fills = fill(PRETO); vc.appendChild(foto);
  const gr = figma.createRectangle(); gr.name = 'Sombra texto'; gr.resize(555, 160); vc.appendChild(gr);
  gr.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [
    { position: 0.40, color: { r: 0, g: 0, b: 0, a: 0 } }, { position: 0.62, color: { r: 0, g: 0, b: 0, a: 0.65 } }, { position: 1, color: { r: 0, g: 0, b: 0, a: 0.8 } }] }];
  const h1 = T(vc, B.titulo, 'ExtraBold', 16, '#FFFFFF', -2); h1.textAutoResize = 'HEIGHT'; h1.resize(250, h1.height); h1.x = 298;
  const b1 = T(vc, B.texto.split('\n').join(LS), 'Medium', 8.5, '#FFFFFF'); b1.textAutoResize = 'HEIGHT'; b1.resize(250, b1.height); b1.x = 298;
  let logo = null;
  if (PAGINA.svgVixclub) { logo = figma.createNodeFromSvg(PAGINA.svgVixclub); logo.name = 'logo VixClub'; vc.appendChild(logo); logo.rescale(96 / logo.width); logo.x = 298; }
  const ajustar = h => {
    vc.resize(555, h); foto.resize(555, h); gr.resize(555, h);
    const total = h1.height + 6 + b1.height + (logo ? 10 + logo.height : 0);
    h1.y = Math.round((h - total) / 2); b1.y = h1.y + h1.height + 6; if (logo) logo.y = b1.y + b1.height + 10;
    return h1.y >= 8;                   // false = texto não cabe
  };
  return { vc, foto, ajustar, minimo: h1.height + 6 + b1.height + (logo ? 10 + logo.height : 0) + 20 };
}

//#fim vixclub
function rodape(pai) {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'Rodape Promovix' });
  f.fills = fill(PRETO); f.cornerRadius = 100; f.paddingLeft = 14; f.paddingRight = 14; f.paddingTop = 6; f.paddingBottom = 6;
  f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 10;
  pai.appendChild(f); f.layoutSizingHorizontal = 'FIXED'; f.resize(555, f.height); f.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const esq = figma.createAutoLayout('HORIZONTAL', { name: 'marca' }); esq.fills = []; esq.itemSpacing = 6; esq.counterAxisAlignItems = 'CENTER'; f.appendChild(esq);
  const pv = T(esq, 'PROMOVIX', 'Regular', 9, '#FFFFFF'); pv.setRangeFontName(5, 8, { family: 'Host Grotesk', style: 'ExtraBold' });
  T(esq, '// ' + PAGINA.mes + '.' + PAGINA.ano, 'Bold', 7.5, AMARELO);
  T(esq, 'Válido de ' + PAGINA.validade.replace(' A ', ' a '), 'Medium', 7, '#FFFFFF');
  T(f, PAGINA.contato + '   ·   Página ' + PAGINA.numero + '/' + PAGINA.total, 'Medium', 7, '#FFFFFF');
}

//#sec combo
// ---------------------------------------------------------------- combo
// Página do combo (opcional, bloco COMBO do Excel): faixa amarela com a chamada e o chip dos materiais,
// tabela clara com os combos (chip da marca, bolinha do residual, preço montado) e o painel de baixo
// (campanha Freevix com QR sobre a arte, VixClub ou nada). Modelo fechado com a Mari em 02/10/2026.
const MARCAS = {
  Kodak: { fundo: '#F7B200', tinta: '#000000', borda: null },
  Optview: { fundo: '#C3D3DD', tinta: '#1F2D3A', borda: '#8FA8B8' },
  Essilor: { fundo: '#3F4A3C', tinta: '#FFFFFF', borda: null },
};
async function acharArte() {
  const origem = figma.currentPage;
  for (const p of figma.root.children) {
    await figma.setCurrentPageAsync(p);
    const n = p.findOne(x => x.type === 'FRAME' && x.name === 'Segundo Par');
    if (n) { ARTE = n; break; }
  }
  await figma.setCurrentPageAsync(origem);
}
function comboBloco(pai, B) {
  const grupo = AL('combo', 'VERTICAL'); grupo.itemSpacing = 10; pai.appendChild(grupo); grupo.layoutSizingHorizontal = 'FILL';
  // faixa amarela da chamada + chip dos materiais
  const band = figma.createAutoLayout('VERTICAL', { name: 'Chamada Combo' });
  band.fills = fill(AMARELO); band.cornerRadius = 22; band.paddingTop = 16; band.paddingBottom = 18; band.paddingLeft = 26; band.paddingRight = 26; band.itemSpacing = 9;
  grupo.appendChild(band); band.layoutSizingHorizontal = 'FILL';
  // Título grande (ExtraBold 32,5) + frase em duas linhas (SemiBold 18,5), centralizados — ajuste da Mari em 02/10/2026.
  const tit = (B.titulo || '').trim(), corpo = B.chamada.split('\n').join(LS);
  const ch = T(band, tit ? tit + LS + corpo : corpo, 'SemiBold', 18.5, PRETO, 0);
  if (tit) { ch.setRangeFontName(0, tit.length, { family: 'Host Grotesk', style: 'ExtraBold' }); ch.setRangeFontSize(0, tit.length, 32.5); ch.setRangeLineHeight(0, tit.length + 1, { unit: 'PIXELS', value: 26 }); ch.setRangeLineHeight(tit.length + 1, ch.characters.length, { unit: 'PIXELS', value: 22 }); }
  else ch.lineHeight = { unit: 'PIXELS', value: 22 };
  ch.name = 'chamada'; ch.textAlignHorizontal = 'CENTER'; ch.layoutSizingHorizontal = 'FILL'; ch.textAutoResize = 'HEIGHT';
  const pill = figma.createAutoLayout('HORIZONTAL', { name: 'destaque materiais' }); pill.fills = fill(PRETO); pill.cornerRadius = 14;
  pill.paddingTop = 7; pill.paddingBottom = 9; pill.paddingLeft = 20; pill.paddingRight = 20; pill.itemSpacing = 10;
  pill.primaryAxisAlignItems = 'CENTER'; pill.counterAxisAlignItems = 'CENTER'; band.appendChild(pill); pill.layoutSizingHorizontal = 'FILL';
  icone(svgPh('oculos', AMARELO), 'oculos (Phosphor bold)', 26, pill);
  T(pill, B.chip, 'ExtraBold', 22, AMARELO, -1);

  // tabela clara
  const tab = figma.createAutoLayout('VERTICAL', { name: 'Combo Lente + Montagem' });
  tab.fills = fill('#FFFFFF'); tab.strokes = fill(NEUTRO); tab.strokeWeight = 1; tab.strokeAlign = 'INSIDE'; tab.cornerRadius = 20;
  tab.paddingTop = 16; tab.paddingBottom = 16; tab.paddingLeft = 26; tab.paddingRight = 26; tab.itemSpacing = 0;
  grupo.appendChild(tab); tab.layoutSizingHorizontal = 'FILL';
  const linhas = [];
  const faz = (cab, cod, marca, nome, preco, bol) => {
    const r = figma.createAutoLayout('HORIZONTAL', { name: cab ? 'cab' : 'row' }); r.fills = []; r.itemSpacing = 8; r.counterAxisAlignItems = 'CENTER';
    r.paddingTop = cab ? 3 : 8; r.paddingBottom = cab ? 6 : 8; r.paddingLeft = 0; r.paddingRight = 0;
    r.strokes = fill(cab ? '#F7B200' : '#D4D4D4'); r.strokeTopWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; r.strokeBottomWeight = cab ? 3 : 1;
    tab.appendChild(r); r.layoutSizingHorizontal = 'FILL';
    cel(r, cod, 54, { style: 'Bold', size: cab ? 8.5 : 10, ls: 0 });
    if (cab) { const p = cel(r, 'Produto', 319, { style: 'Bold', size: 8.5, ls: 0 }); }
    else {
      const pr = figma.createAutoLayout('HORIZONTAL', { name: 'produto' }); pr.fills = []; pr.itemSpacing = 6; pr.counterAxisAlignItems = 'CENTER'; r.appendChild(pr);
      const m = MARCAS[marca];
      const cp = figma.createAutoLayout('HORIZONTAL', { name: 'chip ' + marca }); cp.cornerRadius = 20; cp.fills = fill(m.fundo);
      if (m.borda) { cp.strokes = fill(m.borda); cp.strokeWeight = 0.75; cp.strokeAlign = 'INSIDE'; }
      cp.paddingLeft = 7; cp.paddingRight = 7; cp.paddingTop = 2; cp.paddingBottom = 3; pr.appendChild(cp); T(cp, marca, 'Bold', 8, m.tinta);
      T(pr, nome, 'Medium', 10, TINTA, 0);
      if (bol) ponto(pr, bol);
      pr.resize(319, pr.height); pr.layoutSizingHorizontal = 'FIXED';
    }
    cel(r, preco, 112, { style: 'Bold', size: cab ? 8.5 : 10, ls: 0, alinha: 'RIGHT' });
    if (!cab) linhas.push(r);
  };
  faz(true, 'Código', null, null, B.colunaPreco);
  for (const it of B.itens) faz(false, it.c, it.marca, it.nome, 'R$ ' + it.preco, it.bol);
  if (linhas.length) linhas[linhas.length - 1].strokeBottomWeight = 0;

  // painel de baixo
  let painelAlt = 0;
  if (B.painel === 'CAMPANHA_FREEVIX') {
    const cp = AL('campanha', 'VERTICAL'); cp.itemSpacing = 8; grupo.appendChild(cp); cp.layoutSizingHorizontal = 'FILL';
    const janela = figma.createFrame(); janela.name = 'Campanha Freevix 2o par (arte)'; janela.resize(555, 215); janela.cornerRadius = 20; janela.clipsContent = true; janela.fills = [];
    cp.appendChild(janela); janela.layoutSizingHorizontal = 'FILL';
    if (ARTE) { const arte = ARTE.clone(); janela.appendChild(arte); arte.rescale(555 / ARTE.width); arte.x = 0; arte.y = -46; }
    else {
      janela.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0.04, g: 0.04, b: 0.04, a: 1 } }, { position: 1, color: { r: 0.2, g: 0.15, b: 0.04, a: 1 } }] }];
      const g = AL('texto campanha', 'VERTICAL'); g.itemSpacing = 8; janela.appendChild(g); g.x = 28; g.y = 60;
      T(g, 'Campanha Freevix', 'Bold', 10, '#FFFFFF'); T(g, '50% off', 'ExtraBold', 58, '#FFFFFF', -2); T(g, 'no segundo par de lentes Freevix', 'Medium', 13, '#FFFFFF');
      estouros.push('arte da campanha ("Segundo Par") não achada no arquivo: usei o painel de texto. Crie a página "2 par" com o frame.');
    }
    if (B.qrSvg) {
      const ov = figma.createAutoLayout('VERTICAL', { name: 'QR sobre a arte' }); ov.fills = fill('#FFFFFF'); ov.cornerRadius = 12; ov.counterAxisAlignItems = 'CENTER';
      ov.paddingTop = 8; ov.paddingBottom = 7; ov.paddingLeft = 8; ov.paddingRight = 8; ov.itemSpacing = 4; janela.appendChild(ov);
      const qr = figma.createNodeFromSvg(B.qrSvg); qr.name = 'QR code ' + B.qrUrl; qr.resize(60, 60); ov.appendChild(qr);
      T(ov, 'Aponte a câmera', 'Bold', 7.5, PRETO);
      ov.x = 555 - 14 - ov.width; ov.y = 215 - 14 - ov.height;
    }
    const fx = figma.createAutoLayout('HORIZONTAL', { name: 'Chamada consultor' }); fx.fills = fill(AMARELO); fx.cornerRadius = 15; fx.primaryAxisSizingMode = 'FIXED'; fx.counterAxisSizingMode = 'FIXED';
    fx.resize(555, 30); fx.primaryAxisAlignItems = 'CENTER'; fx.counterAxisAlignItems = 'CENTER'; cp.appendChild(fx); fx.layoutSizingHorizontal = 'FILL';
    T(fx, B.chamadaCampanha, 'Bold', 10, PRETO);
    painelAlt = 253;
  }
  return { grupo, linhas, painelAlt, tab };
}

//#fim combo
// ---------------------------------------------------------------- página

async function montar() {
GAP_BLOCO = 14;
let frame = figma.currentPage.children.find(n => n.type === 'FRAME' && n.name === PAGINA.frameNome);
if (!frame) { frame = figma.createFrame(); frame.name = PAGINA.frameNome; figma.currentPage.appendChild(frame); }
for (const c of frame.children.slice()) c.remove();
frame.layoutMode = 'NONE'; frame.resize(595, 842); frame.x = PAGINA.x; frame.y = 0; frame.fills = fill('#FFFFFF'); frame.clipsContent = true;

const temCapa = PAGINA.blocos.some(b => b.tipo === 'capa');
const temCombo = PAGINA.blocos.some(b => b.tipo === 'combo');
if (temCombo && !ARTE) await acharArte();
// Página: topo (capa + conteúdo) em cima, rodapé embaixo. Tudo em Auto Layout.
frame.layoutMode = 'VERTICAL'; frame.primaryAxisSizingMode = 'FIXED'; frame.counterAxisSizingMode = 'FIXED'; frame.resize(595, 842);
frame.primaryAxisAlignItems = 'SPACE_BETWEEN'; frame.counterAxisAlignItems = 'CENTER';
frame.paddingTop = 0; frame.paddingBottom = 12; frame.paddingLeft = 0; frame.paddingRight = 0; frame.itemSpacing = 0;
const topo = AL('topo', 'VERTICAL'); topo.counterAxisSizingMode = 'FIXED'; topo.resize(595, 100); topo.primaryAxisSizingMode = 'AUTO';
topo.itemSpacing = 14; topo.counterAxisAlignItems = 'CENTER'; topo.paddingTop = temCapa ? 0 : 20; frame.appendChild(topo);
if (temCapa) capa(topo);
const conteudo = AL('conteudo', 'VERTICAL'); conteudo.counterAxisSizingMode = 'FIXED'; conteudo.resize(555, 100); conteudo.primaryAxisSizingMode = 'AUTO';
conteudo.itemSpacing = GAP_BLOCO; topo.appendChild(conteudo);
const topoY = temCapa ? 102 : 20;

// Monta na ordem e guarda a pilha de blocos.
const pilha = [], infos = [], tabelas = [], faixas = [], linhasCompactas = [], linhasCombo = [], comAdesivo = new Set();
let clube = null, combo = null;
for (const B of PAGINA.blocos) {
  if (B.tipo === 'capa') continue;
  if (B.tipo === 'faixa50') pilha.push({ nos: [faixa(conteudo, B, 'Faixa 50%')] });
  else if (B.tipo === 'montagem') pilha.push({ nos: [faixa(conteudo, B, 'Faixa Montagem')] });
  else if (B.tipo === 'vixclub') { clube = vixclub(conteudo, B); pilha.push({ nos: [clube.vc], clube: true }); }
  else if (B.tipo === 'combo') { combo = comboBloco(conteudo, B); linhasCombo.push(...combo.linhas); pilha.push({ nos: [combo.grupo], combo: true }); }
  else if (B.tipo === 'familia' && B.compacta) { const r = compacta(conteudo, B); pilha.push({ nos: [r.box] }); infos.push(r.info); linhasCompactas.push(...r.box.findAll(n => n.name === 'row')); }
  else if (B.tipo === 'familia') { const r = familia(conteudo, B); pilha.push({ nos: r.nos }); infos.push(r.info); tabelas.push(r.tbl); if (r.comAdesivo) comAdesivo.add(r.tbl); if (r.faixaPromo) faixas.push([r.tbl, r.faixaPromo]); }
}
rodape(frame);

const fa = () => frame.absoluteBoundingBox;
const fimConteudo = () => { const a = conteudo.absoluteBoundingBox; return a.y - fa().y + conteudo.height; };
const gaps = g => { conteudo.itemSpacing = g; };
const linhas = [];
for (const t of tabelas) for (const r of t.children) if (r.name === 'row' || r.name === 'cab' || r.name === 'subrow') linhas.push(r);
linhas.push(...linhasCompactas);
const aplicarPad = extra => { for (const r of linhas) { const base = r.name === 'subrow' ? PAD_BASE + 1 : PAD_BASE; r.paddingTop = base + extra; r.paddingBottom = base + extra; } };

let fim, aperto = 0, clubeOk = true, idFoto = null;
if (combo) {
  // Página do combo: o painel de baixo tem altura fixa; as linhas da tabela de combos cedem o resto.
  const reserva = clube ? 200 + GAP_BLOCO : 0;
  const livre = LIMITE - topoY - reserva;
  let pad = 6;
  const g = combo.grupo;
  const cabem = () => { const total = g.children.reduce((s, c) => s + c.height, 0) + (g.children.length - 1) * 10; return total <= livre; };
  const aplicarCombo = p => { for (const r of combo.linhas) { r.paddingTop = p; r.paddingBottom = p; } };
  aplicarCombo(pad);
  while (!cabem() && pad > 3.5) { pad -= 0.5; aplicarCombo(pad); }
  if (!cabem()) estouros.push('página do combo não cabe nem com as linhas no mínimo: tire um combo ou o painel de baixo');
  // O grupo do combo ocupa a altura livre; os espaços entre faixa, tabela e painel se distribuem sozinhos.
  g.primaryAxisSizingMode = 'FIXED'; g.resize(555, livre); g.primaryAxisAlignItems = 'SPACE_BETWEEN';
  if (clube) { const yc = clube.vc.absoluteBoundingBox.y - fa().y; clubeOk = clube.ajustar(Math.max(LIMITE - yc, clube.minimo)); idFoto = clube.foto.id; }
  fim = fimConteudo(); aperto = pad < 6 ? 1 : 0;
} else {
  // O VixClub ocupa o que sobrar, mas precisa de um mínimo para o texto caber.
  const reserva = clube ? clube.minimo : 0;
  const alvo = LIMITE - (clube ? reserva : 0) - 4;
  fim = fimConteudo();
  // Aperto: se estourou, tira folga antes de desistir — espaços entre blocos,
  // padding das tabelas e, por último, o respiro das linhas. Tipografia não encolhe.
  if (fim > alvo) {
    aperto = 1; gaps(10);
    for (const t of tabelas) { t.paddingTop = comAdesivo.has(t) ? 18 : 8; t.paddingBottom = 6; }
    fim = fimConteudo();
  }
  if (fim > alvo) { aperto = 2; aplicarPad(-0.5); fim = fimConteudo(); }
  if (fim > alvo) { aperto = 3; aplicarPad(-1); fim = fimConteudo(); }
  // Respiro: a sobra vai primeiro para o espaçamento das linhas, depois para o espaço entre blocos.
  if (!aperto && !clube && fim < alvo && linhas.length) {
    const extra = Math.min(PAD_MAX - PAD_BASE, (alvo - fim) / (2 * linhas.length));
    aplicarPad(Math.floor(extra * 4) / 4);
    fim = fimConteudo();
    const nBlocos = pilha.length - 1;
    if (nBlocos > 0 && fim < alvo) { gaps(Math.min(GAP_BLOCO_MAX, GAP_BLOCO + (alvo - fim) / nBlocos)); fim = fimConteudo(); }
  }
  if (clube) {
    const yc = clube.vc.absoluteBoundingBox.y - fa().y; const h = LIMITE - yc;
    clubeOk = h >= reserva && clube.ajustar(h); idFoto = clube.foto.id; fim = LIMITE;
  }
}
for (const [t, fp] of faixas) {
  const cab = t.children.find(n => n.name === 'cab');
  const fluxo = t.children.filter(n => n.layoutPositioning !== 'ABSOLUTE');
  const ult = fluxo[fluxo.length - 1];
  fp.y = cab.y - 4; fp.resize(fp.width, ult.y + ult.height - fp.y + 2);
}

return {
  pagina: PAGINA.numero,
  frame: frame.id,
  fimDoConteudo: Math.round(fim),
  aperto,
  cabeNoRodape: fim <= LIMITE,
  vixclubCabe: clubeOk,
  idFotoVixClub: idFoto,
  combos: combo ? combo.linhas.length : 0,
  familias: infos,
  estouros,
  aviso: fim > LIMITE ? 'ESTOUROU: mova um bloco para outra página na aba Páginas e gere de novo.' : null
};
}

const resultados = [];
for (const P of PAGINAS) { PAGINA = P; estouros = []; resultados.push(await montar()); }
return resultados;
