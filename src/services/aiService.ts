import { generate } from "../utils/perplexity";
import * as jobRepository from "../repositories/jobRepository";
import * as aiRepository from "../repositories/aiRepository";
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

    const letter = await generate(prompt);
    const savedLetter = await aiRepository.coverLetter(job.id, letter)

    return savedLetter;
}

export async function generateResume(userId: number, jobId: number,
    extraInfo?: string) {
    const job = await jobRepository.getJobsByUserId(jobId, userId);
    if (!job) {
        throw new AppError("Job not found", 404);
    }

    const prompt = `Write a concise, achievement-focused resume bullet point for the following job application. Use strong action verbs, quantify impact if possible, and make it suitable for a modern tech resume.

Job Title: ${job.jobTitle}
Company: ${job.company}
Job Description: ${job.jobDesc || "N/A"}
${extraInfo ? `User Note: ${extraInfo}` : ""}

Return only the bullet point, no preamble or closing remarks.
    `.trim();

    const blurb = await generate(prompt);
    const savedBlurb = await aiRepository.resumeBlurb(job.id, blurb);

    return savedBlurb;
}
