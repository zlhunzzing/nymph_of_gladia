import { RoomModel } from './models/RoomModel';

const roomModel = new RoomModel();

export default function socketRouter(io) {
  return async (socket) => {
    console.log('user connected');

    socket.on('rooms', async () => {
      io.emit('rooms', await roomModel.findAll());
    });

    socket.on('getRoomInfo', async (roomId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      io.emit('getRoomInfo', roomInfo);
    });

    socket.on('select', async (roomId, userId, character) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) {
        roomInfo.player1Character = character;
      } else {
        roomInfo.player2Character = character;
      }
      await roomModel.save(roomInfo);
      io.emit('getRoomInfo', roomInfo);
    });

    socket.on('ready', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player2 === userId) {
        roomInfo.player2Ready = !roomInfo.player2Ready;
      }
      await roomModel.save(roomInfo);
      io.emit('getRoomInfo', roomInfo);
    });

    socket.on('gamestart', async (roomId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player2Ready && roomInfo.player1Character) {
        io.emit('gamestart', roomInfo);
        roomInfo.player2Ready = false;
        await roomModel.save(roomInfo);
      }
    });

    socket.on('outRoom', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) roomInfo.player1 = 0;
      if (roomInfo.player1 === 0) await roomModel.delete(roomInfo.id);
    });

    socket.on('setHand', async (roomId, userId, hand) => {
      io.emit('setHand', roomId, userId, hand);
    });

    socket.on('setTurn', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) {
        roomInfo.player1set = true;
      } else if (roomInfo.player2 === userId) {
        roomInfo.player2set = true;
      }
      io.emit('setTurn', roomId, roomInfo);
      if (roomInfo.player1set && roomInfo.player2set) {
        roomInfo.player1set = false;
        roomInfo.player2set = false;
      }
      await roomModel.save(roomInfo);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
}
