import { Response, Request, NextFunction } from "express";
import * as aiService from "../services/aiService";
import AppResponse from "../utils/AppResponse";

export const generateCoverLetter = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const userId = req.userId!;
    const jobId = parseInt(req.params.jobId, 10);
    const { extraInfo } = req.body;

    const letter = await aiService.generateCoverLetter(userId, jobId, extraInfo);

    AppResponse.sendSuccess(
        {
            res,
            data: { letter },
            message: "Cover letter generated successfully",
            code: 200
        }

    );
}

export const generateResumeBlurb = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const userId = req.userId!;
    const jobId = parseInt(req.params.jobId, 10);
    const { extraInfo } = req.body;

    const blurb = await aiService.generateResume(userId, jobId, extraInfo);
    AppResponse.sendSuccess(
        {
            res,
            data: { blurb },
            message: "Resume blurb generated successfully",
            code: 200
        }
    );
}