import React, { useState, useEffect } from 'react';
import ChannelPresenter from '../presenters/ChannelPresenter';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

const socketServer = io('http://localhost:3000');

export default function ChannelContainer() {
  const [isMount, setIsMount] = useState(true);
  const [rooms, setRooms] = useState([{ id: 1, roomname: 'dummy' }]);
  const [roomname, setRoomname] = useState('');
  const [isModal, setIsModal] = useState(false);
  const userId = useState(1)[0];
  const history = useState(useHistory())[0];

  useEffect(() => {
    socketServer.on('connect', () => {
      console.log('connection server');
    });

    if (isMount) {
      setIsMount(false);
      socketServer.on('createRoom', (rooms: any, userRoom: any) => {
        setRooms(rooms);
        if (userRoom && userRoom.player1 === userId)
          history.push(`/greenroom/${userRoom.id}`);
      });
      socketServer.emit('inChannel', (rooms: any) => {
        setRooms(rooms);
      });
    }
  }, [isMount, rooms, history, userId]);

  function createRoom() {
    socketServer.emit('createRoom', 1, roomname);
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
