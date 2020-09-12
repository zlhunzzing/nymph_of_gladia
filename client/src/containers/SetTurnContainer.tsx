import React, { useEffect, useState } from 'react';
import SetTurnPresenter from '../presenters/SetTurnPresenter';
import store from '../index';
import * as handleModalActions from '../modules/HandleModal';
import { socketServer } from '../modules/Socket';
import { useSelector } from 'react-redux';
import * as battleActions from '../modules/Battle';
import CARD_DICTIONARY from '../common/CardDictionary';

export default function SetTurnContainer() {
  const entryModal = useState(store.getState().HandleModal.entryModal)[0];
  const [player1, setPlayer1] = useState(store.getState().Battle.player1);
  const player2 = useState(store.getState().Battle.player2)[0];
  const [usedMana, setUsedMana] = useState(player1.mp);
  const [handMana, setHandMana] = useState(0);
  const userhand = useSelector((state: any) => state.Battle.userhand);
  const roomId = useSelector((state: any) => state.Socket.roomInfo.id);
  const userId = useSelector((state: any) => state.Auth.userId);
  const [isTurn, setIsTurn] = useState(false);
  const [content, setContent] = useState('');

  function setHand(hand: any) {
    socketServer.emit('setHand', roomId, userId, hand);
  }
  function setTurn() {
    socketServer.emit('setTurn', roomId, userId);
  }
  function sendMessage() {
    socketServer.emit('sendMessage', roomId, content);
    setContent('');
    const el = document.querySelector('.inputReset') as HTMLElement;
    el.click();
  }

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
    store.dispatch(
      battleActions.set_user_hand({
        hand: [
          CARD_DICTIONARY.NONE,
          CARD_DICTIONARY.NONE,
          CARD_DICTIONARY.NONE,
        ],
      }),
    );
    // store.getState().Battle.clearHand(setPlayer1);
    setPlayer1({ ...store.getState().Battle.player1 });
    // if (store.getState().Battle.player2.position) {
    //   store.getState().Battle.autoCardSet();
    // }
  }, [entryModal]);

  return (
    <SetTurnPresenter
      player1={player1}
      player2={player2}
      setPlayer1={setPlayer1}
      usedMana={usedMana}
      setUsedMana={setUsedMana}
      handMana={handMana}
      setHandMana={setHandMana}
      userhand={userhand}
      setHand={setHand}
      isTurn={isTurn}
      setIsTurn={setIsTurn}
      setTurn={setTurn}
      setContent={setContent}
      sendMessage={sendMessage}
    />
  );
}
