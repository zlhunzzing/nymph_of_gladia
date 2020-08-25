import React, { useState, useEffect } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
import io from 'socket.io-client';
import { useRouteMatch } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function GreenroomContainer() {
  const socketServer = useState(io('http://localhost:3000'))[0];
  const [isMount, setIsMount] = useState(true);
  const params: any = useState(useRouteMatch().params)[0];
  const [roomInfo, setRoomInfo] = useState();
  // const history = useState(zuseHistory())[0];

  useEffect(() => {
    if (isMount) {
      socketServer.on('inRoom', (roomInfo: any) => {
        setRoomInfo(roomInfo);
      });
      socketServer.emit('inRoom', params.id);
      setIsMount(false);
    }
  }, [socketServer, isMount, params]);

  // function outRoom(userId: number) {
  //   socketServer.emit('outRoom', userId);
  //   history.push('./channel');
  // }

  return <GreenroomPresenter roomInfo={roomInfo} />;
}
