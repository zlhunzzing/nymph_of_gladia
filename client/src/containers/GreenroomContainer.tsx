import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
// import io from 'socket.io-client';
import { socketServer } from '../modules/Socket';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GreenroomContainer() {
  // const socketServer = useState(io('http://localhost:3000/nsp'))[0];
  // const socketServer = useState(socketActions.socketServer)[0];
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
    socketServer.emit('select', params.id, userId, name);
  }
  function ready() {
    socketServer.emit('ready', params.id, userId);
  }
  // function gamestart() {
  //   socketServer.emit
  // }

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
    />
  );
}
