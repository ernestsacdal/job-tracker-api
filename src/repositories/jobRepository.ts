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

// export const updateJob = async (id: number, userId: number, data: JobUpdateInput): Promise<JobApplication> => {

