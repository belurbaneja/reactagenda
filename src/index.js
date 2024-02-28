
import React from 'react';
import { createRoot } from 'react-dom/client';
import Agenda from './components/navegacion/Controles';
import BackgroundDeco from './components/backGround/background';
import GuardarContacs from './components/guardarContacts/formContacs'
import Contactos from './components/contactos/cargaPaginas'
const root=createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Agenda />
    
    <BackgroundDeco />
   
  </React.StrictMode>,
  
);