import React, { useState } from 'react';
import { CharactersContext, CharactersContextProps } from '../context/CharactersContext.tsx';
import { useNavigate } from 'react-router-dom';

const CreateCharacterForm: React.FC = () => {
  const context = React.useContext(CharactersContext) as CharactersContextProps;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'description') setDescription(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    context.addCharacter({ 
      name, 
      description, 
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' 
    });
    
    // Reiniciar el formulario
    setName('');
    setDescription('');

    // Navega a la ruta "/"
    navigate('/');
  };

  return (
    <div className="create-character-view">
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Character Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Character Description"
            value={description}
            onChange={handleInputChange}
            className="form-textarea"
            maxLength={500}
            required
          />
        </div>
        <button type="submit" className="form-button">Add Character</button>
      </form>
    </div>
  );
};

export default CreateCharacterForm;