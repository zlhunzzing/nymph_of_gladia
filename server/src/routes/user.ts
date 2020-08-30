import * as express from 'express';
import jwt from 'jsonwebtoken';
import { UserController } from '../controllers/UserController';
import { ERROR_MESSAGE } from '../common/errorMessages';

const router: express.Router = express.Router();
const controller = new UserController();

const jwtCheck = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json(err || { message: ERROR_MESSAGE.WRONG_TOKEN });
    } else {
      req.tokenData = decoded;
      next();
    }
  });
};

router.post('/signup', controller.signupController);

router.post('/signin', controller.signinController);

router.post('/channel', jwtCheck, controller.createRoomController);

export default router;
