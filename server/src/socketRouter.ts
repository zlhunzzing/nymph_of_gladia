import { RoomModel } from './models/RoomModel';

const roomModel = new RoomModel();

export default function socketRouter(io) {
  return async (socket) => {
    console.log('user connected');

    socket.on('rooms', async () => {
      io.emit('rooms', await roomModel.findAll());
    });

    socket.on('createRoom', async (userId, roomname) => {
      const insertData = { roomname, player1: userId };
      const result = await roomModel.save(insertData);
      io.emit('rooms', await roomModel.findAll());
      io.emit('createRoom', result);
    });

    socket.on('inRoom', async (roomId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      io.emit('inRoom', roomInfo);
      io.emit('rooms', await roomModel.findAll());
    });

    socket.on('outRoom', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) roomInfo.player1 = 0;
      if (roomInfo.player1 === 0) await roomModel.delete(roomInfo.id);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
}
