import { getRepository } from 'typeorm';
import { RoomEntity } from '../entity/RoomEntity';

export class RoomModel {
  async save(insertData) {
    const result = await getRepository(RoomEntity).save(insertData);
    return result;
  }

  async findAll() {
    const result = await getRepository(RoomEntity).find();
    return result;
  }
}
