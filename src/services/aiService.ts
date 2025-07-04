import { generate } from "../utils/perplexity";
import * as jobRepository from "../repositories/jobRepository";
import AppError from "../utils/AppError";

export async function generateCoverLetter(
    userId: number,
    jobId: number,
    extraInfo?: string
) {
    const job = await jobRepository.getJobsByUserId(jobId, userId);
    if (!job) {
        throw new AppError("Job not found", 404);
    }


}