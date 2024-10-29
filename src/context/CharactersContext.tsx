import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api.ts';

interface Character {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  created: boolean;
}

export interface CharactersContextProps {
  characters: Character[];
  loading: boolean;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  addCharacter: (character: Omit<Character, 'id' | 'created'>) => void;
}

export const CharactersContext = createContext<CharactersContextProps>({
  characters: [],
  loading: true,
  setCharacters: () => {},
  addCharacter: () => {},
});

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await api.getCharacters();
        const formattedCharacters = response.data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          description: char.description,
          imageUrl: `${char.thumbnail.path}.${char.thumbnail.extension}`,
          created: false, // Establece `created` como false para los personajes de la API
        }));
        setCharacters(formattedCharacters);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const addCharacter = (character: Omit<Character, 'id' | 'created'>) => {
    const newCharacter = {
      ...character,
      id: characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1,
      created: true,
    };
    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
  };

  return (
    <CharactersContext.Provider value={{ characters, loading, setCharacters, addCharacter }}>
      {children}
    </CharactersContext.Provider>
  );
};