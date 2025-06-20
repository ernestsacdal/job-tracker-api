import { Router } from "express";
import * as authController from "../../controllers/authController";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validators/authValidations";

const authRouter = Router();


authRouter.post("/login", validate(loginSchema), authController.login);



authRouter.post("/register", validate(registerSchema), authController.register);


export default authRouter;