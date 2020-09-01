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

  async function createRoom() {
    await apis.createRoom(roomname, history);
    socketServer.emit('rooms');
  }
  async function inRoom(roomId: number) {
    await apis.inRoom(roomId, history);
  }

  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      socketServer.on('rooms', (rooms: any) => {
        setRooms(rooms);
      });
      socketServer.emit('rooms');
    }
  }, [socketServer, isMount, rooms, history, userId]);

  return (
    <ChannelPresenter
      rooms={rooms}
      setRoomname={setRoomname}
      isModal={isModal}
      setIsModal={setIsModal}
      isUser={isUser}
      createRoom={createRoom}
      inRoom={inRoom}
    />
  );
}
