import { useState, useId } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { CodeBlock } from '../Copy.jsx'

// Playground reutilizável — controles ao vivo.
// Props:
//  - title: string
//  - controls: [{ key, label, type: 'select'|'toggle', options?: [{value,label}], default }]
//  - render: (state) => JSX  (preview do componente com o estado atual)
//  - code:   (state) => string (código correspondente ao estado, pra copiar)
export function Playground({ title, controls = [], render, code }) {
  const initial = {}
  for (const c of controls) initial[c.key] = c.default
  const [state, setState] = useState(initial)
  const uid = useId()

  const set = (key, value) => setState((s) => ({ ...s, [key]: value }))

  return (
    <div className="overflow-hidden rounded-vix-card border border-gray-200 bg-white">
      {title && (
        <div className="border-b border-gray-100 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-600">
          {title}
        </div>
      )}

      {/* Preview */}
      <div className="flex min-h-[140px] items-center justify-center overflow-hidden bg-vix-cinza-card/60 px-6 py-8 *:max-w-full">
        {render(state)}
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 gap-4 border-t border-gray-200 px-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {controls.map((c) => {
          const id = `${uid}-${c.key}`
          const on = !!state[c.key]
          return (
            <div key={c.key} className="flex flex-col gap-1.5">
              <label
                htmlFor={id}
                className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600"
              >
                {c.label}
              </label>

              {c.type === 'select' ? (
                <span className="relative inline-flex w-fit">
                  <select
                    id={id}
                    value={state[c.key]}
                    onChange={(e) => set(c.key, e.target.value)}
                    className="appearance-none rounded-vix-input border border-gray-200 bg-white py-1.5 pl-3 pr-10 text-sm text-vix-preto transition-[color,box-shadow] focus:border-vix-preto focus:outline-hidden focus:ring-[3px] focus:ring-ring/30"
                  >
                    {(c.options || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={13}
                    weight="bold"
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                  />
                </span>
              ) : (
                <button
                  id={id}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => set(c.key, !on)}
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    on
                      ? 'border-transparent bg-vix-preto text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      on ? 'bg-vix-amarelo' : 'bg-gray-300'
                    }`}
                  />
                  {on ? 'on' : 'off'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Código */}
      <div className="min-w-0 border-t border-gray-200 p-4">
        <CodeBlock code={code(state)} className="min-w-0" />
      </div>
    </div>
  )
}
