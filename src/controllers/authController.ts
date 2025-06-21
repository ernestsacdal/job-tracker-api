import { Request, Response, NextFunction } from "express";
import { RegisterInput, LoginInput } from "../validators/authValidations";
import * as authService from "../services/authService";
import AppResponse from "../utils/AppResponse";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body as RegisterInput;
    const user = await authService.register({ email, password });

    AppResponse.sendSuccess({
        res: res,
        data: user,
        message: "Registration successful",
        code: 201
    });
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body as LoginInput;
    const authResponse = await authService.login({ email, password });

    AppResponse.sendSuccess({
        res: res,
        data: authResponse,
        message: authResponse.message,
        code: 200
    });
};
