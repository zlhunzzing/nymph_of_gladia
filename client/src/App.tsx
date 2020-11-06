import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import modalCustomStyles from './common/ModalCustomStyles';
import store from './index';
import * as HandleModalActions from './modules/HandleModal';
import { socketServer } from './modules/Socket';
import * as socketActions from './modules/Socket';
import * as battleActions from './modules/Battle';

/* pages */
import Main from './pages/Main';
import Signup from './pages/Signup';
import Channel from './pages/Channel';
import Greenroom from './pages/Greenroom';
import SelectCharacter from './pages/SelectCharacter';
import Battle from './pages/Battle';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setIsModalContent] = useState('');
  const [modalIsButton, setModalIsButton] = useState(true);
  const [isLink, setIsLink] = useState(false);
  const history = useState(useHistory())[0];
  const isChat = useSelector((state: any) => state.Socket.isChat);

  useEffect(() => {
    socketServer.on('socketCheck', (userId: number, socketId: string) => {
      if (store.getState().Auth.userId === userId) {
        console.log('id', store.getState().Auth.userId, userId);
        if (!store.getState().Socket.socketId) {
          store.dispatch(socketActions.set_socket_id({ socketId }));
        } else if (store.getState().Socket.socketId !== socketId) {
          history.push('/');
          history.go(0);
          // store.dispatch(
          //   HandleModalActions.setModalContent({
          //     content: '다른 사용자가 접속했다',
          //   }),
          // );
          // store.dispatch(HandleModalActions.setModalIsOpen({ isOpen: true }));
        }
      }
    });

    socketServer.on('rooms', (rooms: any) => {
      store.dispatch(socketActions.set_rooms({ rooms }));
    });

    socketServer.on('getRoomInfo', (roomInfo: any) => {
      console.log('room', roomInfo);
      if (document.location.pathname === `/greenroom/${roomInfo.id}`) {
        store.dispatch(socketActions.set_room_info({ roomInfo }));
      }
    });

    if (isChat) {
      store.dispatch(socketActions.set_is_chat());
      socketServer.on('sendMessage', (roomId: number, content: string, username: string) => {
        if (
          store.getState().Socket.roomInfo &&
          store.getState().Socket.roomInfo.id === Number(roomId)
        ) {
          const message = document.createElement('div');
          message.innerHTML = username + ':' + content;
          message.style.textAlign = 'left';
          message.style.paddingLeft = '5px';

          const chatBox = document.querySelector('.chatBox');
          chatBox?.prepend(message);
          const battleChatBox = document.querySelector('.battleChatBox');
          battleChatBox?.prepend(message);
        }
      });
    }

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

    socketServer.on('setHand', (roomId: number, userId: number, hand: any) => {
      if (
        store.getState().Socket.roomInfo &&
        roomId === store.getState().Socket.roomInfo.id
      ) {
        if (userId === store.getState().Socket.roomInfo.player1) {
          store.dispatch(
            battleActions.set_player1_hand({
              hand: hand.slice(0, 3),
            }),
          );
        } else {
          store.dispatch(
            battleActions.set_player2_hand({
              hand: hand.slice(0, 3),
            }),
          );
        }
      }
    });

    socketServer.on('setTurn', (roomId: number, roomInfo: any) => {
      if (
        store.getState().Socket.roomInfo &&
        roomId === store.getState().Socket.roomInfo.id
      ) {
        if (roomInfo.player1set && roomInfo.player2set) {
          store.dispatch(battleActions.set_turn_true());
        }
      }
    });

    socketServer.on('disconnect', (roomInfo: any) => {
      if (
        roomInfo &&
        store.getState().Socket.roomInfo &&
        roomInfo.id === store.getState().Socket.roomInfo.id
      ) {
        if (
          document.location.pathname === '/battle' ||
          store.getState().Battle.isTurn
        ) {
          store.dispatch(
            HandleModalActions.setModalContent({
              content: '상대와의 연결이 끊겼다',
            }),
          );
          store.dispatch(HandleModalActions.setModalIsOpen({ isOpen: true }));
          store.dispatch(HandleModalActions.set_is_link());
        } else {
          store.dispatch(socketActions.set_room_info({ roomInfo }));
        }
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
          <Link
            to={`/greenroom/${store.getState().Socket.roomInfo.id}`}
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
          </Link>
        ) : null}
      </Modal>
    </div>
  );
}

export default App;
