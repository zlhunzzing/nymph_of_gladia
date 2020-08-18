import { getRepository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { ERROR_MESSAGE } from "../common/errorMessages";

export class UserModel {
  async findOneWithEmail(email: any) {
    const result = await getRepository(UserEntity).findOne({
      where: {
        email,
      },
    });
    if (result) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_EMAIL);
    } else {
      return result;
    }
  }

  async save(insertData) {
    await getRepository(UserEntity).save(insertData);
  }

  async findOneAccount(email, password) {
    const result = await getRepository(UserEntity).findOne({
      where: {
        email,
        password,
      },
    });
    if (!result) {
      throw new Error(ERROR_MESSAGE.WRONG_ACCOUNT);
    } else {
      return result;
    }
  }
}
