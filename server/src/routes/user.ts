import * as express from "express";
import { UserController } from "../controllers/UserController";

const router: express.Router = express.Router();
const controller = new UserController();

router.post("/signup", controller.signupController);

router.post("/signin", controller.signinController);

export default router;
