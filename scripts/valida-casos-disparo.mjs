#!/usr/bin/env node
/**
 * Confere docs/skills/casos-de-disparo.json:
 *  - todo nome de skill citado existe em plugins/*​/skills/
 *  - todo caso tem id único e um pedido
 *  - toda skill tem pelo menos 2 casos que devem acionar e 1 que não deve
 *
 * Existe para a lista não envelhecer: skill nova ou renomeada sem caso aqui aparece como erro.
 * Não testa se a skill dispara de verdade: isso só dá para ver numa sessão limpa (docs/skills/disparo.md).
 *
 * Uso: node scripts/valida-casos-disparo.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const skills = new Set()
for (const p of readdirSync('plugins', { withFileTypes: true })) {
  const dir = join('plugins', p.name, 'skills')
  if (!p.isDirectory() || !existsSync(dir)) continue
  for (const s of readdirSync(dir, { withFileTypes: true })) if (s.isDirectory()) skills.add(s.name)
}

const { casos } = JSON.parse(readFileSync('docs/skills/casos-de-disparo.json', 'utf8'))
const erros = []
const ids = new Set()
const positivos = Object.fromEntries([...skills].map((s) => [s, 0]))
const negativos = Object.fromEntries([...skills].map((s) => [s, 0]))

for (const c of casos) {
  if (!c.id || !c.pedido) erros.push(`caso sem id ou pedido: ${JSON.stringify(c).slice(0, 80)}`)
  if (ids.has(c.id)) erros.push(`id repetido: ${c.id}`)
  ids.add(c.id)
  for (const s of c.acionar ?? []) {
    if (!skills.has(s)) erros.push(`${c.id}: acionar cita "${s}", que não existe`)
    else positivos[s]++
  }
  for (const s of c.nao_acionar ?? []) {
    if (!skills.has(s)) erros.push(`${c.id}: nao_acionar cita "${s}", que não existe`)
    else negativos[s]++
  }
  const dup = (c.acionar ?? []).filter((s) => (c.nao_acionar ?? []).includes(s))
  if (dup.length) erros.push(`${c.id}: ${dup.join(', ')} está em acionar e em nao_acionar`)
}
for (const s of skills) {
  if (positivos[s] < 2) erros.push(`${s}: só ${positivos[s]} caso(s) que devem acioná-la (mínimo 2)`)
  if (negativos[s] < 1) erros.push(`${s}: nenhum caso que não deve acioná-la (mínimo 1)`)
}

if (erros.length) {
  console.error(`${erros.length} erro(s):\n`)
  for (const e of erros) console.error(`  x ${e}`)
  process.exit(1)
}
const pend = casos.filter((c) => c.decisao_pendente).length
console.log(`ok — ${casos.length} casos para ${skills.size} skills (${pend} com decisão pendente)`)
