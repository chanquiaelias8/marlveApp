import React from 'react';
import { useCharacters } from '../context/CharactersContext.tsx';
import { useNavigate } from 'react-router-dom';
import '../styles/CharacterList.css';

const CharactersList: React.FC = () => {
  const { characters, loading, setCharacters } = useCharacters();
  const navigate = useNavigate();

  const selectCharacter = (id: number) => {
    navigate(`/character/${id}`);
  };

  const handleDeleteCharacter = (id: number) => {
    setCharacters((prevCharacters) => prevCharacters.filter(char => char.id !== id));
    navigate('/');
  };

  if (loading) return <p>Cargando personajes...</p>;    

  return (
    <div className="container">
      <ul className="character-list">
        {characters.map((char) => (
          <li
            key={char.id}
            className="character-item"
            onClick={() => selectCharacter(char.id)}
          >
            <div className="container-image">
              <img src={char.imageUrl} alt={char.name} className="character-image" />
            </div>
            <div className="character-name">
              <h3>{char.name}</h3>
            </div>
            <p>{char.description}</p>
            {char.created && (
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCharacter(char.id);
                }}
              >
                🗑️
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;