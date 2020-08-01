import React, { useState, useEffect } from 'react';
import FieldPresenter from '../presenters/FieldPresenter';
import store from '../index';

export default function FieldContainer() {
  const isTurn = useState(store.getState().Battle.isTurn)[0];
  const [player1, setPlayer1] = useState(store.getState().Battle.player1);
  const [player2, setPlayer2] = useState(store.getState().Battle.player2);
  const hand = useState(store.getState().Battle.player1.hand)[0];
  const player2Hand = useState(store.getState().Battle.player2.hand)[0];
  const [player1Position, setPlayer1Postion] = useState(
    store.getState().Battle.player1Position,
  );
  const [player2Position, setPlayer2Position] = useState(
    store.getState().Battle.player2Position,
  );
  const [mana, setMana] = useState(player1.mp);

  useEffect(() => {
    if (isTurn) {
      store
        .getState()
        .Battle.nextTurn(
          store.getState().Battle.player1.hand,
          store.getState().Battle.player2.hand,
          setPlayer1Postion,
          setPlayer2Position,
          setPlayer1,
          setPlayer2,
          setMana,
        );
    }
  }, [isTurn]);

  return (
    <FieldPresenter
      player1={player1}
      player2={player2}
      hand={hand}
      player2Hand={player2Hand}
      player1Position={player1Position}
      player2Position={player2Position}
      mana={mana}
    />
  );
}
