import { Request, Response } from "express";
import { RegisterInput, LoginInput } from "../types/auth";
import * as authService from "../services/authService";
import AppResponse from "../utils/AppResponse";
import AppError from "../utils/AppError";


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as RegisterInput;
        const user = await authService.register({ email, password });

        AppResponse.sendSuccess({
            res: res,
            data: user,
            message: "Registration successful",
            code: 201
        });
    } catch (error) {
        if (error instanceof AppError) {
            AppResponse.sendError({
                res: res,
                data: null,
                message: error.message,
                code: error.statusCode
            });
        } else {
            AppResponse.sendError({
                res: res,
                data: null,
                message: "Internal server error",
                code: 500
            });
        }
    }
}