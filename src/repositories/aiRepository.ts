import prisma from "../utils/client";

export const resumeBlurb = async (jobAppId: number, content: string) => {
    return prisma.resumeBlurb.create({
        data: { jobAppId, content },
    });
}

export const coverLetter = async (jobAppId: number, content: string) => {
    return prisma.coverLetter.create({
        data: { jobAppId, content },
    });
}