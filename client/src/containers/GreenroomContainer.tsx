import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
import io from 'socket.io-client';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GreenroomContainer() {
  const socketServer = useState(io('http://localhost:3000'))[0];
  const params: any = useState(useRouteMatch().params)[0];
  const roomInfo = useSelector((state: any) => state.Socket.roomInfo);
  const userId = useState(1)[0];
  const history = useState(useHistory())[0];

  async function outRoom() {
    await socketServer.emit('outRoom', params.id, userId);
    history.push('/channel');
  }

  useEffect(() => {
    socketServer.emit('getRoomInfo', params.id);
  }, [socketServer, params]);

  return <GreenroomPresenter roomInfo={roomInfo} outRoom={outRoom} />;
}
