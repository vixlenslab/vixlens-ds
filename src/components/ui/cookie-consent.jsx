import * as React from "react"
import { Cookie } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

// Aviso de consentimento de cookies (LGPD) — mesmo padrão do site institucional
// (site_vixlens PR #9). Regra: GTM, Pixels e afins só carregam depois do "Aceitar".

export const cookieConsentDefaults = {
  storageKey: "vixlens-consentimento-cookies",
  /** Evento disparado na janela quando a escolha muda (quem carrega os scripts escuta). */
  eventName: "vixlens:consentimento",
  title: "Cookies",
  text: "Usamos cookies para medir o uso do site e melhorar nossas campanhas. Você pode aceitar ou recusar.",
  policyLabel: "Política de Privacidade",
  policyHref: "/politica-de-privacidade",
  accept: "Aceitar",
  reject: "Recusar",
  preferences: "Cookies",
}

/** @returns {"accepted" | "rejected" | null} */
export function readConsent(storageKey = cookieConsentDefaults.storageKey) {
  try {
    const value = window.localStorage.getItem(storageKey)
    return value === "accepted" || value === "rejected" ? value : null
  } catch {
    return null
  }
}

/** Salva a escolha (null limpa e reabre o aviso) e avisa a janela pelo evento. */
export function saveConsent(
  choice,
  { storageKey = cookieConsentDefaults.storageKey, eventName = cookieConsentDefaults.eventName } = {}
) {
  try {
    if (choice) window.localStorage.setItem(storageKey, choice)
    else window.localStorage.removeItem(storageKey)
  } catch {
    // sem storage: a escolha vale só para esta página
  }
  window.dispatchEvent(new CustomEvent(eventName, { detail: choice }))
}

/**
 * Escolha atual + ações. `choice` começa `undefined` (ainda não lido) para o aviso
 * não piscar no SSR; depois vira "accepted", "rejected" ou null (sem escolha).
 */
export function useCookieConsent({
  storageKey = cookieConsentDefaults.storageKey,
  eventName = cookieConsentDefaults.eventName,
} = {}) {
  const [choice, setChoice] = React.useState(undefined)

  React.useEffect(() => {
    setChoice(readConsent(storageKey))
    const onChange = (event) => setChoice(event.detail ?? null)
    window.addEventListener(eventName, onChange)
    return () => window.removeEventListener(eventName, onChange)
  }, [storageKey, eventName])

  const opts = { storageKey, eventName }
  return {
    choice,
    open: choice === null,
    accept: () => saveConsent("accepted", opts),
    reject: () => saveConsent("rejected", opts),
    reset: () => saveConsent(null, opts),
  }
}

const buttonBase =
  "h-10 flex-1 rounded-vix-button px-5 text-sm font-semibold transition-[background-color,border-color,transform] duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-vix-amarelo motion-reduce:transform-none"

/**
 * Cartão do aviso. `floating` (padrão) fixa no canto inferior esquerdo — no celular ocupa
 * a largura com 16px de margem. Sem `floating`, fica no fluxo (útil em documentação).
 */
export const CookieConsent = React.forwardRef(
  (
    {
      open = true,
      onAccept,
      onReject,
      floating = true,
      title = cookieConsentDefaults.title,
      text = cookieConsentDefaults.text,
      policyHref = cookieConsentDefaults.policyHref,
      policyLabel = cookieConsentDefaults.policyLabel,
      acceptLabel = cookieConsentDefaults.accept,
      rejectLabel = cookieConsentDefaults.reject,
      className,
      ...props
    },
    ref
  ) => {
    if (!open) return null
    return (
      <div
        ref={ref}
        role="dialog"
        aria-live="polite"
        aria-label={title}
        className={cn(
          "flex flex-col gap-4 rounded-vix-card bg-vix-branco p-6 shadow-[0_12px_40px_rgba(29,29,31,0.18)]",
          "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards duration-300 motion-reduce:animate-none",
          floating && "fixed inset-x-4 bottom-4 z-70 [animation-delay:400ms] sm:inset-x-auto sm:left-6 sm:max-w-[420px]",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <Cookie size={24} weight="duotone" className="mt-0.5 shrink-0 text-vix-preto" aria-hidden="true" />
          <p className="text-base leading-relaxed text-vix-preto">
            {text}{" "}
            <a href={policyHref} className="font-semibold underline underline-offset-2 hover:text-vix-preto/70">
              {policyLabel}
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReject}
            className={cn(buttonBase, "border border-vix-gray-200 bg-vix-branco text-vix-preto hover:border-vix-preto")}
          >
            {rejectLabel}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className={cn(buttonBase, "bg-vix-preto text-vix-cinza-card hover:bg-[#333333]")}
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    )
  }
)
CookieConsent.displayName = "CookieConsent"

/** Botão do rodapé que reabre o aviso (limpa a escolha salva). */
export function CookiePreferencesButton({ children = cookieConsentDefaults.preferences, options, className, ...props }) {
  return (
    <button type="button" onClick={() => saveConsent(null, options)} className={cn("hover:underline", className)} {...props}>
      {children}
    </button>
  )
}
