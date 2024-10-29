import React from 'react';
import CreateCharacterForm from '../components/CreateCharacterForm.tsx';
import '../styles/CreateUpdateCharacterView.css';

const CreateCharacterView: React.FC = () => {
  return (
    <div>
      <h1>Create Character</h1>
      <CreateCharacterForm />
    </div>
  );
};

export default CreateCharacterView;
