import { RoomModel } from './models/RoomModel';

const roomModel = new RoomModel();

export default function socketRouter(io) {
  return async (socket) => {
    console.log('user connected');

    socket.on('rooms', async () => {
      io.emit('rooms', await roomModel.findAll());
    });

    socket.on('getRoomInfo', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) roomInfo.player1Socket = socket.id;
      if (roomInfo.player2 === userId) roomInfo.player2Socket = socket.id;
      await roomModel.save(roomInfo);
      io.emit('getRoomInfo', roomInfo);
    });

    socket.on('sendMessage', (roomId, content) => {
      io.emit('sendMessage', roomId, content);
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
      if (roomInfo.player1 === userId) {
        roomInfo.player1Ready = !roomInfo.player1Ready;
      } else {
        roomInfo.player2Ready = !roomInfo.player2Ready;
      }
      await roomModel.save(roomInfo);
      io.emit('getRoomInfo', roomInfo);
    });

    socket.on('gamestart', async (roomId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.host === roomInfo.player1 && roomInfo.player2Ready) {
        roomInfo.player1Ready = false;
        roomInfo.player2Ready = false;
        io.emit('gamestart', roomInfo);
      } else if (roomInfo.host === roomInfo.player2 && roomInfo.player1Ready) {
        roomInfo.player1Ready = false;
        roomInfo.player2Ready = false;
        io.emit('gamestart', roomInfo);
      }
      await roomModel.save(roomInfo);
    });

    socket.on('outRoom', async (roomId, userId) => {
      const roomInfo = await roomModel.findWithId(roomId);
      if (roomInfo.player1 === userId) {
        if (roomInfo.player1 === roomInfo.host && roomInfo.player2) {
          roomInfo.host = roomInfo.player2;
        }
        roomInfo.headcount -= 1;
        roomInfo.player1 = 0;
        roomInfo.player1Socket = null;
        roomInfo.player1Character = null;
        roomInfo.player1Ready = false;
        roomInfo.player1set = false;
      } else {
        if (roomInfo.player2 === roomInfo.host && roomInfo.player1) {
          roomInfo.host = roomInfo.player1;
        }
        roomInfo.headcount -= 1;
        roomInfo.player2 = 0;
        roomInfo.player2Socket = null;
        roomInfo.player2Character = null;
        roomInfo.player2Ready = false;
        roomInfo.player2set = false;
      }
      if (roomInfo.headcount === 0) {
        await roomModel.delete(roomInfo.id);
      } else {
        await roomModel.save(roomInfo);
        io.emit('getRoomInfo', roomInfo);
      }
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

    socket.on('disconnect', async () => {
      console.log('user disconnected');

      let roomInfo: any = {};
      const rooms = await roomModel.findAll();
      for (let i = 0; i <= rooms.length; i += 1) {
        if (rooms[i] && rooms[i].player1Socket === socket.id) {
          roomInfo = { ...rooms[i] };
          if (roomInfo.player1 === roomInfo.host && roomInfo.player2) {
            roomInfo.host = roomInfo.player2;
          }
          roomInfo.headcount -= 1;
          roomInfo.player1 = null;
          roomInfo.player1Socket = null;
          roomInfo.player1Character = null;
          roomInfo.player1Ready = false;
          roomInfo.player1set = false;
        }
        if (rooms[i] && rooms[i].player2Socket === socket.id) {
          roomInfo = { ...rooms[i] };
          if (roomInfo.player2 === roomInfo.host && roomInfo.player1) {
            roomInfo.host = roomInfo.player1;
          }
          roomInfo.headcount -= 1;
          roomInfo.player2 = null;
          roomInfo.player2Socket = null;
          roomInfo.player2Character = null;
          roomInfo.player2Ready = false;
          roomInfo.player2set = false;
        }
      }
      if (roomInfo.headcount === 0) {
        await roomModel.delete(roomInfo.id);
      } else if (roomInfo.id) {
        await roomModel.save(roomInfo);
        io.emit('disconnect', roomInfo);
      }
    });
  };
}
