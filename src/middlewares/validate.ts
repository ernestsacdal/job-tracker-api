import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/AppError";

export const validate =
    (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            const message =
                err.errors && err.errors.length
                    ? err.errors[0].message
                    : "Invalid request data";
            next(new AppError(message, 400));
        }
    };
