import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './index';
import { socketServer } from './modules/Socket';
import * as socketActions from './modules/Socket';
import Modal from 'react-modal';
import modalCustomStyles from './common/ModalCustomStyles';
import * as HandleModalActions from './modules/HandleModal';
import * as battleActions from './modules/Battle';
import { useHistory } from 'react-router-dom';

/* pages */
import Main from './pages/Main';
import Signup from './pages/Signup';
import Channel from './pages/Channel';
import Greenroom from './pages/Greenroom';
import SelectCharacter from './pages/SelectCharacter';
import Battle from './pages/Battle';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setIsModalContent] = useState('');
  const [modalIsButton, setModalIsButton] = useState(true);
  const [isLink, setIsLink] = useState(false);
  const history = useState(useHistory())[0];

  useEffect(() => {
    socketServer.on('rooms', (rooms: any) => {
      store.dispatch(socketActions.set_rooms({ rooms }));
    });
    socketServer.on('getRoomInfo', (roomInfo: any) => {
      if (
        document.location.pathname === `/greenroom/${roomInfo.id.toString()}`
      ) {
        store.dispatch(socketActions.set_room_info({ roomInfo }));
      }
    });
    socketServer.on('gamestart', (roomInfo: any) => {
      if (roomInfo.player1 === store.getState().Auth.userId) {
        store.dispatch(
          battleActions.select_player2({ name: roomInfo.player2Character }),
        );
        history.push('/battle');
      }
      if (roomInfo.player2 === store.getState().Auth.userId) {
        store.dispatch(
          battleActions.select_player1({ name: roomInfo.player1Character }),
        );
        history.push('/battle');
      }
    });
  });

  store.subscribe(() => {
    if (modalIsOpen !== store.getState().HandleModal.modalIsOpen) {
      setModalIsOpen(store.getState().HandleModal.modalIsOpen);
    }
    if (modalContent !== store.getState().HandleModal.modalContent) {
      setIsModalContent(store.getState().HandleModal.modalContent);
    }
    if (modalIsButton !== store.getState().HandleModal.modalIsButton) {
      setModalIsButton(store.getState().HandleModal.modalIsButton);
    }
    if (isLink !== store.getState().HandleModal.isLink) {
      setIsLink(store.getState().HandleModal.isLink);
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/main" render={() => <Main></Main>}></Route>
        <Route path="/signup" render={() => <Signup></Signup>}></Route>
        <Route path="/channel" render={() => <Channel></Channel>}></Route>
        <Route
          path="/greenroom/:id"
          render={() => <Greenroom></Greenroom>}
        ></Route>
        <Route
          path="/selectCharacter"
          render={() => <SelectCharacter></SelectCharacter>}
        ></Route>
        <Route path="/battle" render={() => <Battle></Battle>}></Route>
        <Route path="/" render={() => <Main></Main>}></Route>
      </Switch>
      <Modal isOpen={modalIsOpen} style={modalCustomStyles}>
        <div>{modalContent}</div>
        {modalIsButton ? (
          <button
            onClick={() =>
              store.dispatch(
                HandleModalActions.setModalIsOpen({ isOpen: false }),
              )
            }
          >
            확인
          </button>
        ) : null}
        {isLink ? (
          <a
            href={store.getState().HandleModal.linkTarget}
            onClick={() => {
              store.dispatch(
                HandleModalActions.setModalIsOpen({ isOpen: false }),
              );
              store.dispatch(
                HandleModalActions.setModalIsButton({ modalIsButton: true }),
              );
            }}
          >
            확인
          </a>
        ) : null}
      </Modal>
    </div>
  );
}

export default App;
