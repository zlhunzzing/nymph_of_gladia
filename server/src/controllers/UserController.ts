import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { TokenReq } from '../common/interfaces';

const service = new UserService();

export class UserController {
  async signupController(req: Request, res: Response): Promise<void> {
    try {
      await service.signupService(req.body);
      res.status(201).end();
    } catch (err) {
      res.status(409).send(err.message);
    }
  }

  async signinController(req: Request, res: Response): Promise<void> {
    try {
      const result = await service.signinService(req.body);
      res.cookie('user', result);
      res.status(200).json(result);
    } catch (err) {
      res.status(409).send(err.message);
    }
  }

  async createRoomController(req: TokenReq, res: Response): Promise<void> {
    try {
      const result = await service.createRoomService(req.body, req.tokenData);
      res.status(201).json(result);
    } catch (err) {
      res.status(409).send(err.message);
    }
  }
}
