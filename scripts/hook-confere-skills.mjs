#!/usr/bin/env node
/**
 * Hook do Claude Code (PostToolUse em Edit|Write): depois de mexer numa skill ou num construtor,
 * roda sozinho as conferências do repositório e devolve o erro para o Claude corrigir.
 *
 * É o mesmo papel do pre-push, só que na hora da edição, e não só no push.
 *
 * Entrada: o JSON do hook em stdin ({ tool_input: { file_path } }).
 * Saída: nada se estiver tudo certo; se algo falhar, um JSON { decision: "block", reason } em stdout,
 * que o Claude Code mostra ao Claude. Sempre sai com código 0: quem decide é o JSON.
 *
 * Só roda as conferências que existem em package.json, então funciona em qualquer ponto da história do repo.
 */
import { readFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const REGRAS = [
  { quando: /plugins\/[^/]+\/skills\/[^/]+\/SKILL\.md$/, rodar: ['skills:check', 'skills:casos'] },
  { quando: /skills\/(tabela-optica-figma|promovix)\/construtor\.js$/, rodar: ['test:construtor', 'test:paridade'] },
  { quando: /skills\/promovix\/montar\.py$/, rodar: ['test:montar'] },
  { quando: /skills\/tabela-optica-figma\/teste\/.+\.mjs$/, rodar: ['test:construtor'] },
]

function lerEntrada() {
  try {
    return JSON.parse(readFileSync(0, 'utf8'))
  } catch {
    return {}
  }
}

const entrada = lerEntrada()
const arquivo = String(entrada?.tool_input?.file_path ?? entrada?.tool_response?.filePath ?? '').replaceAll('\\', '/')
if (!arquivo) process.exit(0)

const regra = REGRAS.find((r) => r.quando.test(arquivo))
if (!regra) process.exit(0)

const scripts = existsSync('package.json') ? (JSON.parse(readFileSync('package.json', 'utf8')).scripts ?? {}) : {}
const falhas = []
const rodados = []

for (const nome of regra.rodar) {
  if (!scripts[nome]) continue
  rodados.push(nome)
  const r = spawnSync('npm', ['run', '-s', nome], { encoding: 'utf8', shell: process.platform === 'win32' })
  if (r.status !== 0) {
    const saida = `${r.stdout ?? ''}${r.stderr ?? ''}`.trim().split('\n').slice(-15).join('\n')
    falhas.push(`npm run ${nome} falhou:\n${saida}`)
  }
}

if (falhas.length) {
  const reason =
    `Você editou ${arquivo} e uma conferência do repositório falhou. Corrija antes de seguir.\n\n` + falhas.join('\n\n')
  process.stdout.write(JSON.stringify({ decision: 'block', reason }) + '\n')
}
process.exit(0)
