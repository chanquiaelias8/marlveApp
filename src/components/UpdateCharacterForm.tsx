import React, { useState } from 'react';
import { CharactersContext, CharactersContextProps } from '../context/CharactersContext.tsx';
import { useNavigate } from 'react-router-dom';

interface UpdateCharacterFormProps {
  character: { id: number; name: string; description: string; imageUrl: string; };
  onUpdateSuccess: () => void;
}

const UpdateCharacterForm: React.FC<UpdateCharacterFormProps> = ({ character, onUpdateSuccess }) => {
  const context = React.useContext(CharactersContext) as CharactersContextProps;
  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'description') setDescription(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    context.setCharacters(prevCharacters =>
      prevCharacters.map(c => {
        if (c.id === character.id) {
          return {
            ...c,
            name: name.trim() !== '' ? name : c.name,
            description: description.trim() !== '' ? description : c.description,
          };
        }
        return c;
      })
    );

    onUpdateSuccess();

    // Navega a la ruta "/"
    navigate('/');
  };

  return (
    <div className="update-character-view">
      <form onSubmit={handleSubmit} className="character-form">
        <div className="form-group">
          <label htmlFor="name">Character Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Character Name"
            value={name}
            onChange={handleInputChange}
            className="form-input"
            maxLength={50}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Character description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Character description"
            value={description}
            onChange={handleInputChange}
            className="form-textarea"
            maxLength={500}
          />
        </div>
        <button type="submit" className="form-button">Update character</button>
      </form>
    </div>
  );
};

export default UpdateCharacterForm;