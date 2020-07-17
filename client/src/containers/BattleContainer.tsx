import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import StadiumPresenter from '../presenters/StadiumPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';

export default function BattleContainer() {
  const [isTurn, setIsTurn] = useState(false);
  const [entryModal, setEntryModal] = useState(true);
  const [user, setUser] = useState(store.getState().Battle.userCharacter);
  const [eneme, setEneme] = useState(store.getState().Battle.eneme);
  const [hand, setHand] = useState(store.getState().Battle.hand);
  const eneneHand = useState(store.getState().Battle.enemeHand)[0];
  const [userPosition, setUserPostion] = useState(
    store.getState().Battle.userPosition,
  );
  const enemePosition = useState(store.getState().Battle.enemePosition)[0];

  store.subscribe(() => {
    setUserPostion(store.getState().Battle.userPosition);
  });

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
    <div>
      {isTurn ? (
        <StadiumPresenter
          setIsTurn={setIsTurn}
          user={user}
          eneme={eneme}
          hand={hand}
          enemeHand={eneneHand}
          userPosition={userPosition}
          enemePosition={enemePosition}
        ></StadiumPresenter>
      ) : (
        <SetTurnPresenter
          setIsTurn={setIsTurn}
          user={user}
          setUser={setUser}
          eneme={eneme}
          setEneme={setEneme}
          hand={hand}
          setHand={setHand}
        />
      )}
    </div>
  );
}
