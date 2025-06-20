import { Router } from "express";
import * as authController from "../../controllers/authController";

const authRouter = Router();


authRouter.post("/login", authController.register);



authRouter.post("/register", authController.login);


export default authRouter;