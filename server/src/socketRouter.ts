export default function socketRouter(io) {
  return (socket) => {
    console.log('user connected');

    // socket.on('sendMessage', (content) => {
    //   io.emit('sendMessage', content);
    // });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
}
