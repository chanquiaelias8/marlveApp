import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersView from './views/CharactersView.tsx';
import CharacterDetailView from './views/CharacterDetailView.tsx';
import Navigate from './components/Navigate.tsx';
import './styles/App.css';
import { CharactersProvider } from './context/CharactersContext.tsx';
import CreateCharacterView from './views/CreateCharacterView.tsx';

const App = () => {
  return (
    <CharactersProvider>
      <Router>
          <Navigate/>
          <Routes>
            {/* Ruta principal que muestra CharactersList */}
            <Route path="/" element={<CharactersView />} />
            {/* Ruta para ver los detalles de un personaje */}
            <Route path="/character/:id" element={<CharacterDetailView/>} />
            {/* Ruta para crear o editar un personaje */}
            <Route path="/characterForm" element={<CreateCharacterView/>} />
          </Routes>
      </Router>
    </CharactersProvider>
  );
};

export default App;
