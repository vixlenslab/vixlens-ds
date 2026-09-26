import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Search from './components/Search.jsx'
import Hero from './components/Hero.jsx'
import BackToTop from './components/BackToTop.jsx'
import ComecarSection from './components/sobre/ComecarSection.jsx'
import MarcaSection from './components/marca/MarcaSection.jsx'
import FotografiaSection from './components/marca/FotografiaSection.jsx'
import TecnologiasSection from './components/marca/TecnologiasSection.jsx'
import CoresSection from './components/fundamentos/CoresSection.jsx'
import TipografiaSection from './components/fundamentos/TipografiaSection.jsx'
import TokensSection from './components/fundamentos/TokensSection.jsx'
import ElevacaoSection from './components/fundamentos/ElevacaoSection.jsx'
import IconografiaSection from './components/fundamentos/IconografiaSection.jsx'
import EspacamentoSection from './components/fundamentos/EspacamentoSection.jsx'
import GridSection from './components/fundamentos/GridSection.jsx'
import AcessibilidadeSection from './components/fundamentos/AcessibilidadeSection.jsx'
import DataVizSection from './components/fundamentos/DataVizSection.jsx'
import VozTomSection from './components/voz/VozTomSection.jsx'
import VocabularioSection from './components/voz/VocabularioSection.jsx'
import BotoesSection from './components/componentes/BotoesSection.jsx'
import InputsSection from './components/componentes/InputsSection.jsx'
import CardsSection from './components/componentes/CardsSection.jsx'
import CarrosselSection from './components/componentes/CarrosselSection.jsx'
import CalloutsSection from './components/componentes/CalloutsSection.jsx'
import CookiesSection from './components/componentes/CookiesSection.jsx'
import ShadcnShowcase from './components/componentes/ShadcnShowcase.jsx'
import PlaygroundSection from './components/componentes/PlaygroundSection.jsx'
import MateriaisSection from './components/materiais/MateriaisSection.jsx'
import ChangelogSection from './components/sobre/ChangelogSection.jsx'
import ContribuirSection from './components/sobre/ContribuirSection.jsx'

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-vix">
      <Search />
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      {/* botão hamburguer (mobile) */}
      <button
        onClick={() => setNavOpen(true)}
        aria-label="Abrir menu"
        className="fixed right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-vix-input border border-gray-200 bg-white shadow-sm md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <main className="md:ml-[260px]">
        <Hero />
        <ComecarSection />
        <MarcaSection />
        <FotografiaSection />
        <TecnologiasSection />
        <CoresSection />
        <TipografiaSection />
        <TokensSection />
        <ElevacaoSection />
        <IconografiaSection />
        <EspacamentoSection />
        <GridSection />
        <AcessibilidadeSection />
        <DataVizSection />
        <VozTomSection />
        <VocabularioSection />
        <BotoesSection />
        <InputsSection />
        <CardsSection />
        <CarrosselSection />
        <CalloutsSection />
        <CookiesSection />
        <ShadcnShowcase />
        <PlaygroundSection />
        <MateriaisSection />
        <ChangelogSection />
        <ContribuirSection />

        <footer className="border-t border-gray-100 px-8 py-10 text-center text-[13px] text-muted-foreground md:px-16">
          Vixlens Design System · v0.11.4 · ds.vixlens.com.br
        </footer>
      </main>

      <BackToTop />
    </div>
  )
}
