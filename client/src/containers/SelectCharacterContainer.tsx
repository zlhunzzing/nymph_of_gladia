import React, { useState } from "react";
import SelectCharacterPresenter from "../presenters/SelectCharacterPresenter";

export default function SelectCharacterContainer() {
  const [userCharacter, setUserCharacter] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  return (
    <SelectCharacterPresenter
      userCharacter={userCharacter}
      setUserCharacter={setUserCharacter}
      isSelect={isSelect}
      setIsSelect={setIsSelect}
    />
  );
}
