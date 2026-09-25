import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CarrosselFrame } from './components/componentes/CarrosselDemos.jsx'
import './index.css'

// /?demo=carrossel&cena=... renderiza só a cena, para a prévia desktop × mobile
// (iframe com largura real, para os breakpoints do Tailwind valerem de verdade).
const params = new URLSearchParams(window.location.search)
const root = params.get('demo') === 'carrossel' ? <CarrosselFrame cena={params.get('cena')} /> : <App />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {root}
  </React.StrictMode>,
)
