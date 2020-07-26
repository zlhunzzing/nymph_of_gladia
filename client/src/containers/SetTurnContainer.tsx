import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';

export default function SetTurnContainer() {
  const entryModal = useState(store.getState().Battle.entryModal)[0];
  const [user, setUser] = useState(store.getState().Battle.userCharacter);
  const eneme = useState(store.getState().Battle.eneme)[0];
  const [hand, setHand] = useState(store.getState().Battle.hand);
  const userPosition = useState(store.getState().Battle.userPosition)[0];
  const enemePosition = useState(store.getState().Battle.enemePosition)[0];
  const [mana, setMana] = useState(40);

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
      store.dispatch(handleModalActions.set_entry_modal());
    }
    store.getState().Battle.clearHand();
    setHand(store.getState().Battle.hand);
  }, [entryModal]);

  return (
    <SetTurnPresenter
      user={user}
      eneme={eneme}
      hand={hand}
      setHand={setHand}
      setUser={setUser}
      userPosition={userPosition}
      enemePosition={enemePosition}
      mana={mana}
      setMana={setMana}
    />
  );
}
