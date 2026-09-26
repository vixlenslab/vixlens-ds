import { useState } from 'react'
import { Section, SubTitle } from '../Section.jsx'
import { PropsTable, DosDonts } from './ComponentDocs.jsx'
import { CodeBlock } from '../Copy.jsx'
import { CookieConsent } from '../ui/cookie-consent.jsx'

const PROPS = [
  { prop: 'open', tipo: 'boolean', padrao: 'true', desc: 'Mostra o aviso. Ligue em useCookieConsent().open (sem escolha salva).' },
  { prop: 'onAccept / onReject', tipo: '() => void', padrao: '—', desc: 'Normalmente accept / reject do useCookieConsent. Salvam a escolha e disparam o evento.' },
  { prop: 'floating', tipo: 'boolean', padrao: 'true', desc: 'Fixo no canto inferior esquerdo (máx. 420px); no celular ocupa a largura com 16px de margem. false = no fluxo da página.' },
  { prop: 'text · policyHref · policyLabel', tipo: 'string', padrao: 'copy do site', desc: 'Texto e link da Política de Privacidade.' },
  { prop: 'acceptLabel / rejectLabel', tipo: 'string', padrao: '"Aceitar" / "Recusar"', desc: 'Os dois botões têm o mesmo tamanho: recusar é tão fácil quanto aceitar.' },
  { prop: 'useCookieConsent({ storageKey?, eventName? })', tipo: 'hook', padrao: '—', desc: 'Devolve choice ("accepted" | "rejected" | null), open, accept, reject e reset.' },
  { prop: 'CookiePreferencesButton', tipo: 'componente', padrao: '"Cookies"', desc: 'Link do rodapé que limpa a escolha e reabre o aviso.' },
  { prop: 'readConsent · saveConsent', tipo: 'função', padrao: '—', desc: 'Leitura e gravação no localStorage (chave vixlens-consentimento-cookies) + evento vixlens:consentimento na janela.' },
]

const CODE = `import { CookieConsent, CookiePreferencesButton, useCookieConsent } from 'vixlens-ds'

// No layout, uma vez só:
function Consentimento() {
  const cookies = useCookieConsent()
  return (
    <CookieConsent
      open={cookies.open}
      onAccept={cookies.accept}
      onReject={cookies.reject}
    />
  )
}

// No rodapé:
<CookiePreferencesButton />`

const CODE_SCRIPTS = `// Quem carrega GTM / Pixel só age depois do "Aceitar":
const { choice } = useCookieConsent()
useEffect(() => {
  if (choice !== 'accepted') return
  carregarGTM()   // e só no domínio oficial
}, [choice])`

export default function CookiesSection() {
  const [escolha, setEscolha] = useState(null)

  return (
    <Section
      id="cookies"
      eyebrow="13.2 — Componentes"
      title="Aviso de cookies"
      desc="Consentimento de cookies (LGPD) com Aceitar e Recusar. Scripts de medição (GTM, Pixels) só carregam depois do Aceitar, e o link Cookies do rodapé reabre o aviso. Mesmo componente do site institucional."
    >
      <SubTitle>Demo</SubTitle>
      <div className="mb-14 rounded-vix-card bg-vix-cinza-card p-4 md:p-10">
        {escolha ? (
          <div className="flex flex-col items-start gap-3 rounded-vix-card bg-white p-6 sm:max-w-[420px]">
            <p className="text-base text-vix-preto">
              Escolha salva: <b>{escolha === 'accepted' ? 'Aceitou' : 'Recusou'}</b>. O aviso some e só volta pelo link do rodapé.
            </p>
            <button
              type="button"
              onClick={() => setEscolha(null)}
              className="text-sm font-semibold text-vix-preto underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-vix-amarelo"
            >
              Cookies (reabrir o aviso)
            </button>
          </div>
        ) : (
          <CookieConsent
            floating={false}
            policyHref="#cookies"
            className="sm:max-w-[420px]"
            onAccept={() => setEscolha('accepted')}
            onReject={() => setEscolha('rejected')}
          />
        )}
      </div>

      <SubTitle>Especificação</SubTitle>
      <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-3">
        {[
          ['Posição', 'Canto inf. esquerdo · 24px'],
          ['Celular', 'Largura toda · margem 16px'],
          ['Cartão', 'Radius 32 · padding 24 · máx. 420'],
          ['Ícone', 'Phosphor Cookie 24 duotone'],
          ['Botões', 'Altura 40 · mesmo tamanho'],
          ['Entrada', 'Sobe 24px + fade · 0,35 s'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-vix-cinza-card px-3.5 py-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{k}</div>
            <div className="mt-0.5 text-[13px] font-bold text-vix-preto">{v}</div>
          </div>
        ))}
      </div>

      <SubTitle>Props &amp; funções</SubTitle>
      <div className="mb-14">
        <PropsTable rows={PROPS} />
      </div>

      <SubTitle>Regras</SubTitle>
      <div className="mb-14">
        <DosDonts
          dos={[
            'Nada de GTM, Pixel ou Analytics antes do Aceitar.',
            'Aceitar e Recusar com o mesmo tamanho e o mesmo destaque de posição.',
            'Link "Cookies" no rodapé para rever a escolha.',
          ]}
          donts={[
            'Barra que cobre a tela ou bloqueia a navegação.',
            'Aceite implícito ("ao continuar navegando você concorda").',
            'Esconder o Recusar em link pequeno ou num segundo passo.',
          ]}
        />
      </div>

      <SubTitle>Código</SubTitle>
      <CodeBlock code={CODE} className="mb-4" />
      <CodeBlock code={CODE_SCRIPTS} />
    </Section>
  )
}
