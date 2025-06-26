import { JobApplication } from "@prisma/client";
import prisma from "../utils/client";
import { JobCreateInput, JobUpdateInput } from "../validators/jobValidation";

export const createJob = async (userId: number, data: JobCreateInput): Promise<JobApplication> => {
    return prisma.jobApplication.create({
        data: {
            ...data,
            userId: userId,
        },
    });
}

export const getJobsByUserId = async (id: number, userId: number): Promise<JobApplication | null> => {
    return prisma.jobApplication.findFirst({
        where: {
            id: id,
            userId: userId,
            deletedAt: null,
        },
        include: {
            blurbs: true,
            coverLetters: true
        }
    });
}

export const updateJob = async (id: number, userId: number, data: JobUpdateInput): Promise<JobApplication | null> => {
    const existingJob = await getJobsByUserId(id, userId);
    if (!existingJob) {
        return null;
    }

    return prisma.jobApplication.update({
        where: {
            id: id
        },
        data: {
            ...data,
            ...(data.dateApplied && { dateApplied: new Date(data.dateApplied) }),
            ...(data.reminderDate && { reminderDate: new Date(data.reminderDate) }),
        },
        include: {
            blurbs: true,
            coverLetters: true
        }
    });

}

export const softDeleteJob = async (id: number, userId: number): Promise<JobApplication | null> => {
    const existingJob = await getJobsByUserId(id, userId);
    if (!existingJob) {
        return null;
    }

    return prisma.jobApplication.update({
        where: {
            id: id
        },
        data: {
            deletedAt: new Date(),
        },
        include: {
            blurbs: true,
            coverLetters: true
        }
    });


}

export const getAllJobsByUserId = async (
    userId: number,
    filters: {
        status?: string;
        company?: string;
        search?: string;
        page?: number;
        limit?: number;
    } = {}
): Promise<{ jobs: JobApplication[]; totalCount: number }> => {
    const { status, company, search, page = 1, limit = 10 } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
        userId: userId,
        deletedAt: null,
    };


    if (status) {
        where.status = status;
    }

    if (company) {
        where.company = {
            contains: company,
            mode: 'insensitive',
        };
    }

    if (search) {
        where.OR = [
            {
                jobTitle: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            {
                company: {
                    contains: search,
                    mode: 'insensitive',
                },
            }

        ]
    }

    const [jobs, totalCount] = await Promise.all([
        prisma.jobApplication.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: limit,
            include: {
                blurbs: true,
                coverLetters: true

            },
        }),
        prisma.jobApplication.count({
            where,
        })
    ]);
    return {
        jobs,
        totalCount,
    };
}


export const getJobStats = async (
    userId: number
): Promise<{
    total: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    hired: number;
}> => {
    const [total, applied, interview, offer, rejected, hired] = await Promise.all([
        prisma.jobApplication.count({
            where: {
                userId: userId,
                deletedAt: null,
            },
        }),
        prisma.jobApplication.count({
            where: {
                userId: userId,
                status: "APPLIED",
                deletedAt: null,
            },
        }),
        prisma.jobApplication.count({
            where: {
                userId: userId,
                status: "INTERVIEW",
                deletedAt: null,
            },
        }),
        prisma.jobApplication.count({
            where: {
                userId: userId,
                status: "OFFER",
                deletedAt: null,
            },
        }),
        prisma.jobApplication.count({
            where: {
                userId: userId,
                status: "REJECTED",
                deletedAt: null,
            },
        }),
        prisma.jobApplication.count({
            where: {
                userId: userId,
                status: "HIRED",
                deletedAt: null,
            },
        }),
    ]);
    return {
        total,
        applied,
        interview,
        offer,
        rejected,
        hired,
    };
}