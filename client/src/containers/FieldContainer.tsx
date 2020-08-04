import React, { useState, useEffect } from 'react';
import FieldPresenter from '../presenters/FieldPresenter';
import store from '../index';

export default function FieldContainer() {
  const isTurn = useState(store.getState().Battle.isTurn)[0];
  const [player1, setPlayer1] = useState(store.getState().Battle.player1);
  const [player2, setPlayer2] = useState(store.getState().Battle.player2);
  const player2Hand = useState(store.getState().Battle.player2.hand)[0];
  const [field, setField] = useState(store.getState().Battle.field);

  // console.log(field);
  // store.subscribe(() => {
  //   setField(store.getState().Battle.field);
  // });

  useEffect(() => {
    if (isTurn) {
      store.getState().Battle.nextTurn(setPlayer1, setPlayer2, setField);
    }
  }, [isTurn]);

  return (
    <FieldPresenter
      player1={player1}
      player2={player2}
      player2Hand={player2Hand}
      field={field}
    />
  );
}
