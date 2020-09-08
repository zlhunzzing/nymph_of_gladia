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
  const userId = useSelector((state: any) => state.Auth.userId);
  const [character, setCharacter] = useState('');
  const history = useState(useHistory())[0];

  console.log(roomInfo, userId);

  async function outRoom() {
    await socketServer.emit('outRoom', params.id, userId);
    history.push('/channel');
  }
  function select(name: string) {
    setCharacter(name);
    if (roomInfo.player1 === userId) {
      store.dispatch(battleActions.select_player1({ name }));
    } else {
      store.dispatch(battleActions.select_player2({ name }));
    }
    socketServer.emit('select', params.id, userId, name);
  }
  function ready() {
    socketServer.emit('ready', params.id, userId);
  }
  function gamestart() {
    socketServer.emit('gamestart', params.id);
  }

  useEffect(() => {
    socketServer.emit('getRoomInfo', params.id);
  }, [params]);

  return (
    <GreenroomPresenter
      roomInfo={roomInfo}
      outRoom={outRoom}
      userId={userId}
      select={select}
      character={character}
      ready={ready}
      gamestart={gamestart}
    />
  );
}
