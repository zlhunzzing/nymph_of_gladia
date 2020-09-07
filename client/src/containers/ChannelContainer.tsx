import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socketServer } from '../modules/Socket';
import ChannelPresenter from '../presenters/ChannelPresenter';
import { useHistory } from 'react-router-dom';
import store from '..';
import * as apis from '../apis/Auth';

export default function ChannelContainer() {
  const rooms = useSelector((state: any) => state.Socket.rooms);
  const [roomname, setRoomname] = useState('');
  const [isModal, setIsModal] = useState(false);
  const history = useState(useHistory())[0];
  const isUser = useState(store.getState().Auth.isUser)[0];

  async function createRoom() {
    await apis.createRoom(roomname, history);
    socketServer.emit('rooms');
  }
  async function inRoom(roomId: number) {
    await apis.inRoom(roomId, history);
    socketServer.emit('rooms');
  }

  useEffect(() => {
    socketServer.emit('rooms');
  }, []);

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
