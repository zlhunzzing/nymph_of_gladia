import { getRepository } from 'typeorm';
import { RoomEntity } from '../entity/RoomEntity';

export class RoomModel {
  async save(insertData) {
    await getRepository(RoomEntity).save(insertData);
  }

  async findAll() {
    const result = await getRepository(RoomEntity).find();
    return result;
  }
}
