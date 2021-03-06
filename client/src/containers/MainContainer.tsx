import React, { useState } from 'react';
import MainPresenter from '../presenters/MainPresenter';
import { useHistory } from 'react-router-dom';

export default function MainContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useState(useHistory())[0];

  return (
    <MainPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      history={history}
    />
  );
}
