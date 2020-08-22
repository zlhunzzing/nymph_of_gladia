import React, { useState } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';

export default function GreenroomContainer() {
  const a = useState(1)[0];
  return <GreenroomPresenter a={a} />;
}
