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

    const prompt = `
Write a concise, enthusiastic cover letter for the following job application.

Job Title: ${job.jobTitle}
Company: ${job.company}
Job Description: ${job.jobDesc || "N/A"}
${extraInfo ? `User Note: ${extraInfo}` : ""}

The letter should:
- Be no more than 250 words
- Sound professional but human
- Mention the company and job title
- Reference specific skills or experience if possible
- End with a polite call to action

Return only the letter text, no preamble or closing remarks.
  `.trim();

    return await generate(prompt);
}

