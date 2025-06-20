import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import AppResponse from '../utils/AppResponse';

export const globalErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => { 
    if (error instanceof AppError) {
        AppResponse.sendError({
            res: res,
            data: null,
            message: error.message,
            code: error.statusCode
        });
    } else {
        console.error('Unexpected Error:', error);
        AppResponse.sendError({
            res: res,
            data: null,
            message: 'Internal server error',
            code: 500
        });
    }
}