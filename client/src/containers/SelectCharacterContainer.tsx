import React, { useState } from "react";
import SelectCharacterPresenter from "../presenters/SelectCharacterPresenter";

export default function SelectCharacterContainer() {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  return (
    <SelectCharacterPresenter
      selectedCharacter={selectedCharacter}
      setSelectedCharacter={setSelectedCharacter}
      isSelect={isSelect}
      setIsSelect={setIsSelect}
    />
  );
}
