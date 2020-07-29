import React, { useState, useEffect } from 'react';
import FieldPresenter from '../presenters/FieldPresenter';
import store from '../index';

export default function FieldContainer() {
  const isTurn = useState(store.getState().Battle.isTurn)[0];
  const [user, setUser] = useState(store.getState().Battle.userCharacter);
  const eneme = useState(store.getState().Battle.eneme)[0];
  const hand = useState(store.getState().Battle.hand)[0];
  const enemeHand = useState(store.getState().Battle.enemeHand)[0];
  const [userPosition, setUserPostion] = useState(
    store.getState().Battle.userPosition,
  );
  const [enemePosition, setEnemePosition] = useState(
    store.getState().Battle.enemePosition,
  );
  const [mana, setMana] = useState(user.mp);

  useEffect(() => {
    if (isTurn) {
      store
        .getState()
        .Battle.nextTurn(
          store.getState().Battle.hand,
          store.getState().Battle.enemeHand,
          setUserPostion,
          setEnemePosition,
          setUser,
          setMana,
        );
    }
  }, [isTurn]);

  return (
    <FieldPresenter
      user={user}
      eneme={eneme}
      hand={hand}
      enemeHand={enemeHand}
      userPosition={userPosition}
      enemePosition={enemePosition}
      mana={mana}
    />
  );
}
