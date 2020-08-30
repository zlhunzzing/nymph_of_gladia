import { Request } from 'express';

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TokenData {
  id: number;
  iat: number;
  exp: number;
}

export interface TokenReq extends Request {
  tokenData: TokenData;
}
