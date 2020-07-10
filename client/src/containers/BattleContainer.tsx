import React, { useEffect, useState } from 'react';
import SetTurn from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';

export default function BattleContainer() {
  const [entryModal, setEntryModal] = useState(true);

  useEffect(() => {
    if (entryModal) {
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
      }, 3000);
      setEntryModal(false);
    }
  }, [entryModal]);

  return <SetTurn />;
}
