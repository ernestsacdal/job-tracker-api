import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/token";
import AppResponse from "../utils/AppResponse";

export  const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: "Authorization header is missing",
                code: 401
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return AppResponse.sendError({
                res: res,
                data: null,
                message: "Token is missing",
                code: 401
            });
        }

        const decoded = validateToken(token) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return AppResponse.sendError({
            res: res,
            data: null,
            message: "Invalid token",
            code: 401
        });
        
    }
}