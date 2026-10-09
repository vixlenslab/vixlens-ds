// Stub mínimo da Plugin API do Figma, só o que o construtor usa.
// Serve para rodar o construtor fora do Figma e conferir a lógica: quantos
// separadores, de que tipo, quantas linhas, se estoura o rodapé.

const LARGURA_CHAR = { 22: 12.5, 9: 5.2, 8: 4.6, 7.5: 4.3, 7: 4.0, 6.5: 3.7, 6: 3.4, 5.5: 3.1, 5: 2.9 };

class No {
  constructor(tipo, nome) {
    this.type = tipo;
    this.name = nome || '';
    this.children = [];
    this.parent = null;
    this.x = 0; this.y = 0;
    this.width = 0; this.height = 0;
    this.fills = []; this.strokes = [];
    this.id = tipo + ':' + (No.seq = (No.seq || 0) + 1);
    this.layoutMode = 'NONE';
    this.itemSpacing = 0;
    this.paddingTop = 0; this.paddingBottom = 0; this.paddingLeft = 0; this.paddingRight = 0;
    this.counterAxisSpacing = 0;
    this._sizingH = 'HUG'; this._sizingV = 'HUG';
  }
  appendChild(n) {
    if (n.parent) n.parent.children = n.parent.children.filter(c => c !== n);
    n.parent = this;
    this.children.push(n);
    this._medir();
  }
  remove() {
    if (this.parent) this.parent.children = this.parent.children.filter(c => c !== this);
    this.parent = null;
  }
  resize(w, h) { this.width = w; this.height = h; this._subir(); }
  // rescale escala o nó e os filhos (resize não). O construtor usa nos logos.
  rescale(k) {
    this.width *= k; this.height *= k;
    for (const c of this.children) c.rescale(k);
    this._subir();
  }
  clone() {
    const n = this instanceof Texto ? new Texto() : new No(this.type, this.name);
    n.width = this.width; n.height = this.height; n.layoutMode = this.layoutMode;
    for (const c of this.children) { const k = c.clone(); k.parent = n; n.children.push(k); }
    return n;
  }
  set layoutSizingHorizontal(v) { this._sizingH = v; this._medir(); }
  get layoutSizingHorizontal() { return this._sizingH; }
  set layoutSizingVertical(v) { this._sizingV = v; this._medir(); }
  get layoutSizingVertical() { return this._sizingV; }

  // Mede como auto-layout: VERTICAL empilha, HORIZONTAL enfileira (com wrap).
  _medir() {
    if (this.layoutMode === 'VERTICAL') {
      const alturas = this.children.reduce((a, c) => a + c.height, 0);
      this.height = this.paddingTop + this.paddingBottom + alturas + Math.max(0, this.children.length - 1) * this.itemSpacing;
      if (this._sizingH !== 'FIXED') {
        this.width = this.paddingLeft + this.paddingRight + Math.max(0, ...this.children.map(c => c.width));
      }
    } else if (this.layoutMode === 'HORIZONTAL') {
      const util = this.parent && this.parent.layoutMode === 'VERTICAL' && this._sizingH === 'FILL'
        ? this.parent.width - this.parent.paddingLeft - this.parent.paddingRight
        : Infinity;
      let linha = 0, linhas = 1, alturaLinha = 0, alturaTotal = 0, maior = 0;
      for (const c of this.children) {
        const larg = c.width + (linha > 0 ? this.itemSpacing : 0);
        if (this.layoutWrap === 'WRAP' && util !== Infinity && linha + larg > util - this.paddingLeft - this.paddingRight) {
          alturaTotal += alturaLinha + this.counterAxisSpacing;
          maior = Math.max(maior, linha);
          linha = c.width; alturaLinha = c.height; linhas++;
        } else {
          linha += larg;
          alturaLinha = Math.max(alturaLinha, c.height);
        }
      }
      maior = Math.max(maior, linha);
      this.height = this.paddingTop + this.paddingBottom + alturaTotal + alturaLinha;
      this._linhas = linhas;
      if (this._sizingH === 'FILL' && util !== Infinity) this.width = util;
      else if (this._sizingH !== 'FIXED') this.width = this.paddingLeft + this.paddingRight + maior;
    }
    this._subir();
  }
  _subir() { if (this.parent) this.parent._medir(); }
}

class Texto extends No {
  constructor() {
    super('TEXT', '');
    this._chars = '';
    this.fontSize = 12;
    this.fontName = { family: '', style: '' };
    this.textAutoResize = 'WIDTH_AND_HEIGHT';
    this.textTruncation = 'DISABLED';
    this.letterSpacing = { unit: 'PERCENT', value: 0 };
    this.textAlignHorizontal = 'LEFT';
  }
  set characters(v) {
    this._chars = v;
    this.name = v.slice(0, 40);
    if (this.textAutoResize !== 'NONE') {
      const linhas = v.split(' ');
      const larg = Math.max(...linhas.map(l => l.length)) * (LARGURA_CHAR[this.fontSize] || this.fontSize * 0.55);
      this.width = larg;
      this.height = this.fontSize * 1.3 * linhas.length;
      this._subir();
    }
  }
  get characters() { return this._chars; }
}

// Logos mestres (larguras de uma versão antiga, maiores que o padrão, para provar o rescale).
const MESTRES = { logo_uvplus: 27.2, logo_sunplus: 20.2, Camada_1: 59.8, logo_clear: 28.2, logo_shield: 32.5, logo_diamond: 43.3 };

export function montarFigma(nomesDePagina, opcoes = {}) {
  const pagina = new No('PAGE', 'Page 1');
  for (const nome of nomesDePagina) {
    const f = new No('FRAME', nome);
    f.width = 595; f.height = 842;
    pagina.appendChild(f);
    f.height = 842; f.width = 595; // frame de página não é auto-layout
  }
  if (opcoes.logos !== false) {
    const m = new No('FRAME', 'LOGOS // mestres');
    pagina.children.push(m); m.parent = pagina;
    for (const [nome, w] of Object.entries(MESTRES)) {
      const l = new No('FRAME', nome); l.width = w; l.height = w * 0.4;
      l.parent = m; m.children.push(l);
    }
  }
  pagina._medir = () => {};
  return {
    currentPage: pagina,
    createFrame() { const n = new No('FRAME', ''); return n; },
    createRectangle() { return new No('RECTANGLE', ''); },
    createText() { return new Texto(); },
    createAutoLayout(dir, o) {
      const n = new No('FRAME', (o && o.name) || '');
      n.layoutMode = dir;
      return n;
    },
    loadFontAsync: async () => {}
  };
}
