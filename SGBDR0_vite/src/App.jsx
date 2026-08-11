import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from './pages/Accueil';
import Achat from './pages/Achat';
import Admin from './pages/Admin';
import Apropos from './pages/Apropos';
import Confirm from './pages/Confirm';
import Panier from './pages/Panier';
import Historique from './pages/Historique'
import Parametre from './pages/Parametre'
import Classement from './pages/Classement'


function App() {
  return (
    <div className='body'>
      <BrowserRouter>
        <Routes>
          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Achat" element={<Achat />} />
          <Route path="/Panier" element={<Panier />} />
          <Route path="/Historique" element={<Historique />} />
          <Route path="/Paramètre" element={<Parametre />} />
          <Route path="/Confirm" element={<Confirm />} />
          <Route path="/Classement" element={<Classement />} />
        </Routes>
      </BrowserRouter>      
    </div>

  )
}

export default App
