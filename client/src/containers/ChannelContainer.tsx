import React, { useState, useEffect } from 'react';
import ChannelPresenter from '../presenters/ChannelPresenter';
import io from 'socket.io-client';

const socketServer = io('http://localhost:3000');

export default function ChannelContainer() {
  const [isMount, setIsMount] = useState(true);
  const [rooms, setRooms] = useState([{ id: 1, roomname: 'dummy' }]);
  const [roomname, setRoomname] = useState('');
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    socketServer.on('connect', () => {
      console.log('connection server');
    });

    if (isMount) {
      socketServer.on('createRoom', (data: any) => {
        console.log(data);
        setRooms(data);
      });
      setIsMount(false);
    }
  }, [isMount, rooms]);

  function createRoom() {
    socketServer.emit('createRoom', roomname);
  }

  return (
    <ChannelPresenter
      rooms={rooms}
      setRoomname={setRoomname}
      isModal={isModal}
      setIsModal={setIsModal}
      createRoom={createRoom}
    />
  );
}
