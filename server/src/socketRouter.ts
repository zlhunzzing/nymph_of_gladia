import { RoomModel } from './models/RoomModel';

const roomModel = new RoomModel();

export default function socketRouter(io) {
  return async (socket) => {
    console.log('user connected');
    io.emit('createRoom', await roomModel.findAll());

    socket.on('createRoom', async (roomname) => {
      await roomModel.save({ roomname });
      io.emit('createRoom', await roomModel.findAll());
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
}
