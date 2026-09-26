#!/usr/bin/env node
/**
 * Gera os exports de token (CSS + Tailwind preset) a partir da fonte única
 * `assets/tokens/vixlens-tokens.json`. NÃO edite os arquivos gerados na mão.
 *
 *   node scripts/build-tokens.mjs           # regenera os arquivos
 *   node scripts/build-tokens.mjs --check   # falha (exit 1) se estiverem fora de sync
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const JSON_PATH = join(root, 'assets/tokens/vixlens-tokens.json')
const CSS_PATH = join(root, 'assets/tokens/vixlens-tokens.css')
// .cjs e nao .js de proposito: o package.json do DS tem "type": "module", entao
// um .js com module.exports seria lido como ESM e quebraria. O .cjs e legivel
// tanto por `require` (config Tailwind 3 em CommonJS) quanto por `import`.
const PRESET_PATH = join(root, 'assets/tokens/vixlens-tailwind-preset.cjs')
const THEME_V4_PATH = join(root, 'assets/tokens/vixlens-theme-v4.css')

const t = JSON.parse(readFileSync(JSON_PATH, 'utf8'))
const val = (x) => (x && typeof x === 'object' ? x.value : x) // aceita {value} ou string cru
const isColor = (x) => x && typeof x === 'object' && typeof x.value === 'string'

// ---------- CSS ----------
function buildCss() {
  const L = []
  L.push('/* Vixlens Design System — tokens canônicos. GERADO por scripts/build-tokens.mjs.')
  L.push('   Fonte: assets/tokens/vixlens-tokens.json — NÃO edite este arquivo na mão, edite o JSON. */')
  L.push(`@import url('${t.typography['font-digital'].import}');`)
  L.push('')
  L.push(':root {')

  L.push('  /* cor */')
  for (const [k, v] of Object.entries(t.color)) {
    if (k === 'comment') continue
    if (isColor(v)) {
      L.push(`  --vix-${k}: ${v.value};`)
    } else if (k === 'gray') {
      for (const [g, gv] of Object.entries(v)) if (g !== 'comment') L.push(`  --vix-gray-${g}: ${gv.value};`)
    } else if (k === 'chart') {
      for (const [c, cv] of Object.entries(v)) if (c !== 'comment') L.push(`  --vix-chart-${c}: ${cv.value};`)
    } else if (k === 'reflecta') {
      for (const [r, rv] of Object.entries(v)) if (r !== 'comment') L.push(`  --vix-reflecta-${r}: ${rv.value};`)
    } else if (k === 'azul-tint') {
      for (const [a, av] of Object.entries(v)) if (a !== 'comment') L.push(`  --vix-azul-${a}: ${av.value};`)
    } else if (k === 'callout') {
      for (const [c, cv] of Object.entries(v)) {
        if (c === 'comment') continue
        L.push(`  --vix-callout-${c}-bg: ${cv.bg}; --vix-callout-${c}-bar: ${cv.bar};`)
      }
    }
  }

  L.push('  /* raio */')
  for (const [k, v] of Object.entries(t.radius)) if (k !== 'comment') L.push(`  --vix-radius-${k}: ${val(v)};`)

  L.push('  /* espaçamento (âncora 40px) */')
  for (const [k, v] of Object.entries(t.spacing)) {
    if (k === 'comment') continue
    if (k === 'anchor') L.push(`  --vix-anchor: ${val(v)};`)
    else L.push(`  --vix-${k}: ${val(v)};`)
  }

  L.push('  /* layout */')
  for (const [k, v] of Object.entries(t.layout)) if (k !== 'comment') L.push(`  --vix-${k}: ${val(v)};`)

  L.push('  /* tipografia */')
  L.push(`  --vix-font-digital: ${t.typography['font-digital'].value};`)
  L.push(`  --vix-font-print: ${t.typography['font-print'].value};`)
  for (const [lvl, s] of Object.entries(t.typography.scale)) {
    if (lvl === 'comment') continue
    L.push(`  --vix-font-${lvl}: ${s.desktop}; --vix-font-${lvl}-tablet: ${s.tablet}; --vix-font-${lvl}-mobile: ${s.mobile};`)
  }

  L.push('}')
  return L.join('\n') + '\n'
}

// ---------- Derivacoes compartilhadas ----------
// Calculadas UMA vez e consumidas pelo preset (Tailwind 3) e pelo @theme
// (Tailwind 4). E o que garante que as duas versoes nao divirjam: se algo so
// existisse num dos dois, seria por esquecimento, e esquecimento e o modo de
// falha que este arquivo existe pra impedir.

// Cores da marca, na forma aninhada que o Tailwind 3 espera.
function brandColors() {
  const colors = {}
  for (const [k, v] of Object.entries(t.color)) {
    if (k === 'comment') continue
    if (isColor(v)) colors[`vix-${k}`] = v.value
    else if (k === 'gray') colors['vix-gray'] = Object.fromEntries(Object.entries(v).filter(([g]) => g !== 'comment').map(([g, gv]) => [g, gv.value]))
    else if (k === 'chart') colors['vix-chart'] = Object.fromEntries(Object.entries(v).filter(([c]) => c !== 'comment').map(([c, cv]) => [c, cv.value]))
    else if (k === 'reflecta') colors.reflecta = Object.fromEntries(Object.entries(v).filter(([r]) => r !== 'comment').map(([r, rv]) => [r, rv.value]))
    else if (k === 'azul-tint') for (const [a, av] of Object.entries(v)) if (a !== 'comment') colors[`vix-azul-${a}`] = av.value
    else if (k === 'callout') {
      const co = {}
      for (const [c, cv] of Object.entries(v)) if (c !== 'comment') { co[`${c}-bg`] = cv.bg; co[`${c}-bar`] = cv.bar }
      colors['vix-callout'] = co
    }
  }
  // `cinza-borda` e o cinza de texto secundario, placeholder E borda. O nome do
  // token so conta a ultima funcao, entao o config antigo do site expunha ele
  // tambem como `vix-cinza` — e ha uso com esse nome (placeholder do Input,
  // texto de apoio). Apelido do MESMO token: quem some com isto quebra a cor em
  // silencio (foi o que aconteceu no 7fa4a02), quem duplica o valor cria drift.
  colors['vix-cinza'] = t.color['cinza-borda'].value
  return colors
}

// As mesmas cores, achatadas em pares nome->valor (o Tailwind 4 nao aninha).
function flatBrandColors() {
  const out = []
  for (const [k, v] of Object.entries(brandColors())) {
    if (typeof v === 'string') out.push([k, v])
    else for (const [sub, sv] of Object.entries(v)) out.push([`${k}-${sub}`, sv])
  }
  return out
}

// Ponte shadcn: nomes semanticos apontando para as CSS vars definidas em
// theme.css. Sem isto, componente shadcn do DS instalado numa tela nasce sem cor.
const SHADCN = ['border', 'input', 'ring', 'background', 'foreground']
const SHADCN_PAR = ['primary', 'secondary', 'muted', 'accent', 'destructive', 'popover', 'card']

function shadcnColorsV3() {
  const c = {}
  for (const n of SHADCN) c[n] = `hsl(var(--${n}) / <alpha-value>)`
  for (const n of SHADCN_PAR) {
    c[n] = { DEFAULT: `hsl(var(--${n}) / <alpha-value>)`, foreground: `hsl(var(--${n}-foreground) / <alpha-value>)` }
  }
  return c
}

const borderRadius = () => ({
  ...Object.fromEntries(Object.entries(t.radius).filter(([k]) => k !== 'comment').map(([k, v]) => [`vix-${k}`, val(v)])),
  xl: 'calc(var(--radius) + 4px)',
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
})

// space-1 vira vix-1, nao 1: sobrescrever a escala padrao do Tailwind faria
// p-4 mudar de significado em toda tela que instalasse o preset.
const spacing = () => Object.fromEntries(
  Object.entries(t.spacing).filter(([k]) => k.startsWith('space-')).map(([k, v]) => [k.replace('space-', 'vix-'), val(v)]),
)

const maxWidth = () => ({ 'vix-produto': val(t.layout['container-produto']), 'vix-site': val(t.layout['container-ds-site']) })

// Escala tipografica: cada nivel vira text-vix-<nivel> (desktop, xl), -t (tablet, lg)
// e -m (mobile), carregando tamanho, entrelinha, peso e tracking juntos.
// Uso: text-vix-h1-m lg:text-vix-h1-t xl:text-vix-h1
function typeScale() {
  const out = []
  for (const [k, v] of Object.entries(t.typography.scale)) {
    if (k === 'comment') continue
    const meta = {
      lineHeight: v.lineHeight ? String(parseInt(v.lineHeight, 10) / 100) : '1.4',
      fontWeight: String(v.weight),
      letterSpacing: v.tracking || '0em',
    }
    out.push([`vix-${k}`, v.desktop, meta])
    out.push([`vix-${k}-t`, v.tablet, meta])
    out.push([`vix-${k}-m`, v.mobile, meta])
  }
  // xs/sm/base ligados ao token: e o que o shadcn usa na UI.
  const s = t.typography.scale
  out.push(['xs', s.caption.desktop, { lineHeight: '1rem' }])
  out.push(['sm', s.label.desktop, { lineHeight: '1.25rem' }])
  out.push(['base', s.paragraph.desktop, { lineHeight: '1.5rem' }])
  return out
}

const FONTS = {
  vix: ['Host Grotesk', 'sans-serif'],
  'vix-print': ['Montserrat', 'Mont', 'sans-serif'],
}

// ---------- Tailwind 3: preset ----------
function buildPreset() {
  const colors = { ...brandColors(), ...shadcnColorsV3() }
  const fontSize = Object.fromEntries(typeScale().map(([k, size, meta]) => [k, [size, meta]]))

  const j = (o) => JSON.stringify(o, null, 2).replace(/"([\w-]+)":/g, "'$1':").replace(/"/g, "'")
  return (
    `// Vixlens DS — Tailwind 3 preset. GERADO por scripts/build-tokens.mjs (fonte: vixlens-tokens.json).\n` +
    `// uso: presets: [require('./vixlens-tailwind-preset.cjs')]\n` +
    `// Tailwind 4? use assets/tokens/vixlens-theme-v4.css.\n` +
    `module.exports = {\n` +
    `  theme: {\n` +
    `    extend: {\n` +
    `      colors: ${j(colors).replace(/\n/g, '\n      ')},\n` +
    `      borderColor: { DEFAULT: 'hsl(var(--border))' },\n` +
    `      borderRadius: ${j(borderRadius()).replace(/\n/g, '\n      ')},\n` +
    `      spacing: ${j(spacing()).replace(/\n/g, '\n      ')},\n` +
    `      maxWidth: ${j(maxWidth()).replace(/\n/g, '\n      ')},\n` +
    `      fontFamily: ${j(FONTS).replace(/\n/g, '\n      ')},\n` +
    `      fontSize: ${j(fontSize).replace(/\n/g, '\n      ')},\n` +
    `    },\n` +
    `  },\n` +
    `}\n`
  )
}

// ---------- Tailwind 4: bloco @theme ----------
// O Tailwind 4 tirou a configuracao do JavaScript e botou no CSS, e removeu a
// chave `presets`. Nao ha onde plugar o preset acima — por isso a mesma
// derivacao sai tambem neste formato, gerada do mesmo JSON.
function buildThemeV4() {
  const L = []
  L.push('/* Vixlens Design System — tema para Tailwind 4. GERADO por scripts/build-tokens.mjs.')
  L.push('   Fonte: assets/tokens/vixlens-tokens.json — NÃO edite este arquivo na mão, edite o JSON.')
  L.push('')
  L.push('   Uso no globals.css da tela, nesta ordem:')
  L.push('')
  L.push('     @import "tailwindcss";')
  L.push('     @import "vixlens-ds/theme.css";      -- valores das CSS vars')
  L.push('     @import "vixlens-ds/tailwind.css";   -- este arquivo: vars viram utilitario')
  L.push('')
  L.push('   Equivalente ao vixlens-tailwind-preset.cjs, que serve o Tailwind 3. */')
  L.push('')
  L.push('@theme inline {')

  L.push('  /* cor — marca */')
  for (const [k, v] of flatBrandColors()) L.push(`  --color-${k}: ${v};`)

  L.push('')
  L.push('  /* cor — ponte shadcn (as vars vem do theme.css) */')
  for (const n of SHADCN) L.push(`  --color-${n}: hsl(var(--${n}));`)
  for (const n of SHADCN_PAR) {
    L.push(`  --color-${n}: hsl(var(--${n}));`)
    L.push(`  --color-${n}-foreground: hsl(var(--${n}-foreground));`)
  }

  L.push('')
  L.push('  /* raio */')
  for (const [k, v] of Object.entries(borderRadius())) L.push(`  --radius-${k}: ${v};`)

  L.push('')
  L.push('  /* espaçamento */')
  for (const [k, v] of Object.entries(spacing())) L.push(`  --spacing-${k}: ${v};`)

  L.push('')
  L.push('  /* largura de container */')
  for (const [k, v] of Object.entries(maxWidth())) L.push(`  --container-${k}: ${v};`)

  L.push('')
  L.push('  /* família tipográfica */')
  for (const [k, v] of Object.entries(FONTS)) L.push(`  --font-${k}: ${v.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')};`)

  L.push('')
  L.push('  /* escala tipográfica */')
  for (const [k, size, meta] of typeScale()) {
    L.push(`  --text-${k}: ${size};`)
    if (meta.lineHeight) L.push(`  --text-${k}--line-height: ${meta.lineHeight};`)
    if (meta.fontWeight) L.push(`  --text-${k}--font-weight: ${meta.fontWeight};`)
    if (meta.letterSpacing) L.push(`  --text-${k}--letter-spacing: ${meta.letterSpacing};`)
  }

  L.push('}')
  L.push('')
  L.push('/* A borda padrão de todo elemento. No Tailwind 3 isto sai do preflight via')
  L.push('   borderColor.DEFAULT; no 4 o preflight usa currentColor, então declaramos.')
  L.push('   Dentro de @layer base de propósito: no Tailwind 4, CSS sem camada vence as')
  L.push('   utilitárias, e esta regra apagaria todo border-vix-* e border-gray-*. */')
  L.push('@layer base {')
  L.push('  *, ::before, ::after, ::backdrop, ::file-selector-button {')
  L.push('    border-color: hsl(var(--border));')
  L.push('  }')
  L.push('')
  L.push('  /* O preflight do Tailwind 4 trocou o cursor dos botões para `default`.')
  L.push('     Os componentes do DS foram desenhados com a mãozinha do Tailwind 3. */')
  L.push('  button:not(:disabled), [role="button"]:not(:disabled) {')
  L.push('    cursor: pointer;')
  L.push('  }')
  L.push('}')
  return L.join('\n') + '\n'
}

const outputs = [
  [CSS_PATH, buildCss()],
  [PRESET_PATH, buildPreset()],
  [THEME_V4_PATH, buildThemeV4()],
]
const norm = (s) => s.replace(/\r\n/g, '\n')

if (process.argv.includes('--check')) {
  let drift = false
  for (const [path, content] of outputs) {
    const current = norm(readFileSync(path, 'utf8'))
    if (current !== norm(content)) {
      drift = true
      console.error(`✗ DRIFT: ${path.replace(root, '.')} está fora de sync com o JSON. Rode: npm run tokens:build`)
    }
  }
  if (drift) process.exit(1)
  console.log('✓ tokens em sync (CSS + preset Tailwind 3 + @theme Tailwind 4 batem com o JSON)')
} else {
  for (const [path, content] of outputs) {
    writeFileSync(path, content)
    console.log(`✓ gerado ${path.replace(root, '.')}`)
  }
}
