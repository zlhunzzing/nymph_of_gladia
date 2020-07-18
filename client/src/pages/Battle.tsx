import React, { useState } from 'react';
import SetTurnContainer from '../containers/SetTurnContainer';
import FieldContainer from '../containers/FieldContainer';
import store from '..';

export default function Battle() {
  const [isTurn, setIsTurn] = useState(store.getState().Battle.isTurn);

  store.subscribe(() => {
    if (isTurn !== store.getState().Battle.isTurn) {
      setIsTurn(store.getState().Battle.isTurn);
    }
  });

  return (
    <div>
      {isTurn ? (
        <FieldContainer></FieldContainer>
      ) : (
        <SetTurnContainer></SetTurnContainer>
      )}
    </div>
  );
}
