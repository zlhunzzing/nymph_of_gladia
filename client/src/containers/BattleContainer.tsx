import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';

export default function BattleContainer() {
  const [entryModal, setEntryModal] = useState(true);
  const [user, setUser] = useState(store.getState().Battle.userCharacter);
  const [eneme, setEneme] = useState(store.getState().Battle.eneme);
  const [hand, setHand] = useState(store.getState().Battle.hand);

  useEffect(() => {
    if (entryModal && store.getState().Battle.userCharacter) {
      store.dispatch(
        handleModalActions.setModalContent({
          content:
            store.getState().Battle.userCharacter.name +
            'VS' +
            store.getState().Battle.eneme.name,
        }),
      );
      store.dispatch(handleModalActions.setModalIsOpen({ isOpen: true }));
      store.dispatch(handleModalActions.setModalIsButton({ isButton: false }));
      setTimeout(() => {
        store.dispatch(handleModalActions.setModalIsOpen({ isOpen: false }));
        store.dispatch(handleModalActions.setModalIsButton({ isButton: true }));
      }, 2000);
      setEntryModal(false);
    }
  }, [entryModal]);

  return (
    <SetTurnPresenter
      user={user}
      setUser={setUser}
      eneme={eneme}
      setEneme={setEneme}
      hand={hand}
      setHand={setHand}
    />
  );
}
