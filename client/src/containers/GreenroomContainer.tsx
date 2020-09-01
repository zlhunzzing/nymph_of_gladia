import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
import io from 'socket.io-client';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function GreenroomContainer() {
  const socketServer = useState(io('http://localhost:3000'))[0];
  const [isMount, setIsMount] = useState(true);
  const params: any = useState(useRouteMatch().params)[0];
  const [roomInfo, setRoomInfo] = useState();
  const userId = useState(1)[0];
  const history = useState(useHistory())[0];

  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      socketServer.on('getRoomInfo', (roomInfo: any) => {
        setRoomInfo(roomInfo);
      });
      socketServer.emit('getRoomInfo', params.id);
    }
  }, [socketServer, isMount, params]);

  async function outRoom() {
    await socketServer.emit('outRoom', params.id, userId);
    history.push('/channel');
  }

  return <GreenroomPresenter roomInfo={roomInfo} outRoom={outRoom} />;
}
