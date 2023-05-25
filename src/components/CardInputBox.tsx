import React, { useState } from 'react';
import "../styles/cardInputBox.scss"

interface CardInputBoxProps {
  onTitleAdded: (title: string) => void;
}

const CardInputBox: React.FC<CardInputBoxProps> = ({ onTitleAdded }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    if (title.trim() !== '') {
      onTitleAdded(title.trim());
      setTitle('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && title.trim() !== '') {
      onTitleAdded(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="card-input-box" onBlur={handleBlur}>
      <input
        type="text"
        placeholder="Add you todo..."
        value={title}
        onChange={handleTitleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default CardInputBox;
