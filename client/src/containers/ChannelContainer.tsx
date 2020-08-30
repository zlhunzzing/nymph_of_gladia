import React, { useState, useEffect } from 'react';
import ChannelPresenter from '../presenters/ChannelPresenter';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import store from '..';
import * as apis from '../apis/Auth';

export default function ChannelContainer() {
  const socketServer = useState(io('http://localhost:3000'))[0];
  const [isMount, setIsMount] = useState(true);
  const [rooms, setRooms] = useState([{ id: 1, roomname: 'dummy' }]);
  const [roomname, setRoomname] = useState('');
  const [isModal, setIsModal] = useState(false);
  const userId = useState(1)[0];
  const history = useState(useHistory())[0];
  const isUser = useState(store.getState().Auth.isUser)[0];

  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      socketServer.on('rooms', (rooms: any) => {
        setRooms(rooms);
      });
      socketServer.emit('rooms');
      socketServer.on('createRoom', (userRoom: any) => {
        if (userRoom && userRoom.player1 === userId)
          history.push(`/greenroom/${userRoom.id}`);
      });
    }
  }, [socketServer, isMount, rooms, history, userId]);

  function createRoom() {
    apis.createRoom(roomname, history);
  }

  return (
    <ChannelPresenter
      rooms={rooms}
      setRoomname={setRoomname}
      isModal={isModal}
      setIsModal={setIsModal}
      createRoom={createRoom}
      isUser={isUser}
    />
  );
}
