import { UserModel } from "../models";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userModel = new UserModel();

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
    const shasum = crypto.createHmac("sha512", process.env.CRYPTO_SECRET_KEY);
    shasum.update(userInfo.password);
    userInfo.password = shasum.digest("hex");

    try {
      await userModel.findOneWithEmail(userInfo.email);
      await userModel.save(userInfo);
    } catch (err) {
      throw new Error(err);
    }
  }

  async signinService(userInfo: signinData): Promise<object> {
    const shasum = crypto.createHmac("sha512", process.env.CRYPTO_SECRET_KEY);
    shasum.update(userInfo.password);
    userInfo.password = shasum.digest("hex");

    try {
      const result = await userModel.findOneAccount(
        userInfo.email,
        userInfo.password
      );

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          username: result.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return { token: token, id: result.id };
    } catch (err) {
      throw new Error(err);
    }
  }
}
