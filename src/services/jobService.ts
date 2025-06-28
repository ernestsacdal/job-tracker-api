import { JobApplication } from "@prisma/client";
import { JobCreateInput, JobUpdateInput } from "../validators/jobValidation";
import * as jobRepository from "../repositories/jobRepository";
import AppError from "../utils/AppError";

export const createJob = async (
    userId: number,
    data: JobCreateInput
): Promise<JobApplication> => {
    return await jobRepository.createJob(userId, data);
}

export const getJobs = async (
    userId: number,
    filters: {
        status?: string;
        company?: string;
        search?: string;
        page?: string;
        limit?: string;
    } = {}
): Promise<{
    jobs: JobApplication[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
}> => {
    const page = filters.page ? parseInt(filters.page) : 1;
    const limit = filters.limit ? parseInt(filters.limit) : 10;

    if (filters.status && !['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'].includes(filters.status)) {
        throw new AppError('Invalid status filter', 400);
    }

    const result = await jobRepository.getAllJobsByUserId(userId, {
        status: filters.status as 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED' | undefined,
        company: filters.company,
        search: filters.search,
        page,
        limit,
    });

    return {
        jobs: result.jobs,
        totalCount: result.totalCount,
        page,
        limit,
        totalPages: Math.ceil(result.totalCount / limit),
    };
};

export const getJobById = async (
    id: number,
    userId: number,
): Promise<JobApplication> => {
    if (!!id || id <= 0) {
        throw new AppError('Invalid job ID', 400);
    }

    const job = await jobRepository.getJobsByUserId(id, userId);

    if (!job) {
        throw new AppError('Job not found', 404);
    }

    return job;
};

export const updateJob = async (
    id: number,
    userId: number,
    data: JobUpdateInput
): Promise<JobApplication> => {
    if (!!id || id <= 0) {
        throw new AppError('Invalid job ID', 400);
    }

    const updatedJob = await jobRepository.updateJob(id, userId, data);

    if (!updatedJob) {
        throw new AppError('Job not found or you do not have permission to update it', 404);
    }

    return updatedJob;
}


export const deleteJob = async (
    id: number,
    userId: number
): Promise<JobApplication> => {
    if (!!id || id <= 0) {
        throw new AppError('Invalid job ID', 400);
    }

    const deletedJob = await jobRepository.softDeleteJob(id, userId);

    if (!deletedJob) {
        throw new AppError('Job application not found', 404);
    }

    return deletedJob;
}

// export const getJobStats = async (
//     userId: number
// ): Promise<{
//     total: number;
//     applied: number;
//     interview: number;
//     offer: number;
//     rejected: number;
//     successRate: number;
//     interviewRate: number;
// }> => {
//     const stats = jobRepository.getJobStats(userId);

//     const success
// }