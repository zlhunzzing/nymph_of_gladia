import React, { useState /*,{ useState, useEffect }*/ } from 'react';
import GreenroomPresenter from '../presenters/GreenroomPresenter';
// import io from 'socket.io-client';

// const socketServer = io('http://localhost:3001');

export default function GreenroomContainer() {
  const dummyRoom = useState([
    { id: 1, roomname: 'comeOn' },
    { id: 2, roomname: 'comeOn' },
  ])[0];
  // const [isMount, setIsMount] = useState(true);

  // useEffect(() => {
  //   socketServer.on('connect', () => {
  //     console.log('connection server');
  //   });

  //   if (isMount) {
  //     socketServer.on('sendMessage', (data: string) => {
  //       // roomTemplate(data);
  //     });
  //     setIsMount(false);
  //   }
  // }, [isMount]);

  // function roomTemplate(content: string) {
  //   const message = document.createElement('div');
  //   message.innerHTML = content;
  //   message.style.textAlign = 'left';
  //   message.style.paddingLeft = '10px';

  //   const chatBox = document.querySelector('.chatbox');
  //   chatBox?.prepend(message);
  // }

  // function sendMessage() {
  //   socketServer.emit('sendMessage', content.replace(/\n/g, '<br>'));
  // }

  return <GreenroomPresenter dummyRoom={dummyRoom} />;
}
