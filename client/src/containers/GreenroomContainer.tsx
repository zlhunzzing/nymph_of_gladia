import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
import { socketServer } from '../modules/Socket';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '..';
import * as battleActions from '../modules/Battle';

export default function GreenroomContainer() {
  const params: any = useState(useRouteMatch().params)[0];
  const roomInfo = useSelector((state: any) => state.Socket.roomInfo);
  const roomId = useState(params.id)[0];
  const userId = useSelector((state: any) => state.Auth.userId);
  const [character, setCharacter] = useState('');
  const history = useState(useHistory())[0];
  const [content, setContent] = useState('');

  async function outRoom() {
    await socketServer.emit('outRoom', roomId, userId);
    socketServer.emit('rooms');
    history.push('/channel');
  }
  function select(name: string) {
    setCharacter(name);
    if (roomInfo.player1 === userId) {
      store.dispatch(battleActions.select_player1({ name }));
    } else {
      store.dispatch(battleActions.select_player2({ name }));
    }
    socketServer.emit('select', roomId, userId, name);
  }
  function ready() {
    socketServer.emit('ready', roomId, userId);
  }
  function gamestart() {
    socketServer.emit('gamestart', roomId, userId);
  }
  function sendMessage() {
    let username
    if(roomInfo.player1 === userId) username = roomInfo.player1name
    if(roomInfo.player2 === userId) username = roomInfo.player2name
    socketServer.emit('sendMessage', roomId, content, username);
    setContent('');
    const el = document.querySelector('.inputReset') as HTMLElement;
    el.click();
  }

  useEffect(() => {
    socketServer.emit('getRoomInfo', roomId, userId);
  }, [roomId, userId]);

  return (
    <GreenroomPresenter
      roomInfo={roomInfo}
      outRoom={outRoom}
      userId={userId}
      select={select}
      character={character}
      ready={ready}
      gamestart={gamestart}
      setContent={setContent}
      sendMessage={sendMessage}
    />
  );
}
