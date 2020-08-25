import { RoomModel } from './models/RoomModel';

const roomModel = new RoomModel();

export default function socketRouter(io) {
  return async (socket) => {
    console.log('user connected');
    io.emit('createRoom', await roomModel.findAll());

    socket.on('createRoom', async (userId, roomname) => {
      const insertData = { roomname, player1: userId };
      const result = await roomModel.save(insertData);
      io.emit('createRoom', await roomModel.findAll(), result);
    });

    socket.on('inRoom', async (roomNumber) => {
      const roomInfo = await roomModel.findWithId(roomNumber);
      io.emit('inRoom', roomInfo);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
}
