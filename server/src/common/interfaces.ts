import { Request } from "express";

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TokenData {
  email: string;
  iat: number;
  exp: number;
}

export interface TokenReq extends Request {
  tokenData: TokenData;
}
