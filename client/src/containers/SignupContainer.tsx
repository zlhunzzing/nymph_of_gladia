import React, { useState } from 'react';
import SignupPresenter from '../presenters/SignupPresenter';
import { useHistory } from 'react-router-dom';

export default function SignupContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const history = useState(useHistory())[0];

  return (
    <SignupPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      history={history}
    />
  );
}
