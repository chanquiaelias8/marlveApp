import React from 'react';
import CharactersList from '../components/CharactersList.tsx';

const CharactersView: React.FC = () => {
  return (
    <div className="characters-view">
      <h1>Marvel Characters</h1>
      <CharactersList />
    </div>
  );
};

export default CharactersView;