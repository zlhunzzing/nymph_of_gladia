import React, { useState } from "react";
import SinglemodePresenter from "../presenters/SinglemodePresenter";

export default function SinglemodeContainer() {
  const [selectedGla, setSelectedGla] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  return (
    <SinglemodePresenter
      selectedGla={selectedGla}
      setSelectedGla={setSelectedGla}
      isSelect={isSelect}
      setIsSelect={setIsSelect}
    />
  );
}
