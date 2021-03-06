import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FieldPresenter from '../presenters/FieldPresenter';
import store from '../index';

export default function FieldContainer() {
  const isTurn = useState(store.getState().Battle.isTurn)[0];
  const roomInfo = useSelector((state: any) => state.Socket.roomInfo);
  const [player1, setPlayer1] = useState(store.getState().Battle.player1);
  const [player2, setPlayer2] = useState(store.getState().Battle.player2);
  const [field, setField] = useState(store.getState().Battle.field);
  const [isUsing, setIsUsing] = useState([
    [false, false],
    [false, false],
    [false, false],
  ]);
  const usingCard = useSelector((state: any) => state.Battle.usingCard);

  useEffect(() => {
    if (isTurn) {
      store
        .getState()
        .Battle.nextTurn(setPlayer1, setPlayer2, setField, setIsUsing);
    }
  }, [isTurn]);

  return (
    <FieldPresenter
      roomInfo={roomInfo}
      player1={player1}
      player2={player2}
      field={field}
      isUsing={isUsing}
      usingCard={usingCard}
    />
  );
}
