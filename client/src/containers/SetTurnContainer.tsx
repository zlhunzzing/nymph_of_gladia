import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';
import * as BattleActions from '../modules/Battle';

export default function SetTurnContainer() {
  const entryModal = useState(store.getState().Battle.entryModal)[0];
  const user = useState(store.getState().Battle.userCharacter)[0];
  const eneme = useState(store.getState().Battle.eneme)[0];
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
      store.dispatch(BattleActions.set_entry_modal());
    }
  }, [entryModal]);

  return (
    <SetTurnPresenter user={user} eneme={eneme} hand={hand} setHand={setHand} />
  );
}
