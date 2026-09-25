import * as React from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

// Carrossel de cards Vixlens — mesmo comportamento do site institucional
// (site_vixlens: CarouselNav.tsx + useCarousel.ts), sem framer-motion: as
// animações (pílula, escala das setas, cascata, hover y:-6) são CSS/Tailwind.

const EDGE = 4
const MAX_MOBILE_DOTS = 6

// Largura dos cards para caber um número inteiro por vez: w = (100% - (N-1)*gap) / N,
// com o gap de 24px (gap-6) da trilha.
// Strings literais de propósito — o Tailwind só gera classe que aparece inteira no código.
export const carouselItemWidth = {
  /** 1 no celular · 2 no tablet (sm) · 3 no desktop (xl) */
  cards: "w-full sm:w-[calc((100%-24px)/2)] xl:w-[calc((100%-48px)/3)]",
  /** 2 · 3 · 4 — logos e marcas */
  logos: "w-[calc((100%-24px)/2)] sm:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)]",
  /** 1 · 2 · 4 — card de produto */
  produtos: "w-full sm:w-[calc((100%-24px)/2)] xl:w-[calc((100%-72px)/4)]",
}

function nearestIndex(positions, scrollLeft) {
  let nearest = 0
  positions.forEach((position, i) => {
    if (Math.abs(position - scrollLeft) < Math.abs(positions[nearest] - scrollLeft)) nearest = i
  })
  return nearest
}

/**
 * Estado de um carrossel de rolagem (scroll-snap). Os filhos diretos de `scrollRef` são os itens.
 *
 * `count` é o número de POSIÇÕES navegáveis, não de itens: quando os últimos itens já cabem
 * juntos na tela, viram uma única posição final. Assim cada indicador corresponde a um ponto
 * de rolagem real e nenhum ponto "pula" para outro.
 *
 * @param {number} [scrollStep] passo em px das setas. Sem ele, as setas andam de posição em posição.
 * @param {number} [initialCount] `count` antes da medição (SSR): a navegação já nasce renderizada.
 */
export function useCarousel(scrollStep, initialCount = 0) {
  const scrollRef = React.useRef(null)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(initialCount > 1)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [count, setCount] = React.useState(initialCount)

  // scrollLeft de cada ponto navegável.
  const getPositions = React.useCallback(() => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return []
    const children = Array.from(el.children)
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    const first = children[0].offsetLeft
    const positions = children
      .map((child) => child.offsetLeft - first)
      .filter((offset) => offset < maxScroll - EDGE)
    positions.push(maxScroll)
    return positions
  }, [])

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const positions = getPositions()
    const maxScroll = positions[positions.length - 1] ?? 0
    setCanPrev(el.scrollLeft > EDGE)
    setCanNext(el.scrollLeft < maxScroll - EDGE)
    setCount(positions.length)
    setActiveIndex(nearestIndex(positions, el.scrollLeft))
  }, [getPositions])

  // Estável entre renders: pode entrar em dependências de efeitos (ex.: autoplay).
  const scrollToIndex = React.useCallback(
    (index) => {
      const el = scrollRef.current
      const positions = getPositions()
      if (!el || positions.length === 0) return
      const target = positions[Math.min(Math.max(index, 0), positions.length - 1)]
      el.scrollTo({ left: target, behavior: "smooth" })
    },
    [getPositions]
  )

  const scrollByStep = React.useCallback(
    (direction) => {
      const el = scrollRef.current
      if (!el) return
      if (scrollStep) {
        el.scrollBy({ left: direction * scrollStep, behavior: "smooth" })
        return
      }
      scrollToIndex(nearestIndex(getPositions(), el.scrollLeft) + direction)
    },
    [scrollStep, scrollToIndex, getPositions]
  )

  React.useEffect(() => {
    const el = scrollRef.current
    updateScrollState()
    if (!el) return undefined
    // Remede quando a trilha ou os itens mudam de tamanho (fontes, imagens, breakpoints).
    const observer = new ResizeObserver(() => updateScrollState())
    observer.observe(el)
    Array.from(el.children).forEach((child) => observer.observe(child))
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    return () => {
      observer.disconnect()
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  return { scrollRef, canPrev, canNext, activeIndex, count, updateScrollState, scrollByStep, scrollToIndex }
}

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])
  return matches
}

/**
 * Autoplay opcional (só depoimentos). Avança a cada `interval` ms e volta ao início no fim.
 * Pausa com o mouse em cima, com foco dentro, com o carrossel fora da tela ou a aba escondida.
 * Não roda com prefers-reduced-motion. `restart()` reinicia a contagem (chame no clique de ponto/seta).
 *
 * Espalhe `rootProps` e ligue `rootRef` no elemento que envolve trilha + navegação.
 */
export function useCarouselAutoplay({ activeIndex, count, scrollToIndex, interval = 5000, enabled = true }) {
  const rootRef = React.useRef(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [inView, setInView] = React.useState(true)
  const [pageVisible, setPageVisible] = React.useState(true)
  const [resetKey, setResetKey] = React.useState(0)

  React.useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState === "visible")
    onChange()
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])

  const playing = enabled && count > 1 && !reduceMotion && inView && pageVisible && !hovered && !focused

  React.useEffect(() => {
    if (!playing) return undefined
    const timer = window.setTimeout(() => {
      scrollToIndex(activeIndex + 1 >= count ? 0 : activeIndex + 1)
    }, interval)
    return () => window.clearTimeout(timer)
  }, [playing, activeIndex, count, interval, resetKey, scrollToIndex])

  const restart = React.useCallback(() => setResetKey((key) => key + 1), [])

  const rootProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    },
  }

  return { rootRef, rootProps, playing, restart }
}

/**
 * Trilha rolável: scroll-snap, sem barra nativa, cascata de entrada quando aparece na tela.
 * O padding vertical (compensado na margem) evita cortar o hover y:-6 dos cards.
 */
export const CarouselTrack = React.forwardRef(({ className, children, ...props }, ref) => {
  const innerRef = React.useRef(null)
  const [inView, setInView] = React.useState(false)

  const setRefs = React.useCallback(
    (node) => {
      innerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useEffect(() => {
    const el = innerRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return undefined
    }
    // Dispara uma vez, como o whileInView do site.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={setRefs}
      data-inview={inView}
      className={cn(
        // [overflow-x:auto] e não overflow-x-auto: páginas que estilizam a barra de .overflow-x-auto
        // (o próprio site do DS faz isso) não podem trazer a barra de volta.
        "group/carousel -my-2 flex snap-x snap-mandatory gap-6 py-2 [overflow-x:auto] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
CarouselTrack.displayName = "CarouselTrack"

/**
 * Item da trilha. `size` escolhe quantos cabem por vez (ver `carouselItemWidth`);
 * `index` escalona a entrada em cascata (80 ms por item).
 */
export const CarouselItem = React.forwardRef(({ size = "cards", index = 0, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 snap-start opacity-0 transition-transform duration-300 ease-out hover:-translate-y-1.5",
      "group-data-[inview=true]/carousel:opacity-100 group-data-[inview=true]/carousel:animate-in group-data-[inview=true]/carousel:fade-in group-data-[inview=true]/carousel:slide-in-from-bottom-6 group-data-[inview=true]/carousel:duration-500 group-data-[inview=true]/carousel:fill-mode-backwards",
      "motion-reduce:!animate-none motion-reduce:!opacity-100 motion-reduce:hover:translate-y-0",
      carouselItemWidth[size] ?? size,
      className
    )}
    style={{ animationDelay: `${Math.min(index, 8) * 80}ms`, ...style }}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const TONES = {
  light: {
    dotOn: "bg-vix-preto",
    dotOff: "bg-vix-preto/20 hover:bg-vix-preto/45",
    arrowOff: "bg-vix-gray-100 text-vix-gray-400",
    counterOn: "text-vix-preto",
    counterOff: "text-vix-preto/45",
  },
  dark: {
    dotOn: "bg-vix-branco",
    dotOff: "bg-vix-branco/30 hover:bg-vix-branco/60",
    arrowOff: "bg-vix-branco/20 text-vix-branco/45",
    counterOn: "text-vix-branco",
    counterOff: "text-vix-branco/50",
  },
}

/**
 * Navegação padrão de carrossel: indicadores à esquerda (ativo em pílula), setas redondas à direita.
 * Com 1 posição ou menos não renderiza nada. Acima de 6 posições, abaixo de `sm` os pontos
 * viram um contador "02 / 15" para não invadir as setas.
 */
export function CarouselNav({
  count,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
  tone = "light",
  itemLabel = "item",
  className,
}) {
  if (count <= 1) return null

  const t = TONES[tone] ?? TONES.light
  const compact = count > MAX_MOBILE_DOTS
  const focusRing = "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-vix-amarelo"

  const arrow = (enabled) =>
    cn(
      "flex size-12 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-200",
      focusRing,
      enabled
        ? "bg-vix-gray-200 text-vix-preto hover:scale-[1.08] hover:bg-vix-amarelo active:scale-[0.92] motion-reduce:transform-none"
        : cn("cursor-default", t.arrowOff)
    )

  return (
    <div className={cn("mt-8 flex w-full items-center justify-between gap-6", className)}>
      {compact && (
        <p aria-live="polite" className={cn("text-sm font-semibold tabular-nums sm:hidden", t.counterOn)}>
          <span className="sr-only">{itemLabel} </span>
          {String(activeIndex + 1).padStart(2, "0")}
          <span aria-hidden="true" className={t.counterOff}>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
          <span className="sr-only"> de {count}</span>
        </p>
      )}

      <div
        role="group"
        aria-label="Navegação do carrossel"
        className={cn("min-w-0 items-center gap-2", compact ? "hidden sm:flex" : "flex")}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para ${itemLabel} ${i + 1} de ${count}`}
            aria-current={i === activeIndex}
            onClick={() => onSelect(i)}
            className={cn(
              "relative h-2 shrink-0 rounded-full transition-[width,background-color] duration-300 ease-out before:absolute before:-inset-3 before:content-['']",
              focusRing,
              i === activeIndex ? cn("w-7", t.dotOn) : cn("w-2", t.dotOff)
            )}
          />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Anterior" className={arrow(canPrev)}>
          <CaretLeft size={20} weight="bold" />
        </button>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label="Próximo" className={arrow(canNext)}>
          <CaretRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  )
}
