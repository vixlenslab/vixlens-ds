// Construtor de página de família — cole em use_figma.
// Ajuste CONFIG e DADOS (ou BLOCOS). O resto é fixo.
//
// DADOS: uma linha por registro, campos separados por ~
//   produto: cod~indice~nome~diam~esfMais~esfMenos~p1~p2~p3~p4[~altura]
//   cores:   SUB~codigo Cor | codigo Cor | ...
//
// PADRÃO 0.14 (modelo do Toninho): cabeçalho de 3 linhas, banner enxuto com gráfico e
// tratamentos, destaque Transitions Gen S e cor por família. Detalhes em
// referencia-cabecalho-banner.md. Os LOGOS de tratamento não são desenhados aqui:
// copie para a página de destino o frame 'LOGOS // mestres' (com logo_uvplus,
// logo_sunplus, Camada_1, logo_clear, logo_shield, logo_diamond); sem ele o banner
// sai sem logos e o retorno avisa.
//
// O 11o campo, altura, é obrigatório quando CONFIG.altura === 'varia' e
// ignorado nos outros casos. Ver "Altura" em referencia-tabela.md.
// Campo de preço vazio vira travessão. Cod vazio vira seta quando houver linha
// de cores logo abaixo.
//
// PÁGINA AGRUPADA: famílias pequenas e parecidas podem dividir uma página.
// Em vez de DADOS, declare BLOCOS — e o separador passa a ser por família, não
// por índice (o índice continua no chip de cada linha):
//
//   const BLOCOS = [
//     { nome: 'EYETECH DESKVIEW ATÉ 1,3M', cor: '#0E8A5F', dados: `...` },
//     { nome: 'EYETECH DESKVIEW ATÉ 2M',   cor: '#3FA96E', dados: `...` }
//   ];
//
// Quando as famílias divergem em cilindro, adição ou disponibilidade de
// Express, essas pílulas descem do cabeçalho para o separador do bloco:
//   { nome: '...', cor: '...', pilulas: ['Cil. até -4.00'], dados: `...` }
// O cabeçalho da página fica só com o que é comum a todas.

const CONFIG = {
  pagina: '06 OPTIMA PRO (1/2)',
  familia: 'OPTIMA PRO',
  titulo: null,             // título exibido; null usa familia. Use na continuação
  tag: 'MULTIFOCAL FREEFORM PREMIUM', // chip branco ao lado do título: o TIPO da lente
                            // (MULTIFOCAL FREEFORM | VISÃO SIMPLES SURFAÇADA | OCUPACIONAL |
                            // VISÃO SIMPLES ESPECIAL | BIFOCAL SURFAÇADA)
  tipo: 'LENTES MULTIFOCAIS SURFAÇADAS', // legado: não é mais impresso; vira a tag se ela faltar
  cor: '#D94F2B',
  altura: '16 mm',          // 'NN mm' | 'varia' | null
  cilindro: '-6.00',        // vira pílula no cabeçalho
  adicao: '0.50 a 5.00',    // vira pílula; null em visão simples
  selo: 'ÓTICAS NATIVE',    // quem assina a lente; 'LINHA VIXLENS' quando não é marca própria
  antirreflexo: 'Reflecta', // marca do AR nas colunas de preço
  semExpress: false,        // true quando a família inteira não tem o AR de entrada
  semSeparadorIndice: false,// tira os separadores de índice: ~21px cada, e é o
                            // que faz uma família de duas páginas caber em uma
  alturaImagem: 120,        // ponto de partida; o slot cresce até preencher a página
                            // 0 = família sem banner (só cabeçalho + tabela)
  graficoPadrao: null,      // chave de GRAFICOS ('essencial' | 'plus' | 'advanced' | 'premium' |
                            // 'eliteia' | 'vs' | 'vshd' | 'relax050' | 'relax075' | 'relax10' |
                            // 'office'); null = sem gráfico (Astera, Bifocais)
  grafico: null,            // sobrescreve o padrão: { titulo, linhas: [[rotulo, fracao 0-1], ...] }
  colunaGrafico: 25,        // 25 pt por coluna; 20 quando há rosto/olhos na foto
  tratamentos: ['uv', 'sun', 'transitions', 'clear', 'shield', 'diamond'], // Office: sem sun/transitions
  simbolos: true,           // padrao da casa; false volta para "Diâm." e "Alt."
  centavos: false           // preços sem casas decimais
};

const DADOS = `15075~1.49~Resina~80~+6~-10~R$ 2.098,54~R$ 2.356,79~R$ 2.844,88~R$ 3.845,86
SUB~15110 Marrom | 15111 G15 | 15112 Black`;

// Página agrupada: declare BLOCOS no lugar de DADOS. Deixe null para a página
// de família única, que é o caso normal.
const BLOCOS = null;

// Normaliza os dois modos num só: daqui para baixo o script só conhece blocos.
const blocos = BLOCOS && BLOCOS.length
  ? BLOCOS
  : [{ nome: CONFIG.familia, cor: CONFIG.cor, pilulas: null, dados: DADOS }];
const AGRUPADA = blocos.length > 1;

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
// 18% da cor sobre branco (padrão do Toninho; era 20%). O chip de índice tem 6.5pt, e
// os 4.5:1 do WCAG foram calibrados para 14pt: com preenchimento na cor cheia, o número
// some no balcão. Tintado, o texto #2F2F2F fica acima de 9:1 em qualquer cor escura.
const tinta18 = h => {
  const c = canais(h);
  const v = x => ('0' + Math.round(0.18 * x + 0.82 * 255).toString(16)).slice(-2);
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

const GRADIENTE_GENS = [[0, '#fcbe95'], [0.33, '#ff766e'], [0.67, '#cb81c0'], [1, '#96ccdc']];
const paradas = lista => lista.map(p => ({ position: p[0], color: Object.assign(rgb(p[1]), { a: 1 }) }));
const IMG_Y = 124;          // banner sempre em y=124; o cabeçalho (96) sobe para y=20

// Valores do gráfico: PADRÃO DE CADA FAMÍLIA, iguais para qualquer cliente. Não vêm do CSV.
// Fração da largura da barra (n/7 no gráfico mestre; a VS HD usa 5 passos).
const PERTO = ['Perto', 'Intermediário', 'Longe'];
const ATRIB = ['Liberdade de armações', 'Conforto visual', 'Uso constante de telas', 'Refinamento Estético'];
const F80_NA = 'Até 80% de redução na fadiga ocular', F80_DA = 'Até 80% de redução da fadiga ocular';
const sete = (...n) => n.map(x => x / 7);
const dist = v => ({ titulo: 'Distribuição da visão', linhas: PERTO.map((r, i) => [r, v[i]]) });
const atr = (rotulos, v) => ({ titulo: 'Atributos', linhas: rotulos.map((r, i) => [r, v[i]]) });
const GRAFICOS = {
  essencial: dist(sete(2, 2, 2)),
  plus: dist(sete(3, 2, 3)),
  advanced: dist(sete(4, 4, 3)),
  premium: dist(sete(5, 5, 4)),
  eliteia: dist(sete(7, 7, 7)),
  vs: atr(ATRIB, sete(3, 3, 0.4, 0.4)),
  vshd: atr(ATRIB.concat([F80_DA]), [0.8, 0.8, 0.8, 0.6, 0.6]),
  relax050: atr(ATRIB.concat([F80_NA]), sete(4, 5, 5, 5).concat([0.6])),
  relax075: atr(ATRIB, sete(4, 5, 5, 5)),
  relax10: atr(ATRIB, sete(4, 5, 5, 5)),
  office: atr(['Liberdade de armações', 'Facilidade de adaptação', 'Conforto visual',
               'Amplitude no campo de perto', 'Refinamento Estético'], sete(4, 4, 4, 4, 3))
};
const GRAFICO = CONFIG.grafico || (CONFIG.graficoPadrao ? GRAFICOS[CONFIG.graficoPadrao] : null);
if (CONFIG.graficoPadrao && !GRAFICO) throw new Error('graficoPadrao desconhecido: ' + CONFIG.graficoPadrao);

// Logos de tratamento: um tamanho só em TODAS as páginas (largura em pt).
const LOGOS = { uv: ['logo_uvplus', 23.1], sun: ['logo_sunplus', 17.2], transitions: ['Camada_1', 50.8],
                clear: ['logo_clear', 23.9], shield: ['logo_shield', 27.6], diamond: ['logo_diamond', 36.8] };

// Índices de refração que a família tem: saem do próprio CSV e viram a linha de disponibilidade.
const INDICES = [];
for (const b of blocos) {
  for (const l of b.dados.trim().split('\n')) {
    const d = l.split('~');
    if (d[0] !== 'SUB' && d[1] && INDICES.indexOf(d[1]) < 0) INDICES.push(d[1]);
  }
}

const SOBRE_COR = contraste(CONFIG.cor);
const FUNDO_CHIP = tinta18(CONFIG.cor);

const texto = (parent, chars, style, size, cor) => {
  const t = figma.createText();
  t.fontName = { family: 'Host Grotesk', style };
  t.fontSize = size; t.characters = chars; t.fills = fill(cor);
  parent.appendChild(t);
  return t;
};

// Cabeçalho em TRÊS linhas (padrão do Toninho): 1) nome + chip do tipo; 2) chips de dados;
// 3) disponibilidade. Altura final 96, por isso sobe para y=20 e o banner fica em y=124.
// Nada de wrap: as pílulas de dados descem para a linha 2, que é o que impede nome longo
// com três pílulas de estourar os 523px úteis.
const hdr = figma.createAutoLayout('VERTICAL', { name: 'Header' });
hdr.fills = fill(CONFIG.cor); hdr.cornerRadius = 20;
hdr.paddingTop = 12; hdr.paddingBottom = 12; hdr.paddingLeft = 16; hdr.paddingRight = 16; hdr.itemSpacing = 6;
page.appendChild(hdr);
hdr.x = 20; hdr.y = 20; hdr.resize(555, hdr.height); hdr.layoutSizingHorizontal = 'FIXED';

const linhaTitulo = figma.createAutoLayout('HORIZONTAL', { name: 'titulo' });
linhaTitulo.itemSpacing = 10; linhaTitulo.counterAxisAlignItems = 'CENTER'; linhaTitulo.fills = [];
hdr.appendChild(linhaTitulo);
texto(linhaTitulo, CONFIG.titulo || CONFIG.familia, 'ExtraBold', 22, SOBRE_COR);

// Chip do tipo: branco sólido, texto escuro. Cabeçalho claro (texto preto) inverte para não sumir.
const CLARO = SOBRE_COR === '#000000';
const tag = figma.createAutoLayout('HORIZONTAL', { name: 'Tag' });
tag.fills = fill(CLARO ? '#000000' : '#FFFFFF'); tag.cornerRadius = 100;
tag.paddingTop = 3.5; tag.paddingBottom = 3.5; tag.paddingLeft = 9; tag.paddingRight = 9;
linhaTitulo.appendChild(tag);
texto(tag, CONFIG.tag || String(CONFIG.tipo || '').replace(/^LENTES( DE)? /, '').replace(/ SURFAÇADAS?$/, ''), 'Bold', 7, CLARO ? '#FFFFFF' : '#000000');

// Chips de dados: branco a 16% com texto branco (preto a 16% com texto preto em cabeçalho
// claro). As constantes da família ficam aqui, não na linha: repetir cilindro e adição em
// toda linha gastava 23% da largura da tabela para dizer sempre a mesma coisa.
const linhaDados = figma.createAutoLayout('HORIZONTAL', { name: 'dados' });
linhaDados.itemSpacing = 10; linhaDados.counterAxisAlignItems = 'CENTER'; linhaDados.fills = [];
const pilula = rotulo => {
  const f = figma.createAutoLayout('HORIZONTAL', { name: 'pilula' });
  f.fills = [{ type: 'SOLID', color: rgb(CLARO ? '#000000' : '#FFFFFF'), opacity: 0.16 }]; f.cornerRadius = 100;
  f.paddingTop = 4; f.paddingBottom = 4; f.paddingLeft = 10; f.paddingRight = 10;
  linhaDados.appendChild(f);
  texto(f, rotulo, 'Bold', 9, SOBRE_COR);
};
if (CONFIG.altura) pilula(CONFIG.altura === 'varia' ? 'Alt. mín. varia por lente' : 'Alt. mín. ' + CONFIG.altura);
if (CONFIG.cilindro) pilula('Cil. até ' + CONFIG.cilindro);
if (CONFIG.adicao) pilula('Add. ' + CONFIG.adicao);
// A coluna sumiu: a pílula é o que impede o balconista de achar que o preço
// do AR de entrada foi esquecido.
if (SEM_EXPRESS) pilula('Sem ' + AR + ' Express');
if (linhaDados.children.length) hdr.appendChild(linhaDados);

// Linha 3: Bold 8, sem chip. Os índices saem do CSV. Linha Vixlens prefixa o selo.
const prefixoLinha = CONFIG.selo === 'LINHA VIXLENS' ? 'LINHA VIXLENS' : '';
const disp = INDICES.length ? 'Disponibilidade ' + INDICES.join(' | ') : '';
const linhaDisp = (prefixoLinha && disp) ? prefixoLinha + ' // ' + disp : (prefixoLinha || disp);
if (linhaDisp) texto(hdr, linhaDisp, 'Bold', 8, SOBRE_COR);

// BANNER ENXUTO. O nome, o tipo e a disponibilidade vivem só no cabeçalho colorido: o
// banner traz apenas o gráfico (à esquerda) e os tratamentos, cada um com seu rótulo.
// O slot é elástico: nasce com alturaImagem e cresce no fim para consumir a sobra. A foto
// entra como fill do frame 'IMG // …'; o Overlay escurece a esquerda para o texto ler.
let img = null, legendaImg = null, overlay = null;
const avisos = [];
const rotulo = txt => {
  const t = figma.createText();
  t.fontName = { family: 'Host Grotesk', style: 'Bold' };
  t.characters = txt; t.fontSize = 8; t.lineHeight = { unit: 'PIXELS', value: 10 };
  t.fills = [{ type: 'SOLID', color: rgb('#FFFFFF'), opacity: 0.7 }]; t.name = txt;
  return t;
};
const grupo = nome => {
  const g = figma.createAutoLayout('VERTICAL', { name: nome });
  g.itemSpacing = 5; g.fills = [];   // createAutoLayout nasce com fill BRANCO: sempre zerar
  return g;
};

// Gráfico: linhas de 11pt, barra de 5 colunas, linhas de 0,3 mm (0,85pt) a 30% de branco.
const LINHA_FINA = 0.3 / 25.4 * 72;
const montarGrafico = g => {
  const RH = 11, COL = CONFIG.colunaGrafico || 25, BAR = COL * 5;
  const maxCh = Math.max.apply(null, g.linhas.map(l => l[0].length));
  const LABEL = Math.max(72, Math.round(3.6 * maxCh + 4));
  const col = figma.createAutoLayout('VERTICAL', { name: 'Características' });
  col.itemSpacing = 0; col.fills = [];
  for (const l of g.linhas) {
    const row = figma.createAutoLayout('HORIZONTAL', { name: l[0] });
    row.itemSpacing = 0; row.fills = []; row.counterAxisAlignItems = 'CENTER';
    col.appendChild(row);
    const t = figma.createText();
    t.fontName = { family: 'Host Grotesk', style: 'Regular' };
    t.fontSize = 7; t.characters = l[0]; t.fills = fill('#FFFFFF');
    row.appendChild(t);
    t.textAutoResize = 'NONE'; t.resize(LABEL, RH); t.textAlignVertical = 'CENTER';
    const barra = figma.createFrame();
    barra.name = 'Barra'; barra.fills = []; barra.resize(BAR, RH);
    row.appendChild(barra);
    const trilho = figma.createRectangle();
    trilho.name = 'Trilho'; trilho.resize(BAR, 7); trilho.y = 2.5; trilho.x = 0;
    trilho.fills = [{ type: 'SOLID', color: rgb('#FFFFFF'), opacity: 0.07 }];
    barra.appendChild(trilho);
    const valor = figma.createRectangle();
    valor.name = 'Valor'; valor.resize(Math.max(1, l[1] * BAR), 7); valor.y = 2.5; valor.x = 0;
    valor.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [
      { position: 0, color: { r: 0.75, g: 0.78, b: 0.85, a: 0.18 } },
      { position: 0.55, color: { r: 0.4745098, g: 0.7803922, b: 0.6431373, a: 1 } },
      { position: 1, color: { r: 0.05098039, g: 0.29803922, b: 0.26666668, a: 1 } }] }];
    barra.appendChild(valor);
    for (let k = 1; k <= 5; k++) {   // 5 divisórias; a do início (k=0) é suprimida
      const d = figma.createRectangle();
      d.name = 'Divisória'; d.resize(LINHA_FINA, RH); d.y = 0;
      d.x = Math.min(k * COL, BAR - LINHA_FINA);
      d.fills = [{ type: 'SOLID', color: rgb('#FFFFFF'), opacity: 0.3 }];
      barra.appendChild(d);
    }
    const sep = figma.createRectangle();   // linha separadora sob o rótulo, absoluta na row
    sep.name = 'Linha separadora'; sep.resize(LABEL, LINHA_FINA);
    sep.fills = [{ type: 'SOLID', color: rgb('#FFFFFF'), opacity: 0.3 }];
    row.appendChild(sep); sep.layoutPositioning = 'ABSOLUTE'; sep.x = 0; sep.y = RH - LINHA_FINA;
  }
  return col;
};

// Tratamentos: clona os logos do frame 'LOGOS // mestres' e usa um tamanho só.
const montarTratamentos = vertical => {
  const mestre = figma.currentPage.children.find(n => n.type === 'FRAME' && n.name === 'LOGOS // mestres');
  if (!mestre) { avisos.push('SEM LOGOS: copie o frame "LOGOS // mestres" para a pagina de destino.'); return null; }
  const fila = figma.createAutoLayout(vertical ? 'VERTICAL' : 'HORIZONTAL', { name: 'Tratamentos' });
  fila.itemSpacing = vertical ? 12 : 10; fila.fills = []; fila.counterAxisAlignItems = vertical ? 'MIN' : 'CENTER';
  for (const chave of (CONFIG.tratamentos || ['uv', 'sun', 'transitions', 'clear', 'shield', 'diamond'])) {
    const par = LOGOS[chave];
    const origem = par && mestre.children.find(n => n.name === par[0]);
    if (!origem) { avisos.push('logo ausente no mestre: ' + chave); continue; }
    const c = origem.clone();
    fila.appendChild(c);
    if (Math.abs(par[1] / c.width - 1) > 0.005) c.rescale(par[1] / c.width);   // rescale, nunca resize
  }
  return fila;
};

if (CONFIG.alturaImagem > 0) {
  img = figma.createFrame();
  img.name = 'IMG // ' + CONFIG.familia;
  img.resize(555, CONFIG.alturaImagem);
  img.fills = fill('#1B2233'); img.strokes = fill('#FFFFFF'); img.strokeWeight = 1;
  img.dashPattern = [4, 4]; img.cornerRadius = 12; img.clipsContent = true;
  page.appendChild(img); img.x = 20; img.y = IMG_Y;
  overlay = figma.createRectangle();
  overlay.name = 'Overlay'; overlay.resize(555, CONFIG.alturaImagem);
  const azul = a => ({ r: 0.03, g: 0.05, b: 0.16, a: a });
  overlay.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [
    { position: 0, color: azul(0.96) }, { position: 0.28, color: azul(0.93) }, { position: 0.45, color: azul(0.70) },
    { position: 0.62, color: azul(0.38) }, { position: 1, color: azul(0.20) }] }];
  img.appendChild(overlay);
  legendaImg = texto(img, '[ IMAGEM FAMÍLIA ]', 'Bold', 9, '#FFFFFF');

  const alto = CONFIG.alturaImagem >= 300;   // banner de 340: tratamentos em coluna
  const cont = figma.createAutoLayout('VERTICAL', { name: 'Conteúdo' });
  cont.fills = []; cont.clipsContent = false;
  cont.paddingLeft = 16; cont.paddingTop = alto ? 24 : (CONFIG.alturaImagem >= 160 ? 18 : 10);
  cont.itemSpacing = CONFIG.alturaImagem >= 160 ? 14 : 12;
  img.appendChild(cont); cont.x = 0; cont.y = 0;
  if (GRAFICO) {
    const gA = grupo(GRAFICO.titulo);
    cont.appendChild(gA);
    gA.appendChild(rotulo(GRAFICO.titulo));
    gA.appendChild(montarGrafico(GRAFICO));
  }
  const fila = montarTratamentos(alto);
  if (fila) {
    const gT = grupo('Tratamentos (grupo)');
    cont.appendChild(gT);
    gT.appendChild(rotulo('Tratamentos'));
    gT.appendChild(fila);
  }
}

const tbl = figma.createAutoLayout('VERTICAL', { name: 'Tabela ' + CONFIG.familia });
tbl.fills = fill('#FFFFFF');
tbl.strokes = fill(NEUTRO); tbl.strokeWeight = 1;
tbl.cornerRadius = 20;
tbl.paddingTop = 8; tbl.paddingBottom = 6; tbl.paddingLeft = 10; tbl.paddingRight = 10; tbl.itemSpacing = 0;
page.appendChild(tbl);
tbl.x = 20;
tbl.y = img ? img.y + img.height + 14 : hdr.y + hdr.height + 10;
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
  const par = CORES[nome] || ['#545454', nome.charAt(0).toUpperCase()];
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
const chipIndice = (parent, ind, cor) => {
  cor = cor || CONFIG.cor;
  const c = figma.createFrame();
  c.name = ind ? 'ind ' + ind : 'ind vazio';
  c.resize(26, 13); c.cornerRadius = 4;
  parent.appendChild(c);
  if (!ind) { c.fills = []; c.strokes = []; return; }
  c.fills = fill(tinta18(cor));
  c.strokes = fill(cor); c.strokeWeight = 1;
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

// Numa página agrupada quem muda de bloco para bloco é a família, não o índice.
// A bolinha repete a cor da família, e as pílulas entram aqui quando divergem
// entre os blocos — cilindro, adição, ausência de Express.
const separadorFamilia = (nome, cor, pilulas) => {
  const s = figma.createAutoLayout('HORIZONTAL', { name: 'sep ' + nome });
  s.fills = []; s.itemSpacing = 7; s.counterAxisAlignItems = 'CENTER';
  s.paddingTop = 9; s.paddingBottom = 4; s.paddingLeft = 8; s.paddingRight = 8;
  tbl.appendChild(s); s.layoutSizingHorizontal = 'FILL';
  s.layoutWrap = 'WRAP'; s.counterAxisSpacing = 4;
  const dot = figma.createFrame();
  dot.name = 'cor'; dot.resize(9, 9); dot.cornerRadius = 100; dot.fills = fill(cor);
  s.appendChild(dot);
  const t = texto(s, nome, 'ExtraBold', 8, '#000000');
  t.letterSpacing = { unit: 'PERCENT', value: 6 };
  for (const p of (pilulas || [])) {
    const f = figma.createAutoLayout('HORIZONTAL', { name: 'pilula' });
    f.fills = fill('#000000'); f.cornerRadius = 100;
    f.paddingTop = 3; f.paddingBottom = 3; f.paddingLeft = 8; f.paddingRight = 8;
    s.appendChild(f);
    texto(f, p, 'Bold', 7, '#FFFFFF');
  }
  if (!pilulas || !pilulas.length) {
    const r = figma.createFrame();
    r.name = 'regua'; r.fills = fill(NEUTRO);
    s.appendChild(r); r.resize(60, 1); r.layoutSizingHorizontal = 'FILL';
  }
};

const genS = [];            // linhas Transitions Gen S: { row, sub } para a faixa lateral
let ultimoGenS = null;
let ultimoProduto = null, ultimaCelulaCod = null;
let indiceAtual = null, produtos = 0, linhasCor = 0, inline = 0, seps = 0;
let corDoBloco = CONFIG.cor;

for (const bloco of blocos) {
if (AGRUPADA) {
  corDoBloco = bloco.cor || CONFIG.cor;
  separadorFamilia(bloco.nome, corDoBloco, bloco.pilulas);
  seps++;
  indiceAtual = null;
}
const registros = bloco.dados.trim().split('\n').map(l => l.split('~'));

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
    if (ultimoGenS) ultimoGenS.sub = r;
    const esp = itens.some(m => ESPELHADO.indexOf(m[2]) > -1);
    const wrap = figma.createAutoLayout('HORIZONTAL', { name: 'cores' });
    wrap.itemSpacing = esp ? 10 : 6; wrap.counterAxisAlignItems = 'CENTER'; wrap.fills = [];
    r.appendChild(wrap);
    texto(wrap, 'COD:', 'Bold', 7, '#4A4A4A');
    for (const m of itens) bolinha(wrap, m[2], m[1], esp);
    linhasCor++;
    return;
  }

  // Na página agrupada o separador já é o da família, e em CONFIG.semSeparadorIndice
  // ele sai de propósito para a família caber numa página só.
  if (!AGRUPADA && !CONFIG.semSeparadorIndice && d[1] !== indiceAtual) {
    indiceAtual = d[1]; separador(indiceAtual); seps++;
  }

  const r = linha('#FFFFFF', 3);
  ultimaCelulaCod = celula(r, d[0], W[0], { alinha: d[0] ? 'LEFT' : 'CENTER' });
  chipIndice(r, d[1], corDoBloco);

  const prod = figma.createAutoLayout('HORIZONTAL', { name: 'produto' });
  prod.itemSpacing = 5; prod.counterAxisAlignItems = 'CENTER'; prod.fills = [];
  r.appendChild(prod);
  prod.resize(W[2], prod.height); prod.layoutSizingHorizontal = 'FIXED';
  // DESTAQUE TRANSITIONS GEN S (padrão de toda tabela): o texto perde o sufixo
  // ("Resina Transitions Gen S" -> "Resina"), entra a pílula com degradê ao lado do nome e,
  // no fim, a faixa lateral de 3px cobrindo a linha e a subrow de cores.
  const ehGenS = /Transitions Gen S/.test(d[2]);
  const nomeLimpo = ehGenS ? d[2].replace(/\s*Transitions Gen S\s*/, ' ').trim() : d[2];
  const nome = texto(prod, nomeLimpo || d[2], 'Regular', 8, TINTA);
  nome.letterSpacing = { unit: 'PERCENT', value: -4 };
  ultimoGenS = null;
  if (ehGenS) {
    const pg = figma.createAutoLayout('HORIZONTAL', { name: 'pilula Gen S' });
    pg.paddingLeft = 5; pg.paddingRight = 5; pg.paddingTop = 1; pg.paddingBottom = 1; pg.cornerRadius = 100;
    pg.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: paradas(GRADIENTE_GENS) }];
    prod.appendChild(pg);
    texto(pg, 'Transitions Gen S', 'Bold', 6, TINTA);
    ultimoGenS = { row: r, sub: null };
    genS.push(ultimoGenS);
  }
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
}

// Faixas Gen S: retângulo de 3px, degradê vertical, ABSOLUTE em x=4 na tabela. Posição pelo
// y da row (padding + alturas anteriores). Absoluta: se as linhas mudarem de lugar, a
// faixa NÃO acompanha — refaça pelo y da row.
const yRelativo = no => {
  let y = tbl.paddingTop;
  for (const c of tbl.children) { if (c === no) return y; y += c.height + tbl.itemSpacing; }
  return null;
};
for (const g of genS) {
  const y0 = yRelativo(g.row);
  const fim = g.sub ? yRelativo(g.sub) + g.sub.height : y0 + g.row.height;
  const st = figma.createRectangle();
  st.name = 'faixa Gen S'; st.resize(3, fim - y0); st.cornerRadius = 1.5;
  st.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[0, 1, 0], [-1, 0, 1]], gradientStops: paradas(GRADIENTE_GENS) }];
  tbl.appendChild(st); st.layoutPositioning = 'ABSOLUTE'; st.x = 4; st.y = y0;
}

// A imagem cresce para consumir a sobra; se não houver sobra, encolhe até o piso.
if (img) {
  const sobra = LIMITE - (tbl.y + tbl.height);
  const nova = Math.min(TETO_IMAGEM, Math.max(PISO_IMAGEM, Math.round(img.height + sobra)));
  img.resize(555, nova);
  if (overlay) overlay.resize(555, nova);
  tbl.y = img.y + nova + 14;
  legendaImg.x = 555 - 16 - legendaImg.width;     // legenda à direita: a esquerda é do gráfico
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
  linhasGenS: genS.length,
  grafico: GRAFICO ? GRAFICO.titulo + ' (' + GRAFICO.linhas.length + ' linhas)' : null,
  indicesDisponiveis: INDICES,
  avisosBanner: avisos,
  fimDaTabela: Math.round(fim),
  cabeNoRodape: fim <= LIMITE,
  aviso: fim > LIMITE ? 'ESTOUROU o rodapé. Quebrar a família em duas páginas num limite de índice.' : null
};
