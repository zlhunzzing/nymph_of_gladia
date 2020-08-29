import { getRepository } from 'typeorm';
import { RoomEntity } from '../entity/RoomEntity';
import { ERROR_MESSAGE } from '../common/errorMessages';

export class RoomModel {
  async save(insertData) {
    const result = await getRepository(RoomEntity).save(insertData);
    return result;
  }

  async findAll() {
    const result = await getRepository(RoomEntity).find();
    return result;
  }

  async findWithId(id: number) {
    const result = await getRepository(RoomEntity).findOne({
      where: {
        id,
      },
    });
    if (result) {
      return result;
    }
    throw new Error(ERROR_MESSAGE.WRONG_ROOM);
  }

  async delete(id) {
    await getRepository(RoomEntity).delete(id);
  }
}
