import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import { RoomModel } from '../models/RoomModel';

const userModel = new UserModel();
const roomModel = new RoomModel();

interface signupData {
  email;
  password;
}

interface signinData {
  email;
  password;
}

export class UserService {
  async signupService(userInfo: signupData): Promise<void> {
    const shasum = crypto.createHmac('sha512', process.env.CRYPTO_SECRET_KEY);
    shasum.update(userInfo.password);
    const insertData = userInfo;
    insertData.password = shasum.digest('hex');

    try {
      await userModel.findOneWithEmail(insertData.email);
      await userModel.save(insertData);
    } catch (err) {
      throw new Error(err);
    }
  }

  async signinService(userInfo: signinData): Promise<object> {
    const shasum = crypto.createHmac('sha512', process.env.CRYPTO_SECRET_KEY);
    shasum.update(userInfo.password);
    const insertData = userInfo;
    insertData.password = shasum.digest('hex');

    try {
      const result = await userModel.findOneAccount(
        insertData.email,
        insertData.password,
      );

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          username: result.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      return { token, id: result.id };
    } catch (err) {
      throw new Error(err);
    }
  }

  async createRoomService(roomInfo, tokenData): Promise<object> {
    const insertData = {
      roomname: roomInfo.roomname,
      host: tokenData.id,
      player1: tokenData.id,
      headcount: 1,
    };

    return roomModel.save(insertData);
  }

  async inRoomService(roomId, tokenData): Promise<void> {
    const insertData = {
      ...(await roomModel.findWithId(roomId)),
      headcount: (await roomModel.findWithId(roomId)).headcount + 1,
    };

    if (!insertData.player1) {
      insertData.player1 = tokenData.id;
    } else {
      insertData.player2 = tokenData.id;
    }

    roomModel.save(insertData);
  }
}
