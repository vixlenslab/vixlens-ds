// Construtor das páginas da Promovix — cole em use_figma.
// Não edite à mão: o montar.py injeta PAGINAS a partir do Excel e grava lotes
// prontos (lote_NN.js), cada um com uma ou mais páginas abaixo do limite de tamanho.

const PAGINAS = /*PAGINAS*/[];
const SVG_OFERTA = /*SVG_OFERTA*/null;   // ícone SealPercent (Phosphor, fill) em amarelo
let PAGINA = null;

// ---------------------------------------------------------------- utilidades

const LS = String.fromCharCode(8232);
const TINTA = '#2F2F2F', NEUTRO = '#E4E4E4', PRETO = '#000000', AMARELO = '#F7B200', FAIXA_PROMO = '#FFF0BF';
const LIMITE = 796;              // nada de conteúdo abaixo daqui
const RODAPE_Y = 806;            // faixa promocional do rodapé
const PAD_BASE = 3, PAD_MAX = 6;     // respiro das linhas: começa em 3 e cresce com a sobra
let GAP_FAIXA = 14, GAP_HDR = 8, GAP_BLOCO = 14; const GAP_BLOCO_MAX = 22;

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

for (const s of ['Regular', 'Medium', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Host Grotesk', style: s });

let estouros = [];
const T = (parent, chars, style, size, cor, ls) => {
  const t = figma.createText(); t.fontName = { family: 'Host Grotesk', style }; t.fontSize = size;
  t.characters = chars; t.fills = fill(cor); if (ls !== undefined) t.letterSpacing = { unit: 'PERCENT', value: ls };
  parent.appendChild(t); return t;
};
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
// Selo "MONTAGEM LENTE PRONTA R$15" no canto do cabeçalho da família (selo_montagem).
// Substituiu a faixa preta de montagem em 01/10/2026: a faixa custava ~67 px por página.
const seloMontagem = hdr => {
  const b = figma.createAutoLayout('HORIZONTAL', { name: 'Montagem LP' }); b.fills = fill(PRETO); b.cornerRadius = 100;
  b.itemSpacing = 6; b.paddingTop = 5; b.paddingBottom = 5; b.paddingLeft = 12; b.paddingRight = 12; b.counterAxisAlignItems = 'CENTER';
  hdr.appendChild(b);
  const r = T(b, PAGINA.montagem.rotulo.split('\n').join(LS), 'Bold', 7, '#FFFFFF', 4); r.lineHeight = { unit: 'PERCENT', value: 110 };
  T(b, PAGINA.montagem.valor, 'ExtraBold', 18, AMARELO);
  b.layoutPositioning = 'ABSOLUTE'; b.x = hdr.width - 16 - b.width; b.y = Math.round((hdr.height - b.height) / 2);
  const lt = hdr.children[0];
  if (lt.x + lt.width + 10 > b.x) estouros.push('selo de montagem encosta no título (' + Math.ceil(lt.x + lt.width) + ' > ' + Math.floor(b.x - 10) + ')');
};
const bolinha = (parent, nome, codigo) => {
  const par = CORES[nome] || ['#6C6C6C', nome.charAt(0)];
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'cor ' + nome }); chip.itemSpacing = 2; chip.counterAxisAlignItems = 'CENTER'; chip.fills = [];
  parent.appendChild(chip);
  const dot = figma.createFrame(); dot.name = nome; dot.resize(10, 10); dot.cornerRadius = 100; dot.fills = fill(par[0]); chip.appendChild(dot);
  const s = figma.createText(); s.fontName = { family: 'Host Grotesk', style: 'Bold' }; s.fontSize = 5; s.characters = par[1];
  s.fills = fill(contraste(par[0])); dot.appendChild(s); s.x = (10 - s.width) / 2; s.y = (10 - s.height) / 2;
  if (codigo) T(chip, codigo, 'Regular', 6, TINTA);
};

// ---------------------------------------------------------------- blocos

function familia(page, F) {
  const cor = F.cor, sobre = contraste(cor), chipBg = tinta20(cor), linhaCor = traco(cor);
  const hdr = figma.createAutoLayout('VERTICAL', { name: 'Header ' + F.familia });
  hdr.fills = fill(cor); hdr.cornerRadius = 20; hdr.paddingTop = 10; hdr.paddingBottom = 10; hdr.paddingLeft = 16; hdr.paddingRight = 16; hdr.itemSpacing = 2;
  page.appendChild(hdr); hdr.x = 20; hdr.resize(555, hdr.height); hdr.layoutSizingHorizontal = 'FIXED';
  const lt = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' }); lt.itemSpacing = 10; lt.counterAxisAlignItems = 'CENTER'; lt.fills = []; hdr.appendChild(lt);
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
  T(hdr, F.subtitulo, 'Medium', 8, sobre);
  if (F.montagem && PAGINA.montagem) seloMontagem(hdr);

  const tbl = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + F.familia });
  tbl.fills = fill('#FFFFFF'); tbl.strokes = fill(NEUTRO); tbl.strokeWeight = 1; tbl.cornerRadius = 20; tbl.clipsContent = false;
  // Com o adesivo −50% invadindo a borda, os títulos Reflecta precisam de 10 px a mais de folga (01/10).
  const comAdesivo = F.promo.length > 0 && !!PAGINA.adesivo;
  tbl.paddingTop = comAdesivo ? 20 : 10; tbl.paddingBottom = 8; tbl.paddingLeft = 10; tbl.paddingRight = 10; tbl.itemSpacing = 0;
  page.appendChild(tbl); tbl.x = 20; tbl.resize(555, tbl.height); tbl.layoutSizingHorizontal = 'FIXED';

  const NP = F.titulos.length, PW = 52, TW = 62, DW = F.dispW || 70;
  const valW = NP * PW + (NP - 1) * 8;
  const ncols = 5 + (F.trat ? 1 : 0);
  const prodW = 519 - 27 - 26 - (F.trat ? TW : 0) - DW - valW - (ncols - 1) * 5;
  const linha = (bg, nome) => {
    const r = figma.createAutoLayout('HORIZONTAL', { name: nome || 'row' }); r.itemSpacing = 5; r.paddingTop = PAD_BASE; r.paddingBottom = PAD_BASE;
    r.paddingLeft = 8; r.paddingRight = 8; r.cornerRadius = 30; r.fills = fill(bg); r.counterAxisAlignItems = 'CENTER';
    tbl.appendChild(r); r.layoutSizingHorizontal = 'FILL'; return r;
  };
  const grupo = parent => { const g = figma.createAutoLayout('HORIZONTAL', { name: 'valores' }); g.itemSpacing = 8; g.fills = []; g.counterAxisAlignItems = 'CENTER'; parent.appendChild(g); return g; };

  const cab = linha('#FFFFFF', 'cab');
  cel(cab, 'Cód', 27, { style: 'Bold', ls: 0 }); cel(cab, 'Índ.', 26, { style: 'Bold', ls: 0 }); cel(cab, 'Produto', prodW, { style: 'Bold', ls: 0 });
  if (F.trat) cel(cab, 'Tratamento', TW, { style: 'Bold', ls: 0, size: 7 });
  cel(cab, F.dispTitulo || 'Disponibilidade', DW, { style: 'Bold', ls: 0, size: 7 });
  const cv = grupo(cab);
  F.titulos.forEach((par, i) => {
    const txt = par[1] ? par[0] + LS + par[1] : par[0];
    // Coluna em promoção: o título fica sobre a faixa amarelo-clara (proposta 1, escolhida em 30/09/2026).
    if (F.promo.indexOf(i + 1) > -1) {
      const b = figma.createAutoLayout('HORIZONTAL', { name: 'selo promo' }); b.fills = [];
      b.paddingTop = 2; b.paddingBottom = 2; b.paddingLeft = 0; b.paddingRight = 0; cv.appendChild(b);
      cel(b, txt, PW, { style: 'Bold', size: 6.5, ls: 0, h: 16, cor: PRETO });
    } else cel(cv, txt, PW, { style: 'Bold', size: 6.5, ls: 0, h: 16 });
  });
  const rg = figma.createFrame(); rg.name = 'regua-cab'; rg.fills = fill(linhaCor); tbl.appendChild(rg); rg.resize(100, 3); rg.layoutSizingHorizontal = 'FILL';

  let indAtual = null, produtos = 0, linhasCor = 0, codigosCor = 0, seps = 0, destaques = 0;
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
    const ch = figma.createFrame(); ch.name = 'ind ' + d.i; ch.resize(26, 13); ch.cornerRadius = 4; ch.fills = fill(chipBg); ch.strokes = fill(linhaCor); ch.strokeWeight = 1; r.appendChild(ch);
    const ct = T(ch, d.i, 'Bold', 6.5, TINTA, -2); ct.x = (26 - ct.width) / 2; ct.y = (13 - ct.height) / 2;
    const pr = figma.createAutoLayout('HORIZONTAL', { name: 'produto' }); pr.itemSpacing = 5; pr.counterAxisAlignItems = 'CENTER'; pr.fills = []; r.appendChild(pr);
    if (temPonto) ponto(pr, d.d);          // ponto vazio mantém os nomes alinhados
    nomeProduto(pr, d.n);
    if (d.b) selo(pr);
    if (d.cores && d.cores.length === 1) { bolinha(pr, d.cores[0][1], d.cores[0][0]); codigosCor += d.cores[0][0] ? 1 : 0; }
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
    const g = grupo(r);
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
  // porque o respiro e o aperto mudam a altura da tabela depois daqui.
  const selos = cv.children.filter(n => n.name === 'selo promo');
  let faixaPromo = null;
  if (selos.length) {
    for (const r of tbl.children) if (r.name === 'row' || r.name === 'subrow' || r.name === 'cab') { if (!r.strokes.length) r.fills = []; }
    const tb0 = tbl.absoluteBoundingBox, a0 = selos[0].absoluteBoundingBox, z0 = selos[selos.length - 1].absoluteBoundingBox;
    faixaPromo = figma.createRectangle(); faixaPromo.name = 'faixa promo'; tbl.insertChild(0, faixaPromo); faixaPromo.layoutPositioning = 'ABSOLUTE';
    faixaPromo.x = a0.x - tb0.x - 5; faixaPromo.resize(z0.x + z0.width - a0.x + 10, 10); faixaPromo.fills = fill(FAIXA_PROMO); faixaPromo.cornerRadius = 12;
  }
  // Adesivo da oferta sobre a borda da tabela, centrado nas colunas em promoção.
  if (selos.length && PAGINA.adesivo) {
    const tb = tbl.absoluteBoundingBox, a = selos[0].absoluteBoundingBox, z = selos[selos.length - 1].absoluteBoundingBox;
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
  return { nos: [hdr, tbl], tbl, comAdesivo, faixaPromo, info: { familia: F.familia, produtos, linhasCor, codigosCor, seps, destaques, contrasteCabecalho: Math.round(razao(sobre, cor) * 100) / 100 } };
}

// Família curta e de pouco peso (compacta = S, ex.: Solar): sem cabeçalho grande — chip com o nome,
// uma linha com o que é igual em todas as lentes, e os produtos em 2 colunas. Pedido de 01/10/2026.
function compacta(page, F) {
  const box = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + F.familia }); box.fills = fill('#FFFFFF'); box.strokes = fill(NEUTRO);
  box.strokeWeight = 1; box.cornerRadius = 20; box.itemSpacing = 4; box.paddingTop = 7; box.paddingBottom = 6; box.paddingLeft = 11; box.paddingRight = 11;
  page.appendChild(box); box.x = 20; box.resize(555, box.height); box.layoutSizingHorizontal = 'FIXED';
  const tit = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' }); tit.fills = []; tit.itemSpacing = 8; tit.paddingLeft = 6; tit.counterAxisAlignItems = 'CENTER'; box.appendChild(tit);
  const chip = figma.createAutoLayout('HORIZONTAL', { name: 'chip' }); chip.fills = fill(F.cor); chip.cornerRadius = 100;
  chip.paddingTop = 3; chip.paddingBottom = 3; chip.paddingLeft = 10; chip.paddingRight = 10; tit.appendChild(chip);
  T(chip, F.familia, 'ExtraBold', 11, contraste(F.cor));
  const igual = k => F.rows.every(r => JSON.stringify(r[k]) === JSON.stringify(F.rows[0][k]));
  const info = [];
  if (F.subtitulo) info.push(F.subtitulo.charAt(0) + F.subtitulo.slice(1).toLowerCase());
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
      if (!mesmoInd) { const ch = figma.createFrame(); ch.name = 'ind ' + d.i; ch.resize(26, 13); ch.cornerRadius = 4; ch.fills = fill(tinta20(F.cor)); ch.strokes = fill(traco(F.cor)); ch.strokeWeight = 1; r.appendChild(ch);
        const ct = T(ch, d.i, 'Bold', 6.5, TINTA, -2); ct.x = (26 - ct.width) / 2; ct.y = (13 - ct.height) / 2; }
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
  return { box, info: { familia: F.familia, produtos, linhasCor: 0, codigosCor, seps: 0, destaques: 0, compacta: true } };
}

function faixa(page, B, nome) {
  const fx = figma.createAutoLayout('HORIZONTAL', { name: nome });
  fx.fills = fill(PRETO); fx.cornerRadius = 20; fx.paddingLeft = 22; fx.paddingRight = 22; fx.paddingTop = 5; fx.paddingBottom = 5; fx.counterAxisAlignItems = 'CENTER';
  page.appendChild(fx); fx.x = 20; fx.resize(555, fx.height); fx.layoutSizingHorizontal = 'FIXED'; fx.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const esq = figma.createAutoLayout('HORIZONTAL', { name: 'oferta' }); esq.fills = []; esq.itemSpacing = 6; esq.counterAxisAlignItems = 'CENTER'; fx.appendChild(esq);
  if (B.antes) T(esq, B.antes, 'Bold', 13, '#FFFFFF');
  T(esq, B.destaque, 'ExtraBold', 32, AMARELO, -2);
  if (B.depois) T(esq, B.depois, 'Bold', 13, '#FFFFFF');
  if (B.direita) { const t = T(fx, B.direita.split('\n').join(LS), 'Medium', 8.5, '#FFFFFF'); t.textAlignHorizontal = 'RIGHT'; }
  return fx;
}

function capa(page) {
  const band = figma.createFrame(); band.name = 'Cabecalho Promovix'; band.resize(595, 88); band.fills = fill(PRETO); page.appendChild(band); band.x = 0; band.y = 0;
  const tit = T(band, 'PROMOVIX', 'Regular', 38, '#FFFFFF', -2); tit.setRangeFontName(5, 8, { family: 'Host Grotesk', style: 'ExtraBold' }); tit.x = 20; tit.y = 14;
  const pvo = T(band, 'PVO', 'Bold', 9, '#FFFFFF'); pvo.x = tit.x + tit.width + 6; pvo.y = tit.y + 8;
  const mes = T(band, '// ' + PAGINA.mes + '.' + PAGINA.ano, 'Bold', 15, '#FFFFFF'); mes.x = 300; mes.y = tit.y + 12;
  if (PAGINA.svgVixlens) { const logo = figma.createNodeFromSvg(PAGINA.svgVixlens); logo.name = 'logo vixlens'; band.appendChild(logo); logo.rescale(100 / logo.width); logo.x = 575 - logo.width; logo.y = tit.y + 10; }
  const val = figma.createAutoLayout('HORIZONTAL', { name: 'validade' }); val.fills = fill(AMARELO); val.cornerRadius = 100; val.paddingTop = 3; val.paddingBottom = 3; val.paddingLeft = 9; val.paddingRight = 9;
  band.appendChild(val); T(val, 'VÁLIDO DE ' + PAGINA.validade, 'Bold', 7.5, PRETO); val.x = 575 - val.width; val.y = 62;
  const av = T(band, PAGINA.aviso, 'Medium', 7.5, '#FFFFFF'); av.x = 20; av.y = 64;
  return band;
}

function vixclub(page, B) {
  const vc = figma.createFrame(); vc.name = 'VixClub'; vc.resize(555, 160); vc.cornerRadius = 20; vc.fills = fill(PRETO); vc.clipsContent = true;
  page.appendChild(vc); vc.x = 20;
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

function rodape(page) {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'Rodape Promovix' });
  f.fills = fill(PRETO); f.cornerRadius = 100; f.paddingLeft = 14; f.paddingRight = 14; f.paddingTop = 6; f.paddingBottom = 6;
  f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 10;
  page.appendChild(f); f.x = 20; f.y = RODAPE_Y; f.resize(555, f.height); f.layoutSizingHorizontal = 'FIXED'; f.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const esq = figma.createAutoLayout('HORIZONTAL', { name: 'marca' }); esq.fills = []; esq.itemSpacing = 6; esq.counterAxisAlignItems = 'CENTER'; f.appendChild(esq);
  const pv = T(esq, 'PROMOVIX', 'Regular', 9, '#FFFFFF'); pv.setRangeFontName(5, 8, { family: 'Host Grotesk', style: 'ExtraBold' });
  T(esq, '// ' + PAGINA.mes + '.' + PAGINA.ano, 'Bold', 7.5, AMARELO);
  T(esq, 'Válido de ' + PAGINA.validade.replace(' A ', ' a '), 'Medium', 7, '#FFFFFF');
  T(f, PAGINA.contato + '   ·   Página ' + PAGINA.numero + '/' + PAGINA.total, 'Medium', 7, '#FFFFFF');
}

// ---------------------------------------------------------------- página

async function montar() {
GAP_FAIXA = 14; GAP_BLOCO = 14;
let frame = figma.currentPage.children.find(n => n.type === 'FRAME' && n.name === PAGINA.frameNome);
if (!frame) { frame = figma.createFrame(); frame.name = PAGINA.frameNome; figma.currentPage.appendChild(frame); }
for (const c of frame.children.slice()) c.remove();
frame.resize(595, 842); frame.x = PAGINA.x; frame.y = 0; frame.fills = fill('#FFFFFF'); frame.clipsContent = true;

// Monta na ordem e guarda a pilha: [{nos, gapAntes}]
const pilha = [], infos = [], tabelas = [], faixas = [], linhasCompactas = [], comAdesivo = new Set();
let clube = null, topo = 20;
for (const B of PAGINA.blocos) {
  if (B.tipo === 'capa') { capa(frame); topo = 102; continue; }
  if (B.tipo === 'faixa50') pilha.push({ nos: [faixa(frame, B, 'Faixa 50%')], faixa: true });
  else if (B.tipo === 'montagem') pilha.push({ nos: [faixa(frame, B, 'Faixa Montagem')], faixa: true });
  else if (B.tipo === 'vixclub') { clube = vixclub(frame, B); pilha.push({ nos: [clube.vc], clube: true }); }
  else if (B.tipo === 'familia' && B.compacta) { const r = compacta(frame, B); pilha.push({ nos: [r.box] }); infos.push(r.info); linhasCompactas.push(...r.box.findAll(n => n.name === 'row')); }
  else if (B.tipo === 'familia') { const r = familia(frame, B); pilha.push({ nos: r.nos }); infos.push(r.info); tabelas.push(r.tbl); if (r.comAdesivo) comAdesivo.add(r.tbl); if (r.faixaPromo) faixas.push([r.tbl, r.faixaPromo]); }
}
rodape(frame);

const empilhar = gapBloco => {
  let y = topo, fim = topo;
  pilha.forEach((b, i) => {
    if (i > 0) y += pilha[i - 1].faixa ? GAP_FAIXA : gapBloco;
    b.nos[0].y = y;
    if (b.nos[1]) b.nos[1].y = y + b.nos[0].height + GAP_HDR;
    const ultimo = b.nos[b.nos.length - 1];
    y = ultimo.y + ultimo.height; if (!b.clube) fim = y;
  });
  return fim;
};
const linhas = [];
for (const t of tabelas) for (const r of t.children) if (r.name === 'row' || r.name === 'cab' || r.name === 'subrow') linhas.push(r);
linhas.push(...linhasCompactas);
const aplicarPad = extra => { for (const r of linhas) { const base = r.name === 'subrow' ? PAD_BASE + 1 : PAD_BASE; r.paddingTop = base + extra; r.paddingBottom = base + extra; } };

// O VixClub ocupa o que sobrar, mas precisa de um mínimo para o texto caber.
const reserva = clube ? clube.minimo : 0;
const alvo = LIMITE - (clube ? reserva : 0) - 4;
let fim = empilhar(GAP_BLOCO), aperto = 0;
// Aperto: se estourou, tira folga antes de desistir — espaços entre blocos,
// padding das tabelas e, por último, o respiro das linhas. Tipografia não encolhe.
if (fim > alvo) {
  aperto = 1; GAP_FAIXA = 10; GAP_BLOCO = 10;
  for (const t of tabelas) { t.paddingTop = comAdesivo.has(t) ? 18 : 8; t.paddingBottom = 6; }
  fim = empilhar(GAP_BLOCO);
}
if (fim > alvo) { aperto = 2; aplicarPad(-0.5); fim = empilhar(GAP_BLOCO); }
if (fim > alvo) { aperto = 3; aplicarPad(-1); fim = empilhar(GAP_BLOCO); }
// Respiro: a sobra vai primeiro para o espaçamento das linhas, depois para o espaço entre blocos.
if (!aperto && !clube && fim < alvo && linhas.length) {
  const extra = Math.min(PAD_MAX - PAD_BASE, (alvo - fim) / (2 * linhas.length));
  aplicarPad(Math.floor(extra * 4) / 4);
  fim = empilhar(GAP_BLOCO);
  const nBlocos = pilha.filter((b, i) => i > 0 && !pilha[i - 1].faixa).length;
  if (nBlocos && fim < alvo) fim = empilhar(Math.min(GAP_BLOCO_MAX, GAP_BLOCO + (alvo - fim) / nBlocos));
}
for (const [t, fp] of faixas) {
  const cab = t.children.find(n => n.name === 'cab');
  const fluxo = t.children.filter(n => n.layoutPositioning !== 'ABSOLUTE');
  const ult = fluxo[fluxo.length - 1];
  fp.y = cab.y - 4; fp.resize(fp.width, ult.y + ult.height - fp.y + 2);
}
let clubeOk = true, idFoto = null;
if (clube) {
  const y = clube.vc.y; const h = LIMITE - y;
  clubeOk = h >= reserva && clube.ajustar(h); idFoto = clube.foto.id; fim = LIMITE;
}

return {
  pagina: PAGINA.numero,
  frame: frame.id,
  fimDoConteudo: Math.round(fim),
  aperto,
  cabeNoRodape: fim <= LIMITE,
  vixclubCabe: clubeOk,
  idFotoVixClub: idFoto,
  familias: infos,
  estouros,
  aviso: fim > LIMITE ? 'ESTOUROU: mova um bloco para outra página na aba Páginas e gere de novo.' : null
};
}

const resultados = [];
for (const P of PAGINAS) { PAGINA = P; estouros = []; resultados.push(await montar()); }
return resultados;
