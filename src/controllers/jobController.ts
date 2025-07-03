import { NextFunction, Request, Response } from "express";
import * as jobService from "../services/jobService";
import AppResponse from "../utils/AppResponse";

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const jobData = req.body;

    const newJob = await jobService.createJob(userId, jobData);
    AppResponse.sendSuccess({
        res: res,
        data: newJob,
        message: "Job created successfully",
        code: 201
    });
}

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const filters = req.query;

    const { jobs, totalCount, page, limit, totalPages } = await jobService.getJobs(userId, filters);
    AppResponse.sendSuccess({
        res: res,
        data: { jobs, totalCount, page, limit, totalPages },
        message: "Jobs retrieved successfully",
        code: 200
    });
}

export const getJob = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const jobId = parseInt(req.params.id, 10);

    const job = await jobService.getJobById(jobId, userId);

    AppResponse.sendSuccess({
        res: res,
        data: job,
        message: "Job retrieved successfully",
        code: 200
    });
}

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const jobId = parseInt(req.params.id, 10);
    const jobData = req.body;

    const updatedJob = await jobService.updateJob(jobId, userId, jobData);

    AppResponse.sendSuccess({
        res: res,
        data: updatedJob,
        message: "Job updated successfully",
        code: 200
    });
}

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const jobId = parseInt(req.params.id, 10);

    await jobService.deleteJob(jobId, userId);

    AppResponse.sendSuccess({
        res: res,
        data: null,
        message: "Job deleted successfully",
        code: 200
    });
}

export const getJobStats = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const stats = await jobService.getJobStats(userId);

    AppResponse.sendSuccess({
        res: res,
        data: stats,
        message: "Job statistics retrieved successfully",
        code: 200
    });
}

export const getUpcomingReminders = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const days = req.query.days ? parseInt(req.query.days as string, 10) : 7;
    const jobs = await jobService.getUpcomingReminders(userId, days);

    AppResponse.sendSuccess({
        res: res,
        data: jobs,
        message: `Jobs with reminders in the next ${days} days.`,
        code: 200,
        totalResults: jobs.length
    });
}