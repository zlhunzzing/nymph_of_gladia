import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';

export default function SetTurnContainer() {
  const entryModal = useState(store.getState().HandleModal.entryModal)[0];
  const [player1, setPlayer1] = useState(store.getState().Battle.player1);
  const player2 = useState(store.getState().Battle.player2)[0];
  const [usedMana, setUsedMana] = useState(player1.mp);
  const [handMana, setHandMana] = useState(0);

  useEffect(() => {
    if (entryModal && store.getState().Battle.player1) {
      store.dispatch(
        handleModalActions.setModalContent({
          content:
            store.getState().Battle.player1.name +
            'VS' +
            store.getState().Battle.player2.name,
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
    store.getState().Battle.clearHand(setPlayer1);
    setPlayer1({ ...store.getState().Battle.player1 });
    if (store.getState().Battle.player2.position) {
      store.getState().Battle.autoCardSet();
    }
  }, [entryModal]);

  return (
    <div></div>
    // <SetTurnPresenter
    //   player1={player1}
    //   player2={player2}
    //   setPlayer1={setPlayer1}
    //   usedMana={usedMana}
    //   setUsedMana={setUsedMana}
    //   handMana={handMana}
    //   setHandMana={setHandMana}
    // />
  );
}
