import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacters } from '../context/CharactersContext.tsx';
import UpdateCharacterForm from '../components/UpdateCharacterForm.tsx';
import '../styles/CharacterDetailView.css';

const CharacterDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characters } = useCharacters();

  const character = characters.find((char) => char.id === Number(id));

  const handleUpdateSuccess = () => {
    console.log('Personaje actualizado con éxito');
  };

  if (!character) return <p>Personaje no encontrado.</p>;

  return (
    <div>
      <h1>Update Character</h1>
      <div className="character-detail-container">
        <div className="character-detail">
          <img src={character.imageUrl} alt={character.name} className="character-image" />
          <div className="character-info">
            <h1 className="character-name">{character.name}</h1>
            <p className="character-description">{character.description || 'No hay descripción disponible.'}</p>
          </div>
        </div>
        <UpdateCharacterForm character={character} onUpdateSuccess={handleUpdateSuccess} />
      </div>
    </div>
  );
};

export default CharacterDetailView;