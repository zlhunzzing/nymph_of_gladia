import React, { useState } from 'react';
import SelectCharacterPresenter from '../presenters/SelectCharacterPresenter';

export default function SelectCharacterContainer() {
  const [player, setPlayer] = useState('');
  const [isSelect, setIsSelect] = useState(false);

  return (
    <SelectCharacterPresenter
      player={player}
      setPlayer={setPlayer}
      isSelect={isSelect}
      setIsSelect={setIsSelect}
    />
  );
}
