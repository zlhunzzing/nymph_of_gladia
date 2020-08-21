import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
import io from 'socket.io-client';

const socketServer = io('http://localhost:3000');

export default function GreenroomContainer() {
  const dummyRoom = useState([
    { id: 1, roomname: 'comeOn' },
    { id: 2, roomname: 'comeOn' },
  ])[0];
  const [isMount, setIsMount] = useState(true);
  const [rooms, setRooms] = useState(null);
  const [roomname, setRoomname] = useState('');
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    socketServer.on('connect', () => {
      console.log('connection server');
    });

    if (isMount) {
      socketServer.on('createRoom', (data: any) => {
        setRooms(data);
      });
      setIsMount(false);
    }
  }, [isMount]);

  function createRoom() {
    socketServer.emit('createRoom', roomname);
  }

  return (
    <GreenroomPresenter
      dummyRoom={dummyRoom}
      setRoomname={setRoomname}
      isModal={isModal}
      setIsModal={setIsModal}
    />
  );
}
